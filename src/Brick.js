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
        this.scene.game.checkVictory();
        return;
      }
      const hasBeenHit = this.hits > 0 ? 1 : 0;
      this.brick.material = this.color.material[hasBeenHit];
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
