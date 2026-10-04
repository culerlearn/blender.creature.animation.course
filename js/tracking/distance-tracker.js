
class DistanceTracker {
  constructor(model) {
    this.model = model;
    this.totalDistance = 0;
    this.previousX = model.position.x;
    this.previousZ = model.position.z;

    this.multiplier = 0.05;
  }

  update() {
    const dx = this.model.position.x - this.previousX;
    const dz = this.model.position.z - this.previousZ;

    this.totalDistance += Math.sqrt(dx * dx + dz * dz) * this.multiplier;

    this.previousX = this.model.position.x;
    this.previousZ = this.model.position.z;
  }

  reset() {
    this.totalDistance = 0;
    this.previousX = this.model.position.x;
    this.previousZ = this.model.position.z;
  }

  getDistance() {
    return this.totalDistance;
  }
}

export { DistanceTracker };