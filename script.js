/* ═══════════════════════════════════════════════════════════════
   Pree — interactive bits for the landing page
   Vanilla JS, no deps. Mounted on DOMContentLoaded.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ───────────────────────────────────────────────
  // 0. I18N · EN → RU dictionary + language switcher
  //
  //    How it works:
  //    • Elements mark their translatable text with attributes:
  //        data-i18n          → textContent
  //        data-i18n-html     → innerHTML
  //        data-i18n-aria     → aria-label
  //        data-i18n-placeholder → placeholder attribute
  //        data-i18n-meta     → meta[content] attribute
  //    • EN is the source — original content is captured into
  //      data-i18nOrig* on first apply. Switching back to EN restores it.
  //    • RU strings live only in RU below; missing keys fall through to EN.
  //    • Dynamic modules (mic meter, NL status, meeting-card render,
  //      month peek…) read from window.__i18nRender(key) and listen to
  //      the "pulsebar:lang" CustomEvent.
  // ───────────────────────────────────────────────
  const RU = {
    // document
    "meta.title": "Pree — момент перед следующим звонком",
    "meta.description":
      "Pree — тихое приложение для строки меню. Оно показывает, что будет дальше, когда подключаться и сколько времени осталось — без открытия календаря.",

    // nav
    "nav.what": "Что делает",
    "nav.compose": "Карточка",
    "nav.pricing": "Вейтлист",
    "nav.faq": "Вопросы",
    "nav.cta": "В вейтлист",

    // hero
    "hero.eyebrow": "Pree · v1.0 · для macOS",
    "hero.title":
      "Момент<br/>перед<br/>следующим звонком.",
    "hero.sub":
      "Тихое приложение в меню-баре, которое показывает, что будет дальше, когда входить и сколько у тебя времени, не заставляя открывать календарь.",
    // NOTE: hero.ctaTry / hero.ctaOnce / hero.fine + nav.pricing / nav.cta are tuned for the
    // waitlist phase. When payments are wired, restore these originals:
    //   nav.pricing:  "Цена"
    //   nav.cta:      "Скачать Pree"
    //   hero.ctaTry:  "Попробовать бесплатно"
    //   hero.ctaOnce: "Разово"
    //   hero.fine:    "Без регистрации · Без карты · macOS 13+ · Apple Silicon и Intel"
    "hero.ctaTry": "В вейтлист",
    "hero.ctaOnce": "Первые 100",
    "hero.fine": "Цена навсегда · Без подписки · macOS 13+ · Apple Silicon и Intel",
    "hero.trustKicker": "§ от автора",
    "hero.trustCopy": "Один человек, одно Mac-приложение — для той тихой минуты перед звонком.",
    "hero.trustShipping": "в активной разработке",

    // manifesto
    "manifesto.eyebrow": "§ перед следующим звонком",
    "manifesto.body":
      "<p>Pree — не календарь.</p>" +
      '<p class="text-ink-mid">Это <em class="serif-ital">слой перед созвоном</em>.</p>' +
      "<p>Тихий взгляд на то, что дальше.</p>" +
      '<p class="text-ink-mid">Обратный отсчёт до того, как начнётся суета.</p>' +
      '<p>Одна карточка, чтобы не опоздать в <em class="serif-ital">последнюю минуту</em>.</p>' +
      '<p class="text-ink-mid">Небольшое приложение, тихое приложение,</p>' +
      "<p>в самой узкой полосе экрана.</p>",

    // what it does
    "what.eyebrow": "§ что он делает",
    "what.title":
      'Несколько вещей Pree делает особенно хорошо,<br/><em class="serif-ital text-ink-mid">остальные — тихо, на фоне, без лишнего шума.</em>',
    "what.seePricing": "В вейтлист",

    // card 1 — alert
    "card.alert.eventTitle": "Дизайн-ревью",
    "card.alert.preview": "Проверка перед подключением",
    "card.alert.join": "Подключиться",
    "card.alert.joinAria": "Подключиться к звонку",
    "card.alert.skipPlain": "Пропустить",
    "card.alert.snooze": "Отложить 5м <kbd>S</kbd>",
    "card.alert.skip": "Пропустить <kbd>esc</kbd>",
    "card.alert.opening": "Открываем Google Meet…",
    "card.alert.launching": "⌘⇧J · открываем",
    "card.alert.snoozedTitle":
      'Отложено · вернётся через <span class="snooze-counter">4:59</span>',
    "card.alert.snoozedSub": "появится ровно к началу",
    "card.alert.skipped":
      'Пропущено. <button class="alert-undo" data-action="reset">отменить</button>',
    "card.alert.tag": "Напоминание о встрече",
    "card.alert.heading": "Мягкое напоминание, а не стена уведомлений.",
    "card.alert.body":
      'Это настоящее pre-call окно из приложения: превью камеры сверху, таймер в углу и тот же floating action bar с <kbd>Join</kbd> и <kbd>Skip</kbd>. <span class="text-coral">Нажмите кнопки — посмотрите.</span>',

    // card 2 — quick bar
    "card.qbar.row1": "Создать · Дизайн-синк",
    "card.qbar.row1sub": "Завтра · 16:00 · 45 мин",
    "card.qbar.row2": 'Войти в "Дизайн-ревью"',
    "card.qbar.row2sub": "Google Meet",
    "card.qbar.row3": "Проверить камеру и микрофон",
    "card.qbar.row3sub": "Превью перед присоединением",
    "card.qbar.row4": "Move +30m",
    "card.qbar.row4sub": "Перенести встречу на полчаса позже",
    "card.qbar.row5": "Shorten −15m",
    "card.qbar.row5sub": "Сократить встречу на 15 минут",
    "card.qbar.row6": "Все встречи сегодня",
    "card.qbar.row6sub": "5 встреч",
    "card.qbar.row7": "Месяц одним взглядом",
    "card.qbar.row7sub": "Сетка с точками и peek",
    "card.qbar.sectionNow": "Сейчас",
    "card.qbar.sectionActions": "Действия",
    "card.qbar.tag": "Командная строка",
    "card.qbar.heading": "Точное окно по ⌘K, которое приложение открывает прямо из меню-бара.",
    "card.qbar.body":
      'Это настоящее окно Command Bar из продукта: тот же layout, те же действия по встрече и то же наполнение, которое приложение показывает по <kbd>⌘K</kbd>.',

    // card 3 — materials
    "card.materials.tag": "Материалы и контекст",
    "card.materials.heading":
      "Экран деталей встречи собирает ссылки и участников в одном месте.",
    "card.materials.body":
      "Этот пример собран по реальному экрану деталей внутри popover: шапка, секция материалов, секция участников и действия открытия у каждого документа.",
    "card.materials.uiTitle": "Дизайн-ревью",
    "card.materials.uiSub": "13:30–14:15",
    "card.materials.section1": "Материалы",
    "card.materials.section2": "Участники",
    "card.materials.action": "Открыть",
    "card.materials.item1": "Презентация запуска Q2",
    "card.materials.item2": "Заметки к обсуждению",
    "card.materials.item3": "Задачи запуска",
    "card.materials.person1": "Maya",
    "card.materials.person2": "Вы",
    "card.materials.person3": "Lena",
    "card.materials.status1": "Принято",
    "card.materials.status2": "Организатор",
    "card.materials.status3": "Возможно",
    "what.extra.today.tag": "Экран today",
    "what.extra.today.title": "Реальный список из popover: время, мета-инфо и состояние Join.",
    "what.extra.today.body":
      "Это повторяет реальный экран Today: кнопка назад, заголовок, быстрые действия и у каждой строки свой Join в зависимости от состояния встречи.",
    "what.extra.today.uiTitle": "Сегодня, 24 апреля",
    "what.extra.today.row1": "Дизайн-ревью",
    "what.extra.today.row1meta": "45 мин",
    "what.extra.today.row1sub": "Google Meet · через 6 мин",
    "what.extra.today.row2": "1:1 с Леной",
    "what.extra.today.row2meta": "30 мин",
    "what.extra.today.row2sub": "Zoom · через 1ч 30м",
    "what.extra.today.row3": "Фокус-блок",
    "what.extra.today.row3meta": "30 мин",
    "what.extra.today.row3sub": "Без ссылки на звонок",
    "what.extra.join.tag": "Карточка встречи",
    "what.extra.join.title": "Главная карточка popover собирает summary, действия и материалы.",
    "what.extra.join.body":
      "Это повторяет реальную карточку встречи: summary дня, pill Today, title/meta tokens, счётчик материалов, Join и подсказки по клавишам снизу.",
    "what.extra.join.uiSummary1": "Добрый день",
    "what.extra.join.uiSummary2": "3 встречи · 2ч фокуса",
    "what.extra.join.uiToday": "Сегодня",
    "what.extra.join.uiLabel": "Следующая встреча",
    "what.extra.join.uiTitle": "Дизайн-ревью",
    "what.extra.join.uiCta": "Войти",
    "what.extra.join.pill1": "Google Meet",
    "what.extra.join.pill2": "через 6 мин",
    "what.extra.join.uiFoot": "Отложить <em>S</em>",
    "what.extra.join.uiFoot2": "Открыть в календаре <em>C</em>",

    // NL parser
    "nl.tag": 'Обычный язык · <em class="serif-ital">новое</em>',
    "nl.title":
      'Просто напишите. <em class="serif-ital">Pree разберётся.</em>',
    "nl.body":
      "Не нужно бороться с формой. Просто напишите так, как сказали бы вслух, — Pree сам вытащит название, время, повторение и длительность. Нажмите <kbd>⏎</kbd> — и событие уже в календаре. <span class=\"text-ink-lo\">(живое демо выше — на английском, но приложение понимает и русский)</span>",
    "nl.k.title": "Название",
    "nl.k.recur": "Повторение",
    "nl.k.time": "Время",
    "nl.k.dur": "Длительность",
    "nl.k.place": "Место",
    "nl.calendar": "→ Календарь · Работа",
    "nl.status.waiting": "разбираю…",
    "nl.status.ready": "готово · распознано {n} полей",
    "nl.status.keep": "пишите дальше…",

    // month peek
    "month.tag": "Месяц одним взглядом",
    "month.title": 'Заглянуть, <em class="serif-ital">не открывая.</em>',
    "month.body":
      "Месяц живёт прямо в меню-баре. Наведите на любую дату — и справа сразу появятся события. Без запуска календаря и без потери контекста. Один клик — и вы уже там.",
    "month.hint": "наведите на сетку →",
    "month.prev": "Предыдущий месяц",
    "month.next": "Следующий месяц",
    "month.dow.1": "П",
    "month.dow.2": "В",
    "month.dow.3": "С",
    "month.dow.4": "Ч",
    "month.dow.5": "П",
    "month.dow.6": "С",
    "month.dow.7": "В",

    // world clock
    "world.tag": 'Часовые пояса · <em class="serif-ital">проведите</em>',
    "world.title":
      'Один ползунок. <em class="serif-ital">Все часовые пояса.</em>',
    "world.body":
      "Проведите бегунок через сутки — и все города сдвинутся вместе. Можно быстро поймать Мумбаи до обеда или Берлин до конца рабочего дня. Восемь тысяч городов — одним движением.",
    "world.hint": "тяните бегунок ниже →",

    // small print
    "small.eyebrow": "§ ещё двенадцать деталей",
    "small.title":
      'Мелочи, <em class="serif-ital text-ink-mid">без которых потом неудобно.</em>',
    "small.01.h": "Сводка дня",
    "small.01.p":
      "«23 апр · 3 встречи · 2 часа в фокусе». Одна короткая фраза, не дашборд.",
    "small.02.h": "Строка меню под себя",
    "small.02.p":
      "Выберите, что показывать в меню-баре: следующую встречу, обратный отсчёт, номер недели, второй часовой пояс или ход дня.",
    "small.03.h": "Siri и Shortcuts",
    "small.03.p":
      "«Сири, подключи к следующему созвону». App Intents работают с Shortcuts — и через Shortcuts со Stream Deck и любым макро-инструментом.",
    "small.04.h": "Все календари",
    "small.04.p":
      "iCloud, Google, Exchange — всё, что уже видит Calendar.app. Без нового аккаунта и нового логина.",
    "small.05.h": "Обычные фразы",
    "small.05.p":
      "Не только «создать встречу». Можно написать: <em>перенеси 1:1 на чт 15:00</em> или <em>сократи стендап до 15 минут</em> — Pree поймёт.",
    "small.06.h": "Проверка камеры",
    "small.06.p":
      "Пятисекундное превью до подключения: камера, уровень микрофона, выбор правильного устройства. Никаких сюрпризов в первом кадре.",
    "small.07.h": "Видимые календари",
    "small.07.p":
      "Выбирайте, какие календари Pree показывает. Выключите семейный на рабочие часы, верните вечером.",
    "small.08.h": "Запуск при входе",
    "small.08.p":
      "Один переключатель, и Pree запускается вместе с Mac. Без ручной настройки автозапуска.",
    "small.09.h": "Глобальный хоткей",
    "small.09.p":
      "Одно сочетание — по умолчанию <kbd>⌥⌘Space</kbd> — открывает Pree откуда угодно. Переназначьте на то, что уже помнят пальцы.",
    "small.10.h": "Отложить на 5",
    "small.10.p":
      "Нажмите <kbd>S</kbd> на напоминании — и оно уйдёт на пять минут, а потом тихо вернётся. Один спокойный шаг, когда вы ещё не готовы.",
    "small.11.h": "Готов к Liquid Glass",
    "small.11.p":
      "На macOS Tahoe использует новые материалы, а на Sonoma и Sequoia просто выглядит аккуратно и нативно.",
    "small.12.h": "Внешний вид",
    "small.12.p":
      "Можно следовать системной теме или зафиксировать светлую / тёмную, когда стримите или показываете экран.",

    // compose
    "compose.eyebrow": "§ настройка карточки встречи",
    "compose.title": 'Карточка, <em class="serif-ital">собранная под вас.</em>',
    "compose.body":
      "Включайте и выключайте плашки, меняйте порядок перетаскиванием. Поповер выше — это ровно та карточка, которую вы будете видеть перед встречей: ничего лишнего, только то, что нужно вам.",
    "compose.livePreview": "живое демо · нажимайте и перетаскивайте",
    "compose.card.title": "Дизайн-ревью",
    "compose.card.join": "Войти",
    "compose.card.countdown": "через 5 мин",
    "compose.card.calendarAria": "Открыть в Календаре",
    "compose.card.materialsAria": "Материалы",
    "compose.caption": "↑ так выглядит карточка встречи в поповере меню-бара",
    "compose.tray.active": "активные · ещё 10 можно добавить",
    "compose.tray.reset": "Сброс",
    "compose.tray.activeHint":
      "активные · клик, чтобы убрать; перетащите, чтобы изменить порядок. Название остаётся всегда.",
    "compose.tray.availableHint": "доступные · клик, чтобы добавить",
    "compose.tray.footer":
      "Некоторые значения появятся, только если в событии есть данные.",

    // pill labels
    "pill.countdown": "Обратный отсчёт",
    "pill.organizer": "Организатор",
    "pill.status": "Статус",
    "pill.provider": "Платформа",
    "pill.time": "Время",
    "pill.place": "Место",
    "pill.attendees": "Участники",
    "pill.mid": "ID встречи",
    "pill.calendar": "Календарь",
    "pill.note": "Заметка",
    "pill.materials": "Материалы",
    "pill.week": "Неделя",

    // pill demo values (shown inside the cream meeting card preview)
    "pill.render.countdown": "через 5 мин",
    "pill.render.provider": "Zoom",
    "pill.render.time": "Сегодня · 14:30",
    "pill.render.place": "Студия A · Hayes Valley",
    "pill.render.attendees": "4 человека",
    "pill.render.calendar": "Работа · Google",
    "pill.render.note": "Взять ссылку на Loom",
    "pill.render.materials": "Figma · Планирование Q4",
    "pill.render.week": "Н12 · Пн",
    "pill.render.status": "Подтверждено",

    // presets
    "compose.presets.label": "Наборы:",
    "compose.presets.minimal": "Минимум",
    "compose.presets.default": "По умолчанию",
    "compose.presets.remote": "Удалённая команда",
    "compose.presets.full": "Всё",

    // faux macOS menu bar — system menu labels + hint
    "macbar.file": "Файл",
    "macbar.edit": "Правка",
    "macbar.view": "Вид",
    "macbar.window": "Окно",
    "macbar.help": "Справка",
    "macbar.hint": "нажми",

    // stats
    "stats.mem": "Потребление памяти",
    "stats.launch": "Холодный старт",
    "stats.cpu": "CPU в покое",
    "stats.server": "Уходит на сервер",

    // design principles (formerly "early words")
    "words.eyebrow": "§ принципы, по которым делаю",
    "words.title":
      'Несколько <em class="serif-ital">маленьких правил</em>,<br/>приклеенных над столом.',
    "words.note":
      "Не маркетинг — настоящие заметки на стене, пока собираю Pree.",
    "words.q1.body":
      "«Карточка перед звонком уже должна быть готова. Её не настраивают. Просто жмёшь клавишу.»",
    "words.q1.name": "Спокойно по умолчанию",
    "words.q1.role": "одно нажатие, ноль настройки",
    "words.q2.body":
      "«Функций меньше, чем в больших календарных приложениях. Сознательно. Оставшиеся заслуживают место тем, что их трогают десять раз в день.»",
    "words.q2.name": "Меньше, специально",
    "words.q2.role": "вычитание как функция",
    "words.q3.body":
      "«Превью камеры и микрофона — весь смысл карточки перед звонком. Поймать неправильный вход до первого кадра встречи, а не после.»",
    "words.q3.name": "Поймать заранее",
    "words.q3.role": "пять секунд лучше пяти минут",
    "words.q4.body":
      "«Важнее то, чего тут <em>нет</em>. Ни логина. Ни онбординга. Ни рассылки. Поставил, дал доступ к календарю — и всё.»",
    "words.q4.name": "Очень по-маковски",
    "words.q4.role": "ни аккаунта, ни сервера",
    "words.q5.body":
      '«Если можно написать <code class="q-code">move 1:1 to thu 3pm</code> и оно просто срабатывает — остальное приятный бонус.»',
    "words.q5.name": "Обычные фразы",
    "words.q5.role": "текст на входе, событие на выходе",
    "words.q6.body":
      "«Должно работать на любом Mac, который ещё тянет текущий macOS. Аккуратно к батарее, тихо к CPU. Планка простая: никогда не быть причиной, почему заработал вентилятор.»",
    "words.q6.name": "Тихо на машине",
    "words.q6.role": "никогда не громкое приложение",

    // pricing
    "pricing.eyebrow": "§ сколько стоит",
    "pricing.title":
      'Девятнадцать долларов, <em class="serif-ital">один раз.</em>',
    "pricing.body":
      "Без подписки. Без писем о продлении. Лицензия остаётся вашей, а все обновления v1.x входят навсегда. Когда выйдет v2, для текущих пользователей будет апгрейд со скидкой — но только если за ним действительно стоит год новой работы.",
    "pricing.try.tag": "Попробовать",
    "pricing.try.sub": "без карты · все функции",
    "pricing.try.price": "Бесплатно",
    "pricing.try.desc":
      "Скачайте, дайте доступ к календарю и живите с Pree столько, сколько нужно. Без карты и без почты. Решайте после того, как действительно попользовались неделю-другую.",
    "pricing.try.li1": "Все варианты строки меню",
    "pricing.try.li2": "Командная строка, материалы, проверка камеры",
    "pricing.try.li3": "Siri, Shortcuts и Intents",
    "pricing.try.li4": "Любой календарь",
    "pricing.try.cta": "Скачать Pree бесплатно",
    "pricing.own.tag": "Купить",
    "pricing.own.sub": "разово · персональная лицензия",
    "pricing.own.code": "одна оплата, без подписки",
    "pricing.own.li1": "Все функции — навсегда",
    "pricing.own.li2": "Все обновления v1.x · бесплатно",
    "pricing.own.li3": "Честный возврат, если не зашло",
    "pricing.own.li4": "На письма отвечает автор",
    "pricing.own.cta": "Купить Pree · $19",
    "pricing.own.paddle": "одна оплата · персональная лицензия",
    "pricing.footer": "macOS 13 Ventura или новее · Apple Silicon и Intel",

    // waitlist (temporary replacement for the pricing cards)
    "waitlist.eyebrow": "§ ранний доступ",
    "waitlist.title":
      'Пока собираем <em class="serif-ital">вейтлист.</em>',
    "waitlist.body":
      'Pree сейчас докручивает последние углы перед запуском. Первые <strong class="text-ink">100 человек</strong> из листа фиксируют <strong class="text-ink">$9,99 навсегда</strong> — одна оплата, без подписки, лицензия ваша.',
    "waitlist.tag": "Первые 100",
    "waitlist.sub": "$9,99 · навсегда · одна оплата",
    "waitlist.label": "Ваша почта",
    "waitlist.placeholder": "вы@почта.com",
    "waitlist.cta": "Встать в очередь",
    "waitlist.note": "Без спама. Одно письмо, когда откроется доступ.",
    "waitlist.thanks": "Вы в списке. Напишем в ту же секунду, как откроем доступ.",

    // founder
    "founder.body":
      'Pree вырос из попытки навести порядок в <em class="serif-ital">моей собственной</em> раздёрганной неделе. Я выпустил его, потому что единственное, что хуже пропущенного созвона, — потом за него извиняться.',
    "founder.note":
      "Если в приложении что-то не так — напишите мне. Вам ответит тот самый человек, который пишет код. Это и есть вся команда.",
    "founder.sig": "— Андрей · автор Pree",

    // FAQ
    "faq.eyebrow": "§ вопросы",
    "faq.title": 'О чём <em class="serif-ital">обычно спрашивают.</em>',
    "faq.q1":
      "Нужен ли Pree аккаунт? И увидит ли он мой рабочий календарь?",
    "faq.a1":
      "Аккаунт не нужен — вообще. Pree работает через EventKit, тот же фреймворк, что использует Calendar.app. Если календарь виден в Calendar (iCloud, Google, Exchange и всё, что уже знает Apple Calendar), Pree увидит его автоматически.",
    "faq.q2": "Как работает пробный период?",
    "faq.a2":
      "Скачайте — все функции включены. Без карты, без почты. Пользуйтесь столько, сколько нужно, чтобы решить, — а потом купите разовую лицензию, когда Pree заслужит место в меню-баре.",
    "faq.q3": "Уходит ли что-то из моих встреч куда-нибудь?",
    "faq.a3":
      "Нет. Pree читает локальную базу календаря и никуда не отправляет содержимое событий. Единственные сетевые запросы — анонимная проверка обновлений и валидация лицензии.",
    "faq.q4": "К каким сервисам Pree подключается автоматически?",
    "faq.a4":
      "Zoom, Google Meet, Microsoft Teams, Webex, Whereby, Jitsi, голосовые каналы Discord и Slack huddles распознаются по провайдеру. Любая другая ссылка откроется в браузере по умолчанию одним нажатием.",
    "faq.q5": "Работает ли на Intel Mac?",
    "faq.a5":
      "Да — универсальный бинарь. Минимум macOS 13 Ventura. Лучше всего Pree чувствует себя на macOS Tahoe с Liquid Glass, но и на Sonoma и Sequoia работает отлично.",
    "faq.q6": "Политика апгрейдов?",
    "faq.a6":
      "Лицензия, купленная сегодня, включает все обновления v1.x. Крупные новые версии (v2, v3…) будут платным апгрейдом со скидкой для текущих пользователей — но только когда в коробке будет год настоящей новой работы.",
    "faq.q7": "Что, если не понравится?",
    "faq.a7":
      'Напишите на <a href="mailto:hey@pulsebar.app" class="underline decoration-ink-lo underline-offset-4 hover:decoration-coral hover:text-coral">hey@pulsebar.app</a>. Я хочу, чтобы Pree использовали, потому что он правда нравится — а если не для вас, просто скажите.',

    // footer
    "footer.signoff":
      'Сделано с заботой и без спешки,<br/><em class="serif-ital text-ink-mid">для всех, у кого неделя почти целиком состоит из созвонов.</em>',
    "footer.faq": "вопросы",
    "footer.pricing": "вейтлист",
    "footer.contact": "связаться",
    "footer.privacy": "конфиденциальность",
    "footer.changelog": "обновления",
    "footer.meta":
      "Pree · v1.0 · © 2026 · сделано одним человеком, без спешки",
  };

  // English translations for elements whose HTML default is Russian
  // (the faux mac-bar and its popover — a realistic demo of the actual app).
  const EN = {
    // mac-bar hint + token
    "mac.hint": "click me",
    "mac.token.title": "Design review",
    "mac.token.time": "in 4m",
    "mac.clock": "Thu Apr 23 · 15:55",
    "mac.appname": "Pree",

    // popover · screen 1 (meeting)
    "mpc.greet": "Good afternoon, Andrew",
    "mpc.stats": "Apr 23 · 3 meetings · 2 hours of focus",
    "mpc.today": "Today",
    "mpc.todayTitle": "All of today's meetings",
    "mpc.menu": "Pree menu",
    "mpc.eyebrow": "Up next",
    "mpc.title": "Design review",
    "mpc.countdown": "in 4\u00a0min",
    "mpc.openCal": "Open in Calendar",
    "mpc.materials": "Materials (2)",
    "mpc.materialsA11y": "Materials",
    "mpc.joinHelp": "Check camera, then join",
    "mpc.joinA11y": "Join Design review",
    "mpc.back": "Back",

    // menu items
    "menu.prefs": "Preferences…",
    "menu.login": "Launch at login",
    "menu.float": "Floating window at start",
    "menu.cam": "Auto camera check 60s before",
    "menu.card": "Compose meeting card…",
    "menu.month": "Month at a glance",
    "menu.theme": "Appearance",
    "menu.theme.auto": "Auto (system)",
    "menu.theme.dark": "Dark",
    "menu.theme.light": "Light",
    "menu.shortcuts": "Keyboard shortcuts",
    "menu.quit": "Quit Pree",

    // popover · screen 2 (today list)
    "mpc.today.h1": "Today",
    "mpc.today.h2": "Apr 23 · 3 meetings · 2 hours of focus",
    "mpc.today.row1.title": "Morning standup",
    "mpc.today.row1.meta": "Finished",
    "mpc.today.row1.dur": "30 min",
    "mpc.today.row2.title": "Sync with Lena",
    "mpc.today.row2.meta": "Zoom · live now",
    "mpc.today.row2.dur": "20 min",
    "mpc.today.row2.join": "Zoom · Sync with Lena",
    "mpc.today.row3.title": "Design review",
    "mpc.today.row3.meta": "Google Meet · in 4\u00a0min",
    "mpc.today.row3.dur": "54 min",
    "mpc.today.row3.join": "Google Meet · Design review",
    "mpc.today.row4.title": "1:1 with Andrew",
    "mpc.today.row4.meta": "Zoom · in 2\u00a0hrs",
    "mpc.today.row4.dur": "30 min",
    "mpc.today.row4.join": "Zoom · 1:1 with Andrew",
    "mpc.joinA11yShort": "Join",

    // popover · screen 3 (materials)
    "mpc.mat.h2": "Materials · 2",
    "mpc.mat.organizer": "Organizer",
    "mpc.mat.organizerVal": "Lena K.",
    "mpc.mat.provider": "Provider",

    // popover · screen 4 (camera check)
    "mpc.cam.h1": "Camera & mic",
    "mpc.cam.h2": "One check — and we're in",
    "mpc.cam.mic.label": "good",
    "mpc.cam.launch": "Open Google Meet",

    // hero countdown formats (emitted by JS)
    "mac.countdown.inM": "in {n}m",
    "mac.countdown.inS": "in {n}s",
  };

  const LANG_KEY = "pulsebar_lang";
  let __lang = "en";
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "ru" || saved === "en") __lang = saved;
  } catch (_) {}

  // Expose small accessors for feature modules (mic meter, month peek, …).
  window.__i18nLang = () => __lang;
  window.__i18nRender = (key) =>
    __lang === "ru" && Object.prototype.hasOwnProperty.call(RU, key) ? RU[key] : null;

  function translate(el, key, kind) {
    const useRu = __lang === "ru" && Object.prototype.hasOwnProperty.call(RU, key);
    if (kind === "text") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrig")) {
        el.dataset.i18nOrig = el.textContent;
      }
      el.textContent = useRu ? RU[key] : el.dataset.i18nOrig;
    } else if (kind === "html") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigHtml")) {
        el.dataset.i18nOrigHtml = el.innerHTML;
      }
      el.innerHTML = useRu ? RU[key] : el.dataset.i18nOrigHtml;
    } else if (kind === "aria") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigAria")) {
        el.dataset.i18nOrigAria = el.getAttribute("aria-label") || "";
      }
      el.setAttribute("aria-label", useRu ? RU[key] : el.dataset.i18nOrigAria);
    } else if (kind === "placeholder") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigPh")) {
        el.dataset.i18nOrigPh = el.getAttribute("placeholder") || "";
      }
      el.setAttribute("placeholder", useRu ? RU[key] : el.dataset.i18nOrigPh);
    } else if (kind === "meta") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigContent")) {
        el.dataset.i18nOrigContent = el.getAttribute("content") || "";
      }
      el.setAttribute("content", useRu ? RU[key] : el.dataset.i18nOrigContent);
    }
  }

  // Reverse direction: for elements whose default content is ALREADY in
  // Russian (the faux mac-bar & popover demo), we swap IN english copy
  // when the language flips. Works symmetrically to the block above.
  function translateEN(el, key, kind) {
    const useEn = __lang === "en" && Object.prototype.hasOwnProperty.call(EN, key);
    if (kind === "text") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigRu")) {
        el.dataset.i18nOrigRu = el.textContent;
      }
      el.textContent = useEn ? EN[key] : el.dataset.i18nOrigRu;
    } else if (kind === "html") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigRuHtml")) {
        el.dataset.i18nOrigRuHtml = el.innerHTML;
      }
      el.innerHTML = useEn ? EN[key] : el.dataset.i18nOrigRuHtml;
    } else if (kind === "aria") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigRuAria")) {
        el.dataset.i18nOrigRuAria = el.getAttribute("aria-label") || "";
      }
      el.setAttribute("aria-label", useEn ? EN[key] : el.dataset.i18nOrigRuAria);
    } else if (kind === "title") {
      if (!Object.prototype.hasOwnProperty.call(el.dataset, "i18nOrigRuTitle")) {
        el.dataset.i18nOrigRuTitle = el.getAttribute("title") || "";
      }
      el.setAttribute("title", useEn ? EN[key] : el.dataset.i18nOrigRuTitle);
    }
  }

  function applyLang(lang) {
    __lang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}

    document.querySelectorAll("[data-i18n]").forEach((el) => translate(el, el.getAttribute("data-i18n"), "text"));
    document.querySelectorAll("[data-i18n-html]").forEach((el) => translate(el, el.getAttribute("data-i18n-html"), "html"));
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => translate(el, el.getAttribute("data-i18n-aria"), "aria"));
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => translate(el, el.getAttribute("data-i18n-placeholder"), "placeholder"));
    document.querySelectorAll("[data-i18n-meta]").forEach((el) => translate(el, el.getAttribute("data-i18n-meta"), "meta"));

    document.querySelectorAll("[data-i18n-en]").forEach((el) => translateEN(el, el.getAttribute("data-i18n-en"), "text"));
    document.querySelectorAll("[data-i18n-en-html]").forEach((el) => translateEN(el, el.getAttribute("data-i18n-en-html"), "html"));
    document.querySelectorAll("[data-i18n-en-aria]").forEach((el) => translateEN(el, el.getAttribute("data-i18n-en-aria"), "aria"));
    document.querySelectorAll("[data-i18n-en-title]").forEach((el) => translateEN(el, el.getAttribute("data-i18n-en-title"), "title"));

    // translate document <title> (doesn't show up as textContent in the same way)
    const titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) document.title = titleEl.textContent;

    // language switcher state
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const on = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // notify dynamic modules
    document.dispatchEvent(new CustomEvent("pulsebar:lang", { detail: lang }));
  }

  function mountLangSwitch() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
    });
    applyLang(__lang);
  }

  // ───────────────────────────────────────────────
  // 1. ALERT CARD · Card 1 · state machine
  // ───────────────────────────────────────────────
  function mountAlertDemo() {
    const root = document.querySelector('[data-demo="alert"] .fv-alert');
    if (!root) return;

    let resetTimer = null;
    let countdown = 58;
    const countdownEls = root.querySelectorAll(".alert-countdown");
    const countdownValueEl = root.querySelector(".alert-countdown-value");

    const syncCountdown = () => {
      countdownEls.forEach((el) => {
        el.textContent = `${countdown}s`;
      });
      if (countdownValueEl) countdownValueEl.textContent = String(countdown);
    };

    const setState = (state) => {
      clearTimeout(resetTimer);
      root.setAttribute("data-state", state);

      if (state === "joining") {
        resetTimer = setTimeout(() => setState("idle"), 2600);
      }
      if (state === "skipped") {
        resetTimer = setTimeout(() => setState("idle"), 2000);
      }
    };

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      e.preventDefault();
      const action = btn.getAttribute("data-action");
      if (action === "join") setState("joining");
      if (action === "skip") setState("skipped");
      if (action === "reset") setState("idle");
    });

    syncCountdown();

    // Auto-countdown in idle state (gently ticks down from 58s, then loops)
    setInterval(() => {
      countdown = countdown > 0 ? countdown - 1 : 58;
      syncCountdown();
    }, 1000);
  }

  // ───────────────────────────────────────────────
  // 2. QUICK BAR · Card 2 · clickable rows + typewriter
  // ───────────────────────────────────────────────
  function mountQbarDemo() {
    const card = document.querySelector('[data-demo="qbar"]');
    if (!card) return;
    const input = card.querySelector(".qbar-window-input");
    const groups = Array.from(card.querySelectorAll(".qbar-group"));
    const items = Array.from(card.querySelectorAll(".qbar-item"));
    const empty = card.querySelector(".qbar-empty");
    if (!input || !groups.length || !items.length) return;

    const normalize = (value) =>
      (value || "")
        .toLowerCase()
        .replace(/[“”"]/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const setActive = (next) => {
      items.forEach((item) => item.classList.toggle("is-active", item === next));
    };

    const applyFilter = () => {
      const query = normalize(input.value);
      let visibleCount = 0;

      groups.forEach((group) => {
        const groupItems = Array.from(group.querySelectorAll(".qbar-item"));
        let groupVisible = 0;

        groupItems.forEach((item) => {
          const haystack = normalize(
            item.getAttribute("data-search") || item.textContent
          );
          const matches = !query || haystack.includes(query);
          item.hidden = !matches;
          if (matches) groupVisible++;
        });

        group.hidden = groupVisible === 0;
        visibleCount += groupVisible;
      });

      if (empty) empty.hidden = visibleCount !== 0;

      const activeVisible = card.querySelector(".qbar-item.is-active:not([hidden])");
      if (!activeVisible) {
        const firstVisible = card.querySelector(".qbar-item:not([hidden])");
        if (firstVisible) setActive(firstVisible);
      }
    };

    items.forEach((item) => {
      item.addEventListener("click", () => setActive(item));
    });

    input.addEventListener("input", applyFilter);
    input.addEventListener("focus", () => card.classList.add("is-searching"));
    input.addEventListener("blur", () => card.classList.remove("is-searching"));

    applyFilter();
  }

  function mountDemoButtons() {
    document.querySelectorAll("[data-demo-button]").forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.add("is-pressed");
        window.setTimeout(() => button.classList.remove("is-pressed"), 120);
      });
    });
  }

  // ───────────────────────────────────────────────
  // 4. COMPOSE v2 · MEETING CARD builder
  //    Pills move between "active" (ordered) and "pool" (alphabetic).
  //    Click a pool pill → add to active (end).
  //    Click an active pill → remove (back to pool).
  //    Drag an active pill → reorder within active list.
  // ───────────────────────────────────────────────
  function mountMeetingCardCompose() {
    const active = document.querySelector("[data-pill-list-active]");
    const pool = document.querySelector("[data-pill-list-pool]");
    const preview = document.querySelector("[data-mc-preview]");
    const resetBtn = document.querySelector("[data-pill-reset]");
    const countEl = document.querySelector("[data-pill-count]");
    const presetBtns = document.querySelectorAll("[data-mc-preset]");
    if (!active || !pool || !preview) return;

    const DEFAULTS = ["countdown", "organizer"];
    const PRESETS = {
      minimal: ["countdown"],
      default: ["countdown", "organizer"],
      remote:  ["countdown", "provider", "mid", "attendees"],
      full:    ["countdown", "organizer", "provider", "status", "time", "place", "attendees", "mid", "calendar", "note", "materials"],
    };

    // Pills rendered specially in the card chrome (not as mc-field rows below).
    // title   → always in the header (not toggleable)
    // provider → subtitle · first segment
    // countdown → subtitle · second segment
    // materials → toggles the paperclip icon-button visibility
    const CHROME_PILLS = new Set(["title", "provider", "countdown", "materials"]);

    const subEl        = document.querySelector("[data-mc-sub]");
    const provEl       = document.querySelector("[data-mc-provider]");
    const sepEl        = document.querySelector(".mc-sub-sep");
    const cdEl         = document.querySelector(".mc-countdown");
    const matBtn       = document.querySelector("[data-mc-materials-btn]");

    function render() {
      preview.innerHTML = "";
      const activeChips = Array.from(active.querySelectorAll(".pill-chip.is-active"));

      const providerChip  = active.querySelector('[data-pill="provider"].is-active');
      const countdownChip = active.querySelector('[data-pill="countdown"].is-active');
      const materialsChip = active.querySelector('[data-pill="materials"].is-active');

      const localize = (chip, key) =>
        (window.__i18nRender && window.__i18nRender("pill.render." + key)) ||
        chip?.getAttribute("data-render") || "";

      if (provEl) {
        provEl.textContent = providerChip ? localize(providerChip, "provider") : "";
        provEl.style.display = providerChip ? "inline" : "none";
      }
      if (cdEl) {
        cdEl.textContent = countdownChip ? localize(countdownChip, "countdown") : "";
        cdEl.style.display = countdownChip ? "inline" : "none";
      }
      if (sepEl) sepEl.style.display = (providerChip && countdownChip) ? "inline" : "none";
      if (subEl) subEl.style.display = (providerChip || countdownChip) ? "flex" : "none";

      if (matBtn) {
        if (materialsChip) matBtn.removeAttribute("hidden");
        else matBtn.setAttribute("hidden", "");
      }

      activeChips.forEach((chip) => {
        const key = chip.getAttribute("data-pill");
        if (CHROME_PILLS.has(key)) return;
        const row = document.createElement("li");
        row.className = "mc-field";
        const k = document.createElement("span");
        k.className = "mc-field-k";
        k.textContent = chip.querySelector(".pill-label")?.textContent?.trim() || chip.getAttribute("data-label");
        const v = document.createElement("span");
        v.className = "mc-field-v";
        if (chip.getAttribute("data-render-coral") === "true") v.classList.add("is-coral");
        v.textContent = localize(chip, key);
        row.appendChild(k); row.appendChild(v);
        preview.appendChild(row);
      });

      if (countEl) countEl.textContent = String(activeChips.length);
    }
    // Re-render when language changes so localized pill labels propagate.
    document.addEventListener("pulsebar:lang", render);

    // Click pool → move to active (at end)
    pool.addEventListener("click", (e) => {
      const chip = e.target.closest(".pill-chip");
      if (!chip) return;
      chip.classList.add("is-active");
      chip.setAttribute("draggable", "true");
      // Ensure grip exists at the start
      if (!chip.querySelector(".pill-grip")) {
        const grip = document.createElement("span");
        grip.className = "pill-grip";
        grip.setAttribute("aria-hidden", "true");
        grip.textContent = "⋮⋮";
        chip.insertBefore(grip, chip.firstChild);
      }
      active.appendChild(chip);
      render();
    });

    // Click active → move back to pool
    active.addEventListener("click", (e) => {
      const chip = e.target.closest(".pill-chip");
      if (!chip) return;
      if (e.target.closest(".pill-grip")) return; // drag intent
      chip.classList.remove("is-active");
      chip.removeAttribute("draggable");
      // Remove the grip
      const grip = chip.querySelector(".pill-grip");
      if (grip) grip.remove();
      pool.appendChild(chip);
      render();
    });

    // Drag to reorder within active
    let dragged = null;
    active.addEventListener("dragstart", (e) => {
      const chip = e.target.closest(".pill-chip.is-active");
      if (!chip) return;
      dragged = chip;
      chip.classList.add("is-dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", chip.getAttribute("data-pill")); } catch (_) {}
    });
    active.addEventListener("dragend", () => {
      if (dragged) dragged.classList.remove("is-dragging");
      active.querySelectorAll(".pill-chip.is-over").forEach((c) => c.classList.remove("is-over"));
      dragged = null;
    });
    active.addEventListener("dragover", (e) => {
      e.preventDefault();
      const over = e.target.closest(".pill-chip");
      if (!over || over === dragged) return;
      active.querySelectorAll(".pill-chip.is-over").forEach((c) => c.classList.remove("is-over"));
      over.classList.add("is-over");
    });
    active.addEventListener("drop", (e) => {
      e.preventDefault();
      const over = e.target.closest(".pill-chip");
      if (!over || !dragged || over === dragged) return;
      const rect = over.getBoundingClientRect();
      const afterIt = (e.clientX - rect.left) / rect.width > 0.5;
      if (afterIt) over.after(dragged); else over.before(dragged);
      over.classList.remove("is-over");
      render();
    });

    // Apply a set of pill keys as the active list (in this order)
    function applyActive(keys) {
      // Move everything back to pool first
      Array.from(active.querySelectorAll(".pill-chip")).forEach((chip) => {
        chip.classList.remove("is-active");
        chip.removeAttribute("draggable");
        const g = chip.querySelector(".pill-grip"); if (g) g.remove();
        pool.appendChild(chip);
      });
      // Now move requested ones (in order) into active
      keys.forEach((k) => {
        const chip = pool.querySelector(`.pill-chip[data-pill="${k}"]`);
        if (!chip) return;
        chip.classList.add("is-active");
        chip.setAttribute("draggable", "true");
        if (!chip.querySelector(".pill-grip")) {
          const grip = document.createElement("span");
          grip.className = "pill-grip";
          grip.setAttribute("aria-hidden", "true");
          grip.textContent = "⋮⋮";
          chip.insertBefore(grip, chip.firstChild);
        }
        active.appendChild(chip);
      });
      render();
    }

    if (resetBtn) resetBtn.addEventListener("click", () => applyActive(DEFAULTS));
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = btn.getAttribute("data-mc-preset");
        if (PRESETS[p]) applyActive(PRESETS[p]);
      });
    });

    render();
  }

  // ───────────────────────────────────────────────
  // 5. NATURAL LANGUAGE PARSER · live
  // ───────────────────────────────────────────────
  function mountNLParser() {
    const input = document.querySelector("[data-nl-input]");
    const titleEl = document.querySelector("[data-nl-title]");
    const timeEl = document.querySelector("[data-nl-time]");
    const durEl = document.querySelector("[data-nl-dur]");
    const dateEl = document.querySelector("[data-nl-date]");
    const repeatEl = document.querySelector("[data-nl-repeat]");
    const clearBtn = document.querySelector(".nl-clear-btn");
    const exBtns = document.querySelectorAll("[data-nl-example]");
    if (!input) return;

    const DAY_LONG = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
    const EMPTY = "—";

    function parse(raw) {
      let s = " " + raw.toLowerCase() + " ";
      const out = {
        title: null,
        time: null,
        dur: null,
        date: null,
        repeat: "Doesn't repeat",
      };

      // Recurrence: "every monday", "every mon", "weekly", "daily"
      let m = s.match(/\bevery\s+(mon|tue|wed|thu|fri|sat|sun)[a-z]*\b/);
      if (m) {
        out.repeat = "Every " + DAY_LONG[m[1]];
        out.date = "Next " + DAY_LONG[m[1]];
        s = s.replace(m[0], " ");
      } else if (/\bweekly\b/.test(s))  { out.repeat = "Weekly"; out.date = "Next week"; s = s.replace(/\bweekly\b/, " "); }
      else if (/\bdaily\b/.test(s))     { out.repeat = "Daily"; out.date = "Today"; s = s.replace(/\bdaily\b/, " "); }

      // Single-shot day: tomorrow, today, next monday, fri
      m = s.match(/\b(tomorrow|today)\b/);
      if (m && !out.date) {
        out.date = m[1][0].toUpperCase() + m[1].slice(1);
        s = s.replace(m[0], " ");
      } else {
        m = s.match(/\bnext\s+(mon|tue|wed|thu|fri|sat|sun)[a-z]*\b/);
        if (m && !out.date) {
          out.date = "Next " + DAY_LONG[m[1]];
          s = s.replace(m[0], " ");
        } else {
          m = s.match(/\b(mon|tue|wed|thu|fri|sat|sun)[a-z]*\b/);
          if (m && !out.date) {
            out.date = DAY_LONG[m[1]];
            s = s.replace(m[0], " ");
          }
        }
      }

      // Time: "10am", "10:30am", "3pm", "15:00", "12:30"
      m = s.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/);
      if (m) {
        let h = parseInt(m[1], 10);
        const mn = m[2] ? m[2] : "00";
        const ap = m[3];
        if (ap === "pm" && h < 12) h += 12;
        if (ap === "am" && h === 12) h = 0;
        out.time = String(h).padStart(2, "0") + ":" + mn;
        s = s.replace(m[0], " ");
      } else {
        m = s.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
        if (m) {
          out.time = m[1].padStart(2, "0") + ":" + m[2];
          s = s.replace(m[0], " ");
        }
      }

      // Duration: "45m", "1h", "1 hour", "90 min", "for 30"
      m = s.match(/\b(\d+)\s*(h|hr|hrs|hour|hours)\b/);
      if (m) { out.dur = m[1] + "h"; s = s.replace(m[0], " "); }
      else {
        m = s.match(/\b(\d+)\s*(m|min|mins|minutes?)\b/);
        if (m) { out.dur = m[1] + "m"; s = s.replace(m[0], " "); }
        else {
          m = s.match(/\bfor\s+(\d+)\b/);
          if (m) { out.dur = m[1] + "m"; s = s.replace(m[0], " "); }
        }
      }

      // Title: whatever's left, trimmed
      const title = s.replace(/\s+/g, " ").trim();
      if (title) out.title = title.replace(/\b\w/g, (c, i) => i === 0 ? c.toUpperCase() : c);

      if (!out.date) out.date = "Today";

      return out;
    }

    function update() {
      const v = input.value.trim();
      const p = v ? parse(v) : null;
      const pairs = [
        [titleEl, p?.title],
        [durEl, p?.dur],
        [dateEl, p?.date],
        [timeEl, p?.time],
        [repeatEl, p?.repeat],
      ];

      pairs.forEach(([el, val]) => {
        if (!el) return;
        el.textContent = val || EMPTY;
        el.classList.toggle("is-empty", !val);
      });
    }

    input.addEventListener("input", update);
    input.addEventListener("focus", update);
    clearBtn?.addEventListener("click", () => {
      input.value = "";
      update();
      input.focus();
    });

    exBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        input.value = btn.getAttribute("data-nl-example") || "";
        update();
        input.focus();
      });
    });

    // Auto-cycle example phrases when idle
    const examples = Array.from(exBtns).map((b) => b.getAttribute("data-nl-example") || "");
    if (examples.length) {
      let ei = 0;
      let userTouched = false;
      input.addEventListener("focus", () => (userTouched = true));
      input.addEventListener("input", () => (userTouched = true));
      setInterval(() => {
        if (userTouched) return;
        input.value = examples[ei];
        update();
        ei = (ei + 1) % examples.length;
      }, 3600);
      // First tick immediately so fields aren't empty on load
      input.value = examples[0]; update();
    }
  }

  // ───────────────────────────────────────────────
  // 6. MONTH PEEK · hover a date, see events
  // ───────────────────────────────────────────────
  function mountMonthPeek() {
    const grid = document.querySelector("[data-month-grid]");
    const dateEl = document.querySelector("[data-month-peek-date]");
    const listEl = document.querySelector("[data-month-peek-list]");
    if (!grid || !listEl) return;

    // Reference month: April 2026 (starts Wed, 30 days)
    const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const MONTHS_RU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const MONTHS_SHORT_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const MONTHS_SHORT_RU = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    const DOW_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const DOW_RU = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    let currentYear = 2026;
    let currentMonth = 3; // 0-indexed, April

    // Events in both locales keyed by "mm-dd"
    const EVENTS_EN = {
      "04-01": [{ t: "09:00", n: "Kickoff · Q2",     c: "forest" }, { t: "14:00", n: "Weekly standup", c: "coral" }],
      "04-03": [{ t: "11:00", n: "Design review",    c: "coral" }],
      "04-07": [{ t: "10:30", n: "1:1 · Lena",       c: "forest" }, { t: "15:00", n: "Q4 planning",  c: "peach" }],
      "04-10": [{ t: "09:00", n: "Board meeting",    c: "coral" }],
      "04-14": [{ t: "10:30", n: "Weekly standup",   c: "forest" }, { t: "13:00", n: "Figma jam", c: "peach" }, { t: "16:00", n: "Interview · iOS", c: "coral" }],
      "04-17": [{ t: "09:30", n: "Brand sync",       c: "peach" }],
      "04-21": [{ t: "10:30", n: "Weekly standup",   c: "forest" }, { t: "14:00", n: "Customer call · N&J", c: "coral" }],
      "04-23": [{ t: "09:00", n: "Design review",    c: "coral" }, { t: "10:30", n: "Weekly standup", c: "forest" }, { t: "14:00", n: "Q4 planning", c: "peach" }],
      "04-27": [{ t: "11:00", n: "Roadmap workshop", c: "forest" }, { t: "15:30", n: "Dinner · Lena", c: "peach" }],
      "04-29": [{ t: "09:00", n: "All-hands",        c: "coral" }],
    };
    const EVENTS_RU = {
      "04-01": [{ t: "09:00", n: "Кикофф · Q2",       c: "forest" }, { t: "14:00", n: "Еженедельный стендап", c: "coral" }],
      "04-03": [{ t: "11:00", n: "Дизайн-ревью",      c: "coral" }],
      "04-07": [{ t: "10:30", n: "1:1 · Лена",        c: "forest" }, { t: "15:00", n: "Планирование Q4", c: "peach" }],
      "04-10": [{ t: "09:00", n: "Совет директоров",  c: "coral" }],
      "04-14": [{ t: "10:30", n: "Еженедельный стендап", c: "forest" }, { t: "13:00", n: "Figma-джем", c: "peach" }, { t: "16:00", n: "Интервью · iOS", c: "coral" }],
      "04-17": [{ t: "09:30", n: "Бренд-синк",        c: "peach" }],
      "04-21": [{ t: "10:30", n: "Еженедельный стендап", c: "forest" }, { t: "14:00", n: "Клиент · N&J", c: "coral" }],
      "04-23": [{ t: "09:00", n: "Дизайн-ревью",      c: "coral" }, { t: "10:30", n: "Еженедельный стендап", c: "forest" }, { t: "14:00", n: "Планирование Q4", c: "peach" }],
      "04-27": [{ t: "11:00", n: "Воркшоп по роудмапу", c: "forest" }, { t: "15:30", n: "Ужин · Лена", c: "peach" }],
      "04-29": [{ t: "09:00", n: "All-hands",         c: "coral" }],
    };

    function MONTHS() { return (window.__i18nLang && window.__i18nLang() === "ru") ? MONTHS_RU : MONTHS_EN; }
    function MONTHS_SHORT() { return (window.__i18nLang && window.__i18nLang() === "ru") ? MONTHS_SHORT_RU : MONTHS_SHORT_EN; }
    function DOW() { return (window.__i18nLang && window.__i18nLang() === "ru") ? DOW_RU : DOW_EN; }
    function EVENTS() { return (window.__i18nLang && window.__i18nLang() === "ru") ? EVENTS_RU : EVENTS_EN; }

    const TODAY = "04-23";

    function build() {
      // Remove old cells (keep DOW headers — first 7 children)
      while (grid.children.length > 7) grid.removeChild(grid.lastChild);

      const first = new Date(currentYear, currentMonth, 1);
      const lead = (first.getDay() + 6) % 7; // Monday = 0
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Leading muted days from previous month
      const prevDays = new Date(currentYear, currentMonth, 0).getDate();
      for (let i = lead; i > 0; i--) {
        const c = document.createElement("button");
        c.type = "button";
        c.className = "month-cell is-muted";
        c.textContent = prevDays - i + 1;
        grid.appendChild(c);
      }

      // Days of current month
      for (let d = 1; d <= daysInMonth; d++) {
        const key = String(currentMonth + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
        const c = document.createElement("button");
        c.type = "button";
        c.className = "month-cell";
        c.textContent = d;
        c.setAttribute("data-date", key);
        if (EVENTS()[key]) c.classList.add("has-events");
        if (key === TODAY && currentMonth === 3 && currentYear === 2026) c.classList.add("is-today", "is-selected");
        grid.appendChild(c);
      }

      // Trailing muted days
      const totalCells = lead + daysInMonth;
      const trailing = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= trailing; i++) {
        const c = document.createElement("button");
        c.type = "button";
        c.className = "month-cell is-muted";
        c.textContent = i;
        grid.appendChild(c);
      }

      const head = document.querySelector(".month-head .font-serif");
      if (head) head.innerHTML = `<em class="serif-ital">${MONTHS()[currentMonth]}</em> ${currentYear}`;

      renderPeek(selectedKey);
    }

    // Track which day is currently being peeked so rebuilds (language switch,
    // month navigation) can keep focus.
    let selectedKey = TODAY;

    function renderPeek(key) {
      selectedKey = key;
      const [mm, dd] = key.split("-").map((x) => parseInt(x, 10));
      const d = new Date(currentYear, mm - 1, dd);
      const dowShort = DOW()[(d.getDay() + 6) % 7];
      if (dateEl) dateEl.textContent = `${dowShort} · ${MONTHS_SHORT()[mm - 1]} ${dd}`;
      listEl.innerHTML = "";
      const events = EVENTS()[key] || [];
      events.forEach((e) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="mp-dot mp-${e.c}"></span><span class="mp-time">${e.t}</span><span class="mp-title">${e.n}</span>`;
        listEl.appendChild(li);
      });
    }

    // Hover → peek
    grid.addEventListener("mouseover", (e) => {
      const cell = e.target.closest(".month-cell");
      if (!cell || !cell.hasAttribute("data-date")) return;
      renderPeek(cell.getAttribute("data-date"));
    });
    // Click → select
    grid.addEventListener("click", (e) => {
      const cell = e.target.closest(".month-cell");
      if (!cell || !cell.hasAttribute("data-date")) return;
      grid.querySelectorAll(".month-cell.is-selected").forEach((c) => c.classList.remove("is-selected"));
      cell.classList.add("is-selected");
      renderPeek(cell.getAttribute("data-date"));
    });

    const prev = document.querySelector("[data-month-prev]");
    const next = document.querySelector("[data-month-next]");
    if (prev) prev.addEventListener("click", () => {
      currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; } build();
    });
    if (next) next.addEventListener("click", () => {
      currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; } build();
    });

    // Rebuild when language toggles so month/day names & events re-translate.
    document.addEventListener("pulsebar:lang", build);

    build();
  }

  // ───────────────────────────────────────────────
  // 7. WORLD CLOCK SCRUB
  //    range value is UTC minutes (0..1440), scrub moves all cities.
  // ───────────────────────────────────────────────
  function mountWorldClock() {
    const range = document.querySelector("[data-wc-range]");
    const cities = document.querySelectorAll("[data-wc-city]");
    const readout = document.querySelector("[data-wc-readout]");
    const sky = document.querySelector("[data-wc-sky]");
    if (!range) return;

    function fmt(hours) {
      while (hours < 0) hours += 24;
      hours = hours % 24;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    }

    function isDay(h) {
      const hh = ((h % 24) + 24) % 24;
      return hh >= 7 && hh < 19;
    }

    function isWorking(h) {
      const hh = ((h % 24) + 24) % 24;
      return hh >= 9 && hh < 18;
    }

    function update() {
      const utcMins = parseInt(range.value, 10);
      const utcH = utcMins / 60;
      if (readout) readout.textContent = fmt(utcH);
      if (sky) sky.style.setProperty("--wc-cursor", (utcMins / 1440) * 100 + "%");

      cities.forEach((li) => {
        const off = parseFloat(li.getAttribute("data-offset"));
        const local = utcH + off;
        const timeEl = li.querySelector("[data-wc-time]");
        const iconEl = li.querySelector("[data-wc-icon]");
        if (timeEl) timeEl.textContent = fmt(local);
        if (iconEl) iconEl.textContent = isDay(local) ? "☀" : "☾";
        li.classList.toggle("is-working", isWorking(local));
      });
    }

    range.addEventListener("input", update);
    update();
  }

  // ───────────────────────────────────────────────
  // Mount all when ready
  // ───────────────────────────────────────────────
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  // ───────────────────────────────────────────────
  // 8. HERO MAC-BAR · clickable Pree token → dark popover
  //    Lives at the very top of the page. Click token toggles popover.
  //    Auto-previews once ~1.8s after load so visitors see it's alive.
  // ───────────────────────────────────────────────
  function mountHeroMacBar() {
    const bar = document.querySelector("[data-mac-bar]");
    if (!bar) return;
    const btn = bar.querySelector("[data-hero-token]");
    const popover = bar.querySelector("[data-hero-popover]");
    if (!btn || !popover) return;

    let autoCloseTimer = null;

    function positionArrow() {
      const btnRect = btn.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();
      // distance from the right edge of the popover to the centre of the token
      const fromRight = popRect.right - (btnRect.left + btnRect.width / 2) - 6;
      popover.style.setProperty("--mac-bar-arrow", Math.max(12, Math.min(popRect.width - 24, fromRight)) + "px");
    }

    function open(opts) {
      bar.setAttribute("data-open", "true");
      btn.setAttribute("aria-expanded", "true");
      popover.setAttribute("aria-hidden", "false");
      requestAnimationFrame(positionArrow);
      if (opts && opts.auto) {
        clearTimeout(autoCloseTimer);
        autoCloseTimer = setTimeout(() => {
          // Only auto-close if the user hasn't engaged yet
          if (bar.getAttribute("data-touched") !== "true") close();
        }, 2800);
      }
    }
    function close() {
      bar.removeAttribute("data-open");
      btn.setAttribute("aria-expanded", "false");
      popover.setAttribute("aria-hidden", "true");
    }
    function markTouched() {
      bar.setAttribute("data-touched", "true");
      clearTimeout(autoCloseTimer);
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      markTouched();
      if (btn.getAttribute("aria-expanded") === "true") close();
      else open();
    });
    popover.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", (e) => {
      if (!bar.contains(e.target) && btn.getAttribute("aria-expanded") === "true") {
        markTouched();
        close();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        markTouched();
        close();
      }
    });
    window.addEventListener("resize", () => {
      if (btn.getAttribute("aria-expanded") === "true") positionArrow();
    });

    // Auto-preview so visitors see the interaction without reading the hint
    setTimeout(() => {
      if (bar.getAttribute("data-touched") !== "true") open({ auto: true });
    }, 1800);

    // ── Countdown ticker · ticks down, loops so the chip feels alive.
    //    We drive both the menu-bar token (English short: "in 4m") AND the
    //    popover's Russian meta row ("через 4 мин") off the same counter.
    const cdShort    = bar.querySelector("[data-hero-countdown]");
    const cdPopover  = bar.querySelector("[data-mpc-countdown]");
    let remaining = 4 * 60 + 12; // 4:12 until kickoff
    function renderCountdown() {
      const isEn = (window.__i18nLang && window.__i18nLang() === "en");
      if (cdShort) {
        const m = Math.floor(remaining / 60);
        const s = String(remaining % 60).padStart(2, "0");
        if (remaining >= 60) cdShort.textContent = isEn ? `in ${m}m` : `через ${m}\u00A0мин`;
        else                 cdShort.textContent = isEn ? `in ${s}s` : `через ${s}\u00A0с`;
      }
      if (cdPopover) {
        const m = Math.floor(remaining / 60);
        const s = remaining % 60;
        if (remaining >= 60) cdPopover.innerHTML = isEn ? `in ${m}\u00A0min` : `через ${m}\u00A0мин`;
        else                 cdPopover.innerHTML = isEn ? `in ${s}\u00A0s`   : `через ${s}\u00A0с`;
      }
    }
    renderCountdown();
    setInterval(() => {
      remaining = remaining > 0 ? remaining - 1 : 5 * 60;
      renderCountdown();
    }, 1000);
    document.addEventListener("pulsebar:lang", renderCountdown);

    // ── Live menubar clock · HH:MM + short day/month
    const clock = bar.querySelector("[data-hero-clock]");
    const DOW_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const DOW_RU = ["Вс",  "Пн",  "Вт",  "Ср",  "Чт",  "Пт",  "Сб"];
    const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const MON_RU = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
    function tickClock() {
      if (!clock) return;
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const isEn = (window.__i18nLang && window.__i18nLang() === "en");
      const DOW = isEn ? DOW_EN : DOW_RU;
      const MON = isEn ? MON_EN : MON_RU;
      clock.textContent = `${DOW[d.getDay()]} ${MON[d.getMonth()]} ${d.getDate()} · ${hh}:${mm}`;
    }
    tickClock();
    setInterval(tickClock, 15 * 1000);
    document.addEventListener("pulsebar:lang", tickClock);

    // ── Mount the real meeting-popover-card (MPC) interactions
    mountMpc(bar, popover, markTouched);
  }

  // ───────────────────────────────────────────────
  // 8b. MEETING POPOVER CARD (.mpc) · prod-parity interactions.
  //     Mirrors the real ContentView navigation graph:
  //       meeting ⇄ today · meeting ⇄ materials · meeting ⇄ cam
  //     Plus the SettingsMenu gear dropdown and the Calendar toast.
  // ───────────────────────────────────────────────
  function mountMpc(bar, popover, markTouched) {
    const mpc = popover.querySelector("[data-mpc]");
    if (!mpc) return;

    // ─── Screen navigation ───
    const screens = mpc.querySelectorAll("[data-mpc-screen]");
    function show(screen) {
      mpc.setAttribute("data-screen-changing", "true");
      screens.forEach((el) => {
        el.hidden = el.getAttribute("data-mpc-screen") !== screen;
      });
      mpc.setAttribute("data-screen", screen);
      requestAnimationFrame(() => {
        setTimeout(() => mpc.removeAttribute("data-screen-changing"), 240);
      });
    }

    // Whenever the popover closes, snap back to the main "meeting" screen
    const observer = new MutationObserver(() => {
      if (bar.getAttribute("data-open") !== "true") {
        show("meeting");
        closeGearMenu();
      }
    });
    observer.observe(bar, { attributes: true, attributeFilter: ["data-open"] });

    mpc.querySelectorAll("[data-mpc-back]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        show("meeting");
      });
    });

    // ─── Today pill ───
    const todayBtn = mpc.querySelector("[data-mpc-today]");
    if (todayBtn) {
      todayBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeGearMenu();
        show("today");
      });
    }

    // ─── Today list · clicking a row flashes-selected + row video button ───
    mpc.querySelectorAll(".mpc-today-row").forEach((row) => {
      row.addEventListener("click", (e) => {
        if (e.target.closest("[data-mpc-row-join]")) return;
        row.animate(
          [
            { background: "rgba(10, 132, 255, 0.25)" },
            { background: "rgba(235, 235, 245, 0.09)" },
          ],
          { duration: 420, easing: "ease-out" }
        );
      });
    });
    mpc.querySelectorAll("[data-mpc-row-join]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isEn = (window.__i18nLang && window.__i18nLang() === "en");
        const provTitle = (isEn ? btn.getAttribute("data-mpc-row-join-en") : null)
          || btn.getAttribute("data-mpc-row-join")
          || (isEn ? "meeting" : "встрече");
        flashToast(isEn ? `Opening ${provTitle}…` : `Открываем ${provTitle}…`);
      });
    });

    // ─── Calendar button · toast like the real openEventInCalendar ───
    const calBtn = mpc.querySelector("[data-mpc-calendar]");
    if (calBtn) {
      calBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isEn = (window.__i18nLang && window.__i18nLang() === "en");
        flashToast(isEn ? "Opening event in Calendar…" : "Открываем событие в Календаре…");
      });
    }

    // ─── Materials paperclip · switches to the detail/materials screen ───
    const matBtn = mpc.querySelector("[data-mpc-materials]");
    if (matBtn) {
      matBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        show("materials");
      });
    }
    mpc.querySelectorAll("[data-mpc-mat]").forEach((row) => {
      row.addEventListener("click", (e) => {
        e.stopPropagation();
        const isEn = (window.__i18nLang && window.__i18nLang() === "en");
        const label = (isEn ? row.getAttribute("data-mpc-mat-en") : null)
          || row.getAttribute("data-mpc-mat")
          || (isEn ? "file" : "материал");
        flashToast(isEn ? `Opening ${label}…` : `Открываем ${label}…`);
      });
    });

    // ─── Join button · switches to the camera-check screen ───
    const joinBtn = mpc.querySelector("[data-mpc-join]");
    if (joinBtn) {
      joinBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        show("cam");
      });
    }
    const launchBtn = mpc.querySelector("[data-mpc-launch]");
    if (launchBtn) {
      launchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isEn = (window.__i18nLang && window.__i18nLang() === "en");
        const lbl = mpc.querySelector("[data-mpc-launch-lbl]");
        const originalLbl = lbl ? lbl.textContent : "";
        if (lbl) lbl.textContent = isEn ? "Joining…" : "Подключаемся…";
        launchBtn.setAttribute("disabled", "true");
        flashToast(isEn ? "⌘⇧J · opening Google Meet" : "⌘⇧J · открываем Google Meet");
        setTimeout(() => {
          if (lbl) lbl.textContent = originalLbl;
          launchBtn.removeAttribute("disabled");
          show("meeting");
        }, 1400);
      });
    }

    // ─── Animate the faux mic meter while the cam-check screen is visible ───
    const meterBar = mpc.querySelector("[data-mpc-cam-bar]");
    const dbEl     = mpc.querySelector("[data-mpc-cam-db]");
    const lblEl    = mpc.querySelector("[data-mpc-cam-lbl]");
    let meterRAF = null;
    function startMeter() {
      cancelAnimationFrame(meterRAF);
      let base = 40, t = 0;
      const tick = () => {
        if (mpc.getAttribute("data-screen") !== "cam" ||
            bar.getAttribute("data-open") !== "true") return;
        t += 1;
        const jitter = Math.sin(t / 6) * 18 + Math.sin(t / 2.3) * 9;
        const v = Math.max(14, Math.min(84, base + jitter));
        if (meterBar) meterBar.style.width = v.toFixed(1) + "%";
        const db = -42 + Math.round(v * 0.38);
        if (dbEl) dbEl.textContent = `${db}\u00A0dB`;
        if (lblEl) {
          const isEn = (window.__i18nLang && window.__i18nLang() === "en");
          const key = v > 70 ? "hot" : v < 25 ? "quiet" : "good";
          const mapRu = { hot: "громко", quiet: "тихо", good: "в норме" };
          lblEl.textContent = isEn ? key : mapRu[key];
        }
        meterRAF = requestAnimationFrame(tick);
      };
      tick();
    }
    // Re-start the meter every time the cam screen becomes visible
    const camScreen = mpc.querySelector('[data-mpc-screen="cam"]');
    if (camScreen) {
      new MutationObserver(() => {
        if (!camScreen.hidden) startMeter();
      }).observe(camScreen, { attributes: true, attributeFilter: ["hidden"] });
    }

    // ─── Gear · SettingsMenu dropdown ───
    const gearBtn = mpc.querySelector("[data-mpc-gear]");
    const gearMenu = mpc.querySelector("[data-mpc-menu]");
    function openGearMenu() {
      if (!gearBtn || !gearMenu) return;
      gearBtn.setAttribute("aria-expanded", "true");
      gearMenu.setAttribute("aria-hidden", "false");
    }
    function closeGearMenu() {
      if (!gearBtn || !gearMenu) return;
      gearBtn.setAttribute("aria-expanded", "false");
      gearMenu.setAttribute("aria-hidden", "true");
    }
    if (gearBtn) {
      gearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = gearBtn.getAttribute("aria-expanded") === "true";
        if (open) closeGearMenu();
        else openGearMenu();
      });
    }
    // Close the gear menu when clicking anywhere else inside the popover
    mpc.addEventListener("click", (e) => {
      if (!e.target.closest("[data-mpc-menu]") && !e.target.closest("[data-mpc-gear]")) {
        closeGearMenu();
      }
    });
    // Menu items: toggles, radios, and actions with proper behaviour
    if (gearMenu) {
      gearMenu.querySelectorAll("[data-mpc-mi-toggle]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const on = btn.getAttribute("aria-checked") === "true";
          btn.setAttribute("aria-checked", on ? "false" : "true");
        });
      });
      gearMenu.querySelectorAll("[data-mpc-mi-theme]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          gearMenu.querySelectorAll("[data-mpc-mi-theme]").forEach((b) => b.setAttribute("aria-checked", "false"));
          btn.setAttribute("aria-checked", "true");
          const isEn = (window.__i18nLang && window.__i18nLang() === "en");
          const lbl = btn.querySelector(".mpc-mi-lbl").textContent;
          flashToast(isEn ? `Theme: ${lbl}` : `Тема: ${lbl}`);
          closeGearMenu();
        });
      });
      gearMenu.querySelectorAll("[data-mpc-mi-action]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const action = btn.getAttribute("data-mpc-mi-action");
          const isEn = (window.__i18nLang && window.__i18nLang() === "en");
          const labelsRu = {
            prefs:     "Открываем настройки…",
            card:      "Открываем настройку карточки…",
            month:     "Открываем календарь месяца…",
            shortcuts: "Открываем горячие клавиши…",
            quit:      "Pree остаётся на месте",
          };
          const labelsEn = {
            prefs:     "Opening preferences…",
            card:      "Opening meeting card settings…",
            month:     "Opening Month peek…",
            shortcuts: "Keyboard shortcuts…",
            quit:      "Quit Pree (not today)",
          };
          const labels = isEn ? labelsEn : labelsRu;
          flashToast(labels[action] || "…");
          closeGearMenu();
        });
      });
    }

    // ─── Toast helper ───
    const toast = mpc.querySelector("[data-mpc-toast]");
    let toastTimer = null;
    function flashToast(text) {
      if (!toast) return;
      toast.textContent = text;
      toast.hidden = false;
      requestAnimationFrame(() => toast.setAttribute("data-show", "true"));
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.removeAttribute("data-show");
        setTimeout(() => { toast.hidden = true; }, 220);
      }, 1600);
    }

    // ─── Localised day greeting + stats (mirrors DaySummary.swift) ───
    const greetEl = mpc.querySelector("[data-mpc-greet]");
    const statsEl = mpc.querySelector("[data-mpc-stats]");
    const MONTHS_RU = ["янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","ноя","дек"];
    const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    function refreshGreeting() {
      if (!greetEl || !statsEl) return;
      const d = new Date();
      const h = d.getHours();
      const isEn = (window.__i18nLang && window.__i18nLang() === "en");
      if (isEn) {
        let part = "Good evening";
        if (h >= 5  && h <= 11) part = "Good morning";
        else if (h >= 12 && h <= 16) part = "Good afternoon";
        else if (h >= 17 && h <= 22) part = "Good evening";
        else part = "Good night";
        greetEl.textContent = `${part}, Andrew`;
        statsEl.textContent = `${MONTHS_EN[d.getMonth()]} ${d.getDate()} · 3 meetings · 2 hours of focus`;
      } else {
        let part = "Доброй ночи";
        if (h >= 5  && h <= 11) part = "Доброе утро";
        else if (h >= 12 && h <= 16) part = "Добрый день";
        else if (h >= 17 && h <= 22) part = "Добрый вечер";
        greetEl.textContent = `${part}, Андрей`;
        statsEl.textContent = `${d.getDate()} ${MONTHS_RU[d.getMonth()]} · 3 встречи · 2 часа фокуса`;
      }
    }
    refreshGreeting();
    setInterval(refreshGreeting, 60 * 1000);
    document.addEventListener("pulsebar:lang", refreshGreeting);

    // Interacting with the popover counts as "touched" so auto-preview stops.
    mpc.addEventListener("click", markTouched);
  }

  // ───────────────────────────────────────────────
  // 9. REVEAL · scroll-driven soft-editorial animations
  //
  //    • Tags elements with `.reveal-*` classes via selector presets,
  //      so the HTML stays clean.
  //    • IntersectionObserver flips `.is-inview` when the element has
  //      ~15% visible, which settles the element to its rest state.
  //    • For headings flagged with `.rv-split`, the text is split into
  //      `.rv-word` spans (each word on a single line gets its own
  //      stagger index). Per-letter split is used for tiny eyebrows.
  //    • Containers with `.reveal-stagger` cascade their direct reveal
  //      children via `--rv-i` (0, 1, 2 …).
  //    • The hero is special-cased: the eyebrow, H1 words, subcopy and
  //      buttons animate in immediately on page load ("first breath"),
  //      not on scroll — they're above the fold anyway.
  //    • Respects `prefers-reduced-motion: reduce` — every reveal rule
  //      is short-circuited in CSS in that case.
  //
  //    i18n: when the language switches, data-i18n-html replaces inner
  //    markup of several headings. We re-split them after each switch
  //    so the word cascade keeps working in both EN and RU.
  // ───────────────────────────────────────────────
  function mountReveal() {
    const reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // What each group of elements should look like when revealing.
    // Order matters: more specific selectors first.
    // ┌ class(es) to add
    // ├ CSS selector
    // └ optional { stagger: true } → children cascade via --rv-i
    const PRESETS = [
      // ───── hero (above the fold — we set .hero-breath directly & skip observer)
      // Eyebrow: the <p> that wraps [data-i18n='hero.eyebrow'] — :has selector
      // keeps us from accidentally hitting every section's eyebrow.
      { sel: "p:has(> span[data-i18n='hero.eyebrow'])", cls: "reveal-blur", hero: true, base: 0 },
      { sel: "h1[data-i18n-html='hero.title']", cls: "rv-split", hero: true, split: "words", base: 140 },
      { sel: "p[data-i18n='hero.sub']", cls: "reveal-soft", hero: true, base: 520 },
      { sel: "a.btn-ink[href='#pricing'], a.btn-paper[href='#pricing']", cls: "reveal-rise", hero: true, base: 700, groupStep: 90 },
      { sel: "p[data-i18n='hero.fine']", cls: "reveal-soft", hero: true, base: 950 },
      { sel: ".trust-card", cls: "reveal-blur", hero: true, base: 360 },

      // ───── manifesto (the short belief block) — each belief line gets pulled up
      { sel: "section .font-mono[data-i18n='manifesto.eyebrow']", cls: "reveal-blur" },
      { sel: "[data-i18n-html='manifesto.body'] > p", cls: "reveal-pull-soft", groupStep: 110 },

      // ───── what it does
      { sel: "[data-i18n='what.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='what.title']", cls: "rv-split", split: "words" },
      { sel: "a[data-i18n='what.seePricing']", cls: "reveal-rise" },
      { sel: ".what-panel", cls: "reveal-zoom", groupStep: 120 },
      { sel: ".what-mini", cls: "reveal-zoom", groupStep: 120 },

      // ───── NL parser (big-feature peach)
      { sel: "#nl [data-i18n-html='nl.tag']", cls: "reveal-blur" },
      { sel: "#nl h2[data-i18n-html='nl.title']", cls: "rv-split", split: "words" },
      { sel: "#nl p[data-i18n-html='nl.body']", cls: "reveal-pull-soft" },
      { sel: "#nl .ex-btn", cls: "reveal-rise", groupStep: 70 },
      { sel: "#nl .nl-card", cls: "reveal-slide-r" },

      // ───── month peek (big-feature sage)
      { sel: "#month [data-i18n='month.tag']", cls: "reveal-blur" },
      { sel: "#month h2[data-i18n-html='month.title']", cls: "rv-split", split: "words" },
      { sel: "#month [data-i18n='month.body']", cls: "reveal-pull-soft" },
      { sel: "#month [data-i18n='month.hint']", cls: "reveal-soft" },
      { sel: "#month .month-card", cls: "reveal-slide-l" },

      // ───── small print (12 minors)
      { sel: "[data-i18n='small.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='small.title']", cls: "rv-split", split: "words" },
      { sel: ".minor", cls: "reveal-soft", groupStep: 55 },

      // ───── compose (meeting-card builder)
      { sel: "[data-i18n='compose.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='compose.title']", cls: "rv-split", split: "words" },
      { sel: "#compose p[data-i18n='compose.body']", cls: "reveal-pull-soft" },
      { sel: ".mc-card", cls: "reveal-zoom" },
      { sel: ".token-tray", cls: "reveal-soft" },

      // ───── stats strip
      { sel: ".stat-cell", cls: "reveal-rise", groupStep: 90 },

      // ───── words / principles
      { sel: "[data-i18n='words.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='words.title']", cls: "rv-split", split: "words" },
      { sel: "[data-i18n='words.note']", cls: "reveal-soft" },
      { sel: ".quote", cls: "reveal-zoom", groupStep: 90 },

      // ───── waitlist (temporary replacement for pricing cards)
      { sel: "[data-i18n='waitlist.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='waitlist.title']", cls: "rv-split", split: "words" },
      { sel: "p[data-i18n-html='waitlist.body']", cls: "reveal-pull-soft" },
      { sel: ".waitlist-card", cls: "reveal-zoom" },
      { sel: "[data-i18n='pricing.footer']", cls: "reveal-soft" },

      // ───── pricing (kept for when payments are wired; selectors harmless if unmounted)
      { sel: "[data-i18n='pricing.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='pricing.title']", cls: "rv-split", split: "words" },
      { sel: "p[data-i18n='pricing.body']", cls: "reveal-pull-soft" },
      { sel: ".plan", cls: "reveal-zoom", groupStep: 130 },

      // ───── founder note
      { sel: ".founder-avatar-wrap", cls: "reveal-zoom" },
      { sel: "p[data-i18n-html='founder.body']", cls: "reveal-pull-soft", base: 120 },
      { sel: "p[data-i18n='founder.note']", cls: "reveal-soft", base: 220 },
      { sel: "p[data-i18n='founder.sig']", cls: "reveal-blur", base: 320 },

      // ───── FAQ
      { sel: "[data-i18n='faq.eyebrow']", cls: "reveal-blur" },
      { sel: "h2[data-i18n-html='faq.title']", cls: "rv-split", split: "words" },
      { sel: ".faq-item", cls: "reveal-soft", groupStep: 70 },

      // ───── footer
      { sel: "footer .brand-mark-lg", cls: "reveal-zoom" },
      { sel: "p[data-i18n-html='footer.signoff']", cls: "reveal-blur", base: 120 },
      { sel: "footer .flex", cls: "reveal-soft", base: 220 },
      { sel: "p[data-i18n='footer.meta']", cls: "reveal-soft", base: 320 },
    ];

    // ── word splitter. Idempotent: if the element already contains
    //    .rv-word spans (previous run), do nothing. After innerHTML is
    //    replaced by i18n, the .rv-word spans are gone, and we re-run.
    function splitWords(el) {
      if (!el) return;
      if (el.querySelector(".rv-word")) return;
      // Preserve whatever HTML <em>/<br/> the original copy used,
      // but only split text nodes — this way serif-italic stays.
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      const textNodes = [];
      let n;
      while ((n = walker.nextNode())) textNodes.push(n);
      let idx = 0;
      textNodes.forEach((node) => {
        const raw = node.nodeValue;
        if (!raw || !raw.trim()) return;
        const frag = document.createDocumentFragment();
        // Split by whitespace but keep the whitespace.
        const parts = raw.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "rv-word";
            span.style.setProperty("--rv-i", String(idx++));
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      });
      el.dataset.rvSplit = "words";
      el.style.setProperty("--rv-count", String(idx));
    }

    // Walk each preset, tag matching nodes with classes and stagger index.
    // Idempotent: safe to run more than once (classList.add and inline style
    // writes are cheap; splitWords is guarded by its own idempotence).
    function tag() {
      PRESETS.forEach((p) => {
        let nodes;
        try {
          nodes = document.querySelectorAll(p.sel);
        } catch (e) {
          return;
        }
        nodes.forEach((node, i) => {
          if (p.cls) {
            p.cls.split(/\s+/).forEach((c) => node.classList.add(c));
          }
          if (p.split === "words") splitWords(node);
          if (p.base != null) {
            node.style.setProperty("--rv-base", `${p.base}ms`);
          }
          if (p.groupStep != null) {
            node.style.setProperty("--rv-i", String(i));
            node.style.setProperty(
              "--rv-delay",
              `calc(${i} * ${p.groupStep}ms + var(--rv-base, 0ms))`
            );
          }
          if (p.hero) node.dataset.rvHero = "1";
        });
      });
    }

    tag();

    if (reduced) {
      // Nothing to observe; CSS already neutralises everything.
      document
        .querySelectorAll("[class*='reveal-'], .rv-split")
        .forEach((el) => el.classList.add("is-inview"));
      return;
    }

    // ── Scroll observer. Shared instance, re-used by the lang-change
    //    handler so newly-tagged elements (after innerHTML was rewritten
    //    by i18n) also get observed.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            io.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      }
    );

    // Track which nodes we've already told the observer about. Using a
    // WeakSet keeps the DOM free to GC detached nodes (post innerHTML swap).
    const observed = new WeakSet();
    function observeAll() {
      document
        .querySelectorAll("[class*='reveal-'], .rv-split, .rv-chars")
        .forEach((el) => {
          if (observed.has(el)) return;
          if (el.classList.contains("is-inview")) return;
          if (el.dataset.rvHero === "1") return;
          observed.add(el);
          io.observe(el);
        });
    }

    // ── Hero "first breath": kick above-the-fold tagged elements into
    //    reveal immediately, without waiting for scroll. Double rAF gives
    //    the browser one frame with the initial hidden state before
    //    transitioning to rest.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .querySelectorAll('[data-rv-hero="1"]')
          .forEach((el) => el.classList.add("is-inview"));
      });
    });

    observeAll();

    // ── Language change: data-i18n-html nodes replace their innerHTML.
    //    Consequences:
    //      1. .rv-split headings lose their .rv-word spans → re-split.
    //      2. Descendants we'd tagged (e.g. manifesto paragraphs inside
    //         data-i18n-html='manifesto.body') are new DOM nodes; they
    //         lost our classes → re-tag.
    //      3. Those new nodes aren't observed yet → observeAll() again.
    //    If an element is currently in the viewport when the language
    //    switches, settle it immediately (no re-animation flash).
    document.addEventListener("pulsebar:lang", () => {
      tag();
      const vpH = window.innerHeight || 0;
      document
        .querySelectorAll("[class*='reveal-'], .rv-split")
        .forEach((el) => {
          if (el.classList.contains("is-inview")) return;
          if (el.dataset.rvHero === "1") {
            el.classList.add("is-inview");
            return;
          }
          const r = el.getBoundingClientRect();
          if (r.top < vpH * 0.92 && r.bottom > 0) {
            el.classList.add("is-inview");
          }
        });
      observeAll();
    });
  }

  // ───────────────────────────────────────────────
  // 10. PARALLAX · hero & section glow orbs
  //
  //    The hero has two big soft-blurred radial orbs positioned
  //    absolutely. We nudge them by a small fraction of scroll so the
  //    background feels like it has a plane of its own — the effect is
  //    intentionally tiny (≤40px max) to stay editorial, not playful.
  //
  //    We tag the orbs at runtime so we don't have to touch the HTML.
  //    Anything with `.pointer-events-none.blur-3xl` in a positioned
  //    section qualifies.
  // ───────────────────────────────────────────────
  function mountParallax() {
    const reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Every big radial orb on the page. They all share these two
    // Tailwind classes, so this is a reliable selector.
    const orbs = Array.from(
      document.querySelectorAll(".pointer-events-none.blur-3xl")
    );
    if (!orbs.length) return;

    orbs.forEach((el, i) => {
      el.setAttribute("data-parallax", "");
      // Alternate direction per orb so they don't all drift the same way.
      el.dataset.parallaxFactor = i % 2 === 0 ? "-0.06" : "0.09";
    });

    let ticking = false;
    function update() {
      const vpH = window.innerHeight || 1;
      orbs.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Progress: -1 (just entered from bottom) → +1 (leaving at top).
        const centerY = rect.top + rect.height / 2;
        const progress = (centerY - vpH / 2) / vpH;
        const factor = parseFloat(el.dataset.parallaxFactor || "0.05");
        const maxPx = 38;
        const py = Math.max(-maxPx, Math.min(maxPx, progress * factor * 200));
        el.style.setProperty("--py", `${py.toFixed(1)}px`);
      });
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  // ───────────────────────────────────────────────
  // Waitlist form — client-side only for now. Persists any entered email
  // to localStorage and flips the form into a "thanks" state. When the
  // real backend is ready this can POST to /waitlist instead.
  // ───────────────────────────────────────────────
  function mountWaitlist() {
    const form = document.querySelector(".waitlist-form");
    if (!form) return;
    const thanks = form.querySelector(".wl-thanks");
    if (thanks) thanks.hidden = false;
    form.dataset.state = "idle";

    if (localStorage.getItem("pree.waitlist.joined") === "1") {
      form.dataset.state = "submitted";
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.checkValidity()) {
        input && input.focus();
        return;
      }
      try { localStorage.setItem("pree.waitlist.email", input.value.trim()); } catch (_) {}
      try { localStorage.setItem("pree.waitlist.joined", "1"); } catch (_) {}
      form.dataset.state = "submitted";
    });
  }

  ready(() => {
    // Language switcher goes first so everything mounts with the chosen
    // locale (stored in localStorage from last session).
    mountLangSwitch();
    mountAlertDemo();
    mountQbarDemo();
    mountDemoButtons();
    mountMeetingCardCompose();
    mountNLParser();
    mountMonthPeek();
    mountWorldClock();
    mountHeroMacBar();
    mountWaitlist();
    // Reveals last — after i18n has applied, so data-i18n-html headings
    // have their final markup and our word-splitter operates on the
    // real text.
    mountReveal();
    mountParallax();
  });
})();
