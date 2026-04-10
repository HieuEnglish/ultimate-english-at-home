/* assets/js/games/8-10/fast-phrases.js
   Fast Phrases - Ages 8-10

   Senior pass:
   - Stronger sentence-building loop with reorder/removal support
   - Better hinting, pacing, and sentence validation feedback
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
  { sentence: 'The dog is running', emoji: '🐕💨' },
  { sentence: 'I like red apples', emoji: '😋🍎' },
  { sentence: 'She is reading a book', emoji: '👧📖' },
  { sentence: 'The sun is shining bright', emoji: '☀️😎' },
  { sentence: 'He plays football well', emoji: '👦⚽' },
  { sentence: 'We go to school daily', emoji: '🚌🏫' },
  { sentence: 'The cat sleeps all day', emoji: '🐱💤' },
  { sentence: 'Birds fly in the sky', emoji: '🐦☁️' },
  { sentence: 'I drink water often', emoji: '🥤💧' },
  { sentence: 'They are happy friends', emoji: '👫😄' },
];

class FastPhrasesGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 100 });
    this.currentSentence = null;
    this.selectedWords = [];
    this.rounds = 0;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="fp-game">
        <div class="fp-panel">
          <div class="fp-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Fast Phrases</div>
              <div class="subtitle">Build the sentence in the correct order.</div>
            </div>
            <div class="pill">⏱️ <span id="timer-val">1:40</span></div>
          </div>

          <div class="hint-card">
            <div class="hint-emoji" id="hint-display">🐕💨</div>
            <div class="helper" id="helper-text">Tap the words to build the sentence.</div>
          </div>

          <div class="brick-wall" id="brick-wall"></div>
          <div class="supply-depot" id="supply-depot"></div>

          <div class="controls-row">
            <button class="tool-btn reset-btn" id="reset-btn">🔄 Clear</button>
            <button class="tool-btn" id="undo-btn">↩️ Undo</button>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .fp-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#2c3e50 0%,#34495e 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.fp-panel{width:min(820px,96%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:34px;box-shadow:0 24px 60px rgba(0,0,0,.3);padding:22px;display:flex;flex-direction:column;gap:16px}.fp-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.subtitle{font-size:14px;color:#c7cfdb}
      .hint-card{background:rgba(255,255,255,.1);border-radius:24px;padding:16px;text-align:center}.hint-emoji{font-size:44px}.helper{font-size:20px;color:#ecf0f1;margin-top:8px}
      .brick-wall,.supply-depot{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;min-height:78px;padding:14px;border-radius:22px}.brick-wall{background:rgba(255,255,255,.08);border:2px dashed rgba(255,255,255,.2)}.supply-depot{background:rgba(0,0,0,.25)}
      .brick,.supply-item{border:none;border-radius:14px;padding:14px 18px;font-size:20px;cursor:pointer;font-family:inherit}.brick{background:#e67e22;color:#fff;box-shadow:0 6px 0 #d35400}.brick.good{background:#00b894;box-shadow:0 6px 0 #00a382}.brick.bad{background:#d63031;box-shadow:0 6px 0 #c0392b}.supply-item{background:#ecf0f1;color:#2c3e50;box-shadow:0 6px 0 #bdc3c7}.supply-item.used{opacity:.35;pointer-events:none}
      .controls-row{display:flex;justify-content:center;gap:12px}.tool-btn{border:none;border-radius:12px;padding:12px 18px;font-size:16px;font-weight:800;cursor:pointer}.reset-btn{background:#ff7675;color:#fff}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    document.getElementById('reset-btn').onclick = () => this.clearWall();
    document.getElementById('undo-btn').onclick = () => this.undoLast();
    this.nextRound();
  }

  nextRound() {
    if (!this.isRunning) return;
    this.rounds += 1;
    this.selectedWords = [];
    this.currentSentence = [...SENTENCES].sort(() => Math.random() - 0.5)[0];
    document.getElementById('hint-display').textContent = this.currentSentence.emoji;
    document.getElementById('helper-text').textContent = 'Tap the words to build the sentence.';
    this.renderRound();
  }

  renderRound() {
    const wall = document.getElementById('brick-wall');
    wall.innerHTML = this.selectedWords.map((word, index) => `<button class="brick" data-index="${index}">${word}</button>`).join('');
    wall.querySelectorAll('.brick').forEach((brick) => {
      brick.onclick = () => this.removeBrick(Number(brick.dataset.index));
    });

    const words = this.currentSentence.sentence.split(' ').map((word, idx) => ({ word, idx })).sort(() => Math.random() - 0.5);
    const usedCounts = {};
    this.selectedWords.forEach((word) => { usedCounts[word] = (usedCounts[word] || 0) + 1; });

    const supply = document.getElementById('supply-depot');
    supply.innerHTML = words.map(({ word }, i) => {
      const maxAvailable = this.currentSentence.sentence.split(' ').filter((w) => w === word).length;
      const used = (usedCounts[word] || 0) >= maxAvailable;
      return `<button class="supply-item ${used ? 'used' : ''}" data-word="${word}">${word}</button>`;
    }).join('');
    supply.querySelectorAll('.supply-item:not(.used)').forEach((btn) => {
      btn.onclick = () => this.placeBrick(btn.dataset.word);
    });
  }

  placeBrick(word) {
    this.selectedWords.push(word);
    this.renderRound();
    if (this.selectedWords.length === this.currentSentence.sentence.split(' ').length) this.checkSentence();
  }

  removeBrick(index) {
    this.selectedWords.splice(index, 1);
    this.renderRound();
  }

  clearWall() {
    this.selectedWords = [];
    this.renderRound();
  }

  undoLast() {
    if (!this.selectedWords.length) return;
    this.selectedWords.pop();
    this.renderRound();
  }

  checkSentence() {
    const attempt = this.selectedWords.join(' ');
    const correct = this.currentSentence.sentence;
    const bricks = [...this.container.querySelectorAll('.brick')];

    if (attempt === correct) {
      bricks.forEach((b) => b.classList.add('good'));
      this.incrementCombo();
      this.addScore(140);
      this.correctAnswers += 1;
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = 'Sentence complete! Nice build.';
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ burst: 'BUILD', duration: 900 });
      setTimeout(() => this.nextRound(), 1200);
      return;
    }

    bricks.forEach((b) => b.classList.add('bad'));
    this.resetCombo();
    document.getElementById('helper-text').textContent = 'That order is not correct. Rebuild it.';
    this.coachMove('The sentence order is off. Try again.', 1000);
    setTimeout(() => this.clearWall(), 800);
  }

  onTimerTick(remaining) {
    document.getElementById('timer-val').textContent = this.formatTime(remaining);
    super.onTimerTick(remaining);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new FastPhrasesGame(container, config);
}
