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
  }
];

class NewsAnchorGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 120 });
    this.currentIndex = 0;
    this.score = 0;
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
      </div>
    `;

    this.injectStyles();
    this.showStartOverlay();
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
      
      .camera-view {
        position: absolute; inset: 0;
        display: flex; justify-content: center; align-items: center;
        background: transparent; /* Changed from radial gradient to transparent for 3D */
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
      }
      .news-btn:hover { background: #3498db; color: white; }
      
      .bottom-ticker {
        height: 40px; background: #c0392b; color: white;
        display: flex; align-items: center; overflow: hidden;
        white-space: nowrap; border-top: 2px solid #e74c3c;
      }
      .ticker-content { font-weight: bold; padding-left: 100%; animation: scrollTicker 10s linear infinite; }
      
      @keyframes scrollTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-200%); } }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.createNewsBackground();
    this.currentIndex = 0;
    this.nextHeadline();
  }

  createNewsBackground() {
    // Digital Globe / Grid Effect
    const geometry = new THREE.IcosahedronGeometry(3, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3498db,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const globe = new THREE.Mesh(geometry, material);
    this.threeHelper.scene.add(globe);

    // Add rotating rings
    const ringGeo = new THREE.TorusGeometry(4, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    this.threeHelper.scene.add(ring);

    // Custom animation
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
    if (this.currentIndex >= HEADLINES.length) {
      this.end();
      return;
    }

    const data = HEADLINES[this.currentIndex];
    const text = data.headline.replace("____", "<span style='color:cyan'>[...]</span>");

    document.getElementById('prompter-text').innerHTML = text;

    const optionsEl = document.getElementById('news-options');
    const shuffled = [...data.options].sort(() => Math.random() - 0.5);

    optionsEl.innerHTML = shuffled.map(opt => `
           <button class="news-btn" data-word="${opt}">${opt}</button>
        `).join('');

    optionsEl.querySelectorAll('.news-btn').forEach(btn => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.word, data);
    });
  }

  checkAnswer(btn, word, data) {
    if (word === data.correct) {
      // Correct
      document.getElementById('prompter-text').innerHTML = data.headline.replace("____", `<span style='color:#2ecc71'>${word.toUpperCase()}</span>`);
      this.addScore(100);
      this.playSound('success');

      setTimeout(() => {
        this.currentIndex++;
        this.nextHeadline();
      }, 1000);
    } else {
      // Wrong
      btn.style.background = "red";
      btn.style.color = "white";
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
