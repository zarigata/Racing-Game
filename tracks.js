/* CODEX: Procedural track definitions with parameterized themes */
const tracks = {
    types: ['ring', 'kitchen', 'toyStore', 'petShop'],
    current: 'ring',
    waypoints: [],
    hazards: [],
    powerups: [],
    outerR: 0,
    innerR: 0,
    setTrack: function(name) {
        this.current = this.types.includes(name) ? name : 'ring';
    },
    generate: function(trackName) {
        this.setTrack(trackName);
        // reset hazards and powerups
        this.hazards = [];
        this.powerups = [];
        console.log('Tracks: generate', this.current);
        // define radii per theme
        let outerR, innerR;
        switch (this.current) {
            case 'kitchen': outerR = 80; innerR = 30; break;
            case 'toyStore': outerR = 60; innerR = 25; break;
            case 'petShop': outerR = 70; innerR = 20; break;
            default: outerR = 50; innerR = 20;
        }
        // persist radii for game logic
        this.outerR = outerR;
        this.innerR = innerR;
        // floor shape with hole
        const floorShape = new THREE.Shape();
        floorShape.absellipse(0, 0, outerR, outerR, 0, 2 * Math.PI, false, 0);
        const hole = new THREE.Path();
        hole.absellipse(0, 0, innerR, innerR, 0, 2 * Math.PI, true, 0);
        floorShape.holes.push(hole);
        // floor mesh
        const floorGeo = new THREE.ShapeGeometry(floorShape);
        floorGeo.rotateX(-Math.PI/2);
        const floorMat = new THREE.MeshStandardMaterial({ map: assets.trackTexture, side: THREE.DoubleSide });
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        scene.add(floorMesh);
        // walls mesh
        const extrudeSettings = { depth: 2, bevelEnabled: false };
        const wallGeo = new THREE.ExtrudeGeometry(floorShape, extrudeSettings);
        wallGeo.rotateX(-Math.PI/2);
        wallGeo.translate(0, 1, 0);
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const wallMesh = new THREE.Mesh(wallGeo, wallMat);
        scene.add(wallMesh);
        // waypoints for AI
        this.waypoints = [];
        const centerR = (outerR + innerR) / 2;
        const segments = 36;
        for (let i = 0; i < segments; i++) {
            const theta = (i / segments) * 2 * Math.PI;
            this.waypoints.push(new THREE.Vector3(
                Math.cos(theta) * centerR,
                0,
                Math.sin(theta) * centerR
            ));
        }
        // CODEX: add ramps and loops per theme
        if (this.current === 'kitchen' || this.current === 'petShop') {
            // ramp
            const rampGeo = new THREE.BoxGeometry(6, 0.5, 3);
            const rampMat = new THREE.MeshStandardMaterial({ color: 0x777777 });
            const ramp = new THREE.Mesh(rampGeo, rampMat);
            ramp.rotation.x = -Math.PI / 6;
            ramp.position.set(outerR * 0.6, 0.25, 0);
            scene.add(ramp);
            this.hazards.push(ramp);
        }
        if (this.current === 'toyStore' || this.current === 'petShop') {
            // loop
            const loopGeo = new THREE.TorusGeometry(3, 0.3, 16, 100);
            const loopMat = new THREE.MeshStandardMaterial({ color: 0x3399ff });
            const loop = new THREE.Mesh(loopGeo, loopMat);
            loop.rotation.z = Math.PI / 2;
            loop.position.set(0, 3, outerR * 0.6);
            scene.add(loop);
            this.hazards.push(loop);
        }
        // hazards per theme
        if (this.current === 'kitchen') {
            // rolling oranges
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const orange = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5, 8, 8),
                    new THREE.MeshStandardMaterial({ color: 0xffa500 })
                );
                orange.position.set(
                    Math.cos(angle) * centerR * 0.8,
                    0.5,
                    Math.sin(angle) * centerR * 0.8
                );
                scene.add(orange);
                this.hazards.push(orange);
            }
        } else if (this.current === 'toyStore') {
            // syrup puddles as flat discs
            for (let i = 0; i < 5; i++) {
                const angle = Math.random() * Math.PI * 2;
                const puddle = new THREE.Mesh(
                    new THREE.CircleGeometry(1.5, 16),
                    new THREE.MeshStandardMaterial({ color: 0xd2691e, transparent: true, opacity: 0.6 })
                );
                puddle.rotation.x = -Math.PI / 2;
                puddle.position.set(
                    Math.cos(angle) * centerR * 0.7,
                    0.01,
                    Math.sin(angle) * centerR * 0.7
                );
                scene.add(puddle);
                this.hazards.push(puddle);
            }
        }
        // CODEX: spawn power-up pickups
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const pickup = new THREE.Mesh(
                new THREE.CylinderGeometry(0.4, 0.4, 0.2, 12),
                new THREE.MeshStandardMaterial({ color: 0xff0000 })
            );
            pickup.rotation.x = -Math.PI / 2;
            pickup.position.set(
                Math.cos(angle) * centerR,
                0.1,
                Math.sin(angle) * centerR
            );
            pickup.name = 'powerup';
            scene.add(pickup);
            this.powerups.push(pickup);
        }
    }
};
