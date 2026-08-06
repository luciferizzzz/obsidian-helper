function sanitizeFilename(name) {
    return String(name)
        .replace(/[<>:"/\\|?*]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function mdFileName(title) {
    return sanitizeFilename(title).replace(/\.md$/i, "") + ".md";
}

module.exports = sanitizeFilename;
module.exports.sanitizeFilename = sanitizeFilename;
module.exports.mdFileName = mdFileName;
