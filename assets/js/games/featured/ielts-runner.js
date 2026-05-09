/* assets/js/games/featured/ielts-runner.js
   IELTS Sky Quest wrapper.

   The open world is vendored from:
   https://github.com/dannylimanseta/tinyskies
*/

export class IeltsRunnerGame {
    constructor(container, config) {
        this.container = container;
        this.config = config || {};
        this.iframe = null;
        this.started = false;
    }

    async init() {
        this.container.innerHTML = `
            <div class="tinyskies-shell">
                <div class="tinyskies-viewport" id="tinyskies-viewport">
                    <div class="tinyskies-cover" id="tinyskies-cover" data-game-start-overlay>
                        <div class="tinyskies-cover__panel">
                            <div class="tinyskies-cover__mark">AIR</div>
                            <h2>IELTS Sky Quest</h2>
                            <p>Open-world globe flight imported from Tiny Skies, adapted to run inside UEAH.</p>
                            <button class="tinyskies-cover__button" type="button" data-game-start>Enter open world</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.injectStyles();
        this.container.querySelector('[data-game-start]')?.addEventListener('click', () => this.start());
    }

    injectStyles() {
        const style = document.createElement('style');
        style.id = 'tinyskies-wrapper-styles';
        style.textContent = `
            .tinyskies-shell {
                position: relative;
                width: 100%;
                min-height: 720px;
                border-radius: 18px;
                overflow: hidden;
                background: #050816;
                box-shadow: 0 24px 70px rgba(3, 7, 18, 0.32);
            }
            .tinyskies-viewport {
                position: absolute;
                inset: 0;
                background:
                    radial-gradient(circle at 50% 20%, rgba(125, 211, 252, 0.22), transparent 36%),
                    linear-gradient(180deg, #0f172a, #020617);
            }
            .tinyskies-frame {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                border: 0;
                display: block;
                background: #020617;
            }
            .tinyskies-cover {
                position: absolute;
                inset: 0;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 24px;
                background:
                    radial-gradient(circle at 50% 24%, rgba(186, 230, 253, 0.5), transparent 28%),
                    linear-gradient(180deg, rgba(15, 23, 42, 0.3), rgba(2, 6, 23, 0.94));
            }
            .tinyskies-cover.is-hidden {
                display: none;
            }
            .tinyskies-cover__panel {
                width: min(520px, 100%);
                text-align: center;
                color: #f8fafc;
            }
            .tinyskies-cover__mark {
                width: 76px;
                height: 76px;
                margin: 0 auto 16px;
                display: grid;
                place-items: center;
                border-radius: 999px;
                background: linear-gradient(135deg, #38bdf8, #4f46e5);
                box-shadow: 0 22px 54px rgba(56, 189, 248, 0.26);
                font-weight: 1000;
                letter-spacing: 0.04em;
            }
            .tinyskies-cover h2 {
                margin: 0;
                color: #ffffff;
                font-size: clamp(38px, 7vw, 62px);
                line-height: 0.95;
                font-weight: 1000;
            }
            .tinyskies-cover p {
                margin: 16px auto 24px;
                max-width: 44ch;
                color: rgba(248, 250, 252, 0.76);
                font-size: 15px;
                line-height: 1.55;
                font-weight: 700;
            }
            .tinyskies-cover__button {
                min-height: 54px;
                padding: 0 28px;
                border: 0;
                border-radius: 999px;
                cursor: pointer;
                background: #ffffff;
                color: #0f172a;
                font-size: 15px;
                font-weight: 1000;
                box-shadow: 0 18px 40px rgba(15, 23, 42, 0.28);
            }
            .tinyskies-cover__button:hover {
                transform: translateY(-1px);
            }
            @media (max-width: 760px) {
                .tinyskies-shell {
                    min-height: 680px;
                    border-radius: 14px;
                }
            }
        `;
        this.container.appendChild(style);
    }

    start() {
        if (this.started) return;
        this.started = true;

        const viewport = this.container.querySelector('#tinyskies-viewport');
        const cover = this.container.querySelector('#tinyskies-cover');
        const src = new URL('assets/vendor/tinyskies/index.html?ueahAuto=1&ueahBuild=20260509-clean', document.baseURI).href;

        this.iframe = document.createElement('iframe');
        this.iframe.className = 'tinyskies-frame';
        this.iframe.title = 'IELTS Sky Quest open world';
        this.iframe.allow = 'fullscreen; autoplay; gamepad';
        this.iframe.addEventListener('load', () => this.cleanTinySkiesBranding());
        this.iframe.src = src;
        viewport.appendChild(this.iframe);
        cover?.classList.add('is-hidden');

        this.container.dispatchEvent(new CustomEvent('ueah:game-status', {
            bubbles: true,
            detail: {
                label: 'Open world live',
                message: 'Tiny Skies is running inside the IELTS featured game route.',
                kind: 'active',
            },
        }));
    }

    cleanTinySkiesBranding() {
        const frameDoc = this.iframe?.contentDocument;
        if (!frameDoc) return;

        const style = frameDoc.createElement('style');
        style.textContent = `
            script[src*="vibej"],
            iframe[src*="vibej"],
            a[href*="vibej"],
            [class*="vibe" i],
            [id*="vibe" i] {
                display: none !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        `;
        frameDoc.head?.appendChild(style);

        const removeInjectedBranding = () => {
            const candidates = Array.from(frameDoc.querySelectorAll('a, div, span, p, iframe, script'));
            for (const element of candidates) {
                const text = element.textContent || '';
                const href = element.getAttribute('href') || '';
                const src = element.getAttribute('src') || '';
                const label = element.getAttribute('aria-label') || '';
                if (/vibe\s*jam|vibejam|vibej/i.test(`${text} ${href} ${src} ${label}`)) {
                    element.remove();
                }
            }
        };

        removeInjectedBranding();
        window.setTimeout(removeInjectedBranding, 500);
        window.setTimeout(removeInjectedBranding, 1500);
        window.setTimeout(removeInjectedBranding, 3000);
    }

    cleanup() {
        this.container.querySelector('#tinyskies-wrapper-styles')?.remove();
        this.iframe?.remove();
        this.iframe = null;
        this.started = false;
    }
}

export function createGame(container, config) {
    return new IeltsRunnerGame(container, config);
}
