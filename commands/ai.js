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

    answers.pelajaran = await input({
        message: "Hari ini kamu belajar atau kerjain apa aja?",
    });

    answers.cerita = await input({
        message: "Ada yang menarik atau memorable hari ini?",
    });

    answers.mood = await input({
        message: "Gimana hari ini secara overall? (semangat, biasa aja, capek, dll)",
    });

    return answers;
}

function buildPromptFromAnswers(answers) {
    return `Buatkan catatan daily note dari jawaban user hari ini.

Pelajaran / kerjaan: ${answers.pelajaran}
Cerita menarik: ${answers.cerita}
Mood hari ini: ${answers.mood}

Rangkum jadi catatan yang rapi, tetep pake bahasa santai.`;
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

            if (fs.existsSync(filePath)) {
                fs.appendFileSync(filePath, `\n\n${content}`);
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
                createFile(filePath, header + "\n" + content);
                console.log("✅ Daily note baru dibuat!");
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
