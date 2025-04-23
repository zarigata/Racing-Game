/* CODEX: Input handling */
const input = {
    keys: {},
    init: function() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    },
    handleKeyDown: function(e) {
        this.keys[e.code] = true;
    },
    handleKeyUp: function(e) {
        this.keys[e.code] = false;
    }
};
