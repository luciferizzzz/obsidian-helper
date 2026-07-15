const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault")

function rename(folder, oldName, newName) {
    const vault = getVaultPath();

    const oldPath = path.join(
        vault,
        folder,
        `${oldName}.md`
    );

    const newPath = path.join(
        vault,
        folder,
        `${newName}.md`
    );

    if (!fs.existsSync(oldPath)) {
        console.log("Note tidak ditemukan.");
        return;
    }

    if (fs.existsSync(newPath)) {
        console.log("Nama note sudah digunakan.");
        return;
    } 

    console.log("Note berhasil diubah.");
    console.log(path.relative(vault, newPath));
}

module.exports = rename