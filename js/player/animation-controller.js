import * as THREE from 'three';

class AnimationController {
    
  constructor(model, animations) {
    this.mixer = new THREE.AnimationMixer(model);
    this.actions = {};
    this.currentAction = null;

    animations.forEach((clip) => {
      this.actions[clip.name] = this.mixer.clipAction(clip);
    });
  }

  play(name) {
    const nextAction = this.actions[name];
    if (!nextAction) {
      console.warn(`No animation clip named "${name}" was found.`);
      return;
    }
    if (this.currentAction === nextAction) return;

    if (this.currentAction) {
      this.currentAction.fadeOut(0.3);
    }
    nextAction.reset().fadeIn(0.3).play();
    this.currentAction = nextAction;
  }

  update(delta) {
    this.mixer.update(delta);
  }
}

export { AnimationController };