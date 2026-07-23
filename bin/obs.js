#!/usr/bin/env node

const { Command } = require("commander");

const { Option } = require("commander");

const program = new Command();

const doctor = require("../commands/doctor");

const deadlinks = require("../commands/deadlinks");

const move = require("../commands/move");

const stats = require("../commands/stats")

const open = require("../commands/open");

const rename = require("../commands/rename");

const find = require("../commands/find");

const today = require("../commands/today");

const init = require("../commands/init");

const newNote = require("../commands/new");

const list = require("../commands/list");


program
  .name("obs")
  .description("Obsidian Helper CLI")
  .version("1.0.0");

program
  .command("hello")
  .description("Test command")
  .action(() => {
    console.log("Hello from Obsidian Helper 🚀");
  });

program
  .command("init")
  .description("Set lokasi obsidian vault")
  .action(init)

program
  .command("new <folder> <title>")
  .description("Membuat note baru")
  .addOption(
    new Option("-t, --template <name>", "Gunakan template")
  )
  .action((folder, title, options) =>{
    newNote(folder, title, options);
  });

program
  .command("today")
  .description("Membuat daily note")
  .action(today);

program
  .command("find <keywords>")
  .description("Cari note")
  .action(find);

program
  .command("rename <folder> <oldName> <newName>")
  .description("Mengubah nama note")
  .action(rename);

program
  .command("open <keyword>")
  .description("Membuka note")
  .action(open);

program
  .command("stats")
  .description("Menampilkan statistik vault")
  .action(stats);

program
  .command("list")
  .description("Menampilkan semua note dalam vault")
  .action(list);

program
  .command("move <sourceFolder> <title> <targetFolder>")
  .description("Memindahkan note")
  .action(move);

program
  .command("deadlinks")
  .description("Check broken wiki links")
  .action(deadlinks);

program
  .command("doctor")
  .description("Analyze vault health")
  .action(doctor);

program.parse();