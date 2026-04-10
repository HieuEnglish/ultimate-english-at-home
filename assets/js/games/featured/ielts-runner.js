/* assets/js/games/featured/ielts-runner.js
   IELTS BuildUp - Featured Campaign Game
   Style: Shortcut Run / Subway Surfers inspired 2.5D Runner
   
   Complete overhaul with:
   - Canvas-based 3D track rendering
   - 3-lane system with smooth transitions
   - Animated character with running animation
   - Parallax backgrounds
   - Visual obstacles and collectibles
   - Particle effects
   - Polished UI
*/

import { getRandomQuestion } from '../../question-bank.js';

// Retrieve global store if available
const ProfileStore = window.UEAHProfileStore || {
    addCertificate: () => { },
    get: () => ({ certificates: [] })
};

// Inline fallback questions for extended gameplay
const FALLBACK_QUESTIONS = [
    { level: 1, type: 'vocab', question: '🐱 What animal is this?', answer: 'Cat', distractors: ['Dog', 'Bird'] },
    { level: 1, type: 'spelling', question: 'Spell: 🏠', answer: 'House', distractors: ['Hous', 'Howse'] },
    { level: 1, type: 'grammar', question: 'She ___ a girl.', answer: 'is', distractors: ['are', 'am'] },
    { level: 1, type: 'vocab', question: 'Opposite of night?', answer: 'Day', distractors: ['Dark', 'Moon'] },
    { level: 2, type: 'grammar', question: 'I ___ to school yesterday.', answer: 'went', distractors: ['go', 'going'] },
    { level: 2, type: 'vocab', question: 'A place with lots of books.', answer: 'Library', distractors: ['Kitchen', 'Garden'] },
    { level: 2, type: 'spelling', question: 'Correct: ___', answer: 'Beautiful', distractors: ['Beutiful', 'Beautifull'] },
    { level: 2, type: 'grammar', question: 'They ___ playing football.', answer: 'are', distractors: ['is', 'was'] },
    { level: 3, type: 'vocab', question: 'Synonym for happy?', answer: 'Joyful', distractors: ['Sad', 'Angry'] },
    { level: 3, type: 'grammar', question: 'I have ___ this before.', answer: 'done', distractors: ['did', 'do'] },
    { level: 3, type: 'spelling', question: 'Correct spelling?', answer: 'Necessary', distractors: ['Neccessary', 'Necesary'] },
    { level: 3, type: 'vocab', question: 'Antonym for brave?', answer: 'Cowardly', distractors: ['Strong', 'Bold'] },
    { level: 4, type: 'vocab', question: '\'Ubiquitous\' means...', answer: 'Everywhere', distractors: ['Rare', 'Hidden'] },
    { level: 4, type: 'grammar', question: 'Neither he ___ she came.', answer: 'nor', distractors: ['or', 'and'] },
    { level: 4, type: 'vocab', question: '\'Break the ice\' means...', answer: 'Start conversation', distractors: ['Freeze water', 'Be cold'] },
    { level: 4, type: 'spelling', question: 'Correct?', answer: 'Accommodate', distractors: ['Accomodate', 'Acomodate'] },
    { level: 5, type: 'vocab', question: '\'Ephemeral\' means...', answer: 'Short-lived', distractors: ['Eternal', 'Heavy'] },
    { level: 5, type: 'grammar', question: 'Had I known, I ___ helped.', answer: 'would have', distractors: ['will have', 'should'] },
    { level: 5, type: 'vocab', question: '\'Pragmatic\' means...', answer: 'Practical', distractors: ['Dreamy', 'Dramatic'] },
    { level: 5, type: 'spelling', question: 'Correct?', answer: 'Entrepreneur', distractors: ['Entreprenur', 'Enterpreneur'] },
    { level: 6, type: 'vocab', question: '\'Ambivalent\' means...', answer: 'Mixed feelings', distractors: ['Certain', 'Happy'] },
    { level: 6, type: 'grammar', question: 'Seldom ___ he arrive on time.', answer: 'does', distractors: ['do', 'is'] },
    { level: 6, type: 'vocab', question: '\'Taciturn\' means...', answer: 'Reserved', distractors: ['Talkative', 'Loud'] },
    { level: 6, type: 'spelling', question: 'Correct?', answer: 'Conscientious', distractors: ['Consciencious', 'Consientious'] },
    { level: 7, type: 'vocab', question: '\'Alleviate\' means...', answer: 'Reduce pain', distractors: ['Increase', 'Ignore'] },
    { level: 7, type: 'grammar', question: 'Not until later ___ she understand.', answer: 'did', distractors: ['does', 'was'] },
    { level: 7, type: 'vocab', question: '\'Disparate\' means...', answer: 'Very different', distractors: ['Similar', 'Equal'] },
    { level: 7, type: 'spelling', question: 'Correct?', answer: 'Surveillance', distractors: ['Surveilance', 'Survaliance'] },
    { level: 8, type: 'vocab', question: '\'Obsequious\' means...', answer: 'Overly submissive', distractors: ['Defiant', 'Brave'] },
    { level: 8, type: 'grammar', question: 'On no account ___ you enter.', answer: 'should', distractors: ['will', 'can'] },
];

const IELTS_LEVEL_BRIEFINGS = {
    1: { focus: "Starter control", note: "Warm up with basic lexis, spelling, and sentence control.", finish: "You locked in the core foundations for smoother higher-band runs." },
    2: { focus: "Core fluency", note: "Push everyday accuracy while the speed starts to climb.", finish: "Your control held through the first real pace increase." },
    3: { focus: "Band builder", note: "Mix sharper vocabulary with cleaner tense choices.", finish: "You kept the run stable as the language became less obvious." },
    4: { focus: "IELTS ridge", note: "Shift into exam-style choices with tighter precision under pressure.", finish: "That section felt much closer to an IELTS-style response pace." },
    5: { focus: "Proficiency push", note: "Advanced vocabulary and conditional grammar start showing up fast.", finish: "You handled a noticeably more academic and precise stage." },
    6: { focus: "Fluency under load", note: "Maintain accuracy while the track gets denser and faster.", finish: "You stayed composed while difficulty and decision speed both rose." },
    7: { focus: "Expert language", note: "Expect nuanced wording, sharper grammar traps, and less recovery time.", finish: "The advanced section held up because your decisions stayed disciplined." },
    8: { focus: "Champion summit", note: "Final-stage mastery. Precision, stamina, and calm execution matter most.", finish: "You completed the highest-pressure IELTS campaign stage in the game." }
};

const QUESTION_TYPE_META = {
    vocab: {
        badge: "Lexis Gate",
        helper: "Read for exact meaning, not just a familiar-looking word.",
        success: "Lexis secured.",
        warning: "Meaning drifted there. Read the word more precisely.",
        colors: ["#6a5cff", "#8f7bff"],
    },
    grammar: {
        badge: "Grammar Gate",
        helper: "Watch agreement, tense, and sentence logic before you tap.",
        success: "Structure held.",
        warning: "Grammar slipped. Rebuild the sentence logic.",
        colors: ["#00b894", "#55efc4"],
    },
    spelling: {
        badge: "Spelling Gate",
        helper: "Scan every letter pattern carefully before committing.",
        success: "Spelling locked in.",
        warning: "That form breaks on detail. Check the letter sequence.",
        colors: ["#ff9f43", "#ffd166"],
    },
    listening: {
        badge: "Listening Gate",
        helper: "Listen for the exact cue and avoid the tempting distractor.",
        success: "Listening cue nailed.",
        warning: "The cue was missed. Listen for the exact signal.",
        colors: ["#0984e3", "#74b9ff"],
    },
    default: {
        badge: "Knowledge Gate",
        helper: "Stay sharp and answer with control.",
        success: "Good decision.",
        warning: "Reset and take the next gate cleanly.",
        colors: ["#667eea", "#764ba2"],
    }
};

export class IeltsRunnerGame {
    constructor(container, config) {
        this.container = container;
        this.config = config || {};

        // Game State
        this.level = 1;
        this.planks = 0;
        this.score = 0;
        this.distance = 0;
        this.speed = 5;
        this.isRunning = false;
        this.isPaused = false;
        this.gameTime = 0;
        this.questionsAnswered = 0;
        this.questionsCorrect = 0;
        this.currentQuestionMeta = QUESTION_TYPE_META.default;
        this.currentQuestionTimeLimit = 10;
        this.lastQuestionResult = null;

        // Power-ups
        this.hasShield = false;
        this.shieldTimer = 0;
        this.speedBoost = false;
        this.speedBoostTimer = 0;
        this.hasMagnet = false;
        this.magnetTimer = 0;

        // Combo system
        this.combo = 0;
        this.maxCombo = 0;
        this.comboTimer = 0;

        // Screen effects
        this.shakeAmount = 0;
        this.flashAlpha = 0;
        this.flashColor = '#fff';

        // Player State
        this.lane = 1; // 0=left, 1=center, 2=right
        this.targetLane = 1;
        this.playerY = 0; // For jumping
        this.playerVelY = 0;
        this.isJumping = false;
        this.runFrame = 0;

        // Level Config - Beautiful gradient themes
        this.levelConfig = {
            1: {
                title: "Starters Valley",
                skyTop: "#87CEEB", skyBottom: "#E8F5E9",
                trackColor: "#4CAF50",
                length: 1000,
                award: "A1 Starters Certificate",
                bgMountain: "#2E7D32",
                weather: 'leaf', weatherRate: 0.05, weatherVx: 1, weatherVy: 1.5, weatherSize: 6
            },
            2: {
                title: "Movers Mountain",
                skyTop: "#81D4FA", skyBottom: "#B3E5FC",
                trackColor: "#00BCD4",
                length: 1500,
                award: "A2 Movers Certificate",
                bgMountain: "#00838F"
            },
            3: {
                title: "Flyers Sky",
                skyTop: "#FFF8E1", skyBottom: "#FFECB3",
                trackColor: "#FFC107",
                length: 2000,
                award: "B1 Flyers Certificate",
                bgMountain: "#FF8F00"
            },
            4: {
                title: "IELTS Ridge",
                skyTop: "#FFEBEE", skyBottom: "#FFCDD2",
                trackColor: "#F44336",
                length: 3000,
                award: "B2 Competent Certificate",
                bgMountain: "#C62828",
                weather: 'rain', weatherRate: 0.3, weatherVx: -0.5, weatherVy: 8, weatherSize: 2
            },
            5: {
                title: "Proficiency Peak",
                skyTop: "#EDE7F6", skyBottom: "#D1C4E9",
                trackColor: "#9C27B0",
                length: 5000,
                award: "C2 Mastery Certificate",
                bgMountain: "#6A1B9A",
                weather: 'snow', weatherRate: 0.15, weatherVx: -0.5, weatherVy: 2, weatherSize: 3
            },
            6: {
                title: "Sunset Bay",
                skyTop: "#FF6B35", skyBottom: "#FFC371",
                trackColor: "#FF8C00",
                length: 6000,
                award: "Advanced Fluency Certificate",
                bgMountain: "#CC5500",
                weather: 'leaf', weatherRate: 0.08, weatherVx: 1.5, weatherVy: 1, weatherSize: 5
            },
            7: {
                title: "Northern Lights",
                skyTop: "#0F2027", skyBottom: "#203A43",
                trackColor: "#00BFA5",
                length: 7500,
                award: "Expert Linguist Certificate",
                bgMountain: "#1A237E",
                weather: 'snow', weatherRate: 0.2, weatherVx: 0.5, weatherVy: 1.5, weatherSize: 3
            },
            8: {
                title: "Champions Summit",
                skyTop: "#1a1a2e", skyBottom: "#16213e",
                trackColor: "#FFD700",
                length: 10000,
                award: "🏆 Grand Master Certificate",
                bgMountain: "#0d1117",
                weather: 'sparkle', weatherRate: 0.1, weatherVx: 0, weatherVy: -1, weatherSize: 2
            }
        };

        // Obstacles and collectibles
        this.obstacles = [];
        this.particles = [];
        this.clouds = [];
        this.sceneryObjects = [];
        this.birds = [];
        this.weatherParticles = [];
        this.dustParticles = [];
        this.milestoneNext = 100;

        // Animation frame
        this.frameId = null;
        this.lastTime = 0;

        // Canvas refs
        this.canvas = null;
        this.ctx = null;
        this.bannerTimeout = null;
    }

