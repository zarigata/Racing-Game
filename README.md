# PS1 Vibe Racing Game

A humorous, retro PS1‑style 3D racing game running entirely in the browser. Featuring procedurally generated low‑poly visuals (Three.js), pixel/perlin textures, dynamic wallpapers, quirky vehicles, AI opponents, and a Twisted Metal–inspired UI.

## 🛠️ Running Locally

Serve the folder with any HTTP server (required for modules and assets):
```
python -m http.server 8345
```
Then open `http://localhost:8345` in your browser.

## 🚀 Deployment to GitHub Pages

1. Create a new GitHub repository (e.g., `Racing-Game`).
2. On your local folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: racing game"
   git remote add origin https://github.com/<username>/Racing-Game.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings → Pages**, select **main** branch and **root** folder.
4. Visit `https://<username>.github.io/Racing-Game/` to play.
