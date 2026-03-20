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

const AGE_LABELS = {
    "0-3": "Ages 0-3",
    "4-7": "Ages 4-7",
    "8-10": "Ages 8-10",
    "11-12": "Ages 11-12",
    "13-18": "Ages 13-18",
    featured: "Featured",
};

const SKILL_LABELS = {
    vocabulary: "Vocabulary",
    listening: "Listening",
    spelling: "Spelling",
    grammar: "Grammar",
    speaking: "Speaking",
    comprehensive: "Comprehensive",
};

const AGE_THEMES = {
    "0-3": { accent: "#ff8a65", accent2: "#ffd54f", accentGlow: "rgba(255, 138, 101, 0.38)", accentSoft: "rgba(255, 213, 79, 0.18)" },
    "4-7": { accent: "#ff6b6b", accent2: "#ffd166", accentGlow: "rgba(255, 107, 107, 0.34)", accentSoft: "rgba(255, 209, 102, 0.18)" },
    "8-10": { accent: "#4dabf7", accent2: "#845ef7", accentGlow: "rgba(77, 171, 247, 0.34)", accentSoft: "rgba(132, 94, 247, 0.18)" },
    "11-12": { accent: "#00b894", accent2: "#6c5ce7", accentGlow: "rgba(0, 184, 148, 0.34)", accentSoft: "rgba(108, 92, 231, 0.18)" },
    "13-18": { accent: "#9c36ff", accent2: "#ff6b6b", accentGlow: "rgba(156, 54, 255, 0.36)", accentSoft: "rgba(255, 107, 107, 0.16)" },
    featured: { accent: "#f4b400", accent2: "#ff6ab3", accentGlow: "rgba(244, 180, 0, 0.34)", accentSoft: "rgba(255, 106, 179, 0.18)" },
    default: { accent: "#6b66ff", accent2: "#ff6ab3", accentGlow: "rgba(107, 102, 255, 0.34)", accentSoft: "rgba(255, 106, 179, 0.18)" },
};

