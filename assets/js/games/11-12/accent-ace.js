/* assets/js/games/11-12/accent-ace.js
   Accent Ace - Ages 11-12

   Senior pass:
   - Stronger quiz structure and cleaner listening loop
   - Better replayability and less novelty-only feel
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

class AccentAce extends GameBase {
  async init() {
    this.accents = [
      { id: 'us', name: 'American', lang: 'en-US', phrase: 'I am going to the movies to grab some popcorn and soda.' },
      { id: 'uk', name: 'British', lang: 'en-GB', phrase: 'I am heading to the cinema for some crisps and biscuits.' },
      { id: 'au', name: 'Australian', lang: 'en-AU', phrase: "G'day mate! Let's fire up the barbie in the backyard this afternoon." },
      { id: 'in', name: 'Indian', lang: 'en-IN', phrase: 'I will be completing the assignment by this evening, definitely.' },
      { id: 'ie', name: 'Irish', lang: 'en-IE', phrase: 'Grand day for a walk, is it not? The craic was mighty last night.' },
      { id: 'nz', name: 'New Zealand', lang: 'en-NZ', phrase: 'Sweet as, bro! Let us head to the dairy for some lollies.' },
    ];
    this.currentQ = 0;
    this.score = 0;
    this.voices = [];
    this.questions = [];

    this.container.innerHTML = `
      <div class="aa11-game">
        <div class="aa11-panel">
          <div class="aa11-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Accent Ace</div>
              <div class="progress" id="progress-text">Round 1 of 6</div>
            </div>
            <button class="hear-btn" id="hear-btn">🎧 Listen</button>
          </div>

          <div class="prompt-card">
            <div class="prompt-label">Which accent do you hear?</div>
            <div class="helper" id="helper-text">Listen carefully, then choose the best answer.</div>
          </div>

          <div class="options-grid" id="options-grid"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .aa11-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#001f3f 0%,#0d2b52 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.aa11-panel{width:min(820px,96%);background:rgba(255,255,255,.08);border-radius:34px;border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.3);padding:22px;display:flex;flex-direction:column;gap:18px}.aa11-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.progress{font-size:14px;color:#d3e8ff}.hear-btn{padding:12px 18px;background:#ffdc00;color:#001f3f;cursor:pointer}
      .prompt-card{background:rgba(255,255,255,.92);color:#333;border-radius:26px;padding:20px;text-align:center}.prompt-label{font-size:28px}.helper{font-size:18px;color:#5d6d7e;margin-top:10px}.options-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.opt-btn{border:none;background:#fff;color:#333;padding:18px;border-radius:18px;font-size:22px;font-weight:800;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff}.opt-btn:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.opt-btn.correct{background:#edfff0;border-color:#4cd137}.opt-btn.wrong{background:#fff0f0;border-color:#ff6b6b}
      @media (max-width:720px){.options-grid{grid-template-columns:1fr}}
    `;
    this.container.appendChild(style);
  }

  loadVoices() {
    const syncVoices = () => {
      this.voices = typeof window.UEAH_TTS?.getVoices === 'function'
        ? window.UEAH_TTS.getVoices()
        : [];
    };

    syncVoices();
    if (typeof window.UEAH_TTS?.ready === 'function') {
      window.UEAH_TTS.ready().then(syncVoices).catch(() => {});
    }
  }

  start() {
    super.start();
    this.loadVoices();
    this.questions = [...this.accents].sort(() => Math.random() - 0.5);
    document.getElementById('hear-btn').onclick = () => this.playAccent();
    this.currentQ = 0;
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.currentQ >= this.questions.length) return this.end();
    const q = this.questions[this.currentQ];
    document.getElementById('progress-text').textContent = `Round ${this.currentQ + 1} of ${this.questions.length}`;
    document.getElementById('helper-text').textContent = 'Listen carefully, then choose the best answer.';

    const options = [q, ...this.accents.filter((a) => a.id !== q.id).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('options-grid');
    grid.innerHTML = options.map((opt) => `<button class="opt-btn" data-id="${opt.id}">${opt.name}</button>`).join('');
    grid.querySelectorAll('.opt-btn').forEach((btn) => {
      btn.onclick = () => this.handleAnswer(btn, btn.dataset.id, q.id);
    });

    setTimeout(() => this.playAccent(), 400);
  }

  playAccent() {
    const q = this.questions[this.currentQ];
    let voice = this.voices.find((v) => v.lang.startsWith(q.lang));
    if (!voice) voice = this.voices.find((v) => v.lang.startsWith('en'));
    this.speak(q.phrase, { voice, rate: 0.9, pitch: 1.0 });
  }

  handleAnswer(btn, selectedId, correctId) {
    if (selectedId === correctId) {
      btn.classList.add('correct');
      this.addScore(140);
      document.getElementById('score-val').textContent = this.score;
      this.celebrateMove({ burst: selectedId.toUpperCase(), duration: 900 });
    } else {
      btn.classList.add('wrong');
      this.coachMove('That accent does not match the sample.', 950);
    }
    document.querySelectorAll('.opt-btn').forEach((b) => b.disabled = true);
    setTimeout(() => { this.currentQ += 1; this.loadQuestion(); }, 1100);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new AccentAce(container, config);
}
