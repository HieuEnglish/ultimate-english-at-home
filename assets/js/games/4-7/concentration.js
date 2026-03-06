/* assets/js/games/4-7/concentration.js
   Concentration (Memory Match) - Ages 4-7
   
   Memory match: word cards ↔ image cards
   Flip cards to find matching pairs!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Word-image pairs
const PAIRS = [
  { word: "apple", emoji: "🍎" },
  { word: "banana", emoji: "🍌" },
  { word: "car", emoji: "🚗" },
  { word: "dog", emoji: "🐕" },
  { word: "elephant", emoji: "🐘" },
  { word: "flower", emoji: "🌸" },
  { word: "guitar", emoji: "🎸" },
  { word: "house", emoji: "🏠" },
  { word: "ice cream", emoji: "🍦" },
  { word: "juice", emoji: "🧃" },
  { word: "kite", emoji: "🪁" },
  { word: "lion", emoji: "🦁" },
  { word: "moon", emoji: "🌙" },
  { word: "nose", emoji: "👃" },
  { word: "orange", emoji: "🍊" },
  { word: "penguin", emoji: "🐧" },
  { word: "rainbow", emoji: "🌈" },
  { word: "star", emoji: "⭐" },
  { word: "turtle", emoji: "🐢" },
  { word: "umbrella", emoji: "☂️" },
  { word: "violin", emoji: "🎻" },
  { word: "whale", emoji: "🐳" },
  { word: "zebra", emoji: "🦓" },
  { word: "butterfly", emoji: "🦋" },
  { word: "drum", emoji: "🥁" },
  { word: "fish", emoji: "🐟" },
  { word: "grapes", emoji: "🍇" },
  { word: "heart", emoji: "❤️" },
  { word: "rocket", emoji: "🚀" },
  { word: "snowman", emoji: "⛄" },
];

class ConcentrationGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.pairsToMatch = 6;
    this.isChecking = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-area">
        <div class="memory-header">
          <span class="memory-title">🧠 Find the matching pairs!</span>
        </div>
        <div class="memory-grid" id="memory-grid"></div>
        <div class="memory-stats" id="memory-stats">
          <span class="stat-item">Pairs: <strong id="pairs-found">0</strong>/${this.pairsToMatch}</span>
          <span class="stat-item">Moves: <strong id="moves-count">0</strong></span>
        </div>
        <div class="game-feedback" id="game-feedback"></div>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .memory-header {
        text-align: center;
        margin-bottom: 20px;
      }
      .memory-title {
        font-size: 20px;
        font-weight: 700;
      }
      .memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        max-width: 500px;
        margin: 0 auto;
      }
      .memory-card {
        aspect-ratio: 1;
        perspective: 1000px;
        cursor: pointer;
      }
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.4s ease;
        transform-style: preserve-3d;
      }
      .memory-card.flipped .card-inner,
      .memory-card.matched .card-inner {
        transform: rotateY(180deg);
      }
      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--border);
      }
      .card-front {
        background: linear-gradient(135deg, var(--accent), var(--accent2));
        font-size: 32px;
      }
      .card-back {
        background: var(--surface);
        transform: rotateY(180deg);
        flex-direction: column;
        gap: 4px;
        padding: 8px;
      }
      .card-emoji {
        font-size: 36px;
        line-height: 1;
      }
      .card-word {
        font-size: 12px;
        font-weight: 700;
        text-align: center;
      }
      .memory-card.matched .card-back {
        border-color: #00ff88;
        background: rgba(0, 255, 136, 0.1);
      }
      .memory-card:hover:not(.flipped):not(.matched) .card-inner {
        transform: scale(1.05);
      }
      .memory-stats {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-top: 20px;
        font-size: 16px;
      }
      .stat-item strong {
        color: var(--accent);
      }
      .feedback-message {
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 700;
        text-align: center;
        margin-top: 12px;
      }
      .feedback-success { background: rgba(0, 255, 136, 0.15); color: #00cc6a; }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.matchedPairs = 0;
    this.moves = 0;
    this.flippedCards = [];
    this.isChecking = false;
    this.setupCards();
    this.renderGrid();
  }

  setupCards() {
    // Pick random pairs
    const shuffled = [...PAIRS].sort(() => Math.random() - 0.5).slice(0, this.pairsToMatch);

    // Create two cards for each pair (word card + emoji card)
    this.cards = [];
    shuffled.forEach((pair, index) => {
      this.cards.push({ id: index, type: 'emoji', content: pair.emoji, pairId: index, word: pair.word });
      this.cards.push({ id: index + 100, type: 'word', content: pair.word, pairId: index, word: pair.word });
    });

    // Shuffle cards
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  renderGrid() {
    const gridEl = document.getElementById('memory-grid');
    gridEl.innerHTML = this.cards.map((card, i) => `
      <div class="memory-card" data-index="${i}" data-pair-id="${card.pairId}">
        <div class="card-inner">
          <div class="card-front">❓</div>
          <div class="card-back">
            ${card.type === 'emoji'
        ? `<span class="card-emoji">${card.content}</span>`
        : `<span class="card-word">${card.content}</span>`
      }
          </div>
        </div>
      </div>
    `).join('');

    gridEl.querySelectorAll('.memory-card').forEach(card => {
      card.addEventListener('click', () => this.flipCard(card));
    });

    this.updateStats();
  }

  flipCard(cardElement) {
    if (this.isChecking) return;
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;
    if (this.flippedCards.length >= 2) return;

    cardElement.classList.add('flipped');
    this.flippedCards.push(cardElement);

    // Speak the word
    const index = parseInt(cardElement.dataset.index);
    const card = this.cards[index];
    this.speak(card.word, { rate: 0.8 });

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.updateStats();
      this.checkMatch();
    }
  }

  checkMatch() {
    this.isChecking = true;
    const [card1, card2] = this.flippedCards;
    const pair1 = card1.dataset.pairId;
    const pair2 = card2.dataset.pairId;

    setTimeout(() => {
      if (pair1 === pair2) {
        // Match!
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.matchedPairs++;
        this.incrementCombo();
        this.addScore(100 + (this.combo * 10));
        this.updateScoreDisplay();
        this.showFeedback('🎉 Match!', 'success');
        this.confetti.explode(null, null, 20);

        if (this.matchedPairs === this.pairsToMatch) {
          setTimeout(() => this.end(), 1000);
        }
      } else {
        // No match
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        this.resetCombo();
      }

      this.flippedCards = [];
      this.isChecking = false;
      this.updateStats();
    }, 1000);
  }

  showFeedback(message, type) {
    const feedbackEl = document.getElementById('game-feedback');
    feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
    setTimeout(() => { feedbackEl.innerHTML = ''; }, 1000);
  }

  updateStats() {
    document.getElementById('pairs-found').textContent = this.matchedPairs;
    document.getElementById('moves-count').textContent = this.moves;
  }

  updateScoreDisplay() {
    let hud = this.container.querySelector('.game-hud');
    if (!hud) {
      const gameArea = this.container.querySelector('.game-area');
      gameArea.insertAdjacentHTML('afterbegin', `
        <div class="game-hud">
          <div class="hud-score"><span class="hud-label">Score</span><span class="hud-value" data-game-score>${this.score}</span></div>
          <div class="hud-combo"><span class="hud-value" data-game-combo>${this.combo}x</span><span class="hud-label">Combo</span></div>
        </div>
      `);
      hud = this.container.querySelector('.game-hud');
    }
    const scoreEl = hud.querySelector('[data-game-score]');
    if (scoreEl) { scoreEl.textContent = this.score; Animations.bounce(scoreEl, 1.2, 200); }
    const comboEl = hud.querySelector('[data-game-combo]');
    if (comboEl) { comboEl.textContent = `${this.combo}x`; }
  }

  end() {
    this.isRunning = false;
    this.endTime = Date.now();

    // Bonus for efficiency
    const efficiency = Math.max(0, this.pairsToMatch * 2 - this.moves);
    this.addScore(efficiency * 50);

    const isHighScore = this.saveScore();
    this.showResults(isHighScore);
  }
}

export function createGame(container, config) {
  return new ConcentrationGame(container, config);
}
