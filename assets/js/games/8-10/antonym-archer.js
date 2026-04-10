/* assets/js/games/8-10/antonym-archer.js
   Antonym Archer - Ages 8-10

   Senior pass:
   - Reworked from awkward moving-click targets into focused timed rounds
   - Better learning clarity, stamina, and scoring flow
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const ARCHER_DATA = [
  { word: 'Hot', antonym: 'Cold', distractors: ['Warm', 'Boiling', 'Spicy'] },
  { word: 'Happy', antonym: 'Sad', distractors: ['Glad', 'Funny', 'Joy'] },
  { word: 'Fast', antonym: 'Slow', distractors: ['Quick', 'Rapid', 'Run'] },
  { word: 'Up', antonym: 'Down', distractors: ['High', 'Above', 'Sky'] },
  { word: 'Day', antonym: 'Night', distractors: ['Sun', 'Light', 'Noon'] },
  { word: 'Big', antonym: 'Small', distractors: ['Large', 'Huge', 'Giant'] },
  { word: 'Hard', antonym: 'Soft', distractors: ['Tough', 'Solid', 'Rock'] },
  { word: 'Start', antonym: 'End', distractors: ['Begin', 'Go', 'First'] },
  { word: 'Win', antonym: 'Lose', distractors: ['Victory', 'Champ', 'Medal'] },
  { word: 'Light', antonym: 'Dark', distractors: ['Bright', 'Glow', 'Shine'] },
];

class AntonymArcherGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 75 });
    this.currentData = null;
    this.roundsWon = 0;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="aa-game">
        <div class="aa-panel">
          <div class="aa-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Antonym Archer</div>
              <div class="subtitle">Shoot the opposite meaning.</div>
            </div>
            <div class="pill timer-pill">⏱️ <span id="timer-num">1:15</span></div>
          </div>

          <div class="mission-card">
            <div class="mission-label">Find the antonym for</div>
            <div class="mission-word" id="target-word">Hot</div>
            <div class="helper" id="helper-text">Choose the word with the opposite meaning.</div>
          </div>

          <div class="targets-grid" id="targets-grid"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .aa-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#c8f7ff 0%,#8fd3a8 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .aa-panel{width:min(820px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}
      .aa-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2d3436}.subtitle{font-size:14px;color:#607d8b}.timer-pill{background:#eef7ff;color:#0b63b6}
      .mission-card{background:#fff;border:3px solid #d9ebff;border-radius:28px;padding:20px;text-align:center}.mission-label{font-size:18px;color:#7f8c8d;text-transform:uppercase}.mission-word{font-size:44px;color:#d63031;margin:6px 0}.helper{font-size:20px;color:#4d6273}
      .targets-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.target-btn{position:relative;border:none;background:#fff;border-radius:28px;padding:26px 18px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.08);border:4px solid #fff;transition:transform .12s,border-color .2s}.target-btn:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.08)}.target-btn.correct{background:#edfff0;border-color:#4cd137}.target-btn.wrong{background:#fff0f0;border-color:#ff6b6b}.target-btn.dim{opacity:.45}.target-word{font-size:28px;color:#2d3436}.target-mark{position:absolute;top:10px;right:14px;font-size:28px}
      @media (max-width:720px){.targets-grid{grid-template-columns:1fr}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.roundsWon = 0;
    this.locked = false;
    this.nextQuestion();
  }

  nextQuestion() {
    this.locked = false;
    this.currentData = ARCHER_DATA[Math.floor(Math.random() * ARCHER_DATA.length)];
    document.getElementById('target-word').textContent = this.currentData.word;
    document.getElementById('helper-text').textContent = 'Choose the word with the opposite meaning.';

    const options = [this.currentData.antonym, ...this.currentData.distractors].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('targets-grid');
    grid.innerHTML = options.map((word) => `
      <button class="target-btn" data-word="${word}">
        <div class="target-word">${word}</div>
      </button>
    `).join('');

    grid.querySelectorAll('.target-btn').forEach((btn) => {
      btn.onclick = () => this.selectTarget(btn);
    });
  }

  selectTarget(btn) {
    if (this.locked) return;
    const word = btn.dataset.word;
    const buttons = [...this.container.querySelectorAll('.target-btn')];

    if (word === this.currentData.antonym) {
      this.locked = true;
      btn.classList.add('correct');
      btn.insertAdjacentHTML('beforeend', '<div class="target-mark">🎯</div>');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(120);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `${word} is the antonym of ${this.currentData.word}.`;
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ burst: word.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextQuestion(), 1100);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`${word} is not the opposite of ${this.currentData.word}.`, 1000);
    setTimeout(() => btn.classList.remove('wrong'), 650);
  }

  onTimerTick(remaining) {
    document.getElementById('timer-num').textContent = this.formatTime(remaining);
    super.onTimerTick(remaining);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new AntonymArcherGame(container, config);
}
