
import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

class SkyEnvironment {
  constructor(scene, sunLight) {
    this.scene = scene;
    this.sunLight = sunLight;
    this.sun = new THREE.Vector3();

    this.sky = new Sky();
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);

    this.settings = {
      turbidity: 10,
      rayleigh: 0.5,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.8,
      elevation: 15,
      azimuth: 180,
    };

    this._applySettings();
  }

  _applySettings() {
    const uniforms = this.sky.material.uniforms;
    uniforms['turbidity'].value = this.settings.turbidity;
    uniforms['rayleigh'].value = this.settings.rayleigh;
    uniforms['mieCoefficient'].value = this.settings.mieCoefficient;
    uniforms['mieDirectionalG'].value = this.settings.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - this.settings.elevation);
    const theta = THREE.MathUtils.degToRad(this.settings.azimuth);
    this.sun.setFromSphericalCoords(1, phi, theta);

    uniforms['sunPosition'].value.copy(this.sun);
    this.sunLight.position.copy(this.sun).multiplyScalar(100);
  }

}

export { SkyEnvironment };