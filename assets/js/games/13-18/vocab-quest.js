/* assets/js/games/13-18/vocab-quest.js
   Vocab Quest - Ages 13-18
   
   MODERN VERSION - RPG-style vocabulary game!
   Defeat monsters by answering vocabulary questions.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const VOCAB = [
  { word: "ephemeral", meaning: "lasting for a very short time", wrong: ["permanent", "solid", "eternal"] },
  { word: "ubiquitous", meaning: "present everywhere", wrong: ["rare", "scarce", "hidden"] },
  { word: "eloquent", meaning: "fluent and persuasive", wrong: ["silent", "awkward", "mumbling"] },
  { word: "pragmatic", meaning: "dealing with things sensibly", wrong: ["idealistic", "dreamy", "impractical"] },
  { word: "resilient", meaning: "able to recover quickly", wrong: ["fragile", "weak", "breakable"] },
  { word: "meticulous", meaning: "showing great attention to detail", wrong: ["careless", "sloppy", "messy"] },
  { word: "ambiguous", meaning: "open to more than one interpretation", wrong: ["clear", "obvious", "definite"] },
  { word: "tenacious", meaning: "holding firmly to something", wrong: ["weak", "quitting", "giving up"] },
  { word: "prolific", meaning: "producing much work or results", wrong: ["unproductive", "idle", "lazy"] },
  { word: "candid", meaning: "truthful and straightforward", wrong: ["deceptive", "dishonest", "secretive"] },
  { word: "benevolent", meaning: "well-meaning and kindly", wrong: ["malicious", "cruel", "harmful"] },
  { word: "diligent", meaning: "having careful and persistent effort", wrong: ["lazy", "careless", "negligent"] },
  { word: "arduous", meaning: "involving great effort and difficulty", wrong: ["simple", "effortless", "trivial"] },
  { word: "sycophant", meaning: "a person who flatters to gain advantage", wrong: ["critic", "rebel", "opponent"] },
  { word: "pernicious", meaning: "having a harmful effect gradually", wrong: ["helpful", "beneficial", "healing"] },
  { word: "ostentatious", meaning: "designed to impress or attract attention", wrong: ["modest", "humble", "simple"] },
  { word: "juxtapose", meaning: "place close together for contrasting effect", wrong: ["separate", "isolate", "divide"] },
  { word: "cacophony", meaning: "a harsh mixture of sounds", wrong: ["harmony", "melody", "silence"] },
  { word: "ameliorate", meaning: "to make something bad better", wrong: ["worsen", "damage", "destroy"] },
  { word: "conundrum", meaning: "a confusing and difficult problem", wrong: ["solution", "answer", "clarity"] },
  { word: "debilitate", meaning: "to make someone very weak", wrong: ["strengthen", "empower", "energize"] },
  { word: "exacerbate", meaning: "to make a problem worse", wrong: ["improve", "fix", "resolve"] },
  { word: "fastidious", meaning: "very attentive to accuracy and detail", wrong: ["careless", "indifferent", "casual"] },
  { word: "gregarious", meaning: "fond of company and sociable", wrong: ["shy", "reclusive", "introverted"] },
  { word: "hypothetical", meaning: "based on an imagined situation", wrong: ["factual", "proven", "real"] },
  { word: "impetuous", meaning: "acting quickly without thought", wrong: ["cautious", "deliberate", "careful"] },
  { word: "loquacious", meaning: "tending to talk a great deal", wrong: ["quiet", "reserved", "taciturn"] },
  { word: "nefarious", meaning: "wicked or criminal in nature", wrong: ["virtuous", "noble", "righteous"] },
  { word: "paradigm", meaning: "a typical example or pattern", wrong: ["anomaly", "exception", "deviation"] },
  { word: "quintessential", meaning: "representing the most perfect example", wrong: ["atypical", "unusual", "imperfect"] },
  { word: "recalcitrant", meaning: "stubbornly uncooperative", wrong: ["obedient", "compliant", "agreeable"] },
  { word: "superfluous", meaning: "unnecessary or more than enough", wrong: ["essential", "necessary", "vital"] },
  { word: "voracious", meaning: "wanting great quantities of something", wrong: ["moderate", "restrained", "satisfied"] },
  { word: "vindicate", meaning: "to clear someone of blame", wrong: ["accuse", "condemn", "blame"] },
  { word: "zealous", meaning: "having great energy or enthusiasm", wrong: ["apathetic", "indifferent", "passive"] },
];

const MONSTERS = [
  { name: "Vocab Slime", emoji: "👾", hp: 3, color: "#a55eea" },
  { name: "Grammar Goblin", emoji: "👺", hp: 4, color: "#00b894" },
  { name: "Word Wraith", emoji: "👻", hp: 4, color: "#74b9ff" },
  { name: "Syntax Spider", emoji: "🕷️", hp: 5, color: "#ff7675" },
  { name: "Meaning Monster", emoji: "🐉", hp: 6, color: "#fdcb6e" },
  { name: "Prefix Phoenix", emoji: "🔥", hp: 5, color: "#e17055" },
  { name: "Suffix Serpent", emoji: "🐍", hp: 4, color: "#00cec9" },
  { name: "Etymology Elemental", emoji: "⚡", hp: 7, color: "#6c5ce7" },
];

class VocabQuestGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentMonster = null;
    this.monsterHP = 0;
    this.currentQuestion = null;
    this.monstersDefeated = 0;
    this.playerHP = 5;
  }

  async init() {
    this.container.innerHTML = `
      <div class="quest-game">
        <div class="quest-bg">
          <div class="particles" id="particles"></div>
        </div>
        
        <div class="quest-stage">
          <!-- Player stats -->
          <div class="player-bar">
            <div class="player-avatar">🧙</div>
            <div class="player-stats">
              <div class="stat-row">
                <span class="stat-label">HP</span>
                <div class="hp-bar">
                  <div class="hp-fill" id="player-hp-fill" style="width: 100%"></div>
                </div>
                <span id="player-hp-text">5/5</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">⭐</span>
                <span class="score-text" id="score-text">0</span>
              </div>
            </div>
          </div>
          
          <!-- Battle area -->
          <div class="battle-area">
            <div class="monster-zone">
              <div class="monster-name" id="monster-name">Loading...</div>
              <div class="monster-char" id="monster-char">👾</div>
              <div class="monster-hp-bar">
                <div class="monster-hp-fill" id="monster-hp-fill" style="width: 100%"></div>
              </div>
            </div>
          </div>
          
          <!-- Word question -->
          <div class="word-card" id="word-card">
            <div class="word-prompt">What does this word mean?</div>
            <div class="word-word" id="word-word">ephemeral</div>
          </div>
          
          <!-- Answer options -->
          <div class="answer-grid" id="answer-grid"></div>
          
          <!-- Battle effects -->
          <div class="battle-effect" id="battle-effect"></div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.setupParticles();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .quest-game {
        position: relative;
        width: 100%;
        min-height: 560px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(180deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%);
      }
      
      .quest-bg { position: absolute; inset: 0; overflow: hidden; }
      .bg-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        animation: floatParticle 10s linear infinite;
      }
      @keyframes floatParticle {
        0% { transform: translateY(100vh); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
      }
      
      .quest-stage {
        position: relative;
        padding: 16px;
        max-width: 460px;
        margin: 0 auto;
      }
      
      /* Player bar */
      .player-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: rgba(0,0,0,0.3);
        border-radius: 16px;
        margin-bottom: 16px;
      }
      .player-avatar {
        font-size: 40px;
        animation: avatarIdle 2s ease infinite;
      }
      @keyframes avatarIdle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      .player-stats { flex: 1; }
      .stat-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }
      .stat-label { font-size: 12px; color: rgba(255,255,255,0.7); width: 24px; }
      .hp-bar {
        flex: 1;
        height: 12px;
        background: rgba(255,255,255,0.2);
        border-radius: 6px;
        overflow: hidden;
      }
      .hp-fill {
        height: 100%;
        background: linear-gradient(90deg, #ff7675, #d63031);
        border-radius: 6px;
        transition: width 0.5s ease;
      }
      #player-hp-text { font-size: 12px; color: white; font-weight: 700; }
      .score-text { font-size: 18px; color: #feca57; font-weight: 800; }
      
      /* Battle area */
      .battle-area {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }
      .monster-zone {
        text-align: center;
      }
      .monster-name {
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        font-weight: 700;
        margin-bottom: 4px;
      }
      .monster-char {
        font-size: 80px;
        animation: monsterBounce 1s ease infinite;
        filter: drop-shadow(0 10px 30px rgba(0,0,0,0.5));
      }
      @keyframes monsterBounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-15px) scale(1.05); }
      }
      .monster-char.hit {
        animation: monsterHit 0.3s ease !important;
      }
      @keyframes monsterHit {
        0%, 100% { transform: translateX(0); filter: brightness(1); }
        25% { transform: translateX(-15px); filter: brightness(2); }
        75% { transform: translateX(15px); filter: brightness(1.5); }
      }
      .monster-char.defeated {
        animation: monsterDefeat 0.8s ease forwards !important;
      }
      @keyframes monsterDefeat {
        0% { transform: scale(1) rotate(0); opacity: 1; }
        50% { transform: scale(1.3) rotate(20deg); }
        100% { transform: scale(0) rotate(-180deg); opacity: 0; }
      }
      .monster-hp-bar {
        width: 120px;
        height: 8px;
        background: rgba(255,255,255,0.2);
        border-radius: 4px;
        margin: 8px auto 0;
        overflow: hidden;
      }
      .monster-hp-fill {
        height: 100%;
        background: linear-gradient(90deg, #55efc4, #00b894);
        border-radius: 4px;
        transition: width 0.3s ease;
      }
      
      /* Word card */
      .word-card {
        padding: 20px;
        background: rgba(255,255,255,0.95);
        border-radius: 16px;
        text-align: center;
        margin-bottom: 16px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
      }
      .word-prompt {
        font-size: 14px;
        color: #636e72;
        margin-bottom: 8px;
      }
      .word-word {
        font-size: 28px;
        font-weight: 900;
        color: #2d3436;
        animation: wordPulse 2s ease infinite;
      }
      @keyframes wordPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      /* Answer grid */
      .answer-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .answer-btn {
        padding: 14px 12px;
        background: rgba(255,255,255,0.9);
        border: 3px solid transparent;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 600;
        color: #2d3436;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }
      .answer-btn:hover {
        transform: translateY(-3px);
        border-color: #6c5ce7;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      }
      .answer-btn.correct {
        background: linear-gradient(135deg, #55efc4, #00b894);
        color: white;
        border-color: #00b894;
        animation: correctPop 0.4s ease;
      }
      .answer-btn.wrong {
        background: linear-gradient(135deg, #ff7675, #d63031);
        color: white;
        border-color: #d63031;
        animation: wrongShake 0.4s ease;
      }
      @keyframes correctPop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes wrongShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
      }
      
      /* Battle effects */
      .battle-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        font-size: 48px;
        opacity: 0;
      }
      .battle-effect.attack {
        animation: attackEffect 0.6s ease-out;
      }
      @keyframes attackEffect {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        40% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
      }
    `;
    this.container.appendChild(style);
  }

  setupParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${8 + Math.random() * 6}s`;
      container.appendChild(particle);
    }
  }

  start() {
    super.start();
    this.playerHP = 5;
    this.monstersDefeated = 0;
    this.score = 0;
    this.spawnMonster();
  }

  spawnMonster() {
    const monster = MONSTERS[Math.min(this.monstersDefeated, MONSTERS.length - 1)];
    this.currentMonster = { ...monster };
    this.monsterHP = monster.hp;

    document.getElementById('monster-name').textContent = monster.name;
    document.getElementById('monster-char').textContent = monster.emoji;
    document.getElementById('monster-char').classList.remove('hit', 'defeated');
    document.getElementById('monster-char').style.animation = 'monsterBounce 1s ease infinite';
    this.updateMonsterHP();

    this.nextQuestion();
  }

  nextQuestion() {
    const shuffled = this.shuffleWithBagFirst(VOCAB, 'vocabulary');
    const vocab = shuffled[0];

    this.currentQuestion = vocab;

    const options = [vocab.meaning, ...vocab.wrong].sort(() => Math.random() - 0.5);

    document.getElementById('word-word').textContent = vocab.word;

    const grid = document.getElementById('answer-grid');
    grid.innerHTML = options.map(opt =>
      `<button class="answer-btn" data-answer="${opt}">${opt}</button>`
    ).join('');

    grid.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => this.checkAnswer(btn, btn.dataset.answer));
    });

    this.updatePlayerStats();
  }

  checkAnswer(btn, answer) {
    const isCorrect = answer === this.currentQuestion.meaning;

    document.querySelectorAll('.answer-btn').forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
      btn.classList.add('correct');
      this.incrementCombo();
      this.addScore(50);
      this.celebrateMove({ burst: this.currentQuestion.word.toUpperCase(), duration: 700 });

      // Damage monster
      this.monsterHP--;
      this.updateMonsterHP();

      const monsterEl = document.getElementById('monster-char');
      monsterEl.classList.add('hit');
      this.showBattleEffect('⚔️');

      setTimeout(() => monsterEl.classList.remove('hit'), 300);

      if (this.monsterHP <= 0) {
        // Monster defeated
        this.monstersDefeated++;
        this.addScore(100);
        monsterEl.classList.add('defeated');

        if (this.combo >= 3) this.confetti.explode(null, null, 40);

        setTimeout(() => {
          if (this.monstersDefeated >= MONSTERS.length) {
            this.end(); // Victory!
          } else {
            this.spawnMonster();
          }
        }, 1000);
      } else {
        setTimeout(() => this.nextQuestion(), 600);
      }
    } else {
      btn.classList.add('wrong');
      this.resetCombo();
      this.coachMove();

      // Player takes damage
      this.playerHP--;
      this.updatePlayerStats();
      this.showBattleEffect('💔');

      if (this.playerHP <= 0) {
        setTimeout(() => this.end(), 800);
      } else {
        setTimeout(() => this.nextQuestion(), 800);
      }
    }
  }

  updateMonsterHP() {
    const pct = (this.monsterHP / this.currentMonster.hp) * 100;
    document.getElementById('monster-hp-fill').style.width = `${pct}%`;
  }

  updatePlayerStats() {
    const pct = (this.playerHP / 5) * 100;
    document.getElementById('player-hp-fill').style.width = `${pct}%`;
    document.getElementById('player-hp-text').textContent = `${this.playerHP}/5`;
    document.getElementById('score-text').textContent = this.score;
  }

  showBattleEffect(emoji) {
    const effect = document.getElementById('battle-effect');
    effect.textContent = emoji;
    effect.classList.remove('attack');
    void effect.offsetWidth;
    effect.classList.add('attack');
  }

  end() {
    this.isRunning = false;
    this.endTime = Date.now();

    if (this.monstersDefeated >= MONSTERS.length) {
      this.addScore(500); // Victory bonus
    }

    const isHighScore = this.saveScore();
    this.showResults(isHighScore);
  }
}

export function createGame(container, config) {
  return new VocabQuestGame(container, config);
}
