/* Generic Game Template */
const { GameBase } = window.UEAH_GAME_ENGINE;

class GenericGame extends GameBase {
    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper" style="display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; text-align:center; height:100%;">
                <div style="font-size: 80px; margin-bottom: 20px;">${this.config.emoji || '🎮'}</div>
                <h1 style="font-size: 40px; margin-bottom: 10px; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">${this.config.title}</h1>
                <p style="font-size: 24px; max-width: 600px; background: rgba(0,0,0,0.5); padding: 20px; border-radius: 12px;">
                    ${this.config.description}
                </p>
                <div style="margin-top:40px; font-size: 18px; opacity: 0.8;">Content coming soon!</div>
            </div>
        `;

        // Add some random floating 3D shapes
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshNormalMaterial({ wireframe: true });
        this.threeHelper.addFloatingObject(geometry, material, 10);

        this.showStartOverlay();
    }

    start() {
        super.start();
        // Just run a timer loop for fun
        if (this.config.hasTimer) {
            // Timer handled by super
        }
    }
}

export function createGame(container, config) {
    return new GenericGame(container, config);
}
