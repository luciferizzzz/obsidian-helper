# 📚 Obsidian Helper

<p align="center">

A fast, lightweight, and open-source CLI tool for managing your Obsidian vault directly from the terminal.

</p>

<p align="center">

![Version](https://img.shields.io/badge/version-v1.4.4-blue)
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
- Dashboard (daily activity overview)
- Vault report with export (Markdown, HTML, JSON)

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

### 🤖 AI (Ollama lokal atau OpenAI API key)

- AI note writing
- Interactive daily journaling with deep questions
- Direct file writing
- Daily note integration (fills ##Target, ##Catatan, ##Selesai, ##Mood, ##Syukur, ##Refleksi)
- Two providers: local LLM (Ollama) or cloud API with a token

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
- [Ollama](https://ollama.com) (for local AI features) **or** an API key (e.g. OpenAI)

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
| `obs config [subcommand]` | Manage configuration (show, set vault, ai, reset) |
| `obs dashboard` | Show daily vault activity overview |
| `obs report` | Show comprehensive vault report |
| `obs report --markdown` | Export vault report to markdown file |
| `obs report --html` | Export vault report to HTML file |
| `obs report --json` | Export vault report to JSON file |
| `obs report -o <path>` | Custom output path for export |
| `obs ai <prompt>` | Create a note with AI (Ollama lokal / OpenAI API key) |
| `obs ai --ask --daily` | Interactive daily journal with AI |
| `obs todo` | Scan all todo items in the vault |
| `obs attachments` | Inspect attachment files in the vault |
| `obs backup` | Backup the entire vault to a destination folder |
| `obs archive [days]` | Archive old notes to Archive folder |
| `obs cleanup` | Cleanup vault (empty files, orphan notes, broken links) |
| `obs template --list` | List all available templates |
| `obs template --preview <name>` | Preview the content of a template |

---

## 📌 Version 1.2.2 (Mini Update)

- **Deep questions** — `--ask` mode now asks 7 questions (target, selesai, syukur, refleksi)
- **All sections filled** — AI fills `## Target Hari Ini`, `## Catatan`, `## Selesai`
- **Template-aware** — content placed inside template sections, not appended at end
- **Smart existing note handling** — existing daily notes also get content in correct sections

---

## 🐛 Version 1.3.1 (Bug Fix)

- **Fix v1.2.2 bug** — daily note sections could be left empty when the AI output didn't use the exact `## Heading` format
- **Tolerant section parsing** — now recognizes `###`, `**Target Hari Ini:**`, and other heading variants
- **Fallback insertion** — if no section can be parsed, the AI content is placed under `## Catatan` instead of leaving the note blank

---

## 🚀 Version 1.4.0 (AI Providers)

- **Two AI providers** — local LLM via Ollama **or** cloud API (OpenAI / any OpenAI-compatible server) using an API key
- **`obs config ai`** — interactive provider setup: choose Ollama or OpenAI, then set model and base URL
- **Masked API key** — `obs config show` hides your token for safety
- **Unified client** — new `utils/ai.js` replaces the old `utils/ollama.js`, supporting both providers
- **Environment variable support** — `OPENAI_API_KEY` can be used instead of storing the key in `config.json`

---

## 🚀 Version 1.4.1 (Export + Bug Fix)

- **Markdown export** — `obs report --markdown` exports vault report to `.md` file
- **HTML export** — `obs report --html` exports vault report to `.html` file
- **JSON export** — `obs report --json` exports vault report to `.json` file
- **Custom output path** — `obs report -o <path>` specifies export destination
- **CRLF support** — AI daily note insertion now handles Windows line endings (`\r\n`) correctly
- **Robust section matching** — placeholder and section regexes updated to handle both `\n` and `\r\n` variants
- **Cleaner replacement** — preserved line structure when inserting AI content into existing sections

---

## 🐛 Version 1.4.2 (Bug Fix)

- **Daily note sections lengkap** — `obs ai --ask --daily` sekarang mengisi **6 section**: `## Target Hari Ini`, `## Catatan`, `## Selesai`, `## Mood`, `## Syukur`, `## Refleksi`
- **Mood/Syukur/Refleksi tidak hilang lagi** — sebelumnya jawaban 3 pertanyaan itu dikumpulkan tapi tidak pernah ditulis ke catatan
- **Template `daily.md` diperbarui** — sekarang punya placeholder untuk section Mood, Syukur, dan Refleksi
- **Fallback untuk daily note lama** — jika daily note yang sudah ada belum punya section Mood/Syukur/Refleksi, section tersebut otomatis ditambahkan saat di-update

---

## 🚀 Version 1.4.3 (Template System)

- **`obs template` command** — kelola template langsung dari CLI: `--list` lihat semua template, `--preview <nama>` lihat isi template
- **6 template baru** — `article`, `idea`, `journal`, `meeting`, `people`, `project` (menambah `book`, `css`, `daily`, `html`, `js`)
- **AI template filling** — template dengan placeholder `{{ai:...}}` otomatis diisi AI lewat `obs ai --template <nama>`
- **`getTemplateData` helper** — penyederhanaan pembuatan placeholder template (title, folder, date, time) di `utils/markdown.js`

---

## ✅ Version 1.4.4 (AI Productivity Commands)

- **`obs ai tomorrow`** — rencana terstruktur untuk besok via percakapan interaktif (Planning/Tomorrow/YYYY-MM-DD.md)
- **`obs ai update`** — update cerdas daily note hari ini, section yang hilang dibuat otomatis
- **`obs ai weekly`** — rencana mingguan terstruktur (Planning/Weekly/Week-32.md)
- **Semua provider didukung** — Ollama, OpenAI, dan OpenAI-compatible API

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

Obsidian Helper mendukung dua cara pakai AI: **LLM lokal** (Ollama) atau **API key / token** (cloud, e.g. OpenAI atau server OpenAI-compatible).

Konfigurasi secara interaktif:

```bash
obs config ai
```

Kamu bisa pilih:

1. **Ollama (LLM lokal)** — AI jalan di komputer kamu sendiri, gratis dan tanpa internet.
2. **OpenAI / API key** — masukin token dari OpenAI (atau layanan OpenAI-compatible seperti OpenRouter, LM Studio, dsb.), lalu pilih model dan base URL.

Cek konfigurasi saat ini:

```bash
obs config show
```

### Option A — Ollama (LLM lokal)

1. Install [Ollama](https://ollama.com).
2. Pull model yang diinginkan:

```bash
ollama pull qwen2.5-coder:7b
```

3. Pastikan Ollama jalan:

```bash
ollama serve
```

4. Setup via `obs config ai`, pilih Ollama, lalu isi URL dan model.

### Option B — OpenAI API key (token)

1. Ambil API key dari platform penyedia (mis. OpenAI).
2. Setup via `obs config ai`, pilih OpenAI, lalu masukkan token, model, dan base URL (default `https://api.openai.com/v1`).
3. Bisa juga set environment variable `OPENAI_API_KEY` sebagai pengganti.

Contoh `config.json`:

```json
{
  "vault": "D:\\Obsidian\\Workspace",
  "ai": {
    "provider": "openai",
    "ollama": {
      "url": "http://127.0.0.1:11434",
      "model": "qwen2.5-coder:7b"
    },
    "openai": {
      "apiKey": "sk-...",
      "model": "gpt-4o-mini",
      "baseUrl": "https://api.openai.com/v1"
    }
  }
}
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
│   ├── archive.js
│   ├── attachments.js
│   ├── backlinks.js
│   ├── backup.js
│   ├── cleanup.js
│   ├── config.js
│   ├── dashboard.js
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
│   ├── report.js
│   ├── stats.js
│   ├── tags.js
│   ├── template.js
│   ├── today.js
│   ├── todo.js
│   └── tree.js
│
├── templates/
│   ├── article.md
│   ├── book.md
│   ├── css.md
│   ├── daily.md
│   ├── html.md
│   ├── idea.md
│   ├── journal.md
│   ├── js.md
│   ├── meeting.md
│   ├── people.md
│   └── project.md
│
├── utils/
│   ├── ai.js
│   ├── config.js
│   ├── file.js
│   ├── markdown.js
│   ├── noteIndex.js
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

### ✅ Version 1.3 (Complete)

#### Productivity

- ✅ Dashboard
- ✅ Vault report
- ✅ Todo scanner
- ✅ Attachment inspector
- ✅ Backup vault
- ✅ Archive notes
- ✅ Cleanup command

#### Export

- ✅ Markdown report
- ✅ HTML report
- ✅ JSON export

---

### ✅ Version 1.3.1 (Bug Fix)

- Fix AI daily note sections not being filled (v1.2.2 bug)
- Tolerant section parsing and fallback insertion

---

### ✅ Version 1.4.0 (AI Providers)

- AI now supports Ollama (local LLM) **or** OpenAI / OpenAI-compatible API key
- Interactive provider setup via `obs config ai`
- Masked API key in `obs config show`

---

### ✅ Version 1.4.1 (Export + Bug Fix)

- Markdown / HTML / JSON report export
- CRLF handling for AI daily note insertion
- Robust section matching for `\n` and `\r\n`

---

### ✅ Version 1.4.2 (Bug Fix)

- Daily note now filled with 6 sections: Target, Catatan, Selesai, Mood, Syukur, Refleksi
- Mood/Syukur/Refleksi answers no longer dropped
- Auto-add missing sections to existing daily notes

---

### ✅ Version 1.4.3 (Template System)

- **`obs template` command** — kelola template langsung dari CLI: `--list` lihat semua template, `--preview <nama>` lihat isi template
- **6 template baru** — `article`, `idea`, `journal`, `meeting`, `people`, `project` (menambah `book`, `css`, `daily`, `html`, `js`)
- **AI template filling** — template dengan placeholder `{{ai:...}}` otomatis diisi AI lewat `obs ai --template <nama>`
- **`getTemplateData` helper** — penyederhanaan pembuatan placeholder template (title, folder, date, time) di `utils/markdown.js`


---

# ✅ Version 1.4.4 — AI Productivity Commands

> **Release Type:** Minor Feature Update  
> **Version:** v1.4.4

---

# Overview

Version **1.4.4** expands the AI capabilities of Obsidian Helper beyond note generation.

The new AI productivity commands help users plan tomorrow, update daily journals, and organize weekly goals directly from the terminal.

---

# ✨ New Commands

## `obs ai tomorrow`

Generate a structured plan for tomorrow through an interactive conversation.

### Example

```bash
obs ai tomorrow
```

### AI Questions

- What is your biggest priority tomorrow?
- Do you have any meetings or important events?
- Is there anything unfinished from today?
- What personal goals do you have?
- Anything you don't want to forget?

### Generated Note

```markdown
# Tomorrow Plan

## Priorities

- Finish project
- Study JavaScript

## Schedule

09:00 - Coding

13:00 - Meeting

20:00 - Exercise

## Goals

...

## Reminders

...
```

### Default Location

```
Planning/
└── Tomorrow/
    └── YYYY-MM-DD.md
```

---

# `obs ai update`

Update today's Daily Note using AI.

Instead of replacing existing content, the AI intelligently updates each section.

### Example

```bash
obs ai update
```

### AI Questions

- What have you completed today?
- What are you working on?
- Any blockers?
- How was your mood?
- What are you grateful for?
- What did you learn today?

### Updated Sections

```markdown
## Target Hari Ini

## Catatan

## Selesai

## Mood

## Syukur

## Refleksi
```

Missing sections are automatically created.

---

# `obs ai weekly`

Generate a structured plan for the upcoming week.

### Example

```bash
obs ai weekly
```

### AI Questions

- Main goal this week
- Top priorities
- Personal goals
- Learning goals
- Important deadlines
- Habits to maintain

### Generated Note

```markdown
# Weekly Plan

## Goals

...

## Monday

...

## Tuesday

...

## Wednesday

...

## Thursday

...

## Friday

...

## Saturday

...

## Sunday

...

## Notes

...
```

### Default Location

```
Planning/
└── Weekly/
    └── Week-32.md
```

---

# 🤖 AI Workflow

Obsidian Helper now supports a complete planning workflow.

### Plan Tomorrow

```bash
obs ai tomorrow
```

↓

Creates tomorrow's planning note.

---

### Daily Update

```bash
obs ai update
```

↓

Updates today's Daily Note.

---

### Weekly Planning

```bash
obs ai weekly
```

↓

Creates a weekly planning document.

---

# AI Providers

All commands work with every supported AI provider.

- ✅ Ollama
- ✅ OpenAI
- ✅ OpenAI-Compatible APIs

Configure your provider:

```bash
obs config ai
```

---

# Backward Compatibility

Existing AI commands remain unchanged.

```bash
obs ai "Explain JavaScript closures"

obs ai --daily

obs ai --ask --daily
```

The new commands are additional productivity features and do not replace the existing AI workflow.

---

# What's New

## Added

- `obs ai tomorrow`
- `obs ai update`
- `obs ai weekly`

## Improved

- AI-assisted productivity workflow
- Interactive planning sessions
- Intelligent Daily Note updates
- Structured weekly planning

---

# Future Expansion

The AI Productivity module is designed to grow with additional commands in future releases.

Planned ideas include:

- `obs ai monthly`
- `obs ai review`
- `obs ai summarize`
- `obs ai improve`
- `obs ai links`
- `obs ai tags`

These commands will further transform Obsidian Helper into an AI-powered knowledge management assistant.

---

### 🚧 Version 1.5 (Planned)

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
