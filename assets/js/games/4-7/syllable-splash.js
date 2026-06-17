/* assets/js/games/4-7/syllable-splash.js
   Syllable Splash - Ages 4-7

   TTS says a word, player taps the pool with the correct syllable count.
   Pool/splash water theme with 8 rounds.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SYLLABLE_DATA = [
  // 1-syllable words
  { word: 'Cat', syllables: 1, emoji: '🐱' },
  { word: 'Dog', syllables: 1, emoji: '🐕' },
  { word: 'Sun', syllables: 1, emoji: '☀️' },
  { word: 'Ball', syllables: 1, emoji: '⚽' },
  { word: 'Fish', syllables: 1, emoji: '🐟' },
  { word: 'Frog', syllables: 1, emoji: '🐸' },
  { word: 'Star', syllables: 1, emoji: '⭐' },
  { word: 'Moon', syllables: 1, emoji: '🌙' },
  { word: 'Bird', syllables: 1, emoji: '🐦' },
  { word: 'Tree', syllables: 1, emoji: '🌳' },
  // 2-syllable words
  { word: 'Baby', syllables: 2, emoji: '👶' },
  { word: 'Rabbit', syllables: 2, emoji: '🐰' },
  { word: 'Apple', syllables: 2, emoji: '🍎' },
  { word: 'Banana', syllables: 3, emoji: '🍌' },
  { word: 'Table', syllables: 2, emoji: '🪑' },
  { word: 'Candy', syllables: 2, emoji: '🍬' },
  { word: 'Water', syllables: 2, emoji: '💧' },
  { word: 'Flower', syllables: 2, emoji: '🌸' },
  { word: 'Happy', syllables: 2, emoji: '😊' },
  { word: 'Puppy', syllables: 2, emoji: '🐶' },
  // 3-syllable words
  { word: 'Elephant', syllables: 3, emoji: '🐘' },
  { word: 'Butterfly', syllables: 3, emoji: '🦋' },
  { word: 'Umbrella', syllables: 3, emoji: '☂️' },
  { word: 'Chocolate', syllables: 3, emoji: '🍫' },
  { word: 'Dinosaur', syllables: 3, emoji: '🦕' },
  { word: 'Strawberry', syllables: 3, emoji: '🍓' },
  { word: 'Alligator', syllables: 3, emoji: '🐊' },
  { word: 'Crocodile', syllables: 3, emoji: '🐊' },
];

class SyllableSplashGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentWord = null;
    this.round = 0;
    this.maxRounds = 8;
    this.locked = false;
    this.poolOptions = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="ss-game">
        <div class="ss-panel">
          <div class="ss-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Syllable Splash</div>
              <div class="subtitle">Count the splashes in each word!</div>
            </div>
            <div class="round-pill" id="round-pill">Round 1 / ${this.maxRounds}</div>
          </div>

          <div class="splash-scene">
            <div class="clouds" id="clouds">☁️ ☁️ ☁️</div>
            <div class="word-card" id="word-card">
              <div class="word-emoji" id="word-emoji">🐱</div>
              <div class="listen-hint" id="listen-hint">Tap speaker to listen!</div>
              <button class="speaker-btn" id="speaker-btn" aria-label="Listen to word">🔊</button>
            </div>
            <div class="pools-container" id="pools-container">
              <div class="pool" data-syllables="1">
                <div class="pool-water"></div>
                <div class="pool-num">1</div>
                <div class="pool-label">Splash</div>
              </div>
              <div class="pool" data-syllables="2">
                <div class="pool-water"></div>
                <div class="pool-num">2</div>
                <div class="pool-label">Splashes</div>
              </div>
              <div class="pool" data-syllables="3">
                <div class="pool-water"></div>
                <div class="pool-num">3</div>
                <div class="pool-label">Splashes</div>
              </div>
            </div>
            <div class="ripples">
              <div class="ripple">💧</div>
              <div class="ripple">💧</div>
              <div class="ripple">💧</div>
            </div>
          </div>

          <div class="helper" id="helper-text">Tap the speaker, then splash in the pool!</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ss-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(to bottom,#87CEEB 0%,#E0F7FA 60%,#4FC3F7 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}
      .ss-panel{width:min(780px,96%);background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.25);border-radius:34px;box-shadow:0 24px 60px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:16px}
      .ss-topbar{display:flex;align-items:center;gap:12px}.pill,.round-pill{border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;text-shadow:0 2px 8px rgba(0,0,0,.2)}.subtitle{font-size:14px;color:#1565C0}.round-pill{background:#1565C0;padding:12px 16px}
      .splash-scene{position:relative;text-align:center;min-height:380px;overflow:hidden}.clouds{font-size:28px;position:absolute;top:10px;left:0;right:0;opacity:.6;animation:cloudDrift 8s ease-in-out infinite}@keyframes cloudDrift{0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}
      .word-card{background:rgba(255,255,255,.95);border-radius:26px;padding:18px 24px;display:inline-flex;align-items:center;gap:16px;color:#2d3436;margin:20px 0;box-shadow:0 8px 24px rgba(0,0,0,.1)}.word-emoji{font-size:56px}.listen-hint{font-size:16px;color:#7f8c8d}.speaker-btn{font-size:36px;background:#4FC3F7;border:none;border-radius:50%;width:64px;height:64px;cursor:pointer;transition:transform .15s,background .15s;box-shadow:0 4px 12px rgba(0,0,0,.15)}.speaker-btn:hover{background:#29B6F6;transform:scale(1.08)}.speaker-btn:active{transform:scale(0.95)}.speaker-btn.playing{animation:pulse 0.5s ease infinite}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
      .pools-container{display:flex;justify-content:center;gap:24px;margin-top:16px}.pool{width:140px;height:160px;position:relative;cursor:pointer;transition:transform .2s}.pool:hover{transform:scale(1.05)}.pool:active{transform:scale(0.97)}.pool-water{position:absolute;bottom:30px;left:0;right:0;height:100px;background:linear-gradient(to bottom,#29B6F6,#0288D1);border-radius:0 0 50% 50%;border:4px solid #0277BD;border-top:none;transition:background .3s,box-shadow .3s}.pool-num{font-size:48px;position:relative;z-index:2;color:#fff;text-shadow:0 3px 6px rgba(0,0,0,.3)}.pool-label{font-size:16px;position:relative;z-index:2;color:#E1F5FE;margin-top:-8px}
      .pool.correct .pool-water{background:linear-gradient(to bottom,#66BB6A,#43A047);border-color:#2E7D32;box-shadow:0 0 30px rgba(76,175,80,.6)}.pool.correct::after{content:'✓';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:60px;color:#fff;text-shadow:0 3px 8px rgba(0,0,0,.3);z-index:10}
      .pool.wrong .pool-water{background:linear-gradient(to bottom,#EF5350,#E53935);border-color:#C62828;box-shadow:0 0 20px rgba(244,67,54,.5)}.pool.dim{opacity:.5}
      .ripples{position:absolute;bottom:20px;left:0;right:0;pointer-events:none;font-size:24px;display:flex;justify-content:center;gap:60px}.ripple{opacity:0;animation:rippleAnim 2s ease-out infinite}.ripple:nth-child(2){animation-delay:.4s}.ripple:nth-child(3){animation-delay:.8s}@keyframes rippleAnim{0%{opacity:0;transform:translateY(0) scale(1)}20%{opacity:.7}100%{opacity:0;transform:translateY(-40px) scale(1.4)}}
      .helper{background:rgba(255,255,255,.2);border-radius:18px;padding:14px 16px;text-align:center;font-size:22px;color:#0D47A1}
      @media (max-width:720px){.pools-container{gap:12px}.pool{width:100px;height:130px}.pool-num{font-size:36px}.pool-water{height:70px}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.round = 0;
    this.locked = false;
    this.updateRound();
    this.nextRound();
    document.getElementById('speaker-btn').onclick = () => this.playWord();
  }

  playWord() {
    if (this.locked) return;
    const btn = document.getElementById('speaker-btn');
    btn.classList.add('playing');
    this.speak(this.currentWord.word, { rate: 0.85 });
    setTimeout(() => btn.classList.remove('playing'), 800);
  }

  nextRound() {
    if (this.round >= this.maxRounds) return this.endGame();
    this.locked = false;
    this.round++;

    // Pick a random word
    this.currentWord = SYLLABLE_DATA[Math.floor(Math.random() * SYLLABLE_DATA.length)];

    // Update UI
    document.getElementById('round-pill').textContent = `Round ${this.round} / ${this.maxRounds}`;
    document.getElementById('word-emoji').textContent = this.currentWord.emoji;
    document.getElementById('helper-text').textContent = 'Tap the speaker, then splash in the pool!';
    document.getElementById('listen-hint').textContent = 'Tap speaker to listen!';

    // Reset pool states
    const pools = this.container.querySelectorAll('.pool');
    pools.forEach(pool => {
      pool.classList.remove('correct', 'wrong', 'dim');
    });

    // Set up pool click handlers
    pools.forEach(pool => {
      pool.onclick = () => this.checkAnswer(pool, parseInt(pool.dataset.syllables));
    });
  }

  checkAnswer(pool, syllables) {
    if (this.locked) return;
    this.locked = true;

    const correct = syllables === this.currentWord.syllables;
    const pools = [...this.container.querySelectorAll('.pool')];

    if (correct) {
      pool.classList.add('correct');
      pools.filter(p => p !== pool).forEach(p => p.classList.add('dim'));
      this.incrementCombo();
      this.addScore(100 + (this.combo * 10));
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `Great! "${this.currentWord.word}" has ${this.currentWord.syllables} ${this.currentWord.syllables === 1 ? 'splash' : 'splashes'}!`;
      this.confetti.explode(null, null, 12);
      this.celebrateMove({ burst: '💦', duration: 800 });
    } else {
      pool.classList.add('wrong');
      pools.filter(p => p !== pool).forEach(p => p.classList.add('dim'));
      this.resetCombo();
      const correctPool = pools.find(p => parseInt(p.dataset.syllables) === this.currentWord.syllables);
      if (correctPool) correctPool.classList.add('correct');
      document.getElementById('helper-text').textContent = `"${this.currentWord.word}" has ${this.currentWord.syllables} ${this.currentWord.syllables === 1 ? 'splash' : 'splashes'}!`;
      this.coachMove(`"${this.currentWord.word}" has ${this.currentWord.syllables} syllables.`, 1200);
    }

    setTimeout(() => this.nextRound(), 1500);
  }

  updateRound() {
    document.getElementById('round-pill').textContent = `Round ${Math.min(this.round + 1, this.maxRounds)} / ${this.maxRounds}`;
  }

  endGame() {
    this.locked = true;
    document.getElementById('helper-text').textContent = 'Splendid splashing! You counted all the syllables!';
    this.confetti.explode(null, null, 40);
    this.celebrateMove({ burst: '🎉', duration: 1200 });
    setTimeout(() => this.showResults(this.saveScore()), 1800);
  }
}

export function createGame(container, config) {
  return new SyllableSplashGame(container, config);
}