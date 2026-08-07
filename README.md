# 📚 Obsidian Helper

<p align="center">

**A fast, lightweight, open-source CLI for managing your Obsidian Vault directly from the terminal.**

No more opening Obsidian just to create, rename, move, search, or organize notes.

Built for developers, students, writers, researchers, and terminal enthusiasts.

</p>

<p align="center">

![Version](https://img.shields.io/badge/version-v1.4.6-blue)
![Node](https://img.shields.io/badge/node-18+-green)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-lightgrey)
![License](https://img.shields.io/badge/license-MIT-yellow)
![Open Source](https://img.shields.io/badge/Open%20Source-❤-red)

</p>

---

> **Independent Community Project**
>
> Obsidian Helper is an independent open-source project.
>
> It is **not affiliated with, endorsed by, or sponsored by Obsidian** or its developers.

---

# ✨ Why Obsidian Helper?

Managing notes shouldn't require opening a GUI every few minutes.

Instead of:

```
Open Obsidian
↓
Find Folder
↓
Create Note
↓
Rename
↓
Move
↓
Close Obsidian
```

Just type:

```bash
obs new Notes "Learning Rust"
```

Done.

Obsidian Helper lets you manage your entire vault directly from your terminal.

---

# 🎬 Preview

> *(GIFs or screenshots here)*

```bash
obs new Notes "JavaScript Closures"

✔ Created:
Vault/
└── Notes/
    └── JavaScript Closures.md
```

---

# 🚀 Highlights

## 📝 Note Management

- Create notes
- Daily Notes
- Rename notes
- Move notes
- Open notes
- Recent notes
- Random notes

---

## 📂 Vault Management

- Dashboard
- Statistics
- Tree View
- List Notes
- Backup
- Archive
- Cleanup
- Export Reports

---

## 🔗 Knowledge Management

- Find Notes
- Backlinks
- Orphan Notes
- Graph Analysis
- Tags
- Dead Wiki Links
- Vault Doctor

---

## 🤖 AI Assistant

Supports **local** and **cloud** AI.

### Providers

✅ Ollama

✅ OpenAI

✅ OpenRouter

✅ LM Studio

✅ Any OpenAI-compatible API

AI can:

- Generate Notes
- Update Daily Notes
- Fill Templates
- Tomorrow Planning
- Weekly Planning
- Interactive Journaling
- Direct File Writing

---

# ⚡ Quick Start

Install

```bash
git clone https://github.com/luciferizzzz/obsidian-helper.git

cd obsidian-helper

npm install

npm link
```

Initialize

```bash
obs init
```

> **Required.** Obsidian Helper must know your vault before any vault command can run.
> `obs init` saves the path to `config.json`. Without it, commands fail with a clear
> `Vault is not configured` error (run `obs init` to fix).

Create your first note

```bash
obs new Notes "Learning Rust"
```

Find notes

```bash
obs find rust
```

Generate AI content

```bash
obs ai "Explain Rust ownership"
```

---

# 📖 Documentation

Documentation has been split into dedicated files.

| Document | Description |
|----------|-------------|
| [docs/AI.md](docs/AI.md) | AI setup, providers & workflows |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Internal architecture |
| [docs/COMMANDS.md](docs/COMMANDS.md) | All available commands |
| [docs/CONFIGURATION.md](docs/CONFIGURATION.md) | Configuration guide |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contribution guidelines |
| [docs/FAQ.md](docs/FAQ.md) | Frequently asked questions |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Future development |
| [docs/TEMPLATE_GUIDE.md](docs/TEMPLATE_GUIDE.md) | Template system |
| CHANGELOG.md | Release history |

---

# 🏗 Architecture

```
CLI
 │
 ▼
Commands
 │
 ▼
Utilities
 │
 ▼
Checks
 │
 ▼
Vault
```

Small commands.

Reusable utilities.

Easy to extend.

---

# 📁 Project Structure

```
obsidian-helper/

bin/
commands/
checks/
docs/
templates/
utils/

README.md
CHANGELOG.md
LICENSE
```

---

# 🛣 Roadmap

## 🚧 v1.5

- Interactive Terminal UI
- Better Navigation
- Relationship Commands
- Shell Autocomplete
- Fuzzy Search

---

## 🚀 v2

- Multi Vault
- Workspace Profiles
- Git Integration
- Automation

---

## 🌌 v3

Transform Obsidian Helper into a complete knowledge management platform.

- Terminal UI
- REST API
- Web Dashboard
- Plugin Marketplace
- AI Ecosystem
- MCP Integration

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch
3. Commit changes
4. Open a Pull Request

Bug reports and feature requests are always appreciated.

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for the full contribution guide.

---

# ⭐ Support

If Obsidian Helper improves your workflow, consider giving the project a ⭐.

Every star helps the project reach more users and motivates future development.

---

# 📄 License

Released under the **MIT License**.

See the **LICENSE** file for details.

---

## ❤️ Acknowledgements

Thanks to the Obsidian community for inspiring an amazing knowledge management ecosystem.

---

### Disclaimer

Obsidian Helper is an independent community project.

It is **not affiliated with, endorsed by, sponsored by, or officially associated with Obsidian or Dynalist Inc.**

Obsidian Helper works with user-owned Markdown files stored in an Obsidian vault. It does **not** include, modify, distribute, or use any proprietary Obsidian source code, assets, or internal APIs.

**Obsidian®** is a registered trademark of **Dynalist Inc.** All trademarks, product names, and logos belong to their respective owners.
