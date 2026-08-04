const fs = require("fs");
const path = require("path");

function templateList() {
    const templateDir = path.join(__dirname, "..", "templates");
    const files = fs.readdirSync(templateDir);

    console.log("\n📄 Available Templates:\n");

    const templateNames = [];
    for (const file of files) {
        if (file.endsWith(".md")) {
            const name = file.replace(".md", "");
            templateNames.push(name);
            console.log(`  ${name}`);
        }
    }

    console.log("\n");

    return templateNames;
}

function templatePreview(name) {
    const templatePath = path.join(
        __dirname,
        "..",
        "templates",
        `${name}.md`
    );

    if (!fs.existsSync(templatePath)) {
        console.log("❌ Template tidak ditemukan.");
        return null;
    }

    const content = fs.readFileSync(templatePath, "utf8");

    console.log("\n");
    console.log(`📄 Preview: ${name}\n`);
    console.log(content);
    console.log("\n");

    return content;
}

function templateAction(options) {
    if (options.list) {
        return templateList();
    }

    if (options.preview) {
        return templatePreview(options.preview);
    }

    console.log("\n❓ Silakan gunakan --list atau --preview <nama_template>\n");
}

module.exports = templateAction;
