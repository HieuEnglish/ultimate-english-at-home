"""
Generate prebuilt test audio clips from exported prompt JSON.

Usage:
  python tools/tts/generate-prebuilt-audio.py
  python tools/tts/generate-prebuilt-audio.py --input tmp/tts-prompts.json --voice en-US-AriaNeural

Requires:
  pip install edge-tts
"""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import re
from pathlib import Path

import edge_tts


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_INPUT = REPO_ROOT / "tmp" / "tts-prompts.json"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "assets" / "audio" / "tts"
DEFAULT_AUDIO_DIR = DEFAULT_OUTPUT_DIR / "files"
DEFAULT_MANIFEST = DEFAULT_OUTPUT_DIR / "manifest.json"


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip()


def normalize_key(text: str) -> str:
    return normalize_text(text).lower()


def is_meaningful_text(text: str) -> bool:
    return bool(re.search(r"[A-Za-z0-9]", normalize_text(text)))


def slug_prefix(text: str, limit: int = 32) -> str:
    cleaned = re.sub(r"[^a-z0-9]+", "-", normalize_key(text))
    cleaned = cleaned.strip("-")
    return cleaned[:limit].strip("-") or "clip"


async def generate_clip(text: str, voice: str, rate: str, path: Path) -> None:
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            communicate = edge_tts.Communicate(
                text=text,
                voice=voice,
                rate=rate,
            )
            await communicate.save(str(path))
            return
        except Exception as exc:
            last_error = exc
            if path.exists():
                path.unlink(missing_ok=True)
            await asyncio.sleep(0.6 * (attempt + 1))
    if last_error is not None:
        raise last_error


async def generate_one(entry: dict[str, object], voice: str, rate: str, semaphore: asyncio.Semaphore) -> tuple[str, dict[str, object], bool]:
    text = normalize_text(entry.get("text", ""))
    key = normalize_key(text)
    digest = hashlib.sha1(text.encode("utf-8")).hexdigest()[:12]
    filename = f"{slug_prefix(text)}-{digest}.mp3"
    relative_src = f"files/{filename}"
    file_path = DEFAULT_AUDIO_DIR / filename

    async with semaphore:
        if not file_path.exists():
            try:
                await generate_clip(text, voice, rate, file_path)
            except Exception as exc:
                raise RuntimeError(f"Failed to synthesize prompt: {text[:120]}") from exc
            created = True
        else:
            created = False

    return key, {
        "src": relative_src,
        "text": text,
        "size": file_path.stat().st_size,
        "voice": voice,
        "format": "audio-24khz-48kbitrate-mono-mp3",
        "keys": entry.get("keys", []),
        "banks": entry.get("banks", []),
    }, created


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--voice", default="en-US-AriaNeural")
    parser.add_argument("--rate", default="-5%")
    parser.add_argument("--format", default="audio-24khz-48kbitrate-mono-mp3")
    parser.add_argument("--concurrency", type=int, default=4)
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    input_path = args.input
    output_dir = args.output_dir
    audio_dir = output_dir / "files"
    manifest_path = output_dir / "manifest.json"

    data = json.loads(input_path.read_text(encoding="utf-8"))
    prompts = data.get("prompts", [])
    if args.limit > 0:
      prompts = prompts[: args.limit]

    output_dir.mkdir(parents=True, exist_ok=True)
    audio_dir.mkdir(parents=True, exist_ok=True)

    global DEFAULT_AUDIO_DIR
    DEFAULT_AUDIO_DIR = audio_dir

    manifest_items: dict[str, dict[str, object]] = {}
    generated = 0

    semaphore = asyncio.Semaphore(max(1, args.concurrency))
    tasks = [
        generate_one(entry, args.voice, args.rate, semaphore)
        for entry in prompts
        if is_meaningful_text(entry.get("text", ""))
    ]

    for key, manifest_entry, created in await asyncio.gather(*tasks):
        manifest_items[key] = manifest_entry
        if created:
            generated += 1

    manifest = {
        "generatedAt": data.get("generatedAt"),
        "voice": args.voice,
        "rate": args.rate,
        "format": args.format,
        "count": len(manifest_items),
        "items": manifest_items,
    }
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    total_bytes = sum(item["size"] for item in manifest_items.values())
    print(
        json.dumps(
            {
                "generated": generated,
                "count": len(manifest_items),
                "totalBytes": total_bytes,
                "manifest": str(manifest_path),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    asyncio.run(main())
