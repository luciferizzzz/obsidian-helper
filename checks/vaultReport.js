const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");
const { buildNoteIndex } = require("../utils/noteIndex");
const { extractWikiLinks } = require("../utils/wikilinks");

function stripCodeBlocks(content) {
    let result = content.replace(/```[\s\S]*?```/g, "");
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

function scanAttachments(root) {
    const attachments = [];

    function scan(dir) {
        const entries = fs.readdirSync(dir, {
            withFileTypes: true,
        });

        for (const entry of entries) {
            // Skip hidden folders like .obsidian
            if (entry.name.startsWith(".")) {
                continue;
            }

            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                scan(fullPath);
            } else if (!entry.name.endsWith(".md")) {
                attachments.push(fullPath);
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

function dateKey(date) {
    return (
        `${date.getFullYear()}-` +
        `${String(date.getMonth() + 1).padStart(2, "0")}-` +
        `${String(date.getDate()).padStart(2, "0")}`
    );
}

function collectVaultReport() {
    const vault = getVaultPath();

    const files = scanMarkdownFiles(vault);
    const notes = buildNoteIndex(files);

    let totalWords = 0;
    let totalSize = 0;
    let totalLinks = 0;

    const broken = [];
    const tagCount = {};
    const folderCount = {};
    const incoming = {};
    const outgoing = {};
    const notesToday = [];
    const activity = {};

    const todayKey = dateKey(new Date());

    // Last 7 days activity buckets (including today)
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        activity[dateKey(d)] = 0;
    }

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        const stat = fs.statSync(file);

        totalSize += stat.size;

        const words = stripCodeBlocks(content)
            .replace(/[#*_>`[\]]/g, " ")
            .split(/\s+/)
            .filter(Boolean);
        totalWords += words.length;

        const mtimeKey = dateKey(stat.mtime);

        if (mtimeKey === todayKey) {
            notesToday.push(file);
        }

        if (activity[mtimeKey] !== undefined) {
            activity[mtimeKey]++;
        }

        const noteName = path.basename(file, ".md");
        const links = extractWikiLinks(content);

        totalLinks += links.length;
        outgoing[noteName] = links.length;

        for (const link of links) {
            const clean = link.split("#")[0].trim().toLowerCase();
            let found = false;

            for (const note of notes) {
                if (note.toLowerCase() === clean) {
                    if (!incoming[note]) {
                        incoming[note] = 0;
                    }
                    incoming[note]++;
                    found = true;
                    break;
                }
            }

            if (!found) {
                broken.push({ file, link });
            }
        }

        for (const tag of extractTags(content)) {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        }

        const folder = path.relative(vault, path.dirname(file));
        const folderName = folder.split(path.sep)[0] || "(root)";
        folderCount[folderName] = (folderCount[folderName] || 0) + 1;
    }

    // Orphan notes (never referenced by any wiki link)
    const orphans = [];

    for (const note of notes) {
        if (!incoming[note]) {
            orphans.push(note);
        }
    }

    // Attachments (non-markdown files)
    const attachments = scanAttachments(vault);
    const attachmentSize = attachments.reduce(
        (sum, file) => sum + fs.statSync(file).size,
        0
    );

    // Recent notes sorted by modification time
    const recent = files
        .map((file) => ({
            path: path.relative(vault, file).split(path.sep).join("/"),
            mtime: fs.statSync(file).mtime,
        }))
        .sort((a, b) => b.mtime - a.mtime);

    // Most linked notes (by outgoing links)
    const mostLinked = Object.entries(outgoing)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Tags sorted by frequency
    const tags = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1]);

    // Folders sorted by note count
    const folders = Object.entries(folderCount)
        .sort((a, b) => b[1] - a[1]);

    return {
        vault,
        noteCount: files.length,
        folderCount: folders.length,
        totalSize,
        totalWords,
        totalLinks,
        brokenCount: broken.length,
        broken,
        orphanCount: orphans.length,
        orphans,
        notesToday,
        activity,
        recent,
        mostLinked,
        tags,
        folders,
        attachmentCount: attachments.length,
        attachmentSize,
        avgLinks: files.length > 0
            ? (totalLinks / files.length).toFixed(2)
            : "0.00",
    };
}

module.exports = collectVaultReport;

module.exports.formatSize = formatSize;
