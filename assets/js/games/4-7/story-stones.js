/* assets/js/games/4-7/story-stones.js
   Story Stones - Ages 4-7

   Senior pass:
   - Stronger sentence-building loop with visible completion and clearer reading support
   - Better pacing and feedback than the old single blank pick flow
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
  { text: 'The __ is red.', answer: 'Apple', options: ['Apple', 'Moon', 'Grass'], emoji: '🍎' },
  { text: 'I see a __.', answer: 'Dog', options: ['Dog', 'Car', 'Sun'], emoji: '🐶' },
  { text: 'The __ is big.', answer: 'Elephant', options: ['Elephant', 'Ant', 'Pin'], emoji: '🐘' },
  { text: 'The __ shines.', answer: 'Sun', options: ['Sun', 'Book', 'Chair'], emoji: '☀️' },
  { text: 'I can __ fast.', answer: 'Run', options: ['Run', 'Sit', 'Sleep'], emoji: '🏃' },
  { text: 'The __ says meow.', answer: 'Cat', options: ['Cat', 'Cow', 'Pig'], emoji: '🐱' },
  { text: 'A __ can fly.', answer: 'Bird', options: ['Bird', 'Fish', 'Dog'], emoji: '🐦' },
  { text: 'The __ swims.', answer: 'Fish', options: ['Fish', 'Cat', 'Bird'], emoji: '🐟' },
  { text: 'The __ is yellow.', answer: 'Banana', options: ['Banana', 'Grape', 'Berry'], emoji: '🍌' },
  { text: 'The __ hops.', answer: 'Frog', options: ['Frog', 'Snake', 'Fish'], emoji: '🐸' },
];

class StoryStonesGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentSentence = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="sstones-game">
        <div class="sstones-panel">
          <div class="sstones-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Story Stones</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="sentence-card">
            <div class="image-hint" id="image-hint">🍎</div>
            <div class="sentence-text" id="sentence-text">The __ is red.</div>
          </div>

          <div class="stones-container" id="stones-area"></div>
          <div class="helper" id="helper-text">Choose the best word to finish the sentence.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .sstones-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#81ecec 0%,#74b9ff 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .sstones-panel{width:min(760px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:18px}
      .sstones-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#0984e3}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#74b9ff;color:#fff;cursor:pointer;box-shadow:0 5px 0 #0984e3;font-size:24px}
      .sentence-card{background:#fff;border:3px solid #d9ebff;border-radius:28px;padding:22px;display:flex;align-items:center;gap:18px}.image-hint{width:92px;height:92px;border-radius:50%;background:#f1f7ff;display:flex;align-items:center;justify-content:center;font-size:54px}.sentence-text{font-size:32px;color:#2d3436;line-height:1.2}
      .stones-container{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.stone-btn{border:none;background:#95a5a6;border-radius:999px;padding:18px 14px;color:#fff;font-size:24px;cursor:pointer;box-shadow:0 8px 0 #7f8c8d;transition:transform .12s,opacity .2s}.stone-btn:active{transform:translateY(6px);box-shadow:0 2px 0 #7f8c8d}.stone-btn.correct{background:#00b894;box-shadow:0 8px 0 #00a382}.stone-btn.wrong{background:#e17055;box-shadow:0 8px 0 #d35400}.stone-btn.dim{opacity:.45}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.stones-container{grid-template-columns:1fr}.sentence-card{flex-direction:column;text-align:center}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.speakSentence();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    this.currentSentence = this.pickFromBag(SENTENCES, 'sentences');
    this.options = [...this.currentSentence.options].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('sentence-text').textContent = this.currentSentence.text;
    document.getElementById('image-hint').textContent = this.currentSentence.emoji;
    document.getElementById('helper-text').textContent = 'Choose the best word to finish the sentence.';

    const stones = document.getElementById('stones-area');
    stones.innerHTML = this.options.map((opt) => `<button class="stone-btn" data-word="${opt}">${opt}</button>`).join('');
    stones.querySelectorAll('.stone-btn').forEach((btn) => {
      btn.onclick = () => this.handlePick(btn);
    });

    setTimeout(() => this.speakSentence(), 450);
  }

  speakSentence() {
    if (!this.currentSentence) return;
    this.speak(this.currentSentence.text.replace('__', 'blank'), { rate: 0.9 });
  }

  handlePick(btn) {
    if (this.locked) return;
    const word = btn.dataset.word;
    const buttons = [...this.container.querySelectorAll('.stone-btn')];

    if (word === this.currentSentence.answer) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      const fullSentence = this.currentSentence.text.replace('__', word);
      document.getElementById('sentence-text').textContent = fullSentence;
      document.getElementById('helper-text').textContent = 'Nice sentence reading!';
      this.incrementCombo();
      this.addScore(120);
      document.getElementById('score-val').textContent = this.score;
      this.speak(fullSentence);
      this.confetti.explode(null, null, 16);
      this.celebrateMove({ burst: word.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextRound(), 1400);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`${word} does not fit best here.`, 900);
    setTimeout(() => btn.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new StoryStonesGame(container, config);
}
