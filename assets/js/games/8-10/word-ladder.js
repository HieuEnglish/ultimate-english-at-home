/* assets/js/games/8-10/word-ladder.js
   Word Ladder - Ages 8-10

   Senior pass:
   - Clearer puzzle progression and target visibility
   - Better input flow, stronger validation, and cleaner level completion
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const LEVELS = [
  { start: 'CAT', end: 'DOG', rungs: [{ word: 'CAT', hint: 'Start here' }, { word: 'COT', hint: 'A baby sleeps in a...' }, { word: 'DOT', hint: 'A small circle' }, { word: 'DOG', hint: 'Target word!' }] },
  { start: 'COLD', end: 'WARM', rungs: [{ word: 'COLD', hint: 'Start here' }, { word: 'CORD', hint: 'A rope or wire' }, { word: 'WARD', hint: 'Hospital section' }, { word: 'WARM', hint: 'Target word!' }] },
  { start: 'PIG', end: 'COW', rungs: [{ word: 'PIG', hint: 'Farm animal that oinks' }, { word: 'BIG', hint: 'Opposite of small' }, { word: 'BOG', hint: 'Wet muddy ground' }, { word: 'BOW', hint: 'Bend forward' }, { word: 'COW', hint: 'Target word!' }] },
  { start: 'DARK', end: 'LAMP', rungs: [{ word: 'DARK', hint: 'No light' }, { word: 'DAMP', hint: 'Slightly wet' }, { word: 'LAMP', hint: 'Target word!' }] },
];

class LadderClimberGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentLevelIndex = 0;
    this.currentRungIndex = 1;
    this.currentInput = '';
  }

  async init() {
    this.container.innerHTML = `
      <div class="wl-game">
        <div class="wl-panel">
          <div class="wl-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Word Ladder</div>
              <div class="progress" id="level-num">Level 1</div>
            </div>
            <div class="pill">🪜</div>
          </div>

          <div class="goal-card">
            <div class="goal-word"><span id="start-word">CAT</span> → <span id="end-word">DOG</span></div>
            <div class="hint-box" id="hint-box">Hint: A baby sleeps in a...</div>
          </div>

          <div class="ladder-area" id="ladder-area"></div>
          <div class="keyboard" id="keyboard"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .wl-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#4facfe 0%,#00f2fe 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}.wl-panel{width:min(760px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:16px}.wl-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#0984e3}.progress{font-size:14px;color:#607d8b}
      .goal-card{background:#fff;border:3px solid #d9ebff;border-radius:26px;padding:18px;text-align:center}.goal-word{font-size:34px;color:#2d3436}.hint-box{font-size:20px;color:#4d6273;margin-top:8px}
      .ladder-area{display:flex;flex-direction:column-reverse;gap:10px;align-items:center}.rung{width:min(320px,100%);padding:14px 18px;border-radius:18px;background:#b2bec3;color:#fff;text-align:center;font-size:28px;letter-spacing:4px;box-shadow:0 6px 0 rgba(0,0,0,.08)}.rung.done{background:#00b894}.rung.current{background:#fdcb6e;color:#6b3d00}.rung.end{background:#6c5ce7}.rung.error{background:#ff7675}
      .keyboard{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.key{width:40px;height:46px;border:none;border-radius:10px;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.08);font-weight:800;cursor:pointer}.key.wide{width:84px;background:#ff7675;color:#fff}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.setupKeyboard();
    this.loadLevel();
  }

  setupKeyboard() {
    const kb = document.getElementById('keyboard');
    const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    kb.innerHTML = `${keys.map((ch) => `<button class="key" data-key="${ch}">${ch}</button>`).join('')}<button class="key wide" data-key="DEL">BACK</button>`;
    kb.querySelectorAll('.key').forEach((key) => {
      key.onclick = () => this.handleInput(key.dataset.key);
    });
  }

  loadLevel() {
    if (this.currentLevelIndex >= LEVELS.length) return this.showResults(this.saveScore());
    this.level = JSON.parse(JSON.stringify(LEVELS[this.currentLevelIndex]));
    this.currentRungIndex = 1;
    this.currentInput = '';
    this.inputLength = this.level.rungs[0].word.length;
    document.getElementById('level-num').textContent = `Level ${this.currentLevelIndex + 1}`;
    document.getElementById('start-word').textContent = this.level.start;
    document.getElementById('end-word').textContent = this.level.end;
    this.renderLadder();
  }

  renderLadder() {
    const container = document.getElementById('ladder-area');
    container.innerHTML = this.level.rungs.map((rung, index) => {
      let text = rung.word;
      let cls = 'rung';
      if (index < this.currentRungIndex) cls += ' done';
      else if (index === this.currentRungIndex) { cls += ' current'; text = this.currentInput.padEnd(this.inputLength, '_').split('').join(' '); }
      else if (index === this.level.rungs.length - 1) cls += ' end';
      return `<div class="${cls}" id="rung-${index}">${text}</div>`;
    }).join('');
    document.getElementById('hint-box').textContent = `Hint: ${this.level.rungs[this.currentRungIndex].hint}`;
  }

  handleInput(key) {
    if (key === 'DEL') this.currentInput = this.currentInput.slice(0, -1);
    else if (this.currentInput.length < this.inputLength) this.currentInput += key;
    this.renderLadder();
    if (this.currentInput.length === this.inputLength) this.checkWord();
  }

  checkWord() {
    const target = this.level.rungs[this.currentRungIndex].word;
    const previous = this.level.rungs[this.currentRungIndex - 1].word;
    const changes = [...target].filter((_, i) => target[i] !== previous[i]).length;

    setTimeout(() => {
      if (this.currentInput === target && changes >= 1) {
        this.incrementCombo();
        this.addScore(140);
        document.getElementById('score-val').textContent = this.score;
        this.celebrateMove({ burst: target, duration: 900 });
        this.currentRungIndex += 1;
        this.currentInput = '';
        if (this.currentRungIndex >= this.level.rungs.length) return this.levelComplete();
        this.renderLadder();
        return;
      }

      this.resetCombo();
      const rung = document.getElementById(`rung-${this.currentRungIndex}`);
      rung?.classList.add('error');
      this.coachMove(`That rung should be ${target}.`, 950);
      this.currentInput = '';
      setTimeout(() => { rung?.classList.remove('error'); this.renderLadder(); }, 650);
    }, 180);
  }

  levelComplete() {
    this.confetti.explode(null, null, 20);
    this.celebrateMove({ burst: 'CLIMB', duration: 1000 });
    this.currentLevelIndex += 1;
    setTimeout(() => this.loadLevel(), 1100);
  }
}

export function createGame(container, config) {
  return new LadderClimberGame(container, config);
}
