

import { Environment } from './environment.js';
import { LayoutManager } from './layout-manager.js';
import { BuildingManager } from './building-manager.js';
import { ObstacleManager } from './obstacle-manager.js';
import { SkyEnvironment } from './sky-environment.js';

class EnvironmentManager {
  constructor(scene, sunLight) {
    this.scene = scene;
    this.environment = new Environment(scene);
    this.layoutManager = new LayoutManager();
    this.buildingManager = new BuildingManager(scene, this.layoutManager);
    this.obstacleManager = new ObstacleManager(scene, this.layoutManager);
    
    this.skyEnvironment = new SkyEnvironment(scene, sunLight);
  }

  async init(buildingPaths, buildingCount, rockPaths, rockCount) {
    await this.buildingManager.loadTemplates(buildingPaths);
    this.buildingManager.placeBuildings(buildingCount);

    await this.obstacleManager.loadTemplates(rockPaths);
    this.obstacleManager.placeObstacles(rockCount);
  }
}

export { EnvironmentManager };