const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault")
const { mdFileName } = require("../utils/sanitizeFilename");

function rename(folder, oldName, newName) {
    const vault = getVaultPath();

    const rawOldPath = path.join(
        vault,
        folder,
        `${oldName}.md`
    );

    const oldPath = fs.existsSync(rawOldPath)
        ? rawOldPath
        : path.join(vault, folder, mdFileName(oldName));

    const newPath = path.join(
        vault,
        folder,
        mdFileName(newName)
    );

    if (!fs.existsSync(oldPath)) {
        console.log("Note tidak ditemukan.");
        return;
    }

    if (fs.existsSync(newPath)) {
        console.log("Nama note sudah digunakan.");
        return;
    } 

    fs.renameSync(oldPath, newPath);

    console.log("Note berhasil diubah.");
    console.log(path.relative(vault, newPath));
}

module.exports = rename