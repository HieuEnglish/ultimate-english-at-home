/* assets/js/games/11-12/grammar-ninja.js
   Grammar Ninja - Ages 11-12
   
   MODERN VERSION - Slice wrong grammar with ninja moves!
   Fast-paced grammar correction game.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
    { sentence: "She don't like pizza.", correct: "She doesn't like pizza.", error: "don't → doesn't" },
    { sentence: "He goed to school.", correct: "He went to school.", error: "goed → went" },
    { sentence: "Their going home.", correct: "They're going home.", error: "Their → They're" },
    { sentence: "I seen that movie.", correct: "I saw that movie.", error: "seen → saw" },
    { sentence: "Me and him played.", correct: "He and I played.", error: "Me and him → He and I" },
    { sentence: "She runned fast.", correct: "She ran fast.", error: "runned → ran" },
    { sentence: "The dog eat it's food.", correct: "The dog eats its food.", error: "eat it's → eats its" },
    { sentence: "We was happy.", correct: "We were happy.", error: "was → were" },
    { sentence: "He don't know.", correct: "He doesn't know.", error: "don't → doesn't" },
    { sentence: "She is more smarter.", correct: "She is smarter.", error: "more smarter → smarter" },
    { sentence: "They plays soccer.", correct: "They play soccer.", error: "plays → play" },
    { sentence: "I have went there.", correct: "I have gone there.", error: "went → gone" },
    { sentence: "Him and me are friends.", correct: "He and I are friends.", error: "Him and me → He and I" },
    { sentence: "She telled me a story.", correct: "She told me a story.", error: "telled → told" },
    { sentence: "The childs are noisy.", correct: "The children are noisy.", error: "childs → children" },
    { sentence: "I doesn't like broccoli.", correct: "I don't like broccoli.", error: "doesn't → don't" },
    { sentence: "There playing outside.", correct: "They're playing outside.", error: "There → They're" },
    { sentence: "She catched the ball.", correct: "She caught the ball.", error: "catched → caught" },
    { sentence: "He swim very well.", correct: "He swims very well.", error: "swim → swims" },
    { sentence: "The mouses ran away.", correct: "The mice ran away.", error: "mouses → mice" },
];

class GrammarNinjaGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 75 });
        this.currentSentence = null;
        this.rounds = 0;
        this.sliced = 0;
        this.streak = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="ninja-game">
        <div class="ninja-bg">
          <div class="bamboo-forest"></div>
        </div>
        
        <div class="ninja-stage">
          <!-- HUD -->
          <div class="ninja-hud">
            <div class="hud-panel">
              <span class="panel-icon">⚔️</span>
              <span class="panel-val" id="sliced-count">0</span>
              <span class="panel-label">Sliced</span>
            </div>
            <div class="hud-panel timer-panel">
              <span class="panel-icon">⏱️</span>
              <span class="panel-val" id="timer-val">1:15</span>
            </div>
            <div class="hud-panel score-panel">
              <span class="panel-icon">⭐</span>
              <span class="panel-val" id="score-val">0</span>
            </div>
          </div>
          
          <!-- Ninja mascot -->
          <div class="ninja-mascot">
            <div class="ninja-char">🥷</div>
            <div class="ninja-speech" id="ninja-speech">Slice the errors!</div>
          </div>
          
          <!-- Sentence card -->
          <div class="sentence-card" id="sentence-card">
            <div class="sentence-text" id="sentence-text">Loading...</div>
            <div class="sentence-hint" id="sentence-hint"></div>
          </div>
          
          <!-- Choice buttons -->
          <div class="choice-buttons">
            <button class="choice-btn wrong-btn" id="wrong-btn">
              <span class="btn-icon">❌</span>
              <span class="btn-text">Wrong!</span>
            </button>
            <button class="choice-btn correct-btn" id="correct-btn">
              <span class="btn-icon">✅</span>
              <span class="btn-text">Correct!</span>
            </button>
          </div>
          
          <!-- Slash effect -->
          <div class="slash-effect" id="slash-effect"></div>
          
          <!-- Streak display -->
          <div class="streak-display" id="streak-display">
            <span class="streak-fire">🔥</span>
            <span class="streak-num" id="streak-num">0</span>
            <span class="streak-text">streak</span>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .ninja-game {
        position: relative;
        width: 100%;
        min-height: 520px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      }
      
      .ninja-bg {
        position: absolute;
        inset: 0;
        opacity: 0.3;
      }
      .bamboo-forest {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(transparent, rgba(0,100,0,0.3));
      }
      
      .ninja-stage {
        position: relative;
        padding: 20px;
        max-width: 480px;
        margin: 0 auto;
      }
      
      .ninja-hud {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .hud-panel {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .panel-icon { font-size: 18px; }
      .panel-val { font-size: 20px; font-weight: 800; color: #feca57; }
      .panel-label { font-size: 12px; color: rgba(255,255,255,0.5); }
      .timer-panel .panel-val { color: #74b9ff; }
      
      .ninja-mascot {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;
      }
      .ninja-char {
        font-size: 56px;
        animation: ninjaReady 1s ease infinite;
      }
      @keyframes ninjaReady {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
      .ninja-speech {
        padding: 10px 20px;
        background: white;
        color: #1a1a2e;
        border-radius: 16px;
        font-weight: 700;
        margin-bottom: 8px;
      }
      
      .sentence-card {
        background: rgba(255,255,255,0.95);
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        margin-bottom: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      }
      .sentence-card.sliced {
        animation: sliceCard 0.5s ease;
      }
      @keyframes sliceCard {
        0% { transform: scale(1); }
        20% { transform: scale(1.05) rotate(2deg); }
        100% { transform: scale(0.9) rotate(-5deg); opacity: 0; }
      }
      .sentence-text {
        font-size: 22px;
        font-weight: 600;
        color: #2d3436;
        line-height: 1.5;
      }
      .sentence-hint {
        margin-top: 12px;
        font-size: 14px;
        color: #636e72;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .sentence-hint.visible { opacity: 1; }
      
      .choice-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-bottom: 20px;
      }
      .choice-btn {
        flex: 1;
        max-width: 160px;
        padding: 16px 24px;
        border-radius: 16px;
        border: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
      .wrong-btn {
        background: linear-gradient(135deg, #ff7675, #d63031);
        color: white;
      }
      .correct-btn {
        background: linear-gradient(135deg, #55efc4, #00b894);
        color: white;
      }
      .choice-btn:hover { transform: translateY(-4px) scale(1.02); }
      .choice-btn:active { transform: translateY(2px); }
      .btn-icon { font-size: 28px; }
      .btn-text { font-weight: 800; font-size: 15px; }
      
      .slash-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
      }
      .slash-effect.active {
        opacity: 1;
        animation: slashAnim 0.4s ease-out;
      }
      .slash-line {
        position: absolute;
        width: 200px;
        height: 4px;
        background: linear-gradient(90deg, transparent, #feca57, transparent);
        transform-origin: center;
      }
      @keyframes slashAnim {
        0% { transform: translate(-50%, -50%) scale(0) rotate(45deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2) rotate(45deg); opacity: 0; }
      }
      
      .streak-display {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #ff9f43, #ee5a24);
        border-radius: 50px;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
      }
      .streak-display.visible {
        opacity: 1;
        transform: translateX(0);
      }
      .streak-fire { font-size: 24px; animation: fireWiggle 0.3s ease infinite; }
      @keyframes fireWiggle {
        0%, 100% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
      }
      .streak-num { font-size: 24px; font-weight: 900; color: white; }
      .streak-text { font-size: 14px; color: rgba(255,255,255,0.8); }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.sliced = 0;
        this.streak = 0;
        this.score = 0;
        this.nextSentence();
    }

    nextSentence() {
        this.rounds++;

        // Mix of wrong sentences (80%) and correct ones (20%)
        const isWrong = Math.random() < 0.8;

        if (isWrong) {
            const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
            this.currentSentence = { ...shuffled[0], isWrong: true };
        } else {
            const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
            this.currentSentence = {
                sentence: shuffled[0].correct,
                correct: shuffled[0].correct,
                isWrong: false
            };
        }

        this.renderSentence();
        this.updateHUD();
    }

    renderSentence() {
        const card = document.getElementById('sentence-card');
        card.classList.remove('sliced');
        card.style.opacity = '1';
        card.style.transform = 'none';

        document.getElementById('sentence-text').textContent = this.currentSentence.sentence;
        document.getElementById('sentence-hint').textContent = '';
        document.getElementById('sentence-hint').classList.remove('visible');
        document.getElementById('ninja-speech').textContent = 'Is this correct? 🤔';

        document.getElementById('wrong-btn').onclick = () => this.makeChoice(true);
        document.getElementById('correct-btn').onclick = () => this.makeChoice(false);
    }

    updateHUD() {
        document.getElementById('sliced-count').textContent = this.sliced;
        document.getElementById('score-val').textContent = this.score;

        const streakEl = document.getElementById('streak-display');
        if (this.streak >= 3) {
            streakEl.classList.add('visible');
            document.getElementById('streak-num').textContent = this.streak;
        } else {
            streakEl.classList.remove('visible');
        }
    }

    makeChoice(saidWrong) {
        const wasWrong = this.currentSentence.isWrong;
        const isCorrect = saidWrong === wasWrong;

        if (isCorrect) {
            this.streak++;
            this.incrementCombo();
            this.addScore(50 + this.streak * 10);

            if (wasWrong) {
                this.sliced++;
                this.showSlashEffect();
                document.getElementById('ninja-speech').textContent = '⚔️ SLICED!';
                document.getElementById('sentence-card').classList.add('sliced');
                document.getElementById('sentence-hint').textContent = this.currentSentence.error;
            } else {
                document.getElementById('ninja-speech').textContent = '✅ Correct!';
            }

            if (this.streak >= 5) this.confetti.explode(null, null, 30);

            this.updateHUD();

            setTimeout(() => this.nextSentence(), wasWrong ? 1000 : 700);
        } else {
            this.streak = 0;
            this.resetCombo();

            document.getElementById('ninja-speech').textContent = wasWrong ? 'It was wrong! 😅' : 'It was correct! 🤔';
            document.getElementById('sentence-hint').textContent = wasWrong
                ? `Fix: ${this.currentSentence.error}`
                : '';
            document.getElementById('sentence-hint').classList.add('visible');

            Animations.shake(document.getElementById('sentence-card'));
            this.updateHUD();

            setTimeout(() => this.nextSentence(), 1500);
        }
    }

    showSlashEffect() {
        const slash = document.getElementById('slash-effect');
        slash.innerHTML = '<div class="slash-line"></div>';
        slash.classList.remove('active');
        void slash.offsetWidth;
        slash.classList.add('active');
    }

    onTimerTick(remaining) {
        document.getElementById('timer-val').textContent = this.formatTime(remaining);
        if (remaining <= 10) {
            document.getElementById('timer-val').style.color = '#ff7675';
        }
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        if (this.sliced >= 10) this.addScore(300);
        if (this.maxCombo >= 5) this.addScore(200);
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new GrammarNinjaGame(container, config);
}
