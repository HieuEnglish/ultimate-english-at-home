/* assets/js/games/4-7/picture-bingo.js
   Picture Bingo - Ages 4-7

   Senior pass:
   - Clearer call/mark loop with called-word history
   - Better bingo feedback, scoring, and replay clarity
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const BINGO_ITEMS = [
  { word: 'Cat', emoji: '🐱' }, { word: 'Dog', emoji: '🐕' }, { word: 'Car', emoji: '🚗' },
  { word: 'Sun', emoji: '☀️' }, { word: 'Tree', emoji: '🌳' }, { word: 'Book', emoji: '📚' },
  { word: 'Ball', emoji: '⚽' }, { word: 'Apple', emoji: '🍎' }, { word: 'Pizza', emoji: '🍕' },
  { word: 'Fish', emoji: '🐟' }, { word: 'Hat', emoji: '🎩' }, { word: 'Bed', emoji: '🛏️' },
  { word: 'Moon', emoji: '🌙' }, { word: 'Star', emoji: '⭐' }, { word: 'Frog', emoji: '🐸' },
  { word: 'Duck', emoji: '🦆' }, { word: 'Bird', emoji: '🐦' }, { word: 'Cake', emoji: '🍰' },
  { word: 'Cup', emoji: '🥤' }, { word: 'Bus', emoji: '🚌' }, { word: 'Bee', emoji: '🐝' },
  { word: 'Egg', emoji: '🥚' }, { word: 'Fox', emoji: '🦊' }, { word: 'Bear', emoji: '🐻' }, { word: 'Pig', emoji: '🐷' },
];

class PictureBingoGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.gridSize = 3;
    this.currentCard = [];
    this.markedIndices = [];
    this.currentTarget = null;
    this.calledWords = [];
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="pbingo-game">
        <div class="pbingo-panel">
          <div class="pbingo-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Picture Bingo</div>
              <div class="subtitle">Get 3 in a row!</div>
            </div>
            <button class="replay-btn" id="replay-btn">🔊 Repeat</button>
          </div>

          <div class="call-card">
            <div class="call-ball" id="current-ball">❓</div>
            <div>
              <div class="call-label">Find this picture</div>
              <div class="call-text" id="ball-text">Press repeat to hear the word.</div>
            </div>
          </div>

          <div class="history-row" id="history-row"></div>
          <div class="bingo-card" id="bingo-card"></div>
          <div class="bingo-status" id="bingo-status">Listen, then mark the matching picture.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .pbingo-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#ffeaa7 0%,#f9ca24 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .pbingo-panel{width:min(760px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:16px}
      .pbingo-topbar{display:flex;align-items:center;gap:12px}.pill,.replay-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#c0392b}.subtitle{font-size:14px;color:#7f8c8d}.replay-btn{padding:12px 18px;background:#3498db;color:#fff;cursor:pointer;box-shadow:0 5px 0 #2980b9}
      .call-card{display:flex;align-items:center;gap:16px;background:#fff8e8;border:3px solid #ffe2a5;border-radius:24px;padding:16px}.call-ball{width:82px;height:82px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;border:4px solid #e74c3c;font-size:44px}.call-label{font-size:18px;color:#e67e22;text-transform:uppercase}.call-text{font-size:30px;color:#2d3436}
      .history-row{display:flex;gap:8px;flex-wrap:wrap;min-height:34px}.history-chip{background:#fff;border:2px solid #f1c40f;border-radius:999px;padding:4px 10px;font-size:14px;color:#7f8c8d}
      .bingo-card{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.bingo-cell{position:relative;background:#fff;border:3px dashed #bdc3c7;border-radius:18px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:120px;cursor:pointer;transition:transform .12s,border-color .2s}.bingo-cell:hover{transform:translateY(-2px);border-color:#3498db}.cell-emoji{font-size:54px}.cell-word{font-size:18px;color:#636e72}.bingo-marker{position:absolute;inset:10px;border-radius:18px;background:rgba(231,76,60,.18);border:5px solid #e74c3c;transform:scale(0);transition:transform .2s}.bingo-cell.marked .bingo-marker{transform:scale(1)}.bingo-cell.correct{border-color:#4cd137}.bingo-cell.wrong{border-color:#ff6b6b;background:#fff0f0}
      .bingo-status{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.generateCard();
    document.getElementById('replay-btn').onclick = () => this.announceTarget();
    this.nextCall();
  }

  generateCard() {
    this.currentCard = [...BINGO_ITEMS].sort(() => Math.random() - 0.5).slice(0, 9);
    this.markedIndices = [];
    this.calledWords = [];

    const cardEl = document.getElementById('bingo-card');
    cardEl.innerHTML = this.currentCard.map((item, i) => `
      <button class="bingo-cell" data-index="${i}">
        <div class="cell-emoji">${item.emoji}</div>
        <div class="cell-word">${item.word}</div>
        <div class="bingo-marker"></div>
      </button>
    `).join('');

    cardEl.querySelectorAll('.bingo-cell').forEach((cell) => {
      cell.onclick = () => this.handleCellClick(cell);
    });
    document.getElementById('history-row').innerHTML = '';
  }

  nextCall() {
    const availableTargets = this.currentCard.filter((_, i) => !this.markedIndices.includes(i));
    if (!availableTargets.length) return this.end();

    this.currentTarget = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    this.calledWords.push(this.currentTarget.word);
    document.getElementById('current-ball').textContent = this.currentTarget.emoji;
    document.getElementById('ball-text').textContent = this.currentTarget.word;
    document.getElementById('bingo-status').textContent = `Find ${this.currentTarget.word}!`;
    document.getElementById('history-row').innerHTML = this.calledWords.slice(-5).map((word) => `<span class="history-chip">${word}</span>`).join('');
    this.announceTarget();
  }

  announceTarget() {
    if (!this.currentTarget) return;
    this.speak(`Find ${this.currentTarget.word}`, { rate: 0.9 });
  }

  handleCellClick(cell) {
    if (this.locked) return;
    const index = Number(cell.dataset.index);
    const item = this.currentCard[index];
    if (this.markedIndices.includes(index)) return;

    if (item.word === this.currentTarget.word) {
      cell.classList.add('correct', 'marked');
      this.markedIndices.push(index);
      this.incrementCombo();
      this.addScore(120);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('bingo-status').textContent = `Nice! You found ${item.word}.`;
      this.celebrateMove({ burst: item.emoji, duration: 900 });
      this.checkWin();
      return;
    }

    cell.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`That is ${item.word}. Look for ${this.currentTarget.word}.`, 1000);
    setTimeout(() => cell.classList.remove('wrong'), 600);
  }

  checkWin() {
    const wins = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    const hasBingo = wins.some((line) => line.every((idx) => this.markedIndices.includes(idx)));
    if (hasBingo) return this.doBingo();
    setTimeout(() => this.nextCall(), 900);
  }

  doBingo() {
    this.locked = true;
    document.getElementById('current-ball').textContent = '🎉';
    document.getElementById('ball-text').textContent = 'BINGO!';
    document.getElementById('bingo-status').textContent = 'Bingo! Three in a row!';
    this.addScore(400);
    document.getElementById('score-val').textContent = this.score;
    this.confetti.explode(null, null, 45);
    this.celebrateMove({ burst: 'BINGO', duration: 1200 });
    setTimeout(() => this.showResults(this.saveScore()), 1800);
  }
}

export function createGame(container, config) {
  return new PictureBingoGame(container, config);
}
