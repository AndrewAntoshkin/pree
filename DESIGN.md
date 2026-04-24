# Pree landing — Design system & guide

> Direction: **Memorisely × Yukee** base (warm paper, Fraunces display, coral
> accent) combined with **Dot-style full-width interactive feature rails**.
> Fraunces for emotional display, Geist for body and UI, Geist Mono for
> metadata and `kbd`.
>
> **Current version:** v2 — "Paper-editorial + Dot-style interactives"
> (this doc).
> Previous: v1 — "Paper-editorial only", archived in
> `web/versions/v1-paper-editorial/` (see its own `DESIGN.md` for the v1
> snapshot of principles/tokens/components).

---

## 1. Principles

1. **Paper, not screen.** The page feels like a broadsheet, not an app UI.
   Warm cream backgrounds, generous margins, serif headlines. If it starts
   feeling "webby," pull the serif up, reduce the UI chrome.
2. **One accent, used sparingly.** Coral (`#E85C4A`) is reserved for: the
   live pulse dot, primary CTA hover, `—$8` price, chip tags that signal
   *action*, active pills, coral italic in display type, slider thumbs.
3. **Italic = feeling.** Anything emotional, poetic, or softened goes in
   `Fraunces Italic` (`.serif-ital`). Facts and prices stay upright.
4. **Mono = machine.** Version numbers, kbd, dB, counters, shortcut codes,
   `§ section labels`, and section taglines are `Geist Mono` at 10–12 px
   with wide tracking (`letter-spacing: 0.18–0.22em`, `UPPERCASE`).
5. **Breath between sections.** Alternate soft paper backgrounds across
   sections. The three big interactive rails each get their own
   distinctive tint (peach / sage / dusk). Never two same-toned stripes
   in a row.
6. **Dark inside light.** Interactive mockups (NL input, world clock,
   meeting-card popover) are **dark rounded cards** floating on the paper
   background. They read as "app chrome" against the editorial page — same
   trick Dot uses to make demos pop. But outside the dark card, all page
   chrome stays paper.
7. **Every visual has a purpose.** If a block doesn't teach, sell, or
   reassure, cut it. The page is long on purpose — nothing in it is
   decorative only.

---

## 2. Tokens

### 2.1 Color palette

```
paper    #F5EFE6   body background
paper2   #EFE8DD   alternating stripe / manifesto / pricing / FAQ
cream    #FAF7F0   cards / pricing "Try" card / month-peek card

ink      #141210   primary text, primary CTA bg, dark card bg
ink-mid  #5C554B   secondary text
ink-lo   #8F887D   tertiary text, mono labels
ink-faint#C9C1B3   muted calendar cells, dividers

coral       #E85C4A   primary accent — USE SPARINGLY
coral-soft  #F5C6A0   warm orb, peach cards, snooze avatar, countdown
coral-dim   #B9422F   hover for coral only
coral-warm  #F9A58E   coral on dark backgrounds (wc time, mc countdown)

forest      #1F4F3A   green accent — depth, quote avatars, live-dot
forest-soft #D7E5DD   sage card backgrounds, soft orbs

green-new   #34D87B   only for NEW badges and "auto-save" dots
```

### 2.2 Typography

```
sans   Geist                 400/500   body, UI, minor headings
mono   Geist Mono            400/500   metadata, kbd, labels, taglines
serif  Fraunces              300/400   display headlines, hero, h2, FAQ
       ↳ Cormorant Garamond  300/400   ru-only Cyrillic fallback (see below)
```

