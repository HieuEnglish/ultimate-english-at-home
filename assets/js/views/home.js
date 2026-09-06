/* assets/js/views/home.js
   Landing-style home page for Ultimate English At Home.
*/

export function getView(ctx) {
  const { hrefFor } = ctx;
  let continuePath = '';
  try {
    const saved = localStorage.getItem('UEAH_LAST_LEARNING_PATH_V1') || '';
    if (/^\/(resources|games|tests)\//.test(saved)) continuePath = saved;
  } catch (_) {}

  // Live counts so the homepage reflects the real catalogue, not constants.
  let gamesCount = 0;
  let testsCount = 0;
  let favCount = 0;
  try {
    const games = window.UEAH_GAMES_STORE;
    if (games && typeof games.getAllGames === 'function') {
      const list = games.getAllGames();
      if (Array.isArray(list)) gamesCount = list.length;
    }
  } catch (_) {}
  try {
    const tests = window.UEAH_TESTS_STORE;
    if (tests && typeof tests.getAll === 'function') {
      const list = tests.getAll();
      if (Array.isArray(list)) testsCount = list.length;
    }
  } catch (_) {}
  try {
    if (typeof ctx.favouritesGetAll === 'function') {
      const favs = ctx.favouritesGetAll();
      if (Array.isArray(favs)) favCount = favs.length;
    }
  } catch (_) {}

  // Real user progress for the progress card.
  let practicedSkills = 0;
  let certsEarned = 0;
  try {
    const store = window.UEAH_PROFILE_STORE;
    const profile = store && typeof store.getProfile === 'function' ? store.getProfile() : null;
    const buckets = profile && profile.resultsByAge && typeof profile.resultsByAge === 'object' ? profile.resultsByAge : {};
    Object.keys(buckets).forEach((age) => {
      const b = buckets[age] || {};
      ['reading', 'listening', 'writing', 'speaking'].forEach((skill) => {
        if (b[skill] && b[skill].lastScore != null) practicedSkills += 1;
      });
    });
    if (profile && Array.isArray(profile.certificates)) certsEarned = profile.certificates.length;
  } catch (_) {}
  const hasProgress = practicedSkills > 0 || certsEarned > 0 || favCount > 0;
  const pct = (n, max) => Math.max(n > 0 ? 6 : 0, Math.min(100, Math.round((n / max) * 100)));

  const title = 'UEAH - Ultimate English At Home';
  const description =
    'Free English practice for kids, teens, and adults. Age-specific resources, games, and IELTS-inspired tests - all at home, all free.';

  const html = `
    <div class="landing-home">
      <div class="scroll-progress" aria-hidden="true"><span data-scroll-fill></span></div>
      <section class="hero">
        <div class="hero-shell">
          <div class="hero-copy">
            <div class="hero-badge">&#10024; 100% Free &middot; No sign-up required</div>
            <div class="hero-maker">Made by Teacher Zane</div>

            <h1 class="hero-title">
              Learn English<br />
              <span class="grad" data-hero-rotate aria-hidden="true">at any age, at home</span>
              <span class="sr-only">at any age, at home</span>
            </h1>

            <div class="hero-actions">
              <a href="${hrefFor(continuePath || '/resources')}" class="btn-hero btn-hero--primary" data-nav>
                ${continuePath ? 'Continue Learning' : 'Start Learning Free'} &rarr;
              </a>
              <a href="#features" class="btn-hero btn-hero--outline">
                Explore the Platform
              </a>
            </div>

            <p class="hero-note">Works on any device &middot; Save progress locally &middot; Built for families, learners, and teachers</p>

            <div class="hero-pills">
              <div class="hero-pill"><span aria-hidden="true">🧸</span> Ages 0-3</div>
              <div class="hero-pill"><span aria-hidden="true">🎨</span> Ages 4-7</div>
              <div class="hero-pill"><span aria-hidden="true">🚀</span> Ages 8-10</div>
              <div class="hero-pill"><span aria-hidden="true">🧠</span> Ages 11-12</div>
              <div class="hero-pill"><span aria-hidden="true">🎓</span> Ages 13-18</div>
              <div class="hero-pill"><span aria-hidden="true">🎯</span> IELTS Track</div>
              ${favCount > 0 ? `<a class="hero-pill hero-pill--live" href="${hrefFor('/favourites')}" data-nav><span aria-hidden="true">⭐</span> ${favCount} favourite${favCount === 1 ? '' : 's'} saved</a>` : ''}
            </div>
          </div>

          <div class="hero-visual" data-reveal data-hero-visual>
            <div class="hero-visual__halo hero-visual__halo--one"></div>
            <div class="hero-visual__halo hero-visual__halo--two"></div>
            <div class="hero-visual__spark hero-visual__spark--one"></div>
            <div class="hero-visual__spark hero-visual__spark--two"></div>
            <div class="hero-visual__spark hero-visual__spark--three"></div>

            <div class="hero-visual__frame" data-hero-layer="6">
              <div class="hero-visual__card hero-visual__card--lead">
                <div class="hero-visual__eyebrow"><span class="live-dot" aria-hidden="true"></span>Live learning map</div>
                <div class="hero-visual__title">Choose a route. Build momentum.</div>
                <p class="hero-visual__caption">Resources, games, tests, and certificates connected in one practice path.</p>
                <div class="hero-visual__mini-grid">
                  <a class="hero-visual__mini-tile" href="${hrefFor('/resources')}" data-nav>
                    <strong>📚</strong>
                    <span>Resources</span>
                  </a>
                  <a class="hero-visual__mini-tile" href="${hrefFor('/games')}" data-nav>
                    <strong>🎮</strong>
                    <span>Games</span>
                    ${gamesCount > 0 ? `<em class="mini-count">${gamesCount}</em>` : ''}
                  </a>
                  <a class="hero-visual__mini-tile" href="${hrefFor('/tests')}" data-nav>
                    <strong>🧪</strong>
                    <span>Tests</span>
                    ${testsCount > 0 ? `<em class="mini-count">${testsCount}</em>` : ''}
                  </a>
                  <a class="hero-visual__mini-tile" href="${hrefFor('/profile/certificates')}" data-nav>
                    <strong>🏆</strong>
                    <span>Certificates</span>
                    ${certsEarned > 0 ? `<em class="mini-count">${certsEarned}</em>` : ''}
                  </a>
                </div>
              </div>

              <div class="hero-visual__stack">
                <a class="hero-visual__card hero-visual__card--path" href="${hrefFor('/resources')}" data-nav data-hero-layer="10">
                  <div class="hero-visual__card-icon">🧭</div>
                  <div>
                    <div class="hero-visual__card-label">Age path</div>
                    <div class="hero-visual__card-value">6 learner tracks</div>
                  </div>
                </a>

                <a class="hero-visual__card hero-visual__card--score${hasProgress ? ' has-live' : ''}" href="${hrefFor('/profile')}" data-nav data-hero-layer="14">
                  <div class="hero-visual__card-icon">📈</div>
                  <div>
                    <div class="hero-visual__card-label">Progress</div>
                    <div class="hero-visual__card-value">${hasProgress ? `${practicedSkills} skill${practicedSkills === 1 ? '' : 's'} practiced` : 'Skill scores + saved wins'}</div>
                  </div>
                  ${hasProgress ? `
                  <div class="hero-meters">
                    <div class="hero-meter"><span>Skills</span><div class="hero-meter__track"><span class="hero-meter__fill" style="--fill: ${pct(practicedSkills, 24)}%; --fill-c: #38bdf8; transition-delay: 0.30s"></span></div><strong>${practicedSkills}</strong></div>
                    <div class="hero-meter"><span>Awards</span><div class="hero-meter__track"><span class="hero-meter__fill" style="--fill: ${pct(certsEarned, 6)}%; --fill-c: #f472b6; transition-delay: 0.42s"></span></div><strong>${certsEarned}</strong></div>
                    <div class="hero-meter"><span>Saved</span><div class="hero-meter__track"><span class="hero-meter__fill" style="--fill: ${pct(favCount, 10)}%; --fill-c: #fbbf24; transition-delay: 0.54s"></span></div><strong>${favCount}</strong></div>
                  </div>
                  ` : ''}
                </a>
              </div>
            </div>

            <div class="hero-floating hero-floating--certificate">
              <span aria-hidden="true">🏅</span>
              <div>
                <strong>Certificate Ready</strong>
                <small>Printable milestones</small>
              </div>
            </div>

            <div class="hero-floating hero-floating--favourites">
              <span aria-hidden="true">⭐</span>
              <div>
                <strong>Save Favourites</strong>
                <small>Come back fast</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="flow-marquee" aria-hidden="true">
        <div class="flow-marquee__track">
          ${[0, 1].map(() => `<span>100% Free Forever</span><i>✦</i><span>Ages 0–3 to IELTS</span><i>✦</i><span>Reading · Listening · Writing · Speaking</span><i>✦</i><span>${gamesCount > 0 ? gamesCount : 70} Games</span><i>✦</i><span>${testsCount > 0 ? testsCount : 24} Practice Tests</span><i>✦</i><span>No Sign-up</span><i>✦</i><span>Certificates</span><i>✦</i>`).join('')}
        </div>
      </div>

      <section class="stats-strip" data-reveal>
        <div class="stats-inner">
          <div>
            <span class="stat-num" data-count="${gamesCount > 0 ? gamesCount : 70}">0</span>
            <p class="stat-label">Games to Play</p>
          </div>
          <div>
            <span class="stat-num" data-count="${testsCount > 0 ? testsCount : 24}">0</span>
            <p class="stat-label">Practice Tests</p>
          </div>
          <div>
            <span class="stat-num">100%</span>
            <p class="stat-label">Free Forever</p>
          </div>
          <div>
            <span class="stat-num">24/7</span>
            <p class="stat-label">At-Home Practice</p>
          </div>
        </div>
      </section>

      <section class="features" id="features" data-ueah-animate="stagger">
        <div class="flow-orb flow-orb--a" data-flow-speed="0.1" aria-hidden="true"></div>
        <span class="section-label">What You Get</span>
        <h2 class="section-title">Everything you need to<br />build English confidence at home</h2>
        <p class="section-sub">
          A complete learning toolkit with guided resources, interactive games, skills tests,
          profile tracking, favourites, and printable certificates.
        </p>

        <div class="features-grid" data-ueah-animate="stagger" data-ueah-stagger-delay="80">
          <a class="feature-card" data-accent="green" data-reveal href="${hrefFor('/resources')}" data-nav>
            <div class="feature-icon"><span class="feature-icon__emoji">📚</span><span>Resources</span></div>
            <h3 class="feature-title">Curated Resources</h3>
            <p class="feature-desc">Free learning materials grouped by age and skill, from first words through IELTS-style preparation.</p>
          </a>
          <a class="feature-card" data-accent="yellow" data-reveal href="${hrefFor('/games')}" data-nav>
            <div class="feature-icon"><span class="feature-icon__emoji">🎮</span><span>Games</span></div>
            <h3 class="feature-title">Interactive Games</h3>
            <p class="feature-desc">Vocabulary, spelling, grammar, listening, and speaking activities that make practice feel active instead of repetitive.</p>
          </a>
          <a class="feature-card" data-accent="blue" data-reveal href="${hrefFor('/tests')}" data-nav>
            <div class="feature-icon"><span class="feature-icon__emoji">🧪</span><span>Tests</span></div>
            <h3 class="feature-title">IELTS-Inspired Tests</h3>
            <p class="feature-desc">Structured practice tests that help learners build familiarity with real-world English assessment patterns.</p>
          </a>
          <a class="feature-card" data-accent="orange" data-reveal href="${hrefFor('/profile')}" data-nav>
            <div class="feature-icon"><span class="feature-icon__emoji">👤</span><span>Profile</span></div>
            <h3 class="feature-title">Progress Tracking</h3>
            <p class="feature-desc">Store scores locally, review progress by age group, and see where learners are building momentum.</p>
          </a>
          <a class="feature-card" data-accent="pink" data-reveal href="${hrefFor('/favourites')}" data-nav>
            <div class="feature-icon"><span class="feature-icon__emoji">⭐</span><span>Save</span></div>
            <h3 class="feature-title">Favourites</h3>
            <p class="feature-desc">Bookmark resources and return to them fast, without digging back through the full catalogue every session.</p>
          </a>
          <a class="feature-card" data-accent="purple" data-reveal href="${hrefFor('/profile/certificates/all')}" data-nav>
            <div class="feature-icon"><span class="feature-icon__emoji">🏆</span><span>Awards</span></div>
            <h3 class="feature-title">Certificates</h3>
            <p class="feature-desc">Unlock printable certificates as milestones are completed and keep practice outcomes visible and motivating.</p>
          </a>
        </div>
      </section>

      <section class="age-section" id="ages">
        <div class="flow-orb flow-orb--b" data-flow-speed="-0.08" aria-hidden="true"></div>
        <span class="section-label">For Every Learner</span>
        <h2 class="section-title">Learning paths built<br />for each stage</h2>
        <p class="section-sub">
          The platform is organized to match learner development, from playful early exposure to structured academic practice.
        </p>

        <div class="age-paths-grid">
          <a class="age-path-card" href="${hrefFor('/resources/0-3')}" data-nav data-age="0-3" data-reveal>
            <div class="age-path-card__top"><span aria-hidden="true">🧸</span><span>0-3</span></div>
            <div class="age-path-card__range">Ages 0-3</div>
            <div class="age-path-card__title">First sounds, songs, repetition, and playful early English exposure.</div>
            <div class="age-path-card__cta">Explore &rarr;</div>
          </a>

          <a class="age-path-card" href="${hrefFor('/resources/4-7')}" data-nav data-age="4-7" data-reveal>
            <div class="age-path-card__top"><span aria-hidden="true">🎨</span><span>4-7</span></div>
            <div class="age-path-card__range">Ages 4-7</div>
            <div class="age-path-card__title">Phonics, beginner reading, early vocabulary, and simple sentence building.</div>
            <div class="age-path-card__cta">Explore &rarr;</div>
          </a>

          <a class="age-path-card" href="${hrefFor('/resources/8-10')}" data-nav data-age="8-10" data-reveal>
            <div class="age-path-card__top"><span aria-hidden="true">🚀</span><span>8-10</span></div>
            <div class="age-path-card__range">Ages 8-10</div>
            <div class="age-path-card__title">Reading comprehension, listening practice, writing basics, and vocabulary growth.</div>
            <div class="age-path-card__cta">Explore &rarr;</div>
          </a>

          <a class="age-path-card" href="${hrefFor('/resources/11-12')}" data-nav data-age="11-12" data-reveal>
            <div class="age-path-card__top"><span aria-hidden="true">🧠</span><span>11-12</span></div>
            <div class="age-path-card__range">Ages 11-12</div>
            <div class="age-path-card__title">Stronger grammar, richer reading, and more independent structured practice.</div>
            <div class="age-path-card__cta">Explore &rarr;</div>
          </a>

          <a class="age-path-card" href="${hrefFor('/resources/13-18')}" data-nav data-age="13-18" data-reveal>
            <div class="age-path-card__top"><span aria-hidden="true">🎓</span><span>13-18</span></div>
            <div class="age-path-card__range">Ages 13-18</div>
            <div class="age-path-card__title">Advanced communication, academic writing, speaking confidence, and exam-style practice.</div>
            <div class="age-path-card__cta">Explore &rarr;</div>
          </a>

          <a class="age-path-card" href="${hrefFor('/resources/ielts')}" data-nav data-age="ielts" data-reveal>
            <div class="age-path-card__top"><span aria-hidden="true">🎯</span><span>IELTS</span></div>
            <div class="age-path-card__range">IELTS Track</div>
            <div class="age-path-card__title">Dedicated resource packs for reading, listening, writing, and speaking exam preparation.</div>
            <div class="age-path-card__cta">Explore &rarr;</div>
          </a>
        </div>
      </section>

      <section class="how-section" id="how">
        <div class="flow-orb flow-orb--c" data-flow-speed="0.12" aria-hidden="true"></div>
        <span class="section-label">Simple And Fast</span>
        <h2 class="section-title">Get started in seconds</h2>
        <p class="section-sub">No setup maze, no paid wall, no friction. Open the app and start practicing.</p>

        <div class="steps-grid">
          <div class="step" data-reveal>
            <div class="step__num">1</div>
            <h3 class="step__title">Choose a learner track</h3>
            <p class="step__desc">Pick the age group or IELTS path that fits the learner and the right material is immediately surfaced.</p>
          </div>
          <div class="step" data-reveal>
            <div class="step__num">2</div>
            <h3 class="step__title">Pick a skill focus</h3>
            <p class="step__desc">Move into reading, listening, writing, or speaking based on what needs the most attention today.</p>
          </div>
          <div class="step" data-reveal>
            <div class="step__num">3</div>
            <h3 class="step__title">Practice and track</h3>
            <p class="step__desc">Open resources, play games, take tests, and save results into the profile for visible progress over time.</p>
          </div>
        </div>
      </section>

      <section class="skills-section" id="skills">
        <div class="flow-orb flow-orb--a" data-flow-speed="-0.1" aria-hidden="true"></div>
        <span class="section-label">Core Skills</span>
        <h2 class="section-title">All four English skills covered</h2>
        <p class="section-sub">The platform keeps reading, listening, writing, and speaking aligned so practice feels balanced instead of fragmented.</p>

        <div class="skills-grid">
          <a class="skill-pill" data-skill="reading" data-reveal href="${hrefFor('/resources/ielts/reading')}" data-nav>
            <span class="skill-pill__icon" aria-hidden="true">📖</span>
            <div class="skill-pill__name">Reading</div>
            <p class="skill-pill__desc">Comprehension, fluency, inference, and vocabulary in context.</p>
          </a>
          <a class="skill-pill" data-skill="listening" data-reveal href="${hrefFor('/resources/ielts/listening')}" data-nav>
            <span class="skill-pill__icon" aria-hidden="true">🎧</span>
            <div class="skill-pill__name">Listening</div>
            <p class="skill-pill__desc">Audio comprehension, rhythm, attention, and real-world understanding.</p>
          </a>
          <a class="skill-pill" data-skill="writing" data-reveal href="${hrefFor('/resources/ielts/writing')}" data-nav>
            <span class="skill-pill__icon" aria-hidden="true">✍️</span>
            <div class="skill-pill__name">Writing</div>
            <p class="skill-pill__desc">Spelling, grammar, structure, sentence quality, and longer expression.</p>
          </a>
          <a class="skill-pill" data-skill="speaking" data-reveal href="${hrefFor('/resources/ielts/speaking')}" data-nav>
            <span class="skill-pill__icon" aria-hidden="true">🎙️</span>
            <div class="skill-pill__name">Speaking</div>
            <p class="skill-pill__desc">Confidence, pronunciation, clarity, and spoken communication practice.</p>
          </a>
        </div>
      </section>

      <section class="testimonials">
        <div class="flow-orb flow-orb--b" data-flow-speed="0.09" aria-hidden="true"></div>
        <span class="section-label">Built For Real Use</span>
        <h2 class="section-title">Why the app feels useful fast</h2>

        <div class="testimonials-grid">
          <a class="testimonial-card" data-reveal href="${hrefFor('/resources')}" data-nav>
            <div class="testimonial-stars">Age-aware</div>
            <p class="testimonial-text">The material is split by learner stage, so the homepage feels guided instead of overwhelming.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">🧭</div>
              <div>
                <div class="testimonial-name">Age-aware paths</div>
                <div class="testimonial-role">From early learners to exam prep</div>
              </div>
            </div>
          </a>

          <a class="testimonial-card" data-reveal href="${hrefFor('/games')}" data-nav>
            <div class="testimonial-stars">Multi-mode</div>
            <p class="testimonial-text">Games, tests, and resources are tied together, so practice can switch modes without losing momentum.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">⚡</div>
              <div>
                <div class="testimonial-name">Multiple ways to learn</div>
                <div class="testimonial-role">Read, play, test, repeat</div>
              </div>
            </div>
          </a>

          <a class="testimonial-card" data-reveal href="${hrefFor('/profile')}" data-nav>
            <div class="testimonial-stars">Visible wins</div>
            <p class="testimonial-text">Local profile storage, favourites, and certificates make the app feel like a real study environment instead of a loose link dump.</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">🏆</div>
              <div>
                <div class="testimonial-name">Visible progress</div>
                <div class="testimonial-role">Track and revisit meaningful work</div>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section class="cta-section">
        <div class="flow-orb flow-orb--c" data-flow-speed="-0.12" aria-hidden="true"></div>
        <div class="cta-card" data-reveal>
          <h2 class="cta-title">Ready to start learning?</h2>
          <p class="cta-sub">
            Jump into the real app now, browse by learner track, and start practicing without any setup barrier.
          </p>
          <div class="cta-actions">
            <a href="${hrefFor('/resources')}" class="btn-hero btn-hero--primary" data-nav>Open Resources &rarr;</a>
            <a href="${hrefFor('/games')}" class="btn-hero btn-hero--outline" data-nav>Explore Games</a>
          </div>
          <p class="cta-note">Made for learners, families, and teachers who want modern English practice at home.</p>
        </div>
      </section>
    </div>
  `;

  const HERO_PHRASES = [
    'at any age, at home',
    'through play',
    'with confidence',
    'for every level',
  ];

  const afterRender = () => {
    const cleanups = [];
    const on = (target, type, handler, opts) => {
      if (!target) return;
      target.addEventListener(type, handler, opts);
      cleanups.push(() => {
        try {
          target.removeEventListener(type, handler, opts);
        } catch (_) {}
      });
    };

    const anchorLinks = Array.from(document.querySelectorAll('.landing-home a[href^="#"]'));
    anchorLinks.forEach((link) => {
      const handler = (event) => {
        const href = link.getAttribute('href') || '';
        const id = href.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      on(link, 'click', handler);
    });

    const anim = (window.UEAH && window.UEAH.anim) || null;
    const reducedMotion = (anim && anim.REDUCED) ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // Rotating hero phrase (typewriter when motion is allowed).
    const rotateEl = document.querySelector('.landing-home [data-hero-rotate]');
    // Reserve the tallest phrase so rotation never moves the page. Measured
    // at runtime because wrapping depends on viewport width and fonts.
    const reserveHeroSpace = () => {
      if (!rotateEl || reducedMotion) return;
      const prev = rotateEl.textContent;
      let max = 0;
      try {
        HERO_PHRASES.forEach((p) => {
          rotateEl.textContent = p;
          max = Math.max(max, rotateEl.scrollHeight);
        });
      } catch (_) {}
      rotateEl.textContent = prev;
      if (max > 0) rotateEl.style.minHeight = `${Math.ceil(max)}px`;
    };
    if (rotateEl && !reducedMotion) {
      if (document.fonts && typeof document.fonts.ready.then === 'function') {
        document.fonts.ready.then(reserveHeroSpace).catch(() => {});
      } else {
        reserveHeroSpace();
      }
      let resizeTimer = null;
      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(reserveHeroSpace, 200);
      };
      on(window, 'resize', onResize);
      cleanups.push(() => {
        if (resizeTimer) clearTimeout(resizeTimer);
      });
    }
    if (rotateEl && HERO_PHRASES.length > 1 && !reducedMotion) {
      let idx = 0;
      let timer = null;
      const typePhrase = (text, done) => {
        let i = 0;
        rotateEl.textContent = '';
        timer = setInterval(() => {
          i += 1;
          rotateEl.textContent = text.slice(0, i);
          if (i >= text.length) {
            clearInterval(timer);
            timer = null;
            if (done) done();
          }
        }, 45);
      };
      const step = () => {
        idx = (idx + 1) % HERO_PHRASES.length;
        typePhrase(HERO_PHRASES[idx], () => {
          timer = setTimeout(step, 2600);
        });
      };
      timer = setTimeout(step, 2600);
      cleanups.push(() => {
        if (timer) {
          clearInterval(timer);
          clearTimeout(timer);
        }
      });
    }

    // Animated counters when the stats strip scrolls into view.
    const counters = Array.from(document.querySelectorAll('.landing-home [data-count]'));
    if (counters.length && typeof IntersectionObserver === 'function' && !reducedMotion && anim) {
      const seen = new Set();
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          const to = Number(entry.target.getAttribute('data-count')) || 0;
          anim.animateCounter(entry.target, to, 1100);
          counterObserver.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      counters.forEach((el) => counterObserver.observe(el));
      cleanups.push(() => counterObserver.disconnect());
    } else {
      // No motion or no observer: show final values immediately.
      counters.forEach((el) => {
        el.textContent = String(Number(el.getAttribute('data-count')) || 0);
      });
    }

    // Tactile touches: ripple CTAs, tilt cards.
    if (anim && !reducedMotion) {
      try {
        anim.initCardTilt('.landing-home .feature-card, .landing-home .age-path-card');
      } catch (_) {}
      try {
        document.querySelectorAll('.landing-home .btn-hero').forEach((btn) => {
          on(btn, 'click', (e) => anim.addRipple(e));
        });
      } catch (_) {}
    }

    const heroVisual = document.querySelector('.landing-home .hero-visual');

    // Scroll flow: progress bar + scrubbed hero + parallax orbs in one
    // rAF-throttled listener. Transform/opacity only, so no layout shift.
    if (!reducedMotion && typeof requestAnimationFrame === 'function') {
      const heroCopy = document.querySelector('.landing-home .hero-copy');
      const progressFill = document.querySelector('.landing-home [data-scroll-fill]');
      const orbs = Array.from(document.querySelectorAll('.landing-home [data-flow-speed]'));
      let flowTicking = false;
      const clamp01 = (n) => Math.max(0, Math.min(1, n));
      const updateFlow = () => {
        flowTicking = false;
        try {
          const doc = document.documentElement;
          const max = doc.scrollHeight - window.innerHeight;
          const p = max > 0 ? clamp01(window.scrollY / max) : 0;
          if (progressFill) progressFill.style.transform = `scaleX(${p.toFixed(3)})`;

          if (heroVisual) {
            const rect = heroVisual.getBoundingClientRect();
            const out = clamp01(-rect.top / Math.max(1, window.innerHeight));
            heroVisual.style.transform = `translateY(${(out * -36).toFixed(1)}px)`;
            if (heroCopy) {
              heroCopy.style.transform = `translateY(${(out * 60).toFixed(1)}px)`;
              heroCopy.style.opacity = String(1 - out * 0.55);
            }
          }

          const vh = window.innerHeight;
          orbs.forEach((orb) => {
            const speed = Number(orb.getAttribute('data-flow-speed')) || 0.1;
            const r = orb.parentElement.getBoundingClientRect();
            const y = (r.top + r.height / 2 - vh / 2) * -speed;
            orb.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
          });
        } catch (_) {}
      };
      const onFlowScroll = () => {
        if (flowTicking) return;
        flowTicking = true;
        requestAnimationFrame(updateFlow);
      };
      on(window, 'scroll', onFlowScroll, { passive: true });
      updateFlow();
    }

      // Staged bar growth once the visual is on screen.
      if (heroVisual && typeof IntersectionObserver === 'function') {
        const liveObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            heroVisual.classList.add('is-live');
            liveObserver.disconnect();
          });
        }, { threshold: 0.25 });
        liveObserver.observe(heroVisual);
        cleanups.push(() => liveObserver.disconnect());
      } else if (heroVisual) {
        heroVisual.classList.add('is-live');
      }

      // Spotlight tour: cycle a glow across the mini-tiles (pauses on hover).
      const tiles = Array.from(
        heroVisual.querySelectorAll('.hero-visual__mini-tile')
      );
      if (heroVisual && tiles.length > 1) {
        let spot = -1;
        let spotTimer = null;
        let hovering = false;
        const paintSpot = () => {
          tiles.forEach((t, i) => t.classList.toggle('is-spotlight', i === spot));
        };
        const stepSpot = () => {
          if (!hovering) {
            spot = (spot + 1) % tiles.length;
            paintSpot();
          }
          spotTimer = setTimeout(stepSpot, 2200);
        };
        const onEnter = () => {
          hovering = true;
          spot = -1;
          paintSpot();
        };
        const onLeaveTiles = () => {
          hovering = false;
        };
        if (!reducedMotion) {
          spotTimer = setTimeout(stepSpot, 1800);
        }
        on(heroVisual, 'pointerenter', onEnter);
        on(heroVisual, 'pointerleave', onLeaveTiles);
        tiles.forEach((t) => {
          on(t, 'pointerenter', () => {
            hovering = true;
            spot = -1;
            paintSpot();
            t.classList.add('is-spotlight');
          });
          on(t, 'pointerleave', () => {
            t.classList.remove('is-spotlight');
            hovering = false;
          });
        });
        cleanups.push(() => {
          if (spotTimer) clearTimeout(spotTimer);
        });
      }

      // Depth parallax: layers drift against the pointer (fine pointers only).
      const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const layers = heroVisual
        ? Array.from(heroVisual.querySelectorAll('[data-hero-layer]'))
        : [];
      if (heroVisual && canHover && layers.length && typeof requestAnimationFrame === 'function') {
        let raf = 0;
        let tx = 0;
        let ty = 0;
        let cx = 0;
        let cy = 0;
        const settle = () => {
          cx += (tx - cx) * 0.08;
          cy += (ty - cy) * 0.08;
          if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05) {
            cx = tx;
            cy = ty;
          }
          layers.forEach((el) => {
            const depth = Number(el.getAttribute('data-hero-layer')) || 8;
            el.style.translate = `${(-cx * depth).toFixed(2)}px ${(-cy * depth).toFixed(2)}px`;
          });
          if (cx !== tx || cy !== ty) {
            raf = requestAnimationFrame(settle);
          } else {
            raf = 0;
          }
        };
        const kick = () => {
          if (!raf) raf = requestAnimationFrame(settle);
        };
        const onMove = (e) => {
          const rect = heroVisual.getBoundingClientRect();
          tx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
          ty = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
          tx = Math.max(-1, Math.min(1, tx));
          ty = Math.max(-1, Math.min(1, ty));
          kick();
        };
        const onLeave = () => {
          tx = 0;
          ty = 0;
          kick();
        };
        on(heroVisual, 'pointermove', onMove);
        on(heroVisual, 'pointerleave', onLeave);
        cleanups.push(() => {
          if (raf) cancelAnimationFrame(raf);
          layers.forEach((el) => {
            el.style.translate = '';
          });
        });
      }

    const revealEls = Array.from(document.querySelectorAll('.landing-home [data-reveal]'));
    if (!revealEls.length) {
      return () => {
        cleanups.forEach((fn) => {
          try {
            fn();
          } catch (_) {}
        });
      };
    }

    if (reducedMotion || typeof IntersectionObserver !== 'function') {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return () => {
        cleanups.forEach((fn) => {
          try {
            fn();
          } catch (_) {}
        });
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
    cleanups.push(() => observer.disconnect());

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch (_) {}
      });
    };
  };

  return { title, description, html, afterRender };
}
