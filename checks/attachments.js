const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");

function scanAttachments(root) {
    const attachments = [];

    function scan(dir) {
        const entries = fs.readdirSync(dir, {
            withFileTypes: true,
        });

        for (const entry of entries) {
            if (entry.name.startsWith(".")) {
                continue;
            }

            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                scan(fullPath);
            } else if (!entry.name.endsWith(".md")) {
                const stat = fs.statSync(fullPath);
                attachments.push({
                    name: entry.name,
                    path: fullPath,
                    relPath: path.relative(root, fullPath).split(path.sep).join("/"),
                    size: stat.size,
                    mtime: stat.mtime,
                    ext: path.extname(entry.name).toLowerCase(),
                });
            }
        }
    }

    scan(root);

    return attachments;
}

function formatSize(bytes) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function inspectAttachments() {
    const vault = getVaultPath();
    const attachments = scanAttachments(vault);

    // Check which attachments are referenced in notes
    const files = scanMarkdownFiles(vault);
    const referencedSet = new Set();
    const unreferenced = [];

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        for (const att of attachments) {
            const basename = path.basename(att.name);
            if (content.includes(basename)) {
                referencedSet.add(att.path);
            }
        }
    }

    for (const att of attachments) {
        if (!referencedSet.has(att.path)) {
            unreferenced.push(att);
        }
    }

    // Group by extension
    const byExtension = {};
    for (const att of attachments) {
        const ext = att.ext || "(none)";
        if (!byExtension[ext]) {
            byExtension[ext] = { count: 0, size: 0, items: [] };
        }
        byExtension[ext].count++;
        byExtension[ext].size += att.size;
        byExtension[ext].items.push(att);
    }

    // Sort by size
    const sorted = Object.entries(byExtension)
        .sort((a, b) => b[1].size - a[1].size);

    return {
        vault,
        total: attachments.length,
        attachments,
        unreferenced,
        unreferencedCount: unreferenced.length,
        totalSize: attachments.reduce((sum, a) => sum + a.size, 0),
        byExtension: sorted,
    };
}

module.exports = {
    scanAttachments,
    inspectAttachments,
    formatSize,
};
