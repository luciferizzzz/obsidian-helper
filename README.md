# 📚 Obsidian Helper

> A fast, lightweight, and open-source CLI tool for managing your Obsidian Vault directly from the terminal.

Create notes, manage templates, inspect your knowledge graph, and organize your vault without leaving the command line.

---

## ✨ Features

### 📄 Notes

- Create new notes
- Daily Notes
- Rename notes
- Move notes
- Open notes
- Random note
- Recent notes

### 📂 Vault Management

- List all notes
- Tree view
- Vault statistics
- Config management

### 🔍 Knowledge Management

- Find notes
- Backlinks
- Orphan notes
- Dead links detection
- Graph analysis
- Tag extraction

### 🧰 Utilities

- Template system
- Vault health check (Doctor)

---

## 🚀 Installation

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

Link globally (optional)

```bash
npm link
```

Verify installation

```bash
obs --help
```

---

## ⚙️ Configuration

Create your configuration

```bash
copy config.example.json config.json
```

Edit

```json
{
  "vault": "D:\\Obsidian\\Workspace"
}
```

Or simply use

```bash
obs init
```

---

## 📚 Commands

| Command | Description |
|----------|-------------|
| `obs init` | Initialize configuration |
| `obs new "Note"` | Create a note |
| `obs new "Note" -t js` | Create from template |
| `obs today` | Open today's daily note |
| `obs find keyword` | Search notes |
| `obs rename "Old" "New"` | Rename note |
| `obs move "Note" Folder` | Move note |
| `obs open "Note"` | Open note |
| `obs stats` | Vault statistics |
| `obs list` | List notes |
| `obs tree` | Display folder tree |
| `obs recent` | Show recent notes |
| `obs random` | Pick a random note |
| `obs deadlinks` | Find broken wiki links |
| `obs backlinks <note>` | Find backlinks |
| `obs orphan` | Find orphan notes |
| `obs doctor` | Vault health check |
| `obs graph` | Graph analysis |
| `obs tags` | Extract tags |
| `obs config` | Configuration manager |

---

# 📸 Example

Create a note

```bash
obs new "JavaScript" -t js
```

Find a note

```bash
obs find javascript
```

Display vault statistics

```bash
obs stats
```

Open today's note

```bash
obs today
```

---

## 📁 Project Structure

```text
obsidian-helper/
├── bin/
├── checks/
├── commands/
├── templates/
├── utils/
├── config.example.json
├── package.json
└── README.md
```

More details:

📄 **PROJECT_STRUCTURE.md**

---

# 🛣 Roadmap

## ✅ v1.0

- Core CLI
- Notes
- Templates
- Daily Notes
- Search
- Vault Statistics
- Dead Links
- Doctor

---

## ✅ v1.1

- List Notes
- Tree View
- Recent Notes
- Random Note
- Config Management

---

## ✅ v1.2

- Backlinks
- Orphan Notes
- Graph Analysis
- Tag Management

---

## 🚧 v1.3 (Planned)

### Productivity

- Dashboard
- Vault Report
- Attachments Inspector
- Todo Scanner
- Backup Vault
- Archive Notes
- Cleanup Command

### Export

- Markdown Report
- HTML Report
- JSON Export

---

## 🚧 v2.0 (Planned)

### Interactive Mode

```text
obs
```

Launch an interactive terminal interface for navigating and managing your vault.

### Plugin System

Support installing custom commands as plugins.

### Multi Vault

Switch between multiple Obsidian vaults.

### Watch Mode

Automatically monitor vault changes.

### Shell Autocomplete

Autocomplete commands and note names.

### Fuzzy Search

Quickly locate notes using approximate matching.

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

Please open an Issue or submit a Pull Request.

---

## 📄 License

Licensed under the MIT License.

---

⭐ If you find this project useful, consider giving it a star on GitHub.