**Cyrillic fallback · `html[lang="ru"]`.** Fraunces on Google Fonts has
no Cyrillic subset (Latin + Latin-Ext + Vietnamese only). Without a
fallback the browser drops to `Georgia`/generic serif for Cyrillic —
which is far heavier and mismatched stylistically ("the Тихий Mac
problem"). Additionally, Playfair Display — the obvious first choice —
does not ship weight 300 on Google Fonts (starts at 400), so it still
reads heavy at 96 px.

Solution: pair Fraunces with **Cormorant Garamond** for `lang="ru"`.
Cormorant Garamond is a didone-adjacent display serif with a real
weight 300 Cyrillic subset, aesthetically close to Fraunces. The
stack is `Fraunces, Cormorant Garamond, ui-serif, Georgia, serif`
so Latin-in-Russian (e.g. `Mac`, `Pree`, `Q4`, `iCloud`) still
renders in Fraunces, and the browser only substitutes for Cyrillic
glyphs via `unicode-range`. Tracking tightens by ~0.003–0.008em to
compensate for Cormorant's slightly wider glyphs.

Display sizes:

| Role            | Family         | Size      | Weight | Tracking  | Leading |
|-----------------|----------------|-----------|--------|-----------|---------|
| h1 hero         | Fraunces       | 52–96 px  | 300    | −0.02em   | 0.98    |
| h2 section      | Fraunces       | 40–56 px  | 400    | −0.02em   | 1.05    |
| h2 big-feature  | Fraunces       | 40–52 px  | 400    | −0.02em   | 1.05    |
| h3 card         | Fraunces       | 28–42 px  | 400    | −0.015em  | 1.08    |
| FAQ question    | Fraunces       | 17–20 px  | 400    | −0.01em   | 1.35    |
| wc readout time | Fraunces       | 34 px     | 300    | −0.02em   | 1.0     |
| Body paragraph  | Geist          | 15–17 px  | 400    | 0         | 1.6–1.7 |
| Mono tag/label  | Geist Mono     | 10.5–12 px| 400    | 0.16–0.22em | 1.3   |

**Rules:**
- Italic version of Fraunces (`.serif-ital`) is always one emotional
  phrase per line, never the whole sentence.
- Section titles start with `§ lowercase-label` in mono, then big
  Fraunces headline. This is the editorial signature of the page.
- Don't use Fraunces for any interactive label, price, or button text.

### 2.3 Spacing rhythm

- Major sections: `py-24 md:py-32`
- Minor sections (small print, stats): `py-16 md:py-24`
- Big-feature rails: `py-20 md:py-30` (`padding: 80px 0; @md 120px`)
- Max widths: `max-w-6xl` (feature grids), `max-w-3xl` (manifesto/FAQ),
  `max-w-5xl` (pricing), `max-w-4xl` (footer)

### 2.4 Radii & shadows

- Cards: `border-radius: 20–22px`, 1px border `rgba(20,18,16,0.08)`
- Inner mockups: `border-radius: 14–18px`
- **Dark cards** (nl-card, mc-popover, wc-card): `border-radius: 18px`,
  `box-shadow: 0 30px 60px -20px rgba(20,18,16,0.35–0.55)`
- Buttons: `border-radius: 10–14px` primary, `99px` chips / pills
- Pill chips: `border-radius: 99px` (full pill) — this is a change from v1
  where menu-bar tokens used `12px` rectangular chips. Meeting-card pills
  are round — more "button-y," reads better with NEW badge.

### 2.5 Motion

- Hover transitions: 120–180ms ease
- State transitions: 250–300ms ease
- Chip pop-in: 280ms ease-out (`mc-pop` keyframe)
- Mic meter: 90ms tick, 80ms width transition
- FAQ unfurl: 300ms ease
- Coral "+" rotates 45° on open
- **NEW badge** never animates. It's a static label.
- **No confetti, no bounce, no spring.** Calm.

---

## 3. Section order

```
00  FAUX macOS MENU BAR [NEW]      full-bleed · live Pree token · drops dark popover
01  Top bar
02  HERO                           paper · 52–96px serif · coral accent · trust card
03  § a short belief               paper2 · Yukee manifesto cascade
04  § what it does                 paper · 3 interactive cards (alert/qbar/preflight)
05  § natural language [NEW]       peach · full-width · live parser
06  § month peek [NEW]             sage  · full-width · hover calendar + side peek
07  § world clock [NEW]            dusk  · full-width · 24h scrubber + cities
08  § plus, all of this            paper · 12 minor numbered features
09  § compose meeting card         paper · DARK popover preview + pill tray
10  § by the numbers               paper2 · editorial stats
11  § early words                  paper · 6 quote cards (mark as sample until real)
12  § what it costs                paper2 · 2 pricing cards
13  § from the maker               paper · italic 2-paragraph signed note
14  § faq                          paper2 · details/summary accordion
15  Footer                         paper · mark · kbd row
```

**Rule of thumb**: never remove a section. If a new feature arrives:
- headline → add as a 4th / 5th big-feature rail between §07 and §08, or
  as a 4th card to §04.
- minor → add to §08 (keep numbering sequential).
- new pill option → add a `.pill-chip` to the pool in §09.

---

## 4. Components

### 4.1 Structural
- `.mark` / `.mark-lg` — pulsebar dot with coral core
- `.btn-ink` / `.btn-ink-sm` — primary CTA (ink bg, cream text)
- `.btn-paper` / `.btn-paper-lg` — secondary CTA (cream bg, ink text)
- `.trust-card` — hero right-column rating chip
- `.fcard` → `.fcard-visual` + `.fcard-body` — big feature card
- `.fcard-peach` / `.fcard-sage` / `.fcard-cream` — visual tint
- `.ftag` / `.ftag-coral` / `.ftag-forest` / `.ftag-peach` / `.ftag-sage` — pill tag
- `.minor` + `.minor-no` — small-print numbered feature
- `.stat-cell` → `.stat-n` + `.stat-u` + `.stat-l` — editorial big number
- `.quote` → `.q-text` + `.q-foot` + `.q-ava` — testimonial card
- `.plan` / `.plan-soft` / `.plan-ink` — pricing card
- `.faq-item` + `summary` + `.faq-q` + `.faq-toggle` + `.a` — accordion

### 4.2 Feature card mockups (3-grid in §04)
- `.fv-alert` — pre-call floating alert (stateful via `data-state`)
- `.fv-bar` + `.fv-bar-head` + `.fv-bar-row` + `.fv-typed` + `.fv-kbd` — Quick Bar
- `.fv-preflight` + `.fv-eye` + `.fv-meter` + `.fv-meter-bar` + `.fv-meter-peak` — preflight
- `.fv-avatar` / `.fv-avatar-joining` / `.fv-avatar-snoozed` — state avatars
- `.alert-chip` / `.alert-progress` / `.alert-state-*` — alert states
- `.spinner` — loading spinner
- `.snooze-counter` / `.alert-undo` — interactive chrome

### 4.3 Big-feature rails (full-width interactives)
- `.big-feature` base · `.big-feature-peach` / `-sage` / `-dusk`
- **§05 NL parser** → `.nl-card` + `.nl-input-wrap` + `.nl-input` +
  `.nl-chips` + `.nl-chip` + `.nl-chip-k` + `.nl-chip-v` +
  `.nl-foot` + `.nl-status` + `.ex-btn` (example-phrase buttons)
- **§06 Month peek** → `.month-card` + `.month-head` + `.month-nav` +
  `.month-arrow` + `.month-grid-wrap` + `.month-grid` + `.month-dow` +
  `.month-cell` (states: `.is-muted`, `.is-today`, `.is-selected`,
  `.is-hover`, `.has-events`) + `.month-peek` (side panel) +
  `.month-peek-date` + `.month-peek-list` + `.mp-dot` + `.mp-time` +
  `.mp-title`. Event dot colors: `.mp-coral`, `.mp-forest`, `.mp-peach`.
- **§07 World clock** → `.wc-card` + `.wc-sky` (gradient strip with
  `--wc-cursor` CSS var) + `.wc-cities` + `.wc-name` + `.wc-time` +
  `.wc-icon` + `.wc-scrub` + `.wc-range` + `.wc-ticks` + `.wc-readout` +
  `.wc-readout-label` + `.wc-readout-time`. City cell lights up when
  `.is-working` (local hour 9–18).

### 4.4 Faux macOS menu bar (§00 · hero top strip)
- `.mac-bar` — outer full-bleed strip, frosted paper (backdrop blur)
- `.mac-bar-inner` — 28px high flex row, edge padding 14px
- `.mac-bar-left` — Apple logo (inline SVG) · app name · File/Edit/View/Window/Help
- `.mac-bar-right` — hint · Pree token · sys icons · clock
- `.mac-bar-token` — the live clickable Pree chip. Coral pulsing ring
  (`::before` with `token-ring` keyframe) invites the click; ring dies on
  first interaction via `.mac-bar[data-touched="true"]`. Contains:
  `.mac-bar-token-dot` (coral pulse dot) · `.mac-bar-token-title`
  (`Design review`) · `.mac-bar-token-sep` (`·`) · `.mac-bar-token-time`
  (mono, ticks down via JS countdown) · `.mac-bar-token-chev` (disclosure)
- `.mac-bar-hint` — paired "click me →" hint left of the token; fades out
  on first click (`data-touched`)
- `.mac-bar-sys` / `.mac-bar-sys-text` — WiFi, battery, search glyphs
- `.mac-bar-clock` — live HH:MM clock, ticks every 15s
- `.mac-bar-popover` — absolute dropdown anchored to token. Opens on click
  (`data-open="true"` on `.mac-bar`). Contains the **prod-parity `.mpc`
  card** (see §4.6) — a 1:1 port of the real macOS SwiftUI `MeetingCard`.
- `.mac-bar-popover::before` — 12×12 rotated square acting as a connector
  triangle; right offset set at runtime via `--mac-bar-arrow`

### 4.5 Meeting-card composer (§09)
- `.mc-desk` — soft desktop wrapper (peach/sage gradient)
- `.mc-popover` — dark rounded Liquid-Glass popover preview
- `.mc-head` + `.mc-dot` + `.mc-title` + `.mc-join` + `.mc-kbd`
- `.mc-sub` + `.mc-countdown` (coral)
- `.mc-fields` list · `.mc-field` row · `.mc-field-k` / `.mc-field-v`
  (value can get `.is-coral` for accented values)
- `.mc-foot` — bottom hints row (`snooze · S`, `open in Calendar · ⌘O`)
- Pill tray: `.token-tray` + `.token-tray-head` + `.token-reset` +
  `.pill-list` (`.pill-list-active` | `.pill-list-pool`) + `.pill-chip`
  (states: `.is-active`, `.is-dragging`, `.is-over`) +
  `.pill-grip` (aria-hidden drag handle) + `.pill-label` + `.pill-new`
- Presets: `.token-presets` + `.preset-btn[data-mc-preset]`
  — values: `minimal` / `default` / `remote` / `full`

### 4.6 Prod-parity menu-bar popover (`.mpc` — §00 hero popover body)
> 1:1 port of the real macOS SwiftUI `Pulsebar/Features/Meeting/MeetingCard.swift`
> rendered in the web demo. Dark Liquid-Glass card, native typography,
> real interactions — only the actual `NSWorkspace` / `EKEventStore` calls
> are stubbed with toasts.

**Container · `.mpc`**
- Gradient dark glass: `rgb(36,36,40,.94) → rgb(26,26,30,.94)`,
  `backdrop-filter: saturate(1.8) blur(28px)`, 14px radius,
  1px white 8% border, long dark drop shadow.
- Font stack: `-apple-system / SF Pro Text / Geist`, 12px base,
  letter-spacing −0.01em. Mirrors `Theme.Typography`.
- Holds four screens, switched via `data-screen="meeting|today|materials|cam"`;
  only the matching `<section class="mpc-screen">` is visible, others are
  `hidden`. Screen-change plays a 160ms `mpc-slide` fade/rise.

**Screen 1 · `meeting` (default, ports `MeetingCard.body`)**
- `.mpc-summary` — top strip: `.mpc-greet` (dynamic `Good morning/afternoon/
  evening, Andrew`, mirrors `DaySummary.greeting`), `.mpc-stats` (date ·
  meeting count · focus hours, ported from `DaySummaryHeader`), spacer,
  `.mpc-pill[data-mpc-today]` ("Today" — opens screen 2), and
  `.mpc-gear-wrap` (the `≡` gear).
- `.mpc-main` — the meeting row:
  - `.mpc-eyebrow` — `Up next` mono label (ports `nextLabel`)
  - `.mpc-title-block` — `.mpc-dot` (pulsing green `rgb(51,209,54)` =
    `Palette.accent`, animation `mpc-dot-pulse`) + `.mpc-title`
    (`Design review`) + `.mpc-meta` row: `.mpc-prov` colored pill
    (Google Meet green, Zoom blue, Teams purple via `--prov` CSS var,
    ports `MeetingProvider.accentColor`), dot separator, `.mpc-countdown`
    (ticks down), dot, `.mpc-time` (`16:10–17:04`).
  - `.mpc-actions` — right-aligned stack: `.mpc-sq[data-mpc-calendar]`
    (calendar glyph), `.mpc-sq[data-mpc-materials]` with `.mpc-sq-badge`
    (green "2"), `.mpc-join[data-mpc-join]` (white-on-dark matches
    `Palette.joinBackground` dark variant; contains inline `⌘⇧J` kbd).

**Screen 2 · `today` (ports `TodayView.swift`)**
- `.mpc-subhead` — back arrow + `Today` + subtitle.
- `.mpc-today-list` — one `.mpc-today-row` per meeting with states
  `is-past` (muted, finished) and `is-live` (pink/red glow, live dot
  animation `mpc-live-dot`). Each row: `.mpc-timecol` (start + duration),
  `.mpc-today-body` (title + provider · relative time), and a small
  `.mpc-sq` quick-join button.

**Screen 3 · `materials` (ports `MeetingDetailView` materials list)**
- `.mpc-subhead` — back arrow + `Materials` + `Design review`.
- `.mpc-mat-list` — one `.mpc-mat-row[data-mpc-mat]` per material:
  `.mpc-mat-ico` square (Figma purple gradient, Docs blue, Notion grey,
  etc. — matches `MeetingMaterials.iconColor`) + title + truncated URL +
  disclosure arrow.
- `.mpc-mat-foot` — `⌘O opens all in Calendar` hint.

**Screen 4 · `cam` (ports `CameraCheckView.swift`)**
- `.mpc-cam-stage` — faux viewfinder with blinking `.mpc-cam-eye`
  (animation `mpc-eye`, 3s loop) and a `Camera check · looks good`
  caption.
- `.mpc-cam-meter` — inline mic meter (`.mpc-cam-meter-bar` width 6–92%
  driven by JS sine+jitter) + `.mpc-cam-readout` (threshold label) +
  `.mpc-cam-db` (mono, `-NN.N dB`).
- `.mpc-join.mpc-join-wide[data-mpc-launch]` — full-width "Join now"
  button.

**Settings gear (`.mpc-gear-wrap > .mpc-menu`)**
Ports `Pulsebar/Components/SettingsMenu.swift`. Dropdown opens on click
(outside-click closes). Items:
- `data-mpc-mi-toggle="launchAtLogin|floating|autoCamera"` — checkbox
  rows; click toggles `aria-checked` + the `.mpc-mi-ico` glyph
  (`⏻|▦|▤` → `◉`).
- `data-mpc-mi-theme="auto|dark|light"` — radio group; click sets
  `aria-checked` exclusively and flashes a toast.
- `data-mpc-mi-action="prefs|compose|month|shortcuts|quit"` — action
  rows; each flashes a context-appropriate toast.
- `.mpc-menu-sep` separators and `.mpc-menu-head` group headers
  (`APPEARANCE`) match the native menu's SF-Symbol-prefixed layout.

**Toast · `.mpc-toast`**
Small pill at the bottom of the card. `flashToast(text)` unhides for
~1.6s to simulate native side effects (`Opening Google Meet…`,
`Theme: Dark`, `Snooze 5 min`, etc.) when the JS would otherwise call
`NSWorkspace.open(url)` or similar.

**Tokens & palette cross-reference (`Theme.swift`)**

| Native (SwiftUI)           | Web (`.mpc-*`)                     |
|----------------------------|------------------------------------|
| `Palette.cardBackground`   | `rgb(30,30,33)` gradient           |
| `Palette.buttonBackground` | `rgba(255,255,255,0.06)` on glass  |
| `Palette.subtitle`         | `rgba(245,245,247,0.6)`            |
| `Palette.accent` (green)   | `rgb(51,209,54)` — `.mpc-dot`      |
| `Palette.joinBackground`   | `#FFFFFF` (dark variant)           |
| `Palette.joinForeground`   | `rgb(15,15,20)`                    |
| `Radius.card = 14`         | `border-radius: 14px`              |
| `Radius.button = 10`       | `.mpc-sq / .mpc-pill / .mpc-join`  |
| `Size.cardWidth = 420`     | `.mac-bar-popover width: 420px`    |

---

## 5. Interactive behaviors (`script.js`)

All mounted on `DOMContentLoaded`, all vanilla JS, no deps, each is a
no-op if its root element isn't on the page.

### 5.1 `mountAlertDemo()` — §04 Card 1
State machine on `.fv-alert` via `data-state`:
`idle → joining → snoozed → skipped`. Buttons:
`[data-action="join|snooze|skip|reset"]`. Idle countdown ticks 58→0. Join
runs ~2.6s progress and returns to idle. Snooze counts down from 4:59.

### 5.2 `mountQbarDemo()` — §04 Card 2
Each `.fv-bar-row` has `data-qbar-phrase`; click typewrites into
`.fv-typed` at ~25–50ms/char and moves `.is-on` highlight. Auto-cycles
through `data-phrases` every 3.8s until user clicks anything.

### 5.3 `mountMicDemo()` — §04 Card 3
Drives 90ms ticker: base sine + jitter → 6..92% bar width. Peak indicator
decays slowly. dB `-60..0`. Label thresholds: quiet/good/loud/clipping.
Paused outside viewport (IntersectionObserver).

### 5.4 `mountMeetingCardCompose()` — §09
- `pool` ↔ `active` pill movement. Click pool pill → append to active
  (adds grip, `.is-active`, `draggable="true"`). Click active pill →
  return to pool (removes grip / draggable / is-active).
- Drag within active → HTML5 D&D; insert before/after over element by
  midpoint-x. Pool is not draggable; only active is reorderable.
- `title` and `countdown` pills, when active, don't render as `.mc-field`
  rows — instead they populate the card's title (`.mc-title`) and
  countdown subhead (`.mc-countdown`). All other pills render as
  `.mc-field` rows inside `.mc-fields` in the order of the active list.
- Reset → `DEFAULTS = ["title","countdown","organizer"]`.
- Presets:
  - `minimal` — Title, Countdown
  - `default` — Title, Countdown, Organizer
  - `remote` — Title, Countdown, Provider, Meeting ID, Attendees
  - `full` — all 12 pills

### 5.5 `mountNLParser()` — §05
- Listens to `[data-nl-input]` input. Writes into
  `[data-nl-title / -recur / -time / -dur / -place]` + toggles each
  chip's `.is-on`.
- Parser logic (order of consumption matters):
  1. `every (mon|tue|...)` → `Every Monday`
  2. else `weekly` / `daily` → `Weekly` / `Daily`
  3. `tomorrow|today` → capitalized
  4. `next <dow>` → `Next <Day>`
  5. plain `<dow>` → `<Day>`
  6. Time: `10am`, `10:30am`, `15:00`
  7. Duration: `45m`, `1h`, `for 30`
  8. Place: `at <place>` or `@<place>` (trailing quoted regex)
  9. Title: whatever remains (title-cased first char)
- Example-phrase buttons `[data-nl-example]` stuff input. Auto-cycles
  examples every 3.6s until user focuses/types.

### 5.6 `mountMonthPeek()` — §06
- Builds a Monday-first grid for `currentYear / currentMonth` (starts at
  April 2026). Leading / trailing days from neighbor months render as
  `.is-muted`.
- Events hardcoded in `EVENTS` keyed by `"MM-DD"`. Any date with events
  gets a coral dot (`.has-events`).
- Hover cell → `renderPeek(key)` updates side panel.
- Click cell → select it (`.is-selected`) + renderPeek.
- Prev / next arrows shift month, grid rebuilds.
- Today is `04-23` (hardcoded).

### 5.7 `mountHeroMacBar()` — §00
- Toggles `data-open` on `.mac-bar` when the token is clicked. Marks
  `data-touched="true"` on the first user interaction so the coral
  pulse-ring and hint fade out.
- Outside-click anywhere outside the bar → close. `Escape` → close.
- Auto-previews the popover once ~1.8s after load (ignored if the user
  already clicked), auto-closes 2.8s later if still untouched.
- Positions the `::before` connector arrow by measuring the token's
  bounding rect vs the popover's bounding rect after each open and on
  window resize.
- Countdown ticker: decrements a seconds counter, formats as `in Xm` /
  `in Xs` in the token's `[data-hero-countdown]`. Loops (also writes the
  Russian `через Nмин` copy to `[data-mpc-countdown]` inside the popover).
