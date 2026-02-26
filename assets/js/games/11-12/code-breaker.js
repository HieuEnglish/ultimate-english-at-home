/* assets/js/games/11-12/code-breaker.js
   Code Breaker - Ages 11-12
   
   Decipher the secret message by fixing grammar or filling missing letters.
   Theme: Hacker / Secret Agent terminal.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const CODES = [
  { text: "The_cat_sat_on_the_mat", answer: "The cat sat on the mat", hint: "Missing spaces" },
  { text: "She [go/goes] to school every day", answer: "goes", hint: "Subject-Verb Agreement" },
  { text: "Th_y ar_ h_ppy", answer: "They are happy", hint: "Vowels missing (e, a)" },
  { text: "I have [see/seen] that movie", answer: "seen", hint: "Past Participle" },
  { text: "He is [taller/tallest] than me", answer: "taller", hint: "Comparative" },
  { text: "Wh_re is the lib_ary?", answer: "Where is the library?", hint: "Spelling fix" },
  { text: "We [was/were] playing football", answer: "were", hint: "Past Plural" },
  { text: "She_can_run_very_fast", answer: "She can run very fast", hint: "Missing spaces" },
  { text: "He [don't/doesn't] like homework", answer: "doesn't", hint: "Negative Agreement" },
  { text: "B_tter l_te th_n n_ver", answer: "Better late than never", hint: "Vowels missing (e, a)" },
  { text: "They [is/are] going home", answer: "are", hint: "Subject-Verb Agreement" },
  { text: "She has [ate/eaten] lunch already", answer: "eaten", hint: "Past Participle" },
  { text: "This is the [more good/best] day ever", answer: "best", hint: "Superlative" },
  { text: "N_body kn_ws the _nswer", answer: "Nobody knows the answer", hint: "Vowels missing (o, o, a)" },
];

class CodeBreakerGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 120 });
    this.currentCode = null;
    this.rounds = 0;
    this.score = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper hacker-theme">
        <canvas id="matrix-bg"></canvas>
        
        <div class="terminal-window">
           <div class="terminal-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="title">SECURE_TERMINAL // AGENT_ACCESS</span>
           </div>
           <div class="terminal-body">
              <div class="console-log" id="console-log">
                 > Initializing decryption module...<br>
                 > Connection established.<br>
                 > Awaiting input...
              </div>
              
              <div class="code-display">
                 <div class="label">INTERCEPTED MESSAGE:</div>
                 <div class="cipher-text" id="cipher-text">LOADING...</div>
              </div>
              
              <div class="input-area">
                 <span class="prompt">></span>
                 <input type="text" id="decoder-input" class="cmd-input" placeholder="Enter solution..." autocomplete="off">
                 <button id="decrypt-btn" class="cmd-btn">DECRYPT</button>
              </div>
              
              <div class="hint-box" id="hint-box">SYSTEM HINT: </div>
           </div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.startMatrixRain();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .game-wrapper {
        width: 100%; height: 500px;
        background: #000;
        border-radius: 10px;
        position: relative; overflow: hidden;
        font-family: 'Courier New', monospace;
      }
      
      #matrix-bg { position: absolute; inset: 0; opacity: 0.3; }
      
      .terminal-window {
        position: relative; z-index: 10;
        width: 90%; margin: 40px auto;
        background: rgba(10, 20, 10, 0.95);
        border: 1px solid #33ff00;
        box-shadow: 0 0 20px rgba(51, 255, 0, 0.2);
        border-radius: 8px;
        overflow: hidden;
        display: flex; flex-direction: column;
        height: 400px;
      }
      
      .terminal-header {
        background: #1a1a1a;
        padding: 8px 15px;
        border-bottom: 1px solid #333;
        display: flex; align-items: center; gap: 8px;
      }
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .red { background: #ff5f5f; } .yellow { background: #ffcc00; } .green { background: #00cc00; }
      .title { margin-left: auto; color: #666; font-size: 12px; letter-spacing: 1px; }

      .terminal-body {
        padding: 20px;
        color: #33ff00;
        flex: 1; display: flex; flex-direction: column; gap: 20px;
      }
      
      .console-log {
        font-size: 12px; opacity: 0.7; height: 60px; overflow: hidden;
      }
      
      .code-display {
        background: rgba(0, 50, 0, 0.5);
        padding: 20px;
        border: 1px dashed #33ff00;
        text-align: center;
      }
      .label { font-size: 10px; color: #008800; margin-bottom: 5px; }
      .cipher-text { font-size: 24px; font-weight: bold; letter-spacing: 2px; text-shadow: 0 0 10px #33ff00; }
      
      .input-area {
        display: flex; gap: 10px; align-items: center;
        background: #000; padding: 10px; border: 1px solid #336633;
      }
      .prompt { font-weight: bold; }
      .cmd-input {
        flex: 1; background: transparent; border: none; color: #fff; font-family: inherit; font-size: 16px; outline: none;
      }
      .cmd-btn {
        background: #33ff00; color: #000; border: none; padding: 5px 15px; font-weight: bold; cursor: pointer;
        font-family: inherit;
      }
      .cmd-btn:hover { background: #ccffcc; }
      
      .hint-box { font-size: 12px; color: #008800; margin-top: auto; }
      
      /* Glitch effect class */
      .glitch { animation: glitch 0.2s linear infinite; color: red; }
      @keyframes glitch { 0% { transform: translate(2px,0); } 50% { transform: translate(-2px,0); } 100% { transform: translate(0,0); } }
    `;
    this.container.appendChild(style);
  }

  startMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = this.container.clientWidth;
    canvas.height = this.container.clientHeight;

    const chars = "10";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      if (this.isRunning) requestAnimationFrame(draw);
    };
    draw();
  }

  start() {
    super.start();
    this.rounds = 0;
    this.questionQueue = this.shuffleArray([...CODES]);
    this.nextRound();

    const input = document.getElementById('decoder-input');
    input.focus();
    input.onkeydown = (e) => { if (e.key === 'Enter') this.checkAnswer(); };
    document.getElementById('decrypt-btn').onclick = () => this.checkAnswer();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextRound() {
    if (this.rounds >= 5 || this.questionQueue.length === 0) {
      this.end();
      return;
    }

    this.rounds++;
    this.currentCode = this.questionQueue.pop();

    document.getElementById('cipher-text').textContent = this.currentCode.text;
    document.getElementById('hint-box').textContent = `SYSTEM HINT: ${this.currentCode.hint}`;
    const input = document.getElementById('decoder-input');
    input.value = "";
    input.focus();

    this.log(`Intercepted signal #${this.rounds}... Analysing structure...`);
  }

  checkAnswer() {
    const input = document.getElementById('decoder-input');
    const val = input.value.trim();

    if (val.toLowerCase() === this.currentCode.answer.toLowerCase()) {
      this.log("Decryption successful. Access granted.");
      this.addScore(200);

      document.getElementById('cipher-text').style.color = "#fff"; // Flash white
      input.disabled = true; // Prevent double submit

      setTimeout(() => {
        document.getElementById('cipher-text').style.color = "#33ff00";
        input.disabled = false;
        this.nextRound();
      }, 1000);
    } else {
      this.log("ERROR: Decryption failed. Invalid syntax.");
      this.container.querySelector('.terminal-window').classList.add('glitch');
      setTimeout(() => this.container.querySelector('.terminal-window').classList.remove('glitch'), 500);
      input.value = "";
      input.focus();
    }
  }

  log(msg) {
    const log = document.getElementById('console-log');
    log.innerHTML += `> ${msg}<br>`;
    log.scrollTop = log.scrollHeight;
  }

  end() {
    this.isRunning = false;
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new CodeBreakerGame(container, config);
}
