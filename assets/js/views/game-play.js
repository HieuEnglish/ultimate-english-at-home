/* assets/js/views/game-play.js
   Game play view - Container for playing individual games.
*/

import { breadcrumbs } from "../common.js";

const AGE_LABELS = {
  "0-3": "Ages 0-3",
  "4-7": "Ages 4-7",
  "8-10": "Ages 8-10",
  "11-12": "Ages 11-12",
  "13-18": "Ages 13-18",
  featured: "Featured",
};

const AGE_PLAY_STYLE = {
  "0-3": "Large touch targets and playful discovery",
  "4-7": "Picture-rich play with bright instant feedback",
  "8-10": "Quick thinking, patterns, and challenge loops",
  "11-12": "Skill drills with stronger pace and strategy",
  "13-18": "Debate, logic, and expressive challenge design",
  featured: "Signature challenge with standout presentation",
};

const AGE_BEST_FOR = {
  "0-3": "Short sessions with parent support",
  "4-7": "Independent practice and replayable wins",
  "8-10": "Focus bursts and score chasing",
  "11-12": "More confident solo practice",
  "13-18": "Deep practice with higher stakes",
  featured: "Showpiece practice mode",
};

const SKILL_LABELS = {
  vocabulary: "Vocabulary",
  listening: "Listening",
  spelling: "Spelling",
  grammar: "Grammar",
  speaking: "Speaking",
  comprehensive: "Comprehensive",
};

const SKILL_HINTS = {
  vocabulary: "Spot patterns, connect meaning, and react fast.",
  listening: "Use sound cues and rhythm to stay ahead.",
  spelling: "Look for letter shapes, sounds, and sequence clues.",
  grammar: "Watch structure and trust the strongest sentence pattern.",
  speaking: "Take a breath, respond clearly, and keep momentum.",
  comprehensive: "Mix speed with accuracy and adapt to each round.",
};

const SKILL_ICONS = {
  vocabulary: "📚",
  listening: "🎧",
  spelling: "🔤",
  grammar: "🧠",
  speaking: "🎤",
  comprehensive: "🎯",
};

function getDifficultyLabel(level) {
  if (level <= 1) return "Starter";
  if (level === 2) return "Growing";
  if (level === 3) return "Challenging";
  if (level === 4) return "Advanced";
  return "Expert";
}

function getDifficultyStars(level) {
  const clamped = Math.max(1, Math.min(5, Number(level) || 1));
  return "★".repeat(clamped);
}

function getChallengeMode(game) {
  if (game.usesMicrophone) return "Voice-powered challenge";
  if (game.hasTimer) return "Timed arcade mode";
  return "Free-play flow";
}

function getInteractionStyle(game) {
  if (game.usesMicrophone) return "Speak, listen, and react in real time.";
  if (game.skill === "listening") return "Listen first, then answer with timing.";
  if (game.skill === "speaking") return "Build confidence through live response.";
  if (game.hasTimer) return "Fast rounds with strong feedback loops.";
  return "Relaxed, replayable interaction with visual guidance.";
}

function getStartButtonLabel(game, hasInlineStart) {
  if (hasInlineStart) return `Enter ${game.title}`;
  if (game.hasTimer) return "Launch challenge";
  return "Start playing";
}

