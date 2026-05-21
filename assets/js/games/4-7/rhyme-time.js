/* assets/js/games/4-7/rhyme-time.js
   Rhyme Time - Ages 4-7

   Senior pass:
   - Swapped vague one-and-done picks for a stronger "find two rhymes" structure
   - Better pacing, clearer goals, and more replayability
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const RHYMES = [
  { target: 'Cat', emoji: '🐱', matches: ['Bat', 'Hat', 'Mat'], wrong: ['Dog', 'Pig', 'Sun'] },
  { target: 'Dog', emoji: '🐶', matches: ['Log', 'Frog', 'Fog'], wrong: ['Cat', 'Bug', 'Pen'] },
  { target: 'Sun', emoji: '☀️', matches: ['Run', 'Bun', 'Fun'], wrong: ['Moon', 'Sad', 'Top'] },
  { target: 'Bed', emoji: '🛏️', matches: ['Red', 'Fed', 'Sled'], wrong: ['Bad', 'Bit', 'Bug'] },
  { target: 'Car', emoji: '🚗', matches: ['Star', 'Jar', 'Far'], wrong: ['Bus', 'Cat', 'Dig'] },
  { target: 'Pig', emoji: '🐷', matches: ['Wig', 'Dig', 'Big'], wrong: ['Pot', 'Pan', 'Bag'] },
  { target: 'Pen', emoji: '🖊️', matches: ['Hen', 'Ten', 'Men'], wrong: ['Pin', 'Pan', 'Top'] },
  { target: 'Cake', emoji: '🍰', matches: ['Lake', 'Make', 'Shake'], wrong: ['Cup', 'Dog', 'Run'] },
  { target: 'Ball', emoji: '⚽', matches: ['Tall', 'Wall', 'Fall'], wrong: ['Bat', 'Big', 'Cup'] },
  { target: 'Moon', emoji: '🌙', matches: ['Spoon', 'Soon', 'Noon'], wrong: ['Sun', 'Star', 'Fan'] },
];

class RhymeTimeGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentRhyme = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.foundMatches = [];
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="rtime-game">
        <div class="rtime-panel">
          <div class="rtime-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Rhyme Time</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="hear-btn" id="hear-btn">🔊</button>
          </div>

          <div class="target-card">
            <div class="target-emoji" id="target-emoji">🐱</div>
            <div>
              <div class="target-word" id="target-word">Cat</div>
              <div class="instruction" id="instruction-text">Find two words that rhyme with Cat.</div>
            </div>
          </div>

          <div class="options-grid" id="options-grid"></div>
          <div class="helper" id="helper-text">Listen for matching ending sounds.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .rtime-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#a29bfe 0%,#6c5ce7 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .rtime-panel{width:min(760px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:18px}
      .rtime-topbar{display:flex;align-items:center;gap:12px}.pill,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#6c5ce7}.progress{font-size:14px;color:#607d8b}.hear-btn{width:54px;height:54px;background:#fab1a0;color:#fff;cursor:pointer;box-shadow:0 5px 0 #e17055;font-size:24px}
      .target-card{display:flex;align-items:center;gap:18px;background:#fff;border:3px solid #e5d8ff;border-radius:26px;padding:18px}.target-emoji{font-size:74px}.target-word{font-size:34px;color:#2d3436}.instruction{font-size:20px;color:#5f6f81}
      .options-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.rhyme-option{border:none;background:#fff;padding:18px;border-radius:20px;font-size:24px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);border:4px solid #fff;transition:transform .12s,border-color .2s}.rhyme-option:active{transform:translateY(6px);box-shadow:0 2px 0 rgba(0,0,0,.08)}.rhyme-option.correct{background:#edfff0;border-color:#4cd137}.rhyme-option.wrong{background:#fff0f0;border-color:#ff6b6b}.rhyme-option.dim{opacity:.45}
      .helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:14px 18px;text-align:center;font-size:22px;color:#465a65}
      @media (max-width:720px){.options-grid{grid-template-columns:1fr}.target-card{text-align:center;flex-direction:column}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;
    this.foundMatches = [];
    this.currentRhyme = [...RHYMES].sort(() => Math.random() - 0.5)[0];

    const selectedMatches = [...this.currentRhyme.matches].sort(() => Math.random() - 0.5).slice(0, 2);
    const selectedWrongs = [...this.currentRhyme.wrong].sort(() => Math.random() - 0.5).slice(0, 2);
    this.options = [...selectedMatches, ...selectedWrongs].sort(() => Math.random() - 0.5);
    this.activeMatches = selectedMatches;

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('target-emoji').textContent = this.currentRhyme.emoji;
    document.getElementById('target-word').textContent = this.currentRhyme.target;
    document.getElementById('instruction-text').textContent = `Find two words that rhyme with ${this.currentRhyme.target}.`;
    document.getElementById('helper-text').textContent = 'Listen for matching ending sounds.';

    const grid = document.getElementById('options-grid');
    grid.innerHTML = this.options.map((word) => `<button class="rhyme-option" data-word="${word}">${word}</button>`).join('');
    grid.querySelectorAll('.rhyme-option').forEach((btn) => {
      btn.onclick = () => this.handlePick(btn);
    });

    setTimeout(() => this.speakInstruction(), 500);
  }

  speakInstruction() {
    if (!this.currentRhyme) return;
    this.speak(`Find two words that rhyme with ${this.currentRhyme.target}`, { rate: 0.9 });
  }

  handlePick(btn) {
    if (this.locked || btn.classList.contains('correct')) return;
    const word = btn.dataset.word;
    const isMatch = this.activeMatches.includes(word);

    if (isMatch) {
      btn.classList.add('correct');
      this.foundMatches.push(word);
      this.speak(`${word} rhymes with ${this.currentRhyme.target}`);
      if (this.foundMatches.length === 1) {
        document.getElementById('helper-text').textContent = 'Nice! Find one more rhyme.';
      }
      if (this.foundMatches.length >= 2) {
        this.locked = true;
        this.incrementCombo();
        this.addScore(140);
        document.getElementById('score-val').textContent = this.score;
        document.getElementById('helper-text').textContent = 'Great rhyming!';
        this.confetti.explode(null, null, 18);
        this.celebrateMove({ burst: 'RHYME', duration: 900 });
        setTimeout(() => this.nextRound(), 1200);
      }
      return;
    }

    btn.classList.add('wrong');
    this.resetCombo();
    this.coachMove(`${word} does not rhyme with ${this.currentRhyme.target}.`, 900);
    setTimeout(() => btn.classList.remove('wrong'), 650);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new RhymeTimeGame(container, config);
}
