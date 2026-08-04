const path = require("path");
const fs = require("fs");
const { input } = require("@inquirer/prompts");
const { generate } = require("../utils/ai");
const { createFile } = require("../utils/file");
const { getVaultPath } = require("../utils/vault");
const { parseTemplate, extractAIBlocks, fillAIBlocks, getTemplateData } = require("../utils/markdown");

const SYSTEM_PROMPT = `Tulis catatan markdown buat Obsidian.

Aturan wajib:
- Bahasa Indonesia santai, ngobrol kayak temen
- JANGAN pakai kata "kamu", "anda", "kalian" - langsung ke intinya aja
- JANGAN pembukaan kayak "Tentu", "Oke", "Baik" - langsung mulai isinya
- Heading pakai ## dan ###
- Gunakan bullet points, bold, code blocks kalau perlu
- Jangan pakai frontmatter atau YAML
- Isinya harus bermanfaat dan jelas`;

async function askUser() {
    const answers = {};

    console.log("\n📝 Oke, kita isi daily note dulu ya!\n");

    answers.target = await input({
        message: "🎯 Target hari ini apa aja?",
    });

    answers.selesai = await input({
        message: "✅ Dari target tadi, udah selesai semua?",
    });

    answers.pelajaran = await input({
        message: "📚 Hari ini kamu belajar atau kerjain apa aja?",
    });

    answers.cerita = await input({
        message: "✨ Ada yang menarik atau memorable?",
    });

    answers.mood = await input({
        message: "😊 Gimana hari ini secara overall?",
    });

    answers.syukur = await input({
        message: "🙏 Ada hal yang kamu syukuri hari ini?",
    });

    answers.refleksi = await input({
        message: "💭 Ada pelajaran atau refleksi buat hari ini?",
    });

    return answers;
}

function buildPromptFromAnswers(answers) {
    return `${SYSTEM_PROMPT}

Buat 6 bagian untuk daily note hari ini dengan heading:
## Target Hari Ini
## Catatan
## Selesai
## Mood
## Syukur
## Refleksi

Target: ${answers.target}
Kegiatan: ${answers.pelajaran}
Cerita: ${answers.cerita}
Mood: ${answers.mood}
Syukur: ${answers.syukur}
Refleksi: ${answers.refleksi}
Yang udah selesai: ${answers.selesai}

Tiap bagian langsung isinya aja, bahasa santai, masing-masing 2-3 kalimat.
JANGAN pakai kata "kamu", "anda", "kalian".
JANGAN pembukaan kayak "Tentu", "Oke", "Baik".`;
}

function uniquePath(filePath) {
    if (!fs.existsSync(filePath)) return filePath;
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);
    let i = 2;
    while (fs.existsSync(path.join(dir, `${base} ${i}${ext}`))) i++;
    return path.join(dir, `${base} ${i}${ext}`);
}