    async init() {
        this.loadProgress();
        this.createDOM();
        this.injectStyles();
        this.initCanvas();
        this.initClouds();
        this.initScenery();
        this.initBirds();
        this.bindEvents();
        this.updateHUD();
        this.renderStartScreen();
    }

    createDOM() {
        const levelConf = this.levelConfig[this.level];
        const levelBrief = IELTS_LEVEL_BRIEFINGS[this.level] || IELTS_LEVEL_BRIEFINGS[1];

        // Generate Campaign Map HTML
        let mapHtml = '<div class="campaign-map">';
        for (let i = 1; i <= 8; i++) {
            const status = i < this.level ? 'completed' : (i === this.level ? 'current' : 'locked');
            const conf = this.levelConfig[i];
            mapHtml += `
                <div class="map-node ${status}" data-level="${i}">
                    <div class="node-circle" style="--track-color: ${conf.trackColor}">
                        ${status === 'completed' ? '✓' : (status === 'locked' ? '🔒' : i)}
                    </div>
                    <div class="node-label">Lvl ${i}</div>
                </div>
            `;
            if (i < 8) mapHtml += '<div class="map-line"></div>';
        }
        mapHtml += '</div>';

        this.container.innerHTML = `
            <div class="runner-game">
                <!-- Canvas Layer -->
                <canvas id="game-canvas" class="game-canvas"></canvas>
                
                <!-- UI Overlay -->
                <div class="ui-overlay">
                    <!-- HUD -->
                    <div class="hud">
                        <div class="hud-item hud-planks">
                            <span class="hud-icon">🧱</span>
                            <span class="hud-value" id="plank-count">0</span>
                        </div>
                        <div class="hud-item hud-level">
                            <span id="level-name">${levelConf.title}</span>
                        </div>
                        <div class="hud-item hud-score">
                            <span class="hud-icon">⭐</span>
                            <span class="hud-value" id="score-count">0</span>
                        </div>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="progress-container">
                        <div class="progress-bar" id="progress-bar"></div>
                        <div class="progress-label">
                            <span id="distance-text">0m</span> / ${levelConf.length}m
                        </div>
                    </div>
                    
                    <div class="runner-banner" id="runner-banner"></div>
                    
                    <div class="status-rail">
                        <div class="status-card">
                            <span class="status-label">Focus</span>
                            <strong class="status-value" id="focus-title">${levelBrief.focus}</strong>
                            <span class="status-note" id="focus-note">${levelBrief.note}</span>
                        </div>
                        <div class="status-card status-card--streak" id="streak-card">
                            <span class="status-label">Streak</span>
                            <strong class="status-value" id="streak-count">1x</strong>
                            <span class="status-note" id="streak-label">Build momentum</span>
                        </div>
                    </div>
                    
                    <!-- Start Screen -->
                    <div class="start-screen" id="start-screen">
                        <div class="start-content">
                            <div class="game-logo">🏆</div>
                            <h1 class="game-title">IELTS BuildUp</h1>
                            <p class="game-tagline">Collect Knowledge • Build Bridges • Master English</p>
                            
                            ${mapHtml}
                            
                            <div class="level-preview">
                                <div class="level-badge" style="background: ${levelConf.trackColor}">
                                    Level ${this.level}
                                </div>
                                <div class="level-info">
                                    <h2>${levelConf.title}</h2>
                                    <p>🎯 ${levelConf.length}m to complete</p>
                                    <div class="level-focus" id="start-focus-title">${levelBrief.focus}</div>
                                    <div class="level-focus-note" id="start-focus-note">${levelBrief.note}</div>
                                </div>
                            </div>
                            
                            <button class="play-btn" id="play-btn">
                                <span class="play-icon">▶</span>
                                START RUNNING
                            </button>
                            
                            <div class="controls-hint">
                                <div class="hint">⬅️➡️ Move</div>
                                <div class="hint">⬆️ Jump</div>
                                <div class="hint">📱 Swipe/Tap</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Question Modal -->
                    <div class="question-modal" id="question-modal">
                        <div class="question-box">
                            <div class="question-header">
                                <span class="question-badge" id="q-category">📚 Knowledge Gate</span>
                                <div class="question-timer" id="q-timer">
                                    <div class="timer-bar" id="timer-bar"></div>
                                </div>
                            </div>
                            <h3 class="question-text" id="q-text">Loading question...</h3>
                            <p class="question-helper" id="q-helper">Stay calm and choose the strongest answer.</p>
                            <div class="question-meta-line"><span id="q-pressure">Pressure: standard</span><span id="q-reward">Reward: +100</span></div>
                            <div class="question-options" id="q-options"></div>
                        </div>
                    </div>
                    
                    <!-- Level Complete Modal -->
                    <div class="level-complete-modal" id="level-complete">
                        <div class="complete-content">
                            <div class="complete-stars">⭐⭐⭐</div>
                            <h1>LEVEL COMPLETE!</h1>
                            <div class="complete-stats">
                                <div class="stat">Score: <span id="final-score">0</span></div>
                                <div class="stat">Questions: <span id="final-questions">0</span></div>
                                <div class="stat">Accuracy: <span id="final-accuracy">0%</span></div>
                                <div class="stat">Max Combo: <span id="final-combo">0x</span></div>
                            </div>
                            <div class="certificate-award" id="cert-award"></div>
                            <div class="complete-note" id="final-note"></div>
                            <div class="complete-note" id="final-rating"></div>
                            <button class="play-btn" id="next-level-btn">NEXT LEVEL →</button>
                        </div>
                    </div>
                    
                    <!-- Mobile Controls -->
                    <div class="mobile-controls" id="mobile-controls">
                        <button class="ctrl-btn ctrl-left" id="ctrl-left">◀</button>
                        <button class="ctrl-btn ctrl-jump" id="ctrl-jump">▲</button>
                        <button class="ctrl-btn ctrl-right" id="ctrl-right">▶</button>
                    </div>
                    
                    <!-- Floating Text Container -->
                    <div class="float-text-container" id="float-texts"></div>
                </div>
            </div>
        `;
    }

    injectStyles() {
        const levelConf = this.levelConfig[this.level];
        const style = document.createElement('style');
        style.id = 'runner-styles';
        style.textContent = `
            .runner-game {
                position: relative;
                width: 100%;
                height: 550px;
                border-radius: 20px;
                overflow: hidden;
                background: linear-gradient(180deg, ${levelConf.skyTop} 0%, ${levelConf.skyBottom} 100%);
                font-family: 'Segoe UI', system-ui, sans-serif;
            }
            
            /* Campaign Map */
            .campaign-map {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                margin-bottom: 25px;
                padding: 15px;
                background: rgba(255,255,255,0.6);
                border-radius: 50px;
                backdrop-filter: blur(5px);
            }
            .map-node {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                opacity: 0.6;
                transition: all 0.3s;
                position: relative;
            }
            .map-node.current, .map-node.completed { opacity: 1; }
            .map-node.current { transform: scale(1.1); }
            
            .node-circle {
                width: 40px; height: 40px;
                border-radius: 50%;
                background: #eee;
                display: flex; align-items: center; justify-content: center;
                font-weight: 800;
                color: #666;
                border: 3px solid #ddd;
                font-size: 16px;
            }
            .map-node.completed .node-circle {
                background: #4CAF50; color: white; border-color: #388E3C;
            }
            .map-node.current .node-circle {
                background: white; border-color: var(--track-color); 
                color: var(--track-color);
                box-shadow: 0 0 15px var(--track-color);
            }
            .map-node.locked .node-circle {
                background: #ddd; color: #999;
            }
            
            .node-label { font-size: 11px; font-weight: 700; color: #555; }
            
            .map-line {
                width: 25px; height: 3px; background: #ddd; margin-top: -15px;
            }
            
            .game-canvas {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
            }
            
            .ui-overlay {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            
            /* HUD */
            .hud {
                display: flex;
                justify-content: space-between;
                padding: 16px 20px;
                pointer-events: auto;
            }
            .hud-item {
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(10px);
                padding: 10px 18px;
                border-radius: 30px;
                color: white;
                font-weight: 700;
                font-size: 18px;
                display: flex;
                align-items: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            .hud-level {
                background: linear-gradient(135deg, ${levelConf.trackColor}, ${levelConf.bgMountain});
            }
            .hud-icon { font-size: 20px; }
            
            /* Progress Bar */
            .progress-container {
                position: absolute;
                top: 70px;
                left: 50%;
                transform: translateX(-50%);
                width: 200px;
                pointer-events: none;
            }
            .progress-bar {
                height: 6px;
                background: rgba(255,255,255,0.3);
                border-radius: 3px;
                overflow: hidden;
            }
            .progress-bar::after {
                content: '';
                display: block;
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #4CAF50, #8BC34A);
                border-radius: 3px;
                transition: width 0.3s;
            }
            .progress-label {
                text-align: center;
                font-size: 12px;
                color: rgba(0,0,0,0.6);
                margin-top: 4px;
                font-weight: 600;
            }
            .runner-banner {
                position: absolute;
                top: 106px;
                left: 50%;
                transform: translateX(-50%) translateY(-10px);
                min-width: 240px;
                max-width: min(520px, calc(100% - 40px));
                padding: 10px 18px;
                border-radius: 999px;
                background: rgba(10, 14, 32, 0.78);
                border: 1px solid rgba(255,255,255,0.14);
                color: white;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.01em;
                text-align: center;
                opacity: 0;
                transition: opacity 0.25s ease, transform 0.25s ease;
                pointer-events: none;
                z-index: 20;
                backdrop-filter: blur(14px);
                box-shadow: 0 18px 40px rgba(0,0,0,0.22);
            }
            .runner-banner.active {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            .runner-banner.success { background: rgba(31, 89, 52, 0.86); }
            .runner-banner.warning { background: rgba(115, 57, 24, 0.88); }
            .runner-banner.info { background: rgba(28, 56, 122, 0.86); }
            .status-rail {
                position: absolute;
                top: 142px;
                left: 50%;
                transform: translateX(-50%);
                display: grid;
                grid-template-columns: minmax(220px, 1fr) minmax(140px, 180px);
                gap: 12px;
                width: min(680px, calc(100% - 40px));
                pointer-events: none;
            }
            .status-card {
                display: flex;
                flex-direction: column;
                gap: 4px;
                padding: 12px 16px;
                border-radius: 18px;
                background: rgba(255,255,255,0.22);
                border: 1px solid rgba(255,255,255,0.2);
                box-shadow: 0 12px 32px rgba(0,0,0,0.12);
                backdrop-filter: blur(14px);
                color: #182033;
            }
            .status-card--streak.active {
                background: rgba(255, 232, 163, 0.92);
                border-color: rgba(255, 177, 66, 0.45);
                box-shadow: 0 14px 36px rgba(255, 177, 66, 0.22);
            }
            .status-label {
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: rgba(24, 32, 51, 0.62);
            }
            .status-value {
                font-size: 16px;
                font-weight: 800;
                line-height: 1.15;
            }
            .status-note {
                font-size: 12px;
                line-height: 1.35;
                color: rgba(24, 32, 51, 0.72);
            }
            
            /* Start Screen */
            .start-screen {
                position: absolute;
                inset: 0;
                background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
                backdrop-filter: blur(20px);
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: auto;
                z-index: 100;
            }
            .start-screen.hidden { display: none; }
            .start-content { text-align: center; padding: 20px; }
            .game-logo { font-size: 80px; margin-bottom: 10px; animation: bounce 2s infinite; }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
            .game-title {
                font-size: 42px;
                font-weight: 900;
                background: linear-gradient(135deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 0;
            }
            .game-tagline {
                color: #666;
                font-size: 16px;
                margin: 10px 0 30px;
            }
            .level-preview {
                display: flex;
                align-items: center;
                gap: 15px;
                background: white;
                padding: 15px 25px;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.1);
                margin-bottom: 30px;
            }
            .level-badge {
                padding: 10px 20px;
                border-radius: 25px;
                color: white;
                font-weight: 800;
                font-size: 14px;
            }
            .level-info h2 { margin: 0; font-size: 20px; color: #333; }
            .level-info p { margin: 5px 0 0; color: #888; font-size: 14px; }
            .level-focus {
                margin-top: 10px;
                display: inline-flex;
                align-items: center;
                padding: 6px 12px;
                border-radius: 999px;
                background: rgba(102,126,234,0.12);
                color: #4f46e5;
                font-size: 12px;
                font-weight: 800;
                letter-spacing: 0.03em;
                text-transform: uppercase;
            }
            .level-focus-note {
                margin-top: 8px;
                max-width: 34ch;
                color: #667085;
                font-size: 13px;
                line-height: 1.45;
            }
            
            .play-btn {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                color: white;
                padding: 18px 50px;
                font-size: 20px;
                font-weight: 800;
                border-radius: 50px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 10px 30px rgba(102,126,234,0.4);
                transition: all 0.3s;
                pointer-events: auto;
            }
            .play-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(102,126,234,0.5);
            }
            .play-btn:active { transform: translateY(0); }
            .play-icon { font-size: 24px; }
            
            .controls-hint {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-top: 25px;
                color: #888;
                font-size: 13px;
            }
            .hint {
                background: rgba(0,0,0,0.05);
                padding: 8px 16px;
                border-radius: 20px;
            }
            
            /* Question Modal */
            .question-modal {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.85);
                backdrop-filter: blur(10px);
                display: none;
                align-items: center;
                justify-content: center;
                pointer-events: auto;
                z-index: 200;
            }
            .question-modal.active { display: flex; }
            .question-box {
                background: white;
                padding: 30px 40px;
                border-radius: 24px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .question-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .question-badge {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 700;
            }
            .question-timer {
                width: 100px;
                height: 8px;
                background: #eee;
                border-radius: 4px;
                overflow: hidden;
            }
            .timer-bar {
                height: 100%;
                width: 100%;
                background: linear-gradient(90deg, #4CAF50, #8BC34A);
                transition: width 0.1s linear;
            }
            .timer-bar.warning { background: linear-gradient(90deg, #FF9800, #F44336); }
            .question-text {
                font-size: 22px;
                font-weight: 700;
                color: #333;
                margin: 0 0 25px;
                line-height: 1.4;
            }
            .question-helper {
                margin: -12px 0 20px;
                font-size: 14px;
                line-height: 1.5;
                color: #6b7280;
            }
            .question-meta-line {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                margin: -8px 0 16px;
                font-size: 13px;
                color: #64748b;
                font-weight: 700;
            }
            .question-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }
            .opt-btn {
                padding: 16px 20px;
                border: 2px solid #eee;
                background: white;
                color: #333;
                border-radius: 14px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                text-align: left;
            }
            .opt-btn:hover {
                border-color: #667eea;
                background: #f8f9ff;
                transform: translateY(-2px);
            }
            .opt-btn.correct {
                border-color: #4CAF50;
                background: #E8F5E9;
                animation: pulse-green 0.5s;
            }
            .opt-btn.wrong {
                border-color: #F44336;
                background: #FFEBEE;
                animation: shake 0.5s;
            }
            @keyframes pulse-green {
                0%, 100% { box-shadow: 0 0 0 0 rgba(76,175,80,0.5); }
                50% { box-shadow: 0 0 0 15px rgba(76,175,80,0); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            
            /* Level Complete */
            .level-complete-modal {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,0.9);
                display: none;
                align-items: center;
                justify-content: center;
                pointer-events: auto;
                z-index: 300;
            }
            .level-complete-modal.active { display: flex; }
            .complete-content {
                text-align: center;
                color: white;
                animation: fadeInUp 0.6s;
            }
            @keyframes fadeInUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .complete-stars {
                font-size: 60px;
                animation: starPop 0.8s;
            }
            @keyframes starPop {
                0% { transform: scale(0); }
                50% { transform: scale(1.3); }
                100% { transform: scale(1); }
            }
            .complete-content h1 {
                font-size: 48px;
                margin: 20px 0;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .complete-stats {
                display: flex;
                gap: 40px;
                justify-content: center;
                margin: 30px 0;
            }
            .stat {
                font-size: 20px;
                color: #ccc;
            }
            .stat span { color: white; font-weight: 700; }
            .complete-note {
                max-width: 42ch;
                margin: 0 auto 24px;
                color: rgba(255,255,255,0.78);
                font-size: 15px;
                line-height: 1.55;
            }
            .certificate-award {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #333;
                padding: 15px 30px;
                border-radius: 12px;
                font-weight: 700;
                margin: 20px 0 30px;
                display: inline-block;
            }
            
            /* Mobile Controls */
            .mobile-controls {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 15px;
                pointer-events: auto;
                opacity: 0;
                transition: opacity 0.3s;
            }
            .mobile-controls.active { opacity: 1; }
            .ctrl-btn {
                width: 70px;
                height: 70px;
                border-radius: 50%;
                border: none;
                background: rgba(0,0,0,0.6);
                backdrop-filter: blur(10px);
                color: white;
                font-size: 28px;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(0,0,0,0.3);
                transition: all 0.2s;
            }
            .ctrl-btn:active {
                transform: scale(0.9);
                background: rgba(0,0,0,0.8);
            }
            .ctrl-jump {
                background: linear-gradient(135deg, #667eea, #764ba2);
            }
            
            @media (max-width: 760px) {
                .status-rail {
                    top: 138px;
                    grid-template-columns: 1fr;
                }
                .status-card--streak {
                    min-height: 0;
                }
                .runner-banner {
                    top: 100px;
                    font-size: 12px;
                }
                .question-options {
                    grid-template-columns: 1fr;
                }
            }
            
            /* Floating Text */
            .float-text-container {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: hidden;
            }
            .float-text {
                position: absolute;
                font-size: 24px;
                font-weight: 800;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                animation: floatUp 1.5s forwards;
                pointer-events: none;
            }
            .float-text.success { color: #4CAF50; }
            .float-text.error { color: #F44336; }
            .float-text.info { color: #2196F3; }
            @keyframes floatUp {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(-100px) scale(1.2); opacity: 0; }
            }
            
            /* Particles */
            .particle {
                position: absolute;
                pointer-events: none;
                border-radius: 50%;
                animation: particleFade 1s forwards;
            }
            @keyframes particleFade {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(0); opacity: 0; }
            }
        `;
        this.container.appendChild(style);
    }

