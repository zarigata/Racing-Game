// CODEX: Procedural asset generation
const assets = {
    trackTexture: null,
    carTexture: null,
    init: function() {
        console.log('Assets: init');
        noise.seed(Math.random());
        this.trackTexture = this.createTrackTexture(512, 512);
        this.carTexture = this.createCarTexture(128, 128);
    },
    createTrackTexture: function(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const value = noise.perlin2(x / 100, y / 100);
                const shade = Math.floor((value + 1) / 2 * 255);
                ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(20, 20);
        return texture;
    },
    createCarTexture: function(width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const base = `hsl(${Math.random() * 360}, 70%, 60%)`;
        ctx.fillStyle = base;
        ctx.fillRect(0, 0, width, height);
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`;
            const y = Math.random() * height;
            ctx.fillRect(0, y, width, 4);
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        return texture;
    }
};
