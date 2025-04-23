/* CODEX: Core game logic for player movement and simple physics */
const gameLogic = {
    player: null,
    speed: 0,
    maxSpeed: 5,
    accel: 10,
    friction: 8,
    init: function() {
        this.player = scene.getObjectByName('playerCar');
        console.log('GameLogic: init, player:', this.player);
    },
    update: function(delta) {
        if (!this.player) return;
        // accelerate/decelerate
        if (input.keys['ArrowUp']) this.speed += this.accel * delta;
        else if (input.keys['ArrowDown']) this.speed -= this.accel * delta;
        else this.speed -= this.friction * delta * Math.sign(this.speed);
        // clamp speed
        this.speed = Math.max(0, Math.min(this.maxSpeed, this.speed));
        // steering
        if (input.keys['ArrowLeft']) this.player.rotation.y += delta * 2;
        if (input.keys['ArrowRight']) this.player.rotation.y -= delta * 2;
        // move forward
        const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.quaternion);
        this.player.position.addScaledVector(dir, this.speed * delta);
    }
};
