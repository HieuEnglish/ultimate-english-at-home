/* assets/js/games/engine.js
   UEAH Game Engine - Core framework for all games
   
   Provides:
   - GameBase class with lifecycle (init, start, end, cleanup)
   - Timer management (optional for younger ages)
   - Score tracking and combo system
   - Sound effects via TTS
   - Animation helpers (confetti, shake, glow, bounce)
   - Pause/resume functionality
*/

// Confetti explosion for high scores 🎉
class ConfettiExplosion {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.colors = [
            "#ff6b6b", "#4ecdc4", "#ffe66d", "#95e1d3",
            "#f38181", "#aa96da", "#fcbad3", "#a8d8ea",
            "#6c5ce7", "#00cec9", "#fdcb6e", "#e17055"
        ];
    }

    explode(x, y, count = 100) {
        const rect = this.container.getBoundingClientRect();
        const centerX = x || rect.width / 2;
        const centerY = y || rect.height / 3;

        for (let i = 0; i < count; i++) {
            this.createParticle(centerX, centerY);
        }

        // Cleanup after animation
        setTimeout(() => this.cleanup(), 3000);
    }

    createParticle(x, y) {
        const particle = document.createElement("div");
        particle.className = "confetti-particle";
        particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${this.colors[Math.floor(Math.random() * this.colors.length)]};
      left: ${x}px;
      top: ${y}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      pointer-events: none;
      z-index: 1000;
    `;

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 10;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 10;
        const rotation = Math.random() * 360;
        const rotationSpeed = Math.random() * 10 - 5;

        this.container.appendChild(particle);
        this.particles.push(particle);

        let frame = 0;
        let currentX = x;
        let currentY = y;
        let currentVY = vy;
        let currentRotation = rotation;

        const animate = () => {
            frame++;
            currentX += vx * 0.95;
            currentVY += 0.5; // gravity
            currentY += currentVY;
            currentRotation += rotationSpeed;

            particle.style.left = currentX + "px";
            particle.style.top = currentY + "px";
            particle.style.transform = `rotate(${currentRotation}deg)`;
            particle.style.opacity = Math.max(0, 1 - frame / 60);

            if (frame < 60 && currentY < this.container.offsetHeight + 50) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        requestAnimationFrame(animate);
    }

    cleanup() {
        this.particles.forEach((p) => p.remove());
        this.particles = [];
    }
}

// Animation helpers
const Animations = {
    // Shake an element
    shake(element, intensity = 5, duration = 300) {
        const originalTransform = element.style.transform;
        const start = performance.now();

        const animate = (now) => {
            const elapsed = now - start;
            if (elapsed >= duration) {
                element.style.transform = originalTransform;
                return;
            }

            const t = elapsed / duration;
            const decay = 1 - t;
            const x = (Math.random() - 0.5) * 2 * intensity * decay;
            const y = (Math.random() - 0.5) * 2 * intensity * decay;
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    },

    // Bounce effect
    bounce(element, scale = 1.2, duration = 300) {
        element.style.transition = `transform ${duration / 2}ms ease-out`;
        element.style.transform = `scale(${scale})`;

        setTimeout(() => {
            element.style.transition = `transform ${duration / 2}ms ease-in`;
            element.style.transform = "scale(1)";
        }, duration / 2);

        setTimeout(() => {
            element.style.transition = "";
        }, duration);
    },

    // Glow pulse
    glow(element, color = "#00ff88", duration = 500) {
        element.style.transition = `box-shadow ${duration / 2}ms ease`;
        element.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}`;

        setTimeout(() => {
            element.style.boxShadow = "";
        }, duration);
    },

    // Fade in
    fadeIn(element, duration = 300) {
        element.style.opacity = "0";
        element.style.transition = `opacity ${duration}ms ease`;
        requestAnimationFrame(() => {
            element.style.opacity = "1";
        });
    },

    // Success flash (green)
    flashSuccess(element) {
        element.classList.add("game-success-flash");
        setTimeout(() => element.classList.remove("game-success-flash"), 500);
    },

    // Error flash (red)
    flashError(element) {
        element.classList.add("game-error-flash");
        setTimeout(() => element.classList.remove("game-error-flash"), 500);
    },
};

