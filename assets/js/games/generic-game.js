/* Generic Game Template */
const { GameBase } = window.UEAH_GAME_ENGINE;

const GENERIC_PROMPTS = [
    {
        prompt: "Pick the strongest warm-up move for this challenge.",
        choices: ["Look for patterns", "Mash random buttons", "Ignore the clues"],
        correct: 0,
        feedback: "Nice call. Pattern spotting is the fastest way in.",
    },
    {
        prompt: "What keeps your score climbing?",
        choices: ["Quick accurate answers", "Slow guessing", "Skipping every round"],
        correct: 0,
        feedback: "Exactly. Accuracy with momentum beats panic clicks.",
    },
    {
        prompt: "How should this stage feel?",
        choices: ["Focused and playful", "Flat and confusing", "Silent and static"],
        correct: 0,
        feedback: "Yes. Every game should feel alive and inviting.",
    },
    {
        prompt: "What is the best comeback move after a mistake?",
        choices: ["Reset and refocus", "Quit the round", "Spam the same answer"],
        correct: 0,
        feedback: "Strong recovery. Calm resets turn into streaks.",
    },
    {
        prompt: "Which upgrade makes a game more memorable?",
        choices: ["Clear feedback and motion", "Tiny buttons", "No visual rhythm"],
        correct: 0,
        feedback: "Exactly. Feedback and motion make the whole stage feel responsive.",
    },
];

class GenericGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.round = 0;
        this.questions = [];
        this.currentPrompt = null;
    }

    async init() {
        await this.init3D();

        this.questions = [...GENERIC_PROMPTS]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        this.container.innerHTML = `
            <div class="generic-game-stage">
                ${this.renderHUD()}
                <div class="generic-hero">
                    <div class="generic-hero__icon">${this.config.emoji || "🎮"}</div>
                    <div>
                        <div class="generic-hero__eyebrow">Interactive preview mode</div>
                        <h2 class="generic-hero__title">${this.config.title}</h2>
                        <p class="generic-hero__text">${this.config.description}</p>
                    </div>
                </div>

                <div class="generic-mission-card">
                    <div class="generic-mission-card__header">
                        <span class="generic-pill">Round <span id="generic-round-num">1</span> / ${this.questions.length}</span>
                        <span class="generic-pill">Build your combo</span>
                    </div>
                    <h3 class="generic-prompt" id="generic-prompt">Press start to begin the warm-up challenge.</h3>
                    <div class="generic-actions" id="generic-actions">
                        <button class="generic-choice" data-choice="0" disabled>Choice A</button>
                        <button class="generic-choice" data-choice="1" disabled>Choice B</button>
                        <button class="generic-choice" data-choice="2" disabled>Choice C</button>
                    </div>
                    <p class="generic-log" id="generic-log">This mode keeps the fallback stage lively while a full custom game is being built.</p>
                </div>
            </div>
        `;

        this.injectStyles();
        this.bindChoiceHandlers();

        const geometry = new THREE.IcosahedronGeometry(0.8, 0);
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        this.threeHelper.addFloatingObject(geometry, material, 9);

        this.showStartOverlay();
    }

    injectStyles() {
        if (this.container.querySelector("[data-generic-game-style]")) return;

        const style = document.createElement("style");
        style.dataset.genericGameStyle = "true";
        style.textContent = `
            .generic-game-stage {
                position: relative;
                z-index: 1;
                display: grid;
                gap: 18px;
                min-height: 100%;
            }

            .generic-hero,
            .generic-mission-card {
                position: relative;
                z-index: 1;
                border-radius: 22px;
                border: 1px solid rgba(255, 255, 255, .14);
                background: rgba(12, 16, 30, .40);
                backdrop-filter: blur(12px);
            }

            .generic-hero {
                display: flex;
                align-items: center;
                gap: 18px;
                padding: 18px;
            }

            .generic-hero__icon {
                font-size: 64px;
                line-height: 1;
            }

            .generic-hero__eyebrow {
                margin-bottom: 8px;
                color: rgba(255, 255, 255, .72);
                font-size: 12px;
                font-weight: 800;
                letter-spacing: .12em;
                text-transform: uppercase;
            }

            .generic-hero__title {
                margin: 0 0 8px;
                color: #fff;
                font-size: clamp(26px, 4vw, 36px);
            }

            .generic-hero__text,
            .generic-log {
                margin: 0;
                color: rgba(255, 255, 255, .78);
                line-height: 1.6;
            }

            .generic-mission-card {
                padding: 22px;
            }

            .generic-mission-card__header,
            .generic-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .generic-mission-card__header {
                margin-bottom: 18px;
            }

            .generic-pill {
                display: inline-flex;
                align-items: center;
                padding: 8px 12px;
                border-radius: 999px;
                background: rgba(255, 255, 255, .08);
                border: 1px solid rgba(255, 255, 255, .12);
                color: #fff;
                font-size: 12px;
                font-weight: 800;
                letter-spacing: .08em;
                text-transform: uppercase;
            }

            .generic-prompt {
                margin: 0 0 18px;
                color: #fff;
                font-size: clamp(22px, 3vw, 30px);
                line-height: 1.25;
            }

            .generic-actions {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                margin-bottom: 16px;
            }

            .generic-choice {
                padding: 16px;
                border: 1px solid rgba(255, 255, 255, .14);
                border-radius: 18px;
                background: rgba(255, 255, 255, .08);
                color: #fff;
                font: inherit;
                font-weight: 700;
                text-align: left;
                cursor: pointer;
                transition: transform .16s ease, border-color .16s ease, background .16s ease;
            }

            .generic-choice:hover:not(:disabled) {
                transform: translateY(-2px);
                border-color: rgba(255, 255, 255, .28);
                background: rgba(255, 255, 255, .12);
            }

            .generic-choice:disabled {
                opacity: .5;
                cursor: not-allowed;
            }

            @media (max-width: 720px) {
                .generic-hero,
                .generic-actions {
                    grid-template-columns: 1fr;
                    flex-direction: column;
                }
            }
        `;

        this.container.appendChild(style);
    }

    bindChoiceHandlers() {
        this.container.querySelectorAll(".generic-choice").forEach((button) => {
            button.addEventListener("click", () => {
                if (!this.isRunning) return;
                const choiceIndex = Number(button.dataset.choice);
                this.handleChoice(choiceIndex, button);
            });
        });
    }

    start() {
        super.start();
        this.round = 0;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.updateScoreDisplay();
        this.updateComboDisplay();
        this.showFeedback("Preview mode started", "info", 1000);
        this.loadPrompt();
    }

    loadPrompt() {
        this.currentPrompt = this.questions[this.round];
        if (!this.currentPrompt) {
            super.end();
            return;
        }

        this.container.querySelector("#generic-round-num").textContent = this.round + 1;
        this.container.querySelector("#generic-prompt").textContent = this.currentPrompt.prompt;
        this.container.querySelector("#generic-log").textContent = "Choose the strongest answer to keep your streak alive.";

        this.container.querySelectorAll(".generic-choice").forEach((button, index) => {
            button.disabled = false;
            button.textContent = this.currentPrompt.choices[index];
            button.style.borderColor = "rgba(255, 255, 255, .14)";
            button.style.background = "rgba(255, 255, 255, .08)";
        });
    }

    handleChoice(choiceIndex, button) {
        const isCorrect = choiceIndex === this.currentPrompt.correct;
        const log = this.container.querySelector("#generic-log");

        this.container.querySelectorAll(".generic-choice").forEach((choiceButton) => {
            choiceButton.disabled = true;
        });

        if (isCorrect) {
            this.incrementCombo();
            const earned = this.addScore(120);
            this.showScoreBurst(`+${earned}`);
            this.showFeedback("Great read", "success", 900);
            button.style.borderColor = "rgba(0, 255, 136, .35)";
            button.style.background = "rgba(0, 255, 136, .14)";
            log.textContent = this.currentPrompt.feedback;
        } else {
            this.resetCombo();
            this.pulseStage("error");
            this.showFeedback("Try the stronger option", "warning", 900);
            button.style.borderColor = "rgba(255, 107, 107, .35)";
            button.style.background = "rgba(255, 107, 107, .14)";
            log.textContent = "That answer had less impact. Watch the clues and go again next round.";
        }

        this.round += 1;
        this.schedule(() => this.loadPrompt(), 1100);
    }
}

export function createGame(container, config) {
    return new GenericGame(container, config);
}
