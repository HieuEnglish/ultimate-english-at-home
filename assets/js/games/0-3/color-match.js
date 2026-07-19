/* assets/js/games/0-3/color-match.js
   Color Match - Ages 0-3

   Senior pass:
   - Reduced advanced colors to toddler-friendly basics
   - Added large labeled targets, object cues, progress, and clearer wins
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const COLORS = [
  { name: "red", hex: "#ff6b6b", emoji: "🍎" },
  { name: "blue", hex: "#74b9ff", emoji: "🐟" },
  { name: "green", hex: "#55efc4", emoji: "🍀" },
  { name: "yellow", hex: "#ffe66d", emoji: "🌞" },
  { name: "purple", hex: "#a29bfe", emoji: "🍇" },
  { name: "orange", hex: "#ff9f43", emoji: "🍊" },
  { name: "pink", hex: "#fd79a8", emoji: "🌸" },
  { name: "brown", hex: "#8d6e63", emoji: "🐻" },
];

class ColorMatchGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentColor = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="cm-game">
        <div class="cm-bg"></div>
        <div class="cm-panel">
          <div class="cm-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Color Match</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-zone">
            <div class="paint-splat" id="target-splat"></div>
            <div class="target-center" id="target-center">🎨</div>
            <div class="target-label" id="instruction-text">Find red!</div>
          </div>

          <div class="options-row" id="options-row"></div>

          <div class="helper" id="helper-text">Tap the color that matches the big splash.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cm-game{position:relative;min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#a8edea 0%,#fed6e3 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center}
      .cm-bg{position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,rgba(255,255,255,.5) 0 12px,transparent 13px) 0 0/80px 80px,radial-gradient(circle at 70% 40%,rgba(255,255,255,.35) 0 10px,transparent 11px) 0 0/110px 110px}
      .cm-panel{position:relative;z-index:1;width:min(760px,94%);background:rgba(255,255,255,.9);border:5px solid #fff;border-radius:34px;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:20px}
      .cm-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#ff6b6b}.progress{font-size:14px;color:#5c6b73}.hear-btn{width:54px;height:54px;background:#74b9ff;color:#fff;cursor:pointer;font-size:24px;box-shadow:0 5px 0 #0984e3}
      .target-zone{position:relative;height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#fff9ef,#fff);border-radius:28px;border:3px solid #ffe7a0}.paint-splat{position:absolute;width:200px;height:200px;border-radius:38% 62% 54% 46% / 52% 42% 58% 48%;box-shadow:inset 0 -14px 0 rgba(255,255,255,.18),0 14px 30px rgba(0,0,0,.12);transition:transform .2s}.target-center{position:relative;z-index:1;font-size:84px}.target-label{position:relative;z-index:1;margin-top:8px;font-size:34px;color:#2d3436;text-transform:capitalize}
      .options-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.color-btn{border:none;border-radius:26px;padding:16px 12px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.08);display:flex;flex-direction:column;align-items:center;gap:8px;transition:transform .12s,border-color .2s;border:4px solid #fff}.color-btn:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.08)}.color-btn.correct{border-color:#4cd137}.color-btn.wrong{border-color:#ff6b6b;filter:saturate(.65)}.color-btn.dim{opacity:.45}.color-dot{width:72px;height:72px;border-radius:22px;box-shadow:inset 0 -10px 0 rgba(0,0,0,.1)}.color-name{font-size:22px;color:#2d3436;text-transform:capitalize}.color-emoji{font-size:32px}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.options-row{grid-template-columns:repeat(2,1fr)}.target-label{font-size:28px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.speakColor();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = this.shuffleWithBagFirst(COLORS, 'colors');
    this.currentColor = shuffled[0];
    this.options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-splat').style.background = this.currentColor.hex;
    document.getElementById('target-splat').style.transform = `rotate(${Math.round(Math.random() * 20 - 10)}deg) scale(1)`;
    document.getElementById('target-center').textContent = this.currentColor.emoji;
    document.getElementById('instruction-text').textContent = `Find ${this.currentColor.name}!`;
    document.getElementById('helper-text').textContent = 'Tap the color that matches the big splash.';

    const row = document.getElementById('options-row');
    row.innerHTML = this.options.map((color) => `
      <button class="color-btn" data-color="${color.name}">
        <span class="color-dot" style="background:${color.hex}"></span>
        <span class="color-emoji">${color.emoji}</span>
        <span class="color-name">${color.name}</span>
      </button>
    `).join('');

    row.querySelectorAll('.color-btn').forEach((btn) => {
      btn.onclick = () => this.checkColor(btn, btn.dataset.color);
    });

    setTimeout(() => this.speakColor(), 500);
  }

  speakColor() {
    if (!this.currentColor) return;
    this.speak(`Find ${this.currentColor.name}`, { rate: 0.9 });
  }

  checkColor(btn, colorName) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.color-btn')];

    if (colorName === this.currentColor.name) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('target-center').textContent = '🤩';
      document.getElementById('helper-text').textContent = `${this.currentColor.name} is a match!`;
      this.speak(`Yes! ${this.currentColor.name}!`);
      this.confetti.explode(null, null, 20);
      this.celebrateMove({ burst: this.currentColor.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1300);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.speak(`Not ${colorName}. Try ${this.currentColor.name}.`);
    this.coachMove(`Look for ${this.currentColor.name}.`, 900);
    setTimeout(() => btn.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ColorMatchGame(container, config);
}
