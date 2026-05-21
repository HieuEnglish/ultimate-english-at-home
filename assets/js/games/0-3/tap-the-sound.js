/* assets/js/games/0-3/tap-the-sound.js
   Tap the Sound - Ages 0-3

   Senior pass:
   - Reworked from awkward carousel browsing into a clear 3-choice listening game
   - Bigger goals, stronger feedback, progress tracking, replay button, and gentle pacing
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORDS = [
  { word: "dog", emoji: "🐕", sentence: "The dog says woof!" },
  { word: "cat", emoji: "🐱", sentence: "The cat says meow!" },
  { word: "fish", emoji: "🐟", sentence: "The fish swims fast!" },
  { word: "bird", emoji: "🐦", sentence: "The bird flies high!" },
  { word: "bear", emoji: "🐻", sentence: "The bear is big!" },
  { word: "duck", emoji: "🦆", sentence: "The duck says quack!" },
  { word: "cow", emoji: "🐮", sentence: "The cow says moo!" },
  { word: "pig", emoji: "🐷", sentence: "The pig likes mud!" },
  { word: "frog", emoji: "🐸", sentence: "The frog jumps high!" },
  { word: "bee", emoji: "🐝", sentence: "The bee makes honey!" },
  { word: "horse", emoji: "🐴", sentence: "The horse runs fast!" },
  { word: "lion", emoji: "🦁", sentence: "The lion is brave!" },
  { word: "monkey", emoji: "🐒", sentence: "The monkey likes bananas!" },
  { word: "elephant", emoji: "🐘", sentence: "The elephant is big!" },
  { word: "turtle", emoji: "🐢", sentence: "The turtle is slow!" },
  { word: "rabbit", emoji: "🐰", sentence: "The rabbit hops fast!" },
  { word: "snake", emoji: "🐍", sentence: "The snake goes hiss!" },
  { word: "whale", emoji: "🐳", sentence: "The whale is huge!" },
  { word: "penguin", emoji: "🐧", sentence: "The penguin loves snow!" },
  { word: "butterfly", emoji: "🦋", sentence: "The butterfly is pretty!" },
];

class TapTheSoundGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.targetWord = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="tts-game">
        <div class="tts-sky">
          <div class="cloud c1">☁️</div>
          <div class="cloud c2">☁️</div>
          <div class="cloud c3">☁️</div>
          <div class="hill"></div>
        </div>

        <div class="tts-panel">
          <div class="tts-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Tap the Sound</div>
              <div class="subtitle" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="round-btn" id="hear-btn">🔊 Hear it</button>
          </div>

          <div class="prompt-card">
            <div class="prompt-emoji" id="prompt-emoji">👂</div>
            <div class="prompt-text" id="sentence-text">Listen, then tap the right picture.</div>
          </div>

          <div class="choice-grid" id="choice-grid"></div>

          <div class="footer-bar">
            <button class="secondary-btn" id="repeat-btn">🔁 Say it again</button>
            <div class="helper-text" id="helper-text">Big taps, happy sounds, no rush.</div>
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
      .tts-game{position:relative;min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#71d7ff 0%,#9ff8ff 60%,#b8f18d 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center}
      .tts-sky{position:absolute;inset:0;pointer-events:none}.cloud{position:absolute;font-size:56px;opacity:.85;animation:ttsFloat 20s linear infinite}.c1{top:8%;left:8%}.c2{top:18%;left:52%;animation-delay:-7s}.c3{top:10%;left:78%;animation-delay:-12s}.hill{position:absolute;left:-10%;right:-10%;bottom:-40px;height:170px;background:#88d66c;border-radius:50% 50% 0 0}
      @keyframes ttsFloat{from{transform:translateX(-70px)}to{transform:translateX(120px)}}
      .tts-panel{position:relative;z-index:1;width:min(760px,94%);background:rgba(255,255,255,.88);backdrop-filter:blur(6px);border:5px solid #fff;border-radius:32px;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:18px}
      .tts-topbar,.footer-bar{display:flex;align-items:center;justify-content:space-between;gap:12px}.pill,.round-btn,.secondary-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff3a6;color:#8b5e00;padding:10px 16px;box-shadow:0 4px 0 rgba(0,0,0,.08)}
      .title-wrap{text-align:center;flex:1}.title{font-size:32px;color:#0f3057}.subtitle{font-size:14px;color:#4c6a7f}.round-btn,.secondary-btn{cursor:pointer;padding:12px 18px;color:#fff;box-shadow:0 5px 0 rgba(0,0,0,.18)}.round-btn{background:linear-gradient(135deg,#ff8a5b,#ff5e7e)}.secondary-btn{background:linear-gradient(135deg,#4dabf7,#2f80ed)}
      .prompt-card{background:linear-gradient(135deg,#fff6d8,#fff);border-radius:26px;padding:20px;display:flex;align-items:center;gap:16px;border:3px solid #ffe59e}.prompt-emoji{font-size:64px;min-width:84px;text-align:center;animation:bob 1.8s ease-in-out infinite}.prompt-text{font-size:28px;color:#2d3436;line-height:1.2}
      .choice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.choice-card{background:#fff;border:4px solid #fff;border-radius:28px;padding:18px;cursor:pointer;box-shadow:0 10px 0 rgba(0,0,0,.08);transition:transform .12s,box-shadow .12s,border-color .2s;text-align:center}.choice-card:hover{transform:translateY(-2px)}.choice-card:active{transform:translateY(6px);box-shadow:0 4px 0 rgba(0,0,0,.08)}.choice-card.correct{border-color:#4cd137;background:#edfff0}.choice-card.wrong{border-color:#ff6b6b;background:#fff0f0}.choice-card.dim{opacity:.45}
      .choice-emoji{font-size:92px;line-height:1}.choice-label{margin-top:10px;font-size:24px;color:#34495e;text-transform:capitalize}
      .helper-text{flex:1;text-align:center;font-size:18px;color:#46637a;padding:0 10px}
      @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      @media (max-width:720px){.choice-grid{grid-template-columns:1fr}.prompt-text{font-size:24px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    document.getElementById('hear-btn').onclick = () => this.playPrompt();
    document.getElementById('repeat-btn').onclick = () => this.playPrompt(true);
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;

    const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
    this.targetWord = shuffled[0];
    this.options = [this.targetWord, ...shuffled.slice(1, 3)].sort(() => Math.random() - 0.5);

    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('prompt-emoji').textContent = '👂';
    document.getElementById('sentence-text').textContent = 'Listen, then tap the right picture.';
    document.getElementById('helper-text').textContent = 'Tap the picture that matches the word you hear.';

    const grid = document.getElementById('choice-grid');
    grid.innerHTML = this.options.map((item) => `
      <button class="choice-card" data-word="${item.word}">
        <div class="choice-emoji">${item.emoji}</div>
        <div class="choice-label">${item.word}</div>
      </button>
    `).join('');

    grid.querySelectorAll('.choice-card').forEach((card) => {
      card.onclick = () => this.handleChoice(card, card.dataset.word);
    });

    setTimeout(() => this.playPrompt(), 500);
  }

  playPrompt(isRepeat = false) {
    if (!this.targetWord) return;
    this.speak(`Can you tap the ${this.targetWord.word}?`, { rate: 0.9 });
    document.getElementById('sentence-text').textContent = `Tap the ${this.targetWord.word}!`;
    document.getElementById('prompt-emoji').textContent = this.targetWord.emoji;
    if (isRepeat) {
      this.showFeedback(`Listen again: ${this.targetWord.word}`, 'info', 900);
    }
  }

  handleChoice(card, selectedWord) {
    if (this.locked) return;
    const cards = [...this.container.querySelectorAll('.choice-card')];

    if (selectedWord === this.targetWord.word) {
      this.locked = true;
      card.classList.add('correct');
      cards.filter((node) => node !== card).forEach((node) => node.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('sentence-text').textContent = `Yes! ${this.targetWord.sentence}`;
      document.getElementById('helper-text').textContent = 'Nice listening! Here comes another one.';
      this.speak(`Great job! ${this.targetWord.sentence}`);
      this.confetti.explode(null, null, 24);
      this.celebrateMove({ burst: this.targetWord.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1500);
      return;
    }

    card.classList.add('wrong');
    this.resetCombo();
    this.speak(`That is ${selectedWord}. Try again.`);
    this.coachMove(`That picture is ${selectedWord}. Listen for ${this.targetWord.word}.`, 1000);
    document.getElementById('sentence-text').textContent = `That is ${selectedWord}. Find the ${this.targetWord.word}.`;
    setTimeout(() => card.classList.remove('wrong'), 700);
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new TapTheSoundGame(container, config);
}
