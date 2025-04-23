/* CODEX: Audio manager using Tone.js and MIDI.js */
const audio = {
    // CODEX: volume settings
    musicVolume: 1,  // 0.0 to 1.0
    sfxVolume: 1,    // 0.0 to 1.0
    init: function() {
        // Initialize MIDI (if loaded)
        if (typeof MIDI !== 'undefined') {
            // Initialize MIDI
            MIDI.loadPlugin({
                soundfontUrl: "./soundfonts/",
                instrument: "acoustic_grand_piano",
                onsuccess: () => {
                    console.log('MIDI ready');
                }
            });
        } else {
            console.warn('MIDI.js not loaded, music disabled');
        }
        // Initialize Tone.js context
        Tone.start();
    },
    /**
     * Set music (MIDI) volume.
     * @param {number} v [0-1]
     */
    setMusicVolume: function(v) {
        this.musicVolume = v;
        if (MIDI.player) {
            MIDI.player.volume = v * 127;
        }
    },
    /**
     * Set SFX volume.
     * @param {number} v [0-1]
     */
    setSFXVolume: function(v) {
        this.sfxVolume = v;
    },
    playMIDI: function(track) {
        // Guard MIDI player availability
        if (typeof MIDI === 'undefined' || !MIDI.player) {
            console.warn('MIDI player unavailable');
            return;
        }
        MIDI.player.stop();
        // apply volume
        if (MIDI.player) MIDI.player.volume = this.musicVolume * 127;
        MIDI.player.load(track, () => MIDI.player.start());
    },
    playSoundEffect: function(name) {
        // CODEX: synth for effects with volume
        const synth = new Tone.Synth().toDestination();
        // map [0-1] to dB: 0 => -20dB, 1 => 0dB
        synth.volume.value = (this.sfxVolume - 1) * 20;
        synth.triggerAttackRelease(name || "C4", "8n");
    }
};
