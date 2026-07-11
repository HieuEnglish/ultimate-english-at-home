/* assets/js/games/11-12/sentence-shuffle.js
   Sentence Shuffle - Ages 11-12

   Senior pass:
   - Better reorder workflow with remove/reset support
   - Stronger sentence grammar payoff and clearer structure practice
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
  { sentence: 'The children were playing in the garden', grammar: 'Past continuous' },
  { sentence: 'She has been studying English for three years', grammar: 'Present perfect continuous' },
  { sentence: 'If it rains tomorrow, we will stay home', grammar: 'First conditional' },
  { sentence: 'The book was written by a famous author', grammar: 'Passive voice' },
  { sentence: 'By the time we arrived, the movie had started', grammar: 'Past perfect' },
  { sentence: 'Although it was raining, they went for a walk', grammar: 'Concessive clause' },
  { sentence: 'She asked me where I had been', grammar: 'Reported question' },
  { sentence: 'Unless you study hard, you will not pass the exam', grammar: 'Unless conditional' },
];

class SentenceShuffleGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 170 });
    this.currentSentence = null;
    this.selectedWords = [];
    this.rounds = 0;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="sshuffle-game">
        <div class="sshuffle-panel">
          <div class="sshuffle-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Sentence Shuffle</div>
              <div class="subtitle" id="grammar-hint-text">Past continuous</div>
            </div>
            <div class="pill">⏱️ <span id="timer-val">2:50</span></div>
          </div>

          <div class="answer-zone" id="answer-zone"></div>
          <div class="scatter-zone" id="scatter-zone"></div>

          <div class="control-panel">
            <button class="btn" id="reset-btn">Reset</button>
            <button class="btn" id="undo-btn">Undo</button>
            <button class="btn check-btn" id="check-btn">Check</button>
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
      .sshuffle-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#dfe4ea 0%,#ced6e0 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}.sshuffle-panel{width:min(820px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:16px}.sshuffle-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2f3542}.subtitle{font-size:16px;color:#57606f}
      .answer-zone,.scatter-zone{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;min-height:82px;padding:16px;border-radius:22px}.answer-zone{background:#f1f2f6;border:2px dashed #a4b0be}.scatter-zone{background:#dfe4ea}.magnet-word{border:none;background:#fff;padding:12px 16px;border-radius:14px;font-size:18px;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.08)}.magnet-word.placed{background:#fefefe}.magnet-word.correct{background:#edfff0;box-shadow:0 6px 0 #4cd137}.magnet-word.wrong{background:#fff0f0;box-shadow:0 6px 0 #ff6b6b}
      .control-panel{display:flex;justify-content:center;gap:12px}.btn{border:none;border-radius:12px;padding:12px 18px;font-size:16px;font-weight:800;cursor:pointer;background:#a4b0be;color:#2f3542}.check-btn{background:#2ed573;color:#fff}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    document.getElementById('reset-btn').onclick = () => this.resetBoard();
    document.getElementById('undo-btn').onclick = () => this.undoLast();
    document.getElementById('check-btn').onclick = () => this.checkAnswer();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= 8) return this.end();
    this.rounds += 1;
    this.selectedWords = [];
    this.currentSentence = [...SENTENCES].sort(() => Math.random() - 0.5)[0];
    document.getElementById('grammar-hint-text').textContent = this.currentSentence.grammar;
    this.renderRound();
  }

  renderRound() {
    const answerZone = document.getElementById('answer-zone');
    answerZone.replaceChildren();
    this.selectedWords.forEach((word, idx) => {
      const mag = this.createWordButton(word, 'magnet-word placed');
      mag.dataset.index = String(idx);
      mag.onclick = () => this.removeFromAnswer(Number(mag.dataset.index));
      answerZone.appendChild(mag);
    });

    const pool = this.currentSentence.sentence.split(' ').sort(() => Math.random() - 0.5);
    const used = [...this.selectedWords];
    const scatter = document.getElementById('scatter-zone');
    scatter.replaceChildren();
    pool.forEach((word) => {
      const available = this.currentSentence.sentence.split(' ').filter((w) => w === word).length;
      const usedCount = used.filter((w) => w === word).length;
      const disabled = usedCount >= available;
      const mag = this.createWordButton(word, `magnet-word ${disabled ? 'placed' : ''}`);
      mag.dataset.word = String(word);
      mag.disabled = disabled;
      if (!disabled) mag.onclick = () => this.addToAnswer(mag.dataset.word);
      scatter.appendChild(mag);
    });
  }

  createWordButton(word, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = String(word);
    return button;
  }

  addToAnswer(word) {
    this.selectedWords.push(word);
    this.renderRound();
  }

  removeFromAnswer(index) {
    this.selectedWords.splice(index, 1);
    this.renderRound();
  }

  resetBoard() {
    this.selectedWords = [];
    this.renderRound();
  }

  undoLast() {
    this.selectedWords.pop();
    this.renderRound();
  }

  checkAnswer() {
    const answer = this.selectedWords.join(' ');
    const correct = this.currentSentence.sentence;
    const placed = [...document.querySelectorAll('#answer-zone .magnet-word')];
    if (answer === correct) {
      placed.forEach((el) => el.classList.add('correct'));
      this.incrementCombo();
      this.addScore(150);
      this.correctAnswers += 1;
      document.getElementById('score-val').textContent = this.score;
      this.celebrateMove({ burst: 'ORDER', duration: 900 });
      setTimeout(() => this.nextRound(), 1100);
      return;
    }

    placed.forEach((el) => el.classList.add('wrong'));
    this.resetCombo();
    this.coachMove('That sentence order is not correct yet.', 1000);
    setTimeout(() => this.renderRound(), 700);
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
  return new SentenceShuffleGame(container, config);
}