function getTheme(config = {}) {
    return AGE_THEMES[config.age] || AGE_THEMES.default;
}

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
        this.timeouts = new Set();
        this.timerWarningShown = false;
        this.theme = getTheme(config);

        this.applyTheme();
    }

    applyTheme() {
        this.container.style.setProperty("--game-accent", this.theme.accent);
        this.container.style.setProperty("--game-accent-2", this.theme.accent2);
        this.container.style.setProperty("--game-accent-glow", this.theme.accentGlow);
        this.container.style.setProperty("--game-accent-soft", this.theme.accentSoft);
    }

    schedule(fn, delay) {
        const timeoutId = setTimeout(() => {
            this.timeouts.delete(timeoutId);
            fn();
        }, delay);
        this.timeouts.add(timeoutId);
        return timeoutId;
    }

    clearScheduledTasks() {
        this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        this.timeouts.clear();
    }

    emitStatus(label, message, kind = "ready") {
        this.container.dispatchEvent(new CustomEvent("ueah:game-status", {
            bubbles: true,
            detail: { label, message, kind },
        }));
    }

    ensureEffectsLayer() {
        let ambientLayer = this.container.querySelector(".game-ambient-layer");
        if (!ambientLayer) {
            ambientLayer = document.createElement("div");
            ambientLayer.className = "game-ambient-layer";
            ambientLayer.setAttribute("aria-hidden", "true");
            ambientLayer.innerHTML = `
                <span class="game-ambient-orb game-ambient-orb--one"></span>
                <span class="game-ambient-orb game-ambient-orb--two"></span>
                <span class="game-ambient-orb game-ambient-orb--three"></span>
                <span class="game-ambient-star game-ambient-star--one"></span>
                <span class="game-ambient-star game-ambient-star--two"></span>
                <span class="game-ambient-star game-ambient-star--three"></span>
                <div class="game-ambient-grid"></div>
            `;
            this.container.appendChild(ambientLayer);
        }

        let feedbackStack = this.container.querySelector(".game-feedback-stack");
        if (!feedbackStack) {
            feedbackStack = document.createElement("div");
            feedbackStack.className = "game-feedback-stack";
            feedbackStack.setAttribute("aria-live", "polite");
            this.container.appendChild(feedbackStack);
        }

        let burstLayer = this.container.querySelector(".game-score-burst-layer");
        if (!burstLayer) {
            burstLayer = document.createElement("div");
            burstLayer.className = "game-score-burst-layer";
            burstLayer.setAttribute("aria-hidden", "true");
            this.container.appendChild(burstLayer);
        }

        return { ambientLayer, feedbackStack, burstLayer };
    }

    showFeedback(message, tone = "info", duration = 1600) {
        const layers = this.ensureEffectsLayer();
        if (!layers || !message) return;

        const chip = document.createElement("div");
        chip.className = `game-feedback-chip is-${tone}`;
        chip.textContent = message;
        layers.feedbackStack.appendChild(chip);

        requestAnimationFrame(() => chip.classList.add("is-visible"));

        this.schedule(() => {
            chip.classList.remove("is-visible");
            this.schedule(() => chip.remove(), 220);
        }, duration);
    }

    showScoreBurst(text, x = null, y = null, tone = "success") {
        const layers = this.ensureEffectsLayer();
        if (!layers || !text) return;

        const burst = document.createElement("div");
        burst.className = `game-score-burst is-${tone}`;
        burst.textContent = text;

        if (x != null && y != null) {
            burst.style.left = `${x}px`;
            burst.style.top = `${y}px`;
        } else {
            burst.classList.add("is-centered");
        }

        layers.burstLayer.appendChild(burst);
        requestAnimationFrame(() => burst.classList.add("is-visible"));
        this.schedule(() => burst.remove(), 900);
    }

    pulseStage(tone = "success") {
        this.container.classList.remove("is-pulse-success", "is-pulse-warning", "is-pulse-error");
        this.container.classList.add(`is-pulse-${tone}`);
        this.schedule(() => {
            this.container.classList.remove("is-pulse-success", "is-pulse-warning", "is-pulse-error");
        }, 550);
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

    // Generic Start Overlay for all games
    showStartOverlay() {
        if (this.container.querySelector(".game-start-overlay")) return;

        const ageLabel = AGE_LABELS[this.config.age] || "All ages";
        const skillLabel = SKILL_LABELS[this.config.skill] || "Skill challenge";
        const difficulty = Math.max(1, Math.min(5, Number(this.config.difficulty) || 1));
        const overlay = document.createElement("div");
        overlay.className = "game-start-overlay";
        overlay.dataset.gameStartOverlay = "true";
        overlay.innerHTML = `
            <div class="start-content">
                <div class="start-icon">${this.config.emoji || '🎮'}</div>
                <h2 class="start-title">${this.config.name || 'Ready?'}</h2>
                <p class="start-description">${this.config.description || 'Tap the button to begin!'}</p>
                <button class="btn btn--primary start-btn">START GAME</button>
            </div>
            <style>
                .game-start-overlay {
                    position: absolute; inset: 0; padding: 24px;
                    background: linear-gradient(180deg, rgba(9,12,24,0.82), rgba(9,12,24,0.94));
                    display: flex; align-items: center; justify-content: center;
                    z-index: 1000; color: white; border-radius: 24px;
                    backdrop-filter: blur(18px);
                }
                .start-content {
                    width: min(520px, 100%);
                    padding: 28px;
                    text-align: center;
                    border-radius: 28px;
                    border: 1px solid rgba(255,255,255,0.16);
                    background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
                    box-shadow: 0 28px 60px rgba(0,0,0,0.3);
                    animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .start-icon { font-size: 88px; margin-bottom: 18px; }
                .start-title { font-size: 34px; margin-bottom: 12px; }
                .start-description { margin: 0 auto 22px; max-width: 30ch; line-height: 1.6; color: rgba(255,255,255,0.78); }
                .start-btn { padding: 15px 40px; font-size: 18px; border-radius: 999px; cursor: pointer; background: linear-gradient(135deg, #00b894, #6c5ce7); border: none; color: white; font-weight: 800; box-shadow: 0 12px 30px rgba(0,184,148,0.28); }
                @keyframes pop { 0% { transform: scale(0.92); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
            </style>
        `;
        this.container.appendChild(overlay);
        this.emitStatus(
            "Ready to launch",
            `${this.config.title || "This game"} is set up and waiting for you to begin.`,
            "ready"
        );
        overlay.querySelector('.start-btn').onclick = () => {
            overlay.remove();
            this.start();
        };
    }

    async init() {
        // Load game data, set up UI
    }

    start() {
        this.applyTheme();
        this.ensureEffectsLayer();
        this.container.classList.add("is-game-live");
        this.container.classList.remove("is-game-complete");
        this.container.querySelector(".game-results-overlay")?.remove();

        this.isRunning = true;
        this.isPaused = false;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.startTime = Date.now();
        this.endTime = null;
        this.timerWarningShown = false;

        this.updateScoreDisplay();
        this.updateComboDisplay();

        if (this.config.hasTimer && this.config.timerDuration) {
            this.timer = new GameTimer(
                this.config.timerDuration,
                (remaining) => this.onTimerTick(remaining),
                () => this.end()
            );
            this.timer.start();
        }

        this.showFeedback(this.config.hasTimer ? "Stage live - race the clock" : "Stage live - have fun", "info", 1200);
        this.emitStatus(
            "Game live",
            `${this.config.title || "The game"} has started. Build momentum and chase your best run.`,
            "active"
        );
    }

    pause() {
        this.isPaused = true;
        if (this.timer) this.timer.pause();

        this.emitStatus(
            "Paused",
            `${this.config.title || "This game"} is paused. Jump back in whenever you are ready.`,
            "warning"
        );
    }

    resume() {
        this.isPaused = false;
        if (this.timer) this.timer.resume();

        this.emitStatus(
            "Back in action",
            `${this.config.title || "This game"} is running again.`,
            "active"
        );
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        if (this.timer) this.timer.stop();
        this.container.classList.remove("is-game-live");
        this.container.classList.add("is-game-complete");

        // Save score and check for high score
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }

    cleanup() {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }
        if (this.threeHelper) {
            this.threeHelper.cleanup();
            this.threeHelper = null;
        }
        this.clearScheduledTasks();
        this.confetti.cleanup();
        this.isRunning = false;
        this.isPaused = false;
        this.container.classList.remove("is-game-live", "is-game-complete", "is-pulse-success", "is-pulse-warning", "is-pulse-error");
    }

    // Score methods
    addScore(points, multiplier = 1) {
        const earned = Math.round(points * multiplier * (1 + this.combo * 0.1));
        this.score += earned;
        this.updateScoreDisplay();
        return earned;
    }

    incrementCombo() {
        this.combo++;
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
        this.updateComboDisplay();

        if (this.combo > 0 && this.combo % 3 === 0) {
            this.showFeedback(`${this.combo}x combo streak`, "success", 1200);
            this.pulseStage("success");
        }
    }

    resetCombo() {
        this.combo = 0;
        this.updateComboDisplay();
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

        if (remaining <= 10 && !this.timerWarningShown) {
            this.timerWarningShown = true;
            this.showFeedback("Final 10 seconds", "warning", 1000);
            this.emitStatus(
                "Final countdown",
                `Only ${remaining} seconds left. Finish strong.`,
                "warning"
            );
            this.pulseStage("warning");
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.max(0, seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    // Save score and return if it's a new high score
    saveScore() {
        if (!window.UEAH_GAME_SCORES) return false;

        const gameSlug = this.config.slug;
        if (!gameSlug) return false;

        const isHighScore = window.UEAH_GAME_SCORES.saveGameScore(gameSlug, this.score, {
            combo: this.maxCombo,
            duration: this.startTime && this.endTime ? this.endTime - this.startTime : 0,
        });

        return isHighScore;
    }

    // Show results screen
    showResults(isHighScore) {
        const safeHighScore = Boolean(isHighScore);
        const duration = Math.round(((this.endTime || Date.now()) - (this.startTime || Date.now())) / 1000);

        // Trigger confetti for high scores! 🎉
        if (safeHighScore && this.score > 0) {
            this.confetti.explode();
            this.showFeedback("Personal best unlocked", "success", 1500);
        } else {
            this.showFeedback("Round complete", "info", 1000);
        }

        const resultsHtml = `
      <div class="game-results ${safeHighScore ? "is-high-score" : ""}">
        <div class="results-header">
          ${isHighScore ? '<div class="high-score-badge">🏆 NEW HIGH SCORE! 🏆</div>' : ""}
          <div class="results-kicker">${safeHighScore ? "Personal best" : "Session recap"}</div>
          <h2 class="results-title">${safeHighScore ? "New High Score" : "Round Complete"}</h2>
          <p class="results-summary">${safeHighScore
            ? "You set a new benchmark. Keep that rhythm and see how far you can push it."
            : "Solid progress. Reset the stage and go again while the pattern is fresh."}</p>
        </div>
        <div class="results-ribbons">
          <span class="results-ribbon">${AGE_LABELS[this.config.age] || "All ages"}</span>
          <span class="results-ribbon">${SKILL_LABELS[this.config.skill] || "Skill play"}</span>
          <span class="results-ribbon">${this.config.hasTimer ? "Timed run" : "Free play"}</span>
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
            Animations.bounce(overlay.querySelector(".game-results"), 1.02, 220);
        });

        this.emitStatus(
            safeHighScore ? "New high score" : "Round complete",
            `${this.config.title || "This game"} is finished. Review your stats and jump back in when ready.`,
            safeHighScore ? "success" : "ready"
        );
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

    // Sound effect helper (alias or fallback for playSound)
    playSound(effect) {
        // Most games use 'success' or 'error'
        if (effect === 'success') this.speak("Great!");
        else if (effect === 'error') this.speak("Try again!");
        else this.speak(effect);
    }

    // Update score display
    updateScoreDisplay() {
        const scoreEl = this.container.querySelector("[data-game-score]");
        if (scoreEl) {
            scoreEl.textContent = this.score;
            Animations.bounce(scoreEl, 1.08, 150);
        }
    }

    updateComboDisplay() {
        const comboEl = this.container.querySelector("[data-game-combo]");
        const comboPanel = comboEl?.closest(".hud-combo");
        if (!comboEl || !comboPanel) return;

        comboEl.textContent = `${this.combo}x`;
        comboPanel.classList.toggle("is-active", this.combo > 0);
    }

    // Render game HUD
    renderHUD() {
        return `
      <div class="game-hud">
        <div class="hud-score">
          <span class="hud-label">Score</span>
          <span class="hud-value" data-game-score>${this.score}</span>
        </div>
        <div class="hud-combo ${this.combo > 0 ? "is-active" : ""}">
          <span class="hud-value" data-game-combo>${this.combo}x</span>
          <span class="hud-label">Combo</span>
        </div>
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
        this.handleResize = () => this.onResize();
        this.handleMouseMove = (e) => this.onMouseMove(e);

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

        window.addEventListener('resize', this.handleResize);
        this.container.addEventListener('mousemove', this.handleMouseMove);

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
        window.removeEventListener('resize', this.handleResize);
        this.container?.removeEventListener('mousemove', this.handleMouseMove);
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
