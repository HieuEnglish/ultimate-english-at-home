/* assets/js/games/8-10/word-detective-810.js
   Word Detective - Ages 8-10

   Find the word in the sentence that matches the given clue.
   Tap the correct word to solve the mystery!
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const PUZZLE_DATA = [
  {
    sentence: "The gentle breeze cooled my face after running the race.",
    clue: "A light, cool wind",
    answer: "breeze",
    distractor: "gentle"
  },
  {
    sentence: "My grandmother baked a delicious chocolate cake for my birthday.",
    clue: "A family member who is a parent of your parent",
    answer: "grandmother",
    distractor: "delicious"
  },
  {
    sentence: "The quick brown fox jumped over the lazy dog in the meadow.",
    clue: "A clever animal with pointed ears",
    answer: "fox",
    distractor: "brown"
  },
  {
    sentence: "Sarah whispered a secret to her best friend during class.",
    clue: "To speak very quietly",
    answer: "whispered",
    distractor: "secret"
  },
  {
    sentence: "The enormous elephant walked slowly across the hot savanna.",
    clue: "Something extremely large",
    answer: "enormous",
    distractor: "elephant"
  },
  {
    sentence: "After swimming, we sat on the sandy beach and dried off.",
    clue: "The shore of an ocean or lake",
    answer: "beach",
    distractor: "sandy"
  },
  {
    sentence: "The brave firefighter rescued the scared kitten from the tall tree.",
    clue: "Not being afraid",
    answer: "brave",
    distractor: "firefighter"
  },
  {
    sentence: "I happily ate my favorite pizza while watching cartoons on TV.",
    clue: "A feeling of joy",
    answer: "happily",
    distractor: "favorite"
  }
];

class WordDetectiveGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 90 });
    this.currentPuzzle = null;
    this.locked = false;
    this.words = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="wd-game">
        <div class="wd-panel">
          <div class="wd-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Word Detective</div>
              <div class="subtitle">Find the word that matches the clue.</div>
            </div>
            <div class="pill">🔍 <span id="round-val">1</span>/8</div>
          </div>

          <div class="clue-card">
            <div class="clue-label">Your Clue:</div>
            <div class="clue-text" id="clue-text"></div>
          </div>

          <div class="sentence-box">
            <div class="sentence-text" id="sentence-text"></div>
          </div>

          <div class="words-dock" id="words-dock"></div>
          <div class="helper" id="helper-text">Tap the word that matches the clue above.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .wd-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .wd-panel{width:min(780px,96%);background:rgba(255,255,255,.95);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}
      .wd-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#4a4a6a}.subtitle{font-size:14px;color:#607d8b}
      .clue-card{background:linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%);border-radius:24px;padding:20px;text-align:center;border:4px solid #fff}.clue-label{font-size:16px;color:#8b4513;text-transform:uppercase;margin-bottom:8px}.clue-text{font-size:26px;color:#8b4513;font-weight:bold}
      .sentence-box{background:#f8f9fa;border:3px solid #e9ecef;border-radius:20px;padding:20px;text-align:center}.sentence-text{font-size:24px;color:#333;line-height:1.6}
      .words-dock{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
      .word-btn{border:none;background:linear-gradient(135deg,#74b9ff 0%,#0984e3 100%);color:#fff;padding:14px 20px;border-radius:16px;font-size:20px;font-family:inherit;cursor:pointer;box-shadow:0 6px 0 rgba(0,0,0,.15);transition:transform .1s,box-shadow .1s;border:4px solid transparent}
      .word-btn:hover{transform:translateY(-3px);box-shadow:0 9px 0 rgba(0,0,0,.15)}
      .word-btn:active{transform:translateY(4px);box-shadow:0 2px 0 rgba(0,0,0,.15)}
      .word-btn.correct{background:linear-gradient(135deg,#55efc4 0%,#00b894 100%);border-color:#2ecc71;animation:wd-pop .4s ease}
      .word-btn.wrong{background:linear-gradient(135deg,#ff7675 0%,#d63031 100%);border-color:#e74c3c;animation:wd-shake .4s ease}
      .word-btn.dim{opacity:.4}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:20px;color:#465a65}
      @keyframes wd-pop{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
      @keyframes wd-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
      @media(max-width:720px){.sentence-text{font-size:20px}.clue-text{font-size:22px}.word-btn{padding:12px 16px;font-size:18px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.locked = false;
    this.nextQuestion();
  }

  nextQuestion() {
    this.locked = false;
    this.currentPuzzle = this.pickFromBag(PUZZLE_DATA, 'puzzles');

    // Build word array with target and distractors
    const sentenceWords = this.currentPuzzle.sentence.split(/\s+/).map(w => w.replace(/[.,!?]/g, ''));
    this.words = [...sentenceWords];

    // Shuffle words
    this.words.sort(() => Math.random() - 0.5);

    document.getElementById('clue-text').textContent = this.currentPuzzle.clue;
    document.getElementById('sentence-text').textContent = this.currentPuzzle.sentence;
    document.getElementById('helper-text').textContent = 'Tap the word that matches the clue above.';
    document.getElementById('round-val').textContent = Math.min(this.score + 1, 8);

    const dock = document.getElementById('words-dock');
    dock.innerHTML = this.words.map((word) => `<button class="word-btn" data-word="${word}">${word}</button>`).join('');
    dock.querySelectorAll('.word-btn').forEach((btn) => {
      btn.onclick = () => this.pickWord(btn, btn.dataset.word.toLowerCase() === this.currentPuzzle.answer.toLowerCase());
    });
  }

  pickWord(btn, isCorrect) {
    if (this.locked) return;
    const buttons = [...this.container.querySelectorAll('.word-btn')];

    if (isCorrect) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `✓ Correct! "${this.currentPuzzle.answer}" is the answer!`;
      this.confetti.explode(null, null, 12);
      this.celebrateMove({ burst: this.currentPuzzle.answer.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextQuestion(), 1200);
    } else {
      btn.classList.add('wrong');
      this.resetCombo();
      this.coachMove(`"${btn.dataset.word}" does not match the clue. Look for "${this.currentPuzzle.clue}"`, 1200);
      setTimeout(() => btn.classList.remove('wrong'), 700);
    }
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new WordDetectiveGame(container, config);
}
