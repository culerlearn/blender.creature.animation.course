
// Install Three.js and GLTFLoader
// Start
// Create Three.js Scene - Camera - Renderer
// Add lights to the scene
// Upload the model and add to the scene
// Read character animations and play the first as default
import * as THREE from 'three';
import { ModelLoader } from './modelloader.js';
import { Environment } from './environment.js';
import { AnimationController } from './animation-controller.js';
import { CharacterController } from './character-controller.js';
import { UIManager } from './uimanager.js';
import { DistanceTracker } from './distance-tracker.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Timer } from 'three';


class SceneManager{

    constructor(canvasContainer){

        this.container = canvasContainer;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.set(0, 25, 30);

        this.camera.lookAt(0, 0, 0);


        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        this.container.appendChild(this.renderer.domElement);

        this._setupLighting();

        window.addEventListener('resize', () =>this._onWindowResize());
        
    }

    _setupLighting(){
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(5, 10, 7.5);
        this.scene.add(directional);

    }

    _onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render(){

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

const sceneManager = new SceneManager(document.body);

const environment = new Environment(sceneManager.scene);

let animationController;
let characterController;
let distanceTracker;

let uiManager;

const modelLoader = new ModelLoader();
modelLoader.load('/model/animated-crab.glb').then((gltf) => {
    const model = gltf.scene;

    gltf.animations.forEach((clip) => {
        console.log(`Clip: ${clip.name}`);
        clip.tracks.forEach((track) => console.log(`  Track: ${track.name}`));
    });

    sceneManager.scene.add(model);
    distanceTracker = new DistanceTracker(model);

    animationController = new AnimationController(model, gltf.animations);
    animationController.play(gltf.animations[0].name);

    characterController = new CharacterController(model, animationController);

    const animationNames = gltf.animations.map(clip => clip.name);
    uiManager = new UIManager(characterController, animationController, distanceTracker, animationNames);
  

});

const timer = new Timer();

function animate(){
    
    requestAnimationFrame(animate);

    timer.update();
    const delta = timer.getDelta();

    if (animationController) {
        animationController.update(delta);
    }

    if (characterController) {
        characterController.update(delta);
    }

    if(uiManager){
        uiManager.update();
    }

    if(distanceTracker){
        distanceTracker.update();
    }


    sceneManager.render();
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') characterController.moveForward(true);
  if (e.key === 'ArrowLeft') characterController.turn(1);
  if (e.key === 'ArrowRight') characterController.turn(-1);
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp') characterController.moveForward(false);
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') characterController.turn(0);
});

animate(); 