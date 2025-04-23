/* CODEX: UI manager */
const ui = {
    init: function() {
        console.log('UI: init');
        // CODEX: create HUD overlay
        this.hud = document.createElement('div');
        this.hud.className = 'ui';
        this.hud.innerHTML = '<div id="speed">Speed: 0</div>';
        document.body.appendChild(this.hud);
    },
    // CODEX: update HUD each frame
    updateHUD: function() {
        const speedEl = document.getElementById('speed');
        if (speedEl) speedEl.innerText = 'Speed: ' + gameLogic.speed.toFixed(2);
    }
};
