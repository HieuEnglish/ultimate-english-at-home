/* assets/js/games/featured/ielts-runner.js
   IELTS BuildUp - Featured Campaign Game
   Style: Shortcut Run / Super Mario 2.5D
*/

import { getRandomQuestion } from '../../question-bank.js';

// Retrieve global store if available
const ProfileStore = window.UEAHProfileStore || { addCertificate: () => { }, get: () => ({ certificates: [] }) };

export class IeltsRunnerGame {
    constructor(container, config) {
        this.container = container;
        this.config = config || {};

        // Game State
        this.level = 1;
        this.planks = 0;
        this.score = 0;
        this.distance = 0;
        this.isRunning = false;
        this.isPaused = false;

        // Physical State
        this.playerX = 50; // % position
        this.isBuilding = false;

        // Level Config
        this.levelConfig = {
            1: { title: "Starters Valley", color: "#48dbfb", length: 1000, award: "A1 Starters Certificate" },
            2: { title: "Movers Mountain", color: "#1dd1a1", length: 1500, award: "A2 Movers Certificate" },
            3: { title: "Flyers Sky", color: "#feca57", length: 2000, award: "B1 Flyers Certificate" },
            4: { title: "IELTS Ridge", color: "#ff6b6b", length: 3000, award: "B2 Competent Certificate" },
            5: { title: "Proficiency Peak", color: "#5f27cd", length: 5000, award: "C2 Mastery Certificate" }
        };

        this.obstacles = [];
        this.frameId = null;
    }

