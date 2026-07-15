const path = require("path");
const fs = require("fs");

const { parseTemplate } = require("../utils/markdown");
const { createFile } = require("../utils/file");
const { getVaultPath } = require("../utils/vault");

function newNote(folder, title, options) {
    const vault = getVaultPath();

    let content = "";

    if (options.template) {
        const templatePath = path.join(
            __dirname,
            "..",
            "templates",
            `${options.template}.md`
        );

        if (!fs.existsSync(templatePath)) {
            console.log("❌ Template tidak ditemukan.");
            return;
        }

        content = fs.readFileSync(templatePath, "utf8");

        content = parseTemplate(content, {
            title,
            folder,
            date: new Date().toLocaleDateString("id-ID"),
            time: new Date().toLocaleTimeString("id-ID"),
        });
    }

    const filePath = path.join(
        vault,
        folder,
        `${title}.md`
    );

    try {
        createFile(filePath, content);

        console.log("✅ Note berhasil dibuat!");
        console.log(filePath);
    } catch (err) {
        console.log("❌ " + err.message);
    }
}

module.exports = newNote;

module.exports = newNote;