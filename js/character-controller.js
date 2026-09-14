import * as THREE from 'three';

class CharacterController 
{
  constructor(model, animationController) {
    this.model = model;
    this.animationController = animationController;

    this.moveSpeed = 10;
    this.turnSpeed = 0.5;

    this.isMoving = false;
    this.turnDirection = 0;
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

    this._syncAnimation();
  }

  _syncAnimation() {
    if (this.isMoving === this._wasMoving) return; // nothing changed, leave it alone
      this._wasMoving = this.isMoving;

      if (this.isMoving) {
        this.animationController.play('walk_animation');
      } else {
        this.animationController.stop();
      }
  }
  
}

export { CharacterController };