/* assets/js/games/11-12/context-clues.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class ContextClues extends GameBase {
    async init() {
        await this.init3D(); // Keep standard 3D background wrapper

        this.questions = [
            {
                sentence: "The **gregarious** puppy loved playing with everyone in the park.",
                word: "gregarious",
                correct: "Sociable",
                options: ["Sociable", "Shy", "Angry", "Lazy"],
                hint: "Think about how it plays with 'everyone'."
            },
            {
                sentence: "The math problem was so **intricate** that it took an hour to solve.",
                word: "intricate",
                correct: "Complicated",
                options: ["Complicated", "Simple", "Short", "Boring"],
                hint: "It took a long time to solve."
            },
            {
                sentence: "She felt **melancholy** when her best friend moved away.",
                word: "melancholy",
                correct: "Sad",
                options: ["Sad", "Happy", "Excited", "Hungry"],
                hint: "How would you feel if a friend left?"
            },
            {
                sentence: "The **candid** photos captured the family laughing naturally.",
                word: "candid",
                correct: "Unposed",
                options: ["Unposed", "Blurry", "Dark", "Staged"],
                hint: "Laughing 'naturally' suggests it wasn't planned."
            },
            {
                sentence: "His **arrogant** attitude made it hard for others to work with him.",
                word: "arrogant",
                correct: "Over-confident",
                options: ["Over-confident", "Humble", "Kind", "Quiet"],
                hint: "People didn't want to work with him."
            },
            {
                sentence: "The library is a **sanctuary** of silence and learning.",
                word: "sanctuary",
                correct: "Safe place",
                options: ["Safe place", "Noisy room", "Market", "Dungeon"],
                hint: "A place for silence and safety."
            },
            {
                sentence: "The **vivid** colors of the sunset were breathtaking.",
                word: "vivid",
                correct: "Bright",
                options: ["Bright", "Dull", "Grey", "Invisible"],
                hint: "Breathtaking colors are usually..."
            },
            {
                sentence: "He made a **futile** attempt to fix the broken vase with glue.",
                word: "futile",
                correct: "Useless",
                options: ["Useless", "Successful", "Smart", "Quick"],
                hint: "If the vase is still broken, the attempt was..."
            },
            {
                sentence: "The **hostile** crowd booed the opposing team.",
                word: "hostile",
                correct: "Unfriendly",
                options: ["Unfriendly", "Cheering", "Small", "Calm"],
                hint: "Booing is not a nice thing to do."
            },
            {
                sentence: "She was **skeptical** about the magical claims of the potion.",
                word: "skeptical",
                correct: "Doubtful",
                options: ["Doubtful", "Believing", "Sure", "Excited"],
                hint: "If it sounds like magic, you might doubt it."
            },
            {
                sentence: "The scientist's **hypothesis** was proven correct after the experiment.",
                word: "hypothesis",
                correct: "Theory",
                options: ["Theory", "Fact", "Question", "Result"],
                hint: "Scientists test these before they become facts."
            },
            {
                sentence: "The **obsolete** computer could barely run any modern software.",
                word: "obsolete",
                correct: "Outdated",
                options: ["Outdated", "Popular", "Expensive", "Fast"],
                hint: "It can't run modern software because it's too..."
            },
            {
                sentence: "Her **eloquent** speech convinced everyone to support the cause.",
                word: "eloquent",
                correct: "Well-spoken",
                options: ["Well-spoken", "Quiet", "Boring", "Short"],
                hint: "The speech 'convinced everyone'."
            },
            {
                sentence: "The **diligent** student always finished homework on time.",
                word: "diligent",
                correct: "Hardworking",
                options: ["Hardworking", "Lazy", "Lucky", "Distracted"],
                hint: "Always finishing on time requires effort."
            },
            {
                sentence: "The magician's trick was so **baffling** that no one could explain it.",
                word: "baffling",
                correct: "Confusing",
                options: ["Confusing", "Obvious", "Boring", "Simple"],
                hint: "No one could explain it because it was..."
            }
        ];

        this.currentQIndex = 0;
        this.score = 0;
        this.cluesUsed = 0;

        // Setup UI
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; font-family: 'Courier New', monospace; background: #1a1a1a; color: #eee; display: flex; flex-direction: column;">
                <!-- Header -->
                <div style="padding: 20px; border-bottom: 2px solid #555; display: flex; justify-content: space-between; align-items: center; background: #222;">
                    <div style="font-size: 24px;">🕵️ Context Clues</div>
                    <div style="font-size: 20px;">Score: <span id="score-display">0</span></div>
                </div>

                <!-- Game Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; position: relative;">
                    
                    <!-- Magnifying Glass Effect (Background Decoration) -->
                    <div style="position: absolute; width: 300px; height: 300px; border: 15px solid rgba(255,255,255,0.05); border-radius: 50%; pointer-events: none; top: 10%; left: 10%;"></div>
                    <div style="position: absolute; width: 150px; height: 15px; background: rgba(255,255,255,0.05); transform: rotate(45deg); top: 50%; left: 40%; pointer-events: none;"></div>

                    <!-- Case File (Question Card) -->
                    <div id="case-file" style="background: #e8d0aa; color: #333; padding: 40px; width: 90%; max-width: 700px; box-shadow: 10px 10px 30px rgba(0,0,0,0.5); transform: rotate(-1deg); position: relative;">
                        <div style="position: absolute; top: -15px; left: 20px; background: #d32f2f; color: white; padding: 5px 15px; font-weight: bold; transform: rotate(-2deg); box-shadow: 2px 2px 5px rgba(0,0,0,0.3);">EVIDENCE #<span id="q-num">1</span></div>
                        
                        <p id="sentence-display" style="font-size: 26px; line-height: 1.5; margin-bottom: 30px; font-family: 'Georgia', serif;">
                            Loading case...
                        </p>
                        
                        <div id="hint-box" style="display: none; background: rgba(0,0,0,0.1); padding: 10px; margin-bottom: 20px; border-left: 4px solid #d32f2f; font-style: italic;">
                            💡 Hint: <span id="hint-text"></span>
                        </div>

                        <div id="options-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <!-- Buttons -->
                        </div>

                        <button id="clue-btn" style="margin-top: 20px; background: transparent; border: 2px dashed #555; padding: 5px 10px; cursor: pointer; display: block; margin-left: auto;">🔍 Use Magnifying Glass (-50 pts)</button>
                    </div>

                </div>
                
                <!-- Feedback Overlay -->
                <div id="feedback-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); display: none; align-items: center; justify-content: center; z-index: 20;">
                    <div style="text-align: center; color: white;">
                        <div id="feedback-icon" style="font-size: 80px; margin-bottom: 20px;"></div>
                        <div id="feedback-text" style="font-size: 32px; font-weight: bold;"></div>
                        <button id="next-btn" style="margin-top: 30px; padding: 10px 30px; font-size: 18px; cursor: pointer;">Next Case</button>
                    </div>
                </div>
            </div>
        `;

        // Event listeners
        this.container.querySelector('#clue-btn').addEventListener('click', () => this.showHint());
        this.container.querySelector('#next-btn').addEventListener('click', () => this.nextQuestion());

        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQIndex >= this.questions.length) {
            this.showEndScreen();
            return;
        }

        const q = this.questions[this.currentQIndex];

        // Update UI
        this.container.querySelector('#q-num').textContent = this.currentQIndex + 1;
        this.container.querySelector('#sentence-display').innerHTML = q.sentence; // InnerHTML to support <b> tags
        this.container.querySelector('#hint-text').textContent = q.hint;
        this.container.querySelector('#hint-box').style.display = 'none';
        this.container.querySelector('#clue-btn').style.display = 'block';
        this.container.querySelector('#clue-btn').disabled = false;

        const optsContainer = this.container.querySelector('#options-container');
        optsContainer.innerHTML = '';

        const shuffledOpts = this.shuffle([...q.options]);

        shuffledOpts.forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.style.cssText = `
                padding: 15px; 
                border: 2px solid #555; 
                background: white; 
                font-size: 18px; 
                font-weight: bold; 
                cursor: pointer; 
                transition: transform 0.1s;
                font-family: 'Courier New', monospace;
                text-align: left;
            `;
            btn.onclick = () => this.checkAnswer(opt, q.correct);
            btn.onmouseover = () => btn.style.background = '#f0f0f0';
            btn.onmouseout = () => btn.style.background = 'white';
            optsContainer.appendChild(btn);
        });
    }

    showHint() {
        this.container.querySelector('#hint-box').style.display = 'block';
        this.container.querySelector('#clue-btn').style.display = 'none';
        this.score -= 50; // Penalty
        this.container.querySelector('#score-display').textContent = this.score;
    }

    checkAnswer(selected, correct) {
        const feedbackOverlay = this.container.querySelector('#feedback-overlay');
        const feedbackIcon = this.container.querySelector('#feedback-icon');
        const feedbackText = this.container.querySelector('#feedback-text');

        feedbackOverlay.style.display = 'flex';

        if (selected === correct) {
            feedbackIcon.textContent = '✅';
            feedbackText.textContent = 'Correct! Case Closed.';
            this.score += 100;
        } else {
            feedbackIcon.textContent = '❌';
            feedbackText.textContent = `Incorrect. It meant: "${correct}"`;
        }

        this.container.querySelector('#score-display').textContent = this.score;
    }

    nextQuestion() {
        this.container.querySelector('#feedback-overlay').style.display = 'none';
        this.currentQIndex++;
        this.loadQuestion();
    }

    showEndScreen() {
        this.container.innerHTML = `
             <div style="position: absolute; inset: 0; background: #1a1a1a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; font-family: 'Courier New', monospace;">
                <h1 style="font-size: 50px; margin-bottom: 20px;">Investigation Complete 🕵️</h1>
                <p style="font-size: 30px;">Final Score: ${this.score}</p>
                 <div style="margin-top: 30px;">
                    <button onclick="location.reload()" style="padding: 15px 30px; font-size: 20px; background: #d32f2f; border: none; color: white; cursor: pointer; margin-right: 15px;">Re-open Cases</button>
                    <button onclick="window.history.back()" style="padding: 15px 30px; font-size: 20px; background: transparent; border: 2px solid white; color: white; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new ContextClues(container, config);
}
