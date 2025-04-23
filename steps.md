# Development Roadmap

This document analyzes completed work and outlines the remaining tasks to fulfill the original PS1‑vibe racing game specification.

---

## ✅ Completed So Far

1. Project scaffolding: `index.html`, `styles.css`, all JS modules created.
2. Core render setup (`render.js`): scene, camera, lights, ground plane, player car, animate loop.
3. Input handling (`input.js`): keyboard state.
4. Procedural textures (`assets.js`): track (Perlin noise) and car textures.
5. Track geometry (`tracks.js`): ring track floor, walls, centerline waypoints.
6. Game logic (`gameLogic.js`): player movement, steering, friction, boundary collisions; AI opponents spawn and follow waypoints.
7. Audio (`audio.js`): MIDI.js plugin load, basic playMIDI, Tone.js default synth for effects.
8. UI (`ui.js` + `styles.css`): Twisted Metal–style main menu, HUD (speed, lap, position), menu navigation.
9. Drivers (`drivers.js`): two driver profiles with stats placeholder.
10. Documentation (`project.md`): full spec, file structure, flow, styling guidelines, milestones.

---

## 🔜 Remaining Steps

### 1. Track & Environment

- [ ] **Multi‑track selection**: support multiple track definitions (kitchen, toy store, pet shop).
- [ ] **Track features**: add ramps, loops, hazards geometry (ramps, loops, spills).
- [ ] **Procedural obstacles**: generate rolling oranges, syrup puddles, cat paw, etc.
- [ ] **Dynamic wallpaper**: per‑track canvas/CSS animations (floating toasters, spinning pizzas).

### 2. Player & AI Mechanics

- [ ] **Boost mechanic**: implement Spacebar boost with charge count and cooldown.
- [ ] **Collision detection**: player/AI vs obstacles & power‑ups (bounding box or raycast).
- [ ] **Power-up effects**: banana peel spin‑out, super squeak blind, speed snack boost.
- [ ] **Lap counting**: detect finish line crossings, update `gameLogic.currentLap` & total laps.
- [ ] **Finish triggers**: end race when player or all AI finish; show results.
- [ ] **AI personalities**: vary AI speed, handling, and occasional taunt text effect.

### 3. UI Enhancements

- [ ] **Driver selection screen**: display AI‑generated portraits, stats, store choice in localStorage.
- [ ] **Track selection menu**: allow selecting track theme before race.
- [ ] **Settings panel**: adjust music/SFX volume, controls remap, graphics quality.
- [ ] **End‑of‑race screen**: show final positions, lap times, achievements unlocked.
- [ ] **On‑screen prompts**: notifications for power‑up pickup, collision, cheat codes.

### 4. Audio & Music

- [ ] **Playlist UI**: menu to browse and switch MIDI tracks mid‑race.
- [ ] **Sound effects library**: create skid, collision boing, honk, power‑up cues using Tone.js.
- [ ] **Volume controls**: integrate SFX and music sliders in settings.
- [ ] **Background ambience**: optional procedural ambient synth.

### 5. Customization & Persistence

- [ ] **Vehicle decals**: allow user to pick or procedurally generate car decals/colors.
- [ ] **LocalStorage**: save driver selection, settings, high scores, achievements.
- [ ] **AI‑generated portraits**: import final PNGs to `/images` and render on menus/HUD.

### 6. Extras & Replayability

- [ ] **Achievements system**: milestones like “Crash Master,” “Squeaky Clean.”
- [ ] **Cheat codes**: implement typed codes (e.g., BIGDUCK, WOBBLE) with effects.
- [ ] **Mini‑games**: stub in between races (Toaster Slap, etc.).
- [ ] **Photo mode**: capture canvas screenshot with retro filters.

### 7. Polish & Optimization

- [ ] **Performance profiling**: add FPS counter, optimize polycounts, texture sizes.
- [ ] **Cross‑browser tests**: Chrome, Firefox, Edge; fallback for WebGL failures.
- [ ] **Mobile support**: touch controls, UI scaling.
- [ ] **Accessibility**: keyboard‑only navigation, high‑contrast UI.

### 8. Testing & Deployment

- [ ] **QA tests**: unit tests for core logic, integration test runs.
- [ ] **README.md**: final setup, usage, contribution guidelines.
- [ ] **GitHub Pages**: configure, test live URL, add custom domain if desired.

---

*Total detailed steps: 30+*
