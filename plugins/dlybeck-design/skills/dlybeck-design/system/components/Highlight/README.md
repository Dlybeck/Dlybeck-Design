# Highlight

A highlighter stroke for the one thing that matters in a view: the current location, a key word, a selected item.

- `<mark class="dly-hl">` for a static highlight. It covers the full line height with `ink-fixed` text, so letters are never cut off in either theme.
- Add `data-draw` and call `Dly.Marker()` to have it draw left to right on hover or focus; a tap keeps it. Undrawn words show a dotted underline as their handle.
- Recolor per use with `style="--hl: var(--paper-pink)"`. Keep it to one highlight per view, except in teaching text like the example.
