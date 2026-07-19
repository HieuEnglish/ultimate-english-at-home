/* assets/js/games/8-10/sentence-surgeon.js
   Sentence Surgeon - Ages 8-10

   Senior pass:
   - Stronger diagnosis/fix loop with explicit broken part
   - Better explanation, pacing, and sentence payoff
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const PATIENTS = [
  { before: 'He __ fast.', target: 'run', correct: 'runs', options: ['runs', 'runned', 'running'], label: 'Verb agreement', fixed: 'He runs fast.' },
  { before: 'I like __.', target: 'apple', correct: 'apples', options: ['apples', "apple's", 'app'], label: 'Plural noun', fixed: 'I like apples.' },
  { before: 'She __ home.', target: 'going', correct: 'is going', options: ['is going', 'go', 'gone'], label: 'Linking verb', fixed: 'She is going home.' },
  { before: 'The cat __.', target: 'sleeping', correct: 'is sleeping', options: ['is sleeping', 'sleep', 'sleeps'], label: 'Missing verb', fixed: 'The cat is sleeping.' },
  { before: 'We __ happy.', target: 'was', correct: 'were', options: ['were', 'is', 'am'], label: 'Verb tense', fixed: 'We were happy.' },
  { before: '__ hungry.', target: 'Me', correct: 'I am', options: ['I am', 'My', 'Mine'], label: 'Subject', fixed: 'I am hungry.' },
  { before: 'Where is it__', target: '.', correct: '?', options: ['?', '.', '!'], label: 'Question punctuation', fixed: 'Where is it?' },
  { before: 'They __ playing.', target: 'is', correct: 'are', options: ['are', 'is', 'was'], label: 'Subject-verb match', fixed: 'They are playing.' },
  { before: '__ ate lunch.', target: 'Him', correct: 'He', options: ['He', 'Him', 'His'], label: 'Pronoun', fixed: 'He ate lunch.' },
  { before: 'The dogs __ barking.', target: 'is', correct: 'are', options: ['are', 'is', 'was'], label: 'Plural verb', fixed: 'The dogs are barking.' },
];

class SentenceSurgeonGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentPatient = null;
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ssurg-game">
        <div class="ssurg-panel">
          <div class="ssurg-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Sentence Surgeon</div>
              <div class="progress" id="progress-text">Case 1 of ${this.maxRounds}</div>
            </div>
            <div class="pill">🩺</div>
          </div>

          <div class="monitor-screen">
            <div class="diagnosis-text">Diagnosis: <span id="error-type">Verb agreement</span></div>
          </div>

          <div class="patient-card">
            <div class="patient-label">Broken sentence</div>
            <div class="patient-sentence" id="patient-sentence">He __ fast.</div>
            <div class="patient-note" id="patient-note">Fix the underlined problem area.</div>
          </div>

          <div class="tools-tray" id="tools-tray"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ssurg-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#dff9fb 0%,#81ecec 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ssurg-panel{width:min(780px,96%);background:rgba(255,255,255,.94);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}.ssurg-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#006266}.progress{font-size:14px;color:#607d8b}
      .monitor-screen{background:#2d3436;border-radius:18px;padding:14px 18px;text-align:center}.diagnosis-text{color:#55efc4;font-size:22px}
      .patient-card{background:#fff;border:3px solid #d9ebff;border-radius:28px;padding:20px;text-align:center}.patient-label{font-size:18px;color:#7f8c8d;text-transform:uppercase}.patient-sentence{font-size:38px;color:#2d3436;margin:10px 0}.patient-note{font-size:18px;color:#5f6f81}
      .tools-tray{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.tool-btn{border:none;background:#fff;border-radius:20px;padding:18px 14px;font-size:24px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff;transition:transform .12s,border-color .2s}.tool-btn:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.tool-btn.correct{background:#edfff0;border-color:#4cd137}.tool-btn.wrong{background:#fff0f0;border-color:#ff6b6b}.tool-btn.dim{opacity:.45}
      @media (max-width:720px){.tools-tray{grid-template-columns:1fr}.patient-sentence{font-size:30px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;
    this.currentPatient = this.pickFromBag(PATIENTS, 'patients');

    document.getElementById('progress-text').textContent = `Case ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('error-type').textContent = this.currentPatient.label;
    document.getElementById('patient-sentence').textContent = this.currentPatient.before;
    document.getElementById('patient-note').textContent = `Replace "${this.currentPatient.target}" with the best fix.`;

    const tray = document.getElementById('tools-tray');
    const opts = [...this.currentPatient.options].sort(() => Math.random() - 0.5);
    tray.replaceChildren();
    opts.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tool-btn';
      btn.dataset.val = String(opt);
      btn.textContent = String(opt);
      btn.onclick = () => this.handleFix(btn);
      tray.appendChild(btn);
    });
  }

  handleFix(btn) {
    if (this.locked) return;
    const val = btn.dataset.val;
    const buttons = [...this.container.querySelectorAll('.tool-btn')];

    if (val === this.currentPatient.correct) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      document.getElementById('patient-sentence').textContent = this.currentPatient.fixed;
      document.getElementById('patient-note').textContent = 'Sentence repaired successfully.';
      this.incrementCombo();
      this.addScore(130);
      document.getElementById('score-val').textContent = this.score;
      this.confetti.explode(null, null, 16);
      this.celebrateMove({ burst: 'FIXED', duration: 900 });
      setTimeout(() => this.nextRound(), 1300);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`${val} does not repair the sentence.`, 950);
    setTimeout(() => btn.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new SentenceSurgeonGame(container, config);
}
