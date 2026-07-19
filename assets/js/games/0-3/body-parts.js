/* assets/js/games/0-3/body-parts.js
   Body Parts - Ages 0-3

   Senior pass:
   - Cut the vocabulary down to age-appropriate core parts
   - Clearer prompts, bigger targets, stronger character feedback, and progress tracking
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const BODY_PARTS = [
  { name: "head", emoji: "🙂", label: "Head", hint: "Touch your head!" },
  { name: "eyes", emoji: "👀", label: "Eyes", hint: "Blink your eyes!" },
  { name: "nose", emoji: "👃", label: "Nose", hint: "Touch your nose!" },
  { name: "mouth", emoji: "👄", label: "Mouth", hint: "Show your mouth!" },
  { name: "ears", emoji: "👂", label: "Ears", hint: "Touch your ears!" },
  { name: "hands", emoji: "🖐️", label: "Hands", hint: "Tap your hands!" },
  { name: "feet", emoji: "🦶", label: "Feet", hint: "Stomp your feet!" },
  { name: "hair", emoji: "💇", label: "Hair", hint: "Pat your hair!" },
  { name: "arms", emoji: "💪", label: "Arms", hint: "Stretch your arms!" },
  { name: "legs", emoji: "🦵", label: "Legs", hint: "Move your legs!" },
  { name: "tummy", emoji: "👕", label: "Tummy", hint: "Pat your tummy!" },
  { name: "teeth", emoji: "🦷", label: "Teeth", hint: "Show your teeth!" },
];

class BodyPartsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentPart = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="bp-game">
        <div class="bp-room"></div>
        <div class="bp-tablet">
          <div class="bp-header">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="bp-title-wrap">
              <div class="bp-title">My Body</div>
              <div class="bp-progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="speak-btn" id="hear-btn">🔊</button>
          </div>

          <div class="bp-main">
            <div class="character-zone">
              <div class="speech-bubble" id="speech-bubble">Touch your nose!</div>
              <div class="main-char" id="main-char">🧍</div>
              <div class="char-glow" id="char-glow">✨</div>
            </div>

            <div class="parts-grid" id="parts-grid"></div>
          </div>

          <div class="bp-footer">
            <div class="instruction" id="instruction-text">Listen and tap the matching part.</div>
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
      .bp-game{position:relative;min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#fff3b0 0%,#ffd6a5 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center}
      .bp-room{position:absolute;inset:0;background:radial-gradient(circle at 20% 20%,rgba(255,255,255,.4) 0 8px,transparent 9px) 0 0/36px 36px,linear-gradient(180deg,rgba(255,255,255,.18),transparent 50%),linear-gradient(0deg,#f8b195 0 28%,transparent 28%)}
      .bp-tablet{position:relative;z-index:1;width:min(760px,94%);height:520px;background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 20px 50px rgba(0,0,0,.18);padding:20px;display:flex;flex-direction:column;gap:16px}
      .bp-header,.bp-footer{display:flex;align-items:center;justify-content:space-between;gap:12px}.pill,.speak-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#ffef99;color:#9d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.bp-title-wrap{text-align:center;flex:1}.bp-title{font-size:30px;color:#0984e3}.bp-progress{font-size:14px;color:#607d8b}.speak-btn{width:54px;height:54px;background:#74b9ff;color:#fff;cursor:pointer;box-shadow:0 5px 0 #0984e3;font-size:24px}
      .bp-main{flex:1;display:grid;grid-template-columns:1fr 1.1fr;gap:18px;align-items:center}.character-zone{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%}.speech-bubble{background:#fff;padding:12px 18px;border-radius:20px;box-shadow:0 8px 20px rgba(0,0,0,.1);font-size:18px;color:#355c7d;max-width:250px;text-align:center}.main-char{font-size:160px;line-height:1;animation:bpBreathe 2.6s ease-in-out infinite}.char-glow{font-size:42px;opacity:.8;margin-top:8px}
      @keyframes bpBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
      .parts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.part-btn{background:#fff;border:4px solid #dbeeff;border-radius:24px;padding:18px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.07);display:flex;align-items:center;gap:14px;transition:transform .12s,border-color .2s}.part-btn:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.07)}.part-btn.correct{border-color:#4cd137;background:#edfff0}.part-btn.wrong{border-color:#ff6b6b;background:#fff0f0}.part-btn.dim{opacity:.45}.part-emoji{font-size:42px}.part-label{font-size:24px;color:#34495e}
      .bp-footer{justify-content:center;background:#fff8e7;border-radius:20px;padding:14px 18px;border:3px solid #ffe2a5}.instruction{font-size:24px;color:#2d3436;text-align:center}
      @media (max-width:720px){.bp-main{grid-template-columns:1fr}.parts-grid{grid-template-columns:1fr}.main-char{font-size:128px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.speakPrompt();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = this.shuffleWithBagFirst(BODY_PARTS, 'body-parts');
    this.currentPart = shuffled[0];
    this.options = [this.currentPart, ...shuffled.slice(1, 3)].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('main-char').textContent = '🧍';
    document.getElementById('char-glow').textContent = '✨';
    document.getElementById('speech-bubble').textContent = this.currentPart.hint;
    document.getElementById('instruction-text').textContent = 'Listen and tap the matching part.';

    const grid = document.getElementById('parts-grid');
    grid.innerHTML = this.options.map((part) => `
      <button class="part-btn" data-part="${part.name}">
        <span class="part-emoji">${part.emoji}</span>
        <span class="part-label">${part.label}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.part-btn').forEach((btn) => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.part);
    });

    setTimeout(() => this.speakPrompt(), 500);
  }

  speakPrompt() {
    if (!this.currentPart) return;
    this.speak(`Touch your ${this.currentPart.name}`, { rate: 0.9 });
    document.getElementById('instruction-text').textContent = `Touch your ${this.currentPart.label}!`;
  }

  checkAnswer(btn, partName) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.part-btn')];

    if (partName === this.currentPart.name) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('main-char').textContent = '🤩';
      document.getElementById('char-glow').textContent = this.currentPart.emoji;
      document.getElementById('speech-bubble').textContent = `Yes! ${this.currentPart.label}!`;
      document.getElementById('instruction-text').textContent = `Great job! ${this.currentPart.hint}`;
      this.speak(`Yes! ${this.currentPart.label}!`);
      this.confetti.explode(null, null, 24);
      this.celebrateMove({ burst: this.currentPart.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1400);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.speak(`That is ${partName}. Try again.`);
    this.coachMove(`Keep looking for ${this.currentPart.label}.`, 900);
    document.getElementById('speech-bubble').textContent = `Find ${this.currentPart.label}!`;
    setTimeout(() => btn.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new BodyPartsGame(container, config);
}
