/* CODEX: UI manager with Twisted Metal style menus and HUD */
const ui = {
    state: 'menu', // 'menu', 'trackSelect', or 'race'
    elements: {},
    menuItems: [],
    selectedIndex: 0,
    trackItems: [],
    trackIndex: 0,
    init: function() {
        console.log('UI: init');
        this.createMenu();
        this.createTrackMenu();
        this.createHUD();
        this.createEndScreen();
        this.createSettingsScreen();
        this.showMenu();
    },
    createMenu: function() {
        const menu = document.createElement('div');
        menu.id = 'menu';
        menu.className = 'ui menu';
        menu.innerHTML = `
            <h1 class="title">PS1 Vibe Racing</h1>
            <ul class="menu-list">
                <li class="menu-item selected">Start Race</li>
                <li class="menu-item">Settings</li>
                <li class="menu-item">Exit</li>
            </ul>
            <p class="hint">Use ↑ ↓ and Enter</p>
        `;
        document.body.appendChild(menu);
        this.elements.menu = menu;
        this.menuItems = Array.from(menu.querySelectorAll('.menu-item'));
        window.addEventListener('keydown', this.handleMenuInput.bind(this));
    },
    createTrackMenu: function() {
        const menu = document.createElement('div');
        menu.id = 'track-menu';
        menu.className = 'ui menu';
        let html = '<h2>Select Track</h2><ul class="track-list">';
        tracks.types.forEach((t,i) => {
            html += `<li class="track-item${i===0?' selected':''}" data-name="${t}">${t}</li>`;
        });
        html += '</ul><p class="hint">Use ← → and Enter</p>';
        menu.innerHTML = html;
        document.body.appendChild(menu);
        this.elements.trackMenu = menu;
        this.trackItems = Array.from(menu.querySelectorAll('.track-item'));
        this.trackIndex = 0;
        menu.style.display = 'none';
        window.addEventListener('keydown', this.handleTrackInput.bind(this));
    },
    handleMenuInput: function(e) {
        if (this.state !== 'menu') return;
        if (e.code === 'ArrowUp' || e.code === 'KeyW') this.changeSelection(-1);
        else if (e.code === 'ArrowDown' || e.code === 'KeyS') this.changeSelection(1);
        else if (e.code === 'Enter') {
            const choice = this.menuItems[this.selectedIndex].innerText;
            if (choice === 'Start Race') this.showTrackMenu();
            else if (choice === 'Settings') this.showSettings();
            else if (choice === 'Exit') window.close();
        }
    },
    handleTrackInput: function(e) {
        if (this.state !== 'trackSelect') return;
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
            this.trackItems[this.trackIndex].classList.remove('selected');
            this.trackIndex = (this.trackIndex - 1 + this.trackItems.length) % this.trackItems.length;
            this.trackItems[this.trackIndex].classList.add('selected');
        } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
            this.trackItems[this.trackIndex].classList.remove('selected');
            this.trackIndex = (this.trackIndex + 1) % this.trackItems.length;
            this.trackItems[this.trackIndex].classList.add('selected');
        } else if (e.code === 'Enter') {
            const name = this.trackItems[this.trackIndex].dataset.name;
            this.hideTrackMenu();
            tracks.generate(name);
            this.startRace();
            audio.playMIDI('music/track1.mid');
        }
    },
    changeSelection: function(dir) {
        this.menuItems[this.selectedIndex].classList.remove('selected');
        this.selectedIndex = (this.selectedIndex + dir + this.menuItems.length) % this.menuItems.length;
        this.menuItems[this.selectedIndex].classList.add('selected');
    },
    showMenu: function() {
        this.state = 'menu';
        this.elements.menu.style.display = 'flex';
        this.elements.trackMenu && (this.elements.trackMenu.style.display = 'none');
        this.hideHUD();
    },
    hideMenu: function() {
        this.elements.menu.style.display = 'none';
    },
    showTrackMenu: function() {
        this.state = 'trackSelect';
        this.hideMenu();
        this.elements.trackMenu.style.display = 'flex';
    },
    hideTrackMenu: function() {
        this.elements.trackMenu.style.display = 'none';
    },
    createHUD: function() {
        const hud = document.createElement('div');
        hud.id = 'hud';
        hud.className = 'ui hud';
        hud.innerHTML = `
            <div id="speed" class="hud-item">Speed: 0</div>
            <div id="lap" class="hud-item">Lap: 1/3</div>
            <div id="position" class="hud-item">Pos: 1/4</div>
        `;
        document.body.appendChild(hud);
        this.elements.hud = hud;
        hud.style.display = 'none';
    },
    showHUD: function() {
        this.elements.hud.style.display = 'block';
    },
    hideHUD: function() {
        this.elements.hud.style.display = 'none';
    },
    startRace: function() {
        this.state = 'race';
        this.showHUD();
        this.hideMenu();
        this.hideTrackMenu();
    },
    updateHUD: function() {
        if (this.state !== 'race') return;
        const speedEl = document.getElementById('speed');
        if (speedEl) speedEl.innerText = 'Speed: ' + gameLogic.speed.toFixed(2);
        const lapEl = document.getElementById('lap');
        if (lapEl) lapEl.innerText = 'Lap: ' + gameLogic.currentLap + '/' + gameLogic.totalLaps;
        const posEl = document.getElementById('position');
        if (posEl) posEl.innerText = 'Pos: ' + gameLogic.getPosition() + '/' + (gameLogic.aiDrivers.length + 1);
    },
    // CODEX: end-of-race screen setup
    createEndScreen: function() {
        const screen = document.createElement('div');
        screen.id = 'end-screen';
        screen.className = 'ui end-screen';
        screen.innerHTML = `
            <h1>Race Complete!</h1>
            <p id="final-position"></p>
            <button id="restart-btn">Restart</button>
        `;
        screen.style.display = 'none';
        document.body.appendChild(screen);
        this.elements.endScreen = screen;
        document.getElementById('restart-btn').addEventListener('click', () => window.location.reload());
    },
    showEndScreen: function() {
        this.state = 'end';
        this.hideHUD();
        this.hideMenu();
        this.hideTrackMenu();
        const posEl = document.getElementById('final-position');
        if (posEl) posEl.innerText = 'Position: ' + gameLogic.getPosition() + ' / ' + (gameLogic.aiDrivers.length + 1);
        this.elements.endScreen.style.display = 'flex';
    },
    // CODEX: settings panel
    createSettingsScreen: function() {
        const screen = document.createElement('div');
        screen.id = 'settings-screen';
        screen.className = 'ui settings-screen';
        screen.innerHTML = `
            <h2>Settings</h2>
            <label>Music Volume: <input type="range" id="music-vol" min="0" max="1" step="0.01" value="${audio.musicVolume}"/></label>
            <label>SFX Volume: <input type="range" id="sfx-vol" min="0" max="1" step="0.01" value="${audio.sfxVolume}"/></label>
            <p><button id="settings-back">Back</button></p>
        `;
        screen.style.display = 'none';
        document.body.appendChild(screen);
        this.elements.settingsScreen = screen;
        document.getElementById('music-vol').addEventListener('input', e => audio.setMusicVolume(parseFloat(e.target.value)));
        document.getElementById('sfx-vol').addEventListener('input', e => audio.setSFXVolume(parseFloat(e.target.value)));
        document.getElementById('settings-back').addEventListener('click', () => this.hideSettings());
    },
    showSettings: function() {
        this.state = 'settings';
        this.hideMenu();
        this.elements.settingsScreen.style.display = 'flex';
    },
    hideSettings: function() {
        this.elements.settingsScreen.style.display = 'none';
        this.showMenu();
    }
};
