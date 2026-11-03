dlybeck design is David Lybeck's personal system for apps, sites and games. It has three layers: **foundations** (color, type, space, motion), **rules** for tying UI to real life, and a **library of signature elements** that you combine per project, filled in with plain standard components. Projects are meant to look different from each other. The system holds what makes them recognizably David's.

## Principles

- **Tie it to real life. Don't simulate it.** If a person would know how to use the object in real life, they know how to use it here. No learning curve.
- **Borrow the behavior, not the texture.** A folder slides open; it doesn't need leather grain. Draw objects flat, with `line` edges and hard lift shadows, never photographic materials.
- **Thickness means you can touch it.** Only touchable objects get `edge` borders in `line` plus a `lift` shadow. Flat text and layout containers stay flat (`line-soft` or nothing). Lift on hover means grabbable; sinking on press means pressed.
- **Show the handle.** Every gesture has something visible that invites it (a tab to pull, a card edge to fling). Hidden gestures, like a two-finger swipe, are bonuses and never the only way in.
- **One desk per screen.** Every object on a page comes from the same place: a board, a notebook, a folder. Don't mix worlds.
- **Handmade means a few versions of everything.** Anything drawn by hand (pen strokes, tilts, pins, paper) comes in several variations, picked by a stable seed such as the item's name. The same item always looks the same; no two items match. Use `Dly.Scribble` and seeded tilts, never one repeated drawing.
- **Stop the metaphor when it adds a step.** Keep the shortcut and the feel. Never make people walk somewhere to do something.
- **Structured exploration.** Prefer navigation by place, with limited choices visible at once, over menus or free roaming. Example: davidlybeck.com shows one centered card, its parent and at most three children.

## Color

- Page: `ground` with a 24px graph-paper grid in `grid` (major lines every 120px are optional). Panels and cards: `surface`.
- Text: `ink` for content, `ink-2` for secondary. Both pass 4.5:1 on `ground`, `surface` and `tint` in both themes.
- Blue is the brand. Put `brand` somewhere visible in every project: the title tab, pins, a hero block. White on `brand` only for text 18px bold or larger. Buttons and links use `action` and `link`, which are one step darker (light) or lighter (dark) so text stays readable.
- The highlighter `hi` is the moment, not the brand: one thing per view (current location, the key word, the selected tag). Text on `hi` is always `ink-fixed`. In dark mode a highlight fills the full line height so letters are never cut off.
- Paper colors (`paper-lemon`, `paper-pink`, `paper-tangerine`, `paper-mint`, `paper-sky`, `paper-note`) are for paper objects only, with `ink-fixed` text, and they stay the same in dark mode, like real paper. Use them to color-code branches or categories, at most five per screen.
- Status colors `ok`, `warn`, `bad` stay small (dots, icons, short messages) and always come with a word.
- Dark mode is a night version of the same desk, not an inversion: `lift-color` turns blue, `action` lightens to `blue-400` with `on-action` ink text, and paper stays paper.
- The highlighter color may change per project (tennis-ball `#ddf43b` is a candidate). Keep `ink-fixed` text on whatever you pick and check 4.5:1.

## Modes

