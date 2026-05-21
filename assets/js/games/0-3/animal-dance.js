/* assets/js/games/0-3/animal-dance.js
   Animal Dance - Ages 0-3

   Senior pass:
   - Keeps freeform fun, but adds a guided "make this animal dance" loop
   - Better spotlighting, progression, and stronger party payoff
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

class AnimalDanceGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.animals = [
      { id: 'dog', emoji: '🐶', name: 'Dog', dance: 'bounce' },
      { id: 'cat', emoji: '🐱', name: 'Cat', dance: 'spin' },
      { id: 'cow', emoji: '🐮', name: 'Cow', dance: 'wobble' },
      { id: 'duck', emoji: '🦆', name: 'Duck', dance: 'jump' },
      { id: 'pig', emoji: '🐷', name: 'Pig', dance: 'shake' },
      { id: 'lion', emoji: '🦁', name: 'Lion', dance: 'pulse' },
      { id: 'frog', emoji: '🐸', name: 'Frog', dance: 'bounce' },
      { id: 'bear', emoji: '🐻', name: 'Bear', dance: 'stomp' },
    ];
    this.targetAnimal = null;
    this.rounds = 0;
    this.maxRounds = 8;
    this.locked = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="ad-game">
        <div class="ad-panel">
          <div class="ad-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Animal Dance Party</div>
              <div class="progress" id="progress-text">Round 1 of ${this.maxRounds}</div>
            </div>
            <button class="party-btn" id="party-btn">🎉 Party</button>
          </div>

          <div class="spotlight-card">
            <div class="spotlight-emoji" id="spotlight-emoji">🐶</div>
            <div>
              <div class="spotlight-title">Make this animal dance</div>
              <div class="spotlight-text" id="spotlight-text">Tap Dog!</div>
              <div class="helper" id="helper-text">Then watch the silly move.</div>
            </div>
          </div>

          <div class="dance-floor" id="dance-floor"></div>

          <div class="footer-row">
            <button class="stop-btn" id="stop-btn">🛑 Stop all</button>
            <button class="hear-btn" id="hear-btn">🔊 Say it</button>
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
      .ad-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(135deg,#FF9A8B 0%,#FF6A88 55%,#FF99AC 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .ad-panel{width:min(840px,96%);background:rgba(255,255,255,.18);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.18);border-radius:32px;box-shadow:0 22px 50px rgba(0,0,0,.2);padding:22px;display:flex;flex-direction:column;gap:18px}
      .ad-topbar,.footer-row{display:flex;align-items:center;gap:12px}.pill,.party-btn,.stop-btn,.hear-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#fff}.progress{font-size:14px;color:#fff7f9}.party-btn,.stop-btn,.hear-btn{cursor:pointer;padding:12px 18px;color:#fff;box-shadow:0 5px 0 rgba(0,0,0,.16)}.party-btn{background:#fee440;color:#333}.stop-btn{background:#636e72}.hear-btn{background:#74b9ff}
      .spotlight-card{background:rgba(255,255,255,.92);border-radius:26px;padding:18px;display:flex;align-items:center;gap:18px}.spotlight-emoji{font-size:78px;min-width:88px;text-align:center}.spotlight-title{font-size:18px;color:#ff5f7a;text-transform:uppercase}.spotlight-text{font-size:34px;color:#2d3436}.helper{font-size:18px;color:#596275;margin-top:6px}
      .dance-floor{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.animal-card{background:rgba(255,255,255,.92);border-radius:24px;padding:14px;font-size:48px;cursor:pointer;box-shadow:0 8px 0 rgba(0,0,0,.08);display:flex;flex-direction:column;align-items:center;gap:6px;border:4px solid transparent;transition:transform .12s,border-color .2s}.animal-card:active{transform:translateY(5px);box-shadow:0 3px 0 rgba(0,0,0,.08)}.animal-card.target{border-color:#fee440}.animal-card.success{border-color:#4cd137;background:#edfff0}.animal-name{font-size:18px;color:#555}
      @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-24px)}}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes wobble{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}@keyframes jump{0%,100%{transform:scale(1)}50%{transform:scale(1.22)}}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}@keyframes stomp{0%,100%{transform:translateY(0)}50%{transform:translateY(10px) scale(1.08)}}
      .dancing.bounce .animal-emoji{animation:bounce .6s infinite}.dancing.spin .animal-emoji{animation:spin 1s infinite linear}.dancing.wobble .animal-emoji{animation:wobble .5s infinite}.dancing.jump .animal-emoji{animation:jump .6s infinite}.dancing.shake .animal-emoji{animation:shake .4s infinite}.dancing.pulse .animal-emoji{animation:pulse .7s infinite}.dancing.stomp .animal-emoji{animation:stomp .5s infinite}
      @media (max-width:720px){.dance-floor{grid-template-columns:repeat(2,1fr)}.spotlight-card{flex-direction:column;text-align:center}}
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.locked = false;
    this.renderAnimals();
    document.getElementById('party-btn').onclick = () => this.partyTime();
    document.getElementById('stop-btn').onclick = () => this.stopAll();
    document.getElementById('hear-btn').onclick = () => this.speakPrompt();
    this.nextRound();
  }

  renderAnimals() {
    const floor = document.getElementById('dance-floor');
    floor.innerHTML = this.animals.map((a) => `
      <button class="animal-card" data-id="${a.id}" data-dance="${a.dance}">
        <div class="animal-emoji">${a.emoji}</div>
        <div class="animal-name">${a.name}</div>
      </button>
    `).join('');

    floor.querySelectorAll('.animal-card').forEach((card) => {
      card.onclick = () => this.toggleDance(card);
    });
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) return this.end();
    this.rounds += 1;
    this.locked = false;
    this.stopAll(true);

    this.targetAnimal = this.animals[Math.floor(Math.random() * this.animals.length)];
    document.getElementById('progress-text').textContent = `Round ${this.rounds} of ${this.maxRounds}`;
    document.getElementById('spotlight-emoji').textContent = this.targetAnimal.emoji;
    document.getElementById('spotlight-text').textContent = `Tap ${this.targetAnimal.name}!`;
    document.getElementById('helper-text').textContent = 'Find the animal and make it dance.';

    this.container.querySelectorAll('.animal-card').forEach((card) => {
      card.classList.toggle('target', card.dataset.id === this.targetAnimal.id);
      card.classList.remove('success');
    });

    setTimeout(() => this.speakPrompt(), 500);
  }

  speakPrompt() {
    if (!this.targetAnimal) return;
    this.speak(`${this.targetAnimal.name}, dance!`, { rate: 0.9 });
  }

  toggleDance(card) {
    const animal = this.animals.find((a) => a.id === card.dataset.id);
    if (!animal) return;

    card.classList.add('dancing', animal.dance);
    this.speak(animal.name);

    if (this.locked) return;

    if (animal.id === this.targetAnimal.id) {
      this.locked = true;
      card.classList.add('success');
      this.incrementCombo();
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('helper-text').textContent = `${animal.name} is dancing!`;
      this.confetti.explode(null, null, 22);
      this.celebrateMove({ burst: animal.emoji, duration: 900 });
      setTimeout(() => this.nextRound(), 1400);
      return;
    }

    this.resetCombo();
    this.coachMove(`Nice dancing. Now find ${this.targetAnimal.name}.`, 900);
    document.getElementById('helper-text').textContent = `Good try. Tap ${this.targetAnimal.name}.`;
  }

  partyTime() {
    this.container.querySelectorAll('.animal-card').forEach((card) => {
      card.classList.add('dancing', card.dataset.dance);
    });
    this.speak('Party time!');
    this.confetti.explode();
    this.celebrateMove({ message: 'Party time!', burst: '🎉', duration: 1000 });
  }

  stopAll(silent = false) {
    this.container.querySelectorAll('.animal-card').forEach((card) => {
      card.classList.remove('dancing', 'bounce', 'spin', 'wobble', 'jump', 'shake', 'pulse', 'stomp');
    });
    if (!silent) this.speak('Stop!');
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new AnimalDanceGame(container, config);
}
