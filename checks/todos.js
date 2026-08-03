const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");

function extractTodos(content, filePath, vault) {
    const lines = content.split("\n");
    const todos = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Match `- [ ] text` or `- [x] text`
        const match = line.match(/^[\s]*- \[([ x])\] (.+)/i);

        if (match) {
            const done = match[1].toLowerCase() === "x";
            const text = match[2].trim();

            // Extract tags from the text
            const tags = [];
            const tagRegex = /#([a-zA-Z0-9_/][a-zA-Z0-9_\-/]*)/g;
            let tagMatch;
            while ((tagMatch = tagRegex.exec(text)) !== null) {
                tags.push("#" + tagMatch[1]);
            }

            todos.push({
                done,
                text: text.replace(/#[a-zA-Z0-9_/][a-zA-Z0-9_\-/]*/g, "").trim(),
                line: i + 1,
                file: path.relative(vault, filePath).split(path.sep).join("/"),
                tags,
            });
        }
    }

    return todos;
}

function scanAllTodos() {
    const vault = getVaultPath();
    const files = scanMarkdownFiles(vault);
    const allTodos = [];

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        const todos = extractTodos(content, file, vault);
        allTodos.push(...todos);
    }

    return allTodos;
}

module.exports = {
    extractTodos,
    scanAllTodos,
};