    initCanvas() {
        this.canvas = this.container.querySelector('#game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
    }

    initClouds() {
        // Create decorative clouds for parallax
        for (let i = 0; i < 5; i++) {
            this.clouds.push({
                x: Math.random() * this.canvasWidth,
                y: 50 + Math.random() * 100,
                size: 30 + Math.random() * 50,
                speed: 0.2 + Math.random() * 0.3
            });
        }
    }

    initScenery() {
        // Trackside decoration objects that scroll with the world
        const types = ['tree', 'flag', 'bush', 'lamp', 'sign'];
        for (let z = 200; z < 1200; z += 80 + Math.random() * 120) {
            const side = Math.random() > 0.5 ? 'left' : 'right';
            this.sceneryObjects.push({
                type: types[Math.floor(Math.random() * types.length)],
                z: z,
                side: side,
                scale: 0.7 + Math.random() * 0.5
            });
        }
    }

    initBirds() {
        // Animated birds flying across the sky
        for (let i = 0; i < 3; i++) {
            this.birds.push({
                x: Math.random() * this.canvasWidth,
                y: 30 + Math.random() * 80,
                speed: 0.8 + Math.random() * 1.2,
                wingPhase: Math.random() * Math.PI * 2,
                size: 8 + Math.random() * 6
            });
        }
    }

    getGameQuestion() {
        // Try imported question bank first, then fallback to inline
        try {
            const q = getRandomQuestion(Math.max(1, this.level - 1), Math.min(this.level + 1, 8));
            if (q) return q;
        } catch (e) { /* import failed, use fallback */ }
        // Fallback to inline questions
        const pool = FALLBACK_QUESTIONS.filter(q =>
            q.level >= Math.max(1, this.level - 1) && q.level <= Math.min(this.level + 1, 8)
        );
        return pool[Math.floor(Math.random() * pool.length)] || FALLBACK_QUESTIONS[0];
    }

    bindEvents() {
        // Start button
        this.container.querySelector('#play-btn').onclick = () => this.startGame();

        // Keyboard controls
        this.keyHandler = (e) => {
            if (!this.isRunning || this.isPaused) return;
            if (e.key === 'ArrowLeft' || e.key === 'a') this.moveLeft();
            if (e.key === 'ArrowRight' || e.key === 'd') this.moveRight();
            if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') && !this.isJumping) this.jump();
        };
        document.addEventListener('keydown', this.keyHandler);

        // Mobile controls
        this.container.querySelector('#ctrl-left').onclick = () => this.moveLeft();
        this.container.querySelector('#ctrl-right').onclick = () => this.moveRight();
        this.container.querySelector('#ctrl-jump').onclick = () => { if (!this.isJumping) this.jump(); };

        // Touch swipe
        let touchStartX = 0;
        this.canvas.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.canvas.addEventListener('touchend', (e) => {
            if (!this.isRunning || this.isPaused) return;
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) < 30) {
                // Tap = jump
                if (!this.isJumping) this.jump();
            } else if (diff > 30) {
                this.moveRight();
            } else if (diff < -30) {
                this.moveLeft();
            }
        }, { passive: true });
    }

    moveLeft() {
        if (this.lane > 0) {
            this.targetLane = this.lane - 1;
        }
    }

    moveRight() {
        if (this.lane < 2) {
            this.targetLane = this.lane + 1;
        }
    }

    jump() {
        if (this.isJumping) return;
        this.isJumping = true;
        this.playerVelY = -18;
    }

    startGame() {
        this.container.querySelector('#start-screen').classList.add('hidden');
        this.container.querySelector('#mobile-controls').classList.add('active');

        // Reset all game state
        this.isRunning = true;
        this.isPaused = false;
        this.distance = 0;
        this.planks = 3;
        this.score = 0;
        this.questionsAnswered = 0;
        this.questionsCorrect = 0;
        this.speed = 5;
        this.gameTime = 0;
        this.lastQuestionResult = null;

        // Reset player
        this.lane = 1;
        this.targetLane = 1;
        this.playerY = 0;
        this.playerVelY = 0;
        this.isJumping = false;
        this.runFrame = 0;

        // Reset collections
        this.obstacles = [];
        this.particles = [];
        this.dustParticles = [];
        this.weatherParticles = [];
        this.milestoneNext = 100;
        this.sceneryObjects = [];
        this.initScenery();

        // Reset power-ups & combo
        this.hasShield = false;
        this.shieldTimer = 0;
        this.speedBoost = false;
        this.speedBoostTimer = 0;
        this.hasMagnet = false;
        this.magnetTimer = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.comboTimer = 0;
        this.shakeAmount = 0;
        this.flashAlpha = 0;
        this.currentQuestionMeta = QUESTION_TYPE_META.default;

        this.updateHUD();
        this.showBanner(`Level ${this.level}: ${this.getLevelBriefing().focus}. ${this.getLevelBriefing().note}`, 'info', 2200);
        this.spawnInitialObstacles();
        this.lastTime = performance.now();
        this.gameLoop();
    }

    spawnInitialObstacles() {
        for (let z = 300; z < 900; z += 150 + Math.random() * 100) {
            this.spawnObstacle(z);
        }
    }

    spawnObstacle(z = 800) {
        const type = Math.random();
        const lane = Math.floor(Math.random() * 3);

        if (type < 0.25) {
            // Question gate
            this.obstacles.push({
                type: 'gate',
                lane: 1, // Always center for gates
                z: z,
                width: 100,
                collected: false
            });
        } else if (type < 0.45) {
            // Plank collectible (spawn in groups)
            for (let i = 0; i < 3; i++) {
                this.obstacles.push({
                    type: 'plank',
                    lane: lane,
                    z: z + i * 40,
                    collected: false
                });
            }
        } else if (type < 0.6) {
            // Coin collectible (bonus points)
            for (let i = 0; i < 5; i++) {
                this.obstacles.push({
                    type: 'coin',
                    lane: lane,
                    z: z + i * 30,
                    collected: false,
                    bobPhase: Math.random() * Math.PI * 2 + i * 0.5
                });
            }
        } else if (type < 0.75) {
            // Barrier (jump over)
            this.obstacles.push({
                type: 'barrier',
                lane: lane,
                z: z,
                width: 60,
                height: 40,
                collected: false
            });
        } else if (type < 0.88) {
            // Gap (requires bridge)
            this.obstacles.push({
                type: 'gap',
                lane: lane,
                z: z,
                length: 150,
                collected: false
            });
        } else {
            // Power-up!
            const powerTypes = ['shield', 'speedboost', 'magnet'];
            const pType = powerTypes[Math.floor(Math.random() * powerTypes.length)];
            this.obstacles.push({
                type: 'powerup',
                powerType: pType,
                lane: lane,
                z: z,
                collected: false,
                bobPhase: Math.random() * Math.PI * 2
            });
        }
    }

    // --- Sound Effects (Web Audio API, no external files) ---
    playSound(type) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            switch (type) {
                case 'collect':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(880, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.15);
                    break;
                case 'correct':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(523, ctx.currentTime);
                    osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
                    osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.35);
                    break;
                case 'wrong':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(200, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
                    gain.gain.setValueAtTime(0.1, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.3);
                    break;
                case 'hit':
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(150, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
                    gain.gain.setValueAtTime(0.12, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.2);
                    break;
                case 'powerup':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(400, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
                    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.25);
                    osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.4);
                    gain.gain.setValueAtTime(0.15, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.4);
                    break;
                case 'combo':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(600 + this.combo * 100, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(1200 + this.combo * 100, ctx.currentTime + 0.1);
                    gain.gain.setValueAtTime(0.12, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                    osc.start(ctx.currentTime);
                    osc.stop(ctx.currentTime + 0.15);
                    break;
            }
            setTimeout(() => ctx.close(), 1000);
        } catch (e) { /* Audio not supported */ }
    }

    gameLoop() {
        if (!this.isRunning) return;

        const now = performance.now();
        const dt = Math.min((now - this.lastTime) / 1000, 0.1);
        this.lastTime = now;

        this.update(dt);
        this.render();

        this.frameId = requestAnimationFrame(() => this.gameLoop());
    }

    update(dt) {
        if (this.isPaused) return;

        // Speed boost multiplier
        const speedMult = this.speedBoost ? 1.6 : 1;

        // Update distance
        this.distance += this.speed * dt * 10 * speedMult;

        // Check milestone
        if (this.distance > this.milestoneNext) {
            this.showFloatText(`🏁 ${this.milestoneNext}m! +${this.milestoneNext} ⭐`, 'success');
            this.score += this.milestoneNext;
            this.showBanner(`Milestone reached: ${this.milestoneNext}m. Keep the exam rhythm going.`, 'success', 1600);
            this.milestoneNext += 100;
            this.playSound('powerup');
        }

        // Update game time
        this.gameTime += dt;

        // Increase speed gradually
        this.speed = 5 + Math.min(this.distance / 500, 8);

        // Update HUD
        this.updateHUD();

        // Decay screen effects
        this.shakeAmount *= 0.9;
        if (this.shakeAmount < 0.5) this.shakeAmount = 0;
        this.flashAlpha *= 0.92;
        if (this.flashAlpha < 0.01) this.flashAlpha = 0;

        // Decay power-up timers
        if (this.shieldTimer > 0) { this.shieldTimer -= dt; if (this.shieldTimer <= 0) { this.hasShield = false; this.showFloatText('🛡️ Shield expired', 'info'); } }
        if (this.speedBoostTimer > 0) { this.speedBoostTimer -= dt; if (this.speedBoostTimer <= 0) { this.speedBoost = false; this.showFloatText('⚡ Speed normal', 'info'); } }
        if (this.magnetTimer > 0) { this.magnetTimer -= dt; if (this.magnetTimer <= 0) { this.hasMagnet = false; this.showFloatText('🧲 Magnet off', 'info'); } }

        // Decay combo timer
        if (this.comboTimer > 0) { this.comboTimer -= dt; if (this.comboTimer <= 0) { this.combo = 0; } }

        // Check level completion
        const levelConf = this.levelConfig[this.level];
        if (this.distance >= levelConf.length) {
            this.completeLevel();
            return;
        }

        // Update player lane (smooth transition)
        this.lane += (this.targetLane - this.lane) * 0.15;

        // Update jump physics
        if (this.isJumping) {
            this.playerVelY += 60 * dt;
            this.playerY += this.playerVelY;
            if (this.playerY >= 0) {
                this.playerY = 0;
                this.playerVelY = 0;
                this.isJumping = false;
            }
        }

        // Update run animation frame
        this.runFrame = (this.runFrame + dt * 10 * speedMult) % 4;

        // Magnet effect - attract plank & coin items nearby
        const playerLane = Math.round(this.lane);
        if (this.hasMagnet) {
            for (const obs of this.obstacles) {
                if ((obs.type === 'plank' || obs.type === 'coin') && !obs.collected && obs.z < 200 && obs.z > 0) {
                    // Pull items toward player lane
                    obs.lane += (playerLane - obs.lane) * 0.1;
                }
            }
        }

        // Update obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];
            obs.z -= this.speed * dt * 30 * speedMult;

            // Animate power-up bobbing
            if (obs.type === 'powerup') {
                obs.bobPhase += dt * 4;
            }

            // Collision detection
            const isInLane = Math.round(this.lane) === Math.round(obs.lane);

            if (obs.z < 120 && obs.z > 0) {
                if (isInLane) {
                    if (obs.type === 'gate' && !obs.collected && obs.z < 80) {
                        obs.collected = true;
                        this.triggerQuestion();
                    }
                    else if (obs.type === 'plank' && !obs.collected && obs.z < 80) {
                        obs.collected = true;
                        this.collectPlank();
                    }
                    else if (obs.type === 'barrier' && !obs.collected && obs.z < 80) {
                        if (this.playerY > -30) {
                            obs.collected = true;
                            this.hitBarrier();
                        }
                    }
                    else if (obs.type === 'powerup' && !obs.collected && obs.z < 80) {
                        obs.collected = true;
                        this.collectPowerUp(obs.powerType);
                    }
                    else if (obs.type === 'coin' && !obs.collected && obs.z < 80) {
                        obs.collected = true;
                        this.collectCoin();
                    }
                    else if (obs.type === 'gap' && obs.z < 100 && obs.z > 20) {
                        if (!obs.collected) {
                            if (this.isJumping && this.playerY < -20) {
                                // Jumping over - ok!
                            } else if (this.planks > 0) {
                                this.planks = Math.max(0, this.planks - 0.2);
                                this.score += 1;
                                this.createParticles(this.canvasWidth / 2, this.canvasHeight * 0.8, '#8B4513', 1);
                            } else {
                                this.gameOver("You fell into a gap! Need planks to build bridges.");
                                return;
                            }
                        }
                    }
                }
            }

            // Remove passed obstacles
            if (obs.z < -100) {
                this.obstacles.splice(i, 1);
            }
        }

        // Spawn new obstacles
        const lastObs = this.obstacles[this.obstacles.length - 1];
        if (!lastObs || lastObs.z < 600) {
            this.spawnObstacle(lastObs ? lastObs.z + 150 + Math.random() * 100 : 800);
        }

        // Update clouds
        for (const cloud of this.clouds) {
            cloud.x -= cloud.speed;
            if (cloud.x + cloud.size < 0) {
                cloud.x = this.canvasWidth + cloud.size;
                cloud.y = 50 + Math.random() * 100;
            }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // Update dust particles
        for (let i = this.dustParticles.length - 1; i >= 0; i--) {
            const p = this.dustParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.size += dt * 5;
            p.life -= dt * 2;
            if (p.life <= 0) {
                this.dustParticles.splice(i, 1);
            }
        }

        // Running dust spawner
        if (!this.isJumping && this.speed > 5 && Math.random() < 0.3) {
            this.dustParticles.push({
                x: this.canvasWidth / 2 + (this.lane - 1) * (this.canvasWidth * 0.3 / 3),
                y: this.canvasHeight * 0.85,
                vx: (Math.random() - 0.5) * 2,
                vy: -1 - Math.random() * 2,
                size: 2 + Math.random() * 4,
                life: 1
            });
        }

        // Update scenery objects
        for (let i = this.sceneryObjects.length - 1; i >= 0; i--) {
            const obj = this.sceneryObjects[i];
            obj.z -= this.speed * dt * 30 * speedMult;
            if (obj.z < -100) {
                this.sceneryObjects.splice(i, 1);
            }
        }
        // Spawn continuous scenery
        const lastScenery = this.sceneryObjects[this.sceneryObjects.length - 1];
        if (!lastScenery || lastScenery.z < 1000) {
            const types = ['tree', 'flag', 'bush', 'lamp', 'sign'];
            this.sceneryObjects.push({
                type: types[Math.floor(Math.random() * types.length)],
                z: (lastScenery ? lastScenery.z : 1000) + 80 + Math.random() * 120,
                side: Math.random() > 0.5 ? 'left' : 'right',
                scale: 0.7 + Math.random() * 0.5
            });
        }

        // Update birds
        for (const bird of this.birds) {
            bird.x -= bird.speed * dt * 60;
            bird.y += Math.sin(this.gameTime * 2 + bird.speed) * 0.5;
            bird.wingPhase += dt * 15;
            if (bird.x < -50) {
                bird.x = this.canvasWidth + 50;
                bird.y = 30 + Math.random() * 80;
            }
        }

        // Weather system update
        if (levelConf.weather) {
            if (Math.random() < levelConf.weatherRate) {
                this.weatherParticles.push({
                    x: Math.random() * this.canvasWidth,
                    y: -10,
                    vx: levelConf.weatherVx + (Math.random() - 0.5),
                    vy: levelConf.weatherVy + Math.random(),
                    size: levelConf.weatherSize * (0.5 + Math.random() * 0.5),
                    type: levelConf.weather,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
        for (let i = this.weatherParticles.length - 1; i >= 0; i--) {
            const p = this.weatherParticles[i];
            p.x += p.vx * dt * 60;
            p.y += p.vy * dt * 60;
            p.phase += dt * 2;
            if (p.type === 'leaf') p.x += Math.sin(p.phase) * 2;
            if (p.type === 'snow') p.x += Math.cos(p.phase) * 0.5;
            if (p.type === 'sparkle') {
                p.vy -= dt * 2; // Float up
                p.life -= dt;
            }
            if (p.y > this.canvasHeight || p.y < -50) {
                this.weatherParticles.splice(i, 1);
            }
        }
    }

    render() {
        const ctx = this.ctx;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const levelConf = this.levelConfig[this.level];

        // Screen shake
        ctx.save();
        if (this.shakeAmount > 0) {
            const sx = (Math.random() - 0.5) * this.shakeAmount;
            const sy = (Math.random() - 0.5) * this.shakeAmount;
            ctx.translate(sx, sy);
        }

        // Clear
        ctx.clearRect(0, 0, w, h);

        // --- SKY ---
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.55);
        skyGrad.addColorStop(0, levelConf.skyTop);
        skyGrad.addColorStop(0.6, levelConf.skyBottom);
        skyGrad.addColorStop(1, this.adjustColor(levelConf.skyBottom, 20));
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h * 0.55);

        // Sun / glow
        const sunX = w * 0.75;
        const sunY = h * 0.18;
        const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 120);
        sunGrad.addColorStop(0, 'rgba(255,255,200,0.6)');
        sunGrad.addColorStop(0.3, 'rgba(255,245,157,0.2)');
        sunGrad.addColorStop(1, 'rgba(255,245,157,0)');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, w, h * 0.55);

        // Sun disc
        ctx.fillStyle = 'rgba(255,250,205,0.9)';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 22, 0, Math.PI * 2);
        ctx.fill();

        // Draw clouds (volumetric)
        for (const cloud of this.clouds) {
            this.drawCloud(ctx, cloud.x, cloud.y, cloud.size);
        }

        // Draw animated birds
        this.drawBirds(ctx, w, h);

        // Draw mountains (multi-layer parallax)
        this.drawMountains(ctx, w, h, levelConf);

        // --- GROUND fill below track ---
        const groundGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
        groundGrad.addColorStop(0, this.adjustColor(levelConf.trackColor, -40));
        groundGrad.addColorStop(1, this.adjustColor(levelConf.trackColor, -70));
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, h * 0.45, w, h * 0.55);

        // Draw 3D track
        this.drawTrack(ctx, w, h, levelConf);

        // Draw trackside scenery objects
        this.drawScenery(ctx, w, h, levelConf);

        // Draw obstacles
        this.drawObstacles(ctx, w, h, levelConf);

        // Draw player
        this.drawPlayer(ctx, w, h);

        // Draw particles
        this.drawParticles(ctx);

        // Speed lines effect
        if (this.isRunning && this.speed > 8) {
            const intensity = Math.min((this.speed - 8) / 5, 1);
            for (let i = 0; i < 12 * intensity; i++) {
                const lx = Math.random() * w;
                const ly = h * 0.45 + Math.random() * h * 0.55;
                const len = 20 + Math.random() * 60;
                const alpha = 0.05 + Math.random() * 0.15 * intensity;
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                ctx.lineWidth = 1 + Math.random() * 2;
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.lineTo(lx + (Math.random() - 0.5) * 5, ly + len);
                ctx.stroke();
            }
        }

        // Draw weather overlay
        this.drawWeather(ctx, w, h);

        // Flash overlay
        if (this.flashAlpha > 0) {
            ctx.fillStyle = this.flashColor;
            ctx.globalAlpha = this.flashAlpha;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 1;
        }

        // Combo display
        if (this.combo > 1) {
            ctx.save();
            const comboScale = 1 + Math.sin(this.gameTime * 6) * 0.08;
            ctx.translate(w / 2, h * 0.22);
            ctx.scale(comboScale, comboScale);
            ctx.font = 'bold 36px Segoe UI, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#FFD700';
            ctx.shadowColor = '#FF8C00';
            ctx.shadowBlur = 15;
            ctx.fillText(`🔥 ${this.combo}x COMBO`, 0, 0);
            ctx.shadowBlur = 0;
            ctx.restore();
        }

        // Active power-up indicators
        let piY = 100;
        ctx.font = 'bold 14px Segoe UI, sans-serif';
        ctx.textAlign = 'left';
        if (this.hasShield) {
            ctx.fillStyle = '#4FC3F7';
            ctx.fillText(`🛡️ ${Math.ceil(this.shieldTimer)}s`, 20, piY);
            piY += 22;
        }
        if (this.speedBoost) {
            ctx.fillStyle = '#FFD740';
            ctx.fillText(`⚡ ${Math.ceil(this.speedBoostTimer)}s`, 20, piY);
            piY += 22;
        }
        if (this.hasMagnet) {
            ctx.fillStyle = '#E040FB';
            ctx.fillText(`🧲 ${Math.ceil(this.magnetTimer)}s`, 20, piY);
        }

        ctx.restore(); // End screen shake
    }

    drawCloud(ctx, x, y, size) {
        // Volumetric cloud with soft shading
        ctx.save();

        // Cloud shadow
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.beginPath();
        ctx.arc(x + 3, y + 4, size * 0.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.4 + 3, y - size * 0.1 + 4, size * 0.38, 0, Math.PI * 2);
        ctx.arc(x + size * 0.7 + 3, y + 4, size * 0.42, 0, Math.PI * 2);
        ctx.fill();

        // Cloud highlight (bright top)
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
        ctx.arc(x + size * 0.4, y - size * 0.12, size * 0.38, 0, Math.PI * 2);
        ctx.arc(x + size * 0.7, y, size * 0.42, 0, Math.PI * 2);
        ctx.fill();

        // Bright center highlight
        const cGrad = ctx.createRadialGradient(x + size * 0.35, y - size * 0.15, 0, x + size * 0.35, y - size * 0.15, size * 0.5);
        cGrad.addColorStop(0, 'rgba(255,255,255,0.6)');
        cGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.arc(x + size * 0.35, y - size * 0.1, size * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawMountains(ctx, w, h, levelConf) {
        const baseY = h * 0.55;

        // Far mountains (lighter, blurry)
        ctx.fillStyle = this.adjustColor(levelConf.bgMountain, 60);
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(w * 0.1, baseY - 80);
        ctx.lineTo(w * 0.22, baseY - 40);
        ctx.lineTo(w * 0.35, baseY - 110);
        ctx.lineTo(w * 0.45, baseY - 50);
        ctx.lineTo(w * 0.58, baseY - 130);
        ctx.lineTo(w * 0.72, baseY - 60);
        ctx.lineTo(w * 0.82, baseY - 95);
        ctx.lineTo(w * 0.95, baseY - 45);
        ctx.lineTo(w, baseY - 70);
        ctx.lineTo(w, baseY);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        // Mid mountains
        ctx.fillStyle = this.adjustColor(levelConf.bgMountain, 20);
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(w * 0.12, baseY - 55);
        ctx.lineTo(w * 0.28, baseY - 30);
        ctx.lineTo(w * 0.42, baseY - 85);
        ctx.lineTo(w * 0.55, baseY - 35);
        ctx.lineTo(w * 0.68, baseY - 70);
        ctx.lineTo(w * 0.78, baseY - 25);
        ctx.lineTo(w * 0.92, baseY - 60);
        ctx.lineTo(w, baseY - 40);
        ctx.lineTo(w, baseY);
        ctx.closePath();
        ctx.fill();

        // Snow caps on mid mountains
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.moveTo(w * 0.42, baseY - 85);
        ctx.lineTo(w * 0.39, baseY - 65);
        ctx.lineTo(w * 0.45, baseY - 65);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(w * 0.68, baseY - 70);
        ctx.lineTo(w * 0.65, baseY - 55);
        ctx.lineTo(w * 0.71, baseY - 55);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        // Near mountains (darkest)
        const nearGrad = ctx.createLinearGradient(0, baseY - 50, 0, baseY);
        nearGrad.addColorStop(0, levelConf.bgMountain);
        nearGrad.addColorStop(1, this.adjustColor(levelConf.bgMountain, -30));
        ctx.fillStyle = nearGrad;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(w * 0.08, baseY - 30);
        ctx.lineTo(w * 0.2, baseY - 15);
        ctx.lineTo(w * 0.32, baseY - 45);
        ctx.lineTo(w * 0.48, baseY - 20);
        ctx.lineTo(w * 0.6, baseY - 40);
        ctx.lineTo(w * 0.75, baseY - 10);
        ctx.lineTo(w * 0.88, baseY - 35);
        ctx.lineTo(w, baseY - 18);
        ctx.lineTo(w, baseY);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        // Simple tree silhouettes at base
        ctx.fillStyle = this.adjustColor(levelConf.bgMountain, -25);
        ctx.globalAlpha = 0.35;
        for (let tx = 0; tx < w; tx += 35 + Math.sin(tx) * 15) {
            const th = 12 + Math.abs(Math.sin(tx * 0.1)) * 12;
            ctx.beginPath();
            ctx.moveTo(tx, baseY);
            ctx.lineTo(tx + 5, baseY - th);
            ctx.lineTo(tx + 10, baseY);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    drawTrack(ctx, w, h, levelConf) {
        const trackTop = h * 0.45;
        const trackBottom = h;
        const topWidth = w * 0.3;
        const bottomWidth = w * 1.2;

        // Track body with gradient
        const trackGrad = ctx.createLinearGradient(0, trackTop, 0, trackBottom);
        trackGrad.addColorStop(0, this.adjustColor(levelConf.trackColor, 10));
        trackGrad.addColorStop(0.4, levelConf.trackColor);
        trackGrad.addColorStop(1, this.adjustColor(levelConf.trackColor, -40));
        ctx.fillStyle = trackGrad;
        ctx.beginPath();
        ctx.moveTo(w / 2 - topWidth / 2, trackTop);
        ctx.lineTo(w / 2 + topWidth / 2, trackTop);
        ctx.lineTo(w / 2 + bottomWidth / 2, trackBottom);
        ctx.lineTo(w / 2 - bottomWidth / 2, trackBottom);
        ctx.closePath();
        ctx.fill();

        // Edge barriers (left & right rails)
        const edgeWidth = 6;
        ctx.fillStyle = this.adjustColor(levelConf.trackColor, -50);
        // Left edge
        ctx.beginPath();
        ctx.moveTo(w / 2 - topWidth / 2, trackTop);
        ctx.lineTo(w / 2 - topWidth / 2 - edgeWidth * 0.3, trackTop);
        ctx.lineTo(w / 2 - bottomWidth / 2 - edgeWidth, trackBottom);
        ctx.lineTo(w / 2 - bottomWidth / 2, trackBottom);
        ctx.closePath();
        ctx.fill();
        // Right edge
        ctx.beginPath();
        ctx.moveTo(w / 2 + topWidth / 2, trackTop);
        ctx.lineTo(w / 2 + topWidth / 2 + edgeWidth * 0.3, trackTop);
        ctx.lineTo(w / 2 + bottomWidth / 2 + edgeWidth, trackBottom);
        ctx.lineTo(w / 2 + bottomWidth / 2, trackBottom);
        ctx.closePath();
        ctx.fill();

        // Edge glow strip
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w / 2 - topWidth / 2, trackTop);
        ctx.lineTo(w / 2 - bottomWidth / 2, trackBottom);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w / 2 + topWidth / 2, trackTop);
        ctx.lineTo(w / 2 + bottomWidth / 2, trackBottom);
        ctx.stroke();

        // Lane dividers (dashed)
        ctx.setLineDash([12, 18]);
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 3;
        const dashOffset = (this.distance * 8) % 30;
        ctx.lineDashOffset = -dashOffset;
        for (let i = 1; i < 3; i++) {
            const xTop = w / 2 - topWidth / 2 + (topWidth / 3) * i;
            const xBottom = w / 2 - bottomWidth / 2 + (bottomWidth / 3) * i;
            ctx.beginPath();
            ctx.moveTo(xTop, trackTop);
            ctx.lineTo(xBottom, trackBottom);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Scrolling grid lines
        const gridOffset = (this.distance * 5) % 50;
        for (let i = 0; i < 20; i++) {
            const y = trackTop + ((i * 50 - gridOffset) / 600) * (trackBottom - trackTop);
            if (y > trackTop && y < trackBottom) {
                const t = (y - trackTop) / (trackBottom - trackTop);
                const lineWidth = topWidth + (bottomWidth - topWidth) * t;
                const alpha = 0.06 + t * 0.12;
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(w / 2 - lineWidth / 2, y);
                ctx.lineTo(w / 2 + lineWidth / 2, y);
                ctx.stroke();
            }
        }

        // Center glow stripe
        ctx.globalAlpha = 0.08;
        const glowGrad = ctx.createLinearGradient(w / 2 - 30, 0, w / 2 + 30, 0);
        glowGrad.addColorStop(0, 'transparent');
        glowGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.moveTo(w / 2 - 8, trackTop);
        ctx.lineTo(w / 2 + 8, trackTop);
        ctx.lineTo(w / 2 + 40, trackBottom);
        ctx.lineTo(w / 2 - 40, trackBottom);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    drawObstacles(ctx, w, h, levelConf) {
        const trackTop = h * 0.45;
        const trackBottom = h * 0.85;
        const topWidth = w * 0.3;
        const bottomWidth = w * 1.0;

        const sorted = [...this.obstacles].sort((a, b) => b.z - a.z);

        for (const obs of sorted) {
            if (obs.z < -100 || obs.z > 800) continue;

            const t = 1 - (obs.z / 800);
            if (t < 0) continue;

            const y = trackTop + t * (trackBottom - trackTop);
            const scale = 0.3 + t * 0.7;
            const laneWidth = (topWidth + (bottomWidth - topWidth) * t) / 3;
            const trackLeft = w / 2 - (topWidth + (bottomWidth - topWidth) * t) / 2;
            const x = trackLeft + (obs.lane + 0.5) * laneWidth;

            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);

            if (obs.type === 'gate') {
                if (!obs.collected) {
                    const gateWidth = 90;
                    const gateHeight = 110;
                    const pulse = Math.sin(this.gameTime * 4) * 0.3 + 0.7;

                    // Gate pillars
                    const pillarGrad = ctx.createLinearGradient(-gateWidth / 2, 0, -gateWidth / 2 + 12, 0);
                    pillarGrad.addColorStop(0, '#5c6bc0');
                    pillarGrad.addColorStop(1, '#3949ab');
                    ctx.fillStyle = pillarGrad;
                    ctx.fillRect(-gateWidth / 2, -gateHeight + 30, 12, gateHeight - 30);
                    ctx.fillRect(gateWidth / 2 - 12, -gateHeight + 30, 12, gateHeight - 30);

                    // Arch
                    ctx.strokeStyle = '#7986cb';
                    ctx.lineWidth = 10;
                    ctx.shadowColor = `rgba(102,126,234,${pulse})`;
                    ctx.shadowBlur = 25;
                    ctx.beginPath();
                    ctx.arc(0, -gateHeight + 30, gateWidth / 2, Math.PI, 0);
                    ctx.stroke();

                    // Inner energy glow
                    const energyGrad = ctx.createRadialGradient(0, -gateHeight / 2, 0, 0, -gateHeight / 2, gateWidth / 2);
                    energyGrad.addColorStop(0, `rgba(102,126,234,${0.3 * pulse})`);
                    energyGrad.addColorStop(1, 'rgba(102,126,234,0)');
                    ctx.fillStyle = energyGrad;
                    ctx.fillRect(-gateWidth / 2, -gateHeight, gateWidth, gateHeight);

                    // Question mark
                    ctx.shadowColor = '#fff';
                    ctx.shadowBlur = 15;
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 48px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('?', 0, -gateHeight / 2 + 5);
                    ctx.shadowBlur = 0;
                }
            } else if (obs.type === 'plank') {
                if (!obs.collected) {
                    // Golden glow
                    ctx.shadowColor = '#FFD700';
                    ctx.shadowBlur = 18;

                    // Wood plank with grain
                    const plankGrad = ctx.createLinearGradient(-28, -12, -28, 12);
                    plankGrad.addColorStop(0, '#A0522D');
                    plankGrad.addColorStop(0.3, '#CD853F');
                    plankGrad.addColorStop(0.7, '#8B4513');
                    plankGrad.addColorStop(1, '#654321');
                    ctx.fillStyle = plankGrad;
                    ctx.beginPath();
                    ctx.roundRect(-28, -12, 56, 24, 4);
                    ctx.fill();

                    // Wood grain lines
                    ctx.strokeStyle = 'rgba(139,69,19,0.4)';
                    ctx.lineWidth = 1;
                    for (let gi = -20; gi < 20; gi += 8) {
                        ctx.beginPath();
                        ctx.moveTo(gi, -10);
                        ctx.lineTo(gi + 3, 10);
                        ctx.stroke();
                    }

                    // Highlight
                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                    ctx.beginPath();
                    ctx.roundRect(-25, -10, 50, 8, 2);
                    ctx.fill();

                    // Sparkle
                    const sparkle = Math.sin(this.gameTime * 6 + obs.z) * 0.5 + 0.5;
                    ctx.fillStyle = `rgba(255,215,0,${sparkle})`;
                    ctx.beginPath();
                    ctx.arc(20, -8, 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.shadowBlur = 0;
                }
            } else if (obs.type === 'coin') {
                if (!obs.collected) {
                    const bob = Math.sin(obs.bobPhase || 0) * 10;
                    ctx.translate(0, bob - 20);

                    // Coin glow
                    ctx.shadowColor = '#FFD700';
                    ctx.shadowBlur = 15;

                    // Golden coin
                    const coinGrad = ctx.createLinearGradient(-15, -15, 15, 15);
                    coinGrad.addColorStop(0, '#FFE066');
                    coinGrad.addColorStop(0.5, '#FFD700');
                    coinGrad.addColorStop(1, '#B8860B');

                    ctx.fillStyle = coinGrad;
                    ctx.beginPath();
                    ctx.arc(0, 0, 18, 0, Math.PI * 2);
                    ctx.fill();

                    // Inner ring
                    ctx.strokeStyle = '#DAA520';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(0, 0, 12, 0, Math.PI * 2);
                    ctx.stroke();

                    // Star symbol
                    ctx.fillStyle = '#FFF8E1';
                    ctx.font = 'bold 18px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.shadowBlur = 0;
                    ctx.fillText('⭐', 0, 1);
                }
            } else if (obs.type === 'barrier') {
                // 3D barrier with danger stripes
                const bw = 65, bh = 50;

                // Side face (3D depth)
                ctx.fillStyle = '#C62828';
                ctx.beginPath();
                ctx.moveTo(bw / 2, -bh);
                ctx.lineTo(bw / 2 + 8, -bh + 5);
                ctx.lineTo(bw / 2 + 8, 5);
                ctx.lineTo(bw / 2, 0);
                ctx.closePath();
                ctx.fill();

                // Top face
                ctx.fillStyle = '#E53935';
                ctx.beginPath();
                ctx.moveTo(-bw / 2, -bh);
                ctx.lineTo(-bw / 2 + 8, -bh - 5);
                ctx.lineTo(bw / 2 + 8, -bh - 5 + 5);
                ctx.lineTo(bw / 2, -bh);
                ctx.closePath();
                ctx.fill();

                // Front face
                const barrierGrad = ctx.createLinearGradient(0, -bh, 0, 0);
                barrierGrad.addColorStop(0, '#F44336');
                barrierGrad.addColorStop(1, '#D32F2F');
                ctx.fillStyle = barrierGrad;
                ctx.fillRect(-bw / 2, -bh, bw, bh);

                // Danger stripes
                ctx.save();
                ctx.beginPath();
                ctx.rect(-bw / 2, -bh, bw, bh);
                ctx.clip();
                ctx.fillStyle = '#FFEB3B';
                for (let si = -bw; si < bw * 2; si += 20) {
                    ctx.beginPath();
                    ctx.moveTo(-bw / 2 + si, -bh);
                    ctx.lineTo(-bw / 2 + si + 10, -bh);
                    ctx.lineTo(-bw / 2 + si + 10 - bh, 0);
                    ctx.lineTo(-bw / 2 + si - bh, 0);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();

                // Warning sign
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('⚠', 0, -bh / 2);

            } else if (obs.type === 'gap') {
                // Animated void gap
                ctx.fillStyle = '#0a0a0a';
                ctx.beginPath();
                ctx.roundRect(-laneWidth * 0.6, -5, laneWidth * 1.2, 55, 4);
                ctx.fill();

                // Void shimmer lines
                ctx.strokeStyle = 'rgba(100,50,150,0.4)';
                ctx.lineWidth = 1;
                for (let vi = 0; vi < 4; vi++) {
                    const vy = 5 + vi * 12;
                    const wave = Math.sin(this.gameTime * 3 + vi) * 5;
                    ctx.beginPath();
                    ctx.moveTo(-laneWidth * 0.5 + wave, vy);
                    ctx.lineTo(laneWidth * 0.5 + wave, vy);
                    ctx.stroke();
                }

                // Bridge if close and have planks
                const distToPlayer = obs.z;
                if (distToPlayer < 120 && distToPlayer > 0 && Math.round(this.lane) === Math.round(obs.lane) && this.planks > 0) {
                    const bridgeGrad = ctx.createLinearGradient(-laneWidth * 0.5, 0, laneWidth * 0.5, 0);
                    bridgeGrad.addColorStop(0, '#654321');
                    bridgeGrad.addColorStop(0.5, '#8B4513');
                    bridgeGrad.addColorStop(1, '#654321');
                    ctx.fillStyle = bridgeGrad;
                    ctx.beginPath();
                    ctx.roundRect(-laneWidth * 0.5, -2, laneWidth, 52, 3);
                    ctx.fill();
                    // Planks on bridge
                    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
                    ctx.lineWidth = 1;
                    for (let pi = -laneWidth * 0.4; pi < laneWidth * 0.4; pi += 12) {
                        ctx.beginPath();
                        ctx.moveTo(pi, 0);
                        ctx.lineTo(pi, 48);
                        ctx.stroke();
                    }
                }
            } else if (obs.type === 'powerup' && !obs.collected) {
                const bob = Math.sin(obs.bobPhase || 0) * 10;
                ctx.save();
                ctx.translate(0, bob - 35);

                const glowColors = { shield: '#4FC3F7', speedboost: '#FFD740', magnet: '#E040FB' };
                const emojis = { shield: '🛡️', speedboost: '⚡', magnet: '🧲' };
                const gc = glowColors[obs.powerType] || '#fff';

                // Rotating sparkle ring
                ctx.save();
                ctx.rotate(this.gameTime * 2);
                for (let si = 0; si < 6; si++) {
                    const angle = (si / 6) * Math.PI * 2;
                    const sx = Math.cos(angle) * 30;
                    const sy = Math.sin(angle) * 30;
                    ctx.fillStyle = gc;
                    ctx.globalAlpha = 0.4 + Math.sin(this.gameTime * 5 + si) * 0.3;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
                ctx.restore();

                // Main glow
                ctx.shadowColor = gc;
                ctx.shadowBlur = 25 + Math.sin(obs.bobPhase * 2) * 12;

                // Background disc
                const discGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
                discGrad.addColorStop(0, gc);
                discGrad.addColorStop(0.6, gc);
                discGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = discGrad;
                ctx.globalAlpha = 0.35;
                ctx.beginPath();
                ctx.arc(0, 0, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;

                // Emoji
                ctx.font = '36px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowBlur = 0;
                ctx.fillText(emojis[obs.powerType] || '⭐', 0, 0);

                ctx.restore();
            }

            ctx.restore();
        }
    }

    drawBirds(ctx, w, h) {
        ctx.fillStyle = '#2c3e50';
        for (const bird of this.birds) {
            ctx.save();
            ctx.translate(bird.x, bird.y);

            const wingY = Math.sin(bird.wingPhase) * bird.size;

            ctx.beginPath();
            // Left wing
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-bird.size, wingY, -bird.size * 2, -bird.size * 0.5);
            ctx.quadraticCurveTo(-bird.size, wingY - bird.size * 0.5, 0, 0);

            // Right wing
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(bird.size, wingY, bird.size * 2, -bird.size * 0.5);
            ctx.quadraticCurveTo(bird.size, wingY - bird.size * 0.5, 0, 0);

            ctx.fill();
            ctx.restore();
        }
    }

    drawScenery(ctx, w, h, levelConf) {
        const trackTop = h * 0.45;
        const trackBottom = h * 0.85;
        const topWidth = w * 0.3;
        const bottomWidth = w * 1.0;

        // Sort scenery by Z index
        const sorted = [...this.sceneryObjects].sort((a, b) => b.z - a.z);

        for (const obj of sorted) {
            if (obj.z < 0 || obj.z > 1000) continue;

            const t = 1 - (obj.z / 1000);
            if (t < 0) continue;

            const y = trackTop + t * (trackBottom - trackTop);
            const scale = (0.2 + t * 0.8) * obj.scale;
            const trackWidth = topWidth + (bottomWidth - topWidth) * t;

            // Calculate X based on side, pushing them away from track center
            const xOffset = obj.side === 'left' ? -(trackWidth / 2 + 60 * scale) : (trackWidth / 2 + 60 * scale);
            const x = w / 2 + xOffset;

            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);

            if (obj.type === 'tree') {
                // Pine tree
                ctx.fillStyle = '#5D4037'; // Trunk
                ctx.fillRect(-8, 0, 16, 40);

                const foliageColor = levelConf.trackColor === '#FF8C00' ? '#D84315' :
                    levelConf.skyTop === '#EDE7F6' ? '#FFFFFF' : '#2E7D32';

                ctx.fillStyle = foliageColor;
                ctx.beginPath();
                ctx.moveTo(0, -80);
                ctx.lineTo(40, 20);
                ctx.lineTo(-40, 20);
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, -130);
                ctx.lineTo(30, -30);
                ctx.lineTo(-30, -30);
                ctx.fill();

            } else if (obj.type === 'flag') {
                ctx.fillStyle = '#90A4AE'; // Pole
                ctx.fillRect(-3, -120, 6, 120);
                // Flag
                ctx.fillStyle = '#E53935';
                const wave = Math.sin(this.gameTime * 5 + obj.z) * 10;
                ctx.beginPath();
                ctx.moveTo(3, -115);
                ctx.lineTo(60 + wave, -100);
                ctx.lineTo(3, -85);
                ctx.fill();
            } else if (obj.type === 'bush') {
                const bColor = levelConf.trackColor === '#FF8C00' ? '#E64A19' : levelConf.bgMountain;
                ctx.fillStyle = bColor;
                ctx.beginPath();
                ctx.arc(0, 10, 25, 0, Math.PI * 2);
                ctx.arc(-20, 15, 20, 0, Math.PI * 2);
                ctx.arc(20, 15, 20, 0, Math.PI * 2);
                ctx.fill();
            } else if (obj.type === 'lamp') {
                ctx.fillStyle = '#455A64';
                ctx.fillRect(-4, -150, 8, 150);
                ctx.fillRect(-15, -155, 30, 8);
                // Glow
                ctx.fillStyle = 'rgba(255, 235, 59, 0.4)';
                ctx.beginPath();
                ctx.moveTo(-10, -147);
                ctx.lineTo(10, -147);
                ctx.lineTo(40, -50);
                ctx.lineTo(-40, -50);
                ctx.fill();
                ctx.fillStyle = '#FFF59D';
                ctx.beginPath();
                ctx.arc(0, -147, 8, 0, Math.PI * 2);
                ctx.fill();
            } else if (obj.type === 'sign') {
                ctx.fillStyle = '#795548'; // Post
                ctx.fillRect(-3, -60, 6, 60);
                ctx.fillStyle = '#FFC107'; // Sign
                ctx.beginPath();
                ctx.roundRect(-25, -50, 50, 30, 4);
                ctx.fill();
                ctx.fillStyle = '#e65100';
                ctx.beginPath();
                ctx.moveTo(-15, -35);
                ctx.lineTo(0, -35);
                ctx.lineTo(15, -45);
                ctx.lineTo(15, -25);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    drawWeather(ctx, w, h) {
        if (!this.weatherParticles.length) return;

        ctx.save();
        for (const p of this.weatherParticles) {
            ctx.translate(p.x, p.y);

            if (p.type === 'leaf') {
                ctx.rotate(p.phase);
                ctx.fillStyle = '#FF9800'; // Orange autumn leaves
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.rotate(-p.phase);
            } else if (p.type === 'snow') {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'rain') {
                ctx.fillStyle = 'rgba(129, 212, 250, 0.6)';
                ctx.rotate(0.1); // Angled rain
                ctx.fillRect(0, -p.size * 4, 1.5, p.size * 8);
                ctx.rotate(-0.1);
            } else if (p.type === 'sparkle') {
                ctx.fillStyle = `rgba(255, 215, 0, ${p.life})`;
                const sSize = p.size * Math.max(0.1, Math.sin(p.phase));
                ctx.beginPath();
                ctx.moveTo(0, -sSize * 2);
                ctx.lineTo(sSize, 0);
                ctx.lineTo(0, sSize * 2);
                ctx.lineTo(-sSize, 0);
                ctx.fill();
            }

            ctx.translate(-p.x, -p.y);
        }
        ctx.restore();
    }

    drawPlayer(ctx, w, h) {
        const trackBottom = h * 0.85;
        const laneWidth = w / 3;
        const playerX = laneWidth * (this.lane + 0.5);
        const playerY = trackBottom - 60 + this.playerY;

        ctx.save();
        ctx.translate(playerX, playerY);

        // Shadow (dynamic based on jump height)
        const shadowScale = 1 - Math.abs(this.playerY) * 0.005;
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.ellipse(0, 60 - this.playerY * 0.3, 28 * shadowScale, 8 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();

        const runOffset = Math.sin(this.runFrame * Math.PI) * 6;
        const breathe = Math.sin(this.gameTime * 3) * 1;

        // --- LEGS (animated) ---
        // Left leg
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.roundRect(-14, 18 + runOffset, 10, 32, 4);
        ctx.fill();
        // Shoe
        ctx.fillStyle = '#e53935';
        ctx.beginPath();
        ctx.roundRect(-16, 46 + runOffset, 14, 6, 3);
        ctx.fill();

        // Right leg
        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.roundRect(4, 18 - runOffset, 10, 32, 4);
        ctx.fill();
        // Shoe
        ctx.fillStyle = '#e53935';
        ctx.beginPath();
        ctx.roundRect(2, 46 - runOffset, 14, 6, 3);
        ctx.fill();

        // --- BODY ---
        const bodyGrad = ctx.createLinearGradient(-20, -22, 20, 25);
        bodyGrad.addColorStop(0, '#7c4dff');
        bodyGrad.addColorStop(0.5, '#651fff');
        bodyGrad.addColorStop(1, '#536dfe');
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.roundRect(-20, -22 + breathe, 40, 45, 10);
        ctx.fill();

        // Jersey stripe
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(-18, -5 + breathe, 36, 6);

        // --- ARMS (animated) ---
        ctx.fillStyle = '#7c4dff';
        // Left arm
        ctx.save();
        ctx.translate(-20, -10 + breathe);
        ctx.rotate((-runOffset * 0.04) - 0.3);
        ctx.beginPath();
        ctx.roundRect(-4, 0, 8, 28, 4);
        ctx.fill();
        // Hand
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(0, 28, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right arm
        ctx.fillStyle = '#7c4dff';
        ctx.save();
        ctx.translate(20, -10 + breathe);
        ctx.rotate((runOffset * 0.04) + 0.3);
        ctx.beginPath();
        ctx.roundRect(-4, 0, 8, 28, 4);
        ctx.fill();
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(0, 28, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // --- HEAD ---
        // Neck
        ctx.fillStyle = '#FFE0BD';
        ctx.fillRect(-5, -28 + breathe, 10, 8);

        // Head shape
        ctx.fillStyle = '#FFE0BD';
        ctx.beginPath();
        ctx.arc(0, -40 + breathe, 20, 0, Math.PI * 2);
        ctx.fill();

        // Hair (back of head)
        const hairGrad = ctx.createLinearGradient(-18, -60 + breathe, 18, -45 + breathe);
        hairGrad.addColorStop(0, '#3e2723');
        hairGrad.addColorStop(1, '#5d4037');
        ctx.fillStyle = hairGrad;
        ctx.beginPath();
        ctx.arc(0, -42 + breathe, 20, Math.PI, 0); // covers the top half
        ctx.fill();

        // Hair continuing down the back
        ctx.beginPath();
        ctx.roundRect(-16, -45 + breathe, 32, 20, 6);
        ctx.fill();

        // --- CAPE (fluttering) ---
        const capeFlutter = Math.sin(this.gameTime * 8) * 4;
        const capeGrad = ctx.createLinearGradient(-15, -18, -15, 30);
        capeGrad.addColorStop(0, '#ff6f00');
        capeGrad.addColorStop(1, '#e65100');
        ctx.fillStyle = capeGrad;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(-16, -18 + breathe);
        ctx.lineTo(-18, -15 + breathe);
        ctx.quadraticCurveTo(-25 + capeFlutter, 10 + breathe, -20 + capeFlutter * 0.5, 30 + breathe);
        ctx.lineTo(-10 + capeFlutter * 0.3, 25 + breathe);
        ctx.quadraticCurveTo(-12, 5 + breathe, -14, -15 + breathe);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;

        // Shield glow
        if (this.hasShield) {
            ctx.shadowColor = '#4FC3F7';
            ctx.shadowBlur = 30;
            ctx.strokeStyle = '#4FC3F7';
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.6 + Math.sin(this.gameTime * 4) * 0.2;
            ctx.beginPath();
            ctx.arc(0, -10 + breathe, 45, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        // Speed boost trail
        if (this.speedBoost) {
            ctx.globalAlpha = 0.4;
            for (let ti = 1; ti <= 3; ti++) {
                ctx.fillStyle = `rgba(255,215,64,${0.3 / ti})`;
                ctx.beginPath();
                ctx.roundRect(-18 - ti * 2, -20 + breathe + ti * 3, 36, 40, 8);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        // Plank backpack
        if (this.planks > 0) {
            ctx.fillStyle = '#8B4513';
            for (let i = 0; i < Math.min(this.planks, 10); i++) {
                ctx.beginPath();
                ctx.roundRect(-15, -65 + breathe - i * 6, 30, 5, 2);
                ctx.fill();
            }
            // Glow on stack
            if (this.planks >= 5) {
                ctx.fillStyle = 'rgba(255,215,0,0.15)';
                ctx.beginPath();
                ctx.arc(0, -70 + breathe - Math.min(this.planks, 10) * 3, 20, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }

    drawParticles(ctx) {
        for (const p of this.particles) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    createParticles(x, y, color, count = 10) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 5,
                size: 3 + Math.random() * 5,
                color: color,
                life: 1
            });
        }
    }

    adjustColor(hex, amount) {
        const num = parseInt(hex.slice(1), 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return `rgb(${r},${g},${b})`;
    }

    getLevelBriefing(level = this.level) {
        return IELTS_LEVEL_BRIEFINGS[level] || IELTS_LEVEL_BRIEFINGS[1];
    }

    getQuestionMeta(type) {
        return QUESTION_TYPE_META[type] || QUESTION_TYPE_META.default;
    }

    getComboLabel() {
        if (this.combo >= 8) return 'Band-push streak';
        if (this.combo >= 5) return 'Locked in';
        if (this.combo >= 3) return 'Strong rhythm';
        if (this.combo >= 2) return 'Building pace';
        return 'Build momentum';
    }

    showBanner(message, tone = 'info', duration = 1800) {
        const banner = this.container.querySelector('#runner-banner');
        if (!banner) return;

        banner.textContent = message;
        banner.className = `runner-banner ${tone} active`;

        if (this.bannerTimeout) clearTimeout(this.bannerTimeout);
        this.bannerTimeout = setTimeout(() => {
            banner.classList.remove('active');
        }, duration);
    }

    collectCoin() {
        const points = 10 * Math.max(1, this.combo);
        this.score += points;
        this.updateHUD();
        this.createParticles(this.canvasWidth / 2, this.canvasHeight * 0.7, '#FFD700', 5);
        this.playSound('collect'); // Using collect sound for coin
        if (points >= 20) this.showBanner(`Bonus pickup. +${points} score banked.`, 'info', 1200);
    }

    collectPlank() {
        this.planks++;
        const comboMult = Math.max(1, this.combo);
        this.score += 25 * comboMult;
        this.updateHUD();
        this.showFloatText(`+1 🧱 ${comboMult > 1 ? `(${comboMult}x)` : ''}`, 'success');
        this.createParticles(this.canvasWidth / 2, this.canvasHeight * 0.7, '#FFD700', 15);
        this.playSound('collect');
        if (comboMult > 1) this.showBanner('Bridge stock rising. Combo is multiplying plank value.', 'success', 1300);
    }

    hitBarrier() {
        if (this.hasShield) {
            this.hasShield = false;
            this.shieldTimer = 0;
            this.showFloatText('🛡️ Shield blocked!', 'info');
            this.createParticles(this.canvasWidth / 2, this.canvasHeight * 0.7, '#4FC3F7', 20);
            this.playSound('powerup');
            this.showBanner('Shield absorbed the impact. Keep the run alive.', 'info', 1400);
            return;
        }
        if (this.planks > 0) {
            this.planks--;
            this.updateHUD();
            this.showFloatText('-1 🧱', 'error');
        }
        this.combo = 0;
        this.shakeAmount = 12;
        this.flashAlpha = 0.3;
        this.flashColor = 'rgba(244,67,54,0.5)';
        this.createParticles(this.canvasWidth / 2, this.canvasHeight * 0.7, '#F44336', 10);
        this.playSound('hit');
        this.showBanner('Barrier hit. Your bridge stock and streak took a hit.', 'warning', 1500);
    }

    collectPowerUp(powerType) {
        this.playSound('powerup');
        this.flashAlpha = 0.2;
        this.createParticles(this.canvasWidth / 2, this.canvasHeight * 0.7, '#FFD700', 25);
        switch (powerType) {
            case 'shield':
                this.hasShield = true;
                this.shieldTimer = 15;
                this.flashColor = 'rgba(79,195,247,0.3)';
                this.showFloatText('🛡️ SHIELD!', 'success');
                this.showBanner('Shield active. One mistake can be absorbed.', 'success');
                break;
            case 'speedboost':
                this.speedBoost = true;
                this.speedBoostTimer = 5;
                this.flashColor = 'rgba(255,215,64,0.3)';
                this.showFloatText('⚡ SPEED BOOST!', 'success');
                this.showBanner('Speed boost online. Ride the pace while it lasts.', 'success');
                break;
            case 'magnet':
                this.hasMagnet = true;
                this.magnetTimer = 8;
                this.flashColor = 'rgba(224,64,251,0.3)';
                this.showFloatText('🧲 MAGNET!', 'success');
                this.showBanner('Magnet online. Pull every pickup you can.', 'success');
                break;
        }
    }

    triggerQuestion() {
        this.isPaused = true;

        const q = this.getGameQuestion();

        const modal = this.container.querySelector('#question-modal');
        const qText = this.container.querySelector('#q-text');
        const qCategory = this.container.querySelector('#q-category');
        const qHelper = this.container.querySelector('#q-helper');
        const qPressure = this.container.querySelector('#q-pressure');
        const qReward = this.container.querySelector('#q-reward');
        const qOptions = this.container.querySelector('#q-options');
        const timerBar = this.container.querySelector('#timer-bar');
        const meta = this.getQuestionMeta(q.type);
        const timeLimit = Math.max(5.5, 10 - Math.min(3.5, this.level * 0.45));
        const projectedCombo = Math.max(1, this.combo + 1);
        const projectedReward = 100 * projectedCombo;
        let answered = false;

        qText.textContent = q.question;
        this.currentQuestionMeta = meta;
        this.currentQuestionTimeLimit = timeLimit;
        if (qCategory) {
            qCategory.textContent = meta.badge;
            qCategory.style.background = `linear-gradient(135deg, ${meta.colors[0]}, ${meta.colors[1]})`;
        }
        if (qHelper) qHelper.textContent = `${meta.helper} Level ${this.level} pressure is active.`;
        if (qPressure) qPressure.textContent = `Pressure: ${timeLimit.toFixed(1)}s gate`;
        if (qReward) qReward.textContent = `Reward: +${projectedReward} and +3 planks`;

        const allOpts = [q.answer, ...q.distractors].sort(() => Math.random() - 0.5);
        qOptions.innerHTML = allOpts.map(opt =>
            `<button class="opt-btn">${opt}</button>`
        ).join('');

        // Timer
        let timeLeft = timeLimit;
        timerBar.style.width = '100%';
        timerBar.classList.remove('warning');

        const timerInterval = setInterval(() => {
            timeLeft -= 0.1;
            timerBar.style.width = (Math.max(0, timeLeft) / timeLimit * 100) + '%';
            if (timeLeft < Math.min(3, timeLimit * 0.35)) timerBar.classList.add('warning');
            if (timeLeft <= 0 && !answered) {
                answered = true;
                clearInterval(timerInterval);
                qOptions.querySelectorAll('.opt-btn').forEach((b) => {
                    b.disabled = true;
                    if (b.textContent === q.answer) b.classList.add('correct');
                });
                this.showBanner('Time pressure won that gate. Reset and take the next one faster.', 'warning', 1500);
                setTimeout(() => this.answerQuestion(false, modal, q), 700);
            }
        }, 100);

        // Bind answer buttons
        qOptions.querySelectorAll('.opt-btn').forEach(btn => {
            btn.onclick = () => {
                if (answered) return;
                answered = true;
                clearInterval(timerInterval);
                const isCorrect = btn.textContent === q.answer;
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
                qOptions.querySelectorAll('.opt-btn').forEach((b) => b.disabled = true);

                if (!isCorrect) {
                    qOptions.querySelectorAll('.opt-btn').forEach(b => {
                        if (b.textContent === q.answer) b.classList.add('correct');
                    });
                }

                setTimeout(() => {
                    this.answerQuestion(isCorrect, modal, q);
                }, 800);
            };
        });

        modal.classList.add('active');
    }

    answerQuestion(correct, modal, question = null) {
        modal.classList.remove('active');
        this.questionsAnswered++;

        if (correct) {
            this.questionsCorrect++;
            this.combo++;
            this.comboTimer = 10;
            if (this.combo > this.maxCombo) this.maxCombo = this.combo;
            const comboMult = Math.max(1, this.combo);
            const points = 100 * comboMult;
            this.planks += 3;
            this.score += points;
            this.lastQuestionResult = { correct: true, question };
            this.showFloatText(`+${points} ⭐ +3 🧱 ${comboMult > 1 ? `(${comboMult}x!)` : ''}`, 'success');
            this.createParticles(this.canvasWidth / 2, this.canvasHeight / 2, '#4CAF50', 20 + this.combo * 5);
            this.flashAlpha = 0.15;
            this.flashColor = 'rgba(76,175,80,0.4)';
            this.playSound('correct');
            if (this.combo > 1) this.playSound('combo');
            this.showBanner(`${this.currentQuestionMeta.success} +${points} score and +3 planks.`, 'success', 1600);
        } else {
            this.lastQuestionResult = { correct: false, question };
            const plankLoss = this.planks > 0 ? 1 : 0;
            this.combo = 0;
            this.comboTimer = 0;
            this.planks = Math.max(0, this.planks - plankLoss);
            this.showFloatText(plankLoss ? `Wrong! -${plankLoss} 🧱` : 'Wrong! ❌', 'error');
            this.createParticles(this.canvasWidth / 2, this.canvasHeight / 2, '#F44336', 10);
            this.shakeAmount = 8;
            this.playSound('wrong');
            this.showBanner(plankLoss ? `${this.currentQuestionMeta.warning} You also lost 1 plank.` : this.currentQuestionMeta.warning, 'warning', 1700);
        }

        this.updateHUD();
        this.isPaused = false;
    }

    showFloatText(text, type = 'info') {
        const container = this.container.querySelector('#float-texts');
        const div = document.createElement('div');
        div.className = `float-text ${type}`;
        div.textContent = text;
        div.style.left = '50%';
        div.style.top = '40%';
        div.style.transform = 'translateX(-50%)';
        container.appendChild(div);

        setTimeout(() => div.remove(), 1500);
    }

    updateHUD() {
        const plankEl = this.container.querySelector('#plank-count');
        const scoreEl = this.container.querySelector('#score-count');
        const distanceEl = this.container.querySelector('#distance-text');
        const progressBar = this.container.querySelector('.progress-bar');
        const focusTitleEl = this.container.querySelector('#focus-title');
        const focusNoteEl = this.container.querySelector('#focus-note');
        const streakCardEl = this.container.querySelector('#streak-card');
        const streakCountEl = this.container.querySelector('#streak-count');
        const streakLabelEl = this.container.querySelector('#streak-label');

        if (plankEl) plankEl.textContent = this.planks;
        if (scoreEl) scoreEl.textContent = this.score;
        if (distanceEl) distanceEl.textContent = Math.floor(this.distance) + 'm';
        if (focusTitleEl) focusTitleEl.textContent = this.getLevelBriefing().focus;
        if (focusNoteEl) focusNoteEl.textContent = this.getLevelBriefing().note;
        if (streakCountEl) streakCountEl.textContent = `${Math.max(1, this.combo)}x`;
        if (streakLabelEl) streakLabelEl.textContent = this.getComboLabel();
        if (streakCardEl) streakCardEl.classList.toggle('active', this.combo > 1);

        if (progressBar) {
            const levelConf = this.levelConfig[this.level];
            const progress = Math.min(100, (this.distance / levelConf.length) * 100);
            const inner = progressBar.querySelector('.progress-fill');
            if (inner) {
                inner.style.width = progress + '%';
            } else {
                progressBar.innerHTML = `<div class="progress-fill" style="height:100%;width:${progress}%;background:linear-gradient(90deg,#4CAF50,#8BC34A);border-radius:3px;transition:width 0.3s"></div>`;
            }
        }
    }

    renderStartScreen() {
        // Already rendered in createDOM
    }

    loadProgress() {
        try {
            const saved = JSON.parse(localStorage.getItem('UEAH_IELTS_RUNNER'));
            if (saved) {
                this.level = saved.level || 1;
                this.score = saved.totalScore || 0;
            }
        } catch (e) { }
    }

    saveProgress() {
        localStorage.setItem('UEAH_IELTS_RUNNER', JSON.stringify({
            level: this.level,
            totalScore: this.score
        }));
    }

    completeLevel() {
        this.isRunning = false;
        cancelAnimationFrame(this.frameId);

        const config = this.levelConfig[this.level];
        const accuracy = this.questionsAnswered ? Math.round((this.questionsCorrect / this.questionsAnswered) * 100) : 0;
        const stars = accuracy >= 90 && this.maxCombo >= 5 ? '⭐⭐⭐' : accuracy >= 75 ? '⭐⭐' : '⭐';
        const rating = accuracy >= 90 ? 'Band-ready run' : accuracy >= 75 ? 'Strong control' : accuracy >= 55 ? 'Promising but inconsistent' : 'Needs another clean run';

        // Victory flash
        this.flashAlpha = 0.4;
        this.flashColor = 'rgba(255,215,0,0.5)';
        this.playSound('correct');

        // Show completion screen
        const modal = this.container.querySelector('#level-complete');
        this.container.querySelector('.complete-stars').textContent = stars;
        this.container.querySelector('#final-score').textContent = this.score;
        this.container.querySelector('#final-questions').textContent = this.questionsAnswered;
        this.container.querySelector('#final-accuracy').textContent = `${accuracy}%`;
        this.container.querySelector('#final-combo').textContent = `${this.maxCombo}x`;
        this.container.querySelector('#final-note').textContent = this.getLevelBriefing().finish;
        this.container.querySelector('#final-rating').textContent = `Run rating: ${rating}.`;

        if (config.award) {
            this.container.querySelector('#cert-award').textContent = `🏆 ${config.award}`;
            if (this.maxCombo > 1) {
                this.container.querySelector('#cert-award').textContent += ` | 🔥 Max Combo: ${this.maxCombo}x`;
            }

            ProfileStore.addCertificate({
                id: `ielts_runner_${this.level}`,
                title: config.award,
                level: this.level,
                score: this.score,
                maxCombo: this.maxCombo,
                accuracy,
                date: new Date().toISOString()
            });
        }

        modal.classList.add('active');
        this.showBanner(`Level cleared. ${this.getLevelBriefing().finish}`, 'success', 2200);

        // Next level button
        this.container.querySelector('#next-level-btn').onclick = () => {
            if (this.level < 8) this.level++;
            this.saveProgress();
            // Reload game
            this.container.querySelector('#level-complete').classList.remove('active');
            this.container.querySelector('#start-screen').classList.remove('hidden');
            this.container.querySelector('#mobile-controls').classList.remove('active');

            // Update level display
            const levelConf = this.levelConfig[this.level];
            this.container.querySelector('#level-name').textContent = levelConf.title;
            this.container.querySelector('.level-badge').style.background = levelConf.trackColor;
            this.container.querySelector('.level-badge').textContent = `Level ${this.level}`;
            this.container.querySelector('.level-info h2').textContent = levelConf.title;
            this.container.querySelector('#start-focus-title').textContent = this.getLevelBriefing().focus;
            this.container.querySelector('#start-focus-note').textContent = this.getLevelBriefing().note;
            this.container.querySelector('.level-info p').textContent = `🎯 ${levelConf.length}m to complete`;

            // Update sky colors
            const game = this.container.querySelector('.runner-game');
            game.style.background = `linear-gradient(180deg, ${levelConf.skyTop} 0%, ${levelConf.skyBottom} 100%)`;
            this.updateHUD();
        };
    }

    gameOver(reason) {
        this.isRunning = false;
        this.showFloatText("GAME OVER", "error");
        const accuracy = this.questionsAnswered ? Math.round((this.questionsCorrect / this.questionsAnswered) * 100) : 0;

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: absolute; inset: 0; background: rgba(0,0,0,0.88);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            color: white; z-index: 500; text-align: center; padding: 24px;
        `;
        modal.innerHTML = `
            <div style="font-size: 50px; margin-bottom: 20px">💀</div>
            <h2 style="font-size: 32px; margin: 0 0 10px; color: #F44336">RUN BROKEN</h2>
            <p style="font-size: 18px; color: #ccc; margin-bottom: 18px; max-width: 40ch">${reason}</p>
            <div style="display:flex;gap:22px;flex-wrap:wrap;justify-content:center;margin-bottom:26px;color:#fff;font-weight:700">
                <div>Score: ${this.score}</div>
                <div>Distance: ${Math.floor(this.distance)}m</div>
                <div>Accuracy: ${accuracy}%</div>
                <div>Max Combo: ${this.maxCombo}x</div>
            </div>
            <p style="font-size: 14px; color: #aab2c0; margin: 0 0 26px; max-width: 42ch">Tip: protect plank stock, keep question streaks alive, and use jumps earlier before barrier or gap pressure peaks.</p>
            <button class="play-btn" id="retry-btn">TRY AGAIN ↺</button>
        `;

        this.container.querySelector('.ui-overlay').appendChild(modal);

        modal.querySelector('#retry-btn').onclick = () => {
            modal.remove();
            this.startGame();
        };
    }

    cleanup() {
        if (this.frameId) cancelAnimationFrame(this.frameId);
        if (this.bannerTimeout) clearTimeout(this.bannerTimeout);
        document.removeEventListener('keydown', this.keyHandler);
        const style = this.container.querySelector('#runner-styles');
        if (style) style.remove();
    }

    start() {
        // Called by game-play.js external Start Game button
        if (!this.isRunning) {
            this.startGame();
        }
    }
}

export function createGame(container, config) {
    return new IeltsRunnerGame(container, config);
}
