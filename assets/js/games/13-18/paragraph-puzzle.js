/* assets/js/games/13-18/paragraph-puzzle.js
   Paragraph Puzzle - Ages 13-18

   Senior pass:
   - Rebuilt into a clearer paragraph sequencing challenge
   - Better structural labels, reset flow, and multi-round progression
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const PARAGRAPH_CHALLENGES = [
  {
    title: 'The Impact of Urban Green Spaces',
    sentences: [
      { text: 'Green spaces in urban environments offer significant benefits to residents\' well-being.', role: 'Topic sentence', order: 0 },
      { text: 'For instance, studies have shown that access to parks can reduce stress and improve mental health.', role: 'Evidence', order: 1 },
      { text: 'Moreover, these areas act as critical habitats for local biodiversity.', role: 'Supporting detail', order: 2 },
      { text: 'Ultimately, urban planning must prioritize the integration of nature to create sustainable cities.', role: 'Conclusion', order: 3 },
    ],
  },
  {
    title: 'The Role of Technology in Modern Education',
    sentences: [
      { text: 'Technology has fundamentally transformed the way students learn and engage with educational content.', role: 'Topic sentence', order: 0 },
      { text: 'Digital platforms enable personalized learning experiences that adapt to each student\'s pace.', role: 'Evidence', order: 1 },
      { text: 'However, excessive screen time can lead to decreased attention spans and social isolation.', role: 'Counterpoint', order: 2 },
      { text: 'Therefore, a balanced approach that combines technology with traditional teaching methods is essential.', role: 'Conclusion', order: 3 },
    ],
  },
  {
    title: 'Climate Change and Individual Responsibility',
    sentences: [
      { text: 'While corporations produce the majority of greenhouse gas emissions, individuals also play a critical role.', role: 'Topic sentence', order: 0 },
      { text: 'Simple actions like reducing meat consumption and using public transport can collectively make a significant impact.', role: 'Evidence', order: 1 },
      { text: 'Additionally, consumer choices drive corporate behavior, meaning individual action can influence industry standards.', role: 'Supporting detail', order: 2 },
      { text: 'In conclusion, systemic change requires both institutional reform and personal commitment from each citizen.', role: 'Conclusion', order: 3 },
    ],
  },
  {
    title: 'Why Critical Thinking Matters',
    sentences: [
      { text: 'Critical thinking helps people judge claims, evidence, and arguments more carefully.', role: 'Topic sentence', order: 0 },
      { text: 'In daily life, this skill protects people from manipulation and misinformation.', role: 'Supporting detail', order: 1 },
      { text: 'It also improves academic writing because students learn to support claims with strong reasons.', role: 'Evidence', order: 2 },
      { text: 'As a result, critical thinking is essential for responsible learning and citizenship.', role: 'Conclusion', order: 3 },
    ],
  },
];

class ParagraphPuzzle extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQ = 0;
    this.score = 0;
    this.rounds = [];
    this.selected = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="ppuz-game">
        <div class="ppuz-panel">
          <div class="ppuz-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Paragraph Puzzle</div>
              <div class="progress" id="progress-text">Paragraph 1 of 4</div>
            </div>
            <div class="pill">🧩</div>
          </div>

          <div class="title-card">
            <div class="title-label">Paragraph focus</div>
            <div class="paragraph-title" id="paragraph-title">Loading...</div>
          </div>

          <div class="build-zone">
            <div class="build-label">Your paragraph order</div>
            <div class="build-list" id="build-list"></div>
          </div>

          <div class="bank-zone">
            <div class="build-label">Sentence bank</div>
            <div class="sentence-bank" id="sentence-bank"></div>
          </div>

          <div class="controls">
            <button class="btn" id="reset-btn">Reset</button>
            <button class="btn check" id="check-btn">Check Structure</button>
          </div>

          <div class="helper" id="helper-text">Build a paragraph with a logical flow from opening idea to conclusion.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ppuz-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#121212 0%,#1f1f1f 100%);font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.ppuz-panel{width:min(900px,96%);background:rgba(255,255,255,.05);border:1px solid rgba(0,255,136,.18);border-radius:28px;padding:22px;display:flex;flex-direction:column;gap:14px;box-shadow:0 18px 50px rgba(0,0,0,.3)}.ppuz-topbar{display:flex;align-items:center;gap:12px}.pill{background:#09281a;color:#7fffb7;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:30px;font-weight:900;color:#8dffbf}.progress{font-size:14px;color:#88bda1}.title-card,.build-zone,.bank-zone{background:rgba(255,255,255,.06);border-radius:18px;padding:16px}.title-label,.build-label{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#76b896;font-weight:800;margin-bottom:8px}.paragraph-title{font-size:24px;color:#fff}.build-list,.sentence-bank{display:flex;flex-direction:column;gap:10px;min-height:88px}.sentence-btn{border:none;background:#fff;color:#1f2a24;border-radius:16px;padding:14px 16px;text-align:left;cursor:pointer;font-size:15px;line-height:1.45;border:3px solid #fff;transition:all .2s}.sentence-btn:hover{transform:translateX(4px)}.sentence-btn.used{opacity:.45;cursor:not-allowed}.placed{background:#eafff2;border-color:#2ecc71}.wrong{background:#fff0f0;border-color:#ff6b6b}.role-tag{display:inline-block;margin-bottom:8px;background:#0e3323;color:#7fffb7;padding:5px 9px;border-radius:999px;font-size:11px;font-weight:800}.controls{display:flex;justify-content:center;gap:12px}.btn{border:none;background:#4b5d67;color:#fff;padding:12px 18px;border-radius:12px;font-weight:800;cursor:pointer}.btn.check{background:#00c853}.helper{background:#0f2017;border-left:4px solid #00ff88;border-radius:12px;padding:12px 14px;color:#bfead0}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.currentQ = 0;
    this.score = 0;
    this.rounds = [...PARAGRAPH_CHALLENGES].sort(() => Math.random() - 0.5);
    document.getElementById('reset-btn').onclick = () => this.resetSelection();
    document.getElementById('check-btn').onclick = () => this.verifyOrder();
    this.loadChallenge();
  }

  loadChallenge() {
    if (this.currentQ >= this.rounds.length) return this.end();
    const q = this.rounds[this.currentQ];
    this.selected = [];
    document.getElementById('progress-text').textContent = `Paragraph ${this.currentQ + 1} of ${this.rounds.length}`;
    document.getElementById('paragraph-title').textContent = q.title;
    document.getElementById('helper-text').textContent = 'Build a paragraph with a logical flow from opening idea to conclusion.';
    this.renderChallenge();
  }

  renderChallenge() {
    const q = this.rounds[this.currentQ];
    const build = document.getElementById('build-list');
    build.innerHTML = this.selected.map((item, idx) => `
      <button class="sentence-btn placed" data-build-index="${idx}">
        <div class="role-tag">Placed ${idx + 1}</div>
        ${item.text}
      </button>
    `).join('');
    build.querySelectorAll('.sentence-btn').forEach((btn) => {
      btn.onclick = () => this.removeSelected(Number(btn.dataset.buildIndex));
    });

    const bank = document.getElementById('sentence-bank');
    bank.innerHTML = q.sentences.map((s, idx) => {
      const used = this.selected.some((item) => item.order === s.order && item.text === s.text);
      return `
        <button class="sentence-btn ${used ? 'used' : ''}" data-bank-index="${idx}" ${used ? 'disabled' : ''}>
          <div class="role-tag">${s.role}</div>
          ${s.text}
        </button>
      `;
    }).join('');
    bank.querySelectorAll('.sentence-btn:not([disabled])').forEach((btn) => {
      btn.onclick = () => this.addSelected(Number(btn.dataset.bankIndex));
    });
  }

  addSelected(idx) {
    const q = this.rounds[this.currentQ];
    this.selected.push(q.sentences[idx]);
    this.renderChallenge();
  }

  removeSelected(idx) {
    this.selected.splice(idx, 1);
    this.renderChallenge();
  }

  resetSelection() {
    this.selected = [];
    this.renderChallenge();
  }

  verifyOrder() {
    const q = this.rounds[this.currentQ];
    if (this.selected.length !== q.sentences.length) {
      this.coachMove('Use all sentences before checking the paragraph.', 1000);
      return;
    }

    const isCorrect = this.selected.every((item, idx) => item.order === idx);
    const placed = [...document.querySelectorAll('#build-list .sentence-btn')];

    if (isCorrect) {
      placed.forEach((el) => el.classList.add('placed'));
      this.addScore(180);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = 'Strong flow: topic sentence, support, and conclusion are in the right order.';
      this.celebrateMove({ burst: 'FLOW', duration: 900 });
      setTimeout(() => {
        this.currentQ += 1;
        this.loadChallenge();
      }, 1200);
      return;
    }

    placed.forEach((el, idx) => {
      if (this.selected[idx].order !== idx) el.classList.add('wrong');
    });
    document.getElementById('helper-text').textContent = 'Recheck the opening, development, and conclusion roles.';
    this.coachMove('The paragraph structure is not logical yet.', 1000);
    setTimeout(() => this.renderChallenge(), 800);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ParagraphPuzzle(container, config);
}
