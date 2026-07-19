/* assets/js/games/4-7/sight-word-safari.js
   Sight Word Safari - Ages 4-7

   Senior pass:
   - Removed the blurry reveal gimmick and made the target immediately readable
   - Added progress, cleaner word hunt flow, and stronger feedback
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SIGHT_WORDS = [
  'the', 'and', 'a', 'to', 'in', 'is', 'you', 'it', 'for', 'on', 'are', 'with',
  'they', 'at', 'be', 'this', 'have', 'from', 'or', 'one', 'but', 'not', 'all', 'we',
  'can', 'said', 'she', 'do', 'how', 'will', 'up', 'her', 'him', 'has', 'look', 'go', 'come', 'make', 'like'
];

const ANIMALS = ['🦁', '🐘', '🦓', '🦒', '🐒', '🐅', '🦛', '🦏', '🦜', '🦍', '🦩', '🐊'];

class SightWordSafariGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWord = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 10;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="safari-game">
        <div class="safari-panel">
          <div class="safari-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Sight Word Safari</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-panel">
            <div class="target-label">Find this sight word</div>
            <div class="target-word" id="target-word">the</div>
          </div>

          <div class="animal-grid" id="animal-grid"></div>
          <div class="helper" id="helper-text">Read the word, then tap the matching sign.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .safari-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#87CEEB 0%,#E0F6FF 55%,#f6d365 55%,#fda085 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .safari-panel{width:min(820px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}
      .safari-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2d7d46}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#0984e3;color:#fff;cursor:pointer;box-shadow:0 5px 0 #74b9ff;font-size:24px}
      .target-panel{background:#fff;border:3px solid #d9f5df;border-radius:26px;padding:18px;text-align:center}.target-label{font-size:18px;color:#7f8c8d;text-transform:uppercase}.target-word{font-size:44px;color:#00b894}
      .animal-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.animal-card{background:#fff;border:4px solid #fff;border-radius:24px;padding:16px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);transition:transform .12s,border-color .2s}.animal-card:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.animal-card.correct{border-color:#4cd137;background:#edfff0}.animal-card.wrong{border-color:#ff6b6b;background:#fff0f0}.animal-card.dim{opacity:.45}.animal-emoji{font-size:52px}.word-sign{font-size:28px;color:#34495e}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.animal-grid{grid-template-columns:1fr}.target-word{font-size:34px}}
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
    this.currentWord = this.pickFromBag(SIGHT_WORDS, 'sight-words');
    const wrongWords = SIGHT_WORDS.filter((w) => w !== this.currentWord).sort(() => Math.random() - 0.5).slice(0, 3);
    this.options = [this.currentWord, ...wrongWords].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-word').textContent = this.currentWord;
    document.getElementById('helper-text').textContent = 'Read the word, then tap the matching sign.';

    const animals = [...ANIMALS].sort(() => Math.random() - 0.5).slice(0, 4);
    const grid = document.getElementById('animal-grid');
    grid.innerHTML = this.options.map((word, index) => `
      <button class="animal-card" data-word="${word}">
        <div class="animal-emoji">${animals[index]}</div>
        <div class="word-sign">${word}</div>
      </button>
    `).join('');

    grid.querySelectorAll('.animal-card').forEach((card) => {
      card.onclick = () => this.handlePick(card);
    });

    setTimeout(() => this.speakWord(), 450);
  }

  speakWord() {
    if (!this.currentWord) return;
    this.speak(`Find ${this.currentWord}`, { rate: 0.85 });
  }

  handlePick(card) {
    if (this.locked) return;
    const word = card.dataset.word;
    const cards = [...this.container.querySelectorAll('.animal-card')];

    if (word === this.currentWord) {
      this.locked = true;
      card.classList.add('correct');
      cards.filter((node) => node !== card).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(110);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `Yes! You found "${this.currentWord}".`;
      this.speak(`Great! ${this.currentWord}`);
      this.confetti.explode(null, null, 16);
      this.celebrateMove({ burst: this.currentWord.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextRound(), 1200);
      return;
    }

    card.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`That sign says ${word}. Find ${this.currentWord}.`, 1000);
    setTimeout(() => card.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new SightWordSafariGame(container, config);
}
