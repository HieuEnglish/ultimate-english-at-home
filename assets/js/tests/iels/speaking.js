(function () {
  "use strict";
  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.registerRunner !== "function") return;

  store.registerRunner("iels-speaking", {
    render(ctx) {
      return `
        <div class="note">
          <strong>IELS Speaking</strong>
          <p style="margin:8px 0 0">Coming soon: interactive speaking test.</p>
        </div>
        <div class="actions" style="margin-top:12px">
          <span class="btn btn--primary btn--disabled" aria-disabled="true">Start Test (Coming soon)</span>
        </div>
      `;
    }
  });
})();
