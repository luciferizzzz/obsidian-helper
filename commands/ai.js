const path = require("path");
const fs = require("fs");
const { input } = require("@inquirer/prompts");
const { generate } = require("../utils/ollama");
const { createFile } = require("../utils/file");
const { getVaultPath } = require("../utils/vault");
const { parseTemplate } = require("../utils/markdown");

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

Buat 3 bagian untuk daily note hari ini dengan heading:
## Target Hari Ini
## Catatan
## Selesai

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
    const clean = newContent.replace(/^## Catatan\s*\n*/i, "").trim();

    const placeholderRe = /(## Catatan\n+)-(\s*)(?=\n+## |\n+---|$)/i;
    if (placeholderRe.test(content)) {
        return content.replace(placeholderRe, `$1${clean}`);
    }

    const sectionRe = /(## Catatan\n+)([\s\S]*?)(?=\n+## |\n+---|$)/i;
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
        `(${escaped}\\n+)(?:-|\\s*)(?=\\n+---|\\n+## |$)`,
        "i"
    );
    if (re.test(content)) {
        return content.replace(re, `$1${newContent.trim()}`);
    }
    return content;
}

function parseSections(aiContent) {
    const sections = {};
    const patterns = [
        ["target", "## Target Hari Ini"],
        ["catatan", "## Catatan"],
        ["selesai", "## Selesai"],
    ];
    for (const [key, heading] of patterns) {
        const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`${escaped}\\n+([\\s\\S]*?)(?=\\n## |$)`, "i");
        const m = aiContent.match(re);
        if (m) sections[key] = m[1].trim();
    }
    return sections;
}

function fillDailyTemplate(template, sections) {
    let result = template;
    const map = {
        target: "## Target Hari Ini",
        catatan: "## Catatan",
        selesai: "## Selesai",
    };
    for (const [key, heading] of Object.entries(map)) {
        if (sections[key]) {
            result = replaceSection(result, heading, sections[key]);
        }
    }
    return result;
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
        const content = await generate(finalPrompt);

        const vault = getVaultPath();
        let filePath;

        if (options.daily) {
            const now = new Date();
            const date =
                `${now.getFullYear()}-` +
                `${String(now.getMonth() + 1).padStart(2, "0")}-` +
                `${String(now.getDate()).padStart(2, "0")}`;
            filePath = path.join(vault, "Daily Notes", `${date}.md`);

            if (options.ask) {
                const templatePath = path.join(
                    __dirname, "..", "templates", "daily.md"
                );
                let template = `# ${date}\n\n`;
                if (fs.existsSync(templatePath)) {
                    template = parseTemplate(
                        fs.readFileSync(templatePath, "utf8"),
                        {
                            title: date,
                            date,
                            folder: "Daily Notes",
                            time: new Date().toLocaleTimeString("id-ID"),
                        }
                    );
                }

                const sections = parseSections(content);
                const filled = fillDailyTemplate(template, sections);

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
                            {
                                title: date,
                                date,
                                folder: "Daily Notes",
                                time: new Date().toLocaleTimeString("id-ID"),
                            }
                        );
                    }
                    const finalContent = insertUnderCatatan(header, content);
                    createFile(filePath, finalContent);
                    console.log("✅ Daily note baru dibuat!");
                }
            }
        } else if (options.file) {
            filePath = path.isAbsolute(options.file)
                ? options.file
                : path.join(vault, options.file);
            createFile(filePath, content);
            console.log("✅ Catatan berhasil dibuat!");
        } else {
            const title = options.title || "AI Note";
            const folder = options.folder || "AI";
            filePath = uniquePath(path.join(vault, folder, `${title}.md`));
            createFile(filePath, content);
            console.log("✅ Catatan berhasil dibuat!");
        }

        console.log("📁 " + filePath);
    } catch (err) {
        const msg = err.message || "Unknown error";
        if (msg.includes("ECONNREFUSED") || msg.includes("connect ke Ollama")) {
            console.log("❌ Ollama belum jalan. Jalankan `ollama serve` dulu.");
        } else if (msg.includes("timeout")) {
            console.log("❌ Response timeout. Coba prompt yang lebih pendek.");
        } else {
            console.log("❌ " + msg);
        }
    }
}

module.exports = aiWrite;