- Four modes, set with `data-theme` on the root element: `light`, `dark`, `chalkboard`, `high-contrast`. With no attribute, follow the system setting (light or dark).
- **Light** and **Dark** are required in every project. **Chalkboard** (board green #1f332e, chalk text, sky-blue pen; the portfolio's original world) and **High contrast** (black ink on white, every text pair 7:1 or better, firm borders, darker brand blue) are optional. A project lists the modes it offers and shows a switcher only if it offers more than two.
- Paper colors, the highlighter and `ink-fixed` never change between modes. Only the desk, ink, lines and shadows do.
- Never style a component for one mode directly. Use tokens, so a new mode is just a new column of values.

## Type

- `sans` (Schibsted Grotesk, Google Fonts, weights 400/500/700/800) carries headings and body. Headings use `display`, `h1`–`h3` with tight negative tracking and `text-wrap: balance`.
- `hand` (Caveat 700) is only for notes: hints, arrows, tab labels like "pull". One line, color `link`, never required to use the page. Use the `note` style.
- `mono` (IBM Plex Mono 500) is for `label`: uppercase eyebrows, counts, metadata, code.
- Body is `body` at 16px / 1.55. Sentence case everywhere except `label`.

## Space, shape, edges

- Spacing runs on a 4px grid, `space-1` (4px) to `space-9` (96px). Page gutter is at least `space-4`.
- Corners: `radius-paper` for paper, `radius-md` for buttons and inputs, `radius-lg` for UI cards, `radius-pill` for tags and crumbs.
- Edges are `edge` (1.5px). Controls use `line-control` so they meet 3:1.
- Shadows are hard offsets, never blur: `lift-sm` and `lift` at rest, `lift-paper` for paper on a board, `lift-high` while picked up.

## Motion

Calm and physical. Things move like light paper on a desk, not like springs.

- Durations: `duration-press` for presses, `duration-settle` for settling, `duration-move` for camera moves, `duration-slide` for sheets. Easing: `ease-out` by default, `ease-settle` for settling. No visible bounce.
- Physics stays subtle: pinned papers swing at most about 8° and settle within about two seconds.
- Respect `prefers-reduced-motion`: motion becomes instant, and physics stays still.
- Every motion has a cause the person can see: they dragged it, the board moved, they pressed it.

## Focus and states

- Focus ring: 2.5px solid `action`, offset 2–3px, on every focusable element.
- Hover lifts touchable objects (offset shadow grows by 1–2px). Press sinks them into their shadow (translate by the shadow's offset, shadow to 0).
- Disabled controls drop to 45% opacity, lose their shadow, and keep their label readable.

## Voice

- Plain, friendly, first person on personal sites ("I've played for as long as I can remember"). Sentence case. Short sentences.
- Controls say exactly what happens: "Pull out the page", "Hold to send", then "Sent".
- Hints are written like margin notes in `note` style: lowercase, short, helpful ("tap a card next to this one").
- No emoji as decoration.

## Iconography and marks

- **Primary logo:** `assets/Logos/dl-note.svg`, a yellow note with a folded corner, pinned with a brand-blue pin, "dl" in Schibsted Grotesk Black. Use it where it has room: the title tab (34px), about pages, social cards. Never below 24px.
- **Secondary logo and icon:** `assets/Logos/dl-highlight.svg`, "dl" over a highlighter swipe with a blue dot. Use it where space is tiny or square: favicon, app icon (`dl-app-icon.svg`, `dl-app-icon-512.png`), avatars, footers.
- Both are fixed artwork with the letters as outlines. Don't recolor, retype, redraw or add effects.
- **Icons:** `assets/Icons/`, 20 line icons on a 24px grid, 1.5px stroke, round ends, drawn in `ink-fixed` (#141C2B). Inline them as SVG with `stroke="currentColor"` when they must follow the theme. Pair icons with words except for universal ones (close, search, home).
- **Pen strokes:** use `Dly.Scribble` for arrows, checks, underlines and circles in `link`. One or two per view.

## Building with the library

- Load the fonts (the `@import` at the top of `components/bundle.css`), the tokens, `components/bundle.css` and `components/bundle.js` (namespace `Dly`, no framework needed).
- Standard components are CSS classes: `dly-btn`, `dly-field`, `dly-tag`, `dly-paper`, `dly-titletab`, `dly-trail`, `dly-hl`.
- Signature elements are behaviors you attach to your own markup: `Dly.Pinned`, `Dly.PullTab`, `Dly.HoldButton`, `Dly.Deck`, `Dly.Marker`. Each component's guidelines list the markup it expects.
- Pick the elements a project needs. A project uses one desk (rule above), so most pages use one or two signature elements, not all of them.
