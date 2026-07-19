/* assets/js/games/4-7/alphabet-soup.js
   Alphabet Soup - Ages 4-7

   Senior pass:
   - Clearer sequencing: collect letters in the correct order
   - Better progress, bigger feedback, and less visual clutter
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORDS = [
  { word: 'CAT', image: '🐱' },
  { word: 'DOG', image: '🐶' },
  { word: 'FISH', image: '🐟' },
  { word: 'BIRD', image: '🐦' },
  { word: 'FROG', image: '🐸' },
  { word: 'DUCK', image: '🦆' },
  { word: 'LION', image: '🦁' },
  { word: 'BEAR', image: '🐻' },
  { word: 'SUN', image: '☀️' },
  { word: 'HAT', image: '🎩' },
  { word: 'CUP', image: '🥤' },
  { word: 'BUS', image: '🚌' },
  { word: 'BOX', image: '📦' },
  { word: 'PEN', image: '🖊️' },
  { word: 'MAP', image: '🗺️' },
  { word: 'NET', image: '🥅' },
];

class AlphabetSoupGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWordObj = null;
    this.targetLetters = [];
    this.foundIndex = 0;
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="asoup-game">
        <div class="asoup-panel">
          <div class="asoup-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Alphabet Soup</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-board">
            <div class="target-image" id="target-image">🐱</div>
            <div>
              <div class="target-label">Spell this word</div>
              <div class="word-slots" id="word-slots"></div>
              <div class="helper" id="instruction-text">Tap the letters in order.</div>
            </div>
          </div>

          <div class="soup-bowl-container">
            <div class="soup-bowl">
              <div class="soup-surface" id="soup-surface"></div>
            </div>
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
      .asoup-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#fff2cc 0%,#fab1a0 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .asoup-panel{width:min(760px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:18px}
      .asoup-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#d63031}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#fdcb6e;color:#6b3d00;cursor:pointer;box-shadow:0 5px 0 #e17055;font-size:24px}
      .target-board{display:flex;align-items:center;gap:18px;background:linear-gradient(135deg,#fff9ef,#fff);border-radius:26px;border:3px solid #ffe2a5;padding:18px}.target-image{font-size:74px}.target-label{font-size:18px;color:#e17055;text-transform:uppercase}.word-slots{display:flex;gap:10px;margin:8px 0}.letter-slot{width:48px;height:58px;border-radius:14px;background:#f4f7fb;border:3px solid #d9e2ec;display:flex;align-items:center;justify-content:center;font-size:30px;color:#2d3436}.letter-slot.active{border-color:#6c5ce7}.letter-slot.filled{background:#e8fff0;border-color:#4cd137;color:#1e8449}.helper{font-size:20px;color:#4d6273}
      .soup-bowl-container{display:flex;justify-content:center}.soup-bowl{width:360px;height:360px;background:#fff;border-radius:50%;border:16px solid #dfe6e9;box-shadow:0 12px 25px rgba(0,0,0,.18);padding:12px}.soup-surface{position:relative;width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3bf 0%,#ffe08a 55%,#f6c453 100%);overflow:hidden}
      .noodle{position:absolute;width:54px;height:54px;border:none;border-radius:50%;background:#fff;color:#d63031;font-size:28px;font-weight:800;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.08);transition:transform .12s,opacity .2s}.noodle:active{transform:scale(.9)}.noodle.correct{background:#55efc4;color:#fff}.noodle.wrong{background:#ff7675;color:#fff}.noodle.collected{opacity:.25;pointer-events:none}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.foundIndex = 0;
    this.locked = false;

    this.currentWordObj = this.pickFromBag(WORDS, 'words');
    this.targetLetters = this.currentWordObj.word.split('');

    const distractors = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter((l) => !this.targetLetters.includes(l)).sort(() => Math.random() - 0.5).slice(0, 5);
    const soupLetters = [...this.targetLetters, ...distractors].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-image').textContent = this.currentWordObj.image;
    document.getElementById('instruction-text').textContent = 'Tap the letters in order.';

    const slotsDiv = document.getElementById('word-slots');
    slotsDiv.innerHTML = this.targetLetters.map((_, idx) => `<div class="letter-slot ${idx === 0 ? 'active' : ''}"></div>`).join('');

    const surface = document.getElementById('soup-surface');
    surface.innerHTML = '';
    soupLetters.forEach((char) => {
      const noodle = document.createElement('button');
      noodle.className = 'noodle';
      noodle.textContent = char;
      noodle.dataset.char = char;
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 30;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      noodle.style.left = `calc(${x}% - 27px)`;
      noodle.style.top = `calc(${y}% - 27px)`;
      noodle.onclick = () => this.handleNoodleClick(noodle);
      surface.appendChild(noodle);
    });

    setTimeout(() => this.speakInstruction(), 500);
  }

  speakInstruction() {
    if (!this.currentWordObj) return;
    this.speak(`Spell ${this.currentWordObj.word}`, { rate: 0.8 });
  }

  handleNoodleClick(noodle) {
    if (this.locked || noodle.classList.contains('collected')) return;
    const char = noodle.dataset.char;
    const requiredChar = this.targetLetters[this.foundIndex];
    const slots = [...this.container.querySelectorAll('.letter-slot')];

    if (char === requiredChar) {
      noodle.classList.add('correct', 'collected');
      slots[this.foundIndex].textContent = char;
      slots[this.foundIndex].classList.add('filled');
      slots[this.foundIndex].classList.remove('active');
      this.foundIndex += 1;
      if (slots[this.foundIndex]) slots[this.foundIndex].classList.add('active');
      this.speak(char, { rate: 0.9 });

      if (this.foundIndex >= this.targetLetters.length) {
        this.locked = true;
        this.incrementCombo();
        this.addScore(120);
        document.getElementById('score-val').textContent = this.score;
        document.getElementById('instruction-text').textContent = `Great spelling! ${this.currentWordObj.word}!`;
        this.speak(this.currentWordObj.word);
        this.confetti.explode(null, null, 20);
        this.celebrateMove({ burst: this.currentWordObj.word, duration: 900 });
        setTimeout(() => this.nextRound(), 1300);
      }
      return;
    }

    noodle.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`Find the letter ${requiredChar}.`, 900);
    setTimeout(() => noodle.classList.remove('wrong'), 500);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new AlphabetSoupGame(container, config);
}
