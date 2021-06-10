import * as THREE from "../lib/three.module.js";
import { TheScene } from "./TheScene.js";

import { Direction } from "./Direction.js";
import { Game } from "./Game.js";

class Platform extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;

    this.width = 0.8;
    this.height = 0.1;
    const geometryPlatform = new THREE.BoxBufferGeometry(
      this.width,
      this.height,
      0
    );

    this.indexMaterial = 0;
    const materialPlatform = Platform.materials[this.indexMaterial];

    this.platform = new THREE.Mesh(geometryPlatform, materialPlatform);

    this.add(this.platform);
    this.position.y = -1.8;

    this.arrowVelocity = 2;

    this.timeEllapsed = 0;
  }

  restart() {
    this.position.x = 0;
  }

  mouseMoveHandler(event, cameraWidth) {
    if (this.scene.game.state === Game.PLAYING) {
      const divOffsetLeft = event.target.offsetLeft;
      const divWidth = event.target.clientWidth;
      const relativeX = event.pageX - divOffsetLeft;

      // Valor entre 0 y 1
      const relativeXWorld = relativeX / divWidth;
      let mouseX = relativeXWorld * cameraWidth - cameraWidth / 2;
      const min = -cameraWidth / 2 + this.width / 2;
      const max = cameraWidth / 2 - this.width / 2;

      if (mouseX < min) {
        // Para que no pueda salirse por la izquierda
        mouseX = min;
      } else if (mouseX > max) {
        // Para que no pueda salirse por la derecha
        mouseX = max;
      }
      this.setPositionX(mouseX);
    }
  }

  setPositionX(x) {
    this.position.x = x;
  }

  moveLeft() {
    if (this.position.x - this.width / 2 > -this.scene.cameraWidth / 2)
      this.position.x -= this.arrowVelocity * TheScene.deltaTime;
  }

  moveRight() {
    if (this.position.x + this.width / 2 < this.scene.cameraWidth / 2)
      this.position.x += this.arrowVelocity * TheScene.deltaTime;
  }

  update() {
    this.timeEllapsed += TheScene.deltaTime;
    if (this.timeEllapsed > 0.1) {
      this.indexMaterial = (this.indexMaterial + 1) % Platform.materials.length;
      this.platform.material = Platform.materials[this.indexMaterial];
      this.timeEllapsed = 0;
    }
    if (this.scene.game.state === Game.PLAYING) {
      switch (this.scene.platformMovement) {
        case Direction.Left:
          this.moveLeft();
          break;

        case Direction.Right:
          this.moveRight();
          break;
      }
    }
  }
}

const loader = new THREE.TextureLoader();

Platform.materials = [
  new THREE.MeshPhongMaterial({
    transparent: true,
    map: loader.load("../assets/BreakoutTileSetFree/PNG/50-Breakout-Tiles.png"),
  }),
  new THREE.MeshPhongMaterial({
    transparent: true,
    map: loader.load("../assets/BreakoutTileSetFree/PNG/51-Breakout-Tiles.png"),
  }),
  new THREE.MeshPhongMaterial({
    transparent: true,
    map: loader.load("../assets/BreakoutTileSetFree/PNG/52-Breakout-Tiles.png"),
  }),
];

export { Platform };
