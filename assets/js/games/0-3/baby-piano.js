/* assets/js/games/0-3/baby-piano.js
   Baby Piano - Ages 0-3

   Senior pass:
   - Keeps free play, but adds a gentle copy-the-melody goal for progression
   - Better note feedback, visible melody queue, and cleaner particle placement
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

class BabyPianoGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.ctx = null;
    this.inputSequence = [];
    this.targetSequence = [];
    this.sequenceLength = 3;
    this.notes = [
      { note: 'C', freq: 261.63, color: '#FF5252', label: 'Do' },
      { note: 'D', freq: 293.66, color: '#FF9800', label: 'Re' },
      { note: 'E', freq: 329.63, color: '#FFEB3B', label: 'Mi' },
      { note: 'F', freq: 349.23, color: '#4CAF50', label: 'Fa' },
      { note: 'G', freq: 392.0, color: '#2196F3', label: 'Sol' },
      { note: 'A', freq: 440.0, color: '#9C27B0', label: 'La' },
      { note: 'B', freq: 493.88, color: '#E040FB', label: 'Ti' },
      { note: 'C2', freq: 523.25, color: '#FF6B6B', label: 'Do' },
    ];
  }

  async init() {
    this.container.innerHTML = `
      <div class="bpiano-game">
        <div class="bpiano-panel">
          <div class="bpiano-header">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Baby Piano</div>
              <div class="subtitle">Tap keys or press 1-8</div>
            </div>
            <button class="listen-btn" id="listen-btn">🎵 Play melody</button>
          </div>

          <div class="melody-card">
            <div class="melody-title">Copy this little song</div>
            <div class="melody-row" id="melody-row"></div>
            <div class="melody-helper" id="melody-helper">Listen, then tap the same notes.</div>
          </div>

          <div class="piano-container" id="piano-container">
            ${this.notes.map((n, i) => `
              <button class="piano-key" data-index="${i}" style="--key-color:${n.color}">
                <div class="key-light"></div>
                <div class="key-label">${n.label}</div>
                <div class="key-note">${n.note}</div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.showStartOverlay();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .bpiano-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#2d3436 0%,#111 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}
      .bpiano-panel{width:min(920px,98%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:32px;box-shadow:0 24px 60px rgba(0,0,0,.45);padding:22px;display:flex;flex-direction:column;gap:18px}
      .bpiano-header{display:flex;align-items:center;gap:12px}.pill,.listen-btn{border:none;border-radius:999px;font-weight:800}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px}.title-wrap{flex:1;text-align:center}.title{font-size:34px;color:#fff}.subtitle{font-size:14px;color:#b2bec3}.listen-btn{padding:12px 18px;background:linear-gradient(135deg,#6c5ce7,#00cec9);color:#fff;cursor:pointer;box-shadow:0 5px 0 rgba(0,0,0,.25)}
      .melody-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:26px;padding:18px;color:#fff;text-align:center}.melody-title{font-size:24px}.melody-row{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin:14px 0}.melody-chip{width:72px;height:72px;border-radius:20px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;box-shadow:inset 0 -10px 0 rgba(0,0,0,.12);opacity:.4;transition:transform .12s,opacity .2s}.melody-chip.is-active{opacity:1;transform:scale(1.08)}.melody-chip.is-done{outline:4px solid #55efc4;opacity:1}.melody-helper{font-size:18px;color:#dfe6e9}
      .piano-container{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;background:#1a1a1a;border-radius:26px;padding:16px}.piano-key{height:280px;background:#fff;border:none;border-radius:0 0 18px 18px;position:relative;cursor:pointer;box-shadow:inset 0 -12px 0 rgba(0,0,0,.1),0 10px 20px rgba(0,0,0,.2);display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding-bottom:22px;transition:transform .1s,box-shadow .1s}.piano-key:active,.piano-key.active{transform:translateY(8px);box-shadow:inset 0 -4px 0 rgba(0,0,0,.08)}.key-light{position:absolute;top:20px;width:28px;height:28px;border-radius:50%;background:var(--key-color);opacity:.35;box-shadow:0 0 18px var(--key-color)}.key-label{font-size:20px;color:#333}.key-note{font-size:13px;color:#888}
      .music-note-part{position:absolute;font-size:36px;pointer-events:none;animation:noteFloat 1s cubic-bezier(.22,1,.36,1) forwards;z-index:50}.music-note-part.inside{z-index:5}.music-note-part.small{font-size:28px}
      @keyframes noteFloat{0%{transform:translate(-50%,0) scale(.5);opacity:0}20%{opacity:1}100%{transform:translate(calc(-50% + var(--dx)),-110px) rotate(var(--dr));opacity:0}}
      @media (max-width:900px){.piano-container{grid-template-columns:repeat(4,1fr)}.piano-key{height:180px}}
    `;
    this.container.appendChild(style);
  }

  initAudio() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  start() {
    super.start();
    this.score = 0;
    this.inputSequence = [];
    this.bindEvents();
    this.newMelody();
  }

  bindEvents() {
    const keys = this.container.querySelectorAll('.piano-key');

    const playHandler = (index) => {
      this.initAudio();
      const noteData = this.notes[index];
      const keyEl = keys[index];
      this.playNote(noteData.freq);
      this.animateKey(keyEl);
      this.spawnNote(keyEl, noteData.color, true);
      this.trackMelodyInput(index);
    };

    keys.forEach((key, i) => {
      key.onmousedown = (e) => { e.preventDefault(); playHandler(i); };
      key.ontouchstart = (e) => { e.preventDefault(); playHandler(i); };
    });

    this.keyHandler = (e) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 8) playHandler(num - 1);
    };
    document.addEventListener('keydown', this.keyHandler);

    document.getElementById('listen-btn').onclick = () => this.playTargetMelody();
  }

  newMelody() {
    this.inputSequence = [];
    this.targetSequence = Array.from({ length: this.sequenceLength }, () => Math.floor(Math.random() * this.notes.length));
    this.renderMelodyRow();
    document.getElementById('melody-helper').textContent = 'Listen, then tap the same notes.';
    setTimeout(() => this.playTargetMelody(), 500);
  }

  renderMelodyRow() {
    const row = document.getElementById('melody-row');
    row.innerHTML = this.targetSequence.map((noteIndex, idx) => {
      const note = this.notes[noteIndex];
      const done = idx < this.inputSequence.length && this.inputSequence[idx] === noteIndex;
      return `<div class="melody-chip ${done ? 'is-done' : ''}" style="background:${note.color}">${idx + 1}</div>`;
    }).join('');
  }

  async playTargetMelody() {
    this.initAudio();
    const helper = document.getElementById('melody-helper');
    helper.textContent = 'Listen carefully...';
    const chips = [...this.container.querySelectorAll('.melody-chip')];

    for (let i = 0; i < this.targetSequence.length; i += 1) {
      const noteIndex = this.targetSequence[i];
      const note = this.notes[noteIndex];
      chips[i]?.classList.add('is-active');
      this.playNote(note.freq, 0.5);
      if (chips[i]) chips[i].style.opacity = '1';
      await new Promise((resolve) => setTimeout(resolve, 450));
      chips[i]?.classList.remove('is-active');
    }

    helper.textContent = 'Your turn! Tap the same notes.';
  }

  trackMelodyInput(index) {
    if (!this.targetSequence.length) return;
    this.inputSequence.push(index);
    this.renderMelodyRow();

    const step = this.inputSequence.length - 1;
    const expected = this.targetSequence[step];
    if (index !== expected) {
      this.resetCombo();
      document.getElementById('melody-helper').textContent = 'Oops. Let\'s listen again.';
      this.coachMove('Try the little melody again.', 900);
      this.inputSequence = [];
      this.renderMelodyRow();
      setTimeout(() => this.playTargetMelody(), 700);
      return;
    }

    this.showScoreBurst(this.notes[index].note);

    if (this.inputSequence.length === this.targetSequence.length) {
      this.incrementCombo();
      this.addScore(150);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('melody-helper').textContent = 'Mini concert! You copied the melody!';
      this.speak('Wonderful music!');
      this.confetti.explode(null, null, 18);
      this.celebrateMove({ message: 'Mini concert!', burst: '🎵', duration: 900 });
      this.sequenceLength = Math.min(5, this.sequenceLength + (this.combo % 2 === 0 ? 1 : 0));
      setTimeout(() => this.newMelody(), 1200);
    }
  }

  playNote(freq, length = 0.8) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + length);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + length);
  }

  animateKey(key) {
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 150);
  }

  spawnNote(key, color) {
    const note = document.createElement('div');
    note.className = 'music-note-part inside';
    note.textContent = ['🎵', '🎶', '🎼'][Math.floor(Math.random() * 3)];
    note.style.left = '50%';
    note.style.top = '30px';
    note.style.color = color;
    note.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
    note.style.setProperty('--dr', `${(Math.random() - 0.5) * 50}deg`);
    key.appendChild(note);
    setTimeout(() => note.remove(), 1000);
  }

  cleanup() {
    if (this.ctx) this.ctx.close();
    document.removeEventListener('keydown', this.keyHandler);
  }
}

export function createGame(container, config) {
  return new BabyPianoGame(container, config);
}
