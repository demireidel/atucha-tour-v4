
# Atucha Tour v4 — Next 15 + React 19 + R3F v9

Production-ready scaffold that preserves your `public/` assets and lets you scale from **Basic → Pro → Cinematic**.
Includes **Guided Tour** (keyframed camera) and **Recorder** (WebM).

## Quick Start
```bash
nvm install 22 && nvm use 22
pnpm i
node scripts/copy-decoders.mjs
pnpm dev
```
Open http://localhost:3000

### Assets
Keep paths identical (e.g., `public/models/atucha-ii.glb`).

### Routes
- `/` — hero + quality toggle
- `/free-roam` — orbit controls, your model
- `/tour/demo` — guided camera tour + overlay + recorder

### Deploy
Push to GitHub → Import to Vercel → Set Node 22.x
