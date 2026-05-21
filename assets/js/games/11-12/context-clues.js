/* assets/js/games/11-12/context-clues.js
   Context Clues - Ages 11-12

   Senior pass:
   - Clearer reading challenge with optional hint penalty
   - Better question flow and more explicit vocabulary learning payoff
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const QUESTIONS = [
  { sentence: 'The gregarious puppy loved playing with everyone in the park.', word: 'gregarious', correct: 'Sociable', options: ['Sociable', 'Shy', 'Angry', 'Lazy'], hint: 'It enjoys being with everyone.' },
  { sentence: 'The math problem was so intricate that it took an hour to solve.', word: 'intricate', correct: 'Complicated', options: ['Complicated', 'Simple', 'Short', 'Boring'], hint: 'It took a long time because it was complex.' },
  { sentence: 'She felt melancholy when her best friend moved away.', word: 'melancholy', correct: 'Sad', options: ['Sad', 'Happy', 'Excited', 'Hungry'], hint: 'A friend leaving usually causes this feeling.' },
  { sentence: 'The candid photos captured the family laughing naturally.', word: 'candid', correct: 'Unposed', options: ['Unposed', 'Blurry', 'Dark', 'Staged'], hint: 'Naturally means not carefully arranged.' },
  { sentence: 'His arrogant attitude made it hard for others to work with him.', word: 'arrogant', correct: 'Over-confident', options: ['Over-confident', 'Humble', 'Kind', 'Quiet'], hint: 'Too much self-importance causes this problem.' },
  { sentence: 'The vivid colors of the sunset were breathtaking.', word: 'vivid', correct: 'Bright', options: ['Bright', 'Dull', 'Grey', 'Invisible'], hint: 'Breathtaking colors are usually intense and clear.' },
  { sentence: 'The obsolete computer could barely run any modern software.', word: 'obsolete', correct: 'Outdated', options: ['Outdated', 'Popular', 'Expensive', 'Fast'], hint: 'It is too old for modern software.' },
  { sentence: 'Her eloquent speech convinced everyone to support the cause.', word: 'eloquent', correct: 'Well-spoken', options: ['Well-spoken', 'Quiet', 'Boring', 'Short'], hint: 'It convinced people because it was expressed skillfully.' },
];

class ContextClues extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentIndex = 0;
    this.score = 0;
    this.questions = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="cc-game">
        <div class="cc-panel">
          <div class="cc-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Context Clues</div>
              <div class="progress" id="progress-text">Case 1 of 8</div>
            </div>
            <button class="hint-btn" id="hint-btn">🔍 Hint (-40)</button>
          </div>

          <div class="case-file">
            <div class="word-tag" id="word-tag">gregarious</div>
            <div class="sentence-display" id="sentence-display">Loading...</div>
            <div class="hint-box" id="hint-box" style="display:none">Hint: ...</div>
          </div>

          <div class="options-container" id="options-container"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cc-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#1a1a1a 0%,#2f2f2f 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.cc-panel{width:min(820px,96%);background:rgba(255,255,255,.08);border-radius:34px;border:1px solid rgba(255,255,255,.08);box-shadow:0 24px 60px rgba(0,0,0,.3);padding:22px;display:flex;flex-direction:column;gap:16px}.cc-topbar{display:flex;align-items:center;gap:12px}.pill,.hint-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.progress{font-size:14px;color:#c1c1c1}.hint-btn{padding:12px 16px;background:#d63031;color:#fff;cursor:pointer}
      .case-file{background:#e8d0aa;color:#333;padding:24px;border-radius:20px;box-shadow:0 12px 30px rgba(0,0,0,.25)}.word-tag{display:inline-block;background:#d63031;color:#fff;padding:8px 14px;border-radius:999px;font-size:16px;margin-bottom:16px}.sentence-display{font-size:28px;line-height:1.5;font-family:Georgia,serif}.hint-box{margin-top:16px;background:rgba(0,0,0,.08);padding:12px;border-left:4px solid #d63031;border-radius:10px;font-size:18px}
      .options-container{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.opt-btn{border:none;background:#fff;color:#333;padding:16px;border-radius:16px;font-size:20px;font-weight:800;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff}.opt-btn:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.opt-btn.correct{background:#edfff0;border-color:#4cd137}.opt-btn.wrong{background:#fff0f0;border-color:#ff6b6b}
      @media (max-width:720px){.options-container{grid-template-columns:1fr}.sentence-display{font-size:24px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.questions = [...QUESTIONS].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    document.getElementById('hint-btn').onclick = () => this.showHint();
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.currentIndex >= this.questions.length) return this.end();
    const q = this.questions[this.currentIndex];
    document.getElementById('progress-text').textContent = `Case ${this.currentIndex + 1} of ${this.questions.length}`;
    document.getElementById('word-tag').textContent = q.word;
    document.getElementById('sentence-display').textContent = q.sentence;
    document.getElementById('hint-box').textContent = `Hint: ${q.hint}`;
    document.getElementById('hint-box').style.display = 'none';
    document.getElementById('hint-btn').disabled = false;

    const container = document.getElementById('options-container');
    container.innerHTML = [...q.options].sort(() => Math.random() - 0.5).map((opt) => `<button class="opt-btn" data-opt="${opt}">${opt}</button>`).join('');
    container.querySelectorAll('.opt-btn').forEach((btn) => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.opt, q.correct);
    });
  }

  showHint() {
    document.getElementById('hint-box').style.display = 'block';
    document.getElementById('hint-btn').disabled = true;
    this.score -= 40;
    document.getElementById('score-val').textContent = this.score;
  }

  checkAnswer(btn, selected, correct) {
    if (selected === correct) {
      btn.classList.add('correct');
      this.addScore(120);
      document.getElementById('score-val').textContent = this.score;
      this.celebrateMove({ burst: correct.toUpperCase(), duration: 900 });
    } else {
      btn.classList.add('wrong');
      this.coachMove(`The best meaning was ${correct}.`, 1000);
    }
    document.querySelectorAll('.opt-btn').forEach((b) => b.disabled = true);
    setTimeout(() => { this.currentIndex += 1; this.loadQuestion(); }, 1100);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ContextClues(container, config);
}
