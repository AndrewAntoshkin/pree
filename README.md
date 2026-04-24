# Pree — landing

The marketing site for Pree, the quiet macOS menu-bar app that shows what's next,
when to join, and how much time you have — without opening your calendar.

- `index.html` — the full page (EN + RU via JS i18n)
- `styles.css` — custom styles on top of Tailwind CDN
- `script.js` — every interactive demo on the page (popover, command bar, NL parser,
  month peek, meeting-card compose, mic level, reveal animations, parallax)
- `assets/` — images, brand mark, video
- `versions/` — older design iterations

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

The site is deployed to [GitHub Pages](https://andrewantoshkin.github.io/pree/)
directly from the `main` branch. Any push to `main` publishes automatically.

No build step, no bundler, no dependencies — just static files.
