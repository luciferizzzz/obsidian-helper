# 📚 Obsidian Helper

<p align="center">

A fast, lightweight, and open-source CLI tool for managing your Obsidian Vault directly from the terminal.

</p>

<p align="center">

![Version](https://img.shields.io/badge/version-v1.2-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

</p>

---

## ✨ Features

### 📄 Notes

- Create new notes
- Daily Notes
- Rename notes
- Move notes
- Open notes
- Recent notes
- Random note

### 📂 Vault Management

- List all notes
- Tree view
- Vault statistics
- Configuration management

### 🔍 Knowledge Management

- Find notes
- Backlinks
- Orphan notes
- Graph analysis
- Tag extraction
- Broken wiki link detection

### 🧰 Utilities

- Template system
- Vault health check (Doctor)

---

# 🎯 Why Obsidian Helper?

Obsidian Helper is built for people who spend most of their time in the terminal.

Instead of opening Obsidian just to create, rename, move, search, or inspect notes, you can perform common tasks directly from your command line.

### Key Benefits

- ⚡ Fast terminal workflow
- 📂 Organize large vaults
- 🔗 Analyze wiki-link relationships
- 📊 Inspect vault health
- 🧩 Template-based note creation
- 🛠 Lightweight
- 🔌 Easy to extend
- 💻 Cross-platform friendly

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/obsidian-helper.git
```

Enter the project

```bash
cd obsidian-helper
```

Install dependencies

```bash
npm install
```

(Optional)

Link globally

```bash
npm link
```

Verify installation

```bash
obs --help
```

---

# 📋 Requirements

- Node.js 18+
- Obsidian
- Windows
- Linux
- macOS

---

# ⚙️ Configuration

Initialize configuration

```bash
obs init
```

Or manually copy

```bash
copy config.example.json config.json
```

Edit

```json
{
    "vault": "Drivers:\\Obsidian\\Your_Vault"
}
```

---

# 📚 Commands

| Command | Description |
|----------|-------------|
| `obs init` | Create or update configuration |
| `obs new "Note"` | Create a new note |
| `obs new "Note" -t js` | Create note from template |
| `obs today` | Open or create today's note |
| `obs find keyword` | Search notes |
| `obs rename "Old" "New"` | Rename note |
| `obs move "Note" Folder` | Move note |
| `obs open "Note"` | Open note |
| `obs stats` | Display vault statistics |
| `obs list` | List every note |
| `obs tree` | Display vault tree |
| `obs recent` | Show recent notes |
| `obs random` | Open random note |
| `obs deadlinks` | Detect broken wiki links |
| `obs backlinks <note>` | Find backlinks |
| `obs orphan` | Find orphan notes |
| `obs doctor` | Analyze vault health |
| `obs graph` | Analyze note relationships |
| `obs tags` | Extract tags |
| `obs config` | Configuration manager |

---

# 💡 Usage Examples

Create a JavaScript note

```bash
obs new "JavaScript" -t js
```

Create today's daily note

```bash
obs today
```

Find notes

```bash
obs find javascript
```

Rename a note

```bash
obs rename "Old Note" "New Note"
```

Move a note

```bash
obs move "JavaScript" Code
```

Display vault statistics

```bash
obs stats
```

Display folder tree

```bash
obs tree
```

Find backlinks

```bash
obs backlinks JavaScript
```

Analyze graph

```bash
obs graph
```

Show tags

```bash
obs tags
```

---

# 🏗 Architecture

The project is organized into reusable modules.

```text
             CLI Commands
                  │
                  ▼
          Command Handlers
                  │
                  ▼
          Utility Functions
                  │
                  ▼
          Vault Scanner
                  │
                  ▼
        Markdown Parser
                  │
                  ▼
             Console Output
```

This layered architecture keeps commands small while allowing multiple features to reuse the same core logic.

---

# 📁 Project Structure

```text
obsidian-helper/
│
├── bin/
│   └── obs.js
│
├── commands/
│   ├── backlinks.js
│   ├── config.js
│   ├── deadlinks.js
│   ├── doctor.js
│   ├── find.js
│   ├── graph.js
│   ├── init.js
│   ├── list.js
│   ├── move.js
│   ├── new.js
│   ├── open.js
│   ├── orphan.js
│   ├── random.js
│   ├── recent.js
│   ├── rename.js
│   ├── stats.js
│   ├── tags.js
│   ├── template.js
│   ├── today.js
│   └── tree.js
│
├── templates/
│
├── utils/
│
├── config.example.json
├── package.json
└── README.md
```

For a detailed explanation of the project architecture, see **PROJECT_STRUCTURE.md**.

---

# 🛣️ Roadmap

## ✅ Version 1.0

- New Note
- Daily Notes
- Find Notes
- Rename Notes
- Move Notes
- Open Notes
- Vault Statistics
- Template System
- Dead Link Detection
- Vault Doctor

---

## ✅ Version 1.1

- List Notes
- Tree View
- Recent Notes
- Random Note
- Configuration Management

---

## ✅ Version 1.2

- Backlinks
- Orphan Notes
- Graph Analysis
- Tag Management

---

## 🚧 Version 1.3 (Planned)

### Productivity

- Dashboard
- Vault Report
- Todo Scanner
- Attachment Inspector
- Backup Vault
- Archive Notes
- Cleanup Command

### Export

- Markdown Report
- HTML Report
- JSON Export

---

## 🚧 Version 2.0 (Planned)

### Interactive Mode

Launch a full interactive terminal interface.

```bash
obs
```

Example

```text
📚 Obsidian Helper

> New Note
  Find Note
  Open Note
  Random Note
  Stats
  Graph
  Doctor
  Config
```

### Plugin System

Install third-party commands as plugins.

### Multi Vault Support

Switch between multiple Obsidian vaults.

### Watch Mode

Automatically monitor vault changes.

### Shell Autocomplete

Autocomplete commands and note names.

### Fuzzy Search

Search notes with typo tolerance.

---

# 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# ❤️ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

Every star helps the project reach more users and motivates future development.

---

# 📄 License

This project is licensed under the MIT License.
