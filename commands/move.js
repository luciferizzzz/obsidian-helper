const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");
const { mdFileName } = require("../utils/sanitizeFilename");

function move(sourceFolder, title, targetFolder) {
    const vault = getVaultPath();

    const rawSource = path.join(
        vault,
        sourceFolder,
        `${title}.md`
    );

    const source = fs.existsSync(rawSource)
        ? rawSource
        : path.join(vault, sourceFolder, mdFileName(title));

    const destination = path.join(
        vault,
        targetFolder,
        mdFileName(title)
    );

    if (!fs.existsSync(source)) {
        console.log("Note tidak ditemukan.");
        return;
    }

    fs.renameSync(source, destination);

    console.log("Note berhasil dipindahkan.");
    console.log(`${sourceFolder} → ${targetFolder}`);
}

module.exports = move;