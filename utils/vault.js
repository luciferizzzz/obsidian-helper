const fs = require("fs");
const path = require("path");

function getVaultPath() {
    const configPath = path.join(__dirname, "..", "config.json");
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        const vault = typeof config.vault === "string" ? config.vault.trim() : "";
        if (vault) {
            return vault;
        }
    }
    return "D:\\Vault";
}

module.exports = {
    getVaultPath,
};