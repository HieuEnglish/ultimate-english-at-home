/* assets/js/games/0-3/action-beats.js
   Action Beats - Ages 0-3
   
   Baby DJ console theme.
   Press large colorful buttons to hear a "beat" loop and see a character perform an action (Clap, Jump, Wave).
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const ACTIONS = [
  { verb: "Clap", emoji: "👏", color: "#fdcb6e", sound: "clap" },
  { verb: "Jump", emoji: "🏃", color: "#6c5ce7", sound: "jump" },
  { verb: "Wave", emoji: "👋", color: "#ff7675", sound: "wave" },
  { verb: "Spin", emoji: "🌪️", color: "#00cec9", sound: "spin" },
  { verb: "Sleep", emoji: "😴", color: "#636e72", sound: "snore" },
  { verb: "Dance", emoji: "💃", color: "#e84393", sound: "music" },
  { verb: "Stomp", emoji: "🦶", color: "#d63031", sound: "stomp" },
  { verb: "Stretch", emoji: "🙆", color: "#00b894", sound: "stretch" },
  { verb: "Shake", emoji: "🫨", color: "#e17055", sound: "shake" },
  { verb: "Wiggle", emoji: "🪱", color: "#74b9ff", sound: "wiggle" },
  { verb: "March", emoji: "🚶", color: "#a29bfe", sound: "march" },
  { verb: "Fly", emoji: "🦅", color: "#55efc4", sound: "fly" },
  { verb: "Swim", emoji: "🏊", color: "#0984e3", sound: "swim" },
  { verb: "Crawl", emoji: "🐛", color: "#b8e994", sound: "crawl" },
  { verb: "Hug", emoji: "🤗", color: "#fd79a8", sound: "hug" },
  { verb: "Kick", emoji: "🦵", color: "#e55039", sound: "kick" },
  { verb: "Blow", emoji: "🌬️", color: "#82ccdd", sound: "blow" },
  { verb: "Sing", emoji: "🎤", color: "#f8c291", sound: "sing" },
  { verb: "Peek", emoji: "🙈", color: "#b71540", sound: "peek" },
  { verb: "Tickle", emoji: "🤭", color: "#78e08f", sound: "tickle" },
  { verb: "Run", emoji: "🏃‍♂️", color: "#3c6382", sound: "run" },
  { verb: "Hop", emoji: "🐸", color: "#38ada9", sound: "hop" },
  { verb: "Roll", emoji: "🔄", color: "#fa983a", sound: "roll" },
  { verb: "Nod", emoji: "😊", color: "#4a69bd", sound: "nod" },
];

class ActionBeatsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.beatActive = false;
    this.currentAction = null;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper dj-theme">
        <div class="disco-lights">
           <div class="light l1"></div>
           <div class="light l2"></div>
           <div class="light l3"></div>
        </div>
        
        <div class="dance-floor">
           <div class="dj-character" id="dj-char">🦊</div>
           <div class="speech-bubble" id="char-speech">Ready to dance!</div>
        </div>
        
        <div class="dj-deck">
           <div class="deck-surface">
              <div class="speaker left">🔊</div>
              
              <div class="buttons-grid" id="action-buttons">
                 <!-- Generated buttons -->
              </div>
              
              <div class="speaker right">🔊</div>
           </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.renderButtons();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .game-wrapper {
        width: 100%; height: 500px;
        background: #2d3436;
        border-radius: 20px;
        position: relative; overflow: hidden;
        display: flex; flex-direction: column;
        user-select: none;
      }
      
      .disco-lights {
        position: absolute; top: 0; left: 0; right: 0; height: 100px;
        display: flex; justify-content: space-around;
        z-index: 5;
      }
      .light {
        width: 60px; height: 150px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.8), transparent);
        transform-origin: top center;
        opacity: 0.5;
        animation: swingLight 3s ease-in-out infinite alternate;
      }
      .l1 { background: linear-gradient(to bottom, rgba(255,107,107,0.8), transparent); animation-delay: 0s; }
      .l2 { background: linear-gradient(to bottom, rgba(85,239,196,0.8), transparent); animation-delay: 1s; }
      .l3 { background: linear-gradient(to bottom, rgba(162,155,254,0.8), transparent); animation-delay: 2s; }
      
      @keyframes swingLight { from { transform: rotate(-20deg); } to { transform: rotate(20deg); } }
      
      .dance-floor {
        flex: 1;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        background: radial-gradient(circle, #636e72 10%, #2d3436 80%);
      }
      
      .dj-character {
        font-size: 100px;
        transition: transform 0.2s;
        filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
      }
      
      /* Action Animations */
      .action-clap { animation: clap 0.5s infinite; }
      .action-jump { animation: jump 0.6s infinite; }
      .action-wave { animation: wave 1s infinite; }
      .action-spin { animation: spin 1s infinite linear; }
      .action-sleep { animation: sleep 2s infinite ease-in-out; opacity: 0.7; }
      .action-dance { animation: dance 0.8s infinite; }
      .action-stomp { animation: stomp 0.5s infinite; }
      .action-stretch { animation: stretch 1.2s infinite ease-in-out; }
      .action-shake { animation: actionShake 0.4s infinite; }
      .action-wiggle { animation: wiggle 0.6s infinite; }
      .action-march { animation: march 0.8s infinite; }
      .action-fly { animation: actionFly 1s infinite ease-in-out; }
      
      @keyframes clap { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
      @keyframes jump { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-50px); } }
      @keyframes wave { 0% { transform: rotate(0); } 25% { transform: rotate(-20deg); } 75% { transform: rotate(20deg); } 100% { transform: rotate(0); } }
      @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      @keyframes sleep { 0%,100% { transform: scale(1) rotate(5deg); } 50% { transform: scale(0.95) rotate(-5deg); } }
      @keyframes dance { 0% { transform: skewX(0); } 25% { transform: skewX(-10deg); } 75% { transform: skewX(10deg); } 100% { transform: skewX(0); } }
      @keyframes stomp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px) scale(1.1); } }
      @keyframes stretch { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.3); } }
      @keyframes actionShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-15px); } 75% { transform: translateX(15px); } }
      @keyframes wiggle { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }
      @keyframes march { 0%, 100% { transform: translateY(0) rotate(0); } 25% { transform: translateY(-10px) rotate(-5deg); } 75% { transform: translateY(-10px) rotate(5deg); } }
      @keyframes actionFly { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-40px) scale(1.1); } }
      
      .speech-bubble {
        background: white; color: black; padding: 10px 20px; border-radius: 20px;
        font-weight: bold; font-family: 'Comic Sans MS', cursive;
        margin-top: 10px; opacity: 0; transition: opacity 0.3s;
      }
      .speech-bubble.visible { opacity: 1; }
      
      .dj-deck {
        height: 200px;
        background: #dfe6e9;
        border-top: 5px solid #b2bec3;
        padding: 15px;
        box-shadow: 0 -10px 30px rgba(0,0,0,0.3);
      }
      .deck-surface {
        background: #2d3436;
        height: 100%;
        border-radius: 12px;
        padding: 15px;
        display: flex; align-items: center; justify-content: space-between;
        border: 2px solid #636e72;
      }
      
      .speaker { font-size: 40px; }
      .speaker.pump { animation: pump 0.4s infinite; }
      @keyframes pump { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
      
      .buttons-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        max-width: 400px; width: 100%;
      }
      
      .beat-btn {
        aspect-ratio: 1.5;
        border: none; border-radius: 12px;
        font-size: 24px; font-weight: bold; color: white;
        cursor: pointer;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        box-shadow: 0 5px 0 rgba(0,0,0,0.3);
        transition: transform 0.1s, box-shadow 0.1s;
      }
      .beat-btn:active { transform: translateY(5px); box-shadow: none; }
      .beat-btn span { font-size: 32px; display: block; margin-bottom: 5px; }
      
      .beat-btn.active {
        box-shadow: 0 0 20px white;
        z-index: 10;
        animation: glow 0.5s infinite alternate;
      }
      @keyframes glow { from { filter: brightness(1); } to { filter: brightness(1.3); } }
    `;
    this.container.appendChild(style);
  }

  renderButtons() {
    const grid = document.getElementById('action-buttons');
    grid.innerHTML = ACTIONS.map(action => `
            <button class="beat-btn" style="background: ${action.color}" data-verb="${action.verb}">
               <span>${action.emoji}</span>
               ${action.verb}
            </button>
        `).join('');

    grid.querySelectorAll('.beat-btn').forEach(btn => {
      btn.onclick = () => this.triggerAction(btn, btn.dataset.verb);
    });
  }

  triggerAction(btn, verb) {
    // Reset old
    this.container.querySelectorAll('.beat-btn').forEach(b => b.classList.remove('active'));
    const char = document.getElementById('dj-char');
    char.className = 'dj-character'; // reset anims
    void char.offsetWidth; // trigger reflow

    // Set new
    btn.classList.add('active');
    const actionData = ACTIONS.find(a => a.verb === verb);

    // Animate Char
    char.classList.add(`action-${verb.toLowerCase()}`);

    // Show Speech
    const bubble = document.getElementById('char-speech');
    bubble.textContent = `${verb}!`;
    bubble.classList.add('visible');

    // Speakers pump
    this.container.querySelectorAll('.speaker').forEach(s => s.classList.add('pump'));

    // Speak
    this.speak(verb);
    this.incrementCombo();
    this.celebrateMove({ burst: verb.toUpperCase(), duration: 700 });

    // Timeout to "stop" the music visually after a bit (or keep it going!)
    // For 0-3, instant reaction is best. Let it loop for 3s then stop.
    if (this.currentTimer) clearTimeout(this.currentTimer);
    this.currentTimer = setTimeout(() => {
      this.stopAction();
    }, 3000);
  }

  stopAction() {
    this.container.querySelectorAll('.beat-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('dj-char').className = 'dj-character';
    document.getElementById('char-speech').classList.remove('visible');
    this.container.querySelectorAll('.speaker').forEach(s => s.classList.remove('pump'));
  }
}

export function createGame(container, config) {
  return new ActionBeatsGame(container, config);
}
