# Pinned

Paper hanging from a pin on a board. Where the pin goes decides how it moves: a corner pin hangs a little crooked and swings wide, a top pin sways, a center pin barely moves. When the board moves, every pinned paper swings from the momentum.

- Markup: an absolutely positioned `dly-paper` inside a board. Call `Dly.Pinned(el, { pin: [0.5, 0.1], color })`. The pin is added for you.
- Call `Dly.Pinned.follow(boardLayer)` once so papers react to the board's own movement (panning, camera moves), or `Dly.Pinned.bump(ax, ay)` for a one-off shove.
- Hovering lifts a paper for a closer look and nudges it with your pointer's movement.
- Calm by design: swings stay within 8°, settle in about two seconds, and switch off under reduced motion.
- Strings between pins (for a map) are drawn behind the papers, pin to pin, with a slight sag.
- Origin: davidlybeck.com's board, rebuilt as a pinboard.
