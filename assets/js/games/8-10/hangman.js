/* assets/js/games/8-10/hangman.js
   Hangman - Ages 8-10
   
   MODERN VERSION - Game-like experience with:
   - Animated stick figure drawing
   - Glowing keyboard
   - Particle effects
   - Dynamic theming
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Vocabulary words with hints and themes
const WORDS = [
  { word: "elephant", hint: "A large animal with a trunk", theme: "🐘" },
  { word: "butterfly", hint: "A colorful insect with wings", theme: "🦋" },
  { word: "mountain", hint: "A very tall natural landform", theme: "🏔️" },
  { word: "library", hint: "A place with many books", theme: "📚" },
  { word: "rainbow", hint: "Colorful arc in the sky", theme: "🌈" },
  { word: "teacher", hint: "Someone who helps you learn", theme: "👨‍🏫" },
  { word: "computer", hint: "Electronic device for games", theme: "💻" },
  { word: "hospital", hint: "Where doctors help people", theme: "🏥" },
  { word: "breakfast", hint: "First meal of the day", theme: "🍳" },
  { word: "chocolate", hint: "A sweet brown treat", theme: "🍫" },
  { word: "adventure", hint: "An exciting journey", theme: "🗺️" },
  { word: "dinosaur", hint: "Ancient reptile creatures", theme: "🦕" },
  { word: "astronaut", hint: "Space traveler", theme: "👨‍🚀" },
  { word: "universe", hint: "Everything that exists", theme: "🌌" },
  { word: "treasure", hint: "Hidden valuable items", theme: "💎" },
  { word: "carnival", hint: "A fun outdoor event", theme: "🎪" },
  { word: "skeleton", hint: "Bones inside your body", theme: "💀" },
  { word: "umbrella", hint: "Protection from rain", theme: "☂️" },
  { word: "sandwich", hint: "Bread with filling inside", theme: "🥪" },
  { word: "mushroom", hint: "Grows in damp places", theme: "🍄" },
  { word: "calendar", hint: "Shows days and months", theme: "📅" },
  { word: "basement", hint: "Room below the house", theme: "🏠" },
  { word: "keyboard", hint: "You type on this", theme: "⌨️" },
  { word: "firework", hint: "Explodes with colors", theme: "🎆" },
  { word: "kangaroo", hint: "Australian jumping animal", theme: "🦘" },
];

class HangmanGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWord = null;
    this.guessedLetters = [];
    this.wrongGuesses = 0;
    this.maxWrong = 6;
    this.rounds = 0;
    this.maxRounds = 5;
    this.wins = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="hangman-game">
        <!-- Background -->
        <div class="hangman-bg">
          <div class="stars" id="stars"></div>
        </div>
        
        <!-- Game content -->
        <div class="hangman-stage">
          <!-- Top HUD -->
          <div class="game-hud-bar">
            <div class="hud-section">
              <span class="hud-icon">⭐</span>
              <span class="hud-val" id="hud-score">0</span>
            </div>
            <div class="hud-section round-info">
              <span class="round-label">Round</span>
              <span class="round-num" id="round-num">1/5</span>
            </div>
            <div class="hud-section lives-display">
              <span class="hud-icon">❤️</span>
              <span id="lives-hearts">❤️❤️❤️❤️❤️❤️</span>
            </div>
          </div>
          
          <!-- Hangman figure area -->
          <div class="figure-area">
            <div class="gallows">
              <svg viewBox="0 0 200 200" class="gallows-svg">
                <!-- Base -->
                <line x1="10" y1="190" x2="80" y2="190" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                <!-- Pole -->
                <line x1="45" y1="190" x2="45" y2="20" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                <!-- Top -->
                <line x1="45" y1="20" x2="130" y2="20" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                <!-- Rope -->
                <line x1="130" y1="20" x2="130" y2="45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                
                <!-- Body parts (hidden by default) -->
                <g id="hangman-parts">
                  <!-- Head -->
                  <circle cx="130" cy="60" r="15" fill="none" stroke="currentColor" stroke-width="3" class="part part-0" style="opacity:0"/>
                  <!-- Body -->
                  <line x1="130" y1="75" x2="130" y2="120" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="part part-1" style="opacity:0"/>
                  <!-- Left arm -->
                  <line x1="130" y1="90" x2="105" y2="105" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="part part-2" style="opacity:0"/>
                  <!-- Right arm -->
                  <line x1="130" y1="90" x2="155" y2="105" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="part part-3" style="opacity:0"/>
                  <!-- Left leg -->
                  <line x1="130" y1="120" x2="110" y2="155" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="part part-4" style="opacity:0"/>
                  <!-- Right leg -->
                  <line x1="130" y1="120" x2="150" y2="155" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="part part-5" style="opacity:0"/>
                  <!-- Face (appears on game over) -->
                  <g class="face" style="opacity:0">
                    <circle cx="123" cy="56" r="2" fill="currentColor"/>
                    <circle cx="137" cy="56" r="2" fill="currentColor"/>
                    <path d="M123 68 Q130 62 137 68" fill="none" stroke="currentColor" stroke-width="2"/>
                  </g>
                </g>
              </svg>
            </div>
            <div class="theme-display" id="theme-display">🎯</div>
          </div>
          
          <!-- Hint -->
          <div class="hint-box" id="hint-box">
            <span class="hint-icon">💡</span>
            <span class="hint-text" id="hint-text">Loading...</span>
          </div>
          
          <!-- Word display -->
          <div class="word-display" id="word-display"></div>
          
          <!-- Keyboard -->
          <div class="keyboard" id="keyboard"></div>
          
          <!-- Feedback -->
          <div class="feedback-popup" id="feedback-popup">
            <span class="feedback-emoji" id="popup-emoji">🎉</span>
            <span class="feedback-text" id="popup-text">Great!</span>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.setupStars();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .hangman-game {
        position: relative;
        width: 100%;
        min-height: 580px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(180deg, #0c0c1e 0%, #1a1a3e 50%, #2d2d6e 100%);
      }
      
      /* Starry background */
      .hangman-bg { position: absolute; inset: 0; overflow: hidden; }
      .star {
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        animation: twinkle 2s ease-in-out infinite;
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      
      .hangman-stage {
        position: relative;
        padding: 16px;
        max-width: 480px;
        margin: 0 auto;
      }
      
      /* HUD bar */
      .game-hud-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 10px 16px;
        background: rgba(255,255,255,0.08);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .hud-section {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .hud-icon { font-size: 18px; }
      .hud-val { font-size: 20px; font-weight: 800; color: #feca57; }
      .round-label { font-size: 12px; color: rgba(255,255,255,0.5); }
      .round-num { font-weight: 700; color: white; }
      .lives-display { font-size: 14px; }
      
      /* Figure area */
      .figure-area {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        margin-bottom: 16px;
      }
      .gallows {
        width: 160px;
        height: 160px;
      }
      .gallows-svg {
        width: 100%;
        height: 100%;
        color: #a29bfe;
      }
      .part {
        transition: opacity 0.5s ease;
      }
      .part.visible {
        opacity: 1 !important;
        animation: partAppear 0.5s ease;
      }
      @keyframes partAppear {
        0% { stroke-dasharray: 100; stroke-dashoffset: 100; }
        100% { stroke-dashoffset: 0; }
      }
      .theme-display {
        font-size: 64px;
        animation: themeFloat 3s ease-in-out infinite;
        filter: drop-shadow(0 0 20px rgba(255,255,255,0.3));
      }
      @keyframes themeFloat {
        0%, 100% { transform: translateY(0) rotate(-5deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
      }
      
      /* Hint box */
      .hint-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px 20px;
        background: rgba(255,200,50,0.1);
        border: 1px solid rgba(255,200,50,0.3);
        border-radius: 12px;
        margin-bottom: 16px;
      }
      .hint-icon { font-size: 20px; }
      .hint-text { color: #ffeaa7; font-size: 15px; }
      
      /* Word display */
      .word-display {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .letter-slot {
        width: 38px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.1);
        border-bottom: 4px solid #6c5ce7;
        border-radius: 8px 8px 0 0;
        font-size: 26px;
        font-weight: 800;
        color: white;
        text-transform: uppercase;
        transition: all 0.3s ease;
      }
      .letter-slot.revealed {
        background: rgba(108, 92, 231, 0.3);
        border-color: #a29bfe;
        animation: letterReveal 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      @keyframes letterReveal {
        0% { transform: scale(0); }
        60% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      /* Keyboard */
      .keyboard {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 6px;
        max-width: 420px;
        margin: 0 auto;
      }
      .key-btn {
        width: 36px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: linear-gradient(145deg, #3d3d7e, #2a2a5e);
        border: 2px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 800;
        color: white;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.15s ease;
        box-shadow: 0 4px 0 rgba(0,0,0,0.3);
      }
      .key-btn:hover {
        transform: translateY(-3px);
        background: linear-gradient(145deg, #4d4d9e, #3a3a7e);
        box-shadow: 0 7px 0 rgba(0,0,0,0.3);
        border-color: #6c5ce7;
      }
      .key-btn:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 rgba(0,0,0,0.3);
      }
      .key-btn.used {
        opacity: 0.3;
        pointer-events: none;
        transform: scale(0.9);
      }
      .key-btn.correct {
        background: linear-gradient(145deg, #00b894, #00a884);
        border-color: #55efc4;
        animation: keyCorrect 0.4s ease;
      }
      .key-btn.wrong {
        background: linear-gradient(145deg, #d63031, #c62020);
        border-color: #ff7675;
        animation: keyWrong 0.4s ease;
      }
      @keyframes keyCorrect {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      @keyframes keyWrong {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      /* Feedback popup */
      .feedback-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 30px 50px;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        border: 2px solid rgba(255,255,255,0.2);
        z-index: 100;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .feedback-popup.visible {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      .feedback-emoji { font-size: 60px; }
      .feedback-text { font-size: 28px; font-weight: 800; color: white; }
    `;
    this.container.appendChild(style);
  }

  setupStars() {
    const container = this.container.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      star.style.width = star.style.height = `${2 + Math.random() * 3}px`;
      container.appendChild(star);
    }
  }

  start() {
    super.start();
    this.rounds = 0;
    this.wins = 0;
    this.score = 0;
    this.nextRound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      this.end();
      return;
    }

    this.rounds++;
    this.guessedLetters = [];
    this.wrongGuesses = 0;

    // Pick random word
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
    this.currentWord = shuffled[0];

    this.renderRound();
    this.updateHUD();
  }

  renderRound() {
    // Update theme
    document.getElementById('theme-display').textContent = this.currentWord.theme;

    // Update hint
    document.getElementById('hint-text').textContent = this.currentWord.hint;

    // Reset hangman
    this.container.querySelectorAll('.part').forEach(p => {
      p.classList.remove('visible');
      p.style.opacity = '0';
    });
    this.container.querySelector('.face').style.opacity = '0';

    // Word display
    const wordEl = document.getElementById('word-display');
    wordEl.innerHTML = this.currentWord.word.split('').map(letter => {
      const revealed = this.guessedLetters.includes(letter);
      return `<div class="letter-slot ${revealed ? 'revealed' : ''}">${revealed ? letter : ''}</div>`;
    }).join('');

    // Keyboard
    const keyboard = document.getElementById('keyboard');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    keyboard.innerHTML = alphabet.map(letter => {
      const used = this.guessedLetters.includes(letter);
      const inWord = this.currentWord.word.includes(letter);
      let cls = 'key-btn';
      if (used) cls += ' used ' + (inWord ? 'correct' : 'wrong');
      return `<button class="${cls}" data-letter="${letter}" ${used ? 'disabled' : ''}>${letter}</button>`;
    }).join('');

    keyboard.querySelectorAll('.key-btn:not(.used)').forEach(btn => {
      btn.addEventListener('click', () => this.guessLetter(btn.dataset.letter, btn));
    });

    // Update lives
    const livesEl = document.getElementById('lives-hearts');
    livesEl.innerHTML = '❤️'.repeat(this.maxWrong - this.wrongGuesses) + '🖤'.repeat(this.wrongGuesses);
  }

  updateHUD() {
    document.getElementById('hud-score').textContent = this.score;
    document.getElementById('round-num').textContent = `${this.rounds}/${this.maxRounds}`;
  }

  guessLetter(letter, btnElement) {
    if (this.guessedLetters.includes(letter)) return;
    this.guessedLetters.push(letter);

    const inWord = this.currentWord.word.includes(letter);

    if (inWord) {
      btnElement.classList.add('correct', 'used');
      this.incrementCombo();
      this.addScore(30);
      this.updateHUD();
      this.celebrateMove({ burst: this.currentWord.word.toUpperCase() });

      // Reveal letters with animation
      const slots = document.querySelectorAll('.letter-slot');
      this.currentWord.word.split('').forEach((l, i) => {
        if (l === letter) {
          setTimeout(() => {
            slots[i].textContent = letter;
            slots[i].classList.add('revealed');
          }, i * 100);
        }
      });
    } else {
      btnElement.classList.add('wrong', 'used');
      this.wrongGuesses++;
      this.resetCombo();

      // Show hangman part
      const part = this.container.querySelector(`.part-${this.wrongGuesses - 1}`);
      if (part) {
        part.style.opacity = '1';
        part.classList.add('visible');
      }
    }

    // Update lives display
    const livesEl = document.getElementById('lives-hearts');
    livesEl.innerHTML = '❤️'.repeat(this.maxWrong - this.wrongGuesses) + '🖤'.repeat(this.wrongGuesses);

    // Check win/lose
    setTimeout(() => this.checkGameState(), 400);
  }

  checkGameState() {
    const wordLetters = [...new Set(this.currentWord.word.split(''))];
    const allRevealed = wordLetters.every(l => this.guessedLetters.includes(l));

    if (allRevealed) {
      this.wins++;
      this.addScore(150 + (this.maxWrong - this.wrongGuesses) * 30);
      this.updateHUD();
      this.showFeedback('🎉', 'You got it!');

      if (this.combo >= 3) this.confetti.explode(null, null, 60);

      setTimeout(() => {
        this.hideFeedback();
        this.nextRound();
      }, 1800);
    } else if (this.wrongGuesses >= this.maxWrong) {
      // Show sad face
      this.container.querySelector('.face').style.opacity = '1';
      this.coachMove(`Round over. The word was ${this.currentWord.word.toUpperCase()}.`);
      this.showFeedback('😢', this.currentWord.word.toUpperCase());

      setTimeout(() => {
        this.hideFeedback();
        this.nextRound();
      }, 2200);
    }
  }

  showFeedback(emoji, text) {
    const popup = document.getElementById('feedback-popup');
    document.getElementById('popup-emoji').textContent = emoji;
    document.getElementById('popup-text').textContent = text;
    popup.classList.add('visible');
  }

  hideFeedback() {
    document.getElementById('feedback-popup').classList.remove('visible');
  }

  end() {
    this.isRunning = false;
    this.endTime = Date.now();

    if (this.wins === this.maxRounds) this.addScore(500);

    const isHighScore = this.saveScore();
    this.showResults(isHighScore);
  }
}

export function createGame(container, config) {
  return new HangmanGame(container, config);
}
