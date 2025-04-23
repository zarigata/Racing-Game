# PS1 Vibe Racing Game

A humorous, retro PS1–style 3D racing game running in the browser and hosted on GitHub Pages. Featuring procedurally generated pixel/Perlin textures, dynamic track wallpapers, quirky vehicles, AI opponents, and a Twisted Metal–inspired UI.

---

## 🎮 Overview

- **Genre:** Third-person 3D racing with low-poly models, pixelated textures, vibrant colors, and Twisted Metal–style overlays.
- **Theme:** Absurd vehicles (e.g., Toaster Car, Rubber Duck Boat), wacky tracks (e.g., Kitchen Chaos), comedic power-ups and obstacles.
- **Goal:** Race 3 laps against 3–5 AI opponents, use power-ups, avoid hazards, and finish first.

## 🛠️ Technical Requirements

- **Platform:** Single-page web application (HTML, JS, WebGL via Three.js) on GitHub Pages.
- **Libraries:** Three.js, Tone.js, MIDI.js, noise.js.
- **Dynamic Wallpaper:** CSS/Canvas backgrounds that change per track theme.
- **Performance:** Optimize for 30 FPS on low-end devices; test on Chrome, Firefox, Edge (WebGL).
- **Cross-Browser:** Feature-detect WebGL and provide fallback.

## 📁 File Structure

```
/ (root)
├─ index.html           # loads all scripts and styles
├─ styles.css           # retro/Twisted Metal UI & wallpaper styles
├─ assets.js            # procedural generation (textures, models, wallpapers)
├─ render.js            # scene, camera, lighting, animate loop
├─ input.js             # keyboard controls
├─ audio.js             # MIDI playback, Tone.js sfx, playlist system
├─ gameLogic.js         # player & AI physics, collisions, laps
├─ ui.js                # Twisted Metal menu, HUD, driver & music selection
├─ drivers.js           # driver profiles, AI-generated pics, localStorage
├─ tracks.js            # procedural track geometry & waypoints
├─ game.js              # entry point wiring init/start loop
├─ project.md           # this document
├─ images/              # AI-generated driver portraits & decals
├─ music/               # MIDI files for tracks
└─ soundfonts/          # MIDI.js soundfonts
```

## 📦 Asset Generation

- **Textures:** Runtime-generated (16×16–512×512) via Perlin noise & Canvas; stored as Three.js CanvasTextures/data-URLs.
- **Dynamic Wallpapers:** Canvas/CSS animations (floating toasters, spinning pizzas) per track.
- **Models:** Low-poly primitives (boxes, ramps, loops) built procedurally.

## 🎵 Audio & Sound Effects

- **Music Playlist:** MIDI.js plays `/music` files; user selects track via menu.
- **Sound Effects:** Tone.js synthesizes skids, honks, boings; randomize pitch/duration.
- **Soundfonts:** Stored in `/soundfonts` for MIDI.js.

## 🔧 Customization Features

- **Driver Profiles:** AI-generated PNG portraits in `/images`; selected in menu; stats in `drivers.js`; persisted in localStorage.
- **Vehicle Decals:** Procedurally generated in `assets.createCarTexture()` or via loaded images.
- **Music Selection:** In-race menu to switch tracks.
- **Settings Panel:** Adjust volume, controls, graphics quality.

## 🚦 Game Flow

1. **Load:** `assets.init()`, `render.init()`, `input.init()`, `audio.init()`, `ui.init()`
2. **Menu:** Fullscreen Twisted Metal overlay; navigate drivers, music, settings with ↑/↓/Enter.
3. **Race Start:** Hide menu, show HUD; apply dynamic wallpaper.
4. **Gameplay:** Player (Arrow keys → accelerate/steer; Space → boost); AI follows `tracks.waypoints`.
5. **Update Loop:** `gameLogic.update(delta)`, `ui.updateHUD()`, `renderer.render()`.
6. **Track Events:** Power-ups, hazards, lap triggers.
7. **Finish:** Display end-screen with position, time, achievements.

## ✨ Style & Guidelines

- **Comments:** Use `// CODEX:` prefix for code comments and documentation.
- **UI Theme:** Dark metallic overlays, red/white glow, pixel fonts, scanlines if desired.
- **Textures:** Fully procedural—no external PNGs (except driver portraits).
- **Performance:** Target 30 FPS on low-end devices; keep polycount & texture resolution modest.
- **Cross-Browser:** Chrome, Firefox, Edge; fallback checks for WebGL.

## 📋 Milestones & Next Steps

1. **Power-Ups & Obstacles:** Banana Peel, Super Squeak, Speedy Snack, rolling oranges, syrup puddles.
2. **Collision Effects:** Bounce, skid sfx, camera shake.
3. **Lap & Timer Logic:** Implement lap counters, finish line triggers.
4. **Menus & Settings:** Audio volume, controls remapping, driver selection screen.
5. **Achievements & Easter Eggs:** Unlockable vehicles, cheat codes, hidden shortcuts.
6. **Mini-Games & Extras:** Toaster Slap mini-game, dynamic backgrounds per track.
7. **Deploy & QA:** Test on GitHub Pages, update README with deployment steps.

## 🚀 Deployment

1. Commit all files to `main` branch.
2. In GitHub repo **Settings → Pages**, select `main`/root.
3. Access the game at `https://<your‑username>.github.io/Racing‑Game/`.

---

## 📝 Contribution

- Create feature branches, open PRs.
- Follow `CODEX` comment style.
- Keep modules isolated—one responsibility per file.
- Write clear commit messages.
