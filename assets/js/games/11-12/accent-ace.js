/* assets/js/games/11-12/accent-ace.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class AccentAce extends GameBase {
    async init() {
        await this.init3D();

        this.accents = [
            { id: "us", name: "American", lang: "en-US", phrase: "I'm going to the movies to grab some popcorn and soda.", marker: "movies, soda" },
            { id: "uk", name: "British", lang: "en-GB", phrase: "I'm heading to the cinema for some crisps and a tin of biscuits.", marker: "cinema, crisps, biscuits" },
            { id: "au", name: "Australian", lang: "en-AU", phrase: "G'day mate! Let's fire up the barbie in the backyard this afternoon.", marker: "G'day, barbie" },
            { id: "in", name: "Indian", lang: "en-IN", phrase: "I will be completing the assignment by this evening, definitely.", marker: "distinctive phrasing" },
            { id: "za", name: "South African", lang: "en-ZA", phrase: "Is it far to the shop? Howzit, my friend!", marker: "Howzit" },
            { id: "ie", name: "Irish", lang: "en-IE", phrase: "Grand day for a walk, isn't it? The craic was mighty last night!", marker: "Grand, craic" },
            { id: "sc", name: "Scottish", lang: "en-GB", phrase: "Aye, the bonnie wee loch is just over the brae yonder.", marker: "Aye, bonnie, brae" },
            { id: "nz", name: "New Zealand", lang: "en-NZ", phrase: "Sweet as, bro! Let's head to the dairy for some lollies.", marker: "Sweet as, dairy, lollies" }
        ];

        this.currentQ = 0;
        this.score = 0;
        this.voices = [];
        this.shuffled = this.shuffle([...this.accents]);

        // Load voices
        this.loadVoices();

        this.setupUI();
        this.setupScene();
    }

    loadVoices() {
        // Voice loading is async in some browsers
        const getV = () => {
            this.voices = window.speechSynthesis.getVoices();
        };
        getV();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = getV;
        }
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #001f3f; color: white; font-family: 'Montserrat', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
                <!-- World Map Decoration -->
                <div style="position: absolute; font-size: 400px; opacity: 0.05; z-index: 0; pointer-events: none;">🌍</div>

                <!-- HUD -->
                <div style="position: absolute; top: 20px; width: 90%; display: flex; justify-content: space-between; z-index: 10;">
                    <div style="font-size: 28px; font-weight: 900; color: #ffdc00; text-shadow: 0 0 10px rgba(255,220,0,0.5);">🌍 Accent Ace</div>
                    <div style="font-size: 22px; background: rgba(255,255,255,0.1); padding: 5px 20px; border-radius: 10px;">Score: <span id="score">0</span></div>
                </div>

                <!-- Display Card -->
                <div id="game-card" style="background: rgba(255,255,255,0.95); color: #333; padding: 40px; border-radius: 20px; width: 85%; max-width: 600px; box-shadow: 0 15px 40px rgba(0,0,0,0.4); text-align: center; z-index: 10; display: none;">
                    <div style="margin-bottom: 30px;">
                        <button id="hear-btn" style="width: 100px; height: 100px; border-radius: 50%; border: none; background: #ff4136; color: white; cursor: pointer; font-size: 40px; box-shadow: 0 8px 20px rgba(255,65,54,0.4); transition: transform 0.2s;">🎧</button>
                        <p style="margin-top: 15px; font-weight: bold; color: #777;">Click to listen to the speaker</p>
                    </div>

                    <h2 style="font-size: 24px; margin-bottom: 25px;">Which accent do you hear?</h2>

                    <div id="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <!-- Buttons -->
                    </div>
                </div>

                <!-- Feedback -->
                <div id="feedback" style="position: fixed; bottom: 80px; font-size: 32px; font-weight: bold; transform: scale(0); transition: transform 0.3s; z-index: 10;"></div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🌎✈️</div>
                    <h1 style="font-size: 48px; margin: 0; color: #ffdc00;">Accent Ace</h1>
                    <p style="font-size: 18px; max-width: 500px; margin: 20px 0 40px 0; opacity: 0.9;">Travel the globe through your ears! Identify the regional accents from across the English-speaking world.</p>
                    <button id="start-btn" style="padding: 18px 50px; border-radius: 50px; background: #ffdc00; color: #001f3f; border: none; font-size: 22px; font-weight: bold; cursor: pointer; box-shadow: 0 10px 30px rgba(255,220,0,0.3);">START JOURNEY</button>
                </div>
            </div>
            <style>
                .opt-btn {
                    padding: 15px; border: 2px solid #ddd; background: white; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; transition: all 0.2s; color: #333;
                }
                .opt-btn:hover { border-color: #ffdc00; background: #fffdf0; transform: translateY(-3px); }
                #hear-btn:active { transform: scale(0.9); }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
        this.container.querySelector('#hear-btn').onclick = () => this.playAccent();
    }

    setupScene() {
        // Floating globe elements
        const globeGeo = new THREE.SphereGeometry(1, 16, 16);
        const globeMat = new THREE.MeshPhongMaterial({ color: 0x0074d9, wireframe: true });
        this.threeHelper.addFloatingObject(globeGeo, globeMat, 5);
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.container.querySelector('#game-card').style.display = 'block';
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQ >= this.shuffled.length) {
            this.endGame();
            return;
        }

        const q = this.shuffled[this.currentQ];
        const grid = this.container.querySelector('#options-grid');
        grid.innerHTML = '';

        // Generate 4 options (including correct one)
        const options = this.shuffle([
            q,
            ...this.accents.filter(a => a.id !== q.id).slice(0, 3)
        ]);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn';
            btn.textContent = opt.name;
            btn.onclick = () => this.handleAnswer(opt.id, q.id, btn);
            grid.appendChild(btn);
        });

        setTimeout(() => this.playAccent(), 500);
    }

    playAccent() {
        const q = this.shuffled[this.currentQ];

        // Find best voice
        let voice = this.voices.find(v => v.lang.startsWith(q.lang));
        if (!voice) voice = this.voices.find(v => v.lang.startsWith('en')); // Fallback to any English

        this.speak(q.phrase, {
            voice: voice,
            rate: 0.9,
            pitch: 1.0
        });

        const btn = this.container.querySelector('#hear-btn');
        btn.textContent = '🔊';
        setTimeout(() => btn.textContent = '🎧', 1000);
    }

    handleAnswer(selectedId, correctId, btn) {
        const feedback = this.container.querySelector('#feedback');

        if (selectedId === correctId) {
            this.score += 150;
            this.container.querySelector('#score').textContent = this.score;
            btn.style.background = '#2ecc40';
            btn.style.color = 'white';
            btn.style.borderColor = '#2ecc40';
            feedback.textContent = "✅ Excellent Ear!";
            feedback.style.color = "#2ecc40";
        } else {
            btn.style.background = '#ff4136';
            btn.style.color = 'white';
            btn.style.borderColor = '#ff4136';
            feedback.textContent = "❌ Not Quite!";
            feedback.style.color = "#ff4136";
        }

        feedback.style.transform = 'scale(1)';

        // Disable all
        const btns = this.container.querySelectorAll('.opt-btn');
        btns.forEach(b => b.disabled = true);

        setTimeout(() => {
            feedback.style.transform = 'scale(0)';
            this.currentQ++;
            this.loadQuestion();
        }, 1500);
    }

    endGame() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #001f3f; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 60px; color: #ffdc00;">World Tour Complete! 🗺️</h1>
                <p style="font-size: 32px; margin-top: -20px;">Linguistic Score: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; border-radius: 10px; background: #ffdc00; color: #001f3f; border: none; font-size: 20px; font-weight: bold; cursor: pointer;">New Tour</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; border-radius: 10px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: bold; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new AccentAce(container, config);
}
