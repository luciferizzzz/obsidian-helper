const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");
const relationship = require("../utils/relationship");

function unrelate(note, related) {
    const vault = getVaultPath();
    const files = scanMarkdownFiles(vault);

    const { findNoteFile } = relationship.scanner;
    const { removeRelatedFromFile } = relationship.editor;
    const { formatRemoveResult } = relationship.formatter;

    const noteFile = findNoteFile(files, note);
    if (!noteFile) {
        console.log(`Note not found: ${note}`);
        return;
    }

    const relatedFile = findNoteFile(files, related);
    if (!relatedFile) {
        console.log(`Related note not found: ${related}`);
        return;
    }

    const noteName = path.basename(noteFile, ".md");
    const relatedName = path.basename(relatedFile, ".md");

    const result = removeRelatedFromFile(noteFile, relatedName);

    console.log(formatRemoveResult(noteName, relatedName, result.removed));
}

module.exports = unrelate;
