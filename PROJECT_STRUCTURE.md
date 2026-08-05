# Project Structure

```
obsidian-helper/
├── bin/
│   └── obs.js                 # CLI entry point
│
├── checks/
│   ├── deadlinks.js           # Vault health checks
│   └── vaultReport.js         # Vault data collector (dashboard & report)
│
├── commands/
│   ├── ai.js                 # AI note writing (Ollama lokal / OpenAI API key), template filling, deep journaling, AI productivity (tomorrow/update/weekly)
│   ├── archive.js            # Archive old notes to Archive folder
│   ├── attachments.js         # Inspect attachment files in vault
│   ├── backlinks.js            # Find notes referencing a given note
│   ├── backup.js              # Backup entire vault to a destination folder
│   ├── cleanup.js              # Cleanup vault (empty files, orphan notes, broken links)
│   ├── config.js              # Configuration manager
│   ├── dashboard.js           # Daily vault activity overview
│   ├── deadlinks.js           # Find broken wiki links
│   ├── doctor.js              # Vault diagnostics
│   ├── find.js                # Search notes
│   ├── graph.js               # Display vault graph analysis with link relationships
│   ├── init.js                # Initialize configuration
│   ├── list.js                # List all notes
│   ├── move.js                # Move notes
│   ├── new.js                 # Create new note
│   ├── open.js                # Open note
│   ├── orphan.js              # Find notes with no incoming wiki links
│   ├── random.js              # Random note picker
│   ├── recent.js              # Recently modified notes
│   ├── rename.js              # Rename note
│   ├── report.js              # Comprehensive vault report
│   ├── stats.js               # Vault statistics
│   ├── tags.js                # Extract and display tags from all notes
│   ├── template.js            # Manage templates
│   ├── today.js               # Open/create daily note
│   ├── todo.js                # Scan all todo lists in vault
│   └── tree.js                # Vault folder tree
│
├── templates/
│   ├── article.md             # Article note template
│   ├── book.md                # Book note template
│   ├── css.md                 # CSS template
│   ├── daily.md               # Daily note template
│   ├── html.md                # HTML template
│   ├── idea.md                # Idea note template
│   ├── journal.md             # Journal entry template
│   ├── js.md                  # JavaScript template
│   ├── meeting.md             # Meeting notes template
│   ├── people.md              # People profile template
│   └── project.md             # Project tracking template
│
├── utils/
│   ├── ai.js                 # AI client (Ollama lokal & OpenAI-compatible)
│   ├── config.js             # Config loader
│   ├── file.js               # File utilities
│   ├── markdown.js           # Template parser
│   ├── noteIndex.js          # Note index builder
│   ├── scanner.js            # Vault scanner
│   ├── vault.js               # Vault utilities
│   └── wikilinks.js           # Wiki link parser
│
├── config-example.json        # Example configuration
├── config.json                # Local configuration (vault path, etc.)
├── obs.bat                    # Windows launcher script
├── package.json               # Package metadata
├── package-lock.json          # Locked dependency versions
├── PROJECT_STRUCTURE.md       # Project structure documentation
├── README.md                  # Documentation
└── .gitignore                 # Git ignore rules
```

## Folder Overview

### `bin/`
Contains the CLI entry point executed when running:

```bash
obs
```

---

### `commands/`
Implements every CLI command available to the user.

Example:

```bash
obs new
obs today
obs find
obs list
obs deadlinks
obs ai "belajar closures"
obs ai tomorrow
obs ai update
obs ai weekly
obs archive
obs attachments
obs backup
obs cleanup
obs todo
```

---

### `checks/`
Contains reusable vault analysis modules.

These modules perform inspections and return data without printing directly to the terminal, making them reusable by multiple commands.

---

### `templates/`
Markdown templates used when creating new notes.

Example:

```bash
obs new "Loops" -t js
```

---

### `utils/`
Shared helper functions used across the project.

Includes:

- Vault management
- Markdown parsing
- File operations
- Wiki link parsing
- Note indexing
- AI client (Ollama lokal / OpenAI API key)

---

## Design Philosophy

The project follows a simple layered architecture:

```
CLI
 ↓
Commands
 ↓
Checks / Utils
 ↓
Vault Files
```

Each layer has a single responsibility:

- **CLI** handles user input.
- **Commands** coordinate actions.
- **Checks** analyze vault data.
- **Utils** provide reusable helper functions.
- **Vault** stores the actual notes.

This separation keeps the codebase modular, maintainable, and easy to extend as new commands are added.


MIT License

Copyright (c) 2026 L

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
