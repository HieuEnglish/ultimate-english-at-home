/* assets/js/games/11-12/tense-race.js
   Tense Race - Ages 11-12
   
   Cyberpunk racing game. Type the converted sentence correctly to boost speed!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const CHALLENGES = [
  { base: "I run fast", tense: "Past Simple", answer: "I ran fast" },
  { base: "She eats an apple", tense: "Present Continuous", answer: "She is eating an apple" },
  { base: "They play soccer", tense: "Future Simple", answer: "They will play soccer" },
  { base: "We study hard", tense: "Present Perfect", answer: "We have studied hard" },
  { base: "He writes a letter", tense: "Past Continuous", answer: "He was writing a letter" },
  { base: "The bird flies high", tense: "Past Simple", answer: "The bird flew high" },
  { base: "I sleep early", tense: "Future (going to)", answer: "I am going to sleep early" },
  { base: "You drink water", tense: "Past Perfect", answer: "You had drunk water" }
];

class TenseRaceGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 90 });
    this.distance = 0;
    this.speed = 0;
    this.maxSpeed = 200;
    this.opponentDist = 0;
    this.opponentSpeed = 50; // Constant speed
    this.currentChallenge = null;
  }

  async init() {
    this.container.innerHTML = `
            <div class="game-wrapper race-theme">
                <div class="skyline-bg"></div>
                <div class="track-perspective">
                     <div class="road">
                        <div class="lane-marker"></div>
                     </div>
                </div>
                
                <div class="hud-top">
                    <div class="race-bar">
                        <div class="racer-icon player-icon" id="prog-player">🏎️</div>
                        <div class="racer-icon opp-icon" id="prog-opp">🚙</div>
                    </div>
                </div>

                <div class="dashboard">
                    <div class="task-panel">
                        <div class="task-label">MISSION: CONVERT TENSE</div>
                        <div class="base-text" id="base-text">...</div>
                        <div class="target-badge" id="target-badge">...</div>
                    </div>
                    
                    <div class="input-panel">
                        <input type="text" id="race-input" class="cyber-input" placeholder="Initiate sequence..." autocomplete="off">
                        <div class="speedometer"><span id="speed-val">0</span> KM/H</div>
                    </div>
                </div>
                
                <div class="scene-objects">
                    <div class="car player-car" id="player-car">🏎️</div>
                    <div class="car opp-car" id="opp-car">🚙</div>
                </div>

                <div class="start-overlay" id="start-overlay">
                    <div class="cyber-title">NEON RACER</div>
                    <button class="start-btn" id="start-btn">IGNITE ENGINE</button>
                </div>
            </div>
        `;

    this.injectStyles();
    document.getElementById('start-btn').onclick = () => this.startRace();

    const input = document.getElementById('race-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.checkAnswer();
    });
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
            .game-wrapper {
                width: 100%; height: 600px;
                background: #000;
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'Rajdhani', sans-serif;
                color: #0ff;
            }
            .skyline-bg {
                position: absolute; top: 0; width: 100%; height: 50%;
                background: linear-gradient(#1e0030, #000);
                z-index: 0;
            }
            /* Grid floor */
            .track-perspective {
                position: absolute; top: 50%; width: 100%; height: 50%;
                perspective: 600px;
                overflow: hidden;
                background: #050510;
            }
            .road {
                position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                transform: rotateX(60deg);
                background: repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 40px,
                    rgba(0, 255, 255, 0.2) 41px,
                    rgba(0, 255, 255, 0.2) 42px
                ),
                linear-gradient(90deg, #050510 0%, #101030 50%, #050510 100%);
                animation: scrollRoad 1s linear infinite;
            }
            @keyframes scrollRoad { from { background-position: 0 0; } to { background-position: 0 84px; } }
            
            .hud-top {
                position: absolute; top: 20px; left: 20px; right: 20px;
                height: 40px; background: rgba(0,0,0,0.5);
                border: 1px solid #0ff; border-radius: 20px;
                padding: 5px;
            }
            .race-bar { position: relative; width: 100%; height: 100%; }
            .racer-icon { position: absolute; font-size: 24px; transition: left 0.5s; top: -5px; }
            .player-icon { z-index: 2; filter: drop-shadow(0 0 5px #0ff); }
            .opp-icon { filter: grayscale(1); opacity: 0.7; }
            
            .dashboard {
                position: absolute; bottom: 0; width: 100%; height: 200px;
                background: rgba(0, 10, 20, 0.9);
                border-top: 2px solid #0ff;
                display: flex; flex-direction: column; align-items: center; padding: 20px;
                box-shadow: 0 -10px 20px #0ff5;
                z-index: 20;
            }
            
            .task-panel { text-align: center; margin-bottom: 20px; }
            .task-label { font-size: 14px; letter-spacing: 2px; color: #f0f; text-shadow: 0 0 5px #f0f; margin-bottom: 5px; }
            .base-text { font-size: 28px; font-weight: bold; margin-bottom: 5px; color: white; }
            .target-badge { 
                background: #f0f; color: black; padding: 2px 10px; font-weight: bold; 
                display: inline-block; transform: skew(-10deg);
            }
            
            .input-panel { display: flex; gap: 20px; align-items: center; width: 80%; }
            .cyber-input {
                flex: 1; padding: 15px; background: rgba(0,0,0,0.5); border: 2px solid #0ff;
                color: #0ff; font-family: inherit; font-size: 20px; outline: none;
                box-shadow: 0 0 10px #0ff;
            }
            .cyber-input:focus { background: black; box-shadow: 0 0 20px #0ff; }
            .speedometer { font-size: 24px; font-weight: bold; width: 120px; text-align: right; }
            
            .scene-objects {
                position: absolute; bottom: 220px; left: 0; width: 100%; height: 100px;
                pointer-events: none;
            }
            .car {
                position: absolute; bottom: 0; font-size: 60px;
                transform: translateX(-50%);
                transition: left 0.5s, bottom 0.5s, transform 0.5s;
            }
            
            .start-overlay {
                position: absolute; inset: 0; background: rgba(0,0,0,0.9);
                display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 50;
            }
            .cyber-title {
                font-size: 60px; color: #0ff; font-weight: 900;
                text-shadow: 4px 4px 0 #f0f; margin-bottom: 30px;
                font-family: 'Courier New', monospace;
            }
            .start-btn {
                padding: 20px 50px; background: transparent; border: 2px solid #f0f;
                color: #f0f; font-size: 24px; font-weight: bold; cursor: pointer;
                box-shadow: 0 0 20px #f0f; transition: all 0.2s;
            }
            .start-btn:hover { background: #f0f; color: black; }
        `;
    // Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    this.container.appendChild(style);
  }

  startRace() {
    document.getElementById('start-overlay').style.display = 'none';
    super.start();
    this.distance = 0;
    this.opponentDist = 0;
    this.nextChallenge();
    this.gameLoop();
    document.getElementById('race-input').focus();
  }

  gameLoop() {
    // Update physics
    // Boost decays
    if (this.speed > 0) this.speed *= 0.98;

    // Opponent visual logic (simplified)
    // If player is faster, opp car moves back. If slower, moves forward?
    // Let's model relative distance.

    this.distance += this.speed * 0.01;
    this.opponentDist += this.opponentSpeed * 0.01;

    const relative = (this.opponentDist - this.distance); // +ve means opp is ahead

    // Visual positioning
    const playerCar = document.getElementById('player-car');
    const oppCar = document.getElementById('opp-car');

    // Player is always centered visually? Or fixed lane?
    playerCar.style.left = '30%';
    playerCar.style.zIndex = 10;

    // Opponent position based on relative distance
    // Distance unit: meters. 100m = screen width?
    // Let's say if relative is 0, they are side by side (opp at 70%)
    // If relative is 50, opp is far ahead (fade out / smaller)
    // If relative is -50, opp is far behind

    // Simple 2D projection
    let oppVisualLeft = 70; // %
    let oppScale = 1;
    let oppBottom = 0;

    if (Math.abs(relative) < 200) {
      // Visible range
      oppCar.style.display = 'block';
      // Perspective effect
      // Ahead: moves up and smaller
      // Behind: moves down? No, just keep simple.

      // Side-scroller logic inside 3D scene?
      // Let's stick to simple "Passing" visual

      // If relative > 0 (opp ahead), it should be further up the road?
      // But our road is into screen.
      // We can use scale and bottom.

      const perspectiveFactor = 1 / (1 + (relative * 0.05));
      // If relative is large positive, factor is small -> car small + higher up
      // If relative is negative (we are ahead), car is behind us -> effectively invisible or very large/offscreen?

      if (relative > 0) {
        // Ahead
        oppCar.style.bottom = (relative * 2) + 'px';
        oppCar.style.transform = `translateX(-50%) scale(${Math.max(0.1, 1 - relative * 0.01)})`;
        oppCar.style.opacity = 1;
      } else {
        // Behind (Drag race style)
        // Just fade it out
        oppCar.style.bottom = '0px';
        oppCar.style.transform = `translateX(-50%) scale(1)`;
        oppCar.style.opacity = Math.max(0, 1 + relative * 0.05);
      }

    } else {
      oppCar.style.display = 'none';
    }

    // Update HUD progress bar
    const totalRace = 500; // Finish line
    document.getElementById('prog-player').style.left = Math.min(100, (this.distance / totalRace) * 100) + '%';
    document.getElementById('prog-opp').style.left = Math.min(100, (this.opponentDist / totalRace) * 100) + '%';

    document.getElementById('speed-val').textContent = Math.floor(this.speed);

    if (this.distance >= totalRace || this.opponentDist >= totalRace) {
      this.finishRace();
    } else {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  nextChallenge() {
    const data = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    this.currentChallenge = data;

    document.getElementById('base-text').textContent = data.base;
    document.getElementById('target-badge').textContent = data.tense;
    document.getElementById('race-input').value = "";
  }

  checkAnswer() {
    const input = document.getElementById('race-input');
    const val = input.value.trim();

    // Normalize (ignore case, punctuation logic optional)
    // Let's be strict but case-insensitive
    const correct = this.currentChallenge.answer;

    if (val.toLowerCase() === correct.toLowerCase()) {
      // Correct - Boost!
      this.speed = Math.min(this.speed + 80, this.maxSpeed);
      this.playSound('success');

      // Visual feedback
      const feedback = document.createElement('div');
      feedback.textContent = "TURBO BOOST!";
      feedback.style.cssText = "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#0ff; font-size:40px; font-weight:bold; text-shadow:0 0 10px #0ff; animation: fadeUp 1s forwards;";
      this.container.appendChild(feedback);
      setTimeout(() => feedback.remove(), 1000);

      this.addScore(100);
      this.nextChallenge();
    } else {
      // Wrong - Stall
      this.speed = Math.max(0, this.speed - 30);
      this.playSound('error');
      input.classList.add('shake');
      setTimeout(() => input.classList.remove('shake'), 500);
    }
  }

  finishRace() {
    const pWin = this.distance > this.opponentDist;
    this.end();

    if (pWin) {
      this.showResults(this.saveScore() + 500); // Bonus
    } else {
      this.showResults(this.saveScore());
    }
  }
}

export function createGame(container, config) {
  return new TenseRaceGame(container, config);
}
