/* assets/js/games/0-3/opposite-match.js
   Opposite Match - Ages 0-3

   TTS says a word, player taps the opposite.
   Large targets, simple concepts, emoji visuals.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const OPPOSITES = [
  { word: "big", emoji: "🐘", opposite: "small", oppositeEmoji: "🐜" },
  { word: "small", emoji: "🐜", opposite: "big", oppositeEmoji: "🐘" },
  { word: "hot", emoji: "🔥", opposite: "cold", oppositeEmoji: "❄️" },
  { word: "cold", emoji: "❄️", opposite: "hot", oppositeEmoji: "🔥" },
  { word: "happy", emoji: "😊", opposite: "sad", oppositeEmoji: "😢" },
  { word: "sad", emoji: "😢", opposite: "happy", oppositeEmoji: "😊" },
  { word: "fast", emoji: "⚡", opposite: "slow", oppositeEmoji: "🐢" },
  { word: "slow", emoji: "🐢", opposite: "fast", oppositeEmoji: "⚡" },
  { word: "up", emoji: "⬆️", opposite: "down", oppositeEmoji: "⬇️" },
  { word: "down", emoji: "⬇️", opposite: "up", oppositeEmoji: "⬆️" },
  { word: "open", emoji: "📖", opposite: "closed", oppositeEmoji: "📕" },
  { word: "closed", emoji: "📕", opposite: "open", oppositeEmoji: "📖" },
  { word: "full", emoji: "🥛", opposite: "empty", oppositeEmoji: "🥛" },
  { word: "empty", emoji: "🥛", opposite: "full", oppositeEmoji: "🥛" },
  { word: "loud", emoji: "📢", opposite: "quiet", oppositeEmoji: "🤫" },
  { word: "quiet", emoji: "🤫", opposite: "loud", oppositeEmoji: "📢" },
  { word: "wet", emoji: "🌧️", opposite: "dry", oppositeEmoji: "☀️" },
  { word: "dry", emoji: "☀️", opposite: "wet", oppositeEmoji: "🌧️" },
];

class OppositeMatchGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentPair = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="op-game">
        <div class="op-bg"></div>
        <div class="op-panel">
          <div class="op-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Opposite Match</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-zone">
            <div class="target-emoji" id="target-emoji">❓</div>
            <div class="target-label" id="instruction-text">Tap the opposite!</div>
            <div class="target-word" id="target-word">...</div>
          </div>

          <div class="options-row" id="options-row"></div>

          <div class="helper" id="helper-text">Tap the picture that is the OPPOSITE!</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .op-game{position:relative;min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#a8e6cf 0%,#dcedc1 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center}
      .op-bg{position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,rgba(255,255,255,.5) 0 12px,transparent 13px) 0 0/80px 80px,radial-gradient(circle at 70% 40%,rgba(255,255,255,.35) 0 10px,transparent 11px) 0 0/110px 110px}
      .op-panel{position:relative;z-index:1;width:min(760px,94%);background:rgba(255,255,255,.9);border:5px solid #fff;border-radius:34px;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:20px}
      .op-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2ecc71}.progress{font-size:14px;color:#5c6b73}.hear-btn{width:54px;height:54px;background:#2ecc71;color:#fff;cursor:pointer;font-size:24px;box-shadow:0 5px 0 #27ae60}
      .target-zone{position:relative;height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#e8f8f5,#fff);border-radius:28px;border:3px solid #a8e6cf}.target-emoji{font-size:100px;transition:transform .3s}.target-label{font-size:32px;color:#2d3436;margin-top:6px}.target-word{font-size:28px;color:#27ae60;margin-top:4px;text-transform:uppercase;letter-spacing:2px}
      .options-row{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:480px;margin:0 auto}.op-btn{border:none;border-radius:26px;padding:20px 16px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.1);display:flex;flex-direction:column;align-items:center;gap:12px;transition:transform .12s,border-color .2s;border:5px solid #fff;background:#fff;min-height:140px}.op-btn:active{transform:translateY(8px);box-shadow:0 2px 0 rgba(0,0,0,.1)}.op-btn.correct{border-color:#2ecc71;background:#e8f8f5}.op-btn.wrong{border-color:#e74c3c;background:#fee}.op-btn.dim{opacity:.4}.op-emoji{font-size:80px;line-height:1}.op-word{font-size:28px;color:#2d3436;text-transform:capitalize;font-weight:700}
      .helper{background:#e8f8f5;border:3px solid #a8e6cf;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:520px){.options-row{max-width:100%}.op-btn{min-height:120px}.op-emoji{font-size:64px}.op-word{font-size:24px}}
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

    const shuffled = this.shuffleWithBagFirst(OPPOSITES, 'opposites');
    this.currentPair = shuffled[0];

    // Build options: one correct opposite + 3 random others
    const otherPairs = shuffled.slice(1, 4);
    const wrongOptions = otherPairs.map(p => ({
      word: p.word,
      emoji: p.emoji,
      isCorrect: false
    }));

    this.options = [
      {
        word: this.currentPair.opposite,
        emoji: this.currentPair.oppositeEmoji,
        isCorrect: true
      },
      ...wrongOptions
    ].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-emoji').textContent = this.currentPair.emoji;
    document.getElementById('target-word').textContent = this.currentPair.word;
    document.getElementById('instruction-text').textContent = `Find the OPPOSITE!`;
    document.getElementById('helper-text').textContent = `What is the opposite of "${this.currentPair.word}"?`;

    const row = document.getElementById('options-row');
    row.innerHTML = this.options.map((opt, i) => `
      <button class="op-btn" data-index="${i}" data-correct="${opt.isCorrect}">
        <span class="op-emoji">${opt.emoji}</span>
        <span class="op-word">${opt.word}</span>
      </button>
    `).join('');

    row.querySelectorAll('.op-btn').forEach((btn) => {
      btn.onclick = () => this.checkAnswer(btn);
    });

    setTimeout(() => this.speakWord(), 500);
  }

  speakWord() {
    if (!this.currentPair) return;
    this.speak(`What is the opposite of ${this.currentPair.word}?`, { rate: 0.85 });
  }

  checkAnswer(btn) {
    if (this.locked) return;
    this.locked = true;

    const isCorrect = btn.dataset.correct === 'true';
    const buttons = [...this.container.querySelectorAll('.op-btn')];

    if (isCorrect) {
      btn.classList.add('correct');
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `Yes! ${this.currentPair.opposite} is the opposite!`;
      this.speak(`Yes! ${this.currentPair.opposite}! Great job!`);
      this.confetti.explode(null, null, 20);
      this.celebrateMove({ burst: this.currentPair.oppositeEmoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1300);
    } else {
      btn.classList.add('wrong');
      this.resetCombo();

      // Find and highlight correct answer
      const correctBtn = buttons.find(b => b.dataset.correct === 'true');
      correctBtn.classList.add('dim');

      this.speak(`Try again! Find ${this.currentPair.opposite}.`);
      this.coachMove(`The opposite of ${this.currentPair.word} is ${this.currentPair.opposite}.`, 1000);

      setTimeout(() => {
        btn.classList.remove('wrong');
        correctBtn.classList.remove('dim');
        this.locked = false;
      }, 1200);
    }
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new OppositeMatchGame(container, config);
}
