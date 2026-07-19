/* assets/js/games/0-3/fruit-basket.js
   Fruit Basket - Ages 0-3

   Senior pass:
   - Added a visible target card, basket fill progression, and better feedback
   - Keeps the simple picking mechanic, but makes each round feel more rewarding
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const FRUITS = [
  { name: 'Apple', emoji: '🍎', color: '#fab1a0' },
  { name: 'Banana', emoji: '🍌', color: '#ffeaa7' },
  { name: 'Grapes', emoji: '🍇', color: '#a29bfe' },
  { name: 'Orange', emoji: '🍊', color: '#fdcb6e' },
  { name: 'Strawberry', emoji: '🍓', color: '#ff7675' },
  { name: 'Watermelon', emoji: '🍉', color: '#55efc4' },
  { name: 'Lemon', emoji: '🍋', color: '#ffe66d' },
  { name: 'Peach', emoji: '🍑', color: '#ffb4a2' },
  { name: 'Pineapple', emoji: '🍍', color: '#ffd166' },
  { name: 'Cherry', emoji: '🍒', color: '#ff7675' },
  { name: 'Pear', emoji: '🍐', color: '#8fd694' },
  { name: 'Mango', emoji: '🥭', color: '#f6bd60' },
];

class FruitBasketGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentFruit = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
    this.basketFruit = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="fb-game">
        <div class="fb-panel">
          <div class="fb-header">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Fruit Basket</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-card">
            <div class="target-emoji" id="target-emoji">🍎</div>
            <div>
              <div class="target-label">Pick this fruit</div>
              <div class="target-text" id="instruction-text">Pick the Apple</div>
            </div>
            <div class="basket-visual">
              <div class="basket-icon">🧺</div>
              <div class="basket-fill" id="basket-fill"></div>
            </div>
          </div>

          <div class="fruit-grid" id="fruit-grid"></div>

          <div class="helper" id="helper-text">Fill the basket with yummy fruit.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .fb-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#81ecec 0%,#ffeaa7 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .fb-panel{width:min(780px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:18px}
      .fb-header{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#e17055}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#74b9ff;color:#fff;cursor:pointer;box-shadow:0 5px 0 #0984e3;font-size:24px}
      .target-card{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;background:linear-gradient(135deg,#fff9ef,#fff);border-radius:26px;border:3px solid #ffe2a5;padding:18px}.target-emoji{font-size:76px}.target-label{font-size:18px;color:#d35400;text-transform:uppercase}.target-text{font-size:32px;color:#2d3436}.basket-visual{text-align:center;min-width:120px}.basket-icon{font-size:70px;line-height:1}.basket-fill{min-height:38px;font-size:24px;display:flex;justify-content:center;flex-wrap:wrap;gap:4px;margin-top:4px}
      .fruit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.fruit-item{border:none;background:#fff;border-radius:28px;padding:18px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.08);border:4px solid #fff;display:flex;flex-direction:column;align-items:center;gap:8px;transition:transform .12s,border-color .2s}.fruit-item:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.08)}.fruit-item.correct{border-color:#4cd137;background:#edfff0}.fruit-item.wrong{border-color:#ff6b6b;background:#fff0f0}.fruit-item.dim{opacity:.45}.fruit-emoji{font-size:76px}.fruit-name{font-size:24px;color:#34495e}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.fruit-grid{grid-template-columns:1fr}.target-card{grid-template-columns:1fr;text-align:center}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    this.basketFruit = [];
    document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = this.shuffleWithBagFirst(FRUITS, 'fruits');
    this.currentFruit = shuffled[0];
    this.options = shuffled.slice(0, 3).sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-emoji').textContent = this.currentFruit.emoji;
    document.getElementById('instruction-text').textContent = `Pick the ${this.currentFruit.name}`;
    document.getElementById('helper-text').textContent = 'Fill the basket with yummy fruit.';
    document.getElementById('basket-fill').innerHTML = this.basketFruit.map((fruit) => `<span>${fruit}</span>`).join('');

    const grid = document.getElementById('fruit-grid');
    grid.innerHTML = this.options.map((fruit) => `
      <button class="fruit-item" data-name="${fruit.name}">
        <span class="fruit-emoji">${fruit.emoji}</span>
        <span class="fruit-name">${fruit.name}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.fruit-item').forEach((item) => {
      item.onclick = () => this.handlePick(item);
    });

    setTimeout(() => this.speakInstruction(), 450);
  }

  speakInstruction() {
    if (!this.currentFruit) return;
    this.speak(`Pick the ${this.currentFruit.name}`, { rate: 0.9 });
  }

  handlePick(item) {
    if (this.locked) return;
    const name = item.dataset.name;
    const items = [...this.container.querySelectorAll('.fruit-item')];

    if (name === this.currentFruit.name) {
      this.locked = true;
      item.classList.add('correct');
      items.filter((node) => node !== item).forEach((node) => node.classList.add('dim'));
      this.basketFruit.push(this.currentFruit.emoji);
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('basket-fill').innerHTML = this.basketFruit.map((fruit) => `<span>${fruit}</span>`).join('');
      document.getElementById('helper-text').textContent = `Yummy! ${this.currentFruit.name} goes in the basket.`;
      this.speak(`Yummy! ${this.currentFruit.name}!`);
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ burst: this.currentFruit.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1300);
      return;
    }

    item.classList.add('wrong');
    this.resetCombo();
    this.speak(`That is ${name}. Try again.`);
    this.coachMove(`Find the ${this.currentFruit.name}.`, 900);
    setTimeout(() => item.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new FruitBasketGame(container, config);
}
