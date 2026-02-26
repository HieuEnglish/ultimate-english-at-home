/* assets/js/games/13-18/debate-cards.js
   Debate Cards - Ages 13-18
   
   MODERN VERSION - Strategy game to build debate arguments!
   Sort logical cards into "For" and "Against" decks against time.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const TOPICS = [
    {
        topic: "Social media does more harm than good.",
        cards: [
            { text: "Connects friends globally", side: "against" },
            { text: "Causes cyberbullying", side: "for" },
            { text: "Spreads fake news", side: "for" },
            { text: "Educational resources", side: "against" },
            { text: "Addictive algorithms", side: "for" },
            { text: "Platform for voices", side: "against" },
        ]
    },
    {
        topic: "Homework should be banned.",
        cards: [
            { text: "Reinforces learning", side: "against" },
            { text: "Causes stress", side: "for" },
            { text: "Limits free time", side: "for" },
            { text: "Teaches discipline", side: "against" },
            { text: "Inequitable support", side: "for" },
            { text: "Parent involvement", side: "against" },
        ]
    },
    {
        topic: "Uniforms should be mandatory.",
        cards: [
            { text: "Reduces bullying", side: "for" },
            { text: "Limits self-expression", side: "against" },
            { text: "Saves morning time", side: "for" },
            { text: "Costly for parents", side: "against" },
            { text: "School concentration", side: "for" },
            { text: "Discomfort", side: "against" },
        ]
    },
    {
        topic: "AI will replace most jobs.",
        cards: [
            { text: "Increases productivity", side: "for" },
            { text: "Creates new job types", side: "against" },
            { text: "Reduces human error", side: "for" },
            { text: "Lacks creativity", side: "against" },
            { text: "Cheaper labor costs", side: "for" },
            { text: "Needs human oversight", side: "against" },
        ]
    },
    {
        topic: "Video games are harmful for teenagers.",
        cards: [
            { text: "Promotes sedentary lifestyle", side: "for" },
            { text: "Improves problem-solving", side: "against" },
            { text: "Can cause addiction", side: "for" },
            { text: "Builds teamwork online", side: "against" },
            { text: "Increases aggression", side: "for" },
            { text: "Encourages strategic thinking", side: "against" },
        ]
    }
];

class DebateCardsGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 60 });
        this.currentTopic = null;
        this.deck = [];
        this.score = 0;
        this.streak = 0;
        this.cardsSorted = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="debate-game">
        <div class="debate-bg"></div>
        
        <div class="debate-stage">
          <!-- Header -->
          <div class="debate-header">
            <span class="topic-label">DEBATE TOPIC</span>
            <div class="topic-text" id="topic-text">Loading...</div>
          </div>
          
          <!-- Game Area -->
          <div class="card-arena">
            <!-- Left Drop Zone (FOR) -->
            <div class="drop-zone for-zone" id="for-zone">
              <div class="zone-label">FOR</div>
              <div class="zone-icon">✅</div>
              <div class="zone-desc">Agrees with topic</div>
            </div>
            
            <!-- Center Card Stack -->
            <div class="card-stack" id="card-stack">
              <div class="card active-card" id="active-card">
                <div class="card-content">Start</div>
              </div>
            </div>
            
            <!-- Right Drop Zone (AGAINST) -->
            <div class="drop-zone against-zone" id="against-zone">
              <div class="zone-label">AGAINST</div>
              <div class="zone-icon">❌</div>
              <div class="zone-desc">Disagrees with topic</div>
            </div>
          </div>
          
          <!-- Controls (for non-drag) -->
          <div class="debate-controls">
            <button class="control-btn for-btn" id="btn-for">👈 FOR</button>
            <button class="control-btn against-btn" id="btn-against">AGAINST 👉</button>
          </div>
          
          <!-- HUD -->
          <div class="debate-hud">
            <div class="hud-item item-score">Score: <span id="score-val">0</span></div>
            <div class="hud-item item-timer">Time: <span id="time-val">60</span>s</div>
            <div class="hud-item item-streak">Streak: <span id="streak-val">0</span>🔥</div>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .debate-game {
        position: relative;
        width: 100%;
        min-height: 580px;
        overflow: hidden;
        border-radius: 20px;
        background: #2c3e50;
        font-family: 'Helvetica Neue', Arial, sans-serif;
      }
      
      .debate-bg {
        position: absolute;
        inset: 0;
        opacity: 0.1;
        background-image: radial-gradient(#bdc3c7 1px, transparent 1px);
        background-size: 20px 20px;
      }
      
      .debate-stage {
        position: relative;
        z-index: 10;
        padding: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .debate-header {
        background: white;
        padding: 15px 30px;
        border-radius: 12px;
        text-align: center;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        max-width: 80%;
      }
      .topic-label { font-size: 12px; font-weight: 800; color: #7f8c8d; letter-spacing: 1px; }
      .topic-text { font-size: 20px; font-weight: bold; color: #2c3e50; margin-top: 5px; }
      
      .card-arena {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
        flex-grow: 1;
      }
      
      .drop-zone {
        width: 120px;
        height: 200px;
        border: 3px dashed rgba(255,255,255,0.3);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        transition: all 0.3s;
      }
      .for-zone.highlight { background: rgba(46, 204, 113, 0.2); border-color: #2ecc71; transform: scale(1.05); }
      .against-zone.highlight { background: rgba(231, 76, 60, 0.2); border-color: #e74c3c; transform: scale(1.05); }
      
      .zone-label { font-weight: 900; font-size: 18px; margin-bottom: 10px; }
      .zone-icon { font-size: 40px; margin-bottom: 10px; }
      .zone-desc { font-size: 11px; text-align: center; opacity: 0.7; }
      
      .card-stack {
        position: relative;
        width: 200px;
        height: 280px;
      }
      
      .card {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: #34495e;
        position: absolute;
        top: 0;
        left: 0;
        transition: transform 0.3s, opacity 0.3s;
        cursor: grab;
      }
      .card:active { cursor: grabbing; }
      
      .card.fly-left { transform: translateX(-300px) rotate(-20deg) !important; opacity: 0; }
      .card.fly-right { transform: translateX(300px) rotate(20deg) !important; opacity: 0; }
      
      .debate-controls {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }
      .control-btn {
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        transition: transform 0.2s;
        color: white;
      }
      .control-btn:hover { transform: translateY(-2px); }
      .for-btn { background: #2ecc71; box-shadow: 0 4px 0 #27ae60; }
      .against-btn { background: #e74c3c; box-shadow: 0 4px 0 #c0392b; }
      
      .debate-hud {
        display: flex;
        gap: 30px;
        background: rgba(0,0,0,0.4);
        padding: 10px 30px;
        border-radius: 50px;
        color: white;
        font-weight: bold;
      }
      #score-val { color: #f1c40f; }
      #time-val { color: #3498db; }
      #streak-val { color: #e67e22; }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.streak = 0;
        this.cardsSorted = 0;
        this.loadNextTopic();
    }

    loadNextTopic() {
        const topicData = TOPICS[Math.floor(Math.random() * TOPICS.length)];
        this.currentTopic = topicData;
        document.getElementById('topic-text').textContent = topicData.topic;

        // Create deck
        this.deck = [...topicData.cards].sort(() => Math.random() - 0.5);
        this.showNextCard();
        this.setupInteractions();
    }

    showNextCard() {
        if (this.deck.length === 0) {
            // Topic complete, get bonus and next topic
            this.addScore(200);
            this.confetti.explode();
            setTimeout(() => this.loadNextTopic(), 800);
            return;
        }

        const cardData = this.deck[0]; // Peek at top card
        const cardEl = document.getElementById('active-card');

        // Reset card position
        cardEl.style.transform = 'translate(0, 0) rotate(0deg)';
        cardEl.className = 'card active-card';
        cardEl.querySelector('.card-content').textContent = cardData.text;
    }

    handleSort(direction) { // direction: 'for' or 'against'
        if (this.deck.length === 0) return;

        const currentCard = this.deck.shift();
        const isCorrect = currentCard.side === direction;
        const cardEl = document.getElementById('active-card');

        // Animation class
        if (direction === 'for') {
            cardEl.classList.add('fly-left');
        } else {
            cardEl.classList.add('fly-right');
        }

        // Scoring
        if (isCorrect) {
            this.streak++;
            this.cardsSorted++;
            this.addScore(50 + (this.streak * 10));
            this.highlightZone(direction === 'for' ? 'for-zone' : 'against-zone', 'correct');
        } else {
            this.streak = 0;
            Animations.shake(this.container);
            this.highlightZone(direction === 'for' ? 'for-zone' : 'against-zone', 'wrong');
        }

        this.updateHUD();

        // Show next card after animation
        setTimeout(() => this.showNextCard(), 300);
    }

    highlightZone(zoneId, type) { // type ignored for now, visual polish
        const zone = document.getElementById(zoneId);
        zone.classList.add('highlight');
        setTimeout(() => zone.classList.remove('highlight'), 300);
    }

    setupInteractions() {
        document.getElementById('btn-for').onclick = () => this.handleSort('for');
        document.getElementById('btn-against').onclick = () => this.handleSort('against');

        // Mouse Drag Logic (Simplified for this version)
        // Could track mouse position to rotate card visually
    }

    updateHUD() {
        document.getElementById('score-val').textContent = this.score;
        document.getElementById('streak-val').textContent = this.streak;
    }

    onTimerTick(remaining) {
        document.getElementById('time-val').textContent = remaining;
        if (remaining <= 10) document.getElementById('time-val').style.color = '#e74c3c';
    }

    end() {
        super.end();
    }
}

export function createGame(container, config) {
    return new DebateCardsGame(container, config);
}
