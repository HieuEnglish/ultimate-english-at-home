/* assets/js/views/home.js
   Home page view for Ultimate English At Home.
   Exports a getView(ctx) function that returns an object
   with a title, description, and html string. This view has no afterRender hook.
*/

import {
  card,
  iconLeaf,
  iconGamepad,
  iconClipboard,
  iconUser,
  iconHeart,
  iconMail,
} from '../common.js';

/**
 * Returns the home page view. The context provides a hrefFor() helper
 * that prefixes paths with the basePath so links work correctly on
 * GitHub Pages.
 *
 * @param {Object} ctx - context containing helpers
 * @param {Function} ctx.hrefFor - function to convert app paths to hrefs
 */
export function getView(ctx) {
  const { hrefFor } = ctx;
  const title = 'UEAH — Ultimate English At Home';
  const description =
    'A clean, pastel, responsive English learning hub. Browse resources by age group and skill.';

  const html = `
    <section class="hero">
      <p class="eyebrow">Ultimate English At Home</p>
      <h1 class="hero-title">learning paths — by age and skill</h1>
      <p class="hero-subtitle">
        Resources and tests follow age-specific, IELTS-inspired standards — matched to the expected skill level for each age group.
      </p>
      <div class="card-grid" role="list">
        ${card({
          href: hrefFor('/resources'),
          title: 'Resources',
          text: 'Improve a skill',
          icon: iconLeaf(),
          primary: true,
          ctaText: '',
          glow: 'green',
        })}
        ${card({
          href: hrefFor('/games'),
          title: 'Games',
          text: 'Learn with fun',
          icon: iconGamepad(),
          ctaText: '',
          glow: 'yellow',
        })}
        ${card({
          href: hrefFor('/tests'),
          title: 'Tests',
          text: 'Test your skills',
          icon: iconClipboard(),
          ctaText: '',
          glow: 'blue',
        })}
        ${card({
          href: hrefFor('/profile'),
          title: 'Profile',
          text: 'Save your IELTS info',
          icon: iconUser(),
          ctaText: '',
          glow: 'orange',
        })}
        ${card({
          href: hrefFor('/favourites'),
          title: 'Favourites',
          text: 'Save your favourites',
          icon: iconHeart(),
          ctaText: '',
          glow: 'pink',
        })}
        ${card({
          href: hrefFor('/contact'),
          title: 'Contact',
          text: 'Send a message',
          icon: iconMail(),
          ctaText: '',
          glow: 'purple',
        })}
      </div>

      <p class="hero-subtitle home-made-with">
        Made with❤️ for learners, families, and teachers who want FREE English practice at home 🏡📚✨
      </p>
    </section>
  `;
  return { title, description, html };
}
