/* assets/js/games/13-18/interview-simulator.js
   Interview Simulator - Ages 13-18

   Senior pass:
   - Clearer professional communication scoring
   - Better feedback on why answers work
   - Stronger round structure and final performance summary
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const INTERVIEW_ROUNDS = [
  {
    question: 'Can you tell me about a time you had to deal with a difficult situation?',
    prompt: 'Choose the answer that sounds professional, reflective, and specific.',
    options: [
      { text: 'I once managed a project conflict by facilitating a discussion to find common ground and agree on next steps.', tone: 'Professional', impact: 28, feedback: 'Strong: specific action, calm tone, and a useful result.' },
      { text: 'I just ignored it until it went away. No point in making a fuss.', tone: 'Passive', impact: 8, feedback: 'Weak: it avoids responsibility and problem-solving.' },
      { text: 'I yelled at everyone until they did what I said. It worked.', tone: 'Aggressive', impact: 3, feedback: 'Poor: this damages trust and teamwork.' },
    ],
  },
  {
    question: 'Why should we hire you over other candidates?',
    prompt: 'Employers want confidence supported by evidence.',
    options: [
      { text: 'I possess a strong mix of technical skill, adaptability, and initiative, and I am eager to contribute from day one.', tone: 'Professional', impact: 28, feedback: 'Strong: confident, specific, and employer-focused.' },
      { text: 'Because I am the best, obviously. You would be lucky to have me.', tone: 'Arrogant', impact: 7, feedback: 'Weak: confidence without substance feels arrogant.' },
      { text: 'I do not know, I just need the money.', tone: 'Blunt', impact: 2, feedback: 'Poor: it ignores value, fit, and motivation.' },
    ],
  },
  {
    question: 'What is your greatest weakness?',
    prompt: 'A good answer is honest but also shows growth.',
    options: [
      { text: 'I sometimes spend too long perfecting details, so I now set realistic deadlines and checkpoints to stay efficient.', tone: 'Professional', impact: 28, feedback: 'Strong: honest, self-aware, and solution-focused.' },
      { text: 'I do not really have any weaknesses.', tone: 'Dishonest', impact: 4, feedback: 'Poor: this sounds unrealistic and unreflective.' },
      { text: 'I am lazy and hate early mornings.', tone: 'Too Honest', impact: 6, feedback: 'Weak: honest, but not strategically professional.' },
    ],
  },
  {
    question: 'Where do you see yourself in five years?',
    prompt: 'Show ambition, growth, and alignment with the role.',
    options: [
      { text: 'I hope to have deepened my skills, taken on more responsibility, and contributed meaningfully to the team’s success.', tone: 'Professional', impact: 28, feedback: 'Strong: realistic ambition and alignment with the company.' },
      { text: 'Probably at a different company making more money.', tone: 'Blunt', impact: 5, feedback: 'Weak: it signals low commitment and poor tact.' },
      { text: 'I have not thought about it much.', tone: 'Passive', impact: 8, feedback: 'Weak: it suggests limited planning and motivation.' },
    ],
  },
  {
    question: 'How do you handle working under pressure?',
    prompt: 'Show process, composure, and teamwork.',
    options: [
      { text: 'I prioritize tasks, break them into manageable steps, and communicate clearly so the team stays focused.', tone: 'Professional', impact: 28, feedback: 'Strong: organized, calm, and collaborative.' },
      { text: 'I usually panic, but things sort themselves out eventually.', tone: 'Too Honest', impact: 7, feedback: 'Weak: it does not show control or strategy.' },
      { text: 'I do not deal with pressure. I just leave early.', tone: 'Blunt', impact: 1, feedback: 'Poor: it signals unreliability.' },
    ],
  },
  {
    question: 'Do you have any questions for us?',
    prompt: 'The best candidates ask thoughtful questions.',
    options: [
      { text: 'Yes. What would success in this role look like in the first six months?', tone: 'Professional', impact: 28, feedback: 'Strong: thoughtful, forward-looking, and role-focused.' },
      { text: 'No, I just want to know when lunch happens.', tone: 'Casual', impact: 4, feedback: 'Weak: it misses the chance to show interest.' },
      { text: 'Only how fast I can get promoted.', tone: 'Self-focused', impact: 7, feedback: 'Weak: ambition matters, but this sounds narrow.' },
    ],
  },
];

class InterviewSimulator extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQ = 0;
    this.score = 0;
    this.hireability = 0;
    this.rounds = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="isim-game">
        <div class="isim-panel">
          <div class="isim-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Interview Simulator</div>
              <div class="progress" id="progress-text">Question 1 of 6</div>
            </div>
            <div class="pill">💼 <span id="hire-val">0</span>%</div>
          </div>

          <div class="meter-box">
            <div class="meter-label">Hireability</div>
            <div class="meter-track"><div class="meter-fill" id="meter-fill"></div></div>
          </div>

          <div class="question-card">
            <div class="avatar">👔</div>
            <div class="question-text" id="question-text">Loading...</div>
            <div class="prompt-text" id="prompt-text">Choose the strongest response.</div>
          </div>

          <div class="options-list" id="options-list"></div>
          <div class="feedback-box" id="feedback-box">Select the most professional answer.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .isim-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#f4f7f6 0%,#dde8e4 100%);font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}.isim-panel{width:min(860px,96%);background:#fff;border-radius:30px;box-shadow:0 20px 50px rgba(0,0,0,.12);padding:22px;display:flex;flex-direction:column;gap:16px}.isim-topbar{display:flex;align-items:center;gap:12px}.pill{background:#edf6f2;color:#285c4d;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:30px;color:#21313b;font-weight:900}.progress{font-size:14px;color:#6f7f88}.meter-box{background:#f3f6f7;border-radius:18px;padding:14px}.meter-label{font-size:13px;color:#667784;font-weight:700;margin-bottom:8px}.meter-track{height:14px;background:#dde6ea;border-radius:999px;overflow:hidden}.meter-fill{height:100%;width:0;background:linear-gradient(90deg,#ffb142,#26de81);transition:width .35s ease}.question-card{background:#263238;color:#fff;border-radius:24px;padding:22px;text-align:center}.avatar{font-size:54px;margin-bottom:10px}.question-text{font-size:27px;line-height:1.35}.prompt-text{margin-top:10px;font-size:16px;color:#b7c7cf}.options-list{display:flex;flex-direction:column;gap:12px}.reply-btn{border:none;background:#fff;border:2px solid #dbe5ea;border-radius:18px;padding:16px 18px;text-align:left;font-size:17px;line-height:1.45;cursor:pointer;transition:all .2s}.reply-btn:hover{transform:translateX(4px);border-color:#5f9ea0;box-shadow:0 10px 20px rgba(0,0,0,.06)}.reply-btn.correct{background:#edfff5;border-color:#2ecc71}.reply-btn.partial{background:#fff8e7;border-color:#f5b041}.reply-btn.wrong{background:#fff0f0;border-color:#ff6b6b}.feedback-box{background:#f7fafb;border-left:5px solid #5f9ea0;border-radius:12px;padding:14px 16px;color:#39505b;font-size:16px;min-height:52px}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.currentQ = 0;
    this.score = 0;
    this.hireability = 0;
    this.rounds = [...INTERVIEW_ROUNDS].sort(() => Math.random() - 0.5);
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.currentQ >= this.rounds.length) return this.end();
    const q = this.rounds[this.currentQ];
    document.getElementById('progress-text').textContent = `Question ${this.currentQ + 1} of ${this.rounds.length}`;
    document.getElementById('question-text').textContent = q.question;
    document.getElementById('prompt-text').textContent = q.prompt;
    document.getElementById('feedback-box').textContent = 'Select the most professional answer.';

    const list = document.getElementById('options-list');
    list.innerHTML = q.options.map((opt, idx) => `<button class="reply-btn" data-idx="${idx}">${window.UEAH_SAFE.escapeHtml(opt.text)}</button>`).join('');
    list.querySelectorAll('.reply-btn').forEach((btn) => {
      btn.onclick = () => this.handleResponse(Number(btn.dataset.idx), btn);
    });
  }

  handleResponse(idx, btn) {
    const q = this.rounds[this.currentQ];
    const opt = q.options[idx];
    const bestImpact = Math.max(...q.options.map((o) => o.impact));
    const isBest = opt.impact === bestImpact;
    const isMid = opt.impact >= 8 && opt.impact < bestImpact;

    if (isBest) {
      btn.classList.add('correct');
      this.addScore(180);
      this.hireability = Math.min(100, this.hireability + opt.impact);
      this.celebrateMove({ burst: 'HIRED', duration: 900 });
    } else if (isMid) {
      btn.classList.add('partial');
      this.addScore(60);
      this.hireability = Math.min(100, this.hireability + Math.round(opt.impact / 2));
      this.coachMove('Better than a careless answer, but not the strongest one.', 1000);
    } else {
      btn.classList.add('wrong');
      this.hireability = Math.max(0, this.hireability - 6);
      this.coachMove('That answer weakens your professional impression.', 1000);
    }

    document.getElementById('feedback-box').textContent = `${opt.feedback} Tone: ${opt.tone}.`;
    document.getElementById('score-val').textContent = this.score;
    document.getElementById('hire-val').textContent = this.hireability;
    document.getElementById('meter-fill').style.width = `${this.hireability}%`;

    document.querySelectorAll('.reply-btn').forEach((b) => b.disabled = true);
    setTimeout(() => {
      this.currentQ += 1;
      this.loadQuestion();
    }, 1400);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new InterviewSimulator(container, config);
}
