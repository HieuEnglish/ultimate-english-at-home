/* assets/js/games/0-3/tap-the-sound.js
   Tap the Sound - Ages 0-3
   
   MODERN TABLET LAYOUT VERSION
   Structure matched to reference: Tablet frame with sky background, 
   top header, central image, and bottom play bar.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

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
];

class TapTheSoundGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWord = null;
    this.options = []; // Next/Prev words for carousel visual
    this.rounds = 0;
    this.maxRounds = 10;
    this.correctAnswers = 0;
    this.isListening = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper">
        <!-- Main background -->
        <div class="sky-bg">
          <div class="cloud c1">☁️</div>
          <div class="cloud c2">☁️</div>
          <div class="cloud c3">☁️</div>
          <div class="hills"></div>
          <div class="trees-bg"></div>
        </div>

        <!-- Tablet Frame -->
        <div class="tablet-frame">
          <div class="tablet-screen">
            <!-- Header -->
            <div class="screen-header">
              <div class="header-left">
                <button class="icon-btn home-btn" title="Back">🏠</button>
              </div>
              <div class="header-title">
                <span class="title-text">ANIMALS</span>
                <span class="title-icon">🐰</span>
              </div>
              <div class="header-right">
                <button class="icon-btn sound-toggle-btn red-btn">🔊</button>
              </div>
            </div>

            <!-- Main Content Area -->
            <div class="main-stage">
              <!-- Carousel Controls -->
              <button class="nav-arrow left-arrow" id="prev-btn">◀</button>
              
              <!-- Central Card -->
              <div class="card-display">
                <div class="main-card" id="main-card">
                  <div class="card-image" id="main-emoji">🐕</div>
                </div>
                <!-- Decoration cards (visual only) -->
                <div class="side-card left-card"></div>
                <div class="side-card right-card"></div>
              </div>

              <button class="nav-arrow right-arrow" id="next-btn">▶</button>
            </div>
            
            <!-- Bottom Text/Control Bar -->
            <div class="bottom-bar">
              <div class="control-group left-controls">
                <button class="action-btn green-btn" id="settings-btn">⚙️</button>
              </div>
              
              <div class="sentence-box">
                <span id="sentence-text" class="sentence-text">Touch the picture to hear!</span>
              </div>
              
              <div class="control-group right-controls">
                <button class="action-btn speaker-btn" id="play-btn">🔊</button>
              </div>
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
      .game-wrapper {
        position: relative;
        width: 100%;
        height: 600px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(180deg, #4facfe 0%, #00f2fe 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka One', cursive, sans-serif;
      }
      
      /* Background Elements */
      .sky-bg { position: absolute; inset: 0; pointer-events: none; }
      .cloud { position: absolute; font-size: 60px; opacity: 0.8; animation: float 20s linear infinite; color: white; }
      .c1 { top: 10%; left: 10%; animation-delay: 0s; }
      .c2 { top: 20%; left: 60%; animation-delay: -5s; }
      .c3 { top: 5%; left: 80%; animation-delay: -10s; }
      
      .hills {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 150px;
        background: #a8e063;
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        transform: scaleX(1.5);
      }
      
      @keyframes float {
        from { transform: translateX(-100px); }
        to { transform: translateX(calc(100% + 100px)); }
      }

      /* Tablet Frame */
      .tablet-frame {
        position: relative;
        width: 600px;
        height: 480px;
        background: white;
        border-radius: 40px;
        padding: 12px;
        box-shadow: 
          0 20px 50px rgba(0,0,0,0.2),
          inset 0 0 0 2px #ecf0f1;
        z-index: 10;
        /* Wavy border visual effect could be added here with pseudo-elements if desired */
      }
      
      .tablet-screen {
        width: 100%;
        height: 100%;
        background: #81ecec; /* Sky blue screen bg */
        border-radius: 30px;
        border: 4px solid #b2bec3;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      /* Header */
      .screen-header {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background: transparent;
        z-index: 2;
      }
      
      .header-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        text-shadow: 0 2px 0 rgba(0,0,0,0.1);
      }
      .title-text { 
        font-size: 28px; 
        font-weight: 900; 
        letter-spacing: 1px;
        color: #ffeaa7;
        text-shadow: 2px 2px 0px #fdcb6e;
      }
      .title-icon { font-size: 24px; margin-top: -5px; }

      .icon-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: none;
        background: #fff;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 0 rgba(0,0,0,0.1);
        transition: transform 0.1s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,0.1); }
      .red-btn { background: #ff7675; color: white; box-shadow: 0 4px 0 #d63031; }
      
      /* Main Stage */
      .main-stage {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        position: relative;
        padding-bottom: 20px;
      }
      
      .nav-arrow {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255,255,255,0.8);
        border: none;
        font-size: 24px;
        color: #b2bec3;
        cursor: pointer;
        z-index: 5;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .nav-arrow:hover { background: white; transform: scale(1.1); color: #636e72; }
      .nav-arrow:active { transform: scale(0.95); }

      .card-display {
        position: relative;
        width: 280px;
        height: 220px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .main-card {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 30px;
        border: 6px solid #feca57; /* Orange border */
        box-shadow: 0 10px 0 rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 2;
        transition: transform 0.2s;
        background-color: #fff;
      }
      .main-card:active { transform: scale(0.98); }
      
      .card-image {
        font-size: 120px;
        filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .main-card:hover .card-image { transform: scale(1.1) rotate(5deg); }
      
      .side-card {
        position: absolute;
        width: 180px;
        height: 140px;
        background: #fff;
        border-radius: 20px;
        border: 4px solid #feca57; /* Yellow border */
        opacity: 0.6;
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
      }
      .left-card { left: -60px; }
      .right-card { right: -60px; }
      
      /* Bottom Bar */
      .bottom-bar {
        height: 90px;
        background: #dfe6e9; /* Light grey bar */
        display: flex;
        align-items: center;
        padding: 0 15px;
        gap: 10px;
        border-top: 4px solid rgba(0,0,0,0.05);
      }
      
      .control-group {
        display: flex;
        gap: 8px;
      }
      
      .action-btn {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 0 rgba(0,0,0,0.2);
        transition: transform 0.1s;
      }
      .action-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,0.2); }
      .green-btn { background: #00b894; color: white; box-shadow: 0 4px 0 #008f72; }
      .speaker-btn { background: #fca5a5; color: white; background-image: linear-gradient(135deg, #ff9f43, #ff7675); box-shadow: 0 4px 0 #e17055; border-radius: 50%; width: 60px; height: 60px; font-size: 28px; }
      
      .sentence-box {
        flex: 1;
        background: white;
        height: 60px;
        border-radius: 30px;
        border: 3px solid #b2bec3;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
      }
      
      .sentence-text {
        font-size: 18px;
        font-weight: 700;
        color: #2d3436;
        text-align: center;
      }
      
      /* Animations */
      .correct-anim { animation: bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      @keyframes bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      .wiggle-anim { animation: wiggle 0.4s ease; }
      @keyframes wiggle {
        0%, 100% { transform: rotate(0); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
      }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    this.nextRound();

    // Event Listeners
    document.getElementById('main-card').onclick = () => this.handleCardClick();
    document.getElementById('play-btn').onclick = () => this.playPrompt();

    // Nav buttons
    document.getElementById('next-btn').onclick = () => this.cycleWord(1);
    document.getElementById('prev-btn').onclick = () => this.cycleWord(-1);

    this.container.querySelector('.home-btn').onclick = () => this.speak('Home');
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      this.end();
      return;
    }

    this.rounds++;

    // Pick a target word
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
    this.targetWord = shuffled[0];

    // Start at a random random position (not necessarily the target)
    this.currentIndex = Math.floor(Math.random() * WORDS.length);
    this.currentWord = WORDS[this.currentIndex];

    this.renderCard();
    this.updateHeader();

    // Announce the goal
    setTimeout(() => this.playPrompt(), 500);
  }

  playPrompt() {
    const prompt = `Can you find the ${this.targetWord.word}?`;
    this.speak(prompt, { rate: 0.9 });

    const banner = document.getElementById('sentence-text');
    banner.textContent = `Find the ${this.targetWord.emoji}!`;
    banner.classList.add('wiggle-anim');
    setTimeout(() => banner.classList.remove('wiggle-anim'), 500);
  }

  cycleWord(direction) {
    this.currentIndex += direction;
    if (this.currentIndex < 0) this.currentIndex = WORDS.length - 1;
    if (this.currentIndex >= WORDS.length) this.currentIndex = 0;

    this.currentWord = WORDS[this.currentIndex];
    this.renderCard();

    // Small sound feedback on scroll? Maybe just silent
  }

  renderCard() {
    const emojiEl = document.getElementById('main-emoji');
    emojiEl.textContent = this.currentWord.emoji;

    // Reset animations
    const card = document.getElementById('main-card');
    card.classList.remove('correct-anim', 'wiggle-anim');
  }

  updateHeader() {
    // Show progress or target? Let's keep it simple
    // Maybe show the target in the header?
    // document.querySelector('.title-icon').textContent = this.targetWord.emoji;
  }

  handleCardClick() {
    if (this.currentWord.word === this.targetWord.word) {
      // Correct!
      this.speak("Great job! " + this.targetWord.sentence);
      this.incrementCombo();
      this.addScore(50);

      const card = document.getElementById('main-card');
      card.classList.add('correct-anim');
      this.confetti.explode(null, null, 30);

      document.getElementById('sentence-text').textContent = "Correct! " + this.targetWord.emoji;
      document.getElementById('sentence-text').style.color = "#00b894";

      setTimeout(() => {
        document.getElementById('sentence-text').style.color = "#2d3436";
        this.nextRound();
      }, 3000);
    } else {
      // Wrong
      this.speak(`That is a ${this.currentWord.word}. Try again!`);
      const card = document.getElementById('main-card');
      card.classList.remove('wiggle-anim');
      void card.offsetWidth;
      card.classList.add('wiggle-anim');

      document.getElementById('sentence-text').textContent = `That's a ${this.currentWord.word}. Find the ${this.targetWord.word}!`;
    }
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new TapTheSoundGame(container, config);
}
