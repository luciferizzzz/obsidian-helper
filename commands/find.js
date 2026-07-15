const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { search } = require("@inquirer/prompts");

function find(keyword) {
    const vault = getVaultPath();

    const results = [];

    search(vault);

    function search(dir) {
        const files = fs.readdirSync(dir, {
            withFileTypes: true,
        });

        for (const file of files) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) {
                search(fullPath);
            } else if (
                file.name.toLowerCase().includes(keyword.toLowerCase())
            ) {
                results.push(path.relative(vault, fullPath));
            }
        }
    }

    if (results.length === 0) {
        console.log("Tidak ada note yang ditemukan.");
        return;
    }

    console.log(`Ditemukan ${results.length} note\n`);

    results.forEach(file => {
        console.log("📄", file);

    });
}

module.exports = find;