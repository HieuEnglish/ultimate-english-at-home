/*
 * Scroll-linked particle dissolve for the UEAH SPA.
 * Inspired by Canvas UI's Particle Scroll, with a DOM-safe fallback that works
 * without the still-experimental html-in-canvas API.
 */
const motion = matchMedia('(prefers-reduced-motion: reduce)');
if (!motion.matches) {
  const main = document.querySelector('.site-main');
  const app = document.getElementById('app');

  if (main && app) {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-scroll-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    main.prepend(canvas);

    const style = document.createElement('style');
    style.textContent = `
      .site-main { isolation:isolate; }
      .particle-scroll-canvas {
        position:fixed;
        inset:68px 0 0;
        z-index:2;
        width:100%;
        height:calc(100svh - 68px);
        display:block;
        pointer-events:none;
      }
      #app, .site-main > .container { position:relative; z-index:1; }
      .particle-scroll-target {
        opacity:var(--particle-assembly, 1);
        filter:blur(var(--particle-blur, 0px));
        translate:0 var(--particle-lift, 0px);
        transition:opacity .08s linear, filter .08s linear;
        will-change:opacity,filter,transform;
      }
      @media (prefers-reduced-motion:reduce), print {
        .particle-scroll-canvas { display:none!important; }
        .particle-scroll-target {
          opacity:1!important; filter:none!important; translate:none!important;
        }
      }
    `;
    document.head.append(style);

    const ctx = canvas.getContext('2d', { alpha: true });
    const config = {
      point: .68,
      band: 360,
      density: innerWidth < 700 ? 34 : 27,
      size: 1.35,
      spread: innerWidth < 700 ? 95 : 175,
      gravity: .35,
      drift: .7,
      swirl: 55,
      stagger: .7,
      fade: .82,
      smoothing: .6
    };

    const selectors = [
      '[data-reveal]', '[data-ueah-animate="reveal"]',
      '.hero-title', '.hero-sub', '.hero-subtitle', '.eyebrow', '.note',
      '.page-title', '.page-subtitle',
      '.card', '.resource-card', '.game-card', '.test-card',
      '.panel', '.profile-card', '.certificate-card', '.favourite-card',
      '.scoring-card', '.skill-card', '.age-card', '.question-card',
      '.resource-age-card', '.tests-hero-card', '.tests-dashboard-card',
      '.feature-card', '.age-path-card', '.testimonial-card', '.cta-card',
      '.skill-pill', '.step',
      '.section-title', '.section-sub', '.section-subtitle',
      '[class$="-card"]', '[class*="-card "]'
    ].join(',');

    let targets = [];
    let particles = [];
    let dirty = true;
    let running = false;
    let frameId = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let time = 0;
    let lastTime = performance.now();
    let smoothScroll = scrollY;
    let lastScroll = scrollY;
    let scrollLag = 0;

    const hash = value => {
      const x = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    const colorOf = element => {
      const styles = getComputedStyle(element);
      const candidates = [
        styles.getPropertyValue('--glow-color'),
        styles.getPropertyValue('--accent'),
        styles.getPropertyValue('--game-accent'),
        styles.borderColor,
        styles.color
      ];
      return candidates.find(value => value && value !== 'transparent' &&
        !value.includes('0, 0, 0, 0')) || '#8b72ff';
    };

    function refreshTargets() {
      targets.forEach(item => {
        if (!item.element.isConnected) item.element.classList.remove('particle-scroll-target');
      });
      const elements = [...app.querySelectorAll(selectors)]
        .filter(element => !element.closest('[hidden], dialog:not([open])'))
        // Prefer the outer visual surface when nested pieces share a card suffix.
        .filter((element, index, all) =>
          !all.some(other => other !== element && other.contains(element) &&
            other.getBoundingClientRect().width <= element.getBoundingClientRect().width * 1.25));
      targets = elements.map((element, index) => {
        element.classList.add('particle-scroll-target');
        return { element, index, color: colorOf(element) };
      });
      rebuildParticles();
      dirty = false;
    }

    function rebuildParticles() {
      particles = [];
      targets.forEach((target, targetIndex) => {
        const rect = target.element.getBoundingClientRect();
        if (rect.width < 4 || rect.height < 4) return;
        const columns = Math.max(2, Math.ceil(rect.width / config.density));
        const rows = Math.max(1, Math.ceil(Math.min(rect.height, 240) / config.density));
        const stepX = 1 / columns;
        const stepY = 1 / rows;
        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            const seed = targetIndex * 100003 + row * 401 + column * 17;
            if (hash(seed) < .18) continue;
            particles.push({
              target,
              x: (column + .5 + (hash(seed + 2) - .5) * .65) * stepX,
              y: (row + .5 + (hash(seed + 3) - .5) * .65) * stepY,
              a: hash(seed + 4),
              b: hash(seed + 5),
              c: hash(seed + 6),
              d: hash(seed + 7)
            });
          }
        }
      });
    }

    function resize() {
      width = Math.max(innerWidth, 1);
      height = Math.max(innerHeight - 68, 1);
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dirty = true;
      start();
    }

    const assemblyFor = y => {
      const line = height * config.point;
      return Math.min(Math.max((line + config.band - y) / config.band, 0), 1);
    };

    function paint(delta) {
      ctx.clearRect(0, 0, width, height);
      const scrollNow = scrollY;
      const tau = config.smoothing;
      smoothScroll += (scrollNow - smoothScroll) *
        (tau <= 0 ? 1 : 1 - Math.exp(-delta / tau));

      targets.forEach(target => {
        if (!target.element.isConnected) return;
        const rect = target.element.getBoundingClientRect();
        const centerY = rect.top - 68 + Math.min(rect.height * .45, 130);
        const progress = assemblyFor(centerY);
        const eased = 1 - Math.pow(1 - progress, 3);
        // Keep real controls legible and usable; only decorative surfaces dissolve.
        const interactive = target.element.matches('input,textarea,select,button') ||
          target.element.querySelector('input,textarea,select');
        const floor = interactive ? .82 : .32;
        target.element.style.setProperty('--particle-assembly',
          String(floor + (1 - floor) * eased));
        target.element.style.setProperty('--particle-blur',
          `${(1 - eased) * (interactive ? .25 : 1.25)}px`);
        target.element.style.setProperty('--particle-lift',
          `${(1 - eased) * 7}px`);
      });

      ctx.globalCompositeOperation = 'lighter';
      for (const particle of particles) {
        const element = particle.target.element;
        if (!element.isConnected) continue;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 60 || rect.top > innerHeight + config.spread) continue;
        const homeX = rect.left + rect.width * particle.x;
        const homeY = rect.top - 68 + rect.height * particle.y;
        const progress = assemblyFor(homeY);
        if (progress >= .998) continue;

        const delay = particle.a * config.stagger;
        const local = Math.min(Math.max((progress - delay) / Math.max(1 - delay, .05), 0), 1);
        const eased = 1 - Math.pow(1 - local, 3);
        const angle = particle.b * Math.PI * 2;
        const reach = .08 + .92 * Math.pow(particle.c, 2.4);
        const scatter = config.spread * reach * (1 - eased);
        const drift = time * config.drift;
        const floatX = Math.sin(drift * (3 + particle.b * 4) + particle.c * 30) *
          (1 - eased) * 5;
        const floatY = Math.cos(drift * (2.5 + particle.c * 4) + particle.b * 30) *
          (1 - eased) * 5;
        const arc = Math.sin(eased * Math.PI) * config.swirl * (particle.d - .5);
        const x = homeX + Math.cos(angle) * scatter + arc + floatX;
        const y = homeY + Math.sin(angle) * scatter +
          config.gravity * scatter * .45 + floatY + scrollLag * (1 - eased) * .12;
        const radius = config.size + eased * 1.2;
        ctx.globalAlpha = config.fade * (1 - eased) * (.45 + particle.d * .55);
        ctx.fillStyle = particle.target.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    function frame(now) {
      if (!running) return;
      const delta = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;
      time += delta;
      const currentScroll = scrollY;
      scrollLag += currentScroll - lastScroll;
      lastScroll = currentScroll;
      scrollLag *= Math.exp(-delta / .22);
      scrollLag = Math.min(Math.max(scrollLag, -260), 260);
      if (dirty) refreshTargets();
      paint(delta);
      frameId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || document.hidden) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }

    const mutationObserver = new MutationObserver(records => {
      if (records.some(record => record.addedNodes.length || record.removedNodes.length)) {
        dirty = true;
        start();
      }
    });
    mutationObserver.observe(app, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(() => {
      dirty = true;
      start();
    });
    resizeObserver.observe(app);

    addEventListener('resize', resize, { passive: true });
    addEventListener('scroll', start, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    motion.addEventListener('change', () => {
      if (motion.matches) {
        stop();
        canvas.hidden = true;
        targets.forEach(({ element }) => {
          element.style.removeProperty('--particle-assembly');
          element.style.removeProperty('--particle-blur');
          element.style.removeProperty('--particle-lift');
        });
      } else {
        canvas.hidden = false;
        start();
      }
    });

    resize();
    start();
  }
}
