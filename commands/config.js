const fs = require("fs");
const path = require("path");
const { input } = require("@inquirer/prompts");

const configPath = path.join(__dirname, "..", "config.json");

function loadConfig() {
    if (!fs.existsSync(configPath)) {
        return null;
    }

    return JSON.parse(
        fs.readFileSync(configPath, "utf8")
    );
}

function saveConfig(data) {
    fs.writeFileSync(
        configPath,
        JSON.stringify(data, null, 2),
        "utf8"
    );
}

async function config(subcommand) {

    let cfg = loadConfig();

    if (!cfg) {
        console.log("No configuration found.");
        console.log("Run `obs init` first.");
        return;
    }

    switch (subcommand) {

        case "show":
            console.log(
                JSON.stringify(cfg, null, 2)
            );
            return;

        case "set":

            const vault = await input({
                message: "New vault path:"
            });

            if (!fs.existsSync(vault)) {
                console.log("Invalid path.");
                return;
            }

            cfg.vault = vault;

            saveConfig(cfg);

            console.log("Vault updated.");
            return;

        case "reset":

            saveConfig({
                vault: ""
            });

            console.log("Configuration reset.");
            return;

        default:

            console.log("Current Configuration");
            console.log("----------------------");
            console.log("Vault :", cfg.vault || "(not configured)");
    }

}

module.exports = config;