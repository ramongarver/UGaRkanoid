import * as THREE from "../lib/three.module.js";
import { BrickColors } from "./BrickTypes.js";

class Brick extends THREE.Object3D {
  constructor(scene, width, height, brickType) {
    super();

    this.scene = scene;

    this.width = width;
    this.height = height;
    
    this.hits = 0;
    this.hardness = brickType.hardness;
    this.color = brickType.color;
    this.points = brickType.color.points;

    let geometryBrick = new THREE.BoxBufferGeometry(this.width, this.height, 0);
    let materialBrick = this.color.material[this.hits];
    this.brick = new THREE.Mesh(geometryBrick, materialBrick);

    this.add(this.brick);
  }

  hasCollided() {
    if (this.color != BrickColors['gray']) {
      this.hits++;
      if (this.hardness - this.hits == 0) {
        this.parent.remove(this);
        this.scene.game.addPoints(this.points);
        this.scene.game.checkVictory();
        return;
      }
      const hasBeenHit = this.hits > 0 ? 1 : 0;
      const maximumHardness = 4;
      this.brick.material = this.color.material[maximumHardness - this.hardness + this.hits];
    }
  }
}

Brick.materials = [
  new THREE.MeshBasicMaterial({ color: 0x00cc00 }),
  new THREE.MeshBasicMaterial({ color: 0x00dd00 }),
  new THREE.MeshBasicMaterial({ color: 0x00ee00 }),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
];

export { Brick };
