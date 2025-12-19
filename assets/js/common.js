/* assets/js/common.js
   Shared UI helper functions for the UEAH app.
   Exported as an ES module (no build step required).
*/

// -----------------------------
// String + escaping helpers
// -----------------------------

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function escapeAttr(s) {
  return escapeHtml(String(s)).replaceAll("\n", " ");
}

// -----------------------------
// UI helpers
// -----------------------------

export function breadcrumbs(items) {
  const li = (items || [])
    .map((it) => {
      if (it && it.href) return `<li><a href="${it.href}" data-nav>${escapeHtml(it.label)}</a></li>`;
      return `<li aria-current="page">${escapeHtml(it && it.label)}</li>`;
    })
    .join("");
  return `<nav aria-label="Breadcrumb"><ol class="breadcrumbs">${li}</ol></nav>`;
}

export function card({ href, title, text, icon, primary, ctaText = "Open →", glow = "" }) {
  const cls = primary ? "card card--primary" : "card";
  const glowAttr = glow ? ` data-glow="${escapeHtml(glow)}"` : "";
  const ctaHtml = ctaText ? `<span class="card-cta" aria-hidden="true">${escapeHtml(ctaText)}</span>` : "";

  return `
      <a class="${cls}" href="${href}" data-nav role="listitem"${glowAttr}>
        <div class="card-icon" aria-hidden="true">${icon}</div>
        <div class="card-body">
          <h2 class="card-title">${escapeHtml(title)}</h2>
          <p class="card-text">${escapeHtml(text)}</p>
        </div>
        ${ctaHtml}
      </a>
    `;
}

export function renderChips(resource, showAll) {
  const chips = [];

  if (resource && resource.format) chips.push({ label: "Format", value: resource.format });
  if (resource && resource.level) chips.push({ label: "Level", value: resource.level });
  if (resource && resource.time) chips.push({ label: "Time", value: resource.time });
  if (resource && resource.focus) chips.push({ label: "Focus", value: resource.focus });

  if (!chips.length && !showAll) return "";

  if (!chips.length && showAll) {
    return `<div class="chips" aria-label="Metadata"><span class="chip">Not specified</span></div>`;
  }

  const html = chips
    .map((c) => `<span class="chip">${escapeHtml(c.label)}: ${escapeHtml(c.value)}</span>`)
    .join("");
  return `<div class="chips" aria-label="Metadata">${html}</div>`;
}

// -----------------------------
// Icons
// -----------------------------

export function iconAge(age) {
  if (age === "0-3") return iconBabyBottle();
  if (age === "4-7") return iconTeddy();
  if (age === "8-10") return iconPencil();
  if (age === "11-12") return iconHeadphones();
  return iconGradCap();
}

export function iconUser() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 12.2a4.4 4.4 0 1 0-4.4-4.4 4.4 4.4 0 0 0 4.4 4.4Z" fill="currentColor" opacity=".18"></path>
        <path d="M12 11a3.2 3.2 0 1 0-3.2-3.2A3.2 3.2 0 0 0 12 11Z" fill="currentColor"></path>
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"></path>
      </svg>
    `;
}

export function iconMail() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9A1.5 1.5 0 0 1 5.5 6Z" fill="currentColor" opacity=".18"></path>
        <path d="M5.8 7.8 12 12.2l6.2-4.4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M6.2 16.2h11.6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"></path>
      </svg>
    `;
}

export function iconLeaf() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 2c4.6 2.3 7.7 6.2 8 10.5.3 4.4-2.8 8.3-7.2 9.2-2.4.5-4.8.1-6.7-1.1-1.9-1.2-3.2-3.1-3.7-5.2C1.4 11.1 4.5 6 12 2Z" fill="currentColor" opacity=".18"></path>
        <path d="M12 5c3.7 2 6.2 5 6.3 8.1.2 3.3-2.2 6.3-5.6 7-1.8.4-3.7.1-5.2-.9-1.5-.9-2.5-2.4-2.9-4C3.9 11.7 6.3 8.1 12 5Z" fill="currentColor"></path>
        <path d="M12 7v14" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".75"></path>
        <path d="M12 13c1.2-1.1 2.5-2 4-2.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"></path>
        <path d="M12 16c-1.1-.9-2.3-1.6-3.6-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"></path>
      </svg>
    `;
}

export function iconBabyBottle() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M10 2h4v2h-4V2Z" fill="currentColor" opacity=".25"></path>
        <path d="M9 4h6v2H9V4Z" fill="currentColor" opacity=".18"></path>
        <path d="M9 6h6v2.2l-.9.9V19a3 3 0 0 1-6 0V9.1l-.9-.9V6Z" fill="currentColor" opacity=".20"></path>
        <path d="M10 9h4v10a2 2 0 0 1-4 0V9Z" fill="currentColor"></path>
        <path d="M11 12h2v1h-2v-1Zm0 3h2v1h-2v-1Z" fill="currentColor" opacity=".55"></path>
      </svg>
    `;
}

