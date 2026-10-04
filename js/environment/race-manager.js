
import * as THREE from 'three';

class RaceManager {
  constructor(model, layoutManager, runTimer) {
    this.model = model;
    this.layoutManager = layoutManager;
    this.runTimer = runTimer;
    this.hasFinished = false;
  }

  start() {
    this.hasFinished = false;
    this.runTimer.start();
  }

  update() {
    if (this.hasFinished) return;

    const exit = this.layoutManager.getExitPoint();
    const crabBox = new THREE.Box3().setFromObject(this.model);

    if (crabBox.max.z >= exit.z) {
      this.hasFinished = true;
      this.runTimer.stop();
    }
  }
}

export { RaceManager };