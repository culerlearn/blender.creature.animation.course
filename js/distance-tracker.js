
class DistanceTracker {
  constructor(model) {
    this.model = model;
    this.totalDistance = 0;
    this.previousPosition = model.position.clone();
  }

  update() {
    const currentPosition = this.model.position;
    const distanceThisFrame = currentPosition.distanceTo(this.previousPosition);

    this.totalDistance += distanceThisFrame;
    this.previousPosition.copy(currentPosition);
  }

  getDistance() {
    return this.totalDistance;
  }
}

export { DistanceTracker };