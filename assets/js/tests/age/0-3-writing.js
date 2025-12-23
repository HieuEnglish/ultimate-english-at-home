/* assets/js/tests/age/0-3-writing.js
   Runner: Ages 0–3 • Writing (pre-writing / mark-making)

   Loads the question bank (assets/data/tests-0-3-writing.js) and runs a simple,
   caregiver-led, one-prompt-at-a-time activity.

   Features:
   - Random order every run
   - Optional drawing pad (canvas) for touch/mouse scribbling
   - Caregiver marks each prompt as Done or Skip
   - Saves per-task status + optional notes (non-scored)

   No build step: runs directly in the browser.
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-writing";
  const BANK_SRC = "assets/data/tests-0-3-writing.js";

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") {
    console.warn("[UEAH] tests store not found; runner not registered:", SLUG);
    return;
  }

  // -----------------------------
  // Small helpers
  // -----------------------------

  function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  function safeText(v) {
    return String(v == null ? "" : v)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function clamp(n, a, b) {
    const x = Number(n);
    if (!Number.isFinite(x)) return a;
    return Math.min(b, Math.max(a, x));
  }

  // -----------------------------
  // Bank loader (no build step)
  // -----------------------------

  let bankPromise = null;

  function ensureBankLoaded(ctx) {
    if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
      return Promise.resolve(true);
    }
    if (bankPromise) return bankPromise;

    const src = ctx && typeof ctx.assetHref === "function" ? ctx.assetHref(BANK_SRC) : BANK_SRC;

    bankPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-ueah-test-bank="${SLUG}"]`);
      if (existing) {
        if (window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])) {
          resolve(true);
          return;
        }
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener(
          "error",
          () => reject(new Error("Failed to load question bank.")),
          { once: true }
        );
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.setAttribute("data-ueah-test-bank", SLUG);
      s.onload = () => resolve(true);
      s.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.head.appendChild(s);
    });

    return bankPromise;
  }

  // -----------------------------
  // UI render helpers
  // -----------------------------

  function renderIntro() {
    return `
      <div class="detail-card" role="region" aria-label="Writing test">
        <div style="display:flex; gap:12px; align-items:flex-start">
          <div class="card-icon" aria-hidden="true" style="width:44px; height:44px">✍️</div>
          <div>
            <h2 style="margin:0; font-size:18px">Ages 0–3 • Pre-writing practice</h2>
            <p style="margin:10px 0 0; color: var(--muted)">
              This is a caregiver-led activity. Your child will try simple mark-making tasks.
              There is no auto-scoring—mark each task as <b>Done</b> or <b>Skip</b>.
            </p>
            <ul style="margin:12px 0 0; padding-left:18px; color: var(--muted)">
              <li>Best tools: crayons / thick markers</li>
              <li>Keep it short: 2–5 minutes</li>
              <li>Celebrate effort, not perfection</li>
            </ul>
          </div>
        </div>

        <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
          <button class="btn btn--primary" type="button" data-action="start">Start</button>
        </div>
      </div>
    `;
  }

  function renderLoading() {
    return `
      <div class="detail-card" role="status" aria-live="polite">
        <div style="font-weight:900">Loading…</div>
        <p style="margin:10px 0 0; color: var(--muted)">Preparing the activities.</p>
      </div>
    `;
  }

  function renderError(msg) {
    return `
      <div class="detail-card" role="alert">
        <div style="font-weight:900">Something went wrong</div>
        <p style="margin:10px 0 0; color: var(--muted)">${safeText(msg || "Unable to start.")}</p>
        <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
          <button class="btn" type="button" data-action="retry">Try again</button>
        </div>
      </div>
    `;
  }

  function renderPromptScreen(state) {
    const q = state.questions[state.index];
    const total = state.questions.length;
    const n = state.index + 1;

    const prompt = safeText(q && q.question ? q.question : "Try this");
    const model = safeText(q && q.model ? q.model : "");
    const diff = safeText(q && q.difficulty ? q.difficulty : "");

    const diffBadge = diff
      ? `<span style="display:inline-block; padding:4px 10px; border-radius:999px; border:1px solid var(--border); color: var(--muted); font-weight:800; font-size:12px">${diff}</span>`
      : "";

    const id = q && q.id ? q.id : "";
    const savedNote = id ? state.notes[id] || "" : "";

    return `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap">
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
          <div style="font-weight:900; color: var(--muted)">Task ${n} of ${total}</div>
          ${diffBadge}
        </div>
        <button class="btn" type="button" data-action="restart" aria-label="Restart the test">Restart</button>
      </div>

      <div style="margin-top:12px">
        <div style="border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="display:flex; gap:12px; align-items:flex-start">
            <div aria-hidden="true" style="font-size:28px; line-height:1">🖍️</div>
            <div style="min-width:0">
              <div style="font-weight:900; font-size:18px">${prompt}</div>
              ${
                model
                  ? `<div style="margin-top:10px; font-size:24px; letter-spacing:1px" aria-label="Example">${model}</div>`
                  : ""
              }
              <p style="margin:10px 0 0; color: var(--muted); font-size:13px">
                Tip: ${safeText((q && q.explanation) || "Keep it playful and short.")}
              </p>
            </div>
          </div>

          <div style="margin-top:14px">
            <div style="font-weight:800; color: var(--muted); margin-bottom:8px">Drawing pad (optional)</div>
            <div style="border:1px dashed var(--border); border-radius:16px; padding:10px; background: var(--surface)">
              <canvas
                data-canvas="pad"
                style="display:block; width:100%; height:220px; border-radius:12px; touch-action:none; background:rgba(255,255,255,0.02)"
                aria-label="Drawing pad"
              ></canvas>

              <div class="actions" style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap">
                <button class="btn" type="button" data-action="clear">Clear</button>
              </div>
            </div>
          </div>

          <div style="margin-top:14px">
            <label style="display:block; font-weight:800; color: var(--muted)">Caregiver note (optional)</label>
            <input
              type="text"
              data-note-input
              value="${safeText(savedNote)}"
              maxlength="120"
              placeholder="e.g., traced a circle / used left hand"
              style="width:100%; margin-top:8px; padding:12px 12px; border:1px solid var(--border); border-radius:14px; background: var(--surface)"
            />
          </div>

          <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn btn--primary" type="button" data-action="done" aria-label="Mark this task done">✅ Done</button>
            <button class="btn" type="button" data-action="skip" aria-label="Skip this task">⏭️ Skip</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSummary(state) {
    const total = state.questions.length;
    const done = state.doneCount;
    const skipped = total - done;

    const rows = state.questions
      .map((q, i) => {
        const id = q && q.id ? q.id : "";
        const status = id ? state.results[id] || "skip" : "skip";
        const icon = status === "done" ? "✅" : "⏭️";
        const note = id && state.notes[id] ? String(state.notes[id]) : "";
        return `
          <li style="display:flex; gap:10px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--border)">
            <span aria-hidden="true">${icon}</span>
            <span style="min-width:0">
              <b>Task ${i + 1}:</b> ${safeText((q && q.question) || "")}
              ${note.trim() ? `<div style="margin-top:6px; color: var(--muted)">Note: ${safeText(note)}</div>` : ""}
            </span>
          </li>
        `;
      })
      .join("");

    return `
      <div class="detail-card" role="region" aria-label="Results summary">
        <h3 style="margin:0; font-size:18px">Finished</h3>
        <p style="margin:10px 0 0; color: var(--muted)">
          Done: <b>${done}</b> / ${total} • Skipped: <b>${skipped}</b>
        </p>

        <div style="margin-top:12px; border:1px solid var(--border); border-radius:16px; padding:14px; background: var(--surface2)">
          <div style="font-weight:900; margin-bottom:8px">What to do next</div>
          <ul style="margin:0; padding-left:18px; color: var(--muted)">
            <li>Repeat 2–3 easy tasks daily (1–3 minutes).</li>
            <li>Use thick crayons first; move to thinner tools later.</li>
            <li>Try tracing lines and circles before letters.</li>
          </ul>
        </div>

        <details style="margin-top:12px">
          <summary style="cursor:pointer; font-weight:900">Show task list</summary>
          <ul style="list-style:none; padding-left:0; margin:12px 0 0">
            ${rows}
          </ul>
        </details>

        <div class="actions" style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
          <button class="btn btn--primary" type="button" data-action="restart">Restart</button>
        </div>
      </div>
    `;
  }

  // -----------------------------
  // Canvas helpers
  // -----------------------------

  function initCanvas(stageEl, opts) {
    const canvas = stageEl.querySelector('canvas[data-canvas="pad"]');
    if (!canvas) return { canvas: null, ctx: null, destroy: null, clear: null };

    const stroke = (opts && opts.stroke) || "#111";
    const lineWidth = clamp(opts && opts.lineWidth, 3, 12);

    const ctx = canvas.getContext("2d");
    if (!ctx) return { canvas: null, ctx: null, destroy: null, clear: null };

    // Fit internal pixels to CSS size for crisp drawing
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(240, Math.floor(rect.width));
    const h = Math.max(180, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = stroke;
    ctx.clearRect(0, 0, w, h);

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const toLocal = (ev) => {
      const r = canvas.getBoundingClientRect();
      return { x: ev.clientX - r.left, y: ev.clientY - r.top };
    };

    const onDown = (ev) => {
      drawing = true;
      const p = toLocal(ev);
      lastX = p.x;
      lastY = p.y;
      try {
        canvas.setPointerCapture(ev.pointerId);
      } catch (_) {}
    };

    const onMove = (ev) => {
      if (!drawing) return;
      const p = toLocal(ev);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastX = p.x;
      lastY = p.y;
    };

    const onUp = (ev) => {
      drawing = false;
      try {
        canvas.releasePointerCapture(ev.pointerId);
      } catch (_) {}
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const clear = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, Math.floor(r.width), Math.floor(r.height));
    };

    const destroy = () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onUp);
    };

    return { canvas, ctx, destroy, clear };
  }

  // -----------------------------
  // Runner registration
  // -----------------------------

  store.registerRunner(SLUG, {
    render() {
      return `
        <div data-ueah-test="${SLUG}">
          <div data-stage>
            ${renderIntro()}
          </div>
        </div>
      `;
    },

    afterRender(rootEl, ctx) {
      if (!rootEl) return;
      const host = rootEl.querySelector(`[data-ueah-test="${SLUG}"]`);
      if (!host) return;
      if (host.__ueahInited) return;
      host.__ueahInited = true;

      const stage = host.querySelector("[data-stage]");
      if (!stage) return;

      const state = {
        status: "intro", // intro | loading | prompt | summary | error
        questions: [],
        index: 0,
        doneCount: 0,
        results: Object.create(null), // q.id -> "done" | "skip"
        notes: Object.create(null), // q.id -> string
        lastError: ""
      };

      let canvasApi = { destroy: null, clear: null };

      function teardownCanvas() {
        if (canvasApi && typeof canvasApi.destroy === "function") canvasApi.destroy();
        canvasApi = { destroy: null, clear: null };
      }

      function paint() {
        teardownCanvas();

        if (state.status === "intro") stage.innerHTML = renderIntro();
        else if (state.status === "loading") stage.innerHTML = renderLoading();
        else if (state.status === "prompt") stage.innerHTML = renderPromptScreen(state);
        else if (state.status === "summary") stage.innerHTML = renderSummary(state);
        else if (state.status === "error") stage.innerHTML = renderError(state.lastError);
        else stage.innerHTML = renderIntro();

        if (state.status === "prompt") {
          requestAnimationFrame(() => {
            canvasApi = initCanvas(stage, { stroke: "#111", lineWidth: 6 });
          });
        }
      }

      function currentQuestion() {
        return state.questions && state.questions.length ? state.questions[state.index] : null;
      }

      function currentQuestionId() {
        const q = currentQuestion();
        return q && q.id ? q.id : "";
      }

      function saveNoteFromUI() {
        const id = currentQuestionId();
        if (!id) return;
        const input = stage.querySelector("[data-note-input]");
        if (!input) return;
        const val = String(input.value || "").trim();
        if (val) state.notes[id] = val;
        else delete state.notes[id];
      }

      async function start() {
        state.status = "loading";
        state.lastError = "";
        paint();

        try {
          await ensureBankLoaded(ctx);

          const bank =
            window.UEAH_TEST_BANKS && Array.isArray(window.UEAH_TEST_BANKS[SLUG])
              ? window.UEAH_TEST_BANKS[SLUG]
              : [];

          if (!bank.length) throw new Error("Missing question bank.");

          const prepared = bank.map((q) => (isPlainObject(q) ? { ...q } : q));
          shuffleInPlace(prepared);

          state.questions = prepared;
          state.index = 0;
          state.doneCount = 0;
          state.results = Object.create(null);
          state.notes = Object.create(null);

          state.status = "prompt";
          paint();
        } catch (err) {
          state.lastError = err && err.message ? err.message : "Unable to start.";
          state.status = "error";
          paint();
        }
      }

      function restart() {
        state.status = "intro";
        state.questions = [];
        state.index = 0;
        state.doneCount = 0;
        state.results = Object.create(null);
        state.notes = Object.create(null);
        state.lastError = "";
        paint();
      }

      function advanceWithStatus(status) {
        const q = currentQuestion();
        if (q && q.id) {
          saveNoteFromUI();
          state.results[q.id] = status;
          if (status === "done") state.doneCount += 1;
        }

        if (state.index + 1 >= state.questions.length) {
          state.status = "summary";
          paint();
          return;
        }

        state.index += 1;
        state.status = "prompt";
        paint();
      }

      host.addEventListener("click", (ev) => {
        const btn = ev.target && ev.target.closest ? ev.target.closest("[data-action]") : null;
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        if (!action) return;

        if (action === "start") {
          ev.preventDefault();
          start();
        } else if (action === "restart") {
          ev.preventDefault();
          restart();
        } else if (action === "retry") {
          ev.preventDefault();
          start();
        } else if (action === "done") {
          ev.preventDefault();
          advanceWithStatus("done");
        } else if (action === "skip") {
          ev.preventDefault();
          advanceWithStatus("skip");
        } else if (action === "clear") {
          ev.preventDefault();
          if (canvasApi && typeof canvasApi.clear === "function") canvasApi.clear();
        }
      });

      window.addEventListener(
        "popstate",
        () => teardownCanvas(),
        { passive: true }
      );

      paint();
    }
  });
})();
