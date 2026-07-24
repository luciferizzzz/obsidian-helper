const fs = require("fs");
const path = require("path");

const configPath = path.join(__dirname, "..", "config.json");

function saveConfig(config) {
    fs.writeFileSync(
        configPath,
        JSON.stringify(config, null, 2),
        "utf8"
    );
}

function getConfig() {
    if (!fs.existsSync(configPath)) {
        return null;
    }

    try {
        return JSON.parse(
            fs.readFileSync(configPath, "utf8")
        );
    } catch (err) {
        return null;
    }
}

module.exports = {
    saveConfig,
    getConfig,
};