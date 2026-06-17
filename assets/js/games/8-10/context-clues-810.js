/* assets/js/games/8-10/context-clues-810.js
   Context Clues - Ages 8-10

   Find the meaning of the underlined word using context clues from the paragraph.
   8 rounds of reading and vocabulary challenges.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const CONTEXT_CLUES_DATA = [
  {
    paragraph: "The chef prepared a delicious meal. She carefully combined the ingredients to make a flavorful dinner that everyone enjoyed.",
    underlined: "flavorful",
    correct: "Tasty",
    options: ["Tasty", "Cold", "Expired", "Boring"],
  },
  {
    paragraph: "Sarah was nervous before her presentation, but she took a deep breath and spoke confidently to the entire classroom.",
    underlined: "nervous",
    correct: "Anxious",
    options: ["Anxious", "Happy", "Sleepy", "Excited"],
  },
  {
    paragraph: "The detective examined the evidence carefully. She looked at every clue to solve the mysterious case that had puzzled everyone.",
    underlined: "evidence",
    correct: "Proof",
    options: ["Proof", "Lies", "Questions", "Suspects"],
  },
  {
    paragraph: "After running three miles, Mark felt exhausted. He sat down on the bench because he had no energy left to continue.",
    underlined: "exhausted",
    correct: "Very tired",
    options: ["Very tired", "Energized", "Hungry", "Refreshed"],
  },
  {
    paragraph: "The ancient castle stood on the hill. It had been there for hundreds of years, watching over the village below.",
    underlined: "ancient",
    correct: "Very old",
    options: ["Very old", "New", "Small", "Modern"],
  },
  {
    paragraph: "Emma's grandmother told her a fascinating story about when she was young. Emma listened carefully, completely engaged in every word.",
    underlined: "fascinating",
    correct: "Very interesting",
    options: ["Very interesting", "Boring", "Scary", "Short"],
  },
  {
    paragraph: "The athlete was determined to win the race. She trained every day and never gave up, even when things got difficult.",
    underlined: "determined",
    correct: "Resolute",
    options: ["Resolute", "Lazy", "Slow", "Uncertain"],
  },
  {
    paragraph: "The musician played a beautiful melody on her guitar. The soft, pleasing music made everyone in the room feel calm and happy.",
    underlined: "melody",
    correct: "Musical tune",
    options: ["Musical tune", "Drum beat", "Loud noise", "Dance move"],
  },
  {
    paragraph: "When Jake accidentally broke the vase, he tried to conceal it from his parents by hiding the pieces behind the couch.",
    underlined: "conceal",
    correct: "Hide",
    options: ["Hide", "Show", "Fix", "Throw away"],
  },
  {
    paragraph: "The scientist made a breakthrough discovery. Her years of research finally led to an important finding that changed the field.",
    underlined: "breakthrough",
    correct: "Major discovery",
    options: ["Major discovery", "Small mistake", "Wrong answer", "Regular day"],
  },
];

class ContextCluesGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 90 });
    this.currentData = null;
    this.locked = false;
    this.round = 0;
    this.maxRounds = 8;
    this.correctCount = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="cc-game">
        <div class="cc-panel">
          <div class="cc-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Context Clues</div>
              <div class="subtitle">Find the meaning using the clue.</div>
            </div>
            <div class="pill">Round <span id="round-val">1</span>/8</div>
          </div>

          <div class="reading-card">
            <div class="reading-label">Read the paragraph and tap the meaning of the underlined word.</div>
            <div class="passage" id="passage-text"></div>
          </div>

          <div class="options-grid" id="options-grid"></div>
          <div class="helper" id="helper-text">Tap the correct meaning to earn points.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cc-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#d4a5ff 0%,#9b59b6 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .cc-panel{width:min(820px,96%);background:rgba(255,255,255,.92);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.14);padding:22px;display:flex;flex-direction:column;gap:18px}
      .cc-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#2d3436}.subtitle{font-size:14px;color:#607d8b}
      .reading-card{background:#fff;border:3px solid #d9ebff;border-radius:28px;padding:20px}.reading-label{font-size:16px;color:#7f8c8d;text-transform:uppercase;margin-bottom:12px}.passage{font-size:20px;color:#2d3436;line-height:1.7}.passage .clue-word{text-decoration:underline;text-decoration-color:#e74c3c;text-decoration-thickness:3px;color:#c0392b;font-weight:700;cursor:pointer;transition:color .2s}.passage .clue-word:hover{color:#e74c3c}
      .options-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.option-btn{border:none;background:#fff;padding:20px 14px;border-radius:20px;font-size:22px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff;transition:transform .12s,border-color .2s}.option-btn:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.option-btn.correct{background:#edfff0;border-color:#4cd137}.option-btn.wrong{background:#fff0f0;border-color:#ff6b6b}.option-btn.dim{opacity:.45}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:20px;color:#465a65}
      @media (max-width:720px){.options-grid{grid-template-columns:1fr}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.round = 0;
    this.correctCount = 0;
    this.locked = false;
    this.nextQuestion();
  }

  nextQuestion() {
    this.round++;
    if (this.round > this.maxRounds) {
      this.end();
      return;
    }

    this.locked = false;
    document.getElementById('round-val').textContent = this.round;

    // Pick random question, avoid repeating recent ones
    let availableData = CONTEXT_CLUES_DATA.filter(d => d !== this.currentData);
    if (availableData.length === 0) availableData = CONTEXT_CLUES_DATA;
    this.currentData = availableData[Math.floor(Math.random() * availableData.length)];

    const paragraph = this.currentData.paragraph.replace(
      this.currentData.underlined,
      `<span class="clue-word" id="clue-target">${this.currentData.underlined}</span>`
    );
    document.getElementById('passage-text').innerHTML = paragraph;
    document.getElementById('helper-text').textContent = 'Tap the correct meaning of the underlined word.';

    const options = [...this.currentData.options].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('options-grid');
    grid.innerHTML = options.map((opt) => `
      <button class="option-btn" data-meaning="${opt}">${opt}</button>
    `).join('');

    grid.querySelectorAll('.option-btn').forEach((btn) => {
      btn.onclick = () => this.selectOption(btn);
    });
  }

  selectOption(btn) {
    if (this.locked) return;
    const meaning = btn.dataset.meaning;
    const buttons = [...this.container.querySelectorAll('.option-btn')];
    const isCorrect = meaning === this.currentData.correct;

    if (isCorrect) {
      this.locked = true;
      btn.classList.add('correct');
      buttons.filter((node) => node !== btn).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(150);
      this.correctCount++;
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `Correct! "${this.currentData.underlined}" means ${meaning}.`;
      this.confetti.explode(null, null, 14);
      this.celebrateMove({ burst: meaning.toUpperCase(), duration: 900 });
      setTimeout(() => this.nextQuestion(), 1100);
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`${meaning} does not fit here. Look at the context again.`, 1000);
    setTimeout(() => btn.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ContextCluesGame(container, config);
}