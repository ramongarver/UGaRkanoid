import * as THREE from "../lib/three.module.js";
import { TheScene } from "./TheScene.js";

class Brick extends THREE.Object3D {
  constructor(scene, x, y) {
    super();

    this.scene = scene;

    this.width = 0.2;
    this.height = 0.1;
    let geometryBrick = new THREE.BoxBufferGeometry(this.width, this.height, 0);
    let materialBrick = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.brick = new THREE.Mesh(geometryBrick, materialBrick);

    this.hardness = 1;

    this.add(this.brick);
    this.position.y = 1.0;
  }
}

export { Brick };