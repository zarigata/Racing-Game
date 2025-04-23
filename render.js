// CODEX: Rendering setup with Three.js
let scene, camera, renderer;
let lastTimestamp = 0;
function initRender() {
    scene = new THREE.Scene();
    // lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 5);
    scene.add(dirLight);
    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, -10);
    camera.lookAt(0, 0, 0);
    // renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    initSceneObjects();
}
function initSceneObjects() {
    // ground plane
    const geo = new THREE.PlaneGeometry(100, 100, 10, 10);
    const mat = new THREE.MeshStandardMaterial({ color: 0x444444, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    // player car
    const carGeo = new THREE.BoxGeometry(1, 0.5, 2);
    const carMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const car = new THREE.Mesh(carGeo, carMat);
    car.position.set(0, 0.25, 0);
    car.name = 'playerCar';
    scene.add(car);
}
function animate(timestamp) {
    requestAnimationFrame(animate);
    const delta = (timestamp - lastTimestamp) / 1000 || 0;
    lastTimestamp = timestamp;
    gameLogic.update(delta);
    ui.updateHUD();
    // camera follow
    const car = scene.getObjectByName('playerCar');
    if (car) {
        const camTarget = new THREE.Vector3().copy(car.position).add(new THREE.Vector3(0, 5, -10));
        camera.position.lerp(camTarget, 0.1);
        camera.lookAt(car.position);
    }
    renderer.render(scene, camera);
}
