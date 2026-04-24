# Pulsebar landing — Design system & guide

> Direction: **Memorisely × Yukee**. A warm, paper-based editorial palette with one
> confident coral accent and a bottle-green for depth. Fraunces for emotional
> display, Geist for body and UI, Geist Mono for metadata and `kbd`.
>
> Use this doc as the source of truth when extending the landing page or designing
> adjacent marketing material (email, changelog, About page, etc.).

---

## 1. Principles

1. **Paper, not screen.** The page feels like a broadsheet, not an app UI. Warm
   cream backgrounds, generous margins, serif headlines. If it starts feeling
   "webby," pull the serif up, reduce the UI chrome.
2. **One accent, used sparingly.** Coral (`#E85C4A`) is reserved for: the live
   pulse dot, primary CTA hover, `—$8` price, chip tags that signal *action*,
   active menu-bar tokens, and the coral italic in display type.
3. **Italic = feeling.** Anything emotional, poetic, or softened goes in
   `Fraunces Italic` (`.serif-ital`). Facts and prices stay upright.
4. **Mono = machine.** Version numbers, kbd, dB, counters, shortcut codes,
   `§ section labels`, and section taglines are `Geist Mono` at 10–12 px with
   wide tracking (`letter-spacing: 0.18–0.22em`, `UPPERCASE`).
5. **Breath between sections.** Every third section alternates onto `bg-paper2`
   with `border-y border-ink/10`. Never two colored stripes in a row.
6. **Every visual has a purpose.** If a block doesn't teach, sell, or reassure,
   cut it. The page is long on purpose but nothing in it is decorative only.

---

## 2. Tokens

### 2.1 Color palette

```
paper    #F5EFE6    body background
paper2   #EFE8DD    alternating stripe / manifesto / pricing / FAQ
cream    #FAF7F0    cards / pricing "Try" card / mockups

ink      #141210    primary text, primary CTA bg
ink-mid  #5C554B    secondary text
ink-lo   #8F887D    tertiary text, mono labels
ink-faint#C9C1B3    dividers in mono bullets

coral       #E85C4A primary accent — USE SPARINGLY
coral-soft  #F5C6A0 warm orb, peach card backgrounds, snooze avatar
coral-dim   #B9422F hover state for coral only

forest      #1F4F3A green accent — depth, quote avatars, live-dot
forest-soft #D7E5DD sage card backgrounds, soft orbs
```

### 2.2 Typography

```
sans   Geist          400/500 · body, UI, minor headings
mono   Geist Mono     400/500 · metadata, kbd, labels, taglines
serif  Fraunces       300/400 · display headlines, hero, h2, FAQ questions
```

Display sizes (use responsive clamp where possible):

| Role            | Family         | Size      | Weight | Tracking  | Leading |
|-----------------|----------------|-----------|--------|-----------|---------|
| h1 hero         | Fraunces       | 52–96 px  | 300    | −0.02em   | 0.98    |
| h2 section      | Fraunces       | 40–56 px  | 400    | −0.02em   | 1.05    |
| h3 minor        | Fraunces       | 28–42 px  | 400    | −0.015em  | 1.08    |
| FAQ question    | Fraunces       | 17–20 px  | 400    | −0.01em   | 1.35    |
| Body paragraph  | Geist          | 15–17 px  | 400    | 0         | 1.6–1.7 |
| Mono tag/label  | Geist Mono     | 10.5–12 px| 400    | 0.16–0.22em | 1.3   |

**Rules:**
- Italic version of Fraunces (`.serif-ital`) is always one emotional phrase per
  line, never the whole sentence.
- Section titles start with `§ lowercase-label` in mono, THEN the big Fraunces
  headline below (this is the editorial signature of the page).
- Don't use Fraunces for any interactive label, price, or button text.

### 2.3 Spacing rhythm

Vertical rhythm is `py-24 md:py-32` for major sections, `py-16 md:py-24` for
minor sections (small print, stats), `py-24 md:py-32` again for colored stripes
to give them importance.

Grid max-width: `max-w-6xl` for feature grids, `max-w-3xl` for manifesto/FAQ,
`max-w-5xl` for pricing, `max-w-4xl` for footer / founder note.

### 2.4 Radii & shadows

- Cards: `border-radius: 20–22px`, 1px border `rgba(20,18,16,0.08)`
- Inner mockups (alert, qbar, preflight): `border-radius: 14px`, soft shadow
  `0 20px 40px -15px rgba(20,18,16,0.25)`
- Buttons: `border-radius: 10–14px` (primary CTA), `99px` (chips / pills)
- Token chips: `border-radius: 12px`, switch: `99px`

### 2.5 Motion

