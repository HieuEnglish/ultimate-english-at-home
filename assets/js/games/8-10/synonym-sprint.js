/* assets/js/games/8-10/synonym-sprint.js
   Synonym Sprint - Ages 8-10

   Senior pass:
   - Reworked from unreliable runner/collision logic into a crisp sprint-round challenge
   - Keeps the runner fantasy while making correctness and pacing dependable
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SYNONYM_DATA = [
  { word: 'Happy', synonyms: ['Joyful', 'Glad', 'Cheerful'], antonyms: ['Sad', 'Angry', 'Bored'] },
  { word: 'Big', synonyms: ['Huge', 'Large', 'Giant'], antonyms: ['Small', 'Tiny', 'Little'] },
  { word: 'Fast', synonyms: ['Quick', 'Rapid', 'Swift'], antonyms: ['Slow', 'Lazy', 'Late'] },
  { word: 'Smart', synonyms: ['Clever', 'Wise', 'Bright'], antonyms: ['Dumb', 'Silly', 'Dull'] },
  { word: 'Beautiful', synonyms: ['Pretty', 'Lovely', 'Stunning'], antonyms: ['Ugly', 'Gross', 'Plain'] },
  { word: 'Difficult', synonyms: ['Hard', 'Tough', 'Tricky'], antonyms: ['Easy', 'Simple', 'Light'] },
  { word: 'Start', synonyms: ['Begin', 'Launch', 'Open'], antonyms: ['End', 'Stop', 'Finish'] },
  { word: 'Strong', synonyms: ['Powerful', 'Mighty', 'Tough'], antonyms: ['Weak', 'Frail', 'Soft'] },
  { word: 'Cold', synonyms: ['Chilly', 'Freezing', 'Icy'], antonyms: ['Hot', 'Warm', 'Burning'] },
  { word: 'Brave', synonyms: ['Courageous', 'Bold', 'Fearless'], antonyms: ['Scared', 'Timid', 'Cowardly'] },
];

class SynonymSprintGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 80 });
    this.currentData = null;
    this.locked = false;
    this.distance = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ssprint-game">
        <div class="ssprint-panel">
          <div class="ssprint-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Synonym Sprint</div>
              <div class="subtitle">Pick the matching meaning to keep running.</div>
            </div>
            <div class="pill">🏃 <span id="dist-val">0</span> m</div>
          </div>

          <div class="track-card">
            <div class="runner" id="runner">🏃</div>
            <div>
              <div class="track-label">Find a synonym for</div>
              <div class="track-word" id="track-word">Happy</div>
            </div>
          </div>

          <div class="options-dock" id="options-dock"></div>
          <div class="helper" id="helper-text">Choose the word with the same meaning.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ssprint-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#a8edea 0%,#fed6e3 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ssprint-panel{width:min(780px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}.ssprint-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2d3436}.subtitle{font-size:14px;color:#607d8b}
      .track-card{display:flex;align-items:center;gap:18px;background:#fff;border:3px solid #d9ebff;border-radius:28px;padding:18px}.runner{font-size:72px;transition:transform .3s}.runner.jump{transform:translateY(-18px)}.runner.bump{transform:translateX(-8px)}.track-label{font-size:18px;color:#7f8c8d;text-transform:uppercase}.track-word{font-size:38px;color:#e17055}
      .options-dock{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.sprint-btn{border:none;background:#fff;padding:18px 14px;border-radius:20px;font-size:24px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff;transition:transform .12s,border-color .2s}.sprint-btn:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.sprint-btn.correct{background:#edfff0;border-color:#4cd137}.sprint-btn.wrong{background:#fff0f0;border-color:#ff6b6b}.sprint-btn.dim{opacity:.45}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.options-dock{grid-template-columns:1fr}.track-card{flex-direction:column;text-align:center}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.distance = 0;
    this.locked = false;
    this.nextQuestion();
  }

  nextQuestion() {
    this.locked = false;
    this.currentData = SYNONYM_DATA[Math.floor(Math.random() * SYNONYM_DATA.length)];
    document.getElementById('track-word').textContent = this.currentData.word;
    document.getElementById('helper-text').textContent = 'Choose the word with the same meaning.';

    const correct = this.currentData.synonyms[0];
    const wrongs = this.currentData.antonyms.slice(0, 2);
    const options = [correct, ...wrongs].sort(() => Math.random() - 0.5);

    const dock = document.getElementById('options-dock');
    dock.innerHTML = options.map((word) => `<button class="sprint-btn" data-word="${word}">${word}</button>`).join('');
    dock.querySelectorAll('.sprint-btn').forEach((btn) => {
      btn.onclick = () => this.pickOption(btn, btn.dataset.word === correct);
    });
  }

  pickOption(btn, isCorrect) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.sprint-btn')];
    const runner = document.getElementById('runner');

    if (isCorrect) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      runner.classList.add('jump');
      this.incrementCombo();
      this.addScore(120);
      this.distance += 25;
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('dist-val').textContent = this.distance;
      document.getElementById('helper-text').textContent = `${btn.dataset.word} matches ${this.currentData.word}. Keep sprinting!`;
      this.confetti.explode(null, null, 16);
      this.celebrateMove({ burst: btn.dataset.word.toUpperCase(), duration: 900 });
      setTimeout(() => runner.classList.remove('jump'), 350);
      setTimeout(() => this.nextQuestion(), 1100);
      return;
    }

    btn.classList.add('wrong');
    runner.classList.add('bump');
    this.resetCombo();
    this.coachMove(`${btn.dataset.word} does not mean the same as ${this.currentData.word}.`, 1000);
    setTimeout(() => { btn.classList.remove('wrong'); runner.classList.remove('bump'); }, 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new SynonymSprintGame(container, config);
}
