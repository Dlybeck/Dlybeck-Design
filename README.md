# dlybeck design

David Lybeck's personal design system, packaged as a Claude Code plugin. It is distributed through the [`dlybeck` marketplace](https://github.com/Dlybeck/Dlybeck-Plugins).

- **Foundations:** the brand blue, ink and a highlighter, paper colors; Schibsted Grotesk, Caveat and IBM Plex Mono; a 4px spacing grid; hard offset shadows; calm motion.
- **Modes:** Light and Dark (required), Chalkboard and High contrast (optional).
- **Rules:** tie it to real life, don't simulate it. The full list is in the brand book.
- **Library:** standard components (Button, Field, Tag, Paper, Title tab, Trail, Highlight) and signature elements (Pinned, Pull tab, Hold button, Deck, Scribble), in plain CSS and JS.
- **Assets:** the pinned-note logo, the highlighted "dl" icon, and 20 line icons.

The design system itself lives in [`skills/dlybeck-design/system/`](skills/dlybeck-design/system/). Start with its [`README.md`](skills/dlybeck-design/system/README.md).

## Install

The marketplace and this repo are private, so your machine's git must be able to read them. One-time setup:

```bash
gh auth login
```

```bash
gh auth setup-git
```

Then, in Claude Code:

```
/plugin marketplace add Dlybeck/Dlybeck-Plugins
/plugin install dlybeck-design@dlybeck
```

The `dlybeck-design` skill then loads whenever you build UI for your projects. You can also call it directly as `/dlybeck-design:dlybeck-design`.

## Updates

The plugin has no version number, so every commit pushed to `main` here counts as an update. The marketplace doesn't need to change.

- To pull updates now: `/plugin` → Marketplaces → `dlybeck` → Update marketplace (or `claude plugin update dlybeck-design@dlybeck`), then `/reload-plugins`.
- To get them automatically: `/plugin` → Marketplaces → `dlybeck` → Enable auto-update. This works for a private repo only when `gh auth setup-git` has stored your credentials.

## Layout

```
.claude-plugin/plugin.json      the plugin
skills/dlybeck-design/SKILL.md  how Claude uses the system
skills/dlybeck-design/system/   the design system
  README.md                     brand book
  tokens.json / tokens.css      tokens, four modes
  components/                   bundle.css, bundle.js, index.d.ts, one folder per component
  assets/Logos, assets/Icons
```
