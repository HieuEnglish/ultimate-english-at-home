/* assets/js/games/4-7/word-detective.js
   Word Detective - Ages 4-7

   Senior pass:
   - Stronger investigation framing, progress, and clearer success state
   - Better clue feedback and less dead time on wrong picks
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const CASES = [
  { word: 'CAT', missingIndex: 0, image: '🐱', options: ['C', 'B', 'R'] },
  { word: 'DOG', missingIndex: 2, image: '🐶', options: ['G', 'B', 'T'] },
  { word: 'SUN', missingIndex: 1, image: '☀️', options: ['U', 'A', 'O'] },
  { word: 'BUS', missingIndex: 0, image: '🚌', options: ['B', 'P', 'S'] },
  { word: 'FOX', missingIndex: 2, image: '🦊', options: ['X', 'S', 'K'] },
  { word: 'MAP', missingIndex: 2, image: '🗺️', options: ['P', 'T', 'D'] },
  { word: 'PIG', missingIndex: 1, image: '🐷', options: ['I', 'E', 'A'] },
  { word: 'HAT', missingIndex: 0, image: '🎩', options: ['H', 'B', 'M'] },
  { word: 'BED', missingIndex: 2, image: '🛏️', options: ['D', 'T', 'N'] },
  { word: 'CUP', missingIndex: 1, image: '🥤', options: ['U', 'A', 'O'] },
];

class WordDetectiveGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentCase = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="wd-game">
        <div class="wd-panel">
          <div class="wd-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Word Detective</div>
              <div class="progress" id="progress-text">Case 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="case-file">
            <div class="clue-image" id="clue-image">🐱</div>
            <div>
              <div class="puzzle-label">Fill in the missing letter</div>
              <div class="word-puzzle" id="word-puzzle"></div>
            </div>
          </div>

          <div class="evidence-room" id="options-row"></div>
          <div class="helper" id="helper-text">Pick the missing letter to solve the case.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .wd-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#3b4252 0%,#2d3436 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .wd-panel{width:min(760px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.18);padding:22px;display:flex;flex-direction:column;gap:18px}.wd-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2d3436}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#74b9ff;color:#fff;cursor:pointer;box-shadow:0 5px 0 #0984e3;font-size:24px}
      .case-file{background:#f8fbff;border:3px solid #d9ebff;border-radius:26px;padding:20px;display:flex;align-items:center;gap:18px}.clue-image{font-size:72px}.puzzle-label{font-size:18px;color:#7f8c8d;text-transform:uppercase}.word-puzzle{display:flex;gap:10px;margin-top:8px}.letter{width:52px;height:62px;border-radius:14px;background:#fff;border:3px solid #d9e2ec;display:flex;align-items:center;justify-content:center;font-size:32px;color:#2d3436}.letter.missing{border-color:#fdcb6e;color:#d35400}
      .evidence-room{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.clue-option{border:none;background:#fff;border-radius:50%;min-height:110px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #dfe6e9;font-size:34px;color:#2d3436;transition:transform .12s,border-color .2s}.clue-option:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.clue-option.correct{background:#edfff0;border-color:#4cd137}.clue-option.wrong{background:#fff0f0;border-color:#ff6b6b}.clue-option.dim{opacity:.45}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.speakWord();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;
    this.currentCase = [...CASES].sort(() => Math.random() - 0.5)[0];
    this.options = [...this.currentCase.options].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Case ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('clue-image').textContent = this.currentCase.image;
    document.getElementById('helper-text').textContent = 'Pick the missing letter to solve the case.';

    const chars = this.currentCase.word.split('');
    document.getElementById('word-puzzle').innerHTML = chars.map((char, idx) => {
      if (idx === this.currentCase.missingIndex) return `<span class="letter missing" id="missing-slot">?</span>`;
      return `<span class="letter">${char}</span>`;
    }).join('');

    const row = document.getElementById('options-row');
    row.innerHTML = this.options.map((opt) => `<button class="clue-option" data-char="${opt}">${opt}</button>`).join('');
    row.querySelectorAll('.clue-option').forEach((opt) => {
      opt.onclick = () => this.handlePick(opt);
    });

    setTimeout(() => this.speakWord(), 450);
  }

  speakWord() {
    if (!this.currentCase) return;
    this.speak(`Spell ${this.currentCase.word}`, { rate: 0.85 });
  }

  handlePick(opt) {
    if (this.locked) return;
    const char = opt.dataset.char;
    const correctChar = this.currentCase.word[this.currentCase.missingIndex];
    const options = [...this.container.querySelectorAll('.clue-option')];

    if (char === correctChar) {
      this.locked = true;
      opt.classList.add('correct');
      options.filter((node) => node !== opt).forEach((node) => node.classList.add('dim'));
      document.getElementById('missing-slot').textContent = char;
      document.getElementById('missing-slot').classList.remove('missing');
      this.incrementCombo();
      this.addScore(110);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `Case solved! ${this.currentCase.word}.`;
      this.speak(`Correct! ${this.currentCase.word}`);
      this.confetti.explode(null, null, 16);
      this.celebrateMove({ burst: char.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextRound(), 1200);
      return;
    }

    opt.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`That letter does not fit. Try again.`, 900);
    setTimeout(() => opt.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new WordDetectiveGame(container, config);
}
