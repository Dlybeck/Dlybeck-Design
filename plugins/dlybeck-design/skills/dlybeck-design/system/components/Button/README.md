# Button

Buttons are touchable objects: an ink edge and a hard lift that grows on hover and disappears when pressed.

- **Primary** (`dly-btn`): the one thing this view is for. One per view.
- **Ghost** (`dly-btn dly-btn--ghost`): everything else.
- **Brand** (`dly-btn dly-btn--brand`): rare, big brand moments like a hero call to action. Text 17.6px bold so white on `brand` passes.
- Labels say exactly what happens, verb first, sentence case: "Digitize", "Pull out the page". After the action, confirm in words ("Sent").
- Disabled buttons keep their label and say why nearby (`dly-help`).
- For anything people would hate to do by accident, use HoldButton instead of a confirm dialog.
