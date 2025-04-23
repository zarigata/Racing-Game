// CODEX: Procedural asset generation
if (typeof noise === 'undefined') {
    window.noise = {
        seed: function() {},
        perlin2: function() { return Math.random() * 2 - 1; }
    };
}
const assets = {
    trackTexture: null,
    carTexture: null,
    wallpaperCanvas: null,
    wallpaperCtx: null,
    wallpaperParticles: [],
    init: function() {
        console.log('Assets: init');
        noise.seed(Math.random());
        this.trackTexture = this.createTrackTexture(512, 512);
        this.carTexture = this.createCarTexture(128, 128);
        this.createWallpaper();
    },
    createWallpaper: function() {
        const cw = window.innerWidth, ch = window.innerHeight;
        const canvas = document.createElement('canvas');
        canvas.id = 'wallpaper'; canvas.width = cw; canvas.height = ch;
        canvas.style.position = 'absolute'; canvas.style.top = '0'; canvas.style.left = '0';
        canvas.style.zIndex = '-1'; document.body.appendChild(canvas);
        this.wallpaperCanvas = canvas;
        this.wallpaperCtx = canvas.getContext('2d');
        this.wallpaperParticles = [];
        const count = 50;
        for (let i = 0; i < count; i++) {
            this.wallpaperParticles.push({
                x: Math.random() * cw,
                y: Math.random() * ch,
                size: 20 + Math.random() * 30,
                speed: 20 + Math.random() * 40
            });
        }
    },
    updateWallpaper: function(delta) {
        const ctx = this.wallpaperCtx;
        const cw = this.wallpaperCanvas.width,
              ch = this.wallpaperCanvas.height;
        ctx.clearRect(0, 0, cw, ch);
        const theme = tracks.current;
        for (const p of this.wallpaperParticles) {
            if (theme === 'kitchen') ctx.fillStyle = 'rgba(255,165,0,0.5)';
            else if (theme === 'toyStore') ctx.fillStyle = 'rgba(0,255,0,0.5)';
            else if (theme === 'petShop') ctx.fillStyle = 'rgba(200,200,200,0.5)';
            else ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI);
            ctx.fill();
            p.y -= p.speed * delta;
            if (p.y < -p.size) p.y = ch + p.size;
        }
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
