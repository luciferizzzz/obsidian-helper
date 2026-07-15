const fs = require("fs");
const path = require("path");

const { getVaultPath } = require("../utils/vault");

function move(sourceFolder, title, targetFolder) {
    const vault = getVaultPath();

    const source = path.join(
        vault,
        sourceFolder,
        `${title}.md`
    );

    const destination = path.join(
        vault,
        targetFolder,
        `${title}.md`
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