function insertUnderCatatan(content, newContent) {
    const clean = newContent.replace(/^## Catatan\s*(?:\r?\n)*/i, "").trim();

    const placeholderRe = /(## Catatan(?:\r?\n)+)-((?:\r?\n)*)(?=(?:\r?\n)+---|(?:\r?\n)+## |$)/i;
    if (placeholderRe.test(content)) {
        return content.replace(placeholderRe, `$1${clean}$2`);
    }

    const sectionRe = /(## Catatan(?:\r?\n)+)([\s\S]*?)(?=(?:\r?\n)+---|(?:\r?\n)+## |\r?\n?$)/i;
    const m = content.match(sectionRe);
    if (m) {
        const body = m[2].trim();
        if (body && body !== "-") {
            return content.replace(sectionRe, `${m[1]}${body}\n\n${clean}`);
        } else {
            return content.replace(sectionRe, `${m[1]}${clean}`);
        }
    }

    return content + `\n\n${clean}`;
}

function replaceSection(content, heading, newContent) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
        `(${escaped}(?:\\r?\\n)+)([\\s\\S]*?)(?=(?:\\r?\\n)+---|(?:\\r?\\n)+## |\\r?\\n?$)`,
        "i"
    );
    if (re.test(content)) {
        return content.replace(re, `$1${newContent.trim()}`);
    }
    return content;
}

function parseSections(aiContent) {
    const content = aiContent.replace(/\r\n/g, "\n");
    const sections = {};
    const titles = {
        target: /^[ \t]*(?:#{1,6}[ \t]+)?\*{0,2}[ \t]*Target Hari Ini[ \t]*:?[ \t]*\*{0,2}[ \t]*$/im,
        catatan: /^[ \t]*(?:#{1,6}[ \t]+)?\*{0,2}[ \t]*Catatan[ \t]*:?[ \t]*\*{0,2}[ \t]*$/im,
        selesai: /^[ \t]*(?:#{1,6}[ \t]+)?\*{0,2}[ \t]*Selesai[ \t]*:?[ \t]*\*{0,2}[ \t]*$/im,
        mood: /^[ \t]*(?:#{1,6}[ \t]+)?\*{0,2}[ \t]*Mood[ \t]*:?[ \t]*\*{0,2}[ \t]*$/im,
        syukur: /^[ \t]*(?:#{1,6}[ \t]+)?\*{0,2}[ \t]*Syukur[ \t]*:?[ \t]*\*{0,2}[ \t]*$/im,
        refleksi: /^[ \t]*(?:#{1,6}[ \t]+)?\*{0,2}[ \t]*Refleksi[ \t]*:?[ \t]*\*{0,2}[ \t]*$/im,
    };

    const buffers = { target: [], catatan: [], selesai: [], mood: [], syukur: [], refleksi: [] };
    let currentKey = null;

    for (const line of content.split("\n")) {
        let matched = null;
        for (const [key, re] of Object.entries(titles)) {
            if (re.test(line)) {
                matched = key;
                break;
            }
        }
        if (matched) {
            currentKey = matched;
            continue;
        }
        if (currentKey) {
            buffers[currentKey].push(line);
        }
    }

    for (const [key, buf] of Object.entries(buffers)) {
        const body = buf.join("\n").trim();
        if (body) sections[key] = body;
    }
    return sections;
}

function fillDailyTemplate(template, sections) {
    let result = template;
    const map = {
        target: "## Target Hari Ini",
        catatan: "## Catatan",
        selesai: "## Selesai",
        mood: "## Mood",
        syukur: "## Syukur",
        refleksi: "## Refleksi",
    };
    const found = new Set();
    for (const [key, heading] of Object.entries(map)) {
        if (sections[key]) {
            const replaced = replaceSection(result, heading, sections[key]);
            if (replaced !== result) {
                result = replaced;
                found.add(key);
            }
        }
    }
    for (const [key, heading] of Object.entries(map)) {
        if (sections[key] && !found.has(key)) {
            const jamRe = /\n*Jam dibuat[^\n]*\n?$/;
            if (jamRe.test(result)) {
                result = result.replace(jamRe, `\n\n${heading}\n\n${sections[key]}$&`);
            } else {
                result = result.replace(/\s*$/, `\n\n${heading}\n\n${sections[key]}\n`);
            }
        }
    }
    return result;
}

async function fillTemplateWithAI(template, prompt, options) {
    const aiBlocks = extractAIBlocks(template);

    if (aiBlocks.length === 0) {
        return null;
    }

    console.log(`\n🤖 Template memiliki ${aiBlocks.length} bagian AI, mengisi...`);

    const fills = [];

    for (let i = 0; i < aiBlocks.length; i++) {
        const block = aiBlocks[i];
        console.log(`  [${i + 1}/${aiBlocks.length}] ${block.instruction}`);

        const blockPrompt = `${SYSTEM_PROMPT}

${block.instruction}

Konteks tambahan: ${prompt}

Berikan jawaban langsung, tanpa pembukaan.`;

        try {
            const content = await generate(blockPrompt);
            fills.push({ placeholder: block.placeholder, content: content.trim() });
        } catch (err) {
            console.log(`  ❌ Gagal mengisi blok: ${err.message}`);
            fills.push({ placeholder: block.placeholder, content: "" });
        }
    }

    return fillAIBlocks(template, fills);
}

async function aiWrite(prompt, options) {
    let finalPrompt;

    if (options.ask) {
        const answers = await askUser();
        finalPrompt = buildPromptFromAnswers(answers);
    } else {
        finalPrompt = `${SYSTEM_PROMPT}\n\nBuatkan catatan tentang: ${prompt}`;
    }

    console.log("\n🧠 Lagi diproses sama AI...\n");

    try {
        const vault = getVaultPath();
        let filePath;

        if (options.daily) {
            const now = new Date();
            const date =
                `${now.getFullYear()}-` +
                `${String(now.getMonth() + 1).padStart(2, "0")}-` +
                `${String(now.getDate()).padStart(2, "0")}`;
            filePath = path.join(vault, "Daily Notes", `${date}.md`);

            const content = await generate(finalPrompt);

            if (options.ask) {
                const templatePath = path.join(
                    __dirname, "..", "templates", "daily.md"
                );
                let template = `# ${date}\n\n`;
                if (fs.existsSync(templatePath)) {
                    template = parseTemplate(
                        fs.readFileSync(templatePath, "utf8"),
                        getTemplateData({ title: date, folder: "Daily Notes", date })
                    );
                }

                const sections = parseSections(content);
                let filled = fillDailyTemplate(template, sections);
                if (filled === template) {
                    filled = insertUnderCatatan(template, content);
                }

                if (fs.existsSync(filePath)) {
                    const existing = fs.readFileSync(filePath, "utf8");
                    let updated = fillDailyTemplate(existing, sections);
                    if (updated === existing) {
                        updated = insertUnderCatatan(existing, content);
                    }
                    fs.writeFileSync(filePath, updated);
                    console.log("✅ Daily note diupdate!");
                } else {
                    createFile(filePath, filled);
                    console.log("✅ Daily note baru dibuat!");
                }
            } else {
                if (fs.existsSync(filePath)) {
                    const existing = fs.readFileSync(filePath, "utf8");
                    const updated = insertUnderCatatan(existing, content);
                    fs.writeFileSync(filePath, updated);
                    console.log("✅ Catatan ditambahin ke daily note hari ini!");
                } else {
                    const templatePath = path.join(
                        __dirname, "..", "templates", "daily.md"
                    );
                    let header = `# ${date}\n\n`;
                    if (fs.existsSync(templatePath)) {
                        header = parseTemplate(
                            fs.readFileSync(templatePath, "utf8"),
                            getTemplateData({ title: date, folder: "Daily Notes", date })
                        );
                    }
                    const finalContent = insertUnderCatatan(header, content);
                    createFile(filePath, finalContent);
                    console.log("✅ Daily note baru dibuat!");
                }
            }
        } else if (options.template) {
            const templatePath = path.join(
                __dirname, "..", "templates", `${options.template}.md`
            );

            if (!fs.existsSync(templatePath)) {
                console.log("❌ Template tidak ditemukan: " + options.template);
                return;
            }

            const title = options.title || "AI Note";
            const folder = options.folder || "AI";

            let template = fs.readFileSync(templatePath, "utf8");
            template = parseTemplate(template, getTemplateData({ title, folder }));

            const filledTemplate = await fillTemplateWithAI(template, prompt, options);

            if (filledTemplate) {
                filePath = uniquePath(path.join(vault, folder, `${title}.md`));
                createFile(filePath, filledTemplate);
                console.log("✅ Catatan dari template berhasil dibuat!");
            } else {
                const content = await generate(finalPrompt);
                filePath = uniquePath(path.join(vault, folder, `${title}.md`));
                createFile(filePath, content);
                console.log("✅ Catatan berhasil dibuat!");
            }
        } else if (options.file) {
            const content = await generate(finalPrompt);
            filePath = path.isAbsolute(options.file)
                ? options.file
                : path.join(vault, options.file);
            createFile(filePath, content);
            console.log("✅ Catatan berhasil dibuat!");
        } else {
            const content = await generate(finalPrompt);
            const title = options.title || "AI Note";
            const folder = options.folder || "AI";
            filePath = uniquePath(path.join(vault, folder, `${title}.md`));
            createFile(filePath, content);
            console.log("✅ Catatan berhasil dibuat!");
        }

        console.log("📁 " + filePath);
    } catch (err) {
        const msg = err.message || "Unknown error";
        if (msg.includes("connect ke Ollama") || msg.includes("ECONNREFUSED")) {
            console.log("❌ Ollama belum jalan. Jalankan `ollama serve` dulu.");
        } else if (msg.includes("API key")) {
            console.log("❌ " + msg);
        } else if (msg.includes("timeout")) {
            console.log("❌ Response timeout. Coba prompt yang lebih pendek.");
        } else {
            console.log("❌ " + msg);
        }
    }
}

module.exports = aiWrite;