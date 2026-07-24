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
- 🔙 Backlinks finder
- 🌱 Orphan notes finder
- 🩺 Vault health check
- 🌳 Tree view
- 🕒 Recent notes
- 🎲 Random note
- ⚙️ Config management

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
| `obs backlinks <note>` | Find notes referencing a given note |
| `obs orphan` | Find notes with no incoming wiki links |
| `obs doctor` | Analyze vault health |
| `obs tree` | Display vault folder tree |
| `obs recent [limit]` | Show recently modified notes |
| `obs random` | Pick a random note |
| `obs random --open` | Pick and open a random note |
| `obs config` | Show current configuration |
| `obs config show` | Display raw config.json |
| `obs config set vault` | Update vault path |
| `obs config reset` | Reset config to default |

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
- [x] Recent notes
- [x] Random note
- [x] Config management

### ✅ Version 1.2

- [x] Backlinks
- [x] Orphan notes

### 🚧 Planned Features
- [ ] Tag management
- [ ] Interactive mode

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome.

Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
