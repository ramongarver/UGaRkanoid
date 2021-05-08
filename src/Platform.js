import * as THREE from '../lib/three.module.js'
import { TheScene } from './TheScene.js'

class Platform extends THREE.Object3D {

  constructor (scene) {
    super();

    this.scene = scene;

    let geometryPlatform = new THREE.BoxBufferGeometry(0.8, 0.1, 0);
    geometryPlatform.translate(0, 1.8, 0);
    let materialPlatform = new THREE.MeshBasicMaterial({ color: 0xF0F201 });
    this.platform = new THREE.Mesh(geometryPlatform, materialPlatform);

    this.add(this.platform);
  }

  moveLeft() {
    this.position.x -= 0.5;
  }

  moveRight() {
    this.position.x += 0.5;
  }

  setPositionX(x) {
    this.position.x = x;
  }
}

export { Platform };