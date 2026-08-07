const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { scanMarkdownFiles } = require("../utils/scanner");
const relationship = require("../utils/relationship");

function relations(note) {
    const vault = getVaultPath();
    const files = scanMarkdownFiles(vault);

    const { findNoteFile, scanRelatedLinks, scanIncomingLinks } = relationship.scanner;
    const { parseWikiLinks } = relationship.parser;
    const { normalizeNoteRef } = relationship.validator;
    const { formatRelations } = relationship.formatter;

    const noteFile = findNoteFile(files, note);
    if (!noteFile) {
        console.log(`Note not found: ${note}`);
        return;
    }

    const noteName = path.basename(noteFile, ".md");

    const related = scanRelatedLinks(files, noteName);
    const incoming = scanIncomingLinks(files);
    const backlinks = (incoming[normalizeNoteRef(noteName)] || []).map((link) => link.source);
    const outgoing = parseWikiLinks(fs.readFileSync(noteFile, "utf8"));

    console.log(formatRelations({ note: noteName, related, backlinks, outgoing }));
}

module.exports = relations;
