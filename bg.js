import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.128/examples/jsm/loaders/GLTFLoader.js';

// ==========================================
// BACKGROUND SCENE (Torus Knot)
// ==========================================
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0x888888, 0.5);
directionalLight.position.set(-20, -20, 20);
scene.add(directionalLight);

camera.position.z = 30;

// ==========================================
// AI AVATAR SCENE
// ==========================================
const avatarContainer = document.getElementById('assistant-avatar-container');
const avatarScene = new THREE.Scene();

const avatarCamera = new THREE.PerspectiveCamera(45, 300 / 300, 0.1, 100);
avatarCamera.position.set(0, 1.5, 4);

const avatarRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
avatarRenderer.setSize(300, 300);
avatarRenderer.setPixelRatio(window.devicePixelRatio);
avatarContainer.appendChild(avatarRenderer.domElement);

// Cinematic lighting for Avatar
const avatarAmbient = new THREE.AmbientLight(0xffffff, 0.6);
avatarScene.add(avatarAmbient);

const avatarDirLight = new THREE.DirectionalLight(0xffffff, 1.2);
avatarDirLight.position.set(2, 5, 5);
avatarScene.add(avatarDirLight);

const avatarRimLight = new THREE.PointLight(0x00ffcc, 2, 10);
avatarRimLight.position.set(-2, 2, -2);
avatarScene.add(avatarRimLight);

let avatarMixer;
let externalModel;
let idleAction;
let waveAction;

const loader = new GLTFLoader();
const modelPath = 'quest_4_model.glb';

loader.load(
    modelPath,
    function (gltf) {
        externalModel = gltf.scene;
        externalModel.position.set(0, 0, 0);
        externalModel.scale.set(1, 1, 1);
        avatarScene.add(externalModel);
        
        console.log('Model loaded successfully.');

        avatarMixer = new THREE.AnimationMixer(externalModel);
        const animations = gltf.animations;
        
        if (animations && animations.length > 0) {
            console.log('Available animations:', animations.map(a => a.name));
            
            // Smart detection of animations
            let idleClip = animations.find(a => /idle|breathing|standing|base/i.test(a.name));
            let waveClip = animations.find(a => /wave|greeting|hello|handwave/i.test(a.name));
            
            // Fallback for idle
            if (!idleClip) idleClip = animations[0];
            
            if (idleClip) {
                console.log('Selected Idle Animation:', idleClip.name);
                idleAction = avatarMixer.clipAction(idleClip);
                idleAction.play();
            }
            
            if (waveClip) {
                console.log('Selected Wave Animation:', waveClip.name);
                waveAction = avatarMixer.clipAction(waveClip);
                waveAction.setLoop(THREE.LoopOnce);
                waveAction.clampWhenFinished = true;
                
                // Trigger wave every 15 seconds
                setInterval(() => {
                    console.log('Wave animation triggered');
                    waveAction.reset().fadeIn(0.5).play();
                    
                    // Crossfade back to idle
                    setTimeout(() => {
                        waveAction.fadeOut(0.5);
                    }, 2000);
                }, 15000);
            }
        } else {
            console.warn('No animations found in the GLB file.');
        }
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Mouse interaction for subtle head/rotation tracking
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to -1 to 1
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// ==========================================
// ANIMATION LOOP
// ==========================================
const clock = new THREE.Clock();
let time = 0;

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    time += 0.005;

    // Background animation
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;
    torusKnot.position.y = Math.sin(time * 2) * 2;
    renderer.render(scene, camera);

    // Avatar animation
    if (avatarMixer) {
        avatarMixer.update(delta);
    }
    
    // Subtle float and interactivity
    if (externalModel) {
        // Floating effect
        externalModel.position.y = Math.sin(time * 4) * 0.1;
        // Mouse tracking (subtle rotation)
        externalModel.rotation.y += (mouseX * 0.5 - externalModel.rotation.y) * 0.1;
        externalModel.rotation.x += (-mouseY * 0.2 - externalModel.rotation.x) * 0.1;
    }
    
    avatarRenderer.render(avatarScene, avatarCamera);
}

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Avatar container is fixed size, but just in case
    // we don't need to resize avatarRenderer as it's fixed 300x300 via CSS and JS init
});

animate();
