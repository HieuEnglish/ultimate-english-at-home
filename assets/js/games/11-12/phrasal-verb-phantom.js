/* assets/js/games/11-12/phrasal-verb-phantom.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class PhrasalPhantom extends GameBase {
    async init() {
        await this.init3D();

        // Setup content
        this.questions = [
            { sentence: "I ran _____ my old teacher at the supermarket.", correct: "into", alts: ["over", "out", "away"] },
            { sentence: "Can you look _____ my cat while I'm on holiday?", correct: "after", alts: ["up", "into", "over"] },
            { sentence: "Don't give _____! You can do it!", correct: "up", alts: ["in", "on", "off"] },
            { sentence: "They had to call _____ the meeting due to illness.", correct: "off", alts: ["out", "away", "back"] },
            { sentence: "Please turn _____ the music, it's too loud.", correct: "down", alts: ["up", "on", "in"] },
            { sentence: "I can't put _____ with this noise anymore!", correct: "up", alts: ["down", "on", "in"] },
            { sentence: "Don't bring _____ that topic again.", correct: "up", alts: ["down", "out", "in"] },
            { sentence: "I look _____ to seeing you soon.", correct: "forward", alts: ["back", "up", "round"] },
            { sentence: "Do you get _____ well with your brother?", correct: "along", alts: ["around", "over", "up"] },
            { sentence: "My car broke _____ on the highway.", correct: "down", alts: ["up", "out", "off"] },
            { sentence: "She takes _____ her mother in many ways.", correct: "after", alts: ["over", "up", "off"] },
            { sentence: "I need to work _____ this math problem.", correct: "out", alts: ["up", "off", "in"] },
            { sentence: "They set _____ on their journey at dawn.", correct: "off", alts: ["up", "out", "in"] },
            { sentence: "Please fill _____ this form before leaving.", correct: "in", alts: ["up", "out", "off"] },
            { sentence: "He pulled _____ his car near the shop.", correct: "over", alts: ["up", "out", "off"] },
            { sentence: "We ran _____ of milk this morning.", correct: "out", alts: ["off", "up", "over"] }
        ];

        this.currentQ = 0;
        this.score = 0;
        this.ghosts = [];
        this.isGameActive = false;

        this.setupUI();
        this.setupScene(); // Use 3D scene for background atmosphere
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; overflow: hidden; font-family: 'Verdana', sans-serif; user-select: none;">
                <!-- Spooky Background Gradient -->
                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e); z-index: 0;"></div>
                
                <!-- HUD -->
                <div style="position: absolute; top: 0; left: 0; right: 0; padding: 20px; color: #a29bfe; display: flex; justify-content: space-between; z-index: 20;">
                    <div style="font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #6c5ce7;">👻 Phrasal Phantom</div>
                    <div style="font-size: 24px;">Plasma: <span id="score">0</span></div>
                </div>

                <!-- Main Game Layer -->
                <div id="game-layer" style="position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    
                    <!-- Question Box -->
                    <div id="question-box" style="background: rgba(0,0,0,0.6); color: white; padding: 30px; border-radius: 15px; border: 2px solid #6c5ce7; box-shadow: 0 0 20px rgba(108, 92, 231, 0.5); text-align: center; max-width: 600px; margin-bottom: 200px; backdrop-filter: blur(5px);">
                        <div style="font-size: 18px; color: #a29bfe; margin-bottom: 10px;">MISSION <span id="mission-num">1</span></div>
                        <h2 id="sentence-text" style="font-size: 28px; line-height: 1.4;">Loading...</h2>
                    </div>

                    <!-- Ghosts Container (Absolute positioning) -->
                    <div id="ghosts-container" style="position: absolute; inset: 0; pointer-events: none;">
                        <!-- Ghosts injected here -->
                    </div>

                </div>

                 <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
                    <div style="font-size: 80px; margin-bottom: 20px; animation: float 3s ease-in-out infinite;">👻</div>
                    <h1 style="font-size: 40px; color: #a29bfe;">Phrasal Phantom</h1>
                    <p style="margin: 10px 0 30px 0; font-size: 18px;">Catch the ghost with the missing word!</p>
                    <button id="start-btn" style="padding: 15px 40px; background: #6c5ce7; color: white; border: none; font-size: 20px; border-radius: 30px; cursor: pointer; box-shadow: 0 0 15px #6c5ce7;">START HUNT</button>
                </div>
            </div>
            
            <style>
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .ghost-card {
                    transition: transform 0.2s;
                    cursor: pointer;
                    animation: float 4s ease-in-out infinite;
                }
                .ghost-card:hover {
                    transform: scale(1.1);
                }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
    }

    setupScene() {
        // Just some atmospheric fog/particles
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        for (let i = 0; i < 1000; i++) {
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // x
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // y
            vertices.push(THREE.MathUtils.randFloatSpread(200)); // z
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0x888888, size: 2, transparent: true, opacity: 0.5 });
        const points = new THREE.Points(geometry, material);
        this.threeHelper.scene.add(points);
        this.particles = points;
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.isGameActive = true;
        this.loadQuestion();
        this.animate();
    }

    animate() {
        if (!this.isGameActive) return;

        if (this.particles) {
            this.particles.rotation.y += 0.001;
        }

        // Float ghosts
        const ghosts = this.container.querySelectorAll('.ghost-card');
        ghosts.forEach((g, i) => {
            // Simple floating logic via CSS animation, but could add movement logic here
        });

        requestAnimationFrame(() => this.animate());
    }

    loadQuestion() {
        if (this.currentQ >= this.questions.length) {
            this.endGame();
            return;
        }

        const q = this.questions[this.currentQ];
        this.container.querySelector('#mission-num').textContent = this.currentQ + 1;
        this.container.querySelector('#sentence-text').textContent = q.sentence;

        const container = this.container.querySelector('#ghosts-container');
        container.innerHTML = '';

        // Prepare options
        const options = [q.correct, ...q.alts];
        // Shuffle
        options.sort(() => Math.random() - 0.5);

        // Spawn ghosts at random positions
        options.forEach((word) => {
            const ghost = document.createElement('div');
            ghost.className = 'ghost-card';
            ghost.style.position = 'absolute';
            ghost.style.pointerEvents = 'auto'; // Re-enable clicks

            // Random positions around the screen, but avoiding center (question box)
            // Divide screen into quadrants?
            // Simple random for now with checking
            const left = 10 + Math.random() * 80;
            const top = 30 + Math.random() * 60; // Keep in bottom 60%

            ghost.style.left = `${left}%`;
            ghost.style.top = `${top}%`;
            ghost.style.transform = `translate(-50%, -50%)`;

            ghost.innerHTML = `
                <div style="position: relative; width: 100px; text-align: center;">
                    <div style="font-size: 60px;">👻</div>
                    <div style="background: white; color: black; padding: 5px 10px; border-radius: 10px; font-weight: bold; font-size: 18px; margin-top: -10px; position: relative; z-index: 2;">${word}</div>
                </div>
            `;

            ghost.onclick = () => this.handleGhostClick(word, q.correct, ghost);
            container.appendChild(ghost);
        });
    }

    handleGhostClick(word, correct, element) {
        if (word === correct) {
            // Success
            this.score += 100;
            this.container.querySelector('#score').textContent = this.score;

            // Visual feedback
            element.innerHTML = `<div style="font-size: 80px;">💥</div>`;
            setTimeout(() => {
                this.currentQ++;
                this.loadQuestion();
            }, 800);
        } else {
            // Fail
            element.style.opacity = 0.5;
            element.style.pointerEvents = 'none'; // Disable click
            // Shake effect?
        }
    }

    endGame() {
        this.isGameActive = false;
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #0f0c29; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <h1 style="font-size: 50px; color: #a29bfe;">Haunting Complete!</h1>
                <p style="font-size: 30px;">Plasma Collected: ${this.score}</p>
                <div style="margin-top: 30px;">
                    <button onclick="location.reload()" style="padding: 15px 30px; font-size: 20px; background: #6c5ce7; border: none; color: white; border-radius: 8px; cursor: pointer; margin-right: 15px;">Hunt Again</button>
                    <button onclick="window.history.back()" style="padding: 15px 30px; font-size: 20px; background: transparent; border: 2px solid white; color: white; border-radius: 8px; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;
    }
}

export function createGame(container, config) {
    return new PhrasalPhantom(container, config);
}