- Live clock: writes `Dow Mon D · HH:MM` into `[data-hero-clock]`.
- Calls `mountMpc(bar, popover, markTouched)` (see §5.8) once the
  popover body is found, so every click *inside* the card is a real
  interaction, not a wormhole that closes the popover.

### 5.8 `mountMpc()` — §00 prod-parity popover body
Wires the `.mpc` card (§4.6) so it behaves like the real macOS meeting
card. All clicks inside `.mpc` call `markTouched()` so the parent
menu-bar treats them as real interactions (no auto-close).
- **Screen router `show(screen)`** — sets `data-mpc-screen` on the root,
  toggles `hidden` on each `[data-mpc-screen]` section, plays
  `mpc-slide` via a transient `data-screen-changing` flag.
- **`MutationObserver` on the parent `[data-mac-bar]`** — when the bar
  closes (`data-open="false"`) the card snaps back to `meeting` so the
  next open always starts at the root view.
- **Back buttons** `[data-mpc-back]` → `show("meeting")`.
- **Today pill** `[data-mpc-today]` → `show("today")`. Rows
  `[data-mpc-row]` provide feedback; `[data-mpc-row-join]` fires
  `flashToast("⌘⇧J · opening <provider>…")` and disables itself briefly.
- **Calendar** `[data-mpc-calendar]` → toast "Opening event in
  Calendar…" (would call `NSWorkspace.open` natively).
