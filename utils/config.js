const fs = require("fs");
const path = require("path");
const { config } = require("process");

const configPath = path.join(__dirname, "..", "config.json");

function saveConfig() {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function getConfig() {
    if (!fs.existsSync(configPath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

module.exports = {
    saveConfig,
    getConfig,
};