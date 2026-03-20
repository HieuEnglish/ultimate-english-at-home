/* assets/js/games/4-7/spelling-bee.js
   Spelling Bee - Ages 4-7
   
   MODERN VERSION - Game-like experience with:
   - Animated characters
   - Particle effects
   - Sound feedback
   - Dynamic backgrounds
   - Smooth transitions
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Words with emoji pictures
const WORDS = [
  { word: "cat", emoji: "🐱", color: "#ff9f43" },
  { word: "dog", emoji: "🐕", color: "#54a0ff" },
  { word: "sun", emoji: "☀️", color: "#feca57" },
  { word: "hat", emoji: "🎩", color: "#5f27cd" },
  { word: "cup", emoji: "🥤", color: "#ee5a24" },
  { word: "bed", emoji: "🛏️", color: "#0abde3" },
  { word: "pen", emoji: "🖊️", color: "#10ac84" },
  { word: "bus", emoji: "🚌", color: "#f0932b" },
  { word: "box", emoji: "📦", color: "#c8d6e5" },
  { word: "pig", emoji: "🐷", color: "#ff9ff3" },
  { word: "fish", emoji: "🐟", color: "#48dbfb" },
  { word: "bird", emoji: "🐦", color: "#7bed9f" },
  { word: "moon", emoji: "🌙", color: "#a29bfe" },
  { word: "star", emoji: "⭐", color: "#fdcb6e" },
  { word: "tree", emoji: "🌳", color: "#00b894" },
  { word: "frog", emoji: "🐸", color: "#55efc4" },
  { word: "cake", emoji: "🍰", color: "#fd79a8" },
  { word: "ball", emoji: "⚽", color: "#00cec9" },
  { word: "duck", emoji: "🦆", color: "#fdcb6e" },
  { word: "bear", emoji: "🐻", color: "#636e72" },
  { word: "fox", emoji: "🦊", color: "#e17055" },
  { word: "ant", emoji: "🐜", color: "#d63031" },
  { word: "net", emoji: "🥅", color: "#74b9ff" },
  { word: "pot", emoji: "🍯", color: "#fab1a0" },
  { word: "jam", emoji: "🫙", color: "#e84393" },
  { word: "egg", emoji: "🥚", color: "#dfe6e9" },
  { word: "map", emoji: "🗺️", color: "#00b894" },
  { word: "web", emoji: "🕸️", color: "#636e72" },
  { word: "bell", emoji: "🔔", color: "#feca57" },
  { word: "drum", emoji: "🥁", color: "#d63031" },
];

class SpellingBeeGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWord = null;
    this.userAnswer = '';
    this.letterBank = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.correctAnswers = 0;
    this.particles = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="spelling-game">
        <!-- Animated background -->
        <div class="game-bg">
          <div class="floating-letters" id="floating-letters"></div>
        </div>
        
        <!-- Main game area -->
        <div class="game-stage">
          <!-- Score display -->
          <div class="game-hud-modern">
            <div class="hud-item score-display">
              <div class="hud-icon">⭐</div>
              <div class="hud-value" id="score-value">0</div>
            </div>
            <div class="hud-item combo-display" id="combo-container" style="display:none">
              <div class="combo-flame">🔥</div>
              <div class="combo-value" id="combo-value">0</div>
            </div>
            <div class="hud-item round-display">
              <div class="round-text">Round</div>
              <div class="round-value"><span id="round-current">1</span>/<span id="round-total">8</span></div>
            </div>
          </div>
          
          <!-- Mascot character -->
          <div class="mascot-container" id="mascot">
            <div class="mascot-speech" id="mascot-speech">Spell the word!</div>
            <div class="mascot-body">🐝</div>
          </div>
          
          <!-- Picture display with glow -->
          <div class="picture-zone" id="picture-zone">
            <div class="picture-frame" id="picture-frame">
              <span class="picture-emoji" id="picture-emoji">🐱</span>
            </div>
            <button class="sound-btn" id="sound-btn" title="Hear the word">
              <span class="sound-wave"></span>
              🔊
            </button>
          </div>
          
          <!-- Answer display -->
          <div class="answer-zone" id="answer-zone">
            <div class="answer-slots" id="answer-slots"></div>
          </div>
          
          <!-- Letter bank -->
          <div class="letter-bank" id="letter-bank"></div>
          
          <!-- Feedback overlay -->
          <div class="feedback-overlay" id="feedback-overlay">
            <div class="feedback-content" id="feedback-content"></div>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.setupFloatingLetters();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .spelling-game {
        position: relative;
        width: 100%;
        min-height: 500px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      }
      
      /* Floating background letters */
      .game-bg {
        position: absolute;
        inset: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .floating-letter {
        position: absolute;
        font-size: 24px;
        font-weight: 700;
        color: rgba(255,255,255,0.04);
        animation: floatUp 15s linear infinite;
      }
      @keyframes floatUp {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
      }
      
      .game-stage {
        position: relative;
        padding: 20px;
        max-width: 500px;
        margin: 0 auto;
      }
      
      /* Modern HUD */
      .game-hud-modern {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
      }
      .hud-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 18px;
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(10px);
        border-radius: 50px;
        border: 1px solid rgba(255,255,255,0.15);
      }
      .hud-icon { font-size: 20px; }
      .hud-value { font-size: 22px; font-weight: 800; color: #feca57; }
      .round-value { font-weight: 700; color: white; }
      .round-text { font-size: 12px; color: rgba(255,255,255,0.6); margin-right: 4px; }
      
      .combo-display {
        background: linear-gradient(135deg, #ff9f43, #ee5a24);
        animation: comboPulse 0.5s ease infinite;
      }
      .combo-flame { font-size: 20px; animation: flameWiggle 0.2s ease infinite; }
      .combo-value { font-size: 22px; font-weight: 800; color: white; }
      @keyframes comboPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      @keyframes flameWiggle {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }
      
      /* Mascot */
      .mascot-container {
        text-align: center;
        margin-bottom: 16px;
      }
      .mascot-body {
        font-size: 48px;
        animation: beeFloat 2s ease-in-out infinite;
        filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
      }
      @keyframes beeFloat {
        0%, 100% { transform: translateY(0) rotate(-5deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
      }
      .mascot-speech {
        display: inline-block;
        padding: 10px 20px;
        background: white;
        color: #1a1a2e;
        border-radius: 20px;
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 8px;
        position: relative;
        animation: speechBounce 0.3s ease;
      }
      .mascot-speech::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid white;
      }
      @keyframes speechBounce {
        0% { transform: scale(0) translateY(20px); opacity: 0; }
        50% { transform: scale(1.1) translateY(-5px); }
        100% { transform: scale(1) translateY(0); opacity: 1; }
      }
      
      /* Picture zone */
      .picture-zone {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-bottom: 24px;
      }
      .picture-frame {
        width: 140px;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.1);
        border-radius: 24px;
        border: 3px solid rgba(255,255,255,0.2);
        box-shadow: 0 0 40px rgba(255,200,50,0.2), inset 0 0 40px rgba(255,255,255,0.05);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .picture-frame:hover {
        transform: scale(1.05) rotate(2deg);
        box-shadow: 0 0 60px rgba(255,200,50,0.4);
      }
      .picture-emoji {
        font-size: 80px;
        animation: pictureEntrance 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      @keyframes pictureEntrance {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      
      .sound-btn {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6c5ce7, #a55eea);
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .sound-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(108, 92, 231, 0.6);
      }
      .sound-btn:active {
        transform: scale(0.95);
      }
      .sound-btn .sound-wave {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.5);
        animation: soundWave 1s ease-out infinite;
        opacity: 0;
      }
      .sound-btn.playing .sound-wave {
        opacity: 1;
      }
      @keyframes soundWave {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2); opacity: 0; }
      }
      
      /* Answer zone */
      .answer-zone {
        margin-bottom: 24px;
      }
      .answer-slots {
        display: flex;
        justify-content: center;
        gap: 8px;
      }
      .answer-slot {
        width: 50px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.1);
        border: 3px solid rgba(255,255,255,0.2);
        border-radius: 12px;
        font-size: 28px;
        font-weight: 800;
        color: white;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }
      .answer-slot.filled {
        background: linear-gradient(135deg, #00cec9, #0984e3);
        border-color: #00cec9;
        animation: slotFill 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 4px 15px rgba(0, 206, 201, 0.4);
      }
      .answer-slot.correct {
        background: linear-gradient(135deg, #00b894, #55efc4);
        border-color: #55efc4;
        animation: correctPulse 0.5s ease;
      }
      .answer-slot.wrong {
        background: linear-gradient(135deg, #d63031, #ff7675);
        border-color: #ff7675;
        animation: wrongShake 0.4s ease;
      }
      @keyframes slotFill {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes correctPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      @keyframes wrongShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px) rotate(-3deg); }
        75% { transform: translateX(8px) rotate(3deg); }
      }
      
      /* Letter bank */
      .letter-bank {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        padding: 20px;
        background: rgba(0,0,0,0.2);
        border-radius: 20px;
        min-height: 80px;
      }
      .letter-btn {
        width: 52px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
        border: none;
        border-radius: 12px;
        font-size: 26px;
        font-weight: 800;
        color: #2d3436;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 4px 0 #e17055, 0 6px 15px rgba(0,0,0,0.2);
        transition: all 0.1s ease;
        animation: letterEntrance 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
      }
      .letter-btn:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 0 #e17055, 0 12px 25px rgba(0,0,0,0.3);
      }
      .letter-btn:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #e17055, 0 4px 10px rgba(0,0,0,0.2);
      }
      .letter-btn.used {
        opacity: 0.3;
        transform: scale(0.9);
        pointer-events: none;
        box-shadow: none;
      }
      @keyframes letterEntrance {
        0% { transform: scale(0) rotate(20deg); opacity: 0; }
        100% { transform: scale(1) rotate(0); opacity: 1; }
      }
      
      /* Feedback overlay */
      .feedback-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.7);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 100;
        border-radius: 24px;
      }
      .feedback-overlay.visible {
        opacity: 1;
        visibility: visible;
      }
      .feedback-content {
        text-align: center;
        animation: feedbackPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .feedback-emoji {
        font-size: 80px;
        display: block;
        margin-bottom: 16px;
      }
      .feedback-text {
        font-size: 32px;
        font-weight: 800;
        color: white;
        text-shadow: 0 4px 20px rgba(0,0,0,0.5);
      }
      .feedback-points {
        font-size: 24px;
        color: #feca57;
        font-weight: 700;
        margin-top: 8px;
      }
      @keyframes feedbackPop {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
      }
      
      /* Star particles */
      .star-particle {
        position: absolute;
        font-size: 24px;
        pointer-events: none;
        z-index: 50;
        animation: starFloat 1s ease-out forwards;
      }
      @keyframes starFloat {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) translateY(-50px) rotate(360deg); opacity: 0; }
      }
    `;
    this.container.appendChild(style);
  }

  setupFloatingLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const container = document.getElementById('floating-letters');

    for (let i = 0; i < 20; i++) {
      const letter = document.createElement('div');
      letter.className = 'floating-letter';
      letter.textContent = letters[Math.floor(Math.random() * letters.length)];
      letter.style.left = `${Math.random() * 100}%`;
      letter.style.animationDelay = `${Math.random() * 15}s`;
      letter.style.animationDuration = `${15 + Math.random() * 10}s`;
      container.appendChild(letter);
    }
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    this.score = 0;
    this.updateHUD();
    this.nextRound();
  }

  updateHUD() {
    document.getElementById('score-value').textContent = this.score;
    document.getElementById('round-current').textContent = this.rounds;
    document.getElementById('round-total').textContent = this.maxRounds;

    const comboContainer = document.getElementById('combo-container');
    if (this.combo > 1) {
      comboContainer.style.display = 'flex';
      document.getElementById('combo-value').textContent = `${this.combo}x`;
    } else {
      comboContainer.style.display = 'none';
    }
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      this.end();
      return;
    }

    this.rounds++;
    this.userAnswer = '';
    this.usedIndices = [];

    // Pick random word
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
    this.currentWord = shuffled[0];

    // Create letter bank (word letters + extra random letters)
    const wordLetters = this.currentWord.word.split('');
    const extraLetters = 'AEIOULNRST'.split('').filter(l => !wordLetters.includes(l.toLowerCase()));
    const extraCount = Math.max(2, 6 - wordLetters.length);
    const shuffledExtras = extraLetters.sort(() => Math.random() - 0.5).slice(0, extraCount);
    this.letterBank = [...wordLetters, ...shuffledExtras.map(l => l.toLowerCase())].sort(() => Math.random() - 0.5);

    this.renderRound();
    this.updateHUD();

    // Auto-play sound
    setTimeout(() => this.playWord(), 500);
  }

  renderRound() {
    const pictureEmoji = document.getElementById('picture-emoji');
    const slotsEl = document.getElementById('answer-slots');
    const bankEl = document.getElementById('letter-bank');
    const speechEl = document.getElementById('mascot-speech');

    // Update picture
    pictureEmoji.textContent = this.currentWord.emoji;
    pictureEmoji.style.animation = 'none';
    pictureEmoji.offsetHeight; // Trigger reflow
    pictureEmoji.style.animation = 'pictureEntrance 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    // Update glow color
    document.getElementById('picture-frame').style.boxShadow =
      `0 0 40px ${this.currentWord.color}40, inset 0 0 40px rgba(255,255,255,0.05)`;

    // Update speech
    speechEl.textContent = "Spell it! 🐝";
    speechEl.style.animation = 'none';
    speechEl.offsetHeight;
    speechEl.style.animation = 'speechBounce 0.3s ease';

    // Render answer slots
    slotsEl.innerHTML = this.currentWord.word.split('').map((_, i) => `
      <div class="answer-slot ${this.userAnswer[i] ? 'filled' : ''}">${this.userAnswer[i] || ''}</div>
    `).join('');

    // Render letter bank
    bankEl.innerHTML = this.letterBank.map((letter, i) => {
      const used = this.usedIndices.includes(i);
      return `<button class="letter-btn ${used ? 'used' : ''}" data-index="${i}" data-letter="${letter}" 
        style="animation-delay: ${i * 0.05}s" ${used ? 'disabled' : ''}>${letter}</button>`;
    }).join('');

    // Add click handlers
    bankEl.querySelectorAll('.letter-btn:not(.used)').forEach(btn => {
      btn.addEventListener('click', () => this.selectLetter(parseInt(btn.dataset.index), btn.dataset.letter));
    });

    document.getElementById('sound-btn').onclick = () => this.playWord();
  }

  selectLetter(index, letter) {
    if (this.userAnswer.length >= this.currentWord.word.length) return;

    this.userAnswer += letter;
    this.usedIndices.push(index);

    // Update slot with animation
    const slots = document.querySelectorAll('.answer-slot');
    const slot = slots[this.userAnswer.length - 1];
    slot.textContent = letter;
    slot.classList.add('filled');

    // Spawn star particles
    this.spawnStars(slot);

    // Update letter bank
    this.renderRound();

    // Check if complete
    if (this.userAnswer.length === this.currentWord.word.length) {
      setTimeout(() => this.checkAnswer(), 300);
    }
  }

  spawnStars(element) {
    const rect = element.getBoundingClientRect();
    const gameRect = this.container.getBoundingClientRect();
    const stars = ['⭐', '✨', '💫'];

    for (let i = 0; i < 3; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.textContent = stars[i % stars.length];
      star.style.left = `${rect.left - gameRect.left + rect.width / 2 + (Math.random() - 0.5) * 40}px`;
      star.style.top = `${rect.top - gameRect.top + rect.height / 2}px`;
      star.style.animationDelay = `${i * 0.1}s`;
      this.container.querySelector('.spelling-game').appendChild(star);
      setTimeout(() => star.remove(), 1000);
    }
  }

  playWord() {
    const btn = document.getElementById('sound-btn');
    btn.classList.add('playing');
    this.speak(this.currentWord.word, { rate: 0.7 });
    setTimeout(() => btn.classList.remove('playing'), 1000);
  }

  checkAnswer() {
    const isCorrect = this.userAnswer.toLowerCase() === this.currentWord.word.toLowerCase();
    const slots = document.querySelectorAll('.answer-slot');

    if (isCorrect) {
      // Success!
      this.incrementCombo();
      const points = this.addScore(100);
      this.correctAnswers++;
      this.updateHUD();

      slots.forEach(slot => slot.classList.add('correct'));
      this.showFeedback('🎉', 'Amazing!', `+${points} points`);
      this.celebrateMove({ burst: this.currentWord.word.toUpperCase() });

      // Confetti for combos
      if (this.combo >= 3) {
        this.confetti.explode(null, null, 50);
      }

      document.getElementById('mascot-speech').textContent = ['Great job!', 'Perfect!', 'You did it!', 'Awesome!'][Math.floor(Math.random() * 4)];

      setTimeout(() => {
        this.hideFeedback();
        this.nextRound();
      }, 1500);
    } else {
      // Wrong
      this.resetCombo();
      this.updateHUD();

      slots.forEach(slot => slot.classList.add('wrong'));
      this.showFeedback('😅', `It was "${this.currentWord.word}"`, 'Try the next one!');
      this.coachMove(`That word was ${this.currentWord.word}. Watch the letters and try the next round.`, 1100);

      document.getElementById('mascot-speech').textContent = "Good try! 🐝";

      setTimeout(() => {
        this.hideFeedback();
        this.nextRound();
      }, 2000);
    }
  }

  showFeedback(emoji, text, subtext) {
    const overlay = document.getElementById('feedback-overlay');
    const content = document.getElementById('feedback-content');

    content.innerHTML = `
      <span class="feedback-emoji">${emoji}</span>
      <div class="feedback-text">${text}</div>
      <div class="feedback-points">${subtext}</div>
    `;

    overlay.classList.add('visible');
  }

  hideFeedback() {
    document.getElementById('feedback-overlay').classList.remove('visible');
  }

  end() {
    this.isRunning = false;
    this.endTime = Date.now();

    if (this.correctAnswers >= 6) this.addScore(300);
    if (this.correctAnswers === this.maxRounds) this.addScore(500);

    const isHighScore = this.saveScore();
    this.showResults(isHighScore);
  }
}

export function createGame(container, config) {
  return new SpellingBeeGame(container, config);
}
