# 🤝 Contributing to Obsidian Helper

Thank you for considering a contribution! 🎉

Obsidian Helper is an independent open-source project, and contributions from people like you are what keep it alive. Whether you are fixing a typo, reporting a bug, requesting a feature, or writing code — every contribution matters.

> **Related docs:** [ARCHITECTURE.md](ARCHITECTURE.md) · [ROADMAP.md](ROADMAP.md) · [README.md](../README.md)

---

## 📋 Table of Contents

- [Project philosophy](#-project-philosophy)
- [Development setup](#-development-setup)
- [Coding style](#-coding-style)
- [Folder conventions](#-folder-conventions)
- [Branch naming](#-branch-naming)
- [Commit messages](#-commit-messages)
- [Pull Requests](#-pull-requests)
- [Issue reporting](#-issue-reporting)
- [Feature requests](#-feature-requests)

---

## 💡 Project philosophy

- **Simple beats clever.** Commands are small, focused, and easy to read.
- **Reuse over duplicate.** Shared logic belongs in `utils/` or `checks/`.
- **Terminal-first.** Everything is built around the CLI experience — fast and lightweight.
- **The user's vault is precious.** Never delete, overwrite, or corrupt notes silently.
- **Welcoming to beginners.** The codebase should be approachable.

If a change conflicts with these principles, it is worth a conversation first.

---

## 🚀 Development setup

1. **Fork** the repository on GitHub.
2. **Clone** your fork:

```bash
git clone https://github.com/<your-username>/obsidian-helper.git
cd obsidian-helper
```

3. **Install dependencies:**

```bash
npm install
```

4. **Link the CLI** for local testing:

```bash
npm link
```

5. **Create a branch** and make your changes.

---

## 🎨 Coding style

- **Plain Node.js** — CommonJS (`require` / `module.exports`), no TypeScript.
- **4-space indentation.**
- **Single quotes** for strings.
- **Semicolons** at the end of statements.
- **Descriptive names** — `totalNotes`, `buildNoteIndex`, not `x`, `fn`.
- **No excessive comments** — code should read clearly; comment only the "why".
- **Consistent I/O** — the codebase uses synchronous `fs` (`readFileSync`, `writeFileSync`); keep consistency.

When in doubt, match the style of the file you are editing.

---

## 📁 Folder conventions

| Folder | Purpose |
|--------|---------|
| `bin/` | CLI entry point — argument parsing and command registration |
| `commands/` | One file per CLI command; coordinates actions |
| `checks/` | Reusable vault analysis — **returns data, never prints** |
| `utils/` | Shared helpers — config, files, markdown, AI, scanning, sanitization |
| `templates/` | Markdown note templates |
| `docs/` | Project documentation |

**Rule of thumb:** if code is used by more than one command, it belongs in `utils/` or `checks/`, not inside a command file.

---

## 🌿 Branch naming

Short, descriptive names with a type prefix:

```text
feature/<short-description>
fix/<short-description>
docs/<short-description>
refactor/<short-description>
```

**Examples**

```text
feature/ai-monthly
fix/trim-vault-path
docs/update-ai-docs
refactor/share-wikilink-parser
```

---

## 💬 Commit messages

Use **Conventional Commits**:

```
<type>(<scope>): <subject>
```

**Types**

| Type | When to use |
|------|-------------|
| `feat` | New feature or command |
| `fix` | Bug fix |
| `refactor` | Behavior-preserving change |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `test` | Tests |
| `chore` | Tooling, dependencies, CI |

**Examples**

```text
feat(ai): add monthly planning command
fix(config): trim vault path on read
refactor(utils): extract shared wikilink parsing
docs(readme): add quick start for macOS
```

**Guidelines**

- Imperative mood ("add", "fix", not "added", "fixed").
- Subject under ~72 characters.
- No trailing period.
- Reference issues where relevant: `fix(find): ignore hidden dirs (#42)`.

---

## 🔀 Pull Requests

1. Keep your branch up to date with upstream `main`.
2. Make changes on a `feature/` or `fix/` branch.
3. Commit with the conventional format.
4. Push and open a Pull Request against `main`.
5. Fill in the PR description (see below).
6. Address review feedback with a friendly, focused discussion.

**PR scope**

- One feature/fix per PR.
- Keep PRs small.
- For large changes, open an issue first to align on the design.

**PR checklist**

- [ ] Branch name follows conventions
- [ ] Commits follow Conventional Commits
- [ ] Change is focused on a single concern
- [ ] Code follows project style and folder conventions
- [ ] Tested manually against a scratch vault
- [ ] Existing commands still work
- [ ] Filenames go through `sanitizeFilename` where applicable
- [ ] No secrets (API keys, personal data) included
- [ ] Documentation updated where relevant
- [ ] PR description explains what changed and why

---

## 🐛 Issue reporting

Bugs are tracked as GitHub Issues. Before opening one:

1. **Search existing issues** for duplicates.
2. Reproduce with the latest code (`git pull && npm install`).

Include:

- **Description** — what happened vs. what you expected.
- **Steps to reproduce** — exact commands run.
- **Environment** — OS, Node version (`node -v`), CLI version (`obs --version`).
- **Config** — relevant parts of `config.json` (never your API key).
- **Output** — error message or unexpected output.

> **Security:** never paste API keys or personal vault contents.

---

## 💡 Feature requests

Feature requests are welcome. Open an issue with:

- **Problem** — what you are trying to do and why.
- **Proposed solution** — how you imagine it working.
- **Alternatives** — other approaches considered.
- **Scope** — small addition or large feature needing discussion?

Large or ambiguous features are best discussed **before** a pull request.

---

## 📚 Documentation requirements

Documentation is part of the feature:

- New commands → `docs/COMMANDS.md`
- New AI behavior → `docs/AI.md`
- New config fields → `docs/CONFIGURATION.md`
- Template changes → `docs/TEMPLATE_GUIDE.md`
- Version notes → `CHANGELOG.md` and `docs/ROADMAP.md`
- `README.md` only when the project-level story changes

---

Thank you for helping make Obsidian Helper better for everyone. If you have questions at any point, open an issue and ask — we are happy to help. 💙
