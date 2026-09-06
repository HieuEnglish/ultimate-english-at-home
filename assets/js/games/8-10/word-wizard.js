/* assets/js/games/8-10/word-wizard.js
   Word Wizard - Ages 8-10

   Senior pass:
   - Reworked the battle loop so each spell is a deliberate challenge instead of brittle instant punishment
   - Clearer attack/defend rhythm, better health flow, and proper ending
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SPELLS = [
  { word: 'MYSTERY', hint: 'Something unknown' },
  { word: 'ANCIENT', hint: 'Very old' },
  { word: 'KNIGHT', hint: 'Warrior in armor' },
  { word: 'CASTLE', hint: "King's home" },
  { word: 'DRAGON', hint: 'Fire breather' },
  { word: 'MAGIC', hint: 'Supernatural power' },
  { word: 'SHIELD', hint: 'Protection gear' },
  { word: 'FOREST', hint: 'Many trees' },
  { word: 'CRYSTAL', hint: 'Shiny stone' },
  { word: 'LEGEND', hint: 'Famous story' },
];

class WordWizardGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.playerHealth = 100;
    this.monsterHealth = 100;
    this.currentSpell = null;
    this.inputBuffer = '';
    this.wrongAttemptsThisTurn = 0;
    this.monsters = ['🐲', '👹', '🧌', '👾'];
  }

  async init() {
    this.container.innerHTML = `
      <div class="wwiz-game">
        <div class="wwiz-panel">
          <div class="wwiz-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Word Wizard</div>
              <div class="subtitle">Cast spelling spells to defeat the monster.</div>
            </div>
            <div class="pill">✨</div>
          </div>

          <div class="battle-scene">
            <div class="character player">
              <div class="health-bar"><div class="hp-fill player-fill" id="player-hp" style="width:100%"></div></div>
              <div class="avatar">🧙‍♂️</div>
            </div>
            <div class="vs-badge">VS</div>
            <div class="character monster">
              <div class="health-bar"><div class="hp-fill monster-fill" id="monster-hp" style="width:100%"></div></div>
              <div class="avatar" id="monster-avatar">🐲</div>
            </div>
          </div>

          <div class="spell-book">
            <div class="spell-hint" id="spell-hint">Hint: Very old</div>
            <div class="spell-display" id="spell-display"></div>
            <div class="helper" id="helper-text">Tap the letters to complete the spell.</div>
          </div>

          <div class="keyboard-area" id="keyboard"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .wwiz-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#2d3436 0%,#1b1b2f 100%);font-family:'Fredoka One',cursive,sans-serif;color:#fff;display:flex;align-items:center;justify-content:center;padding:20px}.wwiz-panel{width:min(820px,96%);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:34px;box-shadow:0 24px 60px rgba(0,0,0,.35);padding:22px;display:flex;flex-direction:column;gap:16px}.wwiz-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.subtitle{font-size:14px;color:#c7cfdb}
      .battle-scene{display:flex;justify-content:space-around;align-items:center;padding:10px 0}.character{text-align:center}.avatar{font-size:92px;transition:transform .2s}.health-bar{width:120px;height:14px;background:#636e72;border-radius:999px;overflow:hidden;margin:0 auto 10px}.hp-fill{height:100%;transition:width .3s}.player-fill{background:#00b894}.monster-fill{background:#d63031}.vs-badge{font-size:34px;color:#fdcb6e}
      .spell-book{background:rgba(0,0,0,.4);border:3px solid rgba(255,255,255,.08);border-radius:24px;padding:18px;text-align:center}.spell-hint{font-size:18px;color:#fab1a0;margin-bottom:8px}.spell-display{font-family:'Courier New',monospace;font-size:34px;letter-spacing:6px;color:#ffeaa7;min-height:46px}.spell-char.done{color:#55efc4}.spell-char.current{color:#fff;text-decoration:underline;text-underline-offset:8px}.spell-char.pending{color:rgba(255,255,255,.35)}.helper{font-size:18px;color:#dfe6e9;margin-top:10px}
      .keyboard-area{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.key-btn{width:44px;height:48px;border:none;border-radius:10px;background:#6c5ce7;color:#fff;font-size:18px;font-weight:800;cursor:pointer;box-shadow:0 4px 0 #4834d4}.key-btn:active{transform:translateY(2px);box-shadow:0 2px 0 #4834d4}.key-btn.used{opacity:.5}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.score = 0;
    this.playerHealth = 100;
    this.monsterHealth = 100;
    document.getElementById('monster-avatar').textContent = this.monsters[Math.floor(Math.random() * this.monsters.length)];
    this.setupKeyboard();
    this.nextTurn();
  }

  setupKeyboard() {
    const kb = document.getElementById('keyboard');
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    kb.innerHTML = keys.map((k) => `<button class="key-btn" data-key="${window.UEAH_SAFE.escapeAttr(k)}">${window.UEAH_SAFE.escapeHtml(k)}</button>`).join('');
    kb.querySelectorAll('.key-btn').forEach((btn) => {
      btn.onclick = () => this.handleInput(btn.dataset.key);
    });
  }

  nextTurn() {
    if (this.monsterHealth <= 0) return this.endGame(true);
    if (this.playerHealth <= 0) return this.endGame(false);
    this.currentSpell = this.pickFromBag(SPELLS, 'spells');
    this.inputBuffer = '';
    this.wrongAttemptsThisTurn = 0;
    document.getElementById('spell-hint').textContent = `Hint: ${this.currentSpell.hint}`;
    document.getElementById('helper-text').textContent = 'Tap the letters to complete the spell.';
    this.renderWord();
  }

  renderWord() {
    const display = document.getElementById('spell-display');
    display.innerHTML = this.currentSpell.word.split('').map((char, i) => {
      let cls = 'spell-char ';
      if (i < this.inputBuffer.length) cls += 'done';
      else if (i === this.inputBuffer.length) cls += 'current';
      else cls += 'pending';
      return `<span class="${cls}">${i < this.inputBuffer.length ? this.inputBuffer[i] : '_'}</span>`;
    }).join('');
  }

  handleInput(char) {
    if (!this.currentSpell || this.inputBuffer.length >= this.currentSpell.word.length) return;
    const expected = this.currentSpell.word[this.inputBuffer.length];
    if (char === expected) {
      this.inputBuffer += char;
      this.renderWord();
      if (this.inputBuffer.length === this.currentSpell.word.length) this.castSpell();
      return;
    }

    this.wrongAttemptsThisTurn += 1;
    Animations.shake(document.getElementById('spell-display'));
    document.getElementById('helper-text').textContent = `That letter does not fit. Try again.`;
    this.coachMove('That rune does not fit the spell.', 800);
    if (this.wrongAttemptsThisTurn % 2 === 0) this.takeDamage(8);
  }

  castSpell() {
    this.incrementCombo();
    this.addScore(140);
    document.getElementById('score-val').textContent = this.score;
    document.getElementById('helper-text').textContent = `${this.currentSpell.word} hits the monster!`;
    this.celebrateMove({ burst: this.currentSpell.word, duration: 900 });
    this.damageMonster(22);
    setTimeout(() => this.nextTurn(), 1100);
  }

  damageMonster(amount) {
    this.monsterHealth = Math.max(0, this.monsterHealth - amount);
    document.getElementById('monster-hp').style.width = `${this.monsterHealth}%`;
    this.container.querySelector('.monster .avatar').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(18px)' }, { transform: 'translateX(0)' }], { duration: 220 });
    this.confetti.explode(this.container.querySelector('.monster'), null, 10);
  }

  takeDamage(amount) {
    this.playerHealth = Math.max(0, this.playerHealth - amount);
    document.getElementById('player-hp').style.width = `${this.playerHealth}%`;
    this.container.querySelector('.player .avatar').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-18px)' }, { transform: 'translateX(0)' }], { duration: 220 });
    if (this.playerHealth <= 0) setTimeout(() => this.endGame(false), 300);
  }

  endGame(win) {
    if (win) {
      this.addScore(300);
      document.getElementById('score-val').textContent = this.score;
      this.confetti.explode(null, null, 30);
      this.celebrateMove({ burst: 'VICTORY', duration: 1200 });
    } else {
      this.coachMove('The monster won this battle.', 1200);
    }
    setTimeout(() => this.showResults(this.saveScore()), 1000);
  }
}

export function createGame(container, config) {
  return new WordWizardGame(container, config);
}
