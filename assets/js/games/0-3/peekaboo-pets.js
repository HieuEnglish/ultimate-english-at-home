/* assets/js/games/0-3/peekaboo-pets.js
   Peekaboo Pets - Ages 0-3

   Senior pass:
   - Added a brief learning phase before hiding so it's not pure blind guessing
   - Clearer prompts, progress, better retry flow, and stronger reveal feedback
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const PETS = [
  { name: "Dog", emoji: "🐶" },
  { name: "Cat", emoji: "🐱" },
  { name: "Mouse", emoji: "🐭" },
  { name: "Bunny", emoji: "🐰" },
  { name: "Fox", emoji: "🦊" },
  { name: "Bear", emoji: "🐻" },
  { name: "Panda", emoji: "🐼" },
  { name: "Koala", emoji: "🐨" },
  { name: "Tiger", emoji: "🐯" },
  { name: "Lion", emoji: "🦁" },
  { name: "Monkey", emoji: "🐒" },
  { name: "Penguin", emoji: "🐧" },
];

class PeekabooPetsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentPet = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.isLocked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="pp-game">
        <div class="pp-panel">
          <div class="pp-header">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Peekaboo Pets</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="guide-card">
            <div class="guide-emoji" id="guide-emoji">🫣</div>
            <div class="guide-text" id="guide-text">Watch closely. One pet is about to hide!</div>
          </div>

          <div class="hiding-spots" id="hiding-spots"></div>

          <div class="helper" id="helper-text">First look, then find the pet.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .pp-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#81ecec 0%,#55efc4 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .pp-panel{width:min(760px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.16);padding:22px;display:flex;flex-direction:column;gap:18px}
      .pp-header{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#0e9f6e}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#00b894;color:#fff;cursor:pointer;box-shadow:0 5px 0 #008f72;font-size:24px}
      .guide-card{background:linear-gradient(135deg,#fff9ef,#fff);border-radius:26px;border:3px solid #d9ffef;padding:18px;display:flex;align-items:center;gap:16px}.guide-emoji{font-size:66px}.guide-text{font-size:28px;color:#2d3436;line-height:1.2}
      .hiding-spots{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.hiding-card{position:relative;height:180px;border:none;background:transparent;cursor:pointer;perspective:1000px}.card-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .55s}.hiding-card.revealed .card-inner{transform:rotateY(180deg)}.card-face{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;border-radius:28px;backface-visibility:hidden;box-shadow:0 12px 20px rgba(0,0,0,.12)}.card-front{background:linear-gradient(135deg,#ffeaa7,#fdcb6e);font-size:82px;border:4px solid #fff4ca}.card-back{transform:rotateY(180deg);background:#fff;border:4px solid #d9ebff;font-size:90px}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.hiding-spots{grid-template-columns:1fr}.guide-text{font-size:24px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.isLocked = false;
    document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.isLocked = true;

    const shuffled = [...PETS].sort(() => Math.random() - 0.5);
    this.options = shuffled.slice(0, 3);
    this.currentPet = this.options[Math.floor(Math.random() * this.options.length)];

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('guide-emoji').textContent = this.currentPet.emoji;
    document.getElementById('guide-text').textContent = `Watch the ${this.currentPet.name}. It will hide!`;
    document.getElementById('helper-text').textContent = 'Look first... then the cards will flip.';

    const spots = document.getElementById('hiding-spots');
    spots.innerHTML = this.options.map((pet, index) => `
      <button class="hiding-card revealed" data-index="${index}">
        <div class="card-inner">
          <div class="card-face card-front">🌳</div>
          <div class="card-face card-back">${pet.emoji}</div>
        </div>
      </button>
    `).join('');

    spots.querySelectorAll('.hiding-card').forEach((card) => {
      card.onclick = () => this.handleCardClick(card);
    });

    this.speak(`Watch the ${this.currentPet.name}`, { rate: 0.9 });
    setTimeout(() => {
      spots.querySelectorAll('.hiding-card').forEach((card) => card.classList.remove('revealed'));
      this.isLocked = false;
      this.speakInstruction();
      document.getElementById('guide-emoji').textContent = '🫣';
      document.getElementById('guide-text').textContent = `Where is the ${this.currentPet.name}?`;
      document.getElementById('helper-text').textContent = 'Tap the card where the pet is hiding.';
    }, 1400);
  }

  speakInstruction() {
    if (!this.currentPet) return;
    this.speak(`Where is the ${this.currentPet.name}?`, { rate: 0.9 });
  }

  handleCardClick(card) {
    if (this.isLocked) return;
    const index = Number(card.dataset.index);
    const pet = this.options[index];
    card.classList.add('revealed');

    if (pet.name === this.currentPet.name) {
      this.isLocked = true;
      this.addScore(100);
      this.incrementCombo();
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('guide-emoji').textContent = pet.emoji;
      document.getElementById('guide-text').textContent = `You found the ${pet.name}!`;
      document.getElementById('helper-text').textContent = 'Peekaboo! Another pet is coming.';
      this.speak(`You found the ${pet.name}!`);
      this.confetti.explode(null, null, 20);
      this.celebrateMove({ burst: pet.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1500);
      return;
    }

    this.resetCombo();
    this.speak(`That is ${pet.name}. Try again.`);
    this.coachMove(`That was ${pet.name}. Find ${this.currentPet.name}.`, 900);
    setTimeout(() => card.classList.remove('revealed'), 900);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new PeekabooPetsGame(container, config);
}
