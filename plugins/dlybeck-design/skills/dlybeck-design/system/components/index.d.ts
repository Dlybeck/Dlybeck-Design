/** dlybeck design. Standard components are CSS classes; signature elements are behaviors attached to your markup. Namespace: window.Dly */

/** Button: `<button class="dly-btn">`. Add `dly-btn--ghost` (secondary) or `dly-btn--brand` (big brand moments). */
export interface ButtonProps { variant?: "primary" | "ghost" | "brand"; disabled?: boolean; children: string }
/** Field: `<div class="dly-field"><label for>…</label><input id>…<span class="dly-help">…</span></div>` */
export interface FieldProps { label: string; id: string; help?: string; error?: string }
/** Tag: `<span class="dly-tag">`. `dly-tag--on` = highlighted/selected, `dly-tag--blue` = info. Use `<button>` when it toggles. */
export interface TagProps { tone?: "plain" | "on" | "blue"; children: string }
/** Paper: `<div class="dly-paper dly-paper--pink">` with `.dly-paper-k` (label), `.dly-paper-h` (title), `.dly-paper-s` (text). */
export interface PaperProps { color?: "lemon" | "pink" | "tangerine" | "mint" | "sky" | "note"; label?: string; title: string; text?: string }
/** TitleTab: `<a class="dly-titletab">` fixed to the top edge; it is the Home link. */
export interface TitleTabProps { href: string; mark?: string; children: string }
/** Trail: `<nav class="dly-trail">` of crumbs; the last carries aria-current="location". */
export interface TrailProps { items: string[] }
/** Highlight: `<mark class="dly-hl">`; add `data-draw` and call Dly.Marker() for draw-on-hover. Set `--hl` to recolor. */
export interface HighlightProps { draw?: boolean; color?: string }

export interface PinnedOptions {
  /** Pin position as fractions of the paper [x, y]. Default top-center [0.5, ~0.1]. Corner pins hang crooked and swing wide; a center pin barely moves. */
  pin?: [number, number];
  /** Pin head color (CSS color). Default the brand blue. */
  color?: string;
  /** Max swing in degrees either side of rest. Default 8. */
  maxSwing?: number;
  /** Lift on hover for a closer look. Default true. */
  inspect?: boolean;
  showPin?: boolean;
}
export interface PinnedHandle { nudge(degPerFrame: number): void; destroy(): void }
/** Dly.Pinned(el, opts): hang an absolutely positioned paper from a pin. Dly.Pinned.follow(boardEl) makes every pinned paper swing when boardEl moves; Dly.Pinned.bump(ax, ay) gives a one-off shove. */
export declare function Pinned(el: HTMLElement, opts?: PinnedOptions): PinnedHandle;

export interface PullTabOptions { distance?: number; onChange?(isOpen: boolean): void }
/** Dly.PullTab(root): `.dly-pull` holding `.dly-pull-sheet` (with `.dly-pull-tab` inside it) and an optional `.dly-pull-front` pocket. The same tab pulls the sheet out and pushes it back. */
export declare function PullTab(root: HTMLElement, opts?: PullTabOptions): { open(): void; close(): void; isOpen(): boolean };

export interface HoldButtonOptions { duration?: number; doneLabel?: string; resetAfter?: number; onConfirm?(): void }
/** Dly.HoldButton(button): press and hold to confirm. Put the label in a <span>. */
export declare function HoldButton(btn: HTMLButtonElement, opts?: HoldButtonOptions): { reset(): void };

export interface DeckOptions { onDeal?(topIndex: number): void }
/** Dly.Deck(box): `.dly-deck` containing `.dly-deck-card` elements. Fling the top card (drag, or two-finger swipe) to send it to the bottom. Pair it with a visible Next button. */
export declare function Deck(box: HTMLElement, opts?: DeckOptions): { next(): void; current(): number };

/** Dly.Marker(scope?): wire every `.dly-hl[data-draw]` in scope. */
export declare function Marker(scope?: ParentNode): void;

/** Dly.Scribble(kind, seed, opts?): an SVG string of a hand-drawn pen stroke. Kinds: "arrow-curve", "arrow-straight", "check", "star". The same seed always draws the same stroke. */
export declare function Scribble(kind: "arrow-curve" | "arrow-straight" | "check" | "star", seed?: string, opts?: { scale?: number; weight?: number }): string;
/** Dly.Scribble.mark(el, "underline" | "circle", { seed? }): draws the stroke around a real element, sized to it and centered. Seed defaults to the element's text. */
export declare namespace Scribble { function mark(el: HTMLElement, kind: "underline" | "circle", opts?: { seed?: string }): void }
