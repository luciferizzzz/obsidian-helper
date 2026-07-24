const fs = require("fs");
const path = require("path");
const { input } = require("@inquirer/prompts");

const configPath = path.join(__dirname, "..", "config.json");
const examplePath = path.join(__dirname, "..", "config-example.json");

// Read config.json, return null if missing
function loadConfig() {
    if (!fs.existsSync(configPath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

// Write config.json with pretty formatting
function saveConfig(data) {
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

// Ensure config.json exists, create from example if missing
function ensureConfig() {
    if (!fs.existsSync(configPath)) {
        if (fs.existsSync(examplePath)) {
            const example = fs.readFileSync(examplePath, "utf8");
            fs.writeFileSync(configPath, example);
        } else {
            saveConfig({ vault: "" });
        }
    }
}

async function config(subcommand) {
    ensureConfig();

    if (subcommand === "show") {
        // Display raw config.json content
        const raw = fs.readFileSync(configPath, "utf8");
        console.log(raw);
        return;
    }

    if (subcommand === "set") {
        // Prompt for new vault path and validate
        const vault = await input({
            message: "Enter new vault path:",
        });

        if (!fs.existsSync(vault)) {
            console.log("Invalid path.");
            return;
        }

        const current = loadConfig() || {};
        current.vault = vault;
        saveConfig(current);
        console.log("Vault path updated.");
        return;
    }

    if (subcommand === "reset") {
        // Restore config from config-example.json
        if (!fs.existsSync(examplePath)) {
            console.log("config-example.json not found.");
            return;
        }

        const example = fs.readFileSync(examplePath, "utf8");
        fs.writeFileSync(configPath, example);
        console.log("Config reset to default.");
        return;
    }

    // Default: show current configuration
    const cfg = loadConfig();

    if (!cfg || !cfg.vault) {
        console.log("No configuration found. Run `obs init` first.");
        return;
    }

    console.log("\nVault:");
    console.log(cfg.vault);
    console.log("\n------------------");
}

module.exports = config;
