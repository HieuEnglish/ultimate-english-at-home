/* assets/js/safe-html.js
   Shared HTML-escaping helpers for classic (non-module) game scripts.
   Loaded via <script defer> BEFORE all stores/games so window.UEAH_SAFE exists.
   Mirrors escapeHtml/escapeAttr in assets/js/common.js (ES module) for classic contexts.
*/
(function () {
  "use strict";

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/\n/g, " ");
  }

  // Sanitize a value interpolated into a CSS class name: allow a-z0-9-_ only.
  function safeClassToken(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 32) || "info";
  }

  // Sanitize a value interpolated into a style var / color: allow hex, rgb(), named colors subset.
  function safeCssToken(s) {
    var v = String(s == null ? "" : s).trim().slice(0, 64);
    if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v;
    if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(v)) return v;
    return "inherit";
  }

  window.UEAH_SAFE = window.UEAH_SAFE || {
    escapeHtml: escapeHtml,
    escapeAttr: escapeAttr,
    safeClassToken: safeClassToken,
    safeCssToken: safeCssToken
  };
})();
