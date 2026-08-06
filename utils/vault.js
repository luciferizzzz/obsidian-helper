const { getConfig } = require("./config");

function getVaultPath() {
    const config = getConfig();
    const vault = config && typeof config.vault === "string" ? config.vault.trim() : "";

    if (vault) {
        return vault;
    }

    throw new Error(
        "Vault is not configured.\n\n" +
        "Run:\n\n" +
        "    obs init\n\n" +
        "to configure your Obsidian vault."
    );
}

module.exports = {
    getVaultPath,
};
