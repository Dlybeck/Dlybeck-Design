---
name: dlybeck-design
description: David Lybeck's personal design system ("dlybeck design"). Use it whenever building or restyling any UI for David (a website, web app, tool, game, page, prototype or artifact), when he mentions his design system, his brand, his logo, or wants something to look like "his" style, and when picking colors, type, icons or interactions for his projects.
---

# dlybeck design

David's personal system. Projects are meant to look different from each other; the system holds what makes them recognizably his: a blue brand, ink and a highlighter, paper objects, and interactions tied to real life without simulating it.

## Read first

1. `system/README.md`: the brand book. Principles, color, modes, type, space, motion, states, voice, logos and icons. Follow it.
2. The guidelines for each component you use: `system/components/<Name>/README.md`. The live example is `system/components/<Name>/preview.html`.

All paths are relative to this skill's folder (`${CLAUDE_SKILL_DIR}`).

## Files

| File | What it is |
|---|---|
| `system/tokens.json` | Source of truth for every token (colors per mode, type, spacing, radius, shadow, stroke, duration, easing) |
| `system/tokens.css` | The same tokens as CSS custom properties (`--ink`, `--brand`, `--space-4`…), four modes via `data-theme`, plus type-style classes (`.h1`, `.body`, `.label`, `.note`…) |
| `system/components/bundle.css` | Component styles (`dly-btn`, `dly-field`, `dly-tag`, `dly-paper`, `dly-titletab`, `dly-trail`, `dly-hl`, signature elements). Starts with the Google Fonts import |
| `system/components/bundle.js` | One plain script defining `window.Dly` (no framework): `Pinned`, `PullTab`, `HoldButton`, `Deck`, `Marker`, `Scribble`, `spring` |
| `system/components/index.d.ts` | API reference for every component and option |
| `system/assets/Logos/` | `dl-note.svg` (primary logo), `dl-highlight.svg` (secondary logo / icon), `dl-app-icon.svg`, `dl-app-icon-512.png` |
| `system/assets/Icons/` | 20 line icons, 24px grid, 1.5px stroke |

## Using it in a project

- **In a codebase:** copy `tokens.css`, `components/bundle.css`, `components/bundle.js` and the assets you need into the project (for example under `static/dlybeck/`). Load `tokens.css`, then `bundle.css`, then `bundle.js`. Don't hand-copy values; when the system updates, recopy the files.
- **In a single-file page or artifact:** inline the three files' contents (tokens first) instead of linking them, and inline any SVG you use.
- Set `data-theme` on `<html>` only when the project offers a mode switcher. Light and Dark are required; Chalkboard and High contrast are optional.
- Use tokens for every color, size and duration. Never hard-code a hex value that a token already names, and never style for one mode directly.

## Non-negotiables

- The brand blue (`--brand`) appears somewhere visible: usually the title tab.
- Text pairs meet 4.5:1 in every mode the project offers (the tokens already do; keep custom pairings to the same bar).
- Only touchable objects get an edge plus a hard lift shadow. Every gesture has a visible handle, and a hidden gesture is never the only way in.
- Handmade things vary by seed (`Dly.Scribble`, seeded tilts). Never one repeated drawing.
- Motion is calm and respects `prefers-reduced-motion`.
- Use the logo files as they are. Never redraw, recolor or retype them.

## Live reference

The visual, browsable version of this system (tokens, previews, assets) lives at https://claude.ai/artifact/TFxU2qf3UVQzXAhhAE9mc7. This repo is the copy projects build from.
