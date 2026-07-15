const path = require("path");

const checkDeadLinks = require("../checks/deadlinks");

function deadlinks() {

    const result = checkDeadLinks();

    if (result.broken.length === 0) {
        console.log("✅ Tidak ada broken links.");
        return;
    }

    const grouped = {};

    for (const item of result.broken) {

        if (!grouped[item.file]) {
            grouped[item.file] = [];
        }

        grouped[item.file].push(item.link);
    }

    console.log("\n❌ Broken Links\n");

    for (const file in grouped) {

        console.log(`📄 ${path.relative(result.vault, file)}`);

        grouped[file].forEach(link => {
            console.log(`   → [[${link}]]`);
        });

        console.log();
    }

    console.log("────────────────────────");

    console.log(`Notes Scanned : ${result.files.length}`);
    console.log(`Links Checked : ${result.totalLinks}`);
    console.log(`Broken Links  : ${result.broken.length}`);
}

module.exports = deadlinks;