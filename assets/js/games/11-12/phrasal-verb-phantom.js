/* assets/js/games/11-12/phrasal-verb-phantom.js
   Phrasal Verb Phantom - Ages 11-12

   Senior pass:
   - Reworked ghost hunting into a cleaner sentence-completion round structure
   - Better pacing and stronger phrasal-verb teaching clarity
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const QUESTIONS = [
  { sentence: 'I ran _____ my old teacher at the supermarket.', correct: 'into', alts: ['over', 'out', 'away'] },
  { sentence: 'Can you look _____ my cat while I\'m on holiday?', correct: 'after', alts: ['up', 'into', 'over'] },
  { sentence: 'Don\'t give _____! You can do it!', correct: 'up', alts: ['in', 'on', 'off'] },
  { sentence: 'They had to call _____ the meeting due to illness.', correct: 'off', alts: ['out', 'away', 'back'] },
  { sentence: 'Please turn _____ the music, it\'s too loud.', correct: 'down', alts: ['up', 'on', 'in'] },
  { sentence: 'I can\'t put _____ with this noise anymore!', correct: 'up', alts: ['down', 'on', 'in'] },
  { sentence: 'I look _____ to seeing you soon.', correct: 'forward', alts: ['back', 'up', 'round'] },
  { sentence: 'My car broke _____ on the highway.', correct: 'down', alts: ['up', 'out', 'off'] },
];

class PhrasalPhantom extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQ = 0;
    this.score = 0;
    this.questions = [];
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="pph-game">
        <div class="pph-panel">
          <div class="pph-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Phrasal Phantom</div>
              <div class="progress" id="progress-text">Mission 1 of 8</div>
            </div>
            <div class="pill">👻</div>
          </div>

          <div class="sentence-card">
            <div class="sentence-text" id="sentence-text">Loading...</div>
            <div class="helper" id="helper-text">Catch the ghost carrying the missing word.</div>
          </div>

          <div class="ghosts-container" id="ghosts-container"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .pph-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#0f0c29 0%,#302b63 50%,#24243e 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.pph-panel{width:min(820px,96%);background:rgba(255,255,255,.08);border-radius:34px;border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.35);padding:22px;display:flex;flex-direction:column;gap:18px}.pph-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.progress{font-size:14px;color:#d6d6f6}
      .sentence-card{background:rgba(0,0,0,.35);border:2px solid #6c5ce7;border-radius:24px;padding:24px;text-align:center}.sentence-text{font-size:30px;line-height:1.5}.helper{font-size:18px;color:#d6d6f6;margin-top:12px}
      .ghosts-container{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.ghost-card{border:none;background:rgba(255,255,255,.92);color:#222;border-radius:24px;padding:18px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.12);display:flex;flex-direction:column;align-items:center;gap:8px;border:4px solid #fff}.ghost-card:active{transform:translateY(6px);box-shadow:0 3px 0 rgba(0,0,0,.12)}.ghost-card.correct{background:#edfff0;border-color:#4cd137}.ghost-card.wrong{background:#fff0f0;border-color:#ff6b6b}.ghost-emoji{font-size:54px}.ghost-word{font-size:26px;font-weight:800}
      @media (max-width:720px){.ghosts-container{grid-template-columns:1fr}.sentence-text{font-size:24px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.questions = [...QUESTIONS].sort(() => Math.random() - 0.5);
    this.currentQ = 0;
    this.locked = false;
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.currentQ >= this.questions.length) return this.end();
    this.locked = false;
    const q = this.questions[this.currentQ];
    document.getElementById('progress-text').textContent = `Mission ${this.currentQ + 1} of ${this.questions.length}`;
    document.getElementById('sentence-text').textContent = q.sentence;
    document.getElementById('helper-text').textContent = 'Catch the ghost carrying the missing word.';

    const options = [q.correct, ...q.alts].sort(() => Math.random() - 0.5);
    const ghosts = document.getElementById('ghosts-container');
    ghosts.innerHTML = options.map((word) => `
      <button class="ghost-card" data-word="${word}">
        <div class="ghost-emoji">👻</div>
        <div class="ghost-word">${word}</div>
      </button>
    `).join('');
    ghosts.querySelectorAll('.ghost-card').forEach((card) => {
      card.onclick = () => this.handleGhostClick(card, q.correct);
    });
  }

  handleGhostClick(card, correct) {
    if (this.locked) return;
    const word = card.dataset.word;
    if (word === correct) {
      this.locked = true;
      card.classList.add('correct');
      this.addScore(120);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `${correct} completes the phrasal verb.`;
      this.celebrateMove({ burst: correct.toUpperCase(), duration: 900 });
      setTimeout(() => { this.currentQ += 1; this.loadQuestion(); }, 1000);
      return;
    }

    card.classList.add('wrong');
    this.coachMove(`${word} does not complete this phrasal verb.`, 950);
    setTimeout(() => card.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new PhrasalPhantom(container, config);
}