- **Materials** `[data-mpc-materials]` → `show("materials")`; each
  `[data-mpc-mat]` row fires "Opening <Figma/Docs/…>…" and mimics a
  system hand-off.
- **Join** `[data-mpc-join]` → `show("cam")` (simulates the native
  `CameraCheckView` pre-flight). `[data-mpc-launch]` inside the cam
  screen simulates the final "Join now" with a toast.
- **Mic meter (`startMeter`)** — only runs while the `cam` screen is
  visible (`IntersectionObserver`-style check on `hidden`). 90ms
  ticker: `base sine + jitter`, writes width to `.mpc-cam-meter-bar`,
  updates `-NN.N dB` and threshold label.
- **Settings menu `(openGearMenu / closeGearMenu)`** — click `[data-mpc-
  gear]` toggles `.mpc-menu` `hidden`, outside-click closes.
  - `[data-mpc-mi-toggle]` flips `aria-checked` + icon glyph.
  - `[data-mpc-mi-theme]` sets exclusive `aria-checked` across the
    theme radio trio and flashes `Theme: Dark|Light|Auto`.
  - `[data-mpc-mi-action="prefs|compose|month|shortcuts|quit"]` each
    flash a contextual toast.
- **`flashToast(text)`** — unhides `.mpc-toast` for ~1.6s with a tiny
  rise animation; replaces the native side-effects.
