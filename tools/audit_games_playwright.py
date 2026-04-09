from pathlib import Path
import json
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:4173'
ROOT = Path(r'C:/Users/ZM/Desktop/Tattoo/UEAH_repo')
OUT = ROOT / 'tmp' / 'games-audit-report.json'
OUT.parent.mkdir(parents=True, exist_ok=True)


def route_for(game):
    if game['age'] == 'featured':
        return f"{BASE}/games/featured/comprehensive/{game['slug']}"
    return f"{BASE}/games/{game['age']}/{game['skill']}/{game['slug']}"


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, permissions=['microphone'])
    context.add_init_script("""
        window.speechSynthesis = window.speechSynthesis || {
          cancel() {}, speak() {}, getVoices() { return []; },
          addEventListener() {}, removeEventListener() {}
        };
        class MockRecognition {
          start() { setTimeout(() => this.onresult && this.onresult({ results: [[{ transcript: 'test', confidence: 0.9 }]] }), 200); }
          stop() {}
          abort() {}
        }
        window.SpeechRecognition = window.SpeechRecognition || MockRecognition;
        window.webkitSpeechRecognition = window.webkitSpeechRecognition || MockRecognition;
    """)

    page = context.new_page()
    shell_errors = []
    page.on('pageerror', lambda e: shell_errors.append({'type': 'pageerror', 'message': str(e)}))
    page.on('console', lambda msg: shell_errors.append({'type': 'console', 'message': msg.text}) if msg.type == 'error' else None)
    page.goto(f'{BASE}/games', wait_until='networkidle')
    page.wait_for_function("() => Boolean(window.UEAH_GAMES_STORE?.getAllGames)")
    games = page.evaluate("() => window.UEAH_GAMES_STORE.getAllGames()")

    results = []
    for index, game in enumerate(games, start=1):
        route = route_for(game)
        gp = context.new_page()
        errors = []
        gp.on('pageerror', lambda e, errors=errors: errors.append({'type': 'pageerror', 'message': str(e)}))
        gp.on('console', lambda msg, errors=errors: errors.append({'type': 'console', 'message': msg.text}) if msg.type == 'error' else None)
        print(f"[{index}/{len(games)}] {game['slug']}", flush=True)
        try:
            gp.goto(route, wait_until='domcontentloaded', timeout=10000)
            gp.wait_for_selector('#game-container', timeout=5000)
            gp.wait_for_timeout(500)
            before = gp.evaluate("""() => ({
                loadError: Boolean(document.querySelector('.game-error')),
                containerText: document.querySelector('#game-container')?.innerText?.trim()?.slice(0, 300) || '',
                status: document.querySelector('#game-status-pill')?.textContent?.trim() || '',
                title: document.querySelector('.page-title')?.textContent?.trim() || ''
            })""")

            try:
                gp.locator('#game-start-btn').click(timeout=1500)
                gp.wait_for_timeout(900)
            except Exception:
                pass

            after = gp.evaluate("""() => ({
                loadError: Boolean(document.querySelector('.game-error')),
                resultOverlay: Boolean(document.querySelector('.game-results-overlay')),
                hasCanvas: Boolean(document.querySelector('canvas')),
                hasButtons: document.querySelectorAll('button').length,
                hasInputs: document.querySelectorAll('input, textarea, select').length,
                stageText: document.querySelector('#game-container')?.innerText?.trim()?.slice(0, 400) || '',
                status: document.querySelector('#game-status-pill')?.textContent?.trim() || ''
            })""")

            results.append({
                'slug': game['slug'],
                'age': game['age'],
                'skill': game['skill'],
                'route': route,
                'errors': errors,
                'before': before,
                'after': after,
            })
        except Exception as e:
            results.append({
                'slug': game['slug'],
                'age': game['age'],
                'skill': game['skill'],
                'route': route,
                'errors': errors + [{'type': 'fatal', 'message': str(e)}],
            })
        finally:
            gp.close()

    browser.close()

report = {
    'summary': {
        'shellErrors': shell_errors,
        'total': len(results),
        'withErrors': len([r for r in results if r.get('errors')]),
        'loadErrors': len([r for r in results if r.get('before', {}).get('loadError') or r.get('after', {}).get('loadError')]),
    },
    'results': results,
}
OUT.write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report['summary'], indent=2))
print(str(OUT))
