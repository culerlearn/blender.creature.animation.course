

class LayoutManager {
    
  constructor() {
    this.streetLength = 120;
    this.streetWidth = 32;
    this.buildingZoneDepth = 10;
    this.buildingSpacingMin = 12;
    this.buildingSpacingMax = 18;
    this.obstacleStartOffset = 15;
  }

  getStartPoint() {
    return { x: 0, z: 0 };
  }

  getExitPoint() {
    return { x: 0, z: this.streetLength };
  }

  
  getBuildingPositions(count) {
        const positions = [];
        const halfZone = this.streetWidth / 2 + this.buildingZoneDepth / 2;
        let z = 15;
        let side = 1;

        while (z < this.streetLength - 10 && positions.length < count) {
            const x = side * halfZone;
            positions.push({ x, z, side });

            side *= -1;
            z += 8 + Math.random() * 8;   // 8-16m between buildings, tighter than before
        }
        return positions;
    }

  getRandomObstaclePosition() {
    const z = this.obstacleStartOffset + Math.random() * (this.streetLength - this.obstacleStartOffset - 10);
    const x = (Math.random() - 0.5) * this.streetWidth;
    return { x, z };
  }
}

export { LayoutManager };