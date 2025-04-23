/* CODEX: Procedural track definitions with floor, walls, and waypoints */
const tracks = {
    outerR: 50,
    innerR: 20,
    waypoints: [],
    generate: function() {
        console.log('Tracks: generate');
        const outerR = this.outerR, innerR = this.innerR;
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
    }
};