    async init() {
        this.loadProgress();

        this.container.innerHTML = `
            <div class="runner-viewport">
                <div class="sky-bg"></div>
                <div class="world-3d">
                    <div class="track-container" id="track"></div>
                    <div class="player-avatar" id="player">
                        <div class="plank-stack" id="plank-stack"></div>
                        <div class="character-sprite">🏃</div>
                    </div>
                </div>
                
                <div class="ui-layer">
                    <div class="hud-top">
                        <div class="stat-box">🏗️ <span id="plank-count">0</span></div>
                        <div class="stat-box level-box"><span id="level-name">Level 1</span></div>
                        <div class="stat-box">⭐ <span id="score-count">0</span></div>
                    </div>
                    
                    <div class="question-modal" id="question-modal" style="display:none">
                        <div class="q-content">
                            <h3 id="q-text">Question?</h3>
                            <div class="q-options" id="q-options"></div>
                        </div>
                    </div>
                    
                    <div class="start-screen" id="start-screen">
                        <h1>IELTS BuildUp</h1>
                        <p>Collect Knowledge Planks. Build Bridges. Reach the Top.</p>
                        <button class="big-btn start-btn">PLAY LEVEL <span id="start-level-num">1</span></button>
                    </div>
                    
                    <div class="certs-notify" id="cert-notify"></div>
                </div>
            </div>
        `;

        this.injectStyles();
        this.bindEvents();
        this.updateHUD();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .runner-viewport {
                position: relative; width: 100%; height: 600px;
                background: linear-gradient(180deg, #87CEEB 0%, #E0F7FA 100%);
                overflow: hidden; perspective: 1000px;
                font-family: 'Segoe UI', sans-serif;
            }
            .world-3d {
                position: absolute; bottom: 0; width: 100%; height: 100%;
                transform-style: preserve-3d;
                transform: rotateX(20deg); /* 2.5D tilt */
            }
            .track-container {
                position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
                background: 
                    linear-gradient(90deg, transparent 49%, rgba(0,0,0,0.1) 50%, transparent 51%),
                    linear-gradient(0deg, #ccc 1px, transparent 1px);
                background-size: 100px 100px, 100% 50px;
                transform-origin: bottom;
                animation: scrollTrack 1s linear infinite;
                animation-play-state: paused;
            }
            @keyframes scrollTrack { from { background-position: 0 0; } to { background-position: 0 50px; } }
            
            .player-avatar {
                position: absolute; bottom: 50px; left: 50%;
                width: 60px; height: 100px;
                transform: translateX(-50%);
                transition: left 0.2s;
                z-index: 10;
            }
            .character-sprite { font-size: 60px; position: absolute; bottom: 0; }
            .plank-stack {
                position: absolute; bottom: 60px; left: 10px;
                width: 40px; display: flex; flex-direction: column-reverse;
            }
            .plank { width: 40px; height: 8px; background: #8e44ad; margin-bottom: 2px; border: 1px solid white; }
            
            .ui-layer { position: absolute; inset: 0; pointer-events: none; }
            .hud-top {
                display: flex; justify-content: space-between; padding: 20px;
                pointer-events: auto;
            }
            .stat-box {
                background: rgba(0,0,0,0.6); color: white; padding: 10px 20px;
                border-radius: 20px; font-weight: bold; font-size: 20px;
            }
            .level-box { background: #e67e22; }
            
            .question-modal {
                position: absolute; inset: 0; background: rgba(0,0,0,0.8);
                display: flex; justify-content: center; align-items: center;
                pointer-events: auto; z-index: 100;
            }
            .q-content {
                background: white; padding: 40px; border-radius: 20px;
                width: 80%; max-width: 500px; text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            
            .q-options { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
            .opt-btn {
                padding: 15px; border: 2px solid #eee; background: white;
                border-radius: 10px; cursor: pointer; font-size: 18px;
                transition: all 0.2s;
            }
            .opt-btn:hover { background: #f0f0f0; transform: translateY(-2px); }
            
            .start-screen {
                position: absolute; inset: 0; background: rgba(255,255,255,0.95);
                display: flex; flex-direction: column; justify-content: center; align-items: center;
                pointer-events: auto;
                text-align: center;
            }
            .big-btn {
                padding: 20px 60px; font-size: 24px; background: #0984e3; color: white;
                border: none; border-radius: 50px; cursor: pointer; margin-top: 30px;
                box-shadow: 0 10px 0 #0762ac; transition: transform 0.1s;
            }
            .big-btn:active { transform: translateY(5px); box-shadow: 0 5px 0 #0762ac; }
            
            .cert-notify {
                 position: absolute; top: 100px; left: 50%; transform: translateX(-50%);
                 background: #f1c40f; color: #2c3e50; padding: 20px;
                 border-radius: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                 display: none; text-align: center; font-weight: bold;
                 animation: slideDown 0.5s ease;
            }
            @keyframes slideDown { from { top: -100px; } to { top: 100px; } }
            
            /* Dynamic Objects */
            .world-obj {
                position: absolute; bottom: 0; width: 80px; height: 80px;
                background: orange; left: 50%; transform: translateX(-50%);
                font-size: 40px; display: flex; align-items: center; justify-content: center;
                border-radius: 10px;
            }
            .obj-gate { background: #00cec9; color: white; border: 4px solid white; }
            .obj-gap { background: transparent; border-bottom: none; height: 10px; width: 100%; bottom: -10px; box-shadow: inset 0 10px 20px rgba(0,0,0,0.5); }

            .player-avatar.jumping {
                animation: jump 0.6s ease-out forwards;
            }
            @keyframes jump {
                0% { transform: translateX(-50%) translateY(0); }
                50% { transform: translateX(-50%) translateY(-100px); }
                100% { transform: translateX(-50%) translateY(0); }
            }
            
            .nav-btn {
                position: absolute; bottom: 20px;
                width: 80px; height: 80px; border-radius: 50%;
                background: rgba(0,0,0,0.7); color: white;
                font-size: 30px; border: none; cursor: pointer;
                display: flex; justify-content: center; align-items: center;
                box-shadow: 0 5px 10px rgba(0,0,0,0.3);
                pointer-events: auto;
            }
            .nav-left { left: 20px; }
            .nav-right { right: 20px; }
            .nav-jump { left: 50%; transform: translateX(-50%); }
        `;
        this.container.appendChild(style);
    }

    bindEvents() {
        this.container.querySelector('.start-btn').onclick = () => this.startGame();

        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            if (!this.isRunning) return;
            if (e.key === 'ArrowLeft') this.movePlayer(-15);
            if (e.key === 'ArrowRight') this.movePlayer(15);
            if ((e.key === ' ' || e.key === 'ArrowUp') && !this.isJumping) this.jump();
        });

        // Touch / Mouse (Lane control + Tap to Jump)
        const touchZone = this.container.querySelector('.world-3d');
        if (touchZone) {
            touchZone.addEventListener('click', (e) => {
                if (!this.isRunning) return;
                // Simple tap to jump if game is running
                if (!this.isJumping) this.jump();
            });

            // Swipe for lanes? For now, we keep the simple tap/click logic or add specific buttons
        }

        // Mobile UI Controls
        const leftBtn = document.createElement('button');
        leftBtn.className = 'nav-btn nav-left';
        leftBtn.innerText = '⬅️';
        leftBtn.onclick = () => this.movePlayer(-15);

        const rightBtn = document.createElement('button');
        rightBtn.className = 'nav-btn nav-right';
        rightBtn.innerText = '➡️';
        rightBtn.onclick = () => this.movePlayer(15);

        const jumpBtn = document.createElement('button');
        jumpBtn.className = 'nav-btn nav-jump';
        jumpBtn.innerText = '⏫';
        jumpBtn.onclick = () => { if (!this.isJumping) this.jump(); };

        const hud = this.container.querySelector('.ui-layer');
        hud.appendChild(leftBtn);
        hud.appendChild(rightBtn);
        hud.appendChild(jumpBtn);
    }

    jump() {
        this.isJumping = true;
        const char = document.getElementById('player');
        if (char) char.classList.add('jumping');

        // Physics logic: Jump duration 600ms
        setTimeout(() => {
            this.isJumping = false;
            if (char) char.classList.remove('jumping');
        }, 600);
    }

    loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem('UEAH_IELTS_RUNNER'));
            if (saved) {
                this.level = saved.level || 1;
                this.score = saved.score || 0;
            }
        } catch (e) { }

        const levelSpan = document.getElementById('start-level-num');
        const levelName = document.getElementById('level-name');
        if (levelSpan) levelSpan.textContent = this.level;
        if (levelName) levelName.textContent = this.levelConfig[this.level].title;
    }

    saveProgress() {
        localStorage.setItem('UEAH_IELTS_RUNNER', JSON.stringify({
            level: this.level,
            score: this.score
        }));
    }

    startGame() {
        document.getElementById('start-screen').style.display = 'none';
        this.isRunning = true;
        this.distance = 0;
        this.planks = 5; // Start with few
        this.updateHUD();
        this.gameLoop();
        this.spawnSequence();
    }

    movePlayer(delta) {
        this.playerX = Math.max(10, Math.min(90, this.playerX + delta));
        const p = document.getElementById('player');
        if (p) {
            p.style.left = this.playerX + '%';
            // Tilt effect
            p.style.transform = `translateX(-50%) rotateY(${delta > 0 ? 20 : -20}deg)`;
            setTimeout(() => p.style.transform = 'translateX(-50%) rotateY(0deg)', 200);
        }
    }

    gameLoop() {
        if (!this.isRunning) return;

        this.distance += 2;
        document.getElementById('track').style.animationPlayState = 'running';

        // Check Level Completion
        if (this.distance > this.levelConfig[this.level].length) {
            this.completeLevel();
            return;
        }

        // Logic for collision detection would go here in a real engine
        // optimizing simple time-based spawning for this demo

        this.frameId = requestAnimationFrame(() => this.gameLoop());
    }

    spawnSequence() {
        if (!this.isRunning) return;

        // Random event every 2-4 seconds
        const delay = 2000 + Math.random() * 2000;

        setTimeout(() => {
            if (this.isRunning) {
                const rand = Math.random();
                if (rand > 0.6) this.triggerQuestionGate();
                else this.triggerGap(); // Visual gap

                this.spawnSequence();
            }
        }, delay);
    }

    triggerQuestionGate() {
        this.pauseGame();
        const q = getRandomQuestion(Math.max(1, this.level - 1), this.level); // varied difficulty

        const modal = document.getElementById('question-modal');
        document.getElementById('q-text').textContent = q.question;

        const optsDiv = document.getElementById('q-options');
        const allOpts = [q.answer, ...q.distractors].sort(() => Math.random() - 0.5);

        optsDiv.innerHTML = allOpts.map(opt => `<button class="opt-btn">${opt}</button>`).join('');

        // Bind answers
        optsDiv.querySelectorAll('.opt-btn').forEach(btn => {
            btn.onclick = () => {
                if (btn.textContent === q.answer) {
                    this.addPlanks(5);
                    this.score += 100;
                    this.showFloatText("✅ +5 Planks");
                } else {
                    this.showFloatText("❌ missed!");
                }
                modal.style.display = 'none';
                this.resumeGame();
            };
        });

        modal.style.display = 'flex';
    }

    triggerGap() {
        // In a real 3D runner, this would be an object
        // Here we simulate "building"
        if (this.planks > 0) {
            this.planks--;
            this.updateHUD();
            this.createBridgeEffect();
        } else {
            // No planks to build shortcut! Slow down or penalty
            // For now just visual message
            this.showFloatText("⚠️ No planks!");
        }
    }

    addPlanks(num) {
        this.planks += num;
        this.updateHUD();
        this.renderPlankStack();
    }

    renderPlankStack() {
        const stack = document.getElementById('plank-stack');
        // Visual cap at 10 to avoid huge stacks
        const visualCount = Math.min(this.planks, 10);
        stack.innerHTML = Array(visualCount).fill('<div class="plank"></div>').join('');
    }

    updateHUD() {
        document.getElementById('plank-count').textContent = this.planks;
        document.getElementById('score-count').textContent = this.score;
    }

    pauseGame() {
        this.isRunning = false;
        document.getElementById('track').style.animationPlayState = 'paused';
    }

    resumeGame() {
        this.isRunning = true;
        this.gameLoop();
    }

    showFloatText(text) {
        // simple toast
    }

    createBridgeEffect() {
        // Visual effect of placing a plank under feet
    }

    completeLevel() {
        this.isRunning = false;
        const config = this.levelConfig[this.level];

        // Award Certificate
        if (config.award) {
            ProfileStore.addCertificate({
                id: `cert_lvl_${this.level}`,
                title: config.award,
                level: this.level
            });

            const notif = document.getElementById('cert-notify');
            notif.innerHTML = `🌟 LEVEL COMPLETE! 🌟<br>Unlocked: ${config.award}`;
            notif.style.display = 'block';
        }

        // Progress
        if (this.level < 5) this.level++;
        this.saveProgress();

        setTimeout(() => {
            alert("Level Complete! Ready for the next challenge?");
            location.reload(); // Simple reload to reset state for next level setup
        }, 3000);
    }
}

export function createGame(container, config) {
    return new IeltsRunnerGame(container, config);
}
