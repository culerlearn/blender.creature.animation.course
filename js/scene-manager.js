
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class SceneManager{

    constructor(canvasContainer){

        this.container = canvasContainer;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.set(0, 25, 30);

        this.camera.lookAt(0, 0, 0);


        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container.appendChild(this.renderer.domElement);

        this._setupLighting();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enabled = true;

        window.addEventListener('resize', () =>this._onWindowResize());
        
    }

    setOrbitControlsEnabled(enabled){
        this.controls.enabled = enabled;
    }

    setOrbitTarget(position) {
        this.controls.target.copy(position);
        this.controls.update();
    }

    _setupLighting(){
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambient);

        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.sunLight.position.set(5, 10, 7.5);
        this.scene.add(this.sunLight);

    }

    _onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render(){

        if(this.controls.enabled){
            this.controls.update();
        }
        this.renderer.render(this.scene, this.camera);
    }
}

export {SceneManager };