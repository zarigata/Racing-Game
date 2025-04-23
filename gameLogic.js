/* CODEX: Core game logic for player movement and simple physics */
const gameLogic = {
    aiDrivers: [],
    player: null,
    speed: 0,
    maxSpeed: 5,
    accel: 10,
    friction: 8,
    powerupsHeld: 0,
    projectiles: [],
    boostCharges: 3,
    boostCooldown: 1, // seconds
    boostTimer: 0,
    init: function() {
        this.player = scene.getObjectByName('playerCar');
        console.log('GameLogic: init, player:', this.player);
        // CODEX: spawn AI opponents
        this.aiDrivers = [];
        drivers.forEach((d,i) => {
            const texture = assets.createCarTexture(128,128);
            const mat = new THREE.MeshStandardMaterial({ map: texture });
            const geo = new THREE.BoxGeometry(1, 0.5, 2);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set((i % 2 ? 2 : -2), 0.25, -(Math.floor(i/2) + 1) * 3);
            mesh.rotation.copy(this.player.rotation);
            mesh.name = 'ai_' + d.name;
            scene.add(mesh);
            this.aiDrivers.push({ mesh, speed: d.stats.speed * this.maxSpeed, handling: d.stats.handling * 2, wpIndex: 0 });
        });
        this.powerupsHeld = 0;
        this.projectiles = [];
        this.boostCharges = 3;
        this.boostTimer = 0;
    },
    update: function(delta) {
        if (!this.player) return;
        // accelerate/decelerate
        if (input.keys['ArrowUp']) this.speed += this.accel * delta;
        else if (input.keys['ArrowDown']) this.speed -= this.accel * delta;
        else this.speed -= this.friction * delta * Math.sign(this.speed);
        // update boost cooldown
        this.boostTimer = Math.max(0, this.boostTimer - delta);
        // clamp speed
        this.speed = Math.max(0, Math.min(this.maxSpeed, this.speed));
        // boost mechanic
        if (input.keys['Space'] && this.boostCharges > 0 && this.boostTimer <= 0) {
            this.speed += this.maxSpeed * 1.5;
            this.boostCharges--;
            this.boostTimer = this.boostCooldown;
        }
        // steering
        if (input.keys['ArrowLeft']) this.player.rotation.y += delta * 2;
        if (input.keys['ArrowRight']) this.player.rotation.y -= delta * 2;
        // move forward
        const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.quaternion);
        this.player.position.addScaledVector(dir, this.speed * delta);
        // CGODEX: boundary collision for player
        const pos = this.player.position;
        const r = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
        if (r > tracks.outerR - 1) {
            pos.set((pos.x / r) * (tracks.outerR - 1), pos.y, (pos.z / r) * (tracks.outerR - 1));
            this.speed = 0;
        } else if (r < tracks.innerR + 1) {
            pos.set((pos.x / r) * (tracks.innerR + 1), pos.y, (pos.z / r) * (tracks.innerR + 1));
            this.speed = 0;
        }
        // CODEX: hazard collision detection
        const playerBox = new THREE.Box3().setFromObject(this.player);
        tracks.hazards.forEach(h => {
            const hazardBox = new THREE.Box3().setFromObject(h);
            if (playerBox.intersectsBox(hazardBox)) {
                this.speed = 0;
            }
        });
        // CODEX: pickup power-ups (reuse playerBox)
        tracks.powerups.forEach((p, idx) => {
            const pb = new THREE.Box3().setFromObject(p);
            if (playerBox.intersectsBox(pb)) {
                tracks.powerups.splice(idx, 1);
                scene.remove(p);
                this.powerupsHeld++;
            }
        });
        // CODEX: fire weapon
        if (input.keys['KeyF'] && this.powerupsHeld > 0) {
            this.firePowerup();
        }
        // CODEX: update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const pr = this.projectiles[i];
            pr.remaining -= delta;
            if (pr.remaining <= 0) {
                scene.remove(pr.mesh);
                this.projectiles.splice(i, 1);
                continue;
            }
            pr.mesh.position.addScaledVector(pr.direction, pr.speed * delta);
            const projBox = new THREE.Box3().setFromObject(pr.mesh);
            // collision with AI
            for (let j = this.aiDrivers.length - 1; j >= 0; j--) {
                const ai = this.aiDrivers[j];
                const aiBox = new THREE.Box3().setFromObject(ai.mesh);
                if (projBox.intersectsBox(aiBox)) {
                    ai.speed *= 0.5;
                    scene.remove(pr.mesh);
                    this.projectiles.splice(i, 1);
                    break;
                }
            }
        }
        // CODEX: update AI opponents
        this.aiDrivers.forEach(ai => this.updateAI(ai, delta));
    },
    // CODEX: update single AI opponent
    updateAI: function(ai, delta) {
        const mesh = ai.mesh;
        const wps = tracks.waypoints;
        if (!wps.length) return;
        const target = wps[ai.wpIndex];
        // compute steering angle
        const dv = new THREE.Vector3(target.x - mesh.position.x, 0, target.z - mesh.position.z);
        const desired = Math.atan2(dv.x, dv.z);
        let current = mesh.rotation.y;
        let diff = ((desired - current + Math.PI) % (2 * Math.PI)) - Math.PI;
        const turn = Math.sign(diff) * ai.handling * delta;
        mesh.rotation.y += Math.abs(diff) < Math.abs(turn) ? diff : turn;
        // move forward
        const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion);
        mesh.position.addScaledVector(fwd, ai.speed * delta);
        // switch waypoint
        if (mesh.position.distanceTo(target) < 2) ai.wpIndex = (ai.wpIndex + 1) % wps.length;
        // simple boundary clamp
        const pr = Math.sqrt(mesh.position.x * mesh.position.x + mesh.position.z * mesh.position.z);
        const maxR = tracks.outerR - 1, minR = tracks.innerR + 1;
        if (pr > maxR || pr < minR) {
            mesh.position.set((mesh.position.x / pr) * maxR, mesh.position.y, (mesh.position.z / pr) * maxR);
        }
    },
    // CODEX: fire a projectile to damage AI
    firePowerup: function() {
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 8, 8),
            new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        // spawn at player's position
        sphere.position.copy(this.player.position).add(new THREE.Vector3(0, 0.5, 0));
        const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(this.player.quaternion).normalize();
        scene.add(sphere);
        this.projectiles.push({ mesh: sphere, direction: dir, speed: 15, remaining: 3 });
        this.powerupsHeld--;
    }
};
