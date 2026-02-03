/* assets/js/games/4-7/memory-match.js
   Memory Match - Ages 4-7
   
   MODERN VERSION - Classic memory game with beautiful cards!
   Match word cards with picture cards.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const PAIRS = [
    { word: "apple", emoji: "🍎" },
    { word: "banana", emoji: "🍌" },
    { word: "cat", emoji: "🐱" },
    { word: "dog", emoji: "🐕" },
    { word: "fish", emoji: "🐟" },
    { word: "bird", emoji: "🐦" },
    { word: "sun", emoji: "☀️" },
    { word: "moon", emoji: "🌙" },
    { word: "star", emoji: "⭐" },
    { word: "tree", emoji: "🌳" },
    { word: "flower", emoji: "🌸" },
    { word: "house", emoji: "🏠" },
];

class MemoryMatchGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 6;
        this.moves = 0;
        this.canFlip = true;
    }

    async init() {
        this.container.innerHTML = `
      <div class="memory-game">
        <div class="memory-bg">
          <div class="sparkles" id="sparkles"></div>
        </div>
        
        <div class="memory-stage">
          <!-- HUD -->
          <div class="memory-hud">
            <div class="hud-box">
              <span class="box-icon">🎯</span>
              <span class="box-val" id="pairs-found">0</span>
              <span class="box-label">/ 6</span>
            </div>
            <div class="hud-box">
              <span class="box-icon">👆</span>
              <span class="box-val" id="moves-count">0</span>
              <span class="box-label">moves</span>
            </div>
            <div class="hud-box score-box">
              <span class="box-icon">⭐</span>
              <span class="box-val" id="score-display">0</span>
            </div>
          </div>
          
          <!-- Card grid -->
          <div class="card-grid" id="card-grid"></div>
          
          <!-- Match celebration -->
          <div class="match-popup" id="match-popup">
            <span class="match-emoji">✨</span>
            <span class="match-text">Match!</span>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .memory-game {
        position: relative;
        width: 100%;
        min-height: 520px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      }
      
      .memory-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
      .sparkle {
        position: absolute;
        font-size: 16px;
        animation: sparkleFloat 4s ease-in-out infinite;
      }
      @keyframes sparkleFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
      }
      
      .memory-stage {
        position: relative;
        padding: 20px;
        max-width: 480px;
        margin: 0 auto;
      }
      
      .memory-hud {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 20px;
      }
      .hud-box {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 16px;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.3);
      }
      .box-icon { font-size: 18px; }
      .box-val { font-size: 20px; font-weight: 800; color: white; }
      .box-label { font-size: 12px; color: rgba(255,255,255,0.7); }
      
      .card-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        perspective: 1000px;
      }
      
      .memory-card {
        aspect-ratio: 1;
        position: relative;
        cursor: pointer;
        transform-style: preserve-3d;
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .memory-card.flipped {
        transform: rotateY(180deg);
      }
      .memory-card.matched {
        animation: matchPop 0.5s ease;
      }
      @keyframes matchPop {
        0%, 100% { transform: rotateY(180deg) scale(1); }
        50% { transform: rotateY(180deg) scale(1.15); }
      }
      
      .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
      
      .card-back {
        background: linear-gradient(145deg, #ff9f43, #ee5a24);
        font-size: 28px;
        border: 3px solid rgba(255,255,255,0.3);
      }
      .card-back::after {
        content: '❓';
        animation: backPulse 2s ease infinite;
      }
      @keyframes backPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      .card-front {
        background: white;
        transform: rotateY(180deg);
        flex-direction: column;
        gap: 4px;
        padding: 8px;
      }
      .card-front.word-card {
        font-size: 14px;
        font-weight: 700;
        color: #2d3436;
        text-transform: capitalize;
      }
      .card-front.emoji-card {
        font-size: 40px;
      }
      
      .match-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 40px;
        background: rgba(255,255,255,0.95);
        border-radius: 24px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 100;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .match-popup.visible {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      .match-emoji { font-size: 48px; }
      .match-text { font-size: 24px; font-weight: 800; color: #2d3436; }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.matchedPairs = 0;
        this.moves = 0;
        this.flippedCards = [];
        this.canFlip = true;
        this.score = 0;
        this.setupCards();
        this.renderCards();
        this.updateHUD();
        this.setupSparkles();
    }

    setupSparkles() {
        const container = document.getElementById('sparkles');
        container.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 4}s`;
            container.appendChild(sparkle);
        }
    }

    setupCards() {
        const shuffled = [...PAIRS].sort(() => Math.random() - 0.5).slice(0, this.totalPairs);

        this.cards = [];
        shuffled.forEach((pair, i) => {
            this.cards.push({ id: i * 2, type: 'word', value: pair.word, pairId: i });
            this.cards.push({ id: i * 2 + 1, type: 'emoji', value: pair.emoji, pairId: i });
        });

        this.cards.sort(() => Math.random() - 0.5);
    }

    renderCards() {
        const grid = document.getElementById('card-grid');
        grid.innerHTML = this.cards.map(card => `
      <div class="memory-card" data-id="${card.id}" data-pair="${card.pairId}">
        <div class="card-face card-back"></div>
        <div class="card-face card-front ${card.type}-card">${card.value}</div>
      </div>
    `).join('');

        grid.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
    }

    updateHUD() {
        document.getElementById('pairs-found').textContent = this.matchedPairs;
        document.getElementById('moves-count').textContent = this.moves;
        document.getElementById('score-display').textContent = this.score;
    }

    flipCard(cardEl) {
        if (!this.canFlip) return;
        if (cardEl.classList.contains('flipped')) return;
        if (cardEl.classList.contains('matched')) return;
        if (this.flippedCards.length >= 2) return;

        cardEl.classList.add('flipped');
        this.flippedCards.push(cardEl);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateHUD();
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const pair1 = card1.dataset.pair;
        const pair2 = card2.dataset.pair;

        this.canFlip = false;

        if (pair1 === pair2) {
            // Match!
            this.matchedPairs++;
            this.incrementCombo();
            this.addScore(100 + this.combo * 20);
            this.updateHUD();

            card1.classList.add('matched');
            card2.classList.add('matched');

            this.showMatchPopup();

            if (this.combo >= 2) {
                this.confetti.explode(null, null, 25);
            }

            setTimeout(() => {
                this.hideMatchPopup();
                this.flippedCards = [];
                this.canFlip = true;

                if (this.matchedPairs >= this.totalPairs) {
                    this.end();
                }
            }, 800);
        } else {
            // No match
            this.resetCombo();

            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.canFlip = true;
            }, 1000);
        }
    }

    showMatchPopup() {
        document.getElementById('match-popup').classList.add('visible');
    }

    hideMatchPopup() {
        document.getElementById('match-popup').classList.remove('visible');
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();

        // Bonus for fewer moves
        if (this.moves <= 12) this.addScore(300);
        else if (this.moves <= 16) this.addScore(150);
        else if (this.moves <= 20) this.addScore(50);

        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new MemoryMatchGame(container, config);
}
