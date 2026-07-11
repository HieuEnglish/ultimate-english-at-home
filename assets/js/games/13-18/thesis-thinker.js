/* assets/js/games/13-18/thesis-thinker.js
   Thesis Thinker - Ages 13-18

   Senior pass:
   - Clearer thesis-building structure: topic -> claim -> rationale
   - Better academic feedback and round progression
   - Stronger distinction between weak and debatable thesis parts
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const THESIS_CHALLENGES = [
  {
    topic: 'Education',
    claim: 'digital textbooks should replace paper ones',
    rationale: 'because they are more cost-effective and environmentally friendly',
    feedback: 'A strong thesis: debatable claim plus a focused reason.',
  },
  {
    topic: 'Environment',
    claim: 'governments must ban single-use plastics',
    rationale: 'to prevent irreparable damage to marine ecosystems',
    feedback: 'Excellent: it states a clear action and a meaningful consequence.',
  },
  {
    topic: 'Technology',
    claim: 'social media algorithms require strict regulation',
    rationale: 'as they currently contribute to increasing social polarization',
    feedback: 'Strong: the claim is arguable and supported by a clear reason.',
  },
  {
    topic: 'Healthcare',
    claim: 'mental health services should be free for all citizens',
    rationale: 'because untreated mental illness costs society billions in lost productivity',
    feedback: 'Compelling: social issue plus economic reasoning.',
  },
  {
    topic: 'Urban Planning',
    claim: 'cities should prioritize public transport over private car infrastructure',
    rationale: 'since reducing vehicle emissions is critical to combating climate change',
    feedback: 'Well built: policy argument clearly tied to environmental impact.',
  },
];

class ThesisThinker extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQ = 0;
    this.score = 0;
    this.stage = 'claim';
    this.rounds = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="thesis-game">
        <div class="thesis-panel">
          <div class="thesis-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Thesis Thinker</div>
              <div class="progress" id="progress-text">Draft 1 of 5</div>
            </div>
            <div class="pill">📚</div>
          </div>

          <div class="draft-card">
            <div class="draft-label">Academic thesis draft</div>
            <div class="draft-text">
              <span id="part-topic" class="draft-part">[Topic]</span>,
              <span id="part-claim" class="draft-part">[Claim]</span>
              <span id="part-rationale" class="draft-part">[Rationale]</span>.
            </div>
          </div>

          <div class="instruction-box" id="instruction-box">Select the strongest claim.</div>
          <div class="options-grid" id="options-grid"></div>
          <div class="feedback-box" id="feedback-box">A strong thesis must be arguable, precise, and supported.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .thesis-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#e8dbc3 0%,#d5c1a2 100%);font-family:Georgia,'Times New Roman',serif;display:flex;align-items:center;justify-content:center;padding:20px}.thesis-panel{width:min(880px,96%);background:#fdf6e8;border-radius:28px;border:2px solid #c9aa79;padding:22px;display:flex;flex-direction:column;gap:16px;box-shadow:0 18px 50px rgba(0,0,0,.18)}.thesis-topbar{display:flex;align-items:center;gap:12px}.pill{background:#6f4e37;color:#fff4dd;padding:10px 16px;border-radius:999px;font-weight:800;font-family:Inter,Arial,sans-serif}.title-wrap{flex:1;text-align:center}.title{font-size:30px;font-weight:900;color:#5a3417;font-family:Inter,Arial,sans-serif}.progress{font-size:14px;color:#8a6c4b;font-family:Inter,Arial,sans-serif}.draft-card{background:#fff8ee;border:1px solid #dbc6a2;border-radius:20px;padding:20px}.draft-label{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8b5a2b;font-weight:800;font-family:Inter,Arial,sans-serif;margin-bottom:10px}.draft-text{font-size:30px;line-height:1.55;color:#3e2a1d}.draft-part{color:#b79463}.draft-part.active{color:#6f4e37;font-weight:700}.instruction-box,.feedback-box{border-radius:14px;padding:13px 15px;font-family:Inter,Arial,sans-serif}.instruction-box{background:#f4ead7;color:#69492c;font-weight:800}.feedback-box{background:#fff;border-left:4px solid #8b5a2b;color:#5c4a3d}.options-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.choice-btn{border:none;background:#fff;border:2px solid #d7c2a0;border-radius:16px;padding:16px;text-align:left;cursor:pointer;font-size:18px;line-height:1.4;color:#3b2a20;transition:all .2s}.choice-btn:hover{transform:translateY(-2px);border-color:#8b5a2b;box-shadow:0 10px 18px rgba(0,0,0,.06)}.choice-btn.correct{background:#edfff0;border-color:#2ecc71}.choice-btn.wrong{background:#fff0f0;border-color:#ff6b6b}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.currentQ = 0;
    this.score = 0;
    this.rounds = [...THESIS_CHALLENGES].sort(() => Math.random() - 0.5);
    this.loadRound();
  }

  loadRound() {
    if (this.currentQ >= this.rounds.length) return this.end();
    const q = this.rounds[this.currentQ];
    this.stage = 'claim';
    document.getElementById('progress-text').textContent = `Draft ${this.currentQ + 1} of ${this.rounds.length}`;
    document.getElementById('part-topic').textContent = q.topic;
    document.getElementById('part-topic').classList.add('active');
    document.getElementById('part-claim').textContent = '[Claim]';
    document.getElementById('part-rationale').textContent = '[Rationale]';
    document.getElementById('part-claim').classList.remove('active');
    document.getElementById('part-rationale').classList.remove('active');
    document.getElementById('feedback-box').textContent = 'A strong thesis must be arguable, precise, and supported.';
    this.showClaimSelection();
  }

  showClaimSelection() {
    const current = this.rounds[this.currentQ];
    const others = this.rounds.filter((c) => c !== current);
    const choices = [
      current.claim,
      others[0].claim,
      'things should probably be better in the future',
      'everyone knows this is obviously wrong',
    ].sort(() => Math.random() - 0.5);

    document.getElementById('instruction-box').textContent = 'Select the strongest claim.';
    const grid = document.getElementById('options-grid');
    this.renderChoices(grid, choices, (btn, choice) => this.handleClaim(btn, choice, current.claim));
  }

  handleClaim(btn, selected, correct) {
    if (selected === correct) {
      btn.classList.add('correct');
      document.getElementById('part-claim').textContent = selected;
      document.getElementById('part-claim').classList.add('active');
      document.getElementById('feedback-box').textContent = 'Good claim: it is arguable and specific enough for an essay.';
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      this.celebrateMove({ burst: 'CLAIM', duration: 800 });
      setTimeout(() => this.showRationaleSelection(), 900);
      return;
    }

    btn.classList.add('wrong');
    this.coachMove('That claim is too vague or not strongly arguable.', 1000);
    document.getElementById('feedback-box').textContent = 'Weak claims are often obvious, vague, or too broad.';
  }

  showRationaleSelection() {
    const current = this.rounds[this.currentQ];
    const others = this.rounds.filter((c) => c !== current);
    const choices = [
      current.rationale,
      others[0].rationale,
      'for many different reasons that people can imagine',
      'because that would be interesting to see',
    ].sort(() => Math.random() - 0.5);

    document.getElementById('instruction-box').textContent = 'Now select the strongest rationale.';
    const grid = document.getElementById('options-grid');
    this.renderChoices(grid, choices, (btn, choice) => {
      this.handleRationale(btn, choice, current.rationale, current.feedback);
    });
  }

  renderChoices(grid, choices, onChoose) {
    grid.replaceChildren();
    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.dataset.idx = String(idx);
      btn.textContent = String(choice);
      btn.onclick = () => onChoose(btn, choice);
      grid.appendChild(btn);
    });
  }

  handleRationale(btn, selected, correct, feedback) {
    if (selected === correct) {
      btn.classList.add('correct');
      document.getElementById('part-rationale').textContent = selected;
      document.getElementById('part-rationale').classList.add('active');
      document.getElementById('feedback-box').textContent = feedback;
      this.addScore(140);
      document.getElementById('score-val').textContent = this.score;
      this.celebrateMove({ burst: 'THESIS', duration: 900 });
      setTimeout(() => {
        this.currentQ += 1;
        this.loadRound();
      }, 1200);
      return;
    }

    btn.classList.add('wrong');
    this.coachMove('That reason does not strongly support the claim.', 1000);
    document.getElementById('feedback-box').textContent = 'The best rationale gives a focused reason or consequence, not filler.';
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ThesisThinker(container, config);
}
