/* assets/js/views/favourites.js
   Favourites placeholder view for Ultimate English At Home.
*/

import { breadcrumbs } from '../common.js';

export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'Favourites — UEAH';
  const description = 'Save your favourite resources and games.';

  const breadcrumb = breadcrumbs([
    { label: 'Home', href: hrefFor('/') },
    { label: 'Favourites' },
  ]);

  const html = `
    <section class="page-top">
      ${breadcrumb}
      <h1 class="page-title">Favourites</h1>
      <p class="page-subtitle">This page is a placeholder for now.</p>
      <div class="note">
        <strong>Coming soon:</strong> save resources you like and come back to them later.
      </div>
      <div class="actions">
        <a class="btn btn--primary" href="${hrefFor('/') }" data-nav>Home</a>
        <a class="btn" href="${hrefFor('/resources')}" data-nav>Resources</a>
      </div>
    </section>
  `;

  return { title, description, html };
}
