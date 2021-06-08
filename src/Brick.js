import * as THREE from "../lib/three.module.js";
import { TheScene } from "./TheScene.js";

class Brick extends THREE.Object3D {
  constructor(scene, width, height, hardness) {
    super();

    this.scene = scene;

    this.width = width;
    this.height = height;
    let geometryBrick = new THREE.BoxBufferGeometry(this.width, this.height, 0);
    let materialBrick = Brick.materials[hardness];
    this.brick = new THREE.Mesh(geometryBrick, materialBrick);

    this.hardness = hardness;

    this.add(this.brick);
  }

  /*checkCollision(ball) {
    if () {
      if (hardness > 1) {
        hardness--;
        this.material = ...
        //this.material.needsUpdate = true;
      }
    }
  }*/
}

Brick.materials = [
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
];

export { Brick };