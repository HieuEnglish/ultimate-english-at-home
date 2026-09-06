/* assets/js/games/13-18/news-editor.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class NewsEditor extends GameBase {
    async init() {
        await this.init3D();

        this.headlines = [
            { original: "GOVERNMENT ANNOUNCE NEW LAW TODAY", correct: "GOVERNMENT ANNOUNCES NEW LAW TODAY", error: "Subject-Verb Agreement", category: "Grammar" },
            { original: "STORM CAURSES MASSIVE FLOODS IN SOUTH", correct: "STORM CAUSES MASSIVE FLOODS IN SOUTH", error: "Spelling (CAURSES -> CAUSES)", category: "Spelling" },
            { original: "ECONOMY IS GROWING MORE BETTER THAN EXPECTED", correct: "ECONOMY IS GROWING BETTER THAN EXPECTED", error: "Double Comparative", category: "Grammar" },
            { original: "LOCAL HERO RECEIVES METAL FOR BRAVERY", correct: "LOCAL HERO RECEIVES MEDAL FOR BRAVERY", error: "Homophone (METAL -> MEDAL)", category: "Vocabulary" },
            { original: "POLICE SEARCHING FOR SUSPECT WHICH ESCAPED", correct: "POLICE SEARCHING FOR SUSPECT WHO ESCAPED", error: "Relative Pronoun (WHICH -> WHO)", category: "Grammar" },
            { original: "NEW VACCINE SUCCESSFULL IN RECENT TRIALS", correct: "NEW VACCINE SUCCESSFUL IN RECENT TRIALS", error: "Spelling (SUCCESSFULL -> SUCCESSFUL)", category: "Spelling" },
            { original: "TEAMS WILL COMPETE FOR THE BRONZE MEDDLE", correct: "TEAMS WILL COMPETE FOR THE BRONZE MEDAL", error: "Homophone (MEDDLE -> MEDAL)", category: "Vocabulary" },
            { original: "COMPANY TO EFFECT NEW POLICY MONDAY", correct: "COMPANY TO AFFECT NEW POLICY MONDAY", error: "Word Choice (EFFECT -> AFFECT)", category: "Vocabulary" }, // Or 'implement' but affect/effect is common
            { original: "ITS FINALLY TIME FOR THE GRAND OPENING", correct: "IT'S FINALLY TIME FOR THE GRAND OPENING", error: "Punctuation (ITS -> IT'S)", category: "Grammar" },
            { original: "STUDENTS DOES NOT WANT LONGER SCHOOL DAYS", correct: "STUDENTS DO NOT WANT LONGER SCHOOL DAYS", error: "Subject-Verb Agreement", category: "Grammar" }
        ];

        this.currentQ = 0;
        this.score = 0;
        this.shuffled = this.shuffle([...this.headlines]).slice(0, 8);

        this.setupUI();
        this.setupScene();
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #2c3e50; color: #ecf0f1; font-family: 'Helvetica Neue', Arial, sans-serif; display: flex; flex-direction: column; overflow: hidden;">
                <!-- News Header -->
                <div style="background: #c0392b; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #96281b; z-index: 10;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <span style="font-size: 32px;">📰</span>
                        <div style="font-weight: 900; font-size: 24px; letter-spacing: 2px;">GLOBAL NEWS DESK</div>
                    </div>
                    <div style="display: flex; gap: 40px; font-weight: bold;">
                        <div>EDITION: <span id="edition">1</span>/8</div>
                        <div>REPUTATION: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Main Desktop -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; position: relative;">
                    
                    <!-- News Feed (Atmospheric) -->
                    <div style="position: absolute; left: 20px; top: 20px; bottom: 20px; width: 250px; background: rgba(0,0,0,0.2); padding: 15px; font-size: 11px; color: #bdc3c7; overflow: hidden; border-radius: 5px;">
                        <div style="color: #c0392b; font-weight: bold; margin-bottom: 10px;">LIVE WIRE FEED</div>
                        <div id="wire-feed">
                            > Checking syntax...<br>
                            > Verifying sources...<br>
                            > Incoming headline...
                        </div>
                    </div>

                    <!-- Breaking News Card -->
                    <div id="news-card" style="background: white; color: #333; padding: 50px; border-radius: 4px; border: 1px solid #ddd; width: 90%; max-width: 800px; box-shadow: 10px 10px 0 rgba(0,0,0,0.5); z-index: 10; text-align: center;">
                        <div style="color: #c0392b; font-weight: 900; font-size: 14px; margin-bottom: 20px; text-transform: uppercase; border-bottom: 2px solid #c0392b; display: inline-block;">Breaking News Headline</div>
                        
                        <div id="headline-display" style="font-size: 36px; font-weight: 900; line-height: 1.2; margin-bottom: 40px; font-family: 'Georgia', serif; text-transform: uppercase;">
                            HEADLINE GOES HERE
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 15px; width: 100%;">
                            <input type="text" id="editor-input" placeholder="Type the corrected headline here..." autocomplete="off" style="width: 100%; padding: 15px; font-size: 18px; border: 2px solid #bdc3c7; outline: none; transition: border-color 0.3s; font-family: inherit;">
                            <button id="publish-btn" style="background: #27ae60; color: white; border: none; padding: 15px; font-size: 20px; font-weight: bold; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: background 0.2s;">Publish Headline</button>
                        </div>
                    </div>

                    <!-- Feedback Stamps -->
                    <div id="stamp" style="position: absolute; top: 50%; left: 50%; width: 300px; height: 150px; border: 10px solid; border-radius: 20px; transform: translate(-50%, -50%) rotate(-15deg) scale(0); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; align-items: center; justify-content: center; font-size: 60px; font-weight: 900; opacity: 0; z-index: 20; pointer-events: none;">
                        APPROVED
                    </div>
                </div>

                <!-- Footer / Ticker -->
                <div style="background: #1a1a1a; color: #ffeb3b; padding: 10px; overflow: hidden; white-space: nowrap; font-size: 14px; font-weight: bold; border-top: 2px solid #555;">
                    <div style="display: inline-block; animation: ticker 30s linear infinite;">
                        MARKETS UP 1.2% ... NEW TECHNOLOGY REVEALED IN TOKYO ... WEATHER ALERT FOR NORTHERN COAST ... SPORTS RESULTS: CITY 3, UNITED 1 ... 
                    </div>
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="font-size: 120px; margin-bottom: 20px;">🗞️</div>
                    <h1 style="font-size: 50px; color: #c0392b; margin: 0;">NEWS EDITOR</h1>
                    <p style="font-size: 20px; max-width: 500px; margin: 20px 0 40px 0; opacity: 0.9;">The world is waiting! Correct the grammar and spelling in these breaking headlines before they go to print.</p>
                    <button id="start-btn" style="padding: 20px 60px; border: none; background: #c0392b; color: white; font-size: 24px; font-weight: 900; cursor: pointer; box-shadow: 0 10px 30px rgba(192, 57, 43, 0.4); text-transform: uppercase;">Take the Seat</button>
                </div>
            </div>
            <style>
                @keyframes ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
                #editor-input:focus { border-color: #c0392b; }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
        this.container.querySelector('#publish-btn').onclick = () => this.publishHeadline();
        this.container.querySelector('#editor-input').onkeypress = (e) => {
            if (e.key === 'Enter') this.publishHeadline();
        };
    }

    setupScene() {
        // Newsroom elements
        const paperGeo = new THREE.BoxGeometry(2, 0.1, 3);
        const paperMat = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
        this.threeHelper.addFloatingObject(paperGeo, paperMat, 5);

        // Add some glowing cyan strips for "tech" feel
        const lightGeo = new THREE.BoxGeometry(0.1, 10, 0.1);
        const lightMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 });
        for (let i = 0; i < 10; i++) {
            const strip = new THREE.Mesh(lightGeo, lightMat);
            strip.position.set((Math.random() - 0.5) * 20, 0, -10);
            this.threeHelper.scene.add(strip);
        }
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.loadHeadline();
    }

    loadHeadline() {
        if (this.currentQ >= this.shuffled.length) {
            this.endGame();
            return;
        }

        const q = this.shuffled[this.currentQ];
        this.container.querySelector('#edition').textContent = this.currentQ + 1;
        this.container.querySelector('#headline-display').textContent = q.original;
        this.container.querySelector('#editor-input').value = '';
        this.container.querySelector('#editor-input').focus();

        this.logWire(`URGENT: ${q.category} check needed on headline #${this.currentQ + 1}.`);
    }

    publishHeadline() {
        const input = this.container.querySelector('#editor-input').value.trim().toUpperCase();
        const correct = this.shuffled[this.currentQ].correct.toUpperCase();
        const stamp = this.container.querySelector('#stamp');

        if (!input) return;

        if (input === correct) {
            this.score += 250;
            this.container.querySelector('#score').textContent = this.score;
            this.celebrateMove({ burst: 'APPROVED', duration: 800 });

            stamp.textContent = 'APPROVED';
            stamp.style.color = '#27ae60';
            stamp.style.borderColor = '#27ae60';
            stamp.style.opacity = '1';
            stamp.style.transform = 'translate(-50%, -50%) rotate(-15deg) scale(1)';

            this.logWire(`SUCCESS: Headline #${this.currentQ + 1} published. Good work.`);

            setTimeout(() => {
                stamp.style.opacity = '0';
                stamp.style.transform = 'translate(-50%, -50%) rotate(-15deg) scale(0)';
                this.currentQ++;
                this.loadHeadline();
            }, 1500);
        } else {
            stamp.textContent = 'REJECTED';
            stamp.style.color = '#c0392b';
            stamp.style.borderColor = '#c0392b';
            stamp.style.opacity = '1';
            stamp.style.transform = 'translate(-50%, -50%) rotate(15deg) scale(1.1)';
            this.coachMove();

            this.logWire(`ERROR: Failed to correct headline. Try again.`);

            setTimeout(() => {
                stamp.style.opacity = '0';
                stamp.style.transform = 'translate(-50%, -50%) rotate(15deg) scale(0)';
            }, 1000);
        }
    }

    logWire(msg) {
        const feed = this.container.querySelector('#wire-feed');
        feed.innerHTML = `> ${window.UEAH_SAFE.escapeHtml(msg)}<br>` + feed.innerHTML;
    }

    endGame() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #1a1a1a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 60px; color: #c0392b;">Edition Complete! 🗞️</h1>
                <p style="font-size: 32px; margin-top: -20px;">News Reputation: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; background: #c0392b; color: white; border: none; font-size: 20px; font-weight: bold; cursor: pointer;">Next Shift</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: bold; cursor: pointer;">Exit Bureau</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new NewsEditor(container, config);
}
