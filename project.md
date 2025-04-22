# Project Roadmap

This document outlines the phased development plan for the Funny PS1‑Vibe Racing Game.

## Phase 1: Menu & UI
- Embed **Press Start 2P** font via Google Fonts
- Build a canvas/CSS start menu with options:
  - Start Race
  - Select Vehicle
  - Toggle Music/SFX
  - View High Scores
- Hook keyboard (Enter/Arrows/Space) for navigation and selection

## Phase 2: Procedural Textures & CRT Shader
- Extend `generateProceduralTexture()` for 32×32 pixel decals (eyes, toast, prints)
- Use `THREE.CanvasTexture` + `NearestFilter` for pixelation
- Add lightweight scanline effect via CSS or fragment shader

## Phase 3: Track Generation & Obstacles
- Define spline path with `THREE.CatmullRomCurve3`
- Generate extruded track geometry and assign tiled perlin/noise textures
- Scatter dynamic obstacles (rolling oranges, syrup puddles) with proc textures

## Phase 4: Vehicles & Physics
- Model low‑poly Toaster Car, Rubber Duck, Squeaky Hamburger
- Assign stats: speed vs. handling vs. bounce
- Animate parts via simple sine/vertex shifts
- Implement keyboard controls + Space for power‑ups

## Phase 5: Power‑Ups & AI
- Create textured power‑up cubes (Speedy Snack, Banana Peel, Squeaky Hammer)
- Implement AI waypoint following with 3 personalities
- Handle collisions and apply effects

## Phase 6: Audio & Commentary
- Generate chiptune loop (120–140 BPM) + honk/quack motifs via Tone.js
- SFX: skid (noise burst), boing (sine), bonk (square)
- Overlay randomized quips every 5–10 s

## Phase 7: HUD, Game Flow & Polish
- 3‑lap counter, position display, power‑up icon
- Game‑over screen, localStorage high scores with titles
- Cheat code listener (“QUACK”) and secret shortcut
- Final performance optimizations for GitHub Pages

---
*Last updated: 2025‑04‑22*
