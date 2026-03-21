/* assets/js/games/11-12/root-racer.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class RootRacer extends GameBase {
    async init() {
        await this.init3D();

        // Game State
        this.questions = [
            { word: "Beneficial", root: "Bene", meaning: "Good", options: ["Bene", "Fic", "Ial", "Cial"] },
            { word: "Chronology", root: "Chron", meaning: "Time", options: ["Chron", "Logy", "Ology", "No"] },
            { word: "Biology", root: "Bio", meaning: "Life", options: ["Bio", "Logy", "Bi", "Olo"] },
            { word: "Geography", root: "Geo", meaning: "Earth", options: ["Geo", "Graph", "Raphy", "Ge"] },
            { word: "Inspector", root: "Spect", meaning: "Look/See", options: ["Spect", "In", "Tor", "Sec"] },
            { word: "Portable", root: "Port", meaning: "Carry", options: ["Port", "Able", "Tab", "Por"] },
            { word: "Telescope", root: "Tele", meaning: "Far", options: ["Tele", "Scope", "Tel", "Le"] },
            { word: "Dictation", root: "Dict", meaning: "Say/Speak", options: ["Dict", "Tion", "Ation", "Dic"] },
            { word: "Audience", root: "Aud", meaning: "Hear", options: ["Aud", "Ence", "Au", "Idi"] },
            { word: "Manuscript", root: "Scrib/Script", meaning: "Write", options: ["Scrib/Script", "Man", "U", "Pt"] },
            { word: "Thermal", root: "Therm", meaning: "Heat", options: ["Therm", "Al", "Mal", "Her"] },
            { word: "Aquatic", root: "Aqua", meaning: "Water", options: ["Aqua", "Tic", "Qua", "Atic"] },
            { word: "Rupture", root: "Rupt", meaning: "Break", options: ["Rupt", "Ure", "Tur", "Rup"] },
            { word: "Structure", root: "Struct", meaning: "Build", options: ["Struct", "Ure", "Tur", "Stru"] },
            { word: "Visibility", root: "Vis", meaning: "See", options: ["Vis", "Ibil", "Ity", "Is"] }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = 10; // Play 10 rounds
        this.shuffledQuestions = this.shuffleArray([...this.questions]).slice(0, this.totalQuestions);

        // Setup UI
        this.setupUI();

        // Setup 3D Scene (Forest Race environment)
        this.setupScene();
    }

    setupUI() {
        this.container.innerHTML = `
            <div class="game-container" style="position: absolute; inset: 0; display: flex; flex-direction: column; pading: 20px; font-family: 'Segoe UI', sans-serif; overflow: hidden;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; padding: 20px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); z-index: 10;">
                    <div style="font-size: 24px; font-weight: bold;">🌲 Root Racer</div>
                    <div style="font-size: 24px;">Score: <span id="score">0</span></div>
                </div>

                <!-- Main Game Area -->
                <div id="game-area" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10;">
                    
                    <!-- Question Prompt -->
                    <div id="question-card" style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 20px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-width: 600px; width: 90%; transform: translateY(0); transition: all 0.5s ease;">
                        <h2 style="margin: 0 0 10px 0; color: #2e7d32; font-size: 24px;">Identify the Root!</h2>
                        <div id="word-display" style="font-size: 48px; font-weight: 800; color: #333; margin: 20px 0;">WORD</div>
                        <p id="hint-display" style="color: #666; font-style: italic; margin-bottom: 20px;">Hint: look closely...</p>
                        
                        <!-- Options Grid -->
                        <div id="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                            <!-- Buttons injected here -->
                        </div>
                    </div>

                    <!-- Feedback Overlay -->
                    <div id="feedback" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; font-weight: bold; pointer-events: none; opacity: 0; transition: opacity 0.3s; text-shadow: 0 5px 15px rgba(0,0,0,0.5);">
                        ✅
                    </div>
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 100; color: white;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🌳🏎️</div>
                    <h1 style="font-size: 40px; margin: 0;">Root Racer</h1>
                    <p style="font-size: 20px; margin: 10px 0 30px 0;">Find the root word to speed through the forest!</p>
                    <button id="start-btn" style="padding: 15px 40px; font-size: 24px; background: #4CAF50; color: white; border: none; border-radius: 50px; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);">START ENGINE</button>
                </div>
            </div>
        `;

        // Bind Start Button
        this.container.querySelector('#start-btn').addEventListener('click', () => this.startGame());
    }

    setupScene() {
        // Simple 3D Forest effect
        // Ground
        const groundGeo = new THREE.PlaneGeometry(100, 100);
        const groundMat = new THREE.MeshPhongMaterial({
            color: 0x2e7d32,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        this.threeHelper.scene.add(ground);

        // Trees (cones)
        for (let i = 0; i < 50; i++) {
            const height = 2 + Math.random() * 3;
            const geo = new THREE.ConeGeometry(1, height, 8);
            const mat = new THREE.MeshLambertMaterial({ color: 0x1b5e20 });
            const tree = new THREE.Mesh(geo, mat);

            // Random position away from center path
            let x = (Math.random() - 0.5) * 80;
            // Keep center clear
            if (x > -5 && x < 5) x += 10;

            const z = (Math.random() - 0.5) * 80;
            tree.position.set(x, height / 2 - 2, z);
            this.threeHelper.scene.add(tree);
        }

        // Add some ambient light
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        this.threeHelper.scene.add(light);

        // Move camera
        this.threeHelper.camera.position.set(0, 2, 10);
        this.threeHelper.camera.lookAt(0, 0, -20);

        // Speed effect particles
        this.protons = [];
        const partGeo = new THREE.BoxGeometry(0.1, 0.1, 2);
        const partMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });

        for (let k = 0; k < 20; k++) {
            const p = new THREE.Mesh(partGeo, partMat);
            p.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, Math.random() * -50);
            this.threeHelper.scene.add(p);
            this.protons.push(p);
        }
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.loadNextQuestion();
        this.isRacing = true;
        this.speed = 0.5;
        this.animateRace();
    }

    animateRace() {
        if (!this.isRacing) return;

        // Move particles to simulate speed
        this.protons.forEach(p => {
            p.position.z += this.speed;
            if (p.position.z > 5) {
                p.position.z = -50;
                p.position.x = (Math.random() - 0.5) * 20;
                p.position.y = (Math.random() - 0.5) * 10;
            }
        });

        requestAnimationFrame(() => this.animateRace());
    }

    loadNextQuestion() {
        if (this.currentQuestion >= this.shuffledQuestions.length) {
            this.endGame();
            return;
        }

        const q = this.shuffledQuestions[this.currentQuestion];
        const ui = this.container;

        ui.querySelector('#word-display').textContent = q.word;
        ui.querySelector('#hint-display').textContent = `Root meaning: "${q.meaning}"`;

        const grid = ui.querySelector('#options-grid');
        grid.innerHTML = '';

        // Shuffle options
        const options = this.shuffleArray([...q.options]);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.style.cssText = `
                padding: 15px;
                font-size: 20px;
                border: 2px solid #ddd;
                border-radius: 12px;
                background: white;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: bold;
                color: #333;
            `;

            btn.onmouseover = () => { btn.style.transform = 'scale(1.05)'; btn.style.borderColor = '#4CAF50'; };
            btn.onmouseout = () => { btn.style.transform = 'scale(1)'; btn.style.borderColor = '#ddd'; };

            btn.onclick = () => this.handleAnswer(opt, q.root, btn);
            grid.appendChild(btn);
        });
    }

    handleAnswer(selected, correct, btnElement) {
        const isCorrect = selected === correct || (correct.includes('/') && correct.includes(selected)); // Handle Scrib/Script case

        const feedback = this.container.querySelector('#feedback');

        if (isCorrect) {
            this.score += 100;
            this.container.querySelector('#score').textContent = this.score;
            this.celebrateMove({ burst: String(selected).toUpperCase(), duration: 700 });
            feedback.textContent = '✅';
            feedback.style.color = '#4CAF50';
            btnElement.style.background = '#4CAF50';
            btnElement.style.color = 'white';
            this.coachMove();
            this.speed = 1.5; // Speed up effect
            setTimeout(() => this.speed = 0.5, 500);
        } else {
            feedback.textContent = '❌';
            feedback.style.color = '#f44336';
            btnElement.style.background = '#f44336';
            btnElement.style.color = 'white';
        }

        feedback.style.opacity = 1;

        // Disable all buttons
        const computedBtns = this.container.querySelectorAll('#options-grid button');
        computedBtns.forEach(b => b.disabled = true);

        setTimeout(() => {
            feedback.style.opacity = 0;
            this.currentQuestion++;
            this.loadNextQuestion();
        }, 1500);
    }

    endGame() {
        this.isRacing = false;
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 50px; margin-bottom: 20px;">Race Complete! 🏁</h1>
                <p style="font-size: 30px;">Final Score: ${this.score}</p>
                <div style="margin-top: 30px;">
                    <button onclick="location.reload()" style="padding: 15px 30px; font-size: 20px; background: #2196F3; border: none; color: white; border-radius: 8px; cursor: pointer; margin-right: 15px;">Play Again</button>
                    <button onclick="window.history.back()" style="padding: 15px 30px; font-size: 20px; background: transparent; border: 2px solid white; color: white; border-radius: 8px; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

export function createGame(container, config) {
    return new RootRacer(container, config);
}
