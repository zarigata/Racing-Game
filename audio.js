/* CODEX: Audio manager using Tone.js and MIDI.js */
const audio = {
    init: function() {
        // Initialize MIDI
        MIDI.loadPlugin({
            soundfontUrl: "./soundfonts/",
            instrument: "acoustic_grand_piano",
            onsuccess: () => {
                console.log('MIDI ready');
            }
        });
        // Initialize Tone.js context
        Tone.start();
    },
    playMIDI: function(track) {
        MIDI.player.stop();
        MIDI.player.load(track, () => MIDI.player.start());
    },
    playSoundEffect: function(name) {
        // Example: simple synth for effects
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(name || "C4", "8n");
    }
};
