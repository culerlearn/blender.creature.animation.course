import * as THREE from 'three';

class CharacterController {
  constructor(model, animationController, layoutManager) {
    this.model = model;
    this.animationController = animationController;
    this.layoutManager = layoutManager;

    this.moveSpeed = 10;
    this.turnSpeed = 0.5;

    this.isMoving = false;
    this.turnDirection = 0;
    this._wasMoving = null;
  }

  moveForward(state) {
    this.isMoving = state;
  }

  turn(direction) {
    this.turnDirection = direction;
  }

  update(delta) {
    if (this.turnDirection !== 0) {
      this.model.rotation.y += this.turnDirection * this.turnSpeed * delta;
    }

    if (this.isMoving) {
      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(this.model.quaternion);
      forward.multiplyScalar(this.moveSpeed * delta);
      this.model.position.add(forward);
    }
    
    if (this.turnDirection !== 0) {
      const maxAngle = THREE.MathUtils.degToRad(60);
      const nextRotation = this.model.rotation.y + this.turnDirection * this.turnSpeed * delta;
      this.model.rotation.y = THREE.MathUtils.clamp(nextRotation, -maxAngle, maxAngle);
    }

    const halfWidth = this.layoutManager.streetWidth / 2;
    this.model.position.x = THREE.MathUtils.clamp(this.model.position.x, -halfWidth, halfWidth);
    this._syncAnimation();
  }

  _syncAnimation() {
    if (this.isMoving === this._wasMoving) return;
    this._wasMoving = this.isMoving;

    if (this.isMoving) {
      this.animationController.play('walk_animation');
    } else {
      this.animationController.play('idle_animation');
    }
  }
}

export { CharacterController };