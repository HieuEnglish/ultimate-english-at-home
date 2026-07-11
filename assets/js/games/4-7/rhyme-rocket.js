/* assets/js/games/4-7/rhyme-rocket.js
   Rhyme Rocket - Ages 4-7

   Senior pass:
   - Stronger mission structure with fuel progress and clean win flow
   - Fixed weak scoring/end-state handling and made the launch payoff meaningful
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const RHYME_SETS = [
  { target: 'Cat', options: ['Hat', 'Dog', 'Fish'], correct: 'Hat', emoji: '🐱' },
  { target: 'Bear', options: ['Chair', 'Ball', 'Sun'], correct: 'Chair', emoji: '🐻' },
  { target: 'House', options: ['Mouse', 'Tree', 'Car'], correct: 'Mouse', emoji: '🏠' },
  { target: 'Star', options: ['Car', 'Book', 'Pig'], correct: 'Car', emoji: '⭐' },
  { target: 'Fox', options: ['Box', 'Pen', 'Bed'], correct: 'Box', emoji: '🦊' },
  { target: 'Cake', options: ['Snake', 'Cup', 'Hat'], correct: 'Snake', emoji: '🍰' },
  { target: 'Tree', options: ['Bee', 'Dog', 'Top'], correct: 'Bee', emoji: '🌳' },
  { target: 'Moon', options: ['Spoon', 'Cat', 'Run'], correct: 'Spoon', emoji: '🌙' },
  { target: 'Fish', options: ['Dish', 'Bear', 'One'], correct: 'Dish', emoji: '🐟' },
  { target: 'Frog', options: ['Dog', 'Log', 'Cat'], correct: 'Log', emoji: '🐸' },
];

class RhymeRocketGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentSet = null;
    this.fuelLevel = 0;
    this.maxFuel = 5;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="rr-game">
        <div class="rr-panel">
          <div class="rr-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Rhyme Rocket</div>
              <div class="subtitle">Fill the rocket with 5 rhyme boosts!</div>
            </div>
            <div class="fuel-pill" id="fuel-pill">Fuel 0 / ${this.maxFuel}</div>
          </div>

          <div class="launch-area">
            <div class="rocket-column">
              <div class="rocket" id="rocket">🚀</div>
              <div class="exhaust" id="exhaust"></div>
            </div>
            <div class="fuel-tank"><div class="fuel-liquid" id="fuel-liquid"></div></div>
          </div>

          <div class="prompt-card">
            <div class="target-emoji" id="target-emoji">🐱</div>
            <div>
              <div class="prompt-label">Which word rhymes with</div>
              <div class="target-text" id="target-text">Cat</div>
            </div>
          </div>

          <div class="options-grid" id="options-grid"></div>
          <div class="helper" id="helper-text">Pick the rhyming word to add fuel.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .rr-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:radial-gradient(circle at center,#2c3e50 0%,#000 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}
      .rr-panel{width:min(780px,96%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:34px;box-shadow:0 24px 60px rgba(0,0,0,.35);padding:22px;display:flex;flex-direction:column;gap:16px}.rr-topbar{display:flex;align-items:center;gap:12px}.pill,.fuel-pill{border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.subtitle{font-size:14px;color:#d0d7e2}.fuel-pill{background:#1f3f57;padding:12px 16px}
      .launch-area{display:flex;justify-content:center;align-items:flex-end;gap:36px;min-height:180px}.rocket-column{text-align:center}.rocket{font-size:100px;transition:transform .8s ease}.exhaust{height:0;width:26px;margin:0 auto;background:linear-gradient(to bottom,#f1c40f,#e74c3c);border-radius:999px;transition:height .2s}.exhaust.active{height:80px}.fuel-tank{width:60px;height:170px;border:4px solid #bdc3c7;border-radius:26px;overflow:hidden;background:rgba(255,255,255,.08)}.fuel-liquid{height:0;background:linear-gradient(to top,#27ae60,#2ecc71);transition:height .4s}
      .prompt-card{background:rgba(255,255,255,.92);border-radius:26px;padding:18px;display:flex;align-items:center;gap:18px;color:#2d3436}.target-emoji{font-size:68px}.prompt-label{font-size:18px;color:#7f8c8d;text-transform:uppercase}.target-text{font-size:34px;color:#e74c3c}
      .options-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.option-btn{border:none;padding:18px 14px;border-radius:20px;font-size:24px;font-family:inherit;cursor:pointer;background:#2980b9;color:#fff;box-shadow:0 8px 0 #1c5980;transition:transform .12s,opacity .2s}.option-btn:active{transform:translateY(6px);box-shadow:0 2px 0 #1c5980}.option-btn.correct{background:#27ae60;box-shadow:0 8px 0 #1e8449}.option-btn.wrong{background:#c0392b;box-shadow:0 8px 0 #922b21}.option-btn.dim{opacity:.45}
      .helper{background:rgba(255,255,255,.12);border-radius:18px;padding:14px 16px;text-align:center;font-size:22px;color:#ecf0f1}
      @media (max-width:720px){.options-grid{grid-template-columns:1fr}.prompt-card{text-align:center;flex-direction:column}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.fuelLevel = 0;
    this.locked = false;
    this.updateFuel();
    this.nextRound();
  }

  nextRound() {
    if (this.fuelLevel >= this.maxFuel) return this.launchSequence();
    this.locked = false;
    this.currentSet = RHYME_SETS[Math.floor(Math.random() * RHYME_SETS.length)];
    document.getElementById('target-emoji').textContent = this.currentSet.emoji;
    document.getElementById('target-text').textContent = this.currentSet.target;
    document.getElementById('helper-text').textContent = 'Pick the rhyming word to add fuel.';

    const optionsEl = document.getElementById('options-grid');
    const options = [...this.currentSet.options].sort(() => Math.random() - 0.5);
    optionsEl.replaceChildren();
    options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.dataset.word = String(opt);
      btn.textContent = String(opt);
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.word);
      optionsEl.appendChild(btn);
    });

    this.speak(`Which word rhymes with ${this.currentSet.target}?`, { rate: 0.9 });
  }

  checkAnswer(btn, word) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.option-btn')];
    if (word === this.currentSet.correct) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.fuelLevel += 1;
      this.incrementCombo();
      this.addScore(120);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `${word} rhymes with ${this.currentSet.target}! Fuel added!`;
      this.updateFuel(true);
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ burst: word.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextRound(), 1200);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`${word} does not rhyme with ${this.currentSet.target}.`, 1000);
    document.getElementById('helper-text').textContent = `Try again. Listen for the matching ending sound.`;
    setTimeout(() => btn.classList.remove('wrong'), 650);
  }

  updateFuel(withBurst = false) {
    const pct = (this.fuelLevel / this.maxFuel) * 100;
    document.getElementById('fuel-liquid').style.height = `${pct}%`;
    document.getElementById('fuel-pill').textContent = `Fuel ${this.fuelLevel} / ${this.maxFuel}`;
    if (withBurst) {
      const exhaust = document.getElementById('exhaust');
      exhaust.classList.add('active');
      setTimeout(() => exhaust.classList.remove('active'), 350);
    }
  }

  launchSequence() {
    this.locked = true;
    document.getElementById('helper-text').textContent = 'Blast off! Your rhymes filled the rocket!';
    document.getElementById('exhaust').classList.add('active');
    document.getElementById('rocket').style.transform = 'translateY(-180px) scale(1.1)';
    this.addScore(300);
    document.getElementById('score-val').textContent = this.score;
    this.confetti.explode(null, null, 55);
    this.celebrateMove({ burst: '🚀', duration: 1200 });
    setTimeout(() => this.showResults(this.saveScore()), 1800);
  }
}

export function createGame(container, config) {
  return new RhymeRocketGame(container, config);
}
