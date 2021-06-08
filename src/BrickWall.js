import * as THREE from "../lib/three.module.js";
import { Brick } from "./Brick.js";
import { TheScene } from "./TheScene.js";

class BrickWall extends THREE.Object3D {
  constructor(scene, bricksNumber, colsNumber, offsetY) {
    super();

    this.scene = scene;

    this.bricksNumber = bricksNumber;
    this.colsNumber = colsNumber;
    this.offsetY = offsetY;

    const leftX = -this.scene.cameraWidth / 2;
    const rightX = this.scene.cameraWidth / 2;
    const worldWidth = rightX - leftX;

    const brickWidth = worldWidth / colsNumber;
    const brickHeight = 0.1;

    for (let i = 0, col = 0, row = 0; i < this.bricksNumber; i++) {
      let brick = new Brick(scene, brickWidth, brickHeight, 1);
      brick.position.x = leftX + brickWidth * col + brickWidth / 2;
      brick.position.y = offsetY - row * brickHeight;
      this.add(brick);
      col = (col + 1) % colsNumber;
      if (col == 0) row++;
    }
  }
}

export { BrickWall };
