import * as THREE from 'three';

class Environment {
  constructor(scene) {
    this.scene = scene;
    this._createGround();
  }

  _createGround() {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x556b2f });

    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotation.x = -Math.PI / 2;

    this.scene.add(this.ground);
  }
}

export { Environment };