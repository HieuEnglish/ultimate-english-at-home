/* assets/js/games/11-12/code-breaker.js
   Code Breaker - Ages 11-12

   Senior pass:
   - Clearer decode loop with explicit answer matching
   - Better mission progression and stronger feedback than freeform brittle checking
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const CODES = [
  { text: 'The_cat_sat_on_the_mat', answer: 'The cat sat on the mat', hint: 'Add the missing spaces.' },
  { text: 'She [go/goes] to school every day', answer: 'goes', hint: 'Choose the correct verb form.' },
  { text: 'Th_y ar_ h_ppy', answer: 'They are happy', hint: 'Restore the missing vowels.' },
  { text: 'I have [see/seen] that movie', answer: 'seen', hint: 'Use the correct past participle.' },
  { text: 'He is [taller/tallest] than me', answer: 'taller', hint: 'Compare two things.' },
  { text: 'Wh_re is the lib_ary?', answer: 'Where is the library?', hint: 'Repair the spelling.' },
  { text: 'We [was/were] playing football', answer: 'were', hint: 'Plural subject in the past.' },
  { text: 'He [don\'t/doesn\'t] like homework', answer: "doesn't", hint: 'Fix the negative agreement.' },
];

class CodeBreakerGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 110 });
    this.currentCode = null;
    this.rounds = 0;
    this.maxRounds = 6;
    this.queue = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="cb-game">
        <div class="cb-panel">
          <div class="cb-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Code Breaker</div>
              <div class="progress" id="progress-text">Signal 1 of ${this.maxRounds}</div>
            </div>
            <div class="pill">⏱️ <span id="timer-val">1:50</span></div>
          </div>

          <div class="console-log" id="console-log">> Secure channel open.<br>> Awaiting encrypted message...</div>

          <div class="code-display">
            <div class="label">INTERCEPTED MESSAGE</div>
            <div class="cipher-text" id="cipher-text">LOADING...</div>
          </div>

          <div class="hint-box" id="hint-box">Hint: ...</div>

          <div class="input-area">
            <span class="prompt">></span>
            <input type="text" id="decoder-input" class="cmd-input" placeholder="Enter solution..." autocomplete="off">
            <button id="decrypt-btn" class="cmd-btn">DECRYPT</button>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cb-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#000 0%,#071a07 100%);font-family:'Courier New',monospace;display:flex;align-items:center;justify-content:center;padding:20px;color:#33ff00}.cb-panel{width:min(820px,96%);background:rgba(10,20,10,.95);border:1px solid #33ff00;border-radius:18px;box-shadow:0 0 20px rgba(51,255,0,.15);padding:20px;display:flex;flex-direction:column;gap:16px}.cb-topbar{display:flex;align-items:center;gap:12px}.pill{background:#102510;color:#9cff7a;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:30px;color:#c6ffb3}.progress{font-size:14px;color:#6bbd59}
      .console-log{height:72px;overflow:auto;background:#061206;border:1px solid #1f4f1f;border-radius:12px;padding:12px;font-size:13px;color:#79ff79}.code-display{background:rgba(0,50,0,.5);padding:22px;border:1px dashed #33ff00;text-align:center;border-radius:14px}.label{font-size:11px;color:#63c763;margin-bottom:8px}.cipher-text{font-size:28px;font-weight:800;letter-spacing:1px;color:#d2ffd2}.hint-box{font-size:14px;color:#88ff88;background:#071307;padding:12px;border-left:4px solid #33ff00;border-radius:8px}.input-area{display:flex;gap:10px;align-items:center;background:#000;padding:12px;border:1px solid #336633;border-radius:12px}.prompt{font-weight:800}.cmd-input{flex:1;background:transparent;border:none;color:#fff;font-family:inherit;font-size:18px;outline:none}.cmd-btn{background:#33ff00;color:#000;border:none;padding:10px 16px;font-weight:800;cursor:pointer;border-radius:8px}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.queue = [...CODES].sort(() => Math.random() - 0.5).slice(0, this.maxRounds);
    this.rounds = 0;
    document.getElementById('decrypt-btn').onclick = () => this.checkAnswer();
    document.getElementById('decoder-input').onkeydown = (e) => { if (e.key === 'Enter') this.checkAnswer(); };
    this.nextRound();
  }

  log(msg) {
    const log = document.getElementById('console-log');
    log.innerHTML += `<br>> ${msg}`;
    log.scrollTop = log.scrollHeight;
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.currentCode = this.queue[this.rounds];
    this.rounds += 1;
    document.getElementById('progress-text').textContent = `Signal ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('cipher-text').textContent = this.currentCode.text;
    document.getElementById('hint-box').textContent = `Hint: ${this.currentCode.hint}`;
    document.getElementById('decoder-input').value = '';
    document.getElementById('decoder-input').focus();
    this.log(`Signal ${this.rounds} intercepted. Start decoding.`);
  }

  checkAnswer() {
    const input = document.getElementById('decoder-input');
    const val = input.value.trim();
    if (!val) return;

    if (val.toLowerCase() === this.currentCode.answer.toLowerCase()) {
      this.addScore(160);
      document.getElementById('score-val').textContent = this.score;
      this.log('Decryption successful. Access granted.');
      this.celebrateMove({ burst: 'ACCESS', duration: 900 });
      setTimeout(() => this.nextRound(), 900);
      return;
    }

    this.coachMove('Decryption failed. Check the clue and try again.', 1000);
    this.log('ERROR: Invalid decode string.');
    input.value = '';
    input.focus();
  }

  onTimerTick(remaining) {
    document.getElementById('timer-val').textContent = this.formatTime(remaining);
    super.onTimerTick(remaining);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new CodeBreakerGame(container, config);
}
