/* assets/js/games/13-18/tone-tuner.js
   Tone Tuner - Ages 13-18

   Senior pass:
   - Clearer tone-matching loop with explicit context coaching
   - Better distinction between formal, casual, warm, and assertive choices
   - Stronger feedback for register awareness
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SCENARIOS = [
  {
    context: 'Emailing a professor about a late assignment.',
    target: 'Formal / Academic',
    answerKey: 'Formal',
    options: [
      { text: 'Yo, I will hit you up with that paper tomorrow. My bad!', tone: 'Slang', feedback: 'Too casual and inappropriate for academic communication.' },
      { text: 'I am writing to request an extension for my submission due to unforeseen circumstances.', tone: 'Formal', feedback: 'Best fit: respectful, clear, and professional.' },
      { text: 'Hey professor, can I send the work tomorrow? I was sick.', tone: 'Neutral', feedback: 'Better, but still too casual for the context.' },
      { text: 'Submission is delayed. Expect delivery in 24 hours.', tone: 'Robotic', feedback: 'Too cold and unnatural for a polite request.' },
    ],
  },
  {
    context: 'Texting a close friend to see if they are coming to the party.',
    target: 'Informal / Friendly',
    answerKey: 'Informal',
    options: [
      { text: 'I am inquiring about your attendance at the social gathering this evening.', tone: 'Professional', feedback: 'Too stiff for a friend.' },
      { text: 'Are you coming to the party tonight?', tone: 'Neutral', feedback: 'Acceptable, but not the most natural friendly tone.' },
      { text: 'U coming tonight? It is gonna be fun!', tone: 'Informal', feedback: 'Best fit: relaxed and friendly for a casual text.' },
      { text: 'Please confirm your arrival for the 8 PM event.', tone: 'Formal', feedback: 'Too formal for a close friend.' },
    ],
  },
  {
    context: 'Writing a thank-you note to your grandmother for a gift.',
    target: 'Warm / Polite',
    answerKey: 'Warm',
    options: [
      { text: 'Thanks for the stuff, it is cool.', tone: 'Casual', feedback: 'Too flat and impersonal for a heartfelt note.' },
      { text: 'Receipt of gift acknowledged. Appreciation expressed.', tone: 'Robotic', feedback: 'Too cold and unnatural.' },
      { text: 'Thank you so much for the lovely gift, Grandma. I really appreciate your kindness.', tone: 'Warm', feedback: 'Best fit: warm, personal, and polite.' },
      { text: 'The item has been received and integrated into my collection.', tone: 'Analytical', feedback: 'This sounds unnatural and distant.' },
    ],
  },
  {
    context: 'Explaining in a job interview why you want the position.',
    target: 'Professional / Enthusiastic',
    answerKey: 'Professional',
    options: [
      { text: 'I am highly motivated to contribute to your team and grow within this role.', tone: 'Professional', feedback: 'Best fit: positive, professional, and role-focused.' },
      { text: 'I just need a job to pay the bills, honestly.', tone: 'Blunt', feedback: 'Too blunt and self-focused.' },
      { text: 'Give me the job and I will work hard, I guess.', tone: 'Passive', feedback: 'Too uncertain and weak.' },
      { text: 'Looking for a gig with good vibes and decent pay.', tone: 'Casual', feedback: 'Too casual for an interview.' },
    ],
  },
  {
    context: 'Asking a boss for a pay rise.',
    target: 'Assertive / Professional',
    answerKey: 'Assertive',
    options: [
      { text: 'Hey, can you give me more money?', tone: 'Casual', feedback: 'Too casual and unsupported.' },
      { text: 'I have been here a while, so I think I deserve a raise.', tone: 'Vague', feedback: 'Too weak and lacking evidence.' },
      { text: 'Based on my performance and increased responsibilities, I would like to discuss a salary review.', tone: 'Assertive', feedback: 'Best fit: respectful, evidence-based, and confident.' },
      { text: 'I will quit if I do not get paid more starting Monday.', tone: 'Aggressive', feedback: 'Too threatening and unprofessional.' },
    ],
  },
];

class ToneTuner extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQ = 0;
    this.score = 0;
    this.rounds = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="tt-game">
        <div class="tt-panel">
          <div class="tt-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Tone Tuner</div>
              <div class="progress" id="progress-text">Scenario 1 of 5</div>
            </div>
            <div class="pill">🎚️</div>
          </div>

          <div class="context-card">
            <div class="context-label">Scenario</div>
            <div class="context-text" id="context-text">Loading...</div>
            <div class="target-tone">Target tone: <span id="target-tone">Formal</span></div>
          </div>

          <div class="options-list" id="options-list"></div>
          <div class="feedback-box" id="feedback-box">Choose the sentence with the most appropriate register.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .tt-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#121212 0%,#1e1e1e 100%);font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.tt-panel{width:min(860px,96%);background:#1f1f1f;border:1px solid #333;border-radius:28px;padding:22px;display:flex;flex-direction:column;gap:16px;box-shadow:0 18px 50px rgba(0,0,0,.35)}.tt-topbar{display:flex;align-items:center;gap:12px}.pill{background:#2a2a2a;color:#8cf7ea;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:30px;font-weight:900;color:#fff}.progress{font-size:14px;color:#b8c7cb}.context-card{background:#252525;border:1px solid #444;border-radius:22px;padding:20px;text-align:center}.context-label{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#03dac6;font-weight:800;margin-bottom:8px}.context-text{font-size:26px;line-height:1.45}.target-tone{margin-top:14px;background:rgba(187,134,252,.12);border:1px solid rgba(187,134,252,.4);padding:11px 14px;border-radius:12px;color:#d9c1ff;font-weight:700}.options-list{display:flex;flex-direction:column;gap:12px}.tone-btn{border:none;background:#2a2a2a;color:#f1f1f1;border:2px solid #3b3b3b;border-radius:16px;padding:16px;text-align:left;font-size:17px;line-height:1.45;cursor:pointer;transition:all .2s}.tone-btn:hover{transform:translateX(4px);border-color:#bb86fc}.tone-btn.correct{background:#11352f;border-color:#03dac6}.tone-btn.partial{background:#3b3321;border-color:#ffca70}.tone-btn.wrong{background:#3a2127;border-color:#ff8fa3}.feedback-box{background:#252525;border-left:4px solid #bb86fc;border-radius:12px;padding:14px 16px;color:#ded2f6}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.currentQ = 0;
    this.score = 0;
    this.rounds = [...SCENARIOS].sort(() => Math.random() - 0.5);
    this.loadScenario();
  }

  loadScenario() {
    if (this.currentQ >= this.rounds.length) return this.end();
    const q = this.rounds[this.currentQ];
    document.getElementById('progress-text').textContent = `Scenario ${this.currentQ + 1} of ${this.rounds.length}`;
    document.getElementById('context-text').textContent = q.context;
    document.getElementById('target-tone').textContent = q.target;
    document.getElementById('feedback-box').textContent = 'Choose the sentence with the most appropriate register.';

    const list = document.getElementById('options-list');
    const options = [...q.options].sort(() => Math.random() - 0.5);
    list.innerHTML = options.map((opt, idx) => `<button class="tone-btn" data-idx="${idx}">${opt.text}</button>`).join('');
    list.querySelectorAll('.tone-btn').forEach((btn) => {
      btn.onclick = () => this.handleAnswer(options[Number(btn.dataset.idx)], btn);
    });
  }

  handleAnswer(option, btn) {
    const q = this.rounds[this.currentQ];
    const acceptableNeutral = q.answerKey !== 'Formal' && q.answerKey !== 'Assertive' && option.tone === 'Neutral';

    if (option.tone === q.answerKey) {
      btn.classList.add('correct');
      this.addScore(150);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('feedback-box').textContent = option.feedback;
      this.celebrateMove({ burst: option.tone.toUpperCase(), duration: 900 });
    } else if (acceptableNeutral) {
      btn.classList.add('partial');
      this.addScore(50);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('feedback-box').textContent = `${option.feedback} It works somewhat, but it is not the strongest tone match.`;
      this.coachMove('Close, but not the best register match.', 1000);
    } else {
      btn.classList.add('wrong');
      document.getElementById('feedback-box').textContent = option.feedback;
      this.coachMove('The register does not fit the relationship or context.', 1000);
    }

    document.querySelectorAll('.tone-btn').forEach((b) => b.disabled = true);
    setTimeout(() => {
      this.currentQ += 1;
      this.loadScenario();
    }, 1300);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ToneTuner(container, config);
}
