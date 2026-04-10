/* assets/js/games/4-7/picture-pairs.js
   Picture Pairs - Ages 4-7

   Senior pass:
   - Reframed as a quick visual matching challenge distinct from word/emoji concentration
   - Better feedback, move tracking, and clearer completion state
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const VOCAB_ITEMS = [
  { word: 'Cat', emoji: '🐱', color: '#fab1a0' }, { word: 'Dog', emoji: '🐶', color: '#74b9ff' },
  { word: 'Apple', emoji: '🍎', color: '#ff7675' }, { word: 'Car', emoji: '🚗', color: '#a29bfe' },
  { word: 'Star', emoji: '⭐', color: '#ffeaa7' }, { word: 'Moon', emoji: '🌙', color: '#fdcb6e' },
  { word: 'Flower', emoji: '🌸', color: '#e17055' }, { word: 'Ball', emoji: '⚽', color: '#55efc4' },
  { word: 'Bear', emoji: '🐻', color: '#636e72' }, { word: 'Fish', emoji: '🐠', color: '#00cec9' },
  { word: 'Bird', emoji: '🐦', color: '#00b894' }, { word: 'Tree', emoji: '🌳', color: '#27ae60' },
];

class PicturePairsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 6;
    this.moves = 0;
    this.isLocked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ppairs-game">
        <div class="ppairs-panel">
          <div class="ppairs-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Picture Pairs</div>
              <div class="subtitle"><span id="pairs-count">0</span> / ${this.totalPairs} pairs · <span id="moves-count">0</span> moves</div>
            </div>
            <div class="badge">👯</div>
          </div>

          <div class="message-area" id="message-area">Flip two cards to find a pair.</div>
          <div class="card-grid" id="card-grid"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ppairs-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#81ecec 0%,#74b9ff 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ppairs-panel{width:min(760px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:16px}
      .ppairs-topbar{display:flex;align-items:center;gap:12px}.pill,.badge{border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#4a69bd}.subtitle{font-size:14px;color:#607d8b}.badge{background:#6c5ce7;color:#fff;padding:12px 16px}
      .message-area{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      .card-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;perspective:1000px}.game-card{aspect-ratio:1;position:relative;cursor:pointer;transform-style:preserve-3d;transition:transform .55s}.game-card.flipped,.game-card.matched{transform:rotateY(180deg)}.game-card.matched{cursor:default}.card-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:18px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 16px rgba(0,0,0,.12)}.card-front{background:linear-gradient(135deg,#6c5ce7,#a29bfe);border:4px solid #fff;color:rgba(255,255,255,.8);font-size:42px}.card-back{background:#fff;transform:rotateY(180deg);flex-direction:column;border:4px solid #dfe6e9}.card-emoji{font-size:52px}.card-word{font-size:16px;color:#636e72;margin-top:6px}.game-card.matched .card-back{background:#edfff0;border-color:#4cd137}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.resetGame();
  }

  resetGame() {
    this.matchedPairs = 0;
    this.moves = 0;
    this.flippedCards = [];
    this.isLocked = false;

    const items = [...VOCAB_ITEMS].sort(() => Math.random() - 0.5).slice(0, this.totalPairs);
    let deck = [...items, ...items].map((item, idx) => ({ ...item, uid: `${item.word}-${idx}` }));
    deck = deck.sort(() => Math.random() - 0.5);
    this.cards = deck;
    this.renderGrid();
    this.updateStats();
    document.getElementById('message-area').textContent = 'Flip two cards to find a pair.';
  }

  renderGrid() {
    const grid = document.getElementById('card-grid');
    grid.innerHTML = this.cards.map((item, index) => `
      <button class="game-card" data-index="${index}">
        <div class="card-face card-front">?</div>
        <div class="card-face card-back" style="border-color:${item.color}">
          <span class="card-emoji">${item.emoji}</span>
          <span class="card-word">${item.word}</span>
        </div>
      </button>
    `).join('');

    grid.querySelectorAll('.game-card').forEach((card) => {
      card.onclick = () => this.handleCardClick(card);
    });
  }

  updateStats() {
    document.getElementById('pairs-count').textContent = this.matchedPairs;
    document.getElementById('moves-count').textContent = this.moves;
    document.getElementById('score-val').textContent = this.score;
  }

  handleCardClick(card) {
    if (this.isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    const index = Number(card.dataset.index);
    card.classList.add('flipped');
    this.flippedCards.push({ element: card, data: this.cards[index] });

    if (this.flippedCards.length === 2) {
      this.moves += 1;
      this.updateStats();
      this.checkForMatch();
    }
  }

  checkForMatch() {
    this.isLocked = true;
    const [c1, c2] = this.flippedCards;
    if (c1.data.word === c2.data.word) {
      setTimeout(() => {
        c1.element.classList.add('matched');
        c2.element.classList.add('matched');
        this.flippedCards = [];
        this.isLocked = false;
        this.matchedPairs += 1;
        this.incrementCombo();
        this.addScore(120);
        this.updateStats();
        document.getElementById('message-area').textContent = `Match! ${c1.data.word}!`;
        this.speak(c1.data.word);
        this.confetti.explode(null, null, 14);
        this.celebrateMove({ burst: c1.data.emoji, duration: 900 });
        if (this.matchedPairs === this.totalPairs) this.win();
      }, 550);
      return;
    }

    this.resetCombo();
    document.getElementById('message-area').textContent = 'Not a pair. Try to remember those cards.';
    this.coachMove('Remember where those pictures were.', 900);
    setTimeout(() => {
      c1.element.classList.remove('flipped');
      c2.element.classList.remove('flipped');
      this.flippedCards = [];
      this.isLocked = false;
    }, 850);
  }

  win() {
    const bonus = Math.max(0, 16 - this.moves) * 15;
    if (bonus) this.addScore(bonus);
    this.updateStats();
    document.getElementById('message-area').textContent = 'All pairs found! Great memory!';
    setTimeout(() => this.showResults(this.saveScore()), 1200);
  }
}

export function createGame(container, config) {
  return new PicturePairsGame(container, config);
}
