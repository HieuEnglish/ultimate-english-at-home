/* =============================================================
   UEAH Animation Utilities
   Lightweight, self-contained animation helpers for the SPA.
   No external dependencies. Respects prefers-reduced-motion.
   ============================================================= */

(function () {
  'use strict';

  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utils ---------- */

  function queryAll(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  /* ---------- stagger reveal (fade/slide up) ---------- */

  function staggerReveal(selectorOrEls, opts) {
    const options = opts || {};
    const staggerMs = options.stagger || 60;
    const offset    = options.offset    || 28;
    const duration  = options.duration  || '0.5s';
    const childSel  = options.childSelector;

    const targets = Array.isArray(selectorOrEls)
      ? selectorOrEls
      : childSel
        ? queryAll(childSel)
        : queryAll(selectorOrEls);

    if (!targets.length) return;

    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = `translateY(${offset}px)`;
      el.style.transition = `opacity ${duration} ease, transform ${duration} ease`;
    });

    if (typeof IntersectionObserver !== 'function' || REDUCED) {
      targets.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      let delay = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.revealed) return;
        el.dataset.revealed = '1';

        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }, delay);
        delay += staggerMs;
        observer.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    targets.forEach((el) => observer.observe(el));
  }

  /* ---------- typing effect (hero / typewriter) ---------- */

  function typeWriter(element, text, speed) {
    if (REDUCED) { element.textContent = text; return; }
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i += 1
      if (i >= text.length) clearInterval(interval);
    }, speed || 30);
  }

  /* ---------- smooth counter (stats) ---------- */

  function animateCounter(el, to, durationMs) {
    if (REDUCED) { el.textContent = String(to); return; }
    const start = performance.now();
    const duration = durationMs || 1200;

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.floor(eased * to);
      el.textContent = String(value);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- ripple effect for clicks ---------- */

  function addRipple(event, color) {
    if (REDUCED) return;
    const el = event.currentTarget || event.target;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: ${color || 'rgba(255,255,255,0.35)'};
      width: ${diameter}px;
      height: ${diameter}px;
      left: ${event.clientX - rect.left - radius}px;
      top: ${event.clientY - rect.top - radius}px;
      animation: ueah-ripple-anim 0.6s ease-out forwards;
      transform: scale(0);
    `;

    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);

    setTimeout(() => ripple.remove(), 650);
  }

  /* ---------- pulse / glow animations (CSS injection) ---------- */

  function injectKeyframes() {
    if (document.getElementById('ueah-anim-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'ueah-anim-keyframes';
    style.textContent = `
      @keyframes ueah-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes ueah-pulse-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(124,92,252,0.3); }
        50% { box-shadow: 0 0 20px 4px rgba(124,92,252,0.15); }
      }
      @keyframes ueah-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes ueah-ripple-anim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---------- hover card tilt ---------- */

  function initCardTilt(selector) {
    if (REDUCED) return;
    const cards = queryAll(selector);
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- parallax scroll effect ---------- */

  function initParallax(selector, speed) {
    if (REDUCED) return;
    const s = speed || 0.15;
    const els = queryAll(selector);
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return false;
      ticking = true;
      requestAnimationFrame(() => {
        els.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const y = (window.innerHeight - rect.top) * s;
          el.style.transform = `translateY(${y}px)`;
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- global helpers ---------- */

  window.UEAH = window.UEAH || {};
  window.UEAH.anim = {
    staggerReveal,
    typeWriter,
    animateCounter,
    addRipple,
    initCardTilt,
    initParallax,
    injectKeyframes,
    REDUCED,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectKeyframes, { once: true });
  } else {
    injectKeyframes();
  }
})();
