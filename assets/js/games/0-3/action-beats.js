/* assets/js/games/0-3/action-beats.js
   Action Beats - Ages 0-3

   Senior pass:
   - Upgraded from a button toy into a guided copy-the-move rhythm game
   - Still playful, but now has goals, streaks, progress, and stronger feedback
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const ACTIONS = [
  { verb: 'Clap', emoji: '👏', color: '#fdcb6e' },
  { verb: 'Jump', emoji: '🦘', color: '#6c5ce7' },
  { verb: 'Wave', emoji: '👋', color: '#ff7675' },
  { verb: 'Spin', emoji: '🌀', color: '#00cec9' },
  { verb: 'Dance', emoji: '💃', color: '#e84393' },
  { verb: 'Stomp', emoji: '🦶', color: '#d63031' },
  { verb: 'Wiggle', emoji: '🪱', color: '#74b9ff' },
  { verb: 'March', emoji: '🚶', color: '#a29bfe' },
];

class ActionBeatsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentAction = null;
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ab-game">
        <div class="ab-panel">
          <div class="ab-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Action Beats</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-card">
            <div class="dj-character" id="dj-char">🦊</div>
            <div>
              <div class="target-label">Copy this move</div>
              <div class="target-action" id="target-action">👏 Clap!</div>
              <div class="helper" id="helper-text">Tap the same move below.</div>
            </div>
          </div>

          <div class="buttons-grid" id="action-buttons"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ab-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#2d3436 0%,#000 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ab-panel{width:min(820px,96%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:32px;box-shadow:0 24px 60px rgba(0,0,0,.42);padding:22px;display:flex;flex-direction:column;gap:18px}
      .ab-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:34px;color:#fff}.progress{font-size:14px;color:#b2bec3}.hear-btn{width:54px;height:54px;background:#ff7675;color:#fff;cursor:pointer;box-shadow:0 5px 0 #d63031;font-size:24px}
      .target-card{display:flex;align-items:center;gap:18px;background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.08);border-radius:28px;padding:20px;color:#fff}.dj-character{font-size:100px;min-width:110px;text-align:center}.target-label{font-size:18px;color:#ffeaa7;text-transform:uppercase;letter-spacing:1px}.target-action{font-size:40px;margin-top:6px}.helper{font-size:18px;color:#dfe6e9;margin-top:8px}
      .buttons-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.beat-btn{border:none;border-radius:24px;padding:16px 10px;color:#fff;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.25);font-size:22px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:6px;transition:transform .12s,box-shadow .12s,filter .2s}.beat-btn:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.25)}.beat-btn.correct{outline:4px solid #55efc4}.beat-btn.wrong{filter:grayscale(.35);outline:4px solid #ff7675}.beat-btn.dim{opacity:.45}.beat-emoji{font-size:42px}
      @media (max-width:720px){.buttons-grid{grid-template-columns:repeat(2,1fr)}.target-action{font-size:32px}.target-card{flex-direction:column;text-align:center}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    document.getElementById('hear-btn').onclick = () => this.speakPrompt();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;
    this.currentAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-action').textContent = `${this.currentAction.emoji} ${this.currentAction.verb}!`;
    document.getElementById('helper-text').textContent = 'Tap the same move below.';

    const shuffled = [...ACTIONS].sort(() => Math.random() - 0.5);
    const buttons = document.getElementById('action-buttons');
    buttons.innerHTML = shuffled.map((action) => `
      <button class="beat-btn" style="background:${action.color}" data-verb="${action.verb}">
        <span class="beat-emoji">${action.emoji}</span>
        <span>${action.verb}</span>
      </button>
    `).join('');

    buttons.querySelectorAll('.beat-btn').forEach((btn) => {
      btn.onclick = () => this.triggerAction(btn, btn.dataset.verb);
    });

    setTimeout(() => this.speakPrompt(), 500);
  }

  speakPrompt() {
    if (!this.currentAction) return;
    this.speak(`${this.currentAction.verb}!`, { rate: 0.9 });
  }

  triggerAction(btn, verb) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.beat-btn')];
    const char = document.getElementById('dj-char');
    char.style.transform = 'scale(1.08) rotate(6deg)';
    setTimeout(() => { char.style.transform = ''; }, 220);

    if (verb === this.currentAction.verb) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `${verb}! Nice move!`;
      this.speak(`${verb}! Great job!`);
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ burst: this.currentAction.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1200);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.speak(`${verb}. Try ${this.currentAction.verb}.`);
    this.coachMove(`Copy ${this.currentAction.verb}.`, 900);
    document.getElementById('helper-text').textContent = `Good try. Tap ${this.currentAction.verb}.`;
    setTimeout(() => btn.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ActionBeatsGame(container, config);
}
