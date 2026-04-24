# Pulsebar landing — version archive

Каждая подпапка — полный снимок `web/` на момент заморозки версии.
Чтобы откатиться, скопируй файлы обратно в `web/`.

## Версии

### `v1-paper-editorial/` — 2026-04-23

Первая «Memorisely × Yukee» версия.

- **Направление:** warm paper palette, Fraunces italic display, Geist mono
  metadata. Один coral accent, bottle-green для глубины.
- **4 интерактивных блока:** pre-call alert state machine, Quick Bar
  typewriter, live mic meter, menu-bar token composer (`§ compose` =
  меню-бар).
- **Структура:** hero → manifesto → 3 feature cards → 12 minor →
  compose (menu-bar) → stats → testimonials → pricing → founder → FAQ.
- **Документ:** `DESIGN.md` в папке.

### `current/` (живёт в `web/`)

v2 — «Dot-style interactive» на той же бумажной палитре.

- `§ compose` теперь про **карточку встречи** (пилюли Status / Provider /
  Attendees / Meeting ID / Note + NEW-бейджи).
- `§ what it does` расширен: 3 базовые карточки + 3 новые full-width
  feature-секции в стиле Dot с большими интерактивными демо:
  Natural Language parser, Month peek, World Clock scrub.
- Смотри актуальный `DESIGN.md` в корне `web/` для полной документации.

## Правила архивирования

Перед большой итерацией:
```bash
mkdir -p web/versions/v{N}-<slug>
cp web/index.html web/styles.css web/script.js web/DESIGN.md web/versions/v{N}-<slug>/
```

После — обновить этот `README.md` с новой записью.
