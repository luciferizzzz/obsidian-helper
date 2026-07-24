# Obsidian Helper

A simple and fast CLI tool for managing your Obsidian Vault from the terminal.

> Create notes, manage templates, organize your vault, and inspect your knowledge base without leaving the command line.

---

## ✨ Features

- 📄 Create new notes
- 📅 Daily Notes
- 🔍 Find notes
- 📝 Rename notes
- 📂 Move notes
- 📖 Open notes
- 📊 Vault statistics
- 📚 List all notes
- 🧩 Template support
- 🔗 Detect broken wiki links
- 🩺 Vault health check
- 🌳 Tree view

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/obsidian-helper.git
```

Go to the project folder:

```bash
cd obsidian-helper
```

Install dependencies:

```bash
npm install
```

(Optional)

Link the CLI globally:

```bash
npm link
```

Now you can use:

```bash
obs --help
```

---

## ⚙️ Configuration

Copy the example configuration:

```bash
copy config.example.json config.json
```

Edit the vault path:

```json
{
    "vault": "D:\\Obsidian\\Workspace"
}
```

---

## 📚 Commands

| Command | Description |
|----------|-------------|
| `obs init` | Create or update the configuration file |
| `obs new "Note"` | Create a new note |
| `obs new "Note" -t js` | Create a note from template |
| `obs today` | Open or create today's daily note |
| `obs find keyword` | Search notes |
| `obs rename "Old" "New"` | Rename a note |
| `obs move "Note" Folder` | Move a note |
| `obs open "Note"` | Open a note |
| `obs stats` | Display vault statistics |
| `obs list` | List all notes in vault |
| `obs deadlinks` | Find broken wiki links |
| `obs doctor` | Analyze vault health |
| `obs tree` | Display vault folder tree |

---

## 📁 Project Structure

```
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

See **PROJECT_STRUCTURE.md** for more details.

---

## 🛣️ Roadmap

### ✅ Version 1.0

- [x] New Note
- [x] Daily Notes
- [x] Find
- [x] Rename
- [x] Move
- [x] Open
- [x] Stats
- [x] Template System
- [x] Dead Links
- [x] Doctor

### ✅ Version 1.1

- [x] List notes
- [x] Tree view

### 🚧 Planned Features
- [ ] Recent notes
- [ ] Random note
- [ ] Backlinks
- [ ] Orphan notes
- [ ] Tag management
- [ ] Interactive mode

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
