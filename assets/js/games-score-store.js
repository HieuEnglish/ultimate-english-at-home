/* assets/js/games-score-store.js
   UEAH Games Score Store - Save/load game scores to localStorage
   
   Features:
   - Track high scores per game
   - Track play count and last played
   - Link to profile for persistence
   - Dispatch events on score changes
*/

(function () {
    "use strict";

    const STORAGE_KEY = "UEAH_GAME_SCORES_V1";

    // Load scores from localStorage
    function loadScores() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            const data = JSON.parse(raw);
            return typeof data === "object" && data !== null ? data : {};
        } catch (_) {
            return {};
        }
    }

    // Save scores to localStorage
    function saveScores(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            window.dispatchEvent(new CustomEvent("ueah:game-scores-changed"));
        } catch (_) {
            // ignore storage errors
        }
    }

    // Get score entry for a game
    function getGameScore(gameSlug) {
        const scores = loadScores();
        return scores[gameSlug] || null;
    }

    // Get high score for a game
    function getHighScore(gameSlug) {
        const entry = getGameScore(gameSlug);
        return entry ? entry.highScore : 0;
    }

    // Save a new score - returns true if it's a new high score
    function saveGameScore(gameSlug, score, metadata = {}) {
        const scores = loadScores();
        const existing = scores[gameSlug] || {
            highScore: 0,
            playCount: 0,
            lastPlayed: null,
            history: [],
        };

        const isNewHighScore = score > existing.highScore;

        existing.playCount += 1;
        existing.lastPlayed = new Date().toISOString();

        if (isNewHighScore) {
            existing.highScore = score;
        }

        // Keep last 10 plays in history
        existing.history.unshift({
            score,
            date: existing.lastPlayed,
            ...metadata,
        });
        if (existing.history.length > 10) {
            existing.history = existing.history.slice(0, 10);
        }

        scores[gameSlug] = existing;
        saveScores(scores);

        // Dispatch high score event if new record
        if (isNewHighScore && score > 0) {
            window.dispatchEvent(
                new CustomEvent("ueah:new-high-score", {
                    detail: { gameSlug, score, previousHigh: existing.highScore - score + score },
                })
            );
        }

        return isNewHighScore;
    }

    // Get all scores
    function getAllScores() {
        return loadScores();
    }

    // Clear all scores
    function clearAllScores() {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new CustomEvent("ueah:game-scores-changed"));
    }

    // Get total stats
    function getTotalStats() {
        const scores = loadScores();
        const entries = Object.values(scores);
        return {
            gamesPlayed: entries.length,
            totalPlays: entries.reduce((sum, e) => sum + (e.playCount || 0), 0),
            totalScore: entries.reduce((sum, e) => sum + (e.highScore || 0), 0),
        };
    }

    // Export for sync
    function exportData() {
        return loadScores();
    }

    // Import for sync
    function importData(data) {
        if (typeof data !== "object" || data === null) return;
        const current = loadScores();
        // Merge: keep higher scores
        for (const [slug, entry] of Object.entries(data)) {
            if (!current[slug] || entry.highScore > current[slug].highScore) {
                current[slug] = entry;
            }
        }
        saveScores(current);
    }

    // Expose globally
    window.UEAH_GAME_SCORES = {
        getGameScore,
        getHighScore,
        saveGameScore,
        getAllScores,
        clearAllScores,
        getTotalStats,
        exportData,
        importData,
    };
})();
