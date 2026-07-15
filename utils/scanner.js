const fs = require("fs");
const path = require("path");

function scanMarkdownFiles(root) {
    const files = [];

    function scan(dir) {
        const entries = fs.readdirSync(dir, {
            withFileTypes: true,
        });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                scan(fullPath);
            } else if (entry.name.endsWith(".md")) {
                files.push(fullPath);
            }
        }
    }

    scan(root);

    return files;
}

module.exports = {
    scanMarkdownFiles,
};