// Timer component
class GameTimer {
    constructor(duration, onTick, onEnd) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onEnd = onEnd;
        this.interval = null;
        this.isPaused = false;
    }

    start() {
        this.remaining = this.duration;
        this.isPaused = false;
        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this.remaining--;
                if (this.onTick) this.onTick(this.remaining);
                if (this.remaining <= 0) {
                    this.stop();
                    if (this.onEnd) this.onEnd();
                }
            }
        }, 1000);
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    addTime(seconds) {
        this.remaining += seconds;
    }
}

// Base game class
class GameBase {
    constructor(container, config = {}) {
        this.container = container;
        this.config = config;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.timer = null;
        this.confetti = new ConfettiExplosion(container);
        this.startTime = null;
        this.endTime = null;
    }

    // Lifecycle methods (override in subclasses)
    async ensureThreeJS() {
        if (window.THREE) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error("Failed to load Three.js"));
            document.head.appendChild(script);
        });
    }

    async init3D() {
        await this.ensureThreeJS();
        this.threeHelper = new ThreeJSHelper(this.container);
    }

    async init() {
        // Load game data, set up UI
    }

    start() {
        this.isRunning = true;
        this.isPaused = false;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.startTime = Date.now();

        if (this.config.hasTimer && this.config.timerDuration) {
            this.timer = new GameTimer(
                this.config.timerDuration,
                (remaining) => this.onTimerTick(remaining),
                () => this.end()
            );
            this.timer.start();
        }
    }

    pause() {
        this.isPaused = true;
        if (this.timer) this.timer.pause();
    }

    resume() {
        this.isPaused = false;
        if (this.timer) this.timer.resume();
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        if (this.timer) this.timer.stop();

        // Save score and check for high score
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }

    cleanup() {
        if (this.timer) this.timer.stop();
        this.confetti.cleanup();
    }

    // Score methods
    addScore(points, multiplier = 1) {
        const earned = Math.round(points * multiplier * (1 + this.combo * 0.1));
        this.score += earned;
        return earned;
    }

    incrementCombo() {
        this.combo++;
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
    }

    resetCombo() {
        this.combo = 0;
    }

    // Timer tick handler (override if needed)
    onTimerTick(remaining) {
        const timerEl = this.container.querySelector("[data-game-timer]");
        if (timerEl) {
            timerEl.textContent = this.formatTime(remaining);
            // Add urgency styling when low
            if (remaining <= 10) {
                timerEl.classList.add("timer-urgent");
            }
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    // Save score and return if it's a new high score
    saveScore() {
        if (!window.UEAH_GAME_SCORES) return false;

        const gameSlug = this.config.slug;
        if (!gameSlug) return false;

        const isHighScore = window.UEAH_GAME_SCORES.saveGameScore(gameSlug, this.score, {
            combo: this.maxCombo,
            duration: this.endTime - this.startTime,
        });

        return isHighScore;
    }

    // Show results screen
    showResults(isHighScore) {
        const duration = Math.round((this.endTime - this.startTime) / 1000);

        // Trigger confetti for high scores! 🎉
        if (isHighScore && this.score > 0) {
            this.confetti.explode();
        }

        const resultsHtml = `
      <div class="game-results ${isHighScore ? "is-high-score" : ""}">
        <div class="results-header">
          ${isHighScore ? '<div class="high-score-badge">🏆 NEW HIGH SCORE! 🏆</div>' : ""}
          <h2 class="results-title">${isHighScore ? "Amazing!" : "Game Over!"}</h2>
        </div>
        <div class="results-stats">
          <div class="stat">
            <span class="stat-value">${this.score}</span>
            <span class="stat-label">Score</span>
          </div>
          <div class="stat">
            <span class="stat-value">${this.maxCombo}x</span>
            <span class="stat-label">Max Combo</span>
          </div>
          <div class="stat">
            <span class="stat-value">${this.formatTime(duration)}</span>
            <span class="stat-label">Time</span>
          </div>
        </div>
        <div class="results-actions">
          <button class="btn btn--primary game-play-again" data-action="restart">
            <span class="emoji">🔄</span> Play Again
          </button>
          <button class="btn game-back" data-action="back">
            <span class="emoji">←</span> Back to Games
          </button>
        </div>
      </div>
    `;

        const overlay = document.createElement("div");
        overlay.className = "game-results-overlay";
        overlay.innerHTML = resultsHtml;
        this.container.appendChild(overlay);

        // Animate in
        requestAnimationFrame(() => {
            overlay.classList.add("is-visible");
            if (isHighScore) {
                Animations.bounce(overlay.querySelector(".results-stats"));
            }
        });
    }

    // TTS helper (uses existing TTS system)
    speak(text, options = {}) {
        if (window.UEAH_TTS && typeof window.UEAH_TTS.speak === "function") {
            return window.UEAH_TTS.speak(text, options);
        }
        // Fallback to basic Web Speech API
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = options.rate || 0.9;
            utterance.pitch = options.pitch || 1;
            speechSynthesis.speak(utterance);
        }
    }

    // Update score display
    updateScoreDisplay() {
        const scoreEl = this.container.querySelector("[data-game-score]");
        if (scoreEl) {
            scoreEl.textContent = this.score;
            Animations.bounce(scoreEl, 1.1, 150);
        }
    }

    // Render game HUD
    renderHUD() {
        return `
      <div class="game-hud">
        <div class="hud-score">
          <span class="hud-label">Score</span>
          <span class="hud-value" data-game-score>${this.score}</span>
        </div>
        ${this.combo > 0 ? `
          <div class="hud-combo">
            <span class="hud-value" data-game-combo>${this.combo}x</span>
            <span class="hud-label">Combo</span>
          </div>
        ` : ""}
        ${this.config.hasTimer ? `
          <div class="hud-timer">
            <span class="hud-label">Time</span>
            <span class="hud-value" data-game-timer>${this.formatTime(this.config.timerDuration || 60)}</span>
          </div>
        ` : ""}
      </div>
    `;
    }
}

