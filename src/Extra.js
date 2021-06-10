import * as THREE from "../lib/three.module.js";
import { Game } from "./Game.js";
import { TheScene } from "./TheScene.js";

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

class Extra extends THREE.Object3D {
  constructor(scene, type) {
    super();
    this.scene = scene;
    this.type = type;
    this.velocityY = -1.5;

    const extraGeometry = new THREE.BoxBufferGeometry(
      type.width,
      type.height,
      0.1
    );
    this.extra = new THREE.Mesh(extraGeometry, type.material);
    this.add(this.extra);
    this.position.z = 0;
    this.position.y = this.scene.cameraHeight / 2 + type.height / 2;
    this.position.x = randomFloat(
      -this.scene.cameraWidth / 2 + this.type.width / 2,
      this.scene.cameraWidth / 2 - this.type.width / 2
    );
  }

  checkCollisionPlatform() {
    if (this.scene.game.state !== Game.PLAYING)
      return false;
    const platform = this.scene.platform;
    const leftPlatformX = platform.position.x - platform.width / 2;
    const rightBoxX = platform.position.x + platform.width / 2;
    const collisionLeftX = this.position.x >= leftPlatformX;
    const collisionRightX = this.position.x <= rightBoxX;
    const collisionX = collisionLeftX && collisionRightX;
    const distanceY = Math.abs(this.position.y - platform.position.y);
    const collisionY = distanceY <= this.type.height / 2 + platform.height / 2;
    return collisionX && collisionY;
  }

  update() {
    const hasCollided = this.checkCollisionPlatform();
    if (hasCollided) {
      this.scene.game.manageExtraCollision(this.type);
      this.scene.extras.splice(this.scene.extras.indexOf(this), 1);
      this.scene.remove(this);
    } else {
      this.position.y += this.velocityY * TheScene.deltaTime;
    }
  }
}

const loader = new THREE.TextureLoader();

Extra.types = {
  LIFE: {
    width: 0.2,
    height: 0.2,
    material: new THREE.MeshPhongMaterial({
      transparent: true,
      map: loader.load(
        "../assets/BreakoutTileSetFree/PNG/org-lgbt-heart-01-128.png"
      ),
    }),
  },
  BULLET: {
    width: 0.1,
    height: 0.2,
    material: new THREE.MeshPhongMaterial({
      transparent: true,
      map: loader.load(
        "../assets/BreakoutTileSetFree/PNG/61-Breakout-Tiles.png"
      ),
    }),
  },
};

Object.freeze(Extra.types);

export { Extra };
