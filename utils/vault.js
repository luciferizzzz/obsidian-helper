const fs = require("fs");
const path = require("path");

function getVaultPath() {
    const configPath = path.join(__dirname, "..", "config.json");
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        if (config.vault) {
            return config.vault;
        }
    }
    return "D:\\obsidian\\Workspace";
}

module.exports = {
    getVaultPath,
};