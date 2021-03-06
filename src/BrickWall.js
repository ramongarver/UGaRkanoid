import * as THREE from "../lib/three.module.js";
import { Brick } from "./Brick.js";
import { Levels } from "./Levels.js";
import { BrickTypes } from "./BrickTypes.js";
import { LevelGenerator } from "./LevelGenerator.js";

class BrickWall extends THREE.Object3D {
  constructor(scene, level, offsetY) {
    super();

    this.scene = scene;

    this.offsetY = offsetY;

    const leftX = -this.scene.cameraWidth / 2;
    const rightX = this.scene.cameraWidth / 2;
    const worldWidth = rightX - leftX;

    if (level != 99) this.level = Levels[level];
    else this.level = new LevelGenerator(6, 13, 5, 12, 4).generateLevel();

    const brickHeight = 0.125;

    this.createBricks(worldWidth, scene, brickHeight, leftX, offsetY);

    this.position.z = -1;
  }

  createBricks(worldWidth, scene, brickHeight, leftX, offsetY) {
    for (const [indexRow, row] of this.level.bricksTypes.entries()) {
      const brickWidth = worldWidth / row.length;

      for (const [indexCol, brickType] of row.entries()) {
        if (brickType !== "no") {
          const brick = new Brick(
            scene,
            brickWidth,
            brickHeight,
            BrickTypes[brickType]
          );
          brick.position.x = leftX + brickWidth * indexCol + brickWidth / 2;
          brick.position.y = offsetY - indexRow * brickHeight;
          this.add(brick);
        }
      }
    }
  }

  getBricksLeft() {
    return this.children.filter((brick) => brick.hardness != -1).length;
  }
}

export { BrickWall };
