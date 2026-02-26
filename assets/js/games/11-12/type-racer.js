/* assets/js/games/11-12/type-racer.js
   Type Racer - Ages 11-12
   
   MODERN VERSION - Race against AI cars by typing sentences correctly!
   Visual racing game driven by typing speed and accuracy.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect in everything you do.",
    "Learning English opens many new doors.",
    "Reading books is a great way to learn new words.",
    "Always try your best and never give up.",
    "Summer days are long and full of sunshine.",
    "Music can change the way you feel instantly.",
    "Travel is the only thing you buy that makes you richer.",
    "Kindness costs nothing but means everything.",
    "A journey of a thousand miles begins with a single step.",
    "Time flies when you are having fun.",
    "Better late than never, but better never late.",
    "Actions speak louder than words in every situation.",
    "The early bird catches the worm every morning.",
    "Curiosity is the engine of achievement.",
    "Every expert was once a beginner at some point.",
    "Hard work beats talent when talent fails to work hard.",
    "The pen is mightier than the sword.",
    "Imagination is more important than knowledge.",
    "Patience is a virtue that leads to great rewards.",
];

class TypeRacerGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: false }); // Race based, not fixed timer
        this.sentences = [];
        this.currentSentenceIndex = 0;
        this.typedText = '';
        this.startTime = 0;
        this.wpm = 0;
        this.progress = 0;
        this.opponentProgress = 0;
        this.raceInterval = null;
        this.raceFinished = false;
    }

    async init() {
        this.container.innerHTML = `
      <div class="racer-game">
        <div class="racer-track-bg">
          <div class="track-lines"></div>
          <div class="scenery"></div>
        </div>
        
        <div class="racer-stage">
          <!-- HUD -->
          <div class="racer-hud">
            <div class="hud-stat">
              <span class="stat-label">WPM</span>
              <span class="stat-val" id="wpm-display">0</span>
            </div>
            <div class="hud-stat">
              <span class="stat-label">Progress</span>
              <span class="stat-val" id="progress-display">0%</span>
            </div>
            <div class="hud-stat rank-stat">
              <span class="stat-label">Rank</span>
              <span class="stat-val" id="rank-display">1st</span>
            </div>
          </div>
          
          <!-- Race Track Visual -->
          <div class="race-visual">
            <div class="lane player-lane">
              <div class="car player-car" id="player-car">🏎️</div>
              <div class="finish-line">🏁</div>
            </div>
            <div class="lane opponent-lane">
              <div class="car opponent-car" id="opponent-car">🚗</div>
              <div class="finish-line">🏁</div>
            </div>
          </div>
          
          <!-- Typing Area -->
          <div class="typing-dashboard">
            <div class="sentence-display" id="sentence-display"></div>
            <input type="text" class="racer-input" id="racer-input" 
              placeholder="Type the sentence here..." autocomplete="off">
            <div class="race-status" id="race-status">Get Ready...</div>
          </div>
          
          <!-- Victory Popup -->
          <div class="victory-popup" id="victory-popup">
            <div class="trophy">🏆</div>
            <div class="victory-title">You Won!</div>
            <div class="victory-stats">
              <div>Speed: <span id="final-wpm">0</span> WPM</div>
              <div>Time: <span id="final-time">0</span>s</div>
            </div>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .racer-game {
        position: relative;
        width: 100%;
        min-height: 540px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(180deg, #87CEEB 0%, #E0F7FA 50%, #4CAF50 100%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .racer-track-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      
      .racer-stage {
        position: relative;
        z-index: 10;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      .racer-hud {
        display: flex;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        margin-bottom: 20px;
      }
      .hud-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .stat-label { font-size: 12px; color: #666; font-weight: bold; text-transform: uppercase; }
      .stat-val { font-size: 24px; font-weight: 900; color: #333; }
      #rank-display { color: #f1c40f; }
      
      .race-visual {
        background: #333;
        border-radius: 12px;
        padding: 10px;
        margin-bottom: 20px;
        position: relative;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
      }
      .lane {
        height: 60px;
        border-bottom: 2px dashed rgba(255,255,255,0.3);
        position: relative;
        display: flex;
        align-items: center;
      }
      .lane:last-child { border-bottom: none; }
      
      .car {
        font-size: 40px;
        position: absolute;
        left: 0;
        transition: left 0.5s linear;
        filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.5));
        z-index: 5;
      }
      .player-car { transform: scaleX(-1); } /* Face right */
      .opponent-car { transform: scaleX(-1); filter: grayscale(100%); opacity: 0.8; }
      
      .finish-line {
        position: absolute;
        right: 20px;
        font-size: 30px;
        opacity: 0.5;
      }
      
      .typing-dashboard {
        background: rgba(255,255,255,0.95);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .sentence-display {
        font-size: 22px;
        line-height: 1.5;
        color: #555;
        font-family: monospace;
        margin-bottom: 10px;
        user-select: none;
      }
      .char-correct { color: #2ecc71; background: rgba(46, 204, 113, 0.1); }
      .char-wrong { color: #e74c3c; background: rgba(231, 76, 60, 0.1); text-decoration: underline; }
      .char-current { border-bottom: 2px solid #3498db; }
      
      .racer-input {
        width: 100%;
        padding: 14px;
        font-size: 18px;
        border: 2px solid #ddd;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.3s;
        font-family: monospace;
      }
      .racer-input:focus { border-color: #3498db; }
      .racer-input.error { border-color: #e74c3c; animation: shake 0.3s; }
      
      .race-status {
        text-align: center;
        font-weight: bold;
        color: #e67e22;
        font-size: 18px;
        min-height: 27px;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .victory-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: white;
        padding: 30px 50px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        z-index: 100;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .victory-popup.visible { transform: translate(-50%, -50%) scale(1); }
      .trophy { font-size: 60px; margin-bottom: 10px; animation: bounce 1s infinite alternate; }
      .victory-title { font-size: 32px; font-weight: 900; color: #2ecc71; margin-bottom: 10px; }
      .victory-stats { font-size: 18px; color: #555; }
      
      @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-10px); } }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.sentences = [...SENTENCES].sort(() => Math.random() - 0.5).slice(0, 3);
        this.currentSentenceIndex = 0;
        this.progress = 0;
        this.opponentProgress = 0;
        this.raceFinished = false;
        this.startTime = 0;
        this.wpm = 0;

        this.renderSentence();
        this.startCountdown();
    }

    startCountdown() {
        const status = document.getElementById('race-status');
        const input = document.getElementById('racer-input');
        input.disabled = true;

        let count = 3;
        status.textContent = `Race starts in ${count}...`;

        const countInterval = setInterval(() => {
            count--;
            if (count > 0) {
                status.textContent = `Race starts in ${count}...`;
            } else {
                clearInterval(countInterval);
                status.textContent = "GO!";
                input.disabled = false;
                input.focus();
                this.startRace();
            }
        }, 1000);
    }

    startRace() {
        this.startTime = Date.now();

        // Opponent AI logic
        this.raceInterval = setInterval(() => {
            if (this.raceFinished) return;

            // Opponent advances randomly
            this.opponentProgress += Math.random() * 0.8;
            if (this.opponentProgress >= 100) this.opponentProgress = 100;
            this.updateCars();

            // Update WPM
            if (this.typedText.length > 0) {
                const timeMinutes = (Date.now() - this.startTime) / 60000;
                this.wpm = Math.round((this.typedText.length / 5) / timeMinutes);
                document.getElementById('wpm-display').textContent = this.wpm;
            }

            // Check opponent win condition
            if (this.opponentProgress >= 100 && !this.raceFinished) {
                this.finishRace(false);
            }
        }, 100);

        const input = document.getElementById('racer-input');
        input.addEventListener('input', (e) => this.handleInput(e));
    }

    handleInput(e) {
        if (this.raceFinished) return;

        const input = e.target;
        const val = input.value;
        const targetSentence = this.sentences[this.currentSentenceIndex];

        // Check if correct so far
        if (targetSentence.startsWith(val)) {
            this.typedText = this.sentences.slice(0, this.currentSentenceIndex).join(' ') + (this.currentSentenceIndex > 0 ? ' ' : '') + val;
            input.classList.remove('error');

            this.renderSentence(val);

            // Calculate progress based on total length of all sentences
            const totalChars = this.sentences.join(' ').length;
            const currentChars = this.sentences.slice(0, this.currentSentenceIndex).join(' ').length + (this.currentSentenceIndex > 0 ? 1 : 0) + val.length;
            this.progress = Math.min(100, (currentChars / totalChars) * 100);
            this.updateCars();

            document.getElementById('progress-display').textContent = Math.round(this.progress) + "%";

            // Rank check
            const rank = this.progress >= this.opponentProgress ? "1st" : "2nd";
            document.getElementById('rank-display').textContent = rank;
            document.getElementById('rank-display').style.color = rank === "1st" ? "#f1c40f" : "#bdc3c7";

            if (val === targetSentence) {
                // Sentence complete
                this.currentSentenceIndex++;
                input.value = '';

                if (this.currentSentenceIndex >= this.sentences.length) {
                    this.finishRace(true);
                } else {
                    this.renderSentence();
                    this.confetti.explode(null, null, 20); // Mini celebration
                }
            }
        } else {
            input.classList.add('error');
        }
    }

    renderSentence(currentInput = '') {
        const el = document.getElementById('sentence-display');
        const sentence = this.sentences[this.currentSentenceIndex];

        if (!sentence) return;

        let html = '';
        for (let i = 0; i < sentence.length; i++) {
            let charClass = '';
            if (i < currentInput.length) {
                charClass = 'char-correct';
            } else if (i === currentInput.length) {
                charClass = 'char-current';
            }
            html += `<span class="${charClass}">${sentence[i]}</span>`;
        }
        el.innerHTML = html;
    }

    updateCars() {
        const trackWidth = document.querySelector('.race-visual').clientWidth - 60; // adjust for car width

        const playerPos = (this.progress / 100) * trackWidth;
        const oppPos = (this.opponentProgress / 100) * trackWidth;

        document.getElementById('player-car').style.left = `${playerPos}px`;
        document.getElementById('opponent-car').style.left = `${oppPos}px`;
    }

    finishRace(won) {
        this.raceFinished = true;
        clearInterval(this.raceInterval);
        document.getElementById('racer-input').disabled = true;

        if (won) {
            const timeSeconds = ((Date.now() - this.startTime) / 1000).toFixed(1);
            const score = Math.round(this.wpm * 10 + (1000 / timeSeconds));

            this.addScore(score);
            this.confetti.explode(null, null, 100);

            document.getElementById('final-wpm').textContent = this.wpm;
            document.getElementById('final-time').textContent = timeSeconds;

            const popup = document.getElementById('victory-popup');
            popup.querySelector('.victory-title').textContent = "You Won!";
            popup.classList.add('visible');

            const isHighScore = this.saveScore();
            setTimeout(() => this.showResults(isHighScore), 2500);
        } else {
            const popup = document.getElementById('victory-popup');
            popup.querySelector('.victory-title').textContent = "2nd Place";
            popup.querySelector('.victory-title').style.color = "#bdc3c7";
            popup.querySelector('.trophy').textContent = "🥈";

            document.getElementById('final-wpm').textContent = this.wpm;
            const timeSeconds = ((Date.now() - this.startTime) / 1000).toFixed(1);
            document.getElementById('final-time').textContent = timeSeconds;

            popup.classList.add('visible');
            setTimeout(() => this.end(), 2500);
        }
    }
}

export function createGame(container, config) {
    return new TypeRacerGame(container, config);
}
