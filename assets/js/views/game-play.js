/* assets/js/views/game-play.js
   Game play view - Container for playing individual games.
*/

import { breadcrumbs } from '../common.js';

// Age labels
const AGE_LABELS = {
    "0-3": "Ages 0-3",
    "4-7": "Ages 4-7",
    "8-10": "Ages 8-10",
    "11-12": "Ages 11-12",
    "13-18": "Ages 13-18",
};

// Skill labels
const SKILL_LABELS = {
    vocabulary: "Vocabulary",
    listening: "Listening",
    spelling: "Spelling",
    grammar: "Grammar",
    speaking: "Speaking",
};

export async function getView(ctx, age, skill, slug) {
    const { hrefFor, basePath } = ctx;
    const ageLabel = AGE_LABELS[age] || age;
    const skillLabel = SKILL_LABELS[skill] || skill;

    // Get game data
    let game = null;
    if (window.UEAH_GAMES_STORE) {
        game = window.UEAH_GAMES_STORE.getGame(age, skill, slug);
    }

    if (!game) {
        return {
            title: 'Game Not Found — UEAH',
            description: 'This game could not be found.',
            html: `
        <section class="page-top games-page">
          ${breadcrumbs([
                { label: 'Home', href: hrefFor('/') },
                { label: 'Games', href: hrefFor('/games') },
                { label: 'Not Found' },
            ])}
          <h1 class="page-title">Game Not Found</h1>
          <p class="page-subtitle">Sorry, this game doesn't exist.</p>
          <div class="actions">
            <a class="btn btn--primary" href="${hrefFor(`/games/${age}/${skill}`)}" data-nav>Back to Games</a>
          </div>
        </section>
      `,
        };
    }

    const title = `${game.title} — UEAH`;
    const description = game.description;

    const breadcrumb = breadcrumbs([
        { label: 'Home', href: hrefFor('/') },
        { label: 'Games', href: hrefFor('/games') },
        { label: ageLabel, href: hrefFor(`/games/${age}`) },
        { label: skillLabel, href: hrefFor(`/games/${age}/${skill}`) },
        { label: game.title },
    ]);

    // Get high score
    let highScore = 0;
    if (window.UEAH_GAME_SCORES) {
        highScore = window.UEAH_GAME_SCORES.getHighScore(slug);
    }

    const html = `
    <section class="page-top games-page game-play-page">
      ${breadcrumb}
      <div class="game-header">
        <div class="game-title-row">
          <span class="game-emoji-large" aria-hidden="true">${game.emoji}</span>
          <div>
            <h1 class="page-title">${game.title}</h1>
            <p class="game-description">${game.description}</p>
          </div>
        </div>
        ${highScore > 0 ? `<div class="game-high-score">🏆 High Score: <strong>${highScore}</strong></div>` : ''}
      </div>
      
      <div class="game-container" id="game-container" 
           data-game-slug="${slug}"
           data-game-age="${age}"
           data-game-skill="${skill}">
        <!-- Game content loaded here -->
        <div class="game-loading">
          <div class="game-loading-spinner"></div>
          <p>Loading game...</p>
        </div>
      </div>

      <div class="game-controls">
        <button class="btn btn--primary game-start-btn" id="game-start-btn">
          <span class="emoji">▶️</span> Start Game
        </button>
        <a class="btn" href="${hrefFor(`/games/${age}/${skill}`)}" data-nav>
          <span class="emoji">←</span> Back to Games
        </a>
      </div>
      
      ${game.usesMicrophone ? `
        <div class="note game-mic-note">
          <span class="emoji">🎤</span> This game uses your microphone for speech recognition. 
          You'll be asked for permission when you start.
        </div>
      ` : ''}
    </section>
  `;

    return {
        title,
        description,
        html,
        afterRender: () => initGamePlayer(game, age, skill, slug, basePath),
    };
}

// Initialize game player after render
async function initGamePlayer(game, age, skill, slug, basePath) {
    const container = document.getElementById('game-container');
    const startBtn = document.getElementById('game-start-btn');
    if (!container || !startBtn) return;

    let gameInstance = null;

    // Load game module
    try {
        const modulePath = `${basePath}/assets/js/games/${age}/${slug}.js`;
        const module = await import(modulePath);

        // Remove loading state
        container.innerHTML = '';

        // Create game instance
        if (module.createGame) {
            gameInstance = module.createGame(container, {
                ...game,
                slug,
                age,
                skill,
            });
            await gameInstance.init();
        }

        // Start button handler
        startBtn.addEventListener('click', () => {
            if (gameInstance && !gameInstance.isRunning) {
                startBtn.style.display = 'none';
                gameInstance.start();
            }
        });

        // Handle restart/back from results
        container.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            if (action === 'restart') {
                // Remove results overlay
                container.querySelector('.game-results-overlay')?.remove();
                startBtn.style.display = '';
                if (gameInstance) {
                    gameInstance.cleanup();
                    gameInstance.init().then(() => {
                        startBtn.click();
                    });
                }
            } else if (action === 'back') {
                // Navigate back
                window.history.back();
            }
        });

    } catch (err) {
        console.error('Failed to load game:', err);
        container.innerHTML = `
      <div class="game-error">
        <span class="emoji">😢</span>
        <h3>Oops! Couldn't load the game</h3>
        <p>This game is still being built. Check back soon!</p>
      </div>
    `;
        startBtn.style.display = 'none';
    }
}
