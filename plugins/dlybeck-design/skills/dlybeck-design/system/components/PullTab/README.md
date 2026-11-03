# PullTab

A document tucked in a holder (a folder, a card, a pocket) with its tab showing. Drag the tab up and the sheet slides out with some resistance; past the halfway point it settles the rest of the way. The same tab stays on the sheet, relabeled "put back", so you return it the way you took it out.

- Markup: `.dly-pull` containing `.dly-pull-sheet` (with `.dly-pull-tab` inside it, plus the content) and an optional `.dly-pull-front` pocket drawn over the sheet's lower part. Call `Dly.PullTab(root)`.
- Click or Enter on the tab toggles it too. Set `data-label-in` and `data-label-out` on the tab to rename it ("pull", "put back").
- The tab is the handle: never hide it while the sheet is out.
- Use it for opening documents and details without leaving the page. The portfolio can pull a card's page out of the card itself.