// Three.js Helper System
class ThreeJSHelper {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.clock = new THREE.Clock();
        this.animationFrameId = null;
        this.mouse = new THREE.Vector2();

        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.zIndex = '0'; // Behind UI
        this.renderer.domElement.style.pointerEvents = 'none';

        this.container.insertBefore(this.renderer.domElement, this.container.firstChild);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        this.scene.add(dirLight);

        window.addEventListener('resize', () => this.onResize());
        this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));

        this.animate();
    }

    onResize() {
        if (!this.container) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    onMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    addFloatingObject(geometry, material, count = 5) {
        for (let i = 0; i < count; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5 - 2);
            mesh.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
                initialY: mesh.position.y,
                floatOffset: Math.random() * Math.PI * 2
            };
            this.scene.add(mesh);
            this.objects.push(mesh);
        }
    }

    createExplosion(color) {
        // Simple particle system
        const geometry = new THREE.BufferGeometry();
        const count = 50;
        const positions = new Float32Array(count * 3);
        const velocities = [];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = 0; positions[i * 3 + 1] = 0; positions[i * 3 + 2] = 0;
            velocities.push({ x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5, z: (Math.random() - 0.5) * 0.5 });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: color, size: 0.2, transparent: true });
        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);

        this.objects.push({
            isParticle: true, mesh: particles, velocities, life: 1.0,
            update: () => {
                this.life -= 0.02;
                const pos = particles.geometry.attributes.position.array;
                for (let i = 0; i < count; i++) {
                    pos[i * 3] += velocities[i].x; pos[i * 3 + 1] += velocities[i].y; pos[i * 3 + 2] += velocities[i].z;
                }
                particles.geometry.attributes.position.needsUpdate = true;
                if (this.life <= 0) { this.scene.remove(particles); return false; }
                return true;
            }
        });
    }

    animate() {
        if (!this.renderer) return;
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        const time = this.clock.getElapsedTime();

        this.objects = this.objects.filter(obj => {
            if (obj.update) return obj.update();
            if (obj.isObject3D) {
                obj.rotation.x += obj.userData.rotSpeed.x;
                obj.rotation.y += obj.userData.rotSpeed.y;
                obj.position.y = obj.userData.initialY + Math.sin(time + obj.userData.floatOffset) * 0.5;
                obj.position.x += (this.mouse.x * 0.5 - obj.position.x) * 0.01;
            }
            return true;
        });

        this.renderer.render(this.scene, this.camera);
    }

    cleanup() {
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        if (this.renderer) {
            this.renderer.domElement.remove();
            this.renderer.dispose();
        }
    }
}

// Export for use in game modules
window.UEAH_GAME_ENGINE = {
    GameBase,
    GameTimer,
    ConfettiExplosion,
    Animations,
    ThreeJSHelper,
};
