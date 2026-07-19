/* assets/js/games/0-3/animal-sounds.js
   Animal Sounds - Ages 0-3

   Senior pass:
   - Clear round structure, stronger prompts, progress, and better retries
   - Removed dead controls and made the listening loop easier to understand
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const ANIMALS = [
  { name: 'dog', emoji: '🐕', sound: 'woof woof' },
  { name: 'cat', emoji: '🐱', sound: 'meow meow' },
  { name: 'cow', emoji: '🐄', sound: 'moo moo' },
  { name: 'pig', emoji: '🐷', sound: 'oink oink' },
  { name: 'duck', emoji: '🦆', sound: 'quack quack' },
  { name: 'sheep', emoji: '🐑', sound: 'baa baa' },
  { name: 'horse', emoji: '🐴', sound: 'neigh neigh' },
  { name: 'frog', emoji: '🐸', sound: 'ribbit ribbit' },
  { name: 'lion', emoji: '🦁', sound: 'roar roar' },
  { name: 'monkey', emoji: '🐒', sound: 'ooh ooh ah ah' },
  { name: 'elephant', emoji: '🐘', sound: 'trumpet trumpet' },
  { name: 'owl', emoji: '🦉', sound: 'hoot hoot' },
];

class AnimalSoundsGame extends GameBase {
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
      <div class="as-game">
        <div class="as-panel">
          <div class="as-header">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Animal Sounds</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊 Hear sound</button>
          </div>

          <div class="sound-card">
            <div class="ear">👂</div>
            <div>
              <div class="sound-title">Who makes this sound?</div>
              <div class="sound-text" id="instruction-text">Listen and choose an animal.</div>
            </div>
          </div>

          <div class="animals-grid" id="animals-grid"></div>

          <div class="helper" id="helper-text">Tap the animal you think is making the sound.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .as-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#81ecec 0%,#a8e6cf 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .as-panel{width:min(760px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:18px}
      .as-header{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#16a085}.progress{font-size:14px;color:#607d8b}.hear-btn{padding:12px 18px;background:#ff9f43;color:#fff;cursor:pointer;box-shadow:0 5px 0 #e67e22}
      .sound-card{background:linear-gradient(135deg,#fff9ef,#fff);border-radius:26px;border:3px solid #ffe3ad;padding:18px;display:flex;align-items:center;gap:16px}.ear{font-size:68px}.sound-title{font-size:20px;color:#d35400;text-transform:uppercase}.sound-text{font-size:30px;color:#2d3436;line-height:1.2}
      .animals-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.animal-btn{background:#fff;border:4px solid #fff;border-radius:24px;padding:16px;display:flex;align-items:center;gap:12px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);transition:transform .12s,border-color .2s}.animal-btn:active{transform:translateY(5px);box-shadow:0 3px 0 rgba(0,0,0,.08)}.animal-btn.correct{border-color:#4cd137;background:#edfff0}.animal-btn.wrong{border-color:#ff6b6b;background:#fff0f0}.animal-btn.dim{opacity:.45}.animal-emoji{font-size:52px}.animal-name{font-size:26px;color:#34495e;text-transform:capitalize}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.animals-grid{grid-template-columns:1fr}.sound-text{font-size:24px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.playSound();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = this.shuffleWithBagFirst(ANIMALS, 'animals');
    this.currentAnimal = shuffled[0];
    this.options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('instruction-text').textContent = 'Listen carefully...';
    document.getElementById('helper-text').textContent = 'Tap the animal you think is making the sound.';

    const grid = document.getElementById('animals-grid');
    grid.innerHTML = this.options.map((animal) => `
      <button class="animal-btn" data-animal="${animal.name}">
        <span class="animal-emoji">${animal.emoji}</span>
        <span class="animal-name">${animal.name}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.animal-btn').forEach((btn) => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.animal);
    });

    setTimeout(() => this.playSound(), 500);
  }

  playSound() {
    if (!this.currentAnimal) return;
    this.speak(this.currentAnimal.sound, { rate: 0.8 });
    document.getElementById('instruction-text').textContent = `Who says "${this.currentAnimal.sound}"?`;
  }

  checkAnswer(btn, animalName) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.animal-btn')];

    if (animalName === this.currentAnimal.name) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('instruction-text').textContent = `Yes! ${this.currentAnimal.name}!`;
      document.getElementById('helper-text').textContent = `${this.currentAnimal.emoji} makes that sound.`;
      this.speak(`Correct! It is the ${this.currentAnimal.name}.`);
      this.confetti.explode(null, null, 20);
      this.celebrateMove({ burst: this.currentAnimal.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1400);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.speak(`That is ${animalName}. Try again.`);
    this.coachMove(`Listen again for ${this.currentAnimal.name}.`, 900);
    setTimeout(() => btn.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new AnimalSoundsGame(container, config);
}
