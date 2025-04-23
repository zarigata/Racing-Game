// CODEX: Game entry point
window.addEventListener('load', () => {
    assets.init();
    initRender();
    input.init();
    audio.init();
    gameLogic.init();
    ui.init();
    // CODEX: auto-start race immediately
    ui.startRace();
    tracks.generate();
    // Start background music
    audio.playMIDI('music/track1.mid');
    requestAnimationFrame(animate);
});
