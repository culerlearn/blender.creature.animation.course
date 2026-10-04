import * as THREE from 'three';

class Environment {
  constructor(scene) {
    this.scene = scene;
    this._createPath();
    this._createGround();
    this._createKerbs();
  }

  _createPath() {
    const course = new THREE.PlaneGeometry(35, 300);
    const material = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });

    this.course_ground = new THREE.Mesh(course, material);
    this.course_ground.rotation.x = -Math.PI / 2;
    this.course_ground.position.z = 140; // Center the ground with respect to the path

    this.scene.add(this.course_ground);
  }

  _createGround() {
    const geometry = new THREE.PlaneGeometry(600, 600);
    const material = new THREE.MeshStandardMaterial({ color: 0x888888 });

    this.wide_ground = new THREE.Mesh(geometry, material);
    this.wide_ground.rotation.x = -Math.PI / 2;
    this.wide_ground.position.y = -0.02; // Slightly below the path to avoid z-fighting
    this.wide_ground.position.z = 150; // Center the ground with respect to the path

    this.scene.add(this.wide_ground);
  }

  _createKerbs(){
    const kerbHeight = 0.20;
    const kerbWidth = 0.5;
    const kerbLength = 300;
    const halfWidth = 36 / 2; // matches LayoutManager.streetWidth

    const geometry = new THREE.BoxGeometry(kerbWidth, kerbHeight, kerbLength);
    const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    this.kerbLeft = new THREE.Mesh(geometry, material);
    this.kerbLeft.position.set(-halfWidth - kerbWidth / 2, kerbHeight / 2, 140);
    this.scene.add(this.kerbLeft);

    this.kerbRight = new THREE.Mesh(geometry, material);
    this.kerbRight.position.set(halfWidth + kerbWidth / 2, kerbHeight / 2, 140);
    this.scene.add(this.kerbRight);
  }
}

export { Environment };