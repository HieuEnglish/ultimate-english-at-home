/* assets/js/views/home.js
   Landing-style home page for Ultimate English At Home.
*/

export function getView(ctx) {
  const { hrefFor } = ctx;

  const title = 'UEAH - Ultimate English At Home';
  const description =
    'Free English practice for kids, teens, and adults. Age-specific resources, games, and IELTS-inspired tests - all at home, all free.';

  const html = `
    <div class="landing-home">
      <section class="hero">
        <div class="hero-shell">
          <div class="hero-copy">
            <div class="hero-badge">&#10024; 100% Free &middot; No sign-up required</div>
            <div class="hero-maker">Made by Teacher Zane</div>

            <h1 class="hero-title">
              Learn English<br />
              <span class="grad">at any age, at home</span>
            </h1>

            <p class="hero-sub">
              UEAH gives kids, teens, and adults free access to age-specific English resources,
              games, and IELTS-inspired tests - designed to feel modern, visual, and actually enjoyable to return to.
            </p>

            <div class="hero-actions">
              <a href="${hrefFor('/resources')}" class="btn-hero btn-hero--primary" data-nav>
                Start Learning Free &rarr;
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
            </div>
          </div>

          <div class="hero-visual" data-reveal>
            <div class="hero-visual__halo hero-visual__halo--one"></div>
            <div class="hero-visual__halo hero-visual__halo--two"></div>
            <div class="hero-visual__spark hero-visual__spark--one"></div>
            <div class="hero-visual__spark hero-visual__spark--two"></div>
            <div class="hero-visual__spark hero-visual__spark--three"></div>

            <div class="hero-visual__frame">
              <div class="hero-visual__card hero-visual__card--lead">
                <div class="hero-visual__eyebrow">Live learning map</div>
                <div class="hero-visual__title">Reading, games, tests, progress</div>
                <div class="hero-visual__mini-grid">
                  <div class="hero-visual__mini-tile">
                    <strong>📚</strong>
                    <span>Resources</span>
                  </div>
                  <div class="hero-visual__mini-tile">
                    <strong>🎮</strong>
                    <span>Games</span>
                  </div>
                  <div class="hero-visual__mini-tile">
                    <strong>🧪</strong>
                    <span>Tests</span>
                  </div>
                  <div class="hero-visual__mini-tile">
                    <strong>🏆</strong>
                    <span>Certificates</span>
                  </div>
                </div>
              </div>

              <div class="hero-visual__stack">
                <div class="hero-visual__card hero-visual__card--path">
                  <div class="hero-visual__card-icon">🧭</div>
                  <div>
                    <div class="hero-visual__card-label">Age path</div>
                    <div class="hero-visual__card-value">6 learner tracks</div>
                  </div>
                </div>

                <div class="hero-visual__card hero-visual__card--score">
                  <div class="hero-visual__card-icon">📈</div>
                  <div>
                    <div class="hero-visual__card-label">Progress</div>
                    <div class="hero-visual__card-value">Skill scores + saved wins</div>
                  </div>
                </div>
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

      <section class="stats-strip" data-reveal>
        <div class="stats-inner">
          <div>
            <span class="stat-num">6</span>
            <p class="stat-label">Learning Tracks</p>
          </div>
          <div>
            <span class="stat-num">4</span>
            <p class="stat-label">Core Skills</p>
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

  const afterRender = () => {
    const anchorLinks = Array.from(document.querySelectorAll('.landing-home a[href^="#"]'));
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href') || '';
        const id = href.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const revealEls = Array.from(document.querySelectorAll('.landing-home [data-reveal]'));
    if (!revealEls.length) return;

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof IntersectionObserver !== 'function') {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
  };

  return { title, description, html, afterRender };
}
