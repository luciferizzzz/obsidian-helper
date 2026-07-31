const path = require("path");

const collectVaultReport = require("../checks/vaultReport");

function formatDate(date) {
    return (
        `${date.getFullYear()}-` +
        `${String(date.getMonth() + 1).padStart(2, "0")}-` +
        `${String(date.getDate()).padStart(2, "0")} ` +
        `${String(date.getHours()).padStart(2, "0")}:` +
        `${String(date.getMinutes()).padStart(2, "0")}`
    );
}

function report() {
    const data = collectVaultReport();

    if (data.noteCount === 0) {
        console.log("Vault kosong. Tidak ada note ditemukan.");
        return;
    }

    console.log("\n📋 Vault Report\n");
    console.log(`📍 ${data.vault}\n`);

    // Overview
    console.log("Overview\n");

    console.log(`Notes          : ${data.noteCount}`);
    console.log(`Folders        : ${data.folderCount}`);
    console.log(`Total Size     : ${data.totalSize} bytes`);
    console.log(`Total Words    : ${data.totalWords}`);

    // Folder distribution
    console.log("\nFolder Distribution\n");

    for (const [folder, count] of data.folders) {
        console.log(`  ${folder.padEnd(15)} ${count} notes`);
    }

    // Graph / links
    console.log("\nGraph & Links\n");

    console.log(`Wiki Links     : ${data.totalLinks}`);
    console.log(`Average Links  : ${data.avgLinks} per note`);
    console.log(`Broken Links   : ${data.brokenCount}`);
    console.log(`Orphan Notes   : ${data.orphanCount}`);

    if (data.mostLinked.length > 0) {
        console.log("\nMost Linked Notes\n");

        data.mostLinked.forEach(([note, count], i) => {
            console.log(`  ${i + 1}. ${note} (${count})`);
        });
    }

    // Tags
    if (data.tags.length > 0) {
        console.log("\nTags\n");

        data.tags.slice(0, 10).forEach(([tag, count]) => {
            console.log(`  ${tag} (${count})`);
        });
    }

    // Attachments
    console.log("\nAttachments\n");

    console.log(`Files          : ${data.attachmentCount}`);
    console.log(`Total Size     : ${data.attachmentSize} bytes`);

    // Recent activity
    console.log("\nRecent Activity\n");

    data.recent.slice(0, 10).forEach((entry, index) => {
        console.log(`  ${index + 1}. ${entry.path}`);
        console.log(`     ${formatDate(entry.mtime)}`);
    });

    // Broken links detail
    if (data.brokenCount > 0) {
        console.log("\nBroken Links\n");

        data.broken.slice(0, 10).forEach(({ file, link }) => {
            const rel = path.relative(data.vault, file).split(path.sep).join("/");
            console.log(`  ${rel} → [[${link}]]`);
        });

        if (data.brokenCount > 10) {
            console.log(`  ... dan ${data.brokenCount - 10} lainnya`);
        }
    }

    console.log("\n────────────────────────");
    console.log(`Total Note: ${data.noteCount} | Words: ${data.totalWords} | Broken Links: ${data.brokenCount}`);
}

module.exports = report;
