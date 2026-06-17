/* assets/js/games/0-3/sound-safari.js
   Sound Safari - Ages 0-3

   TTS says an animal name, player taps the matching animal from 4 choices.
   Large 80px+ touch targets, bright playful theme.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const ANIMALS = [
  { name: 'dog', emoji: '🐕', sound: 'woof' },
  { name: 'cat', emoji: '🐱', sound: 'meow' },
  { name: 'cow', emoji: '🐄', sound: 'moo' },
  { name: 'pig', emoji: '🐷', sound: 'oink' },
  { name: 'duck', emoji: '🦆', sound: 'quack' },
  { name: 'sheep', emoji: '🐑', sound: 'baa' },
  { name: 'horse', emoji: '🐴', sound: 'neigh' },
  { name: 'frog', emoji: '🐸', sound: 'ribbit' },
  { name: 'lion', emoji: '🦁', sound: 'roar' },
  { name: 'monkey', emoji: '🐒', sound: 'ooh ah ah' },
  { name: 'elephant', emoji: '🐘', sound: 'trumpet' },
  { name: 'owl', emoji: '🦉', sound: 'hoot' },
  { name: 'chicken', emoji: '🐔', sound: 'cluck' },
  { name: 'bee', emoji: '🐝', sound: 'buzz' },
];

class SoundSafariGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentAnimal = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ss-game">
        <div class="ss-panel">
          <div class="ss-header">
            <div class="pill">⭐ <span id="ss-score">0</span></div>
            <div class="title-wrap">
              <div class="ss-title">🦁 Sound Safari</div>
              <div class="ss-progress" id="ss-progress">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="ss-hear-btn" id="ss-hear-btn">🔊 Hear</button>
          </div>

          <div class="ss-prompt-card">
            <div class="ss-listen-icon">👂</div>
            <div>
              <div class="ss-prompt-label">Find this animal:</div>
              <div class="ss-prompt-animal" id="ss-animal-name">...</div>
            </div>
          </div>

          <div class="ss-animals-grid" id="ss-grid"></div>

          <div class="ss-hint" id="ss-hint">Tap the animal you hear!</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ss-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#ffeaa7 0%,#fdcb6e 50%,#f39c12 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ss-panel{width:min(760px,96%);background:rgba(255,255,255,.95);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.12);padding:22px;display:flex;flex-direction:column;gap:18px}
      .ss-header{display:flex;align-items:center;gap:12px}.pill,.ss-hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.ss-title{font-size:32px;color:#e67e22}.ss-progress{font-size:14px;color:#607d8b}.ss-hear-btn{padding:14px 20px;background:#e74c3c;color:#fff;cursor:pointer;box-shadow:0 6px 0 #c0392b;border-radius:999px;font-size:18px;font-family:inherit}
      .ss-prompt-card{background:linear-gradient(135deg,#fff9ef,#fff);border-radius:26px;border:4px solid #ffe3ad;padding:20px;display:flex;align-items:center;gap:18px}.ss-listen-icon{font-size:72px}.ss-prompt-label{font-size:18px;color:#d35400;text-transform:uppercase;margin-bottom:4px}.ss-prompt-animal{font-size:42px;color:#2d3436;font-weight:700}
      .ss-animals-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}.ss-animal-btn{background:#fff;border:5px solid #dfe6e9;border-radius:28px;padding:20px;min-height:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.08);transition:transform .12s,border-color .2s,box-shadow .12s}.ss-animal-btn:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.08)}.ss-animal-btn.correct{border-color:#00b894;background:#e8fff8}.ss-animal-btn.wrong{border-color:#ff6b6b;background:#fff0f0}.ss-animal-btn.dim{opacity:.4}.ss-animal-btn.highlight{border-color:#fdcb6e;background:#fffbf0;animation:pulse 0.6s ease-in-out infinite alternate}.ss-emoji{font-size:72px}.ss-name{font-size:28px;color:#34495e;text-transform:capitalize}
      .ss-hint{background:#e8f8f5;border:3px solid #00b894;border-radius:20px;padding:16px 20px;text-align:center;font-size:24px;color:#00695c}
      @keyframes pulse{from{transform:scale(1)}to{transform:scale(1.05)}}
      @media (max-width:720px){.ss-animals-grid{grid-template-columns:1fr}.ss-emoji{font-size:64px}.ss-name{font-size:24px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('ss-hear-btn').onclick = () => this.playPrompt();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = [...ANIMALS].sort(() => Math.random() - 0.5);
    this.currentAnimal = shuffled[0];
    this.options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);

    document.getElementById('ss-progress').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('ss-animal-name').textContent = '...';
    document.getElementById('ss-hint').textContent = 'Tap the animal you hear!';

    const grid = document.getElementById('ss-grid');
    grid.innerHTML = this.options.map((animal) => `
      <button class="ss-animal-btn" data-animal="${animal.name}">
        <span class="ss-emoji">${animal.emoji}</span>
        <span class="ss-name">${animal.name}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.ss-animal-btn').forEach((btn) => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.animal);
    });

    setTimeout(() => this.playPrompt(), 600);
  }

  playPrompt() {
    if (!this.currentAnimal) return;
    this.speak(this.currentAnimal.name, { rate: 0.85, pitch: 1.1 });
    document.getElementById('ss-animal-name').textContent = `Which animal is a "${this.currentAnimal.name}"?`;
    
    // Highlight the hear button briefly
    const hearBtn = document.getElementById('ss-hear-btn');
    hearBtn.classList.add('highlight');
    setTimeout(() => hearBtn.classList.remove('highlight'), 600);
  }

  checkAnswer(btn, animalName) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.ss-animal-btn')];

    if (animalName === this.currentAnimal.name) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('ss-score').textContent = this.score;
      document.getElementById('ss-animal-name').textContent = `Yes! ${this.currentAnimal.name}!`;
      document.getElementById('ss-hint').textContent = `${this.currentAnimal.emoji} is the ${this.currentAnimal.name}!`;
      this.speak(`Great job! It is the ${this.currentAnimal.name}!`);
      this.confetti.explode(null, null, 20);
      this.celebrateMove({ burst: this.currentAnimal.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1500);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.speak(`That is ${animalName}. Try again!`);
    this.coachMove(`Tap the ${this.currentAnimal.name}!`, 900);
    setTimeout(() => btn.classList.remove('wrong'), 800);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new SoundSafariGame(container, config);
}