- Hover transitions: 120–180ms ease
- State transitions: 250–300ms ease
- Token pop-in: `mbar-pop` (280ms ease-out, scale 0.9 → 1, translateY −4 → 0)
- Mic meter: 90ms per tick, 80ms CSS width transition — feels like real audio
- FAQ unfurl: 300ms ease
- Coral "+" rotates 45° on open
- **No confetti, no bounce, no spring.** Motion is always linear or ease —
  the page's personality is calm.

---

## 3. Section order (left→right / top→bottom reading map)

```
01  Top bar (Pulsebar · v1.0 · Pricing)
02  HERO           — "A quieter Mac …"             paper · 52–96px serif · coral accent · trust card
03  § a short belief — Yukee manifesto              paper2 · 40px serif italic cascade
04  § what it does — 3 big cards                    paper · peach / sage / cream cards · interactive
05  § plus, all of this — 12 minor features         paper · numbered list
06  § compose — INTERACTIVE menu-bar builder        paper · live preview + draggable tokens
07  § by the numbers — editorial stats              paper2 · 4 big numbers
08  § early words — testimonial wall                paper · 3 quote cards (mark as "sample" until real)
09  § what it costs — pricing, 2 cards              paper2 · cream + ink cards side by side
10  § from the maker — founder note                 paper · italic 2-paragraph signed note
11  § faq — accordion                               paper2 · details/summary
12  Footer — Yukee signoff                          paper · mark · kbd row
```

**Rule of thumb**: never remove a section. If a new feature arrives, slot it as a
card in §04 or a minor in §05 or a preset in §06. The skeleton stays.

---

## 4. Components (reusable names)

Each is scoped in `styles.css`. Class list:

### 4.1 Structural
- `.mark` / `.mark-lg` — the pulsebar dot with a coral core (used in nav + footer)
- `.btn-ink` / `.btn-ink-sm` — primary CTA (ink bg, cream text)
- `.btn-paper` / `.btn-paper-lg` — secondary CTA (cream bg, ink text, bordered)
- `.trust-card` — hero right-column tiny rating chip
- `.fcard` → `.fcard-visual` + `.fcard-body` — big feature card (3 across)
- `.fcard-peach` / `.fcard-sage` / `.fcard-cream` — visual tint
- `.ftag` / `.ftag-coral` / `.ftag-forest` / `.ftag-peach` / `.ftag-sage` — pill inside card body
- `.minor` + `.minor-no` — small-print numbered feature item
- `.stat-cell` → `.stat-n` + `.stat-u` + `.stat-l` — editorial big number
- `.quote` → `.q-text` + `.q-foot` + `.q-ava` — testimonial card
- `.plan` / `.plan-soft` / `.plan-ink` — pricing card
- `.qa` → (legacy) replaced by `.faq-item` / `summary` / `.faq-q` / `.faq-toggle`

### 4.2 Feature card mockups (Card 1–3 visuals)
- `.fv-alert` — pre-call floating alert (now stateful via `data-state`)
- `.fv-bar` + `.fv-bar-head` + `.fv-bar-row` + `.fv-typed` + `.fv-kbd` — Quick Bar palette
- `.fv-preflight` + `.fv-eye` + `.fv-meter` + `.fv-meter-bar` + `.fv-meter-peak` — mic & camera preview
- `.fv-avatar` / `.fv-avatar-joining` / `.fv-avatar-snoozed` — state avatars
- `.alert-chip` / `.alert-progress` / `.alert-state-*` — alert demo states
- `.spinner` — launching spinner
- `.snooze-counter` / `.alert-undo` — interactive chrome

### 4.3 Compose section
- `.mbar-frame` + `.mbar-left` + `.mbar-right` + `.mbar-apple` + `.mbar-menu` +
  `.mbar-sys` + `.mbar-pulsebar` + `.mbar-token` + `.mbar-token-sep`
- `.token-tray` + `.token-tray-head` + `.token-reset`
- `.token-list` + `.token-chip` + `.token-grip` + `.token-label` +
  `.token-preview` + `.token-switch`
- `.token-presets` + `.preset-btn`
- State: `.is-active`, `.is-dragging`, `.is-over`

### 4.4 FAQ accordion
- `.faq-item` (native `<details>`)
- `summary` · `.q-num` · `.faq-q` · `.faq-toggle`
- `.a` for the answer paragraph

---

## 5. Interactive behaviors (`script.js`)

All mounted on `DOMContentLoaded`, all vanilla JS, no deps.

### 5.1 `mountAlertDemo()` — Card 1
- Root: `[data-demo="alert"] .fv-alert` with `data-state` attribute.
- States: `idle` · `joining` · `snoozed` · `skipped`.
- Buttons: `[data-action="join|snooze|skip|reset"]`.
- `idle` auto-ticks the 58s countdown every second. `joining` plays a 2.6s progress
  and returns to idle. `snoozed` counts down from 4:59 (simulated fast, ~0.4s/tick)
  and returns to idle. `skipped` auto-resets after 2s.

