import * as THREE from "../lib/three.module.js";
import { Brick } from "./Brick.js";
import { TheScene } from "./TheScene.js";

class BrickWall extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;

    this.numberOfBricks = 20;


    for (let i = 0; i < this.numberOfBricks; i++) {
      brick = new Brick(scene);
      this.add(this.brick);
    }


    this.add(this.brick);
    this.position.y = 1.0;
  }
}

export { BrickWall };