export function iconTeddy() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <circle cx="8" cy="8" r="2" fill="currentColor" opacity=".25"></circle>
        <circle cx="16" cy="8" r="2" fill="currentColor" opacity=".25"></circle>
        <circle cx="12" cy="9.5" r="4.5" fill="currentColor" opacity=".18"></circle>
        <path d="M7.5 20a4.5 4.5 0 0 1 9 0v1H7.5v-1Z" fill="currentColor" opacity=".18"></path>
        <path d="M9.2 13.2a2.8 2.8 0 0 0 5.6 0" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".9"></path>
        <circle cx="10.4" cy="9.6" r=".7" fill="currentColor"></circle>
        <circle cx="13.6" cy="9.6" r=".7" fill="currentColor"></circle>
        <path d="M11.2 11.2h1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path>
      </svg>
    `;
}

export function iconPencil() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M15.7 3.9a2 2 0 0 1 2.8 0l1.6 1.6a2 2 0 0 1 0 2.8L10 18.4 5 19l.6-5 10.1-10.1Z" fill="currentColor" opacity=".18"></path>
        <path d="M7.2 16.8 16.9 7.1l2 2-9.7 9.7-2.6.3.6-2.3Z" fill="currentColor"></path>
        <path d="M15.5 5.3 18.7 8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".85"></path>
      </svg>
    `;
}

export function iconHeadphones() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-7h3v-1Z" fill="currentColor" opacity=".18"></path>
        <path d="M4 12v1h3v7H6a2 2 0 0 1-2-2v-6Z" fill="currentColor" opacity=".18"></path>
        <path d="M7 12h2v8H7a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z" fill="currentColor"></path>
        <path d="M15 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v-8Z" fill="currentColor"></path>
        <path d="M6 12a6 6 0 0 1 12 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" opacity=".85"></path>
      </svg>
    `;
}

export function iconGradCap() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" fill="currentColor" opacity=".18"></path>
        <path d="M6.5 12v4.2c0 .8 2.6 2.8 5.5 2.8s5.5-2 5.5-2.8V12l-5.5 2.9L6.5 12Z" fill="currentColor"></path>
        <path d="M21.5 9v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".85"></path>
        <path d="M21.5 15c-1.2.6-2.3 1-3.5 1.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".65"></path>
      </svg>
    `;
}

export function iconBook() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M4 5.5C4 4.67 4.67 4 5.5 4H19a1 1 0 0 1 1 1v13.5a1.5 1.5 0 0 1-1.5 1.5H6.25A2.25 2.25 0 0 0 4 22V5.5Z" fill="currentColor" opacity=".18"></path>
        <path d="M6.25 20H18.5a.5.5 0 0 0 .5-.5V6H6.5A.5.5 0 0 0 6 6.5V19a1 1 0 0 0 .25 1Z" fill="currentColor"></path>
      </svg>
    `;
}

export function iconHeart() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 21s-7-4.6-9.2-9C1 8.4 3.4 5.5 6.6 5.5c1.7 0 3.1.8 3.9 2 0 0 .8-2 3.5-2 3.2 0 5.6 2.9 3.8 6.5C19 16.4 12 21 12 21Z" fill="currentColor" opacity=".18"></path>
        <path d="M12 19.6c-1.9-1.3-5.5-4.2-6.8-7C3.7 9.4 5.3 7.5 7.3 7.5c1.5 0 2.6 1.1 3.1 2.1h1.1c.5-1 1.6-2.1 3.1-2.1 2 0 3.6 1.9 2.1 5.1-1.3 2.8-4.9 5.7-6.8 7Z" fill="currentColor"></path>
      </svg>
    `;
}

export function iconGamepad() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M7 9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a3 3 0 0 1-3 3h-1l-1.2-1.2a1 1 0 0 0-.7-.3h-1.2a1 1 0 0 0-.7.3L9 18H8a3 3 0 0 1-3-3V9Z" fill="currentColor" opacity=".18"></path>
        <path d="M10 11H8v2h2v2h2v-2h2v-2h-2V9h-2v2Z" fill="currentColor"></path>
        <path d="M16.5 11.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" fill="currentColor"></path>
        <path d="M17.75 13a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" fill="currentColor"></path>
      </svg>
    `;
}

export function iconClipboard() {
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M7 4h7l3 3v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" fill="currentColor" opacity=".18"></path>
        <path d="M14 4v3a1 1 0 0 0 1 1h3" fill="currentColor"></path>
        <path d="M8.5 11.5h7v1.5h-7v-1.5Zm0 3h7V16h-7v-1.5Z" fill="currentColor"></path>
      </svg>
    `;
}

export function iconSkill(skill) {
  if (skill === "reading") return iconBook();
  if (skill === "listening")
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0-6 6v4a4 4 0 0 0 8 0V9a2 2 0 0 0-4 0v4a1 1 0 0 0 2 0V9h2v4a3 3 0 0 1-6 0V9a4 4 0 0 1 8 0v5a5 5 0 0 1-10 0V9H4v5a7 7 0 0 0 14 0V9a6 6 0 0 0-6-6Z" fill="currentColor"></path>
      </svg>
    `;
  if (skill === "writing")
    return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-3L16.5 4.5a2 2 0 0 0-3 0L3 15v5Z" fill="currentColor" opacity=".18"></path>
        <path d="M14.5 6.5 17.5 9.5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
        <path d="M6 18h2l9-9-2-2-9 9v2Z" fill="currentColor"></path>
      </svg>
    `;
  return `
      <svg viewBox="0 0 24 24" width="24" height="24" focusable="false" aria-hidden="true">
        <path d="M12 3a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V7a4 4 0 0 0-4-4Z" fill="currentColor" opacity=".18"></path>
        <path d="M7 12a5 5 0 0 0 10 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
        <path d="M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
        <path d="M9 20h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"></path>
      </svg>
    `;
}