export async function getView(ctx, age, skill, slug) {
  const { hrefFor, basePath } = ctx;
  const ageLabel = AGE_LABELS[age] || age;
  const skillLabel = SKILL_LABELS[skill] || skill;

  let game = null;
  if (window.UEAH_GAMES_STORE) {
    game = age === "featured"
      ? window.UEAH_GAMES_STORE.getGameBySlug(slug)
      : window.UEAH_GAMES_STORE.getGame(age, skill, slug);
  }

  if (!game) {
    return {
      title: "Game Not Found - UEAH",
      description: "This game could not be found.",
      html: `
        <section class="page-top games-page game-play-page game-play-page--missing">
          ${breadcrumbs([
            { label: "Home", href: hrefFor("/") },
            { label: "Games", href: hrefFor("/games") },
            { label: "Not Found" },
          ])}
          <div class="game-missing-card">
            <div class="game-missing-card__icon" aria-hidden="true">🕹️</div>
            <span class="resources-hero__label">Missing game</span>
            <h1 class="page-title">Game Not Found</h1>
            <p class="page-subtitle">Sorry, this game does not exist or is still being prepared for launch.</p>
            <div class="game-missing-card__actions actions">
              <a class="btn btn--primary" href="${hrefFor(`/games/${age}/${skill}`)}" data-nav>Back to Games</a>
              <a class="btn" href="${hrefFor('/games')}" data-nav>All Game Categories</a>
            </div>
          </div>
        </section>
      `,
    };
  }

  const title = `${game.title} - UEAH`;
  const description = game.description;
  const difficulty = Math.max(1, Math.min(5, Number(game.difficulty) || 1));

  const breadcrumb = age === "featured"
    ? breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Games", href: hrefFor("/games") },
      { label: game.title },
    ])
    : breadcrumbs([
      { label: "Home", href: hrefFor("/") },
      { label: "Games", href: hrefFor("/games") },
      { label: ageLabel, href: hrefFor(`/games/${age}`) },
      { label: skillLabel, href: hrefFor(`/games/${age}/${skill}`) },
      { label: game.title },
    ]);

  let highScore = 0;
  if (window.UEAH_GAME_SCORES) {
    highScore = window.UEAH_GAME_SCORES.getHighScore(slug);
  }

  const html = `
    <section class="page-top games-page game-play-page" data-game-age-theme="${age}" data-game-skill-theme="${skill}">
      ${breadcrumb}

      <div class="game-hero-card">
        <div class="game-header">
          <div class="game-title-row">
            <span class="game-emoji-large" aria-hidden="true">${game.emoji}</span>
            <div>
              <div class="game-kicker">${SKILL_ICONS[skill] || "🎯"} ${skillLabel} mission</div>
              <h1 class="page-title">${game.title}</h1>
              <p class="game-description">${game.description}</p>
            </div>
          </div>
          <div class="game-header-side">
            ${highScore > 0 ? `<div class="game-high-score">🏆 High Score <strong>${highScore}</strong></div>` : `<div class="game-high-score is-muted">Ready for a first high score</div>`}
            <div class="game-difficulty-badge" aria-label="Difficulty ${difficulty} out of 5">
              <span>${getDifficultyLabel(difficulty)}</span>
              <strong>${getDifficultyStars(difficulty)}</strong>
            </div>
          </div>
        </div>

        <div class="game-meta-chips">
          <span class="game-meta-chip">${ageLabel}</span>
          <span class="game-meta-chip">${skillLabel}</span>
          <span class="game-meta-chip">${getChallengeMode(game)}</span>
          <span class="game-meta-chip">${game.hasTimer ? "Score attack" : "Low pressure play"}</span>
          ${game.usesMicrophone ? '<span class="game-meta-chip">Microphone enabled</span>' : ""}
        </div>

        <div class="game-quick-stats">
          <div class="game-quick-stat">
            <span class="game-quick-stat__label">Play style</span>
            <strong>${AGE_PLAY_STYLE[age] || "Responsive game flow"}</strong>
          </div>
          <div class="game-quick-stat">
            <span class="game-quick-stat__label">Interaction</span>
            <strong>${getInteractionStyle(game)}</strong>
          </div>
          <div class="game-quick-stat">
            <span class="game-quick-stat__label">Best for</span>
            <strong>${AGE_BEST_FOR[age] || "Replay and mastery practice"}</strong>
          </div>
        </div>
      </div>

      <div class="game-stage">
        <div class="game-stage__backdrop" aria-hidden="true">
          <span class="game-stage__orb game-stage__orb--one"></span>
          <span class="game-stage__orb game-stage__orb--two"></span>
          <span class="game-stage__orb game-stage__orb--three"></span>
          <span class="game-stage__spark game-stage__spark--one"></span>
          <span class="game-stage__spark game-stage__spark--two"></span>
          <span class="game-stage__spark game-stage__spark--three"></span>
        </div>

        <div class="game-stage__main">
          <div class="game-status-bar">
            <div>
              <div class="game-status-pill" id="game-status-pill" data-kind="loading">Loading game</div>
              <p class="game-status-detail" id="game-status-detail" data-game-live aria-live="polite">
                Preparing the ${skillLabel.toLowerCase()} activity and warming up the stage.
              </p>
            </div>
            <div class="game-status-meta">
              <span class="game-status-mini">${difficulty} / 5 difficulty</span>
              <span class="game-status-mini">${game.hasTimer ? "Timed" : "Untimed"}</span>
            </div>
          </div>

          <div
            class="game-container"
            id="game-container"
            data-game-slug="${slug}"
            data-game-age="${age}"
            data-game-skill="${skill}"
          >
            <div class="game-loading">
              <div class="game-loading-spinner"></div>
              <p>Loading game...</p>
            </div>
          </div>

          <div class="game-controls">
            <button class="btn btn--primary game-start-btn" id="game-start-btn">
              <span class="emoji">▶</span> ${getStartButtonLabel(game, false)}
            </button>
            <button class="btn game-refresh-btn" id="game-refresh-btn" disabled>
              <span class="emoji">↻</span> Refresh stage
            </button>
            <a class="btn" href="${hrefFor(age === "featured" ? "/games" : `/games/${age}/${skill}`)}" data-nav>
              <span class="emoji">←</span> Back to Games
            </a>
          </div>
        </div>

        <aside class="game-tip-stack">
          <section class="game-tip-card">
            <div class="game-tip-card__eyebrow">Quick prep</div>
            <h2 class="game-tip-card__title">How this game should feel</h2>
            <p class="game-tip-card__text">${SKILL_HINTS[skill] || "Stay curious, keep moving, and learn from each round."}</p>
            <div class="game-tip-card__facts">
              <div class="game-tip-fact">
                <span class="game-tip-fact__label">Mode</span>
                <strong>${getChallengeMode(game)}</strong>
              </div>
              <div class="game-tip-fact">
                <span class="game-tip-fact__label">Target player</span>
                <strong>${ageLabel}</strong>
              </div>
              <div class="game-tip-fact">
                <span class="game-tip-fact__label">Session energy</span>
                <strong>${game.hasTimer ? "Fast and focused" : "Calm and playful"}</strong>
              </div>
            </div>
            ${game.usesMicrophone ? `
              <div class="note game-mic-note">
                <span class="emoji">🎤</span> This game uses your microphone for speech recognition.
                You will be asked for permission when you start.
              </div>
            ` : ""}
          </section>

          <section class="game-side-card game-side-card--checklist">
            <div class="game-side-card__eyebrow">Before you start</div>
            <h2 class="game-side-card__title">Quick checklist</h2>
            <ul class="game-checklist">
              <li>${game.hasTimer ? '⏱ Be ready for quick rounds and fast choices.' : '🌈 Take your time and explore each round.'}</li>
              <li>${game.usesMicrophone ? '🎤 Allow microphone access when prompted.' : '🖱 Use touch, mouse, or taps to interact.'}</li>
              <li>🏆 Try to beat your best score with one more replay.</li>
            </ul>
          </section>

          <section class="game-side-card game-side-card--support">
            <div class="game-side-card__eyebrow">Need another route?</div>
            <h2 class="game-side-card__title">Keep exploring</h2>
            <div class="game-side-card__links">
              <a class="btn btn--small" href="${hrefFor(age === 'featured' ? '/games' : `/games/${age}/${skill}`)}" data-nav>More ${skillLabel} games</a>
              <a class="btn btn--small" href="${hrefFor('/resources')}" data-nav>Learning resources</a>
            </div>
          </section>
        </aside>
      </div>
    </section>
  `;

  return {
    title,
    description,
    html,
    afterRender: () => initGamePlayer(game, age, skill, slug, basePath),
  };
}

