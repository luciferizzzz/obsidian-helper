const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");

function stripCodeBlocks(content) {
    // Remove fenced code blocks (``` ... ```)
    let result = content.replace(/```[\s\S]*?```/g, "");

    // Remove inline code (` ... `)
    result = result.replace(/`[^`\n]+`/g, "");

    return result;
}

function extractTags(content) {
    const cleaned = stripCodeBlocks(content);
    const regex = /(?:^|\s)#([a-zA-Z0-9_/][a-zA-Z0-9_\-/]*)/g;
    const tags = [];
    let match;

    while ((match = regex.exec(cleaned)) !== null) {
        tags.push("#" + match[1]);
    }

    return tags;
}

function tags() {
    const vault = getVaultPath();

    const files = scanMarkdownFiles(vault);

    const tagCount = {};

    for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        const found = extractTags(content);

        for (const tag of found) {
            if (!tagCount[tag]) {
                tagCount[tag] = 0;
            }
            tagCount[tag]++;
        }
    }

    const sorted = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1]);

    const uniqueCount = sorted.length;
    const totalCount = sorted.reduce((sum, [, count]) => sum + count, 0);

    console.log("\n🏷️  Tags\n");

    for (const [tag, count] of sorted) {
        console.log(`${tag} (${count})`);
    }

    console.log("\n-----------------------");
    console.log(`Total Tags : ${totalCount}`);
    console.log(`Unique Tags : ${uniqueCount}`);
}

module.exports = tags;
