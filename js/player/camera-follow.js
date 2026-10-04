
import * as THREE from 'three';

class CameraFollow {
    
  constructor(camera, target) {
    this.camera = camera;
    this.target = target;

    this.offset = new THREE.Vector3(0, 4, -8);
    this.lookOffset = new THREE.Vector3(0, 1, 0);
    this.smoothness = 4;

    this.desiredPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();
  }

  update(delta) {
    const targetPosition = this.target.position.clone();

    const offsetRotated = this.offset.clone().applyQuaternion(this.target.quaternion);
    this.desiredPosition.copy(targetPosition).add(offsetRotated);

    const t = 1 - Math.exp(-this.smoothness * delta);
    this.camera.position.lerp(this.desiredPosition, t);

    const lookTarget = targetPosition.clone().add(this.lookOffset);
    this.currentLookAt.lerp(lookTarget, t);
    this.camera.lookAt(this.currentLookAt);
  }
}

export { CameraFollow };