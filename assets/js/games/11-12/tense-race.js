/* assets/js/games/11-12/tense-race.js
   Tense Race - Ages 11-12

   Senior pass:
   - Reworked into dependable tense-conversion racing rounds
   - Better boost logic, cleaner win/lose handling, and stronger grammar focus
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const CHALLENGES = [
  { base: 'I run fast', tense: 'Past Simple', answer: 'I ran fast' },
  { base: 'She eats an apple', tense: 'Present Continuous', answer: 'She is eating an apple' },
  { base: 'They play soccer', tense: 'Future Simple', answer: 'They will play soccer' },
  { base: 'We study hard', tense: 'Present Perfect', answer: 'We have studied hard' },
  { base: 'He writes a letter', tense: 'Past Continuous', answer: 'He was writing a letter' },
  { base: 'I sleep early', tense: 'Future (going to)', answer: 'I am going to sleep early' },
  { base: 'You drink water', tense: 'Past Perfect', answer: 'You had drunk water' },
  { base: 'She sings a song', tense: 'Past Simple', answer: 'She sang a song' },
];

class TenseRaceGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 90 });
    this.distance = 0;
    this.opponentDist = 0;
    this.currentChallenge = null;
    this.loopId = null;
    this.finished = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="trace-game">
        <div class="trace-panel">
          <div class="trace-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Tense Race</div>
              <div class="subtitle">Convert the sentence to the target tense.</div>
            </div>
            <div class="pill">⏱️ <span id="timer-val">1:30</span></div>
          </div>

          <div class="race-bar">
            <div class="racer player" id="prog-player">🏎️</div>
            <div class="racer opp" id="prog-opp">🚙</div>
          </div>

          <div class="task-panel">
            <div class="base-text" id="base-text">I run fast</div>
            <div class="target-badge" id="target-badge">Past Simple</div>
          </div>

          <div class="input-panel">
            <input type="text" id="race-input" class="cyber-input" placeholder="Type the transformed sentence..." autocomplete="off">
            <button id="check-btn" class="check-btn">BOOST</button>
          </div>

          <div class="helper" id="helper-text">Correct answers push your car forward.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .trace-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#1e0030 0%,#000 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#0ff}.trace-panel{width:min(820px,96%);background:rgba(0,10,20,.88);border-radius:34px;border:2px solid #0ff;box-shadow:0 0 20px rgba(0,255,255,.15);padding:22px;display:flex;flex-direction:column;gap:18px}.trace-topbar{display:flex;align-items:center;gap:12px}.pill{background:#08151d;color:#8efcff;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px}.subtitle{font-size:14px;color:#8cc8d1}
      .race-bar{position:relative;height:54px;background:rgba(255,255,255,.06);border-radius:999px;overflow:hidden}.racer{position:absolute;top:10px;font-size:32px;transition:left .35s ease}.player{left:0}.opp{left:0;opacity:.75}
      .task-panel{background:rgba(255,255,255,.08);border-radius:22px;padding:18px;text-align:center}.base-text{font-size:30px;color:#fff}.target-badge{display:inline-block;margin-top:10px;background:#f0f;color:#000;padding:8px 14px;border-radius:999px;font-weight:800}
      .input-panel{display:flex;gap:12px}.cyber-input{flex:1;padding:16px;background:rgba(0,0,0,.5);border:2px solid #0ff;color:#fff;font-size:20px;border-radius:14px;outline:none}.check-btn{padding:16px 20px;border:none;border-radius:14px;background:#0ff;color:#000;font-weight:800;cursor:pointer}
      .helper{background:rgba(255,255,255,.08);border-radius:18px;padding:14px 16px;text-align:center;font-size:20px;color:#d9ffff}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.distance = 0;
    this.opponentDist = 0;
    this.finished = false;
    document.getElementById('check-btn').onclick = () => this.checkAnswer();
    document.getElementById('race-input').onkeydown = (e) => { if (e.key === 'Enter') this.checkAnswer(); };
    this.nextChallenge();
    this.animateRace();
  }

  animateRace() {
    if (this.finished) return;
    this.opponentDist = Math.min(100, this.opponentDist + 0.35);
    document.getElementById('prog-player').style.left = `${this.distance}%`;
    document.getElementById('prog-opp').style.left = `${this.opponentDist}%`;
    if (this.opponentDist >= 100 && this.distance < 100) return this.finishRace(false);
    this.loopId = requestAnimationFrame(() => this.animateRace());
  }

  nextChallenge() {
    this.currentChallenge = this.pickFromBag(CHALLENGES, 'challenges');
    document.getElementById('base-text').textContent = this.currentChallenge.base;
    document.getElementById('target-badge').textContent = this.currentChallenge.tense;
    document.getElementById('race-input').value = '';
    document.getElementById('race-input').focus();
  }

  checkAnswer() {
    if (this.finished) return;
    const input = document.getElementById('race-input');
    const val = input.value.trim();
    if (!val) return;

    if (val.toLowerCase() === this.currentChallenge.answer.toLowerCase()) {
      this.distance = Math.min(100, this.distance + 18);
      this.addScore(140);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = 'Boost! Correct tense conversion.';
      this.celebrateMove({ burst: 'BOOST', duration: 900 });
      if (this.distance >= 100) return this.finishRace(true);
      this.nextChallenge();
      return;
    }

    this.distance = Math.max(0, this.distance - 4);
    document.getElementById('helper-text').textContent = `Incorrect. Target answer: ${this.currentChallenge.answer}`;
    this.coachMove('The tense conversion is not correct yet.', 1000);
    input.select();
  }

  finishRace(won) {
    this.finished = true;
    cancelAnimationFrame(this.loopId);
    if (won) {
      this.addScore(250);
      document.getElementById('score-val').textContent = this.score;
      this.celebrateMove({ burst: 'WIN', duration: 1100 });
    } else {
      this.coachMove('The rival crossed the finish line first.', 1200);
    }
    setTimeout(() => this.showResults(this.saveScore()), 900);
  }

  onTimerTick(remaining) {
    document.getElementById('timer-val').textContent = this.formatTime(remaining);
    super.onTimerTick(remaining);
  }
}

export function createGame(container, config) {
  return new TenseRaceGame(container, config);
}