### 5.2 `mountQbarDemo()` — Card 2
- Root: `[data-demo="qbar"]` with `.fv-bar-row`s.
- Each row has `data-qbar-phrase`; clicking typewrites it into `.fv-typed` at
  ~25–50ms/char and moves the `.is-on` highlight.
- If the user hasn't touched the demo, rows cycle through `data-phrases` on
  `.fv-typed` every ~3.8s.

### 5.3 `mountMicDemo()` — Card 3
- Root: `[data-demo="mic"]` with `[data-meter-bar]`, `[data-meter-peak]`,
  `[data-meter-label]`, `[data-meter-db]`.
- Drives a 90ms ticker: base sine wave + jitter → 6..92% bar width. Peak
  indicator tracks max with slow decay. dB mapping: linear over `-60…0 dB`.
  Label thresholds: quiet <20, good <55, loud <80, clipping ≥80.
- Paused when the card is out of viewport (IntersectionObserver).

### 5.4 `mountCompose()` — §06
- Root: `[data-token-list]` + `[data-mbar-preview]`.
- Click toggles `.is-active` on chip. Clicking the `.token-grip` is ignored
  (drag intent).
- HTML5 Drag & Drop reorders chips in-place (handles inserting before or after
  based on midpoint y-position).
- Reset button snaps back to `defaults = ["icon","next","countdown"]`.
- Presets: `minimal` / `default` / `global` / `power` (see `script.js` for exact
  token sets).
- `render()` rewrites the menu-bar preview from active chips in current DOM order.

---

## 6. How to extend

### Adding a new feature
- **If it's a headline feature (image worthy)**: add a 4th `.fcard` to `§04`.
  Use a new `.fcard-<tint>` class for its visual. Keep the interactive
  mockup simple (one state change max). Follow existing tag → h3 → p pattern.
- **If it's a small-print feature**: add one `.minor` item to `§05`. Keep the
  number sequence going. Max 16 items total before we split the section.
- **If it's a new menu-bar token**: add a `.token-chip` in `§06` with
  `data-token` and `data-render`, plus add it to `presets` in `script.js` where
  appropriate. Keep the tray at or under 12 chips.
- **If it's a new FAQ**: add a `<details class="faq-item">` at the right
  numerical position. Keep answers ≤3 sentences.

### Adding a new interactive block
- Put the markup inside its section, mark with `data-demo="<name>"`, and add a
  matching `mount<Name>()` function in `script.js` that bails out early if its
  root isn't present.
- Always gate animation-heavy demos with an `IntersectionObserver` to save CPU.
- Motion stays on 90ms–300ms ease — anything longer feels sluggish on the paper
  palette, anything shorter feels twitchy.
- For any state machine: expose state via `data-state` attribute and CSS-only
  transitions where possible.

### Legal / content rules (carried over from Dot comparison)
- No real user names in testimonials until they are real. Current `§ early words`
  cards must be re-worded as personas or replaced with anonymized quotes.
- No "4.9 / 5" rating in hero until the rating is real. If still pre-launch,
  change `trust-card` to a "closed beta · 142 testers" statement with no number.
- Keep every structural pattern distinct from `trydot.app`: no `"Menu Bar Calendar
  for Mac"` straplines, no dark Dot-clone hero, no feature-grid of 8 equal
  tiles, no tri-card pricing with monthly toggle.

---

## 7. Files

```
web/
├── index.html         # Single-page, no build step
├── styles.css         # Tailwind via CDN + custom CSS in one file
├── script.js          # Vanilla, no deps, mounts 4 demos
└── DESIGN.md          # You are here
```

Tailwind is loaded via CDN in `index.html`; the custom token palette and font
families are registered inline in a `<script>` block at the top of the head
(same script sets the config before the first Tailwind class renders).

---

## 8. Future ideas, parked

These are intentionally **not** shipped yet. Each has a rough slot.

- **Product tour video / Loom** — parked. If ever added, goes just after `§05`,
  before `§06`. Keep autoplay muted, poster image in paper2.
- **Pricing: team license** — parked. Add a 3rd `.plan` card when teams >1.
  Do not preemptively add monthly toggle.
- **Changelog as markdown** — parked. Linked from footer. Render as Fraunces
  h2 + Geist body, same palette.
- **Newsletter field** — parked. Would go in `§ early words` below the wall, in
  a single row with the coral CTA. Opt-in only, no modals.
- **Dark mode for the landing** — parked. Requires a second token set
  (ink=cream, paper=ink, coral stays). Not needed until the audience asks.

---

_Last updated: 2026-04-23_
