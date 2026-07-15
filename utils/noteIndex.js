const path = require("path");

function buildNoteIndex(files) {
    const notes = new Set();

    for (const file of files) {
        notes.add(path.basename(file, ".md"));
    }

    return notes;
}

module.exports = {
    buildNoteIndex,
};