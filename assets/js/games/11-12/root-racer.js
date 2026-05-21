/* assets/js/games/11-12/root-racer.js
   Root Racer - Ages 11-12

   Senior pass:
   - Reworked into faster root-identification rounds with clearer morphology teaching
   - Removed weak fake-race drift and made the learning loop primary
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const QUESTIONS = [
  { word: 'Beneficial', root: 'Bene', meaning: 'Good', options: ['Bene', 'Fic', 'Ial', 'Cial'] },
  { word: 'Chronology', root: 'Chron', meaning: 'Time', options: ['Chron', 'Logy', 'Ology', 'No'] },
  { word: 'Biology', root: 'Bio', meaning: 'Life', options: ['Bio', 'Logy', 'Bi', 'Olo'] },
  { word: 'Geography', root: 'Geo', meaning: 'Earth', options: ['Geo', 'Graph', 'Raphy', 'Ge'] },
  { word: 'Inspector', root: 'Spect', meaning: 'Look/See', options: ['Spect', 'In', 'Tor', 'Sec'] },
  { word: 'Portable', root: 'Port', meaning: 'Carry', options: ['Port', 'Able', 'Tab', 'Por'] },
  { word: 'Telescope', root: 'Tele', meaning: 'Far', options: ['Tele', 'Scope', 'Tel', 'Le'] },
  { word: 'Dictation', root: 'Dict', meaning: 'Say/Speak', options: ['Dict', 'Tion', 'Ation', 'Dic'] },
];

class RootRacer extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQuestion = 0;
    this.score = 0;
    this.totalQuestions = 8;
    this.questions = [];
    this.distance = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="rracer-game">
        <div class="rracer-panel">
          <div class="rracer-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Root Racer</div>
              <div class="progress" id="progress-text">Race 1 of ${this.totalQuestions}</div>
            </div>
            <div class="pill">🏎️ <span id="dist-val">0</span> m</div>
          </div>

          <div class="question-card">
            <div class="word-display" id="word-display">Beneficial</div>
            <div class="hint-display" id="hint-display">Root meaning: good</div>
          </div>

          <div class="options-grid" id="options-grid"></div>
          <div class="helper" id="helper-text">Pick the root that carries the meaning clue.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .rracer-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#4facfe 0%,#00f2fe 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}.rracer-panel{width:min(780px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}.rracer-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#0984e3}.progress{font-size:14px;color:#607d8b}
      .question-card{background:#fff;border:3px solid #d9ebff;border-radius:26px;padding:20px;text-align:center}.word-display{font-size:40px;color:#2d3436}.hint-display{font-size:20px;color:#4d6273;margin-top:10px}
      .options-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.root-btn{border:none;background:#fff;padding:18px 14px;border-radius:20px;font-size:24px;font-weight:800;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff}.root-btn:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.root-btn.correct{background:#edfff0;border-color:#4cd137}.root-btn.wrong{background:#fff0f0;border-color:#ff6b6b}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.score = 0;
    this.distance = 0;
    this.currentQuestion = 0;
    this.questions = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, this.totalQuestions);
    this.loadNextQuestion();
  }

  loadNextQuestion() {
    if (this.currentQuestion >= this.questions.length) return this.end();
    const q = this.questions[this.currentQuestion];
    document.getElementById('progress-text').textContent = `Race ${this.currentQuestion + 1} of ${this.questions.length}`;
    document.getElementById('word-display').textContent = q.word;
    document.getElementById('hint-display').textContent = `Root meaning: ${q.meaning}`;
    document.getElementById('helper-text').textContent = 'Pick the root that carries the meaning clue.';

    const grid = document.getElementById('options-grid');
    grid.innerHTML = [...q.options].sort(() => Math.random() - 0.5).map((opt) => `<button class="root-btn" data-root="${opt}">${opt}</button>`).join('');
    grid.querySelectorAll('.root-btn').forEach((btn) => {
      btn.onclick = () => this.handleAnswer(btn, q.root);
    });
  }

  handleAnswer(btn, correct) {
    const selected = btn.dataset.root;
    const isCorrect = selected === correct || (correct.includes('/') && correct.includes(selected));
    if (isCorrect) {
      btn.classList.add('correct');
      this.addScore(120);
      this.distance += 35;
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('dist-val').textContent = this.distance;
      document.getElementById('helper-text').textContent = `${selected} carries the idea of ${this.questions[this.currentQuestion].meaning}.`;
      this.celebrateMove({ burst: selected.toUpperCase(), duration: 900 });
    } else {
      btn.classList.add('wrong');
      this.coachMove(`${selected} is not the root you need here.`, 950);
    }
    document.querySelectorAll('.root-btn').forEach((b) => b.disabled = true);
    setTimeout(() => { this.currentQuestion += 1; this.loadNextQuestion(); }, 1000);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new RootRacer(container, config);
}