- **`refreshGreeting()`** — rewrites `.mpc-greet` (`Good morning|
  afternoon|evening, Andrew`) and `.mpc-stats`
  (`<Mon D> · N meetings · X hours of focus`) based on current time.
  Ticks every 60s and on `pulsebar:lang` (i18n swap).

### 5.9 `mountWorldClock()` — §07
- `[data-wc-range]` is UTC minutes (0–1440, step 15).
- Each `[data-wc-city]` has `data-offset` (hours from UTC, can be
  fractional like 5.5 for Mumbai).
- On input/init: compute each city's local time, format HH:MM, pick
  day/night glyph (☀/☾), apply `.is-working` class if local hour in
  [9, 18).
- The sky gradient has a cursor line set via the CSS var
  `--wc-cursor` on `.wc-sky`.

---

## 6. How to extend

### Add a new feature
- **Headline-worthy with an interactive demo** → add a new big-feature
  rail between §07 and §08, wrapped in `.big-feature.big-feature-<tint>`
  with the two-column grid (text 5/12, demo 7/12). Add a matching
  `mount*()` in `script.js`. Pick a new tint or reuse peach/sage —
  avoid two dusks.
- **Headline-worthy but static** → 4th card in §04 (change grid to
  4-across on md, or stack as 2×2). Don't expand `.fcard` past 4 cards
  in one row.
