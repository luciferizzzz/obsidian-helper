# Project Structure

```
obsidian-helper/
├── bin/
│   └── obs.js                 # CLI entry point
│
├── checks/
│   └── deadlinks.js           # Vault health checks
│
├── commands/
│   ├── deadlinks.js           # Find broken wiki links
│   ├── doctor.js              # Vault diagnostics
│   ├── find.js                # Search notes
│   ├── init.js                # Initialize configuration
│   ├── move.js                # Move notes
│   ├── new.js                 # Create new note
│   ├── open.js                # Open note
│   ├── rename.js              # Rename note
│   ├── stats.js               # Vault statistics
│   ├── template.js            # Manage templates
│   └── today.js               # Open/create daily note
│
├── templates/
│   ├── book.md                # Book note template
│   ├── css.md                 # CSS template
│   ├── daily.md               # Daily note template
│   ├── html.md                # HTML template
│   └── js.md                  # JavaScript template
│
├── utils/
│   ├── config.js              # Config loader
│   ├── file.js                # File utilities
│   ├── markdown.js            # Template parser
│   ├── noteIndex.js           # Note index builder
│   ├── scanner.js             # Vault scanner
│   ├── vault.js               # Vault utilities
│   └── wikilinks.js           # Wiki link parser
│
├── config.example.json        # Example configuration
├── package.json               # Package metadata
├── README.md                  # Documentation
├── LICENSE                    # License
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
obs deadlinks
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