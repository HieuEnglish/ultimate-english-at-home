/* assets/js/games/4-7/word-builder.js
   Word Builder - Ages 4-7
   
   Game mechanics:
   - Show emoji picture
   - Display scrambled letters below
   - Tap letters in order to spell the word
   - 10 rounds total
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

// Word list with emoji pictures
const WORDS = [
  { word: "cat", emoji: "🐱", color: "#ff9f43" },
  { word: "dog", emoji: "🐕", color: "#54a0ff" },
  { word: "sun", emoji: "☀️", color: "#feca57" },
  { word: "hat", emoji: "🎩", color: "#5f27cd" },
  { word: "cup", emoji: "🥤", color: "#ee5a24" },
  { word: "bed", emoji: "🛏️", color: "#0abde3" },
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
  { word: "bell", emoji: "🔔", color: "#feca57" },
  { word: "cake", emoji: "🍰", color: "#fd79a8" },
  { word: "book", emoji: "📚", color: "#a29bfe" },
];

class WordBuilderGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWord = null;
    this.userAnswer = '';
    this.letterBank = [];
    this.usedIndices = [];
    this.rounds = 0;
    this.maxRounds = 10;
    this.correctAnswers = 0;
    this.roundWords = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="wb-game">
        <div class="wb-header">
          <div class="wb-score-box">
            <span class="wb-star">⭐</span>
            <span id="wb-score">0</span>
          </div>
          <div class="wb-title-area">
            <div class="wb-title">Word Builder</div>
            <div class="wb-round-info">Round <span id="wb-round">1</span> of <span id="wb-total">10</span></div>
          </div>
          <div class="wb-streak-box" id="wb-streak-box" style="visibility:hidden">
            <span class="wb-fire">🔥</span>
            <span id="wb-streak">0</span>
          </div>
        </div>
        
        <div class="wb-mascot" id="wb-mascot">
          <div class="wb-speech" id="wb-speech">Tap the letters to spell!</div>
          <div class="wb-mascot-body">🦉</div>
        </div>
        
        <div class="wb-picture-zone" id="wb-picture-zone">
          <div class="wb-picture-frame" id="wb-picture-frame">
            <span class="wb-emoji" id="wb-emoji">🐱</span>
          </div>
          <button class="wb-speak-btn" id="wb-speak-btn" title="Hear the word">
            🔊
          </button>
        </div>
        
        <div class="wb-hint-text" id="wb-hint-text">What word is this?</div>
        
        <div class="wb-answer-area" id="wb-answer-area"></div>
        
        <div class="wb-letter-bank" id="wb-letter-bank"></div>
        
        <div class="wb-feedback" id="wb-feedback">
          <div class="wb-feedback-inner" id="wb-feedback-inner"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.setupEventListeners();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .wb-game {
        position: relative;
        width: 100%;
        min-height: 580px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: 'Fredoka One', cursive, sans-serif;
        padding: 20px;
        box-sizing: border-box;
      }
      
      /* Header */
      .wb-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .wb-score-box, .wb-streak-box {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255,255,255,0.2);
        padding: 8px 14px;
        border-radius: 999px;
        color: white;
        font-size: 20px;
        font-weight: 700;
      }
      .wb-star { font-size: 22px; }
      .wb-fire { font-size: 20px; }
      .wb-title-area { text-align: center; }
      .wb-title {
        font-size: 26px;
        color: white;
        text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
      }
      .wb-round-info {
        font-size: 14px;
        color: rgba(255,255,255,0.8);
      }
      
      /* Mascot */
      .wb-mascot {
        text-align: center;
        margin-bottom: 12px;
      }
      .wb-mascot-body {
        font-size: 50px;
        animation: wbBounce 1.5s ease-in-out infinite;
        filter: drop-shadow(0 8px 15px rgba(0,0,0,0.2));
      }
      @keyframes wbBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .wb-speech {
        display: inline-block;
        background: white;
        color: #5f27cd;
        padding: 8px 16px;
        border-radius: 16px;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;
        position: relative;
        animation: wbSpeechPop 0.3s ease;
      }
      .wb-speech::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid white;
      }
      @keyframes wbSpeechPop {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
      }
      
      /* Picture Zone */
      .wb-picture-zone {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-bottom: 12px;
      }
      .wb-picture-frame {
        width: 120px;
        height: 120px;
        background: rgba(255,255,255,0.15);
        border-radius: 24px;
        border: 4px solid rgba(255,255,255,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        transition: transform 0.3s ease;
      }
      .wb-picture-frame:hover {
        transform: scale(1.05);
      }
      .wb-emoji {
        font-size: 70px;
        animation: wbEmojiPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      @keyframes wbEmojiPop {
        0% { transform: scale(0) rotate(-20deg); opacity: 0; }
        100% { transform: scale(1) rotate(0); opacity: 1; }
      }
      .wb-speak-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00cec9, #0984e3);
        border: none;
        font-size: 22px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .wb-speak-btn:hover {
        transform: scale(1.1);
      }
      .wb-speak-btn:active {
        transform: scale(0.95);
      }
      
      .wb-hint-text {
        text-align: center;
        color: rgba(255,255,255,0.9);
        font-size: 18px;
        margin-bottom: 16px;
      }
      
      /* Answer Area */
      .wb-answer-area {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
        min-height: 60px;
      }
      .wb-answer-slot {
        width: 48px;
        height: 58px;
        background: rgba(255,255,255,0.1);
        border: 3px dashed rgba(255,255,255,0.4);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 700;
        color: white;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }
      .wb-answer-slot.filled {
        background: linear-gradient(135deg, #00cec9, #0984e3);
        border: 3px solid #00cec9;
        border-style: solid;
        animation: wbSlotFill 0.3s ease;
      }
      .wb-answer-slot.correct {
        background: linear-gradient(135deg, #00b894, #55efc4);
        border-color: #55efc4;
        animation: wbCorrect 0.4s ease;
      }
      .wb-answer-slot.wrong {
        background: linear-gradient(135deg, #d63031, #ff7675);
        border-color: #ff7675;
        animation: wbWrong 0.4s ease;
      }
      @keyframes wbSlotFill {
        0% { transform: scale(0.5); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      @keyframes wbCorrect {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes wbWrong {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        75% { transform: translateX(6px); }
      }
      
      /* Letter Bank */
      .wb-letter-bank {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        padding: 16px;
        background: rgba(0,0,0,0.15);
        border-radius: 20px;
        min-height: 80px;
      }
      .wb-letter-btn {
        width: 50px;
        height: 58px;
        background: linear-gradient(135deg, #ffeaa7, #fdcb6e);
        border: none;
        border-radius: 12px;
        font-size: 24px;
        font-weight: 700;
        color: #2d3436;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 4px 0 #e17055, 0 6px 15px rgba(0,0,0,0.2);
        transition: all 0.1s ease;
        animation: wbLetterIn 0.3s ease backwards;
      }
      .wb-letter-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 0 #e17055, 0 10px 20px rgba(0,0,0,0.25);
      }
      .wb-letter-btn:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #e17055;
      }
      .wb-letter-btn.used {
        opacity: 0.25;
        transform: scale(0.85);
        pointer-events: none;
        box-shadow: none;
      }
      @keyframes wbLetterIn {
        0% { transform: scale(0) rotate(15deg); opacity: 0; }
        100% { transform: scale(1) rotate(0); opacity: 1; }
      }
      
      /* Feedback Overlay */
      .wb-feedback {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.65);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        border-radius: 24px;
        z-index: 50;
      }
      .wb-feedback.visible {
        opacity: 1;
        visibility: visible;
      }
      .wb-feedback-inner {
        text-align: center;
        animation: wbFeedbackPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .wb-feedback-emoji {
        font-size: 70px;
        display: block;
        margin-bottom: 10px;
      }
      .wb-feedback-text {
        font-size: 28px;
        font-weight: 700;
        color: white;
        text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
      }
      .wb-feedback-points {
        font-size: 22px;
        color: #feca57;
        margin-top: 6px;
      }
      @keyframes wbFeedbackPop {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    this.container.appendChild(style);
  }

  setupEventListeners() {
    document.getElementById('wb-speak-btn').onclick = () => this.speakCurrentWord();
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    this.score = 0;
    this.streak = 0;
    this.updateHUD();
    this.prepareRoundWords();
    this.nextRound();
  }

  prepareRoundWords() {
    // Shuffle and pick 10 words for this game session
    this.roundWords = [...WORDS]
      .sort(() => Math.random() - 0.5)
      .slice(0, this.maxRounds);
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      return this.endGame();
    }

    this.currentWord = this.roundWords[this.rounds];
    this.userAnswer = '';
    this.usedIndices = [];

    // Scramble letters
    this.letterBank = this.scrambleLetters(this.currentWord.word);

    this.renderRound();
    this.updateHUD();
    this.speakCurrentWord();
  }

  scrambleLetters(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  }

  renderRound() {
    // Update emoji
    document.getElementById('wb-emoji').textContent = this.currentWord.emoji;
    document.getElementById('wb-emoji').style.animation = 'none';
    setTimeout(() => {
      document.getElementById('wb-emoji').style.animation = 'wbEmojiPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, 10);

    // Update speech
    document.getElementById('wb-speech').textContent = 'Spell the word!';

    // Render answer slots
    const answerArea = document.getElementById('wb-answer-area');
    answerArea.innerHTML = this.currentWord.word.split('').map(() => 
      '<div class="wb-answer-slot"></div>'
    ).join('');

    // Render letter bank
    const letterBank = document.getElementById('wb-letter-bank');
    letterBank.innerHTML = this.letterBank.map((letter, i) => 
      `<button class="wb-letter-btn" data-index="${i}" style="animation-delay:${i * 0.05}s">${letter}</button>`
    ).join('');

    // Add click handlers
    letterBank.querySelectorAll('.wb-letter-btn').forEach((btn) => {
      btn.onclick = () => this.handleLetterClick(Number(btn.dataset.index));
    });
  }

  handleLetterClick(index) {
    if (this.usedIndices.includes(index)) return;

    const letter = this.letterBank[index];
    const expectedLetter = this.currentWord.word[this.userAnswer.length];

    if (letter === expectedLetter) {
      // Correct letter
      this.usedIndices.push(index);
      this.userAnswer += letter;

      // Mark letter as used
      const letterBtn = document.querySelector(`.wb-letter-btn[data-index="${index}"]`);
      letterBtn.classList.add('used');

      // Fill answer slot
      const slots = document.querySelectorAll('.wb-answer-slot');
      slots[this.userAnswer.length - 1].classList.add('filled');
      slots[this.userAnswer.length - 1].textContent = letter;

      // Check if word complete
      if (this.userAnswer === this.currentWord.word) {
        this.handleCorrectWord();
      }
    } else {
      // Wrong letter - show feedback
      const slots = document.querySelectorAll('.wb-answer-slot');
      slots[this.userAnswer.length].classList.add('wrong');
      this.resetCombo();
      this.coachMove(`Try the letter ${expectedLetter.toUpperCase()}!`, 600);
      setTimeout(() => {
        slots[this.userAnswer.length].classList.remove('wrong');
      }, 500);
    }
  }

  handleCorrectWord() {
    this.correctAnswers++;
    this.streak++;
    this.incrementCombo();
    this.addScore(100 + (this.streak * 10));

    // Mark all slots as correct
    const slots = document.querySelectorAll('.wb-answer-slot');
    slots.forEach((slot) => {
      slot.classList.remove('filled');
      slot.classList.add('correct');
    });

    this.updateHUD();
    this.celebrateMove({ burst: '⭐', duration: 800 });
    this.confetti.explode(null, null, 25);

    // Show feedback and advance
    document.getElementById('wb-speech').textContent = 'Great job!';
    this.showFeedback(true);

    setTimeout(() => {
      this.hideFeedback();
      this.rounds++;
      this.nextRound();
    }, 1500);
  }

  showFeedback(isCorrect) {
    const feedback = document.getElementById('wb-feedback');
    const inner = document.getElementById('wb-feedback-inner');
    
    if (isCorrect) {
      inner.innerHTML = `
        <span class="wb-feedback-emoji">🎉</span>
        <div class="wb-feedback-text">Correct!</div>
        <div class="wb-feedback-points">+${100 + (this.streak * 10)} points</div>
      `;
    } else {
      inner.innerHTML = `
        <span class="wb-feedback-emoji">😊</span>
        <div class="wb-feedback-text">The word was ${this.currentWord.word}</div>
      `;
    }
    
    feedback.classList.add('visible');
  }

  hideFeedback() {
    document.getElementById('wb-feedback').classList.remove('visible');
  }

  speakCurrentWord() {
    this.speak(this.currentWord.word, { rate: 0.85 });
  }

  updateHUD() {
    document.getElementById('wb-score').textContent = this.score;
    document.getElementById('wb-round').textContent = this.rounds + 1;
    document.getElementById('wb-total').textContent = this.maxRounds;

    const streakBox = document.getElementById('wb-streak-box');
    if (this.streak >= 2) {
      streakBox.style.visibility = 'visible';
      document.getElementById('wb-streak').textContent = this.streak;
    } else {
      streakBox.style.visibility = 'hidden';
    }
  }

  endGame() {
    const message = this.correctAnswers === this.maxRounds 
      ? 'Perfect! You spelled all the words!' 
      : `You spelled ${this.correctAnswers} out of ${this.maxRounds} words!`;
    
    document.getElementById('wb-speech').textContent = message;
    this.confetti.explode(null, null, 40);
    this.celebrateMove({ burst: '🎊', duration: 1500 });
    
    setTimeout(() => {
      this.showResults(this.saveScore());
    }, 2000);
  }
}

export function createGame(container, config) {
  return new WordBuilderGame(container, config);
}