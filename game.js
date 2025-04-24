// CODEX: Game entry point
window.addEventListener('load', () => {
    assets.init();
    initRender();
    input.init();
    audio.init();
    gameLogic.init();
    ui.init();
    console.log('DEBUG: Initialization complete — menu should be visible');
    tracks.generate();
    // Start background music
    audio.playMIDI('music/track1.mid');
    requestAnimationFrame(animate);
});
