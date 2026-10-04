
import { ModelLoader } from '../modelloader.js';

class ObstacleManager {
  constructor(scene, layoutManager) {
    this.scene = scene;
    this.layoutManager = layoutManager;
    this.templates = [];
    this.placed = [];
  }

  clearObstacles(){
    this.placed.forEach((rock) => {
      this.scene.remove(rock);
    });
    this.placed = [];
  }

  async loadTemplates(paths) {
    const loader = new ModelLoader();
    for (const path of paths) {
      const gltf = await loader.load(path);
      this.templates.push(gltf.scene);
    }
  }

  placeObstacles(count) {
    for (let i = 0; i < count; i++) {
      const pos = this.layoutManager.getRandomObstaclePosition();
      const template = this.templates[i % this.templates.length];
      const rock = template.clone();

      rock.position.set(pos.x, 0, pos.z);
      rock.rotation.y = Math.random() * Math.PI * 2;
      rock.scale.set(2.5, 2.5, 2.5);

      this.scene.add(rock);
      this.placed.push(rock);
    }
  }
}

export { ObstacleManager };