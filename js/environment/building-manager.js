

import { ModelLoader } from '../modelloader.js';

class BuildingManager {
  constructor(scene, layoutManager) {
    this.scene = scene;
    this.layoutManager = layoutManager;
    this.templates = [];
  }

  async loadTemplates(paths) {
    const loader = new ModelLoader();
    for (const path of paths) {
      const gltf = await loader.load(path);
      this.templates.push(gltf.scene);
    }
  }

  placeBuildings(count) {
    const positions = this.layoutManager.getBuildingPositions(count);

    positions.forEach((pos, i) => {
      const template = this.templates[i % this.templates.length];
      const building = template.clone();

      building.position.set(pos.x, 0, pos.z);
      if (pos.side === -1) building.rotation.y = Math.PI;

      this.scene.add(building);
    });
  }
}

export { BuildingManager };