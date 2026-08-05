const { input } = require("@inquirer/prompts");
const { saveConfig } = require("../utils/config");

async function init() {
    const vault = (await input({
        message: "Lokasi Obsidian Vault",
    })).trim();

    if (!vault) {
        console.log("Path tidak boleh kosong.");
        return;
    }

    saveConfig({ vault });

    console.log("Vault berhasil disimpan.")
}

module.exports = init;