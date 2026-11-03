# Scribble

Hand-drawn pen strokes for margin notes, generated from a seed so every one is a little different and each item always gets the same one.

- **Arrows** (`arrow-curve`, `arrow-straight`): point at the thing to try first or what comes next. `Dly.Scribble("arrow-curve", "start-here")` returns an SVG string; drop it in next to a `note`-style hint.
- **Check**: done, saved, completed. Pair it with a word.
- **Underline** and **circle**: mark a word or item on the page with `Dly.Scribble.mark(el, "underline")` or `Dly.Scribble.mark(el, "circle")`. They're sized to the element. Circles are always centered and clear the text; underlines stay gentle.
- **Star**: optional, for favorites or a standout item. Use it rarely.
- Seed with something stable, usually the item's name (the default for `mark`). Never seed with randomness, or the stroke changes on every load.
- Strokes take `link` (pen blue). One or two per view: they are notes, not decoration.