async function initGamePlayer(game, age, skill, slug, basePath) {
  const container = document.getElementById("game-container");
  const startBtn = document.getElementById("game-start-btn");
  const refreshBtn = document.getElementById("game-refresh-btn");
  const statusPill = document.getElementById("game-status-pill");
  const statusDetail = document.getElementById("game-status-detail");
  if (!container || !startBtn || !refreshBtn || !statusPill || !statusDetail) return;

  let gameInstance = null;

  const setStatus = (label, detail, kind = "ready") => {
    statusPill.textContent = label;
    statusPill.dataset.kind = kind;
    statusDetail.textContent = detail;
  };

  const getInlineStartButton = () => {
    return container.querySelector(
      ".game-start-overlay .start-btn, #start-overlay #start-btn, [data-start-game], [data-game-start]"
    );
  };

  const hasInlineStartOverlay = () => {
    return Boolean(container.querySelector(".game-start-overlay, #start-overlay, [data-game-start-overlay]"));
  };

  const syncLaunchLabel = () => {
    const hasInlineStart = hasInlineStartOverlay() || Boolean(getInlineStartButton());
    startBtn.innerHTML = `<span class="emoji">▶</span> ${getStartButtonLabel(game, hasInlineStart)}`;
  };

  const launchGame = () => {
    if (!gameInstance || gameInstance.isRunning) return;

    const inlineStart = getInlineStartButton();
    setStatus(
      "Game live",
      `The ${game.title} stage is active. Jump in and keep the momentum going.`,
      "active"
    );

    if (inlineStart && !inlineStart.disabled) {
      startBtn.style.display = "none";
      inlineStart.click();
      return;
    }

    startBtn.style.display = "none";
    gameInstance.start();
  };

  const loadGame = async () => {
    const modulePath = `${basePath}/assets/js/games/${age}/${slug}.js`;
    const module = await import(modulePath);

    container.innerHTML = "";

    if (!module.createGame) {
      throw new Error("Game module missing createGame export");
    }

    gameInstance = module.createGame(container, {
      ...game,
      slug,
      age,
      skill,
    });
    await gameInstance.init();

    refreshBtn.disabled = false;
    syncLaunchLabel();

    if (gameInstance.isRunning) {
      startBtn.style.display = "none";
      setStatus(
        "Game live",
        `The ${game.title} round started immediately. Keep playing and chase a new high score.`,
        "active"
      );
      return;
    }

    setStatus(
      "Ready to play",
      `${game.title} is loaded. ${getInteractionStyle(game)}`,
      "ready"
    );
  };

  const resetStage = async (autoLaunch = false) => {
    setStatus(
      "Refreshing stage",
      `Resetting ${game.title} so you can jump back in with a clean run.`,
      "loading"
    );
    startBtn.style.display = "";

    if (gameInstance && typeof gameInstance.cleanup === "function") {
      gameInstance.cleanup();
    }

    await loadGame();

    if (autoLaunch) {
      launchGame();
    }
  };

  container.addEventListener("ueah:game-status", (event) => {
    const detail = event.detail || {};
    if (!detail.label || !detail.message) return;
    setStatus(detail.label, detail.message, detail.kind || "ready");
  });

  try {
    await loadGame();

    startBtn.addEventListener("click", launchGame);
    refreshBtn.addEventListener("click", () => {
      resetStage(false).catch((err) => {
        console.error("Failed to refresh game:", err);
      });
    });

    container.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      if (action === "restart") {
        container.querySelector(".game-results-overlay")?.remove();
        resetStage(true).catch((err) => {
          console.error("Failed to restart game:", err);
        });
      } else if (action === "back") {
        window.history.back();
      }
    });
  } catch (err) {
    console.error("Failed to load game:", err);
    container.innerHTML = `
      <div class="game-error">
        <span class="emoji">😢</span>
        <h3>Oops! Could not load the game</h3>
        <p>This game is still being built. Check back soon!</p>
      </div>
    `;
    startBtn.style.display = "none";
    refreshBtn.disabled = true;
    setStatus(
      "Load error",
      `The ${game.title} module did not load correctly. Try another game while we tune this one.`,
      "error"
    );
  }
}
