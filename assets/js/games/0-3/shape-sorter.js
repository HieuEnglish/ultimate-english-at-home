/* assets/js/games/0-3/shape-sorter.js
   Shape Sorter - Ages 0-3

   Senior pass:
   - Reworked from vague multiple choice into a simple "pick the shape and watch it drop into the hole" toy
   - Added progress, stronger target clarity, and fewer abstract distractions
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SHAPES = [
  { name: "Circle", icon: "⚫", color: "#ff7675" },
  { name: "Square", icon: "🟥", color: "#0984e3" },
  { name: "Triangle", icon: "🔺", color: "#fdcb6e" },
  { name: "Star", icon: "⭐", color: "#ffeaa7" },
  { name: "Heart", icon: "❤️", color: "#fd79a8" },
  { name: "Diamond", icon: "💎", color: "#00cec9" },
];

class ShapeSorterGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentShape = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ss-game">
        <div class="ss-panel">
          <div class="ss-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Shape Sorter</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-zone">
            <div class="target-title" id="instruction-text">Find the circle</div>
            <div class="hole-wrap">
              <div class="shape-hole" id="target-hole"></div>
              <div class="shape-drop" id="shape-drop"></div>
            </div>
          </div>

          <div class="shape-options" id="shape-options"></div>

          <div class="helper" id="helper-text">Tap a shape to drop it into the hole.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ss-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#74b9ff 0%,#a29bfe 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ss-panel{width:min(760px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.16);padding:22px;display:flex;flex-direction:column;gap:18px}
      .ss-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#4a69bd}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#6c5ce7;color:#fff;cursor:pointer;box-shadow:0 5px 0 #4c3fc0;font-size:24px}
      .target-zone{background:linear-gradient(135deg,#f6fbff,#fff);border-radius:28px;border:3px solid #d9ebff;padding:20px;display:flex;flex-direction:column;align-items:center;gap:16px}.target-title{font-size:32px;color:#2d3436;text-transform:capitalize}.hole-wrap{position:relative;width:220px;height:180px;display:flex;align-items:center;justify-content:center}.shape-hole{width:150px;height:150px;border-radius:26px;background:rgba(0,0,0,.14);border:5px dashed rgba(0,0,0,.15);display:flex;align-items:center;justify-content:center;font-size:86px;filter:grayscale(1) brightness(.2);opacity:.8}.shape-drop{position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:86px;opacity:0;transition:transform .45s cubic-bezier(.22,1,.36,1),opacity .2s}
      .shape-drop.is-dropping{opacity:1;transform:translateX(-50%) translateY(78px) scale(1.05)}
      .shape-options{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.shape-option{border:none;background:#fff;border-radius:26px;padding:18px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.08);border:4px solid #fff;transition:transform .12s,border-color .2s;display:flex;flex-direction:column;align-items:center;gap:8px}.shape-option:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.08)}.shape-option.correct{border-color:#4cd137;background:#edfff0}.shape-option.wrong{border-color:#ff6b6b;background:#fff0f0}.shape-option.dim{opacity:.45}.shape-icon{font-size:72px;line-height:1}.shape-name{font-size:22px;color:#2d3436}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.shape-options{grid-template-columns:repeat(2,1fr)}.target-title{font-size:28px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = [...SHAPES].sort(() => Math.random() - 0.5);
    this.currentShape = shuffled[0];
    this.options = shuffled.slice(0, 3).sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-hole').textContent = this.currentShape.icon;
    document.getElementById('instruction-text').textContent = `Find the ${this.currentShape.name}`;
    document.getElementById('helper-text').textContent = 'Tap a shape to drop it into the hole.';
    document.getElementById('shape-drop').className = 'shape-drop';
    document.getElementById('shape-drop').textContent = '';

    const options = document.getElementById('shape-options');
    options.innerHTML = this.options.map((shape) => `
      <button class="shape-option" data-name="${shape.name}">
        <span class="shape-icon">${shape.icon}</span>
        <span class="shape-name">${shape.name}</span>
      </button>
    `).join('');

    options.querySelectorAll('.shape-option').forEach((opt) => {
      opt.onclick = () => this.handlePick(opt);
    });

    setTimeout(() => this.speakInstruction(), 500);
  }

  speakInstruction() {
    if (!this.currentShape) return;
    this.speak(`Put the ${this.currentShape.name} in the hole`, { rate: 0.9 });
  }

  handlePick(opt) {
    if (this.locked) return;
    const name = opt.dataset.name;
    const options = [...this.container.querySelectorAll('.shape-option')];

    if (name === this.currentShape.name) {
      this.locked = true;
      opt.classList.add('correct');
      options.filter((node) => node !== opt).forEach((node) => node.classList.add('dim'));
      const drop = document.getElementById('shape-drop');
      drop.textContent = this.currentShape.icon;
      drop.classList.add('is-dropping');
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `${this.currentShape.name} fits!`;
      this.speak(`Yes! ${this.currentShape.name}!`);
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ burst: this.currentShape.icon, duration: 900 });
      setTimeout(() => this.nextRound(), 1400);
      return;
    }

    opt.classList.add('wrong');
    this.resetCombo();
    this.speak(`Not the ${name}. Try again.`);
    this.coachMove(`Look for the ${this.currentShape.name}.`, 900);
    setTimeout(() => opt.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ShapeSorterGame(container, config);
}
