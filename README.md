# 📚 Obsidian Helper

<p align="center">

A fast, lightweight, and open-source CLI tool for managing your Obsidian vault directly from the terminal.

</p>

<p align="center">

![Version](https://img.shields.io/badge/version-v1.2.2-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![License](https://img.shields.io/badge/license-MIT-yellow)

</p>

---

## ✨ Features

### 📄 Notes

- Create new notes
- Daily notes
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

### 🤖 AI (Qwen 2.5 via Ollama)

- AI note writing
- Interactive daily journaling with deep questions
- Direct file writing
- Daily note integration (fills ##Target, ##Catatan, ##Selesai)

---

## 🎯 Why Obsidian Helper?

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

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/luciferizzzz/obsidian-helper.git
```

Enter the project directory:

```bash
cd obsidian-helper
```

Install dependencies:

```bash
npm install
```

(Optional) Link globally for system-wide access:

```bash
npm link
```

Verify the installation:

```bash
obs --help
```

---

## 📋 Requirements

- Node.js 18+
- Obsidian
- Windows / Linux / macOS
- [Ollama](https://ollama.com) (for AI features)

---

## ⚙️ Configuration

Initialize configuration interactively:

```bash
obs init
```

Or copy the example configuration manually:

```bash
copy config-example.json config.json
```

Edit `config.json` with your vault path:

```json
{
    "vault": "D:\\Your\\Obsidian\\Vault"
}
```

---

## 📚 Commands

| Command | Description |
| --- | --- |
| `obs init` | Create or update configuration |
| `obs new <folder> <title> -t <template>` | Create a new note (with optional template) |
| `obs today` | Open or create today's daily note |
| `obs find <keywords>` | Search notes by keyword |
| `obs rename <folder> <old> <new>` | Rename a note |
| `obs move <source> <title> <target>` | Move a note to another folder |
| `obs open <keyword>` | Open a note |
| `obs stats` | Display vault statistics |
| `obs list` | List every note in the vault |
| `obs tree` | Display vault folder tree |
| `obs recent [limit]` | Show recently modified notes |
| `obs random --open` | Open a random note |
| `obs deadlinks` | Detect broken wiki links |
| `obs backlinks <note>` | Find notes that reference a given note |
| `obs orphan` | Find notes with no incoming wiki links |
| `obs doctor` | Analyze vault health |
| `obs graph` | Analyze note relationships |
| `obs tags` | Extract tags from all notes |
| `obs config [subcommand]` | Manage configuration (show, set vault, reset) |
| `obs ai <prompt>` | Create a note with AI |
| `obs ai --ask --daily` | Interactive daily journal with AI |

---

## 📌 Version 1.2.2 (Mini Update)

- **Deep questions** — `--ask` mode now asks 7 questions (target, selesai, syukur, refleksi)
- **All sections filled** — AI fills `## Target Hari Ini`, `## Catatan`, `## Selesai`
- **Template-aware** — content placed inside template sections, not appended at end
- **Smart existing note handling** — existing daily notes also get content in correct sections

---

## 💡 Usage Examples

Create a JavaScript note:

```bash
obs new Code "JavaScript" -t js
```

Create today's daily note:

```bash
obs today
```

Find notes:

```bash
obs find javascript
```

Rename a note:

```bash
obs rename Code "Old Note" "New Note"
```

Move a note to another folder:

```bash
obs move Code "JavaScript" Projects
```

Display vault statistics:

```bash
obs stats
```

Display folder tree:

```bash
obs tree
```

Find backlinks:

```bash
obs backlinks JavaScript
```

Analyze graph:

```bash
obs graph
```

Show tags:

```bash
obs tags
```

Create a note with AI:

```bash
obs ai "explain closures in JavaScript"
```

Create an AI note in a specific folder:

```bash
obs ai "remote work productivity tips" -t "Remote Work" -f "Notes/Productivity"
```

Write AI content directly to a file:

```bash
obs ai "summary of chapter 3 Clean Code" --file "Reading/Clean Code/Chapter 3.md"
```

Interactive daily journal with AI:

```bash
obs ai --ask --daily
```

---

## 🤖 AI Setup

Obsidian Helper integrates with **Ollama** for local AI-powered note writing.

### Prerequisites

1. Install [Ollama](https://ollama.com).
2. Pull the required model:

```bash
ollama pull qwen2.5-coder:7b
```

3. Make sure Ollama is running:

```bash
ollama serve
```

### AI Commands

| Command | Description |
| --- | --- |
| `obs ai <prompt>` | Create an AI note in the `AI/` folder |
| `obs ai <prompt> -t "Title"` | Set a custom title |
| `obs ai <prompt> -f "Folder"` | Save to a custom folder |
| `obs ai <prompt> --file <path>` | Write to a specific file |
| `obs ai <prompt> --daily` | Append AI content under ##Catatan in today's daily note |
| `obs ai --ask --daily` | Interactive mode with 7 deep questions, fills all template sections |

---

## 🏗 Architecture

The project is organized into reusable modules following a layered architecture:

```text
             CLI Input
                │
                ▼
         Command Handlers
                │
                ▼
         Checks / Utilities
                │
                ▼
           Vault Files
```

Each layer has a single responsibility:

- **CLI** handles user input and argument parsing.
- **Commands** coordinate actions and delegate to checks or utilities.
- **Checks** analyze vault data and return structured results.
- **Utilities** provide reusable helpers for file I/O, markdown parsing, and more.
- **Vault** stores the actual notes on disk.

This separation keeps commands small while allowing multiple features to reuse the same core logic.

---

## 📁 Project Structure

```text
obsidian-helper/
│
├── bin/
│   └── obs.js
│
├── checks/
│   └── deadlinks.js
│
├── commands/
│   ├── ai.js
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
│   ├── book.md
│   ├── css.md
│   ├── daily.md
│   ├── html.md
│   └── js.md
│
├── utils/
│   ├── config.js
│   ├── file.js
│   ├── markdown.js
│   ├── noteIndex.js
│   ├── ollama.js
│   ├── scanner.js
│   ├── vault.js
│   └── wikilinks.js
│
├── config-example.json
├── obs.bat
├── package.json
├── PROJECT_STRUCTURE.md
└── README.md
```

For a detailed explanation of the project architecture, see **PROJECT_STRUCTURE.md**.

---

## 🛣️ Roadmap

### ✅ Version 1.0

- New note
- Daily notes
- Find notes
- Rename notes
- Move notes
- Open notes
- Vault statistics
- Template system
- Dead link detection
- Vault doctor

---

### ✅ Version 1.1

- List notes
- Tree view
- Recent notes
- Random note
- Configuration management

---

### ✅ Version 1.2

- Backlinks
- Orphan notes
- Graph analysis
- Tag management

---

### ✅ Version 1.2.1 (AI Integration)

- AI note writing (Qwen 2.5 via Ollama)
- Interactive daily journal
- Direct file writing
- Daily note AI integration

---

### 🚧 Version 1.3 (Planned)

#### Productivity

- Dashboard
- Vault report
- Todo scanner
- Attachment inspector
- Backup vault
- Archive notes
- Cleanup command

#### Export

- Markdown report
- HTML report
- JSON export

---

### 🚧 Version 2.0 (Planned)

#### Interactive Mode

Launch a full interactive terminal interface.

```bash
obs
```

Example:

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

#### Plugin System

Install third-party commands as plugins.

#### Multi Vault Support

Switch between multiple Obsidian vaults.

#### Watch Mode

Automatically monitor vault changes.

#### Shell Autocomplete

Autocomplete commands and note names.

#### Fuzzy Search

Search notes with typo tolerance.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## ❤️ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

Every star helps the project reach more users and motivates future development.

---

## 📄 License

This project is licensed under the MIT License.