- **Small-print** → one `.minor` in §08. Keep numbering sequential.
  Max 16 before splitting.
- **New pill** → `.pill-chip` in pool. `data-pill=<key>`,
  `data-label=<UI label>`, `data-render=<sample value shown in preview>`.
  If experimental: add `data-new="true"` and the green `NEW` badge span.

### Add a new interactive block
- Mark root with `data-demo="<name>"`, add `mount<Name>()` in
  `script.js` that bails if its root is missing.
- Gate animation-heavy demos with `IntersectionObserver` to save CPU.
- Motion 90–300ms ease only.
- Expose state via `data-*` attributes; use CSS-only transitions where
  possible; keep JS for structural change and parsing.

### Legal / content rules (carried over from v1)
- **No real user names** in testimonials until real. Current §11 cards
  must be re-worded as personas or replaced with anonymized quotes.
- **No "4.9 / 5" rating** in hero trust-card until real. Pre-launch →
  change to "closed beta · 142 testers" (no number).
- Structural patterns must stay distinct from `trydot.app`: no "Menu Bar
  Calendar for Mac" strapline, no dark Dot-clone hero, no 8-tile feature
  grid, no tri-card pricing with monthly toggle. The three big-feature
  rails here borrow Dot's **layout shape** but invert the palette (Dot
  is dark, we're light paper); our dark appears only inside the demo
  cards.

---

## 7. Files

```
web/
├── index.html                 single-page, no build step
├── styles.css                 Tailwind via CDN + custom CSS
├── script.js                  vanilla, no deps, mounts 7 demos
├── DESIGN.md                  you are here (v2)
└── versions/
    ├── README.md              archive rules
    └── v1-paper-editorial/    complete v1 snapshot (2026-04-23)
```

Tailwind loaded via CDN; custom token palette and font families are
registered inline in a `<script>` block at the top of the head.

---

## 8. Future ideas, parked

- **Product tour video / Loom** — slot between §07 and §08.
- **Pricing: team license** — add a 3rd `.plan` card when teams > 1.
- **Changelog as markdown** — linked from footer.
- **Newsletter field** — opt-in only, row below §11.
- **Dark mode for the landing** — requires second token set; not until
  asked.
- **Real audio mic meter** — replace pseudo-audio in §04 Card 3 with
  WebAudio `getUserMedia` (gated by button click + permission prompt).
- **Drag-to-time on Month peek** — grab an event and drop it on a
  different date to demo "Edit events from Pree." Dot-like.

---

_Last updated: 2026-04-23_
