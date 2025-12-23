/* assets/js/views/games.js
   Games placeholder view for Ultimate English At Home.
*/

import { breadcrumbs } from '../common.js';

export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Games — UEAH';
  const description = 'Play simple English learning games.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Games' },
  ]);

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Games</h1>
      <p class="page-subtitle">This page is a placeholder for now.</p>
      <div class="note">
        <strong>Coming soon:</strong> interactive games by age group and skill.
      </div>
      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
      </div>
    </section>
  `;

  return { title, description, html };
}
