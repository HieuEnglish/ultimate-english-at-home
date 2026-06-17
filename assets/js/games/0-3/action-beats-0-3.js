/* assets/js/games/0-3/action-beats-0-3.js
   Action Beats 0-3 - Ages 0-3

   Simple TTS-led action game with extra large emoji buttons.
   Tap along as the friendly voice asks you to clap, jump, wave, or bounce!
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const ACTIONS = [
  { verb: 'Clap', emoji: '👏', color: '#fdcb6e' },
  { verb: 'Jump', emoji: '🦘', color: '#6c5ce7' },
  { verb: 'Wave', emoji: '👋', color: '#ff7675' },
  { verb: 'Bounce', emoji: '🦘', color: '#00cec9' },
];

class ActionBeats03Game extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentAction = null;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ab03-game">
        <div class="ab03-panel">
          <div class="ab03-header">
            <div class="mascot" id="mascot">🦊</div>
            <div class="speech-bubble" id="speech-bubble">
              <span id="prompt-text">Ready to play?</span>
            </div>
          </div>

          <div class="action-display" id="action-display">
            <div class="big-emoji" id="big-emoji">👋</div>
            <div class="action-name" id="action-name">Wave!</div>
          </div>

          <button class="hear-btn-large" id="hear-btn">🔊 Tap to Hear</button>

          <div class="buttons-row" id="action-buttons"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ab03-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#a29bfe 0%,#6c5ce7 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ab03-panel{width:min(700px,96%);background:rgba(255,255,255,.95);border-radius:32px;box-shadow:0 20px 60px rgba(108,92,231,.35);padding:28px;display:flex;flex-direction:column;align-items:center;gap:24px}
      .ab03-header{display:flex;align-items:center;gap:16px;width:100%}
      .mascot{font-size:72px;min-width:90px;text-align:center}
      .speech-bubble{background:#fff9e6;border:3px solid #fdcb6e;border-radius:20px;padding:14px 20px;font-size:22px;color:#8d6500;flex:1;position:relative}
      .speech-bubble::before{content:'';position:absolute;left:-18px;top:50%;transform:translateY(-50%);border:10px solid transparent;border-right-color:#fdcb6e}
      .speech-bubble::after{content:'';position:absolute;left:-12px;top:50%;transform:translateY(-50%);border:8px solid transparent;border-right-color:#fff9e6}
      .action-display{background:linear-gradient(135deg,#6c5ce7,#a29bfe);border-radius:28px;padding:32px;text-align:center;width:100%}
      .big-emoji{font-size:120px;line-height:1;margin-bottom:12px;animation:bounce-emoji 0.6s ease-in-out infinite alternate}
      .action-name{font-size:48px;color:#fff;text-transform:uppercase;letter-spacing:2px}
      @keyframes bounce-emoji{from{transform:translateY(0)}to{transform:translateY(-12px)}}
      .hear-btn-large{border:none;border-radius:999px;background:#ff7675;color:#fff;font-size:22px;font-weight:800;padding:16px 36px;cursor:pointer;box-shadow:0 8px 0 #d63031;transition:transform .1s,box-shadow .1s;font-family:'Fredoka One',cursive,sans-serif}
      .hear-btn-large:hover{transform:translateY(-2px);box-shadow:0 10px 0 #d63031}
      .hear-btn-large:active{transform:translateY(4px);box-shadow:0 4px 0 #d63031}
      .buttons-row{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
      .action-btn{border:none;border-radius:28px;padding:20px 24px;color:#fff;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.2);font-size:20px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:8px;transition:transform .12s,box-shadow .12s;min-width:140px;font-family:'Fredoka One',cursive,sans-serif}
      .action-btn:hover{transform:translateY(-4px)}
      .action-btn:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.2)}
      .action-btn.correct{outline:6px solid #55efc4;animation:pulse-correct 0.4s ease}
      .action-btn.wrong{outline:6px solid #ff7675;animation:shake-wrong 0.4s ease}
      @keyframes pulse-correct{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
      @keyframes shake-wrong{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
      .btn-emoji{font-size:80px;line-height:1}
      .btn-label{font-size:18px;text-transform:uppercase;letter-spacing:1px}
      @media(max-width:600px){.buttons-row{gap:12px}.action-btn{min-width:120px;padding:16px 18px}.btn-emoji{font-size:64px}.big-emoji{font-size:90px}.action-name{font-size:36px}.ab03-panel{padding:20px;gap:18px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    document.getElementById('hear-btn').onclick = () => this.speakPrompt();
    this.renderButtons();
    setTimeout(() => this.nextAction(), 1200);
  }

  renderButtons() {
    const buttons = document.getElementById('action-buttons');
    buttons.innerHTML = ACTIONS.map((action) => `
      <button class="action-btn" style="background:${action.color}" data-verb="${action.verb}">
        <span class="btn-emoji">${action.emoji}</span>
        <span class="btn-label">${action.verb}</span>
      </button>
    `).join('');

    buttons.querySelectorAll('.action-btn').forEach((btn) => {
      btn.onclick = () => this.triggerAction(btn, btn.dataset.verb);
    });
  }

  nextAction() {
    this.locked = false;
    this.currentAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

    document.getElementById('big-emoji').textContent = this.currentAction.emoji;
    document.getElementById('action-name').textContent = `${this.currentAction.verb}!`;
    document.getElementById('prompt-text').textContent = `Can you ${this.currentAction.verb.toLowerCase()}?`;
    document.getElementById('mascot').textContent = ['🦊', '🐱', '🐶', '🦁'][Math.floor(Math.random() * 4)];

    this.speakPrompt();
  }

  speakPrompt() {
    if (!this.currentAction) return;
    const phrases = [
      `Can you ${this.currentAction.verb.toLowerCase()}?`,
      `Let's ${this.currentAction.verb.toLowerCase()}!`,
      `${this.currentAction.verb}!`,
      `Time to ${this.currentAction.verb.toLowerCase()}!`,
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    this.speak(phrase, { rate: 0.85 });
  }

  triggerAction(btn, verb) {
    if (this.locked) return;
    this.locked = true;

    if (verb === this.currentAction.verb) {
      btn.classList.add('correct');
      this.celebrateMove({ burst: this.currentAction.emoji, duration: 800 });
      this.confetti.explode(null, null, 12);
      document.getElementById('prompt-text').textContent = `${verb}! Amazing!`;
      this.speak(`${verb}! You did it!`, { rate: 0.9 });
      setTimeout(() => {
        btn.classList.remove('correct');
        this.nextAction();
      }, 1500);
    } else {
      btn.classList.add('wrong');
      document.getElementById('prompt-text').textContent = `Try to ${this.currentAction.verb.toLowerCase()}!`;
      this.speak(`Let's ${this.currentAction.verb.toLowerCase()}!`, { rate: 0.85 });
      this.coachMove(`Tap ${this.currentAction.verb}.`, 600);
      setTimeout(() => btn.classList.remove('wrong'), 500);
    }
  }
}

export function createGame(container, config) {
  return new ActionBeats03Game(container, config);
}