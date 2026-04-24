/* ═══════════════════════════════════════════════════════════════
   Pulsebar — interactive bits for the landing page
   Vanilla JS, no deps. Mounted on DOMContentLoaded.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ───────────────────────────────────────────────
  // 1. ALERT CARD · Card 1 · state machine
  // ───────────────────────────────────────────────
  function mountAlertDemo() {
    const root = document.querySelector('[data-demo="alert"] .fv-alert');
    if (!root) return;

    let resetTimer = null;
    let snoozeInterval = null;

    const setState = (state) => {
      clearTimeout(resetTimer);
      clearInterval(snoozeInterval);
      root.setAttribute("data-state", state);

      if (state === "joining") {
        resetTimer = setTimeout(() => setState("idle"), 2600);
      }
      if (state === "snoozed") {
        let remaining = 299; // 4:59
        const counter = root.querySelector(".snooze-counter");
        snoozeInterval = setInterval(() => {
          remaining--;
          const m = Math.floor(remaining / 60);
          const s = String(remaining % 60).padStart(2, "0");
          if (counter) counter.textContent = `${m}:${s}`;
          if (remaining <= 295) {
            clearInterval(snoozeInterval);
            resetTimer = setTimeout(() => setState("idle"), 600);
          }
        }, 400);
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
      if (action === "snooze") setState("snoozed");
      if (action === "skip") setState("skipped");
      if (action === "reset") setState("idle");
    });

    // Auto-countdown in idle state (gently ticks down from 58s, then loops)
    let countdown = 58;
    const cdEl = root.querySelector(".alert-countdown");
    setInterval(() => {
      if (root.getAttribute("data-state") !== "idle") return;
      countdown = countdown > 0 ? countdown - 1 : 58;
      if (cdEl) cdEl.textContent = `${countdown}s`;
    }, 1000);
  }

  // ───────────────────────────────────────────────
  // 2. QUICK BAR · Card 2 · clickable rows + typewriter
  // ───────────────────────────────────────────────
  function mountQbarDemo() {
    const card = document.querySelector('[data-demo="qbar"]');
    if (!card) return;
    const typed = card.querySelector(".fv-typed");
    const rows = card.querySelectorAll(".fv-bar-row");

    let typingTimer = null;

    function type(phrase) {
      clearTimeout(typingTimer);
      if (!typed) return;
      typed.textContent = "";
      let i = 0;
      const step = () => {
        if (i <= phrase.length) {
          typed.textContent = phrase.slice(0, i);
          i++;
          typingTimer = setTimeout(step, 25 + Math.random() * 25);
        }
      };
      step();
    }

    rows.forEach((row) => {
      row.addEventListener("click", () => {
        rows.forEach((r) => r.classList.remove("is-on"));
        row.classList.add("is-on");
        const phrase = row.getAttribute("data-qbar-phrase");
        if (phrase) type(phrase);
      });
    });

    // Cycle through phrases every few seconds until user interacts
    let userTouched = false;
    rows.forEach((r) => r.addEventListener("click", () => (userTouched = true)));

    const phrases = JSON.parse(typed?.getAttribute("data-phrases") || "[]");
    if (phrases.length) {
      let pi = 0;
      setInterval(() => {
        if (userTouched) return;
        pi = (pi + 1) % phrases.length;
        type(phrases[pi]);
        rows.forEach((r) => r.classList.toggle("is-on", r.getAttribute("data-qbar-phrase") === phrases[pi]));
      }, 3800);
    }
  }

  // ───────────────────────────────────────────────
  // 3. MIC METER · Card 3 · live pseudo-audio
  // ───────────────────────────────────────────────
  function mountMicDemo() {
    const card = document.querySelector('[data-demo="mic"]');
    if (!card) return;
    const bar = card.querySelector("[data-meter-bar]");
    const peak = card.querySelector("[data-meter-peak]");
    const label = card.querySelector("[data-meter-label]");
    const db = card.querySelector("[data-meter-db]");
    if (!bar) return;

    let peakValue = 50;
    let peakDecayTimer = 0;

    const tick = () => {
      // Base "voice" signal with natural variation
      const base = 32 + 22 * Math.sin(Date.now() / 340);
      const jitter = (Math.random() - 0.5) * 28;
      let level = Math.max(6, Math.min(92, base + jitter));

      bar.style.width = level + "%";

      // Peak tracks max then decays slowly
      if (level > peakValue) {
        peakValue = level;
        peakDecayTimer = 0;
      } else {
        peakDecayTimer++;
        if (peakDecayTimer > 10) peakValue = Math.max(level, peakValue - 0.8);
      }
      if (peak) peak.style.left = peakValue + "%";

      // dB mapping: -60 (floor) … 0 (clip)
      const dbVal = Math.round(-60 + (level / 100) * 60);
      if (db) db.textContent = `${dbVal} dB`;

      if (label) {
        if (level < 20) label.textContent = "quiet";
        else if (level < 55) label.textContent = "good";
        else if (level < 80) label.textContent = "loud";
        else label.textContent = "clipping";
      }
    };

    let interval = null;
    const start = () => { if (!interval) interval = setInterval(tick, 90); };
    const stop = () => { clearInterval(interval); interval = null; };

    // Only run while in viewport to save CPU
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? start() : stop()));
      }, { threshold: 0.2 });
      io.observe(card);
    } else {
      start();
    }
  }

  // ───────────────────────────────────────────────
  // 4. COMPOSE · menu-bar token builder (toggle + drag)
  // ───────────────────────────────────────────────
  function mountCompose() {
    const list = document.querySelector("[data-token-list]");
    const preview = document.querySelector("[data-mbar-preview]");
    const resetBtn = document.querySelector("[data-token-reset]");
    const presetBtns = document.querySelectorAll(".preset-btn");
    if (!list || !preview) return;

    const defaults = ["icon", "next", "countdown"];

    function render() {
      preview.innerHTML = "";
      const active = Array.from(list.querySelectorAll(".token-chip.is-active"));
      active.forEach((chip, i) => {
        const span = document.createElement("span");
        span.className = "mbar-token";
        span.textContent = chip.getAttribute("data-render") || "";
        preview.appendChild(span);
        if (i < active.length - 1) {
          const sep = document.createElement("span");
          sep.className = "mbar-token-sep";
          sep.textContent = "·";
          preview.appendChild(sep);
        }
      });
    }

    // Toggle
    list.addEventListener("click", (e) => {
      const chip = e.target.closest(".token-chip");
      if (!chip) return;
      // If user clicks the grip, don't toggle (drag intent)
      if (e.target.closest(".token-grip")) return;
      chip.classList.toggle("is-active");
      render();
    });

    // Drag to reorder
    let dragged = null;
    list.addEventListener("dragstart", (e) => {
      const chip = e.target.closest(".token-chip");
      if (!chip) return;
      dragged = chip;
      chip.classList.add("is-dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", chip.getAttribute("data-token")); } catch (_) {}
    });
    list.addEventListener("dragend", () => {
      if (dragged) dragged.classList.remove("is-dragging");
      list.querySelectorAll(".token-chip.is-over").forEach((c) => c.classList.remove("is-over"));
      dragged = null;
    });
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      const over = e.target.closest(".token-chip");
      if (!over || over === dragged) return;
      list.querySelectorAll(".token-chip.is-over").forEach((c) => c.classList.remove("is-over"));
      over.classList.add("is-over");
    });
    list.addEventListener("drop", (e) => {
      e.preventDefault();
      const over = e.target.closest(".token-chip");
      if (!over || !dragged || over === dragged) return;
      const rect = over.getBoundingClientRect();
      const after = (e.clientY - rect.top) / rect.height > 0.5;
      if (after) over.after(dragged); else over.before(dragged);
      over.classList.remove("is-over");
      render();
    });

    // Reset
    function applyActive(tokens) {
      list.querySelectorAll(".token-chip").forEach((chip) => {
        const on = tokens.includes(chip.getAttribute("data-token"));
        chip.classList.toggle("is-active", on);
      });
      render();
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => applyActive(defaults));
    }

    // Presets
    const presets = {
      minimal: ["icon", "next"],
      default: ["icon", "next", "countdown"],
      global:  ["icon", "time", "tz"],
      power:   ["icon", "next", "countdown", "week", "dayprog", "focus"],
    };
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const p = btn.getAttribute("data-preset");
        if (presets[p]) applyActive(presets[p]);
      });
    });

    render();
  }

  // ───────────────────────────────────────────────
  // Mount all when ready
  // ───────────────────────────────────────────────
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(() => {
    mountAlertDemo();
    mountQbarDemo();
    mountMicDemo();
    mountCompose();
  });
})();
