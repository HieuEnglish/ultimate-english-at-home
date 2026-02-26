/* assets/js/games/13-18/news-anchor.js
   News Anchor - Ages 13-18
   
   Fill in the blanks of a scrolling news script with formal/professional vocabulary.
   Visuals: TV News Desk, "Live" badge, scrolling teleprompter.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const HEADLINES = [
  {
    headline: "BREAKING: Mayor to ____ new park downtown.",
    options: ["inaugurate", "start", "open"],
    correct: "inaugurate",
    context: "Formal opening ceremony"
  },
  {
    headline: "Economy shows signs of ____ after recession.",
    options: ["recovery", "getting better", "fix"],
    correct: "recovery",
    context: "Financial report"
  },
  {
    headline: "Scientists ____ a major breakthrough in medicine.",
    options: ["announce", "say", "tell"],
    correct: "announce",
    context: "Press release"
  },
  {
    headline: "Police are ____ the incident that occurred last night.",
    options: ["investigating", "looking at", "asking about"],
    correct: "investigating",
    context: "Crime report"
  },
  {
    headline: "The treaty will ____ relations between the two nations.",
    options: ["strengthen", "make strong", "help"],
    correct: "strengthen",
    context: "Diplomatic news"
  },
  {
    headline: "The president will ____ a formal statement this afternoon.",
    options: ["issue", "say", "give out"],
    correct: "issue",
    context: "Government communication"
  },
  {
    headline: "The committee voted to ____ the proposed legislation.",
    options: ["ratify", "agree on", "okay"],
    correct: "ratify",
    context: "Legislative process"
  },
  {
    headline: "Witnesses were asked to ____ at the upcoming trial.",
    options: ["testify", "talk", "speak up"],
    correct: "testify",
    context: "Court proceedings"
  },
  {
    headline: "The charity aims to ____ funds for disaster relief.",
    options: ["allocate", "give out", "share"],
    correct: "allocate",
    context: "Humanitarian report"
  },
  {
    headline: "Experts ____ a sharp rise in global temperatures by 2050.",
    options: ["forecast", "guess", "think about"],
    correct: "forecast",
    context: "Climate report"
  }
];

class NewsAnchorGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 120 });
    this.currentIndex = 0;
    this.score = 0;
    this.questionQueue = [];
  }

  async init() {
    await this.init3D();

    this.container.innerHTML = `
      <div class="game-wrapper news-theme">
        <div class="monitor-frame">
           <div class="live-badge">🔴 LIVE</div>
           <div class="logo-corner">UEAH NEWS</div>
           
           <div class="camera-view">
              <div class="anchor-woman">👩‍💼</div>
              <div class="desk"></div>
           </div>
           
           <!-- Teleprompter Overlay -->
           <div class="teleprompter">
              <div class="prompter-text" id="prompter-text">
                 Preparing broadcast...
              </div>
              
              <div class="options-bar" id="news-options"></div>
           </div>
        </div>
        
        <div class="bottom-ticker">
           <span class="ticker-content" id="ticker">BREAKING NEWS: VOCABULARY EXPERTS WANTED FOR PRIME TIME SLOT ***   </span>
        </div>

        <!-- Start Overlay -->
        <div id="news-start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center;">
            <div style="font-size: 100px; margin-bottom: 20px; animation: float 3s ease-in-out infinite;">🗞️</div>
            <h1 style="font-size: 40px; color: #3498db; margin-bottom: 15px;">News Anchor</h1>
            <p style="margin-bottom: 30px; font-size: 18px; max-width: 400px;">Deliver the news live! Fill in the blanks with the most appropriate professional vocabulary.</p>
            <button id="news-start-btn" style="padding: 15px 40px; background: #3498db; color: white; border: none; font-size: 20px; font-weight: bold; border-radius: 30px; cursor: pointer; box-shadow: 0 0 15px rgba(52, 152, 219, 0.5);">TAKE THE SEAT</button>
        </div>
      </div>
    `;

    this.injectStyles();

    const startBtn = this.container.querySelector('#news-start-btn');
    if (startBtn) {
      startBtn.onclick = () => {
        this.container.querySelector('#news-start-overlay').style.display = 'none';
        this.start();
      };
    }
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .game-wrapper {
        width: 100%; height: 500px;
        background: #1a1a1a;
        display: flex; flex-direction: column;
        border: 10px solid #333;
        border-radius: 4px;
        position: relative;
        font-family: 'Arial', sans-serif;
      }
      
      .monitor-frame {
        flex: 1; position: relative; background: #2c3e50; overflow: hidden;
      }
      
      .live-badge {
        position: absolute; top: 20px; left: 20px;
        background: red; color: white; padding: 5px 10px; font-weight: bold; border-radius: 4px;
        animation: pulse 1s infinite; z-index: 10;
      }
      .logo-corner {
        position: absolute; top: 20px; right: 20px;
        color: rgba(255,255,255,0.5); font-weight: bold; font-style: italic; z-index: 10;
      }
      
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      
      .camera-view {
        position: absolute; inset: 0;
        display: flex; justify-content: center; align-items: center;
        background: transparent;
      }
      .anchor-woman { font-size: 150px; z-index: 2; margin-top: 50px; }
      .desk {
        position: absolute; bottom: 0; width: 100%; height: 80px;
        background: linear-gradient(to bottom, #95a5a6, #7f8c8d);
        border-top: 4px solid #fff; z-index: 3;
      }
      
      .teleprompter {
        position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
        width: 80%; background: rgba(0,0,0,0.8);
        padding: 20px; border-radius: 12px;
        color: white; text-align: center;
        z-index: 20;
      }
      .prompter-text { font-size: 24px; font-weight: bold; margin-bottom: 20px; font-family: 'Courier New', monospace; color: #ffff00; }
      
      .options-bar {
        display: flex; gap: 10px; justify-content: center;
      }
      
      .news-btn {
        background: white; color: black; border: none; padding: 10px 20px; font-weight: bold;
        cursor: pointer; border-radius: 4px; font-size: 16px;
        transition: all 0.2s;
      }
      .news-btn:hover { background: #3498db; color: white; transform: translateY(-2px); }
      
      .bottom-ticker {
        height: 40px; background: #c0392b; color: white;
        display: flex; align-items: center; overflow: hidden;
        white-space: nowrap; border-top: 2px solid #e74c3c;
      }
      .ticker-content { font-weight: bold; padding-left: 100%; animation: scrollTicker 15s linear infinite; }
      
      @keyframes scrollTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-200%); } }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.createNewsBackground();
    this.questionQueue = this.shuffleArray([...HEADLINES]);
    this.currentIndex = 0;
    this.nextHeadline();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  createNewsBackground() {
    const geometry = new THREE.IcosahedronGeometry(3, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3498db,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const globe = new THREE.Mesh(geometry, material);
    this.threeHelper.scene.add(globe);

    const ringGeo = new THREE.TorusGeometry(4, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    this.threeHelper.scene.add(ring);

    this.threeHelper.objects.push({
      isObject3D: false,
      update: () => {
        globe.rotation.y += 0.005;
        globe.rotation.x += 0.002;
        ring.rotation.z -= 0.01;
        ring.rotation.x = Math.PI / 2 + Math.sin(Date.now() * 0.001) * 0.2;
        return true;
      }
    });
  }

  nextHeadline() {
    if (this.questionQueue.length === 0) {
      this.end();
      return;
    }

    const data = this.questionQueue.pop();
    this.currentData = data;
    const text = data.headline.replace("____", "<span style='color:cyan'>[...]</span>");

    document.getElementById('prompter-text').innerHTML = text;

    const optionsEl = document.getElementById('news-options');
    const shuffled = this.shuffleArray([...data.options]);

    optionsEl.innerHTML = shuffled.map(opt => `
           <button class="news-btn" data-word="${opt}">${opt}</button>
        `).join('');

    optionsEl.querySelectorAll('.news-btn').forEach(btn => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.word, data);
    });
  }

  checkAnswer(btn, word, data) {
    if (word === data.correct) {
      this.score += 100;
      document.getElementById('prompter-text').innerHTML = data.headline.replace("____", `<span style='color:#2ecc71'>${word.toUpperCase()}</span>`);

      const optionsEl = document.getElementById('news-options');
      optionsEl.querySelectorAll('.news-btn').forEach(b => b.disabled = true);

      setTimeout(() => {
        this.nextHeadline();
      }, 1500);
    } else {
      btn.style.background = "#e74c3c";
      btn.style.color = "white";
      Animations.shake(btn);
      this.speak("Cut! Try again!");
    }
  }

  end() {
    this.isRunning = false;
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new NewsAnchorGame(container, config);
}
