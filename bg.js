import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Torus Knot Object (Original background)
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({
    color: 0x111111,
    emissive: 0x050505,
    roughness: 0.2,
    metalness: 0.8,
    wireframe: false
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Load External 3D Model
let externalModel;
const loader = new GLTFLoader();

const modelPath = 'quest_4_model.glb';

loader.load(
    modelPath,
    function (gltf) {
        externalModel = gltf.scene;
        externalModel.position.set(0, 0, 0);
        externalModel.scale.set(1, 1, 1);
        scene.add(externalModel);
        console.log('Model loaded');
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0x888888, 0.5);
directionalLight.position.set(-20, -20, 20);
scene.add(directionalLight);

camera.position.z = 30;

// Animation
let time = 0;
function animate() {
    requestAnimationFrame(animate);

    time += 0.005;

    // Background Object Rotation & Floating
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;
    torusKnot.position.y = Math.sin(time * 2) * 2;

    // External Model Animation
    if (externalModel) {
        externalModel.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
}

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
