import * as THREE from "../lib/three.module.js";
import { TheScene } from "./TheScene.js";

class Ball extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;
    this.radius = 0.05;
    this.velocityX = 0.0;
    this.velocityY = 2;

    let geometryBall = new THREE.SphereBufferGeometry(this.radius, 50, 50);
    this.position.x = 0.0;
    this.position.y = -1.7;
    let materialBall = this.loadTextureMaterial();
    this.ball = new THREE.Mesh(geometryBall, materialBall);

    this.add(this.ball);
  }

  loadTextureMaterial() {
    const loader = new THREE.TextureLoader();
    return new THREE.MeshPhongMaterial({
      map: loader.load(
        "../assets/BreakoutTileSetFree/PNG/58-Breakout-Tiles.png"
      ),
    });
  }

  checkCollisions() {
    this.checkCollisionBorder(this.scene.camera);
    this.checkCollisionPlatform(this.scene.platform);
    this.checkCollisionBrickWall(this.scene.brickWall);
  }

  checkCollisionBox(box) {
    const leftPlatformX = box.position.x - box.width / 2;
    const rightPlatformX = box.position.x + box.width / 2;
    const collisionX =
      this.position.x >= leftPlatformX && this.position.x <= rightPlatformX;
    const distanceY = Math.abs(this.position.y - box.position.y);
    const collisionY = distanceY <= this.radius + box.height / 2;

    return collisionX && collisionY;
  }

  checkCollisionPlatform(platform) {
    const thereIsCollision = this.checkCollisionBox(platform);

    if (thereIsCollision) {
      this.velocityY =
        this.position.y > platform.position.y
          ? Math.abs(this.velocityY)
          : -Math.abs(this.velocityY);
      this.velocityX = (this.position.x - platform.position.x) * 1.5;
    }
  }

  checkCollisionBrick(brick) {
    const thereIsCollision = this.checkCollisionBox(brick);

    if (thereIsCollision) {
      this.velocityY = -this.velocityY;
      this.velocityX += this.position.x - brick.position.x;

      brick.hasCollided();
    }
  }

  checkCollisionBrickWall(brickWall) {
    for (const brick of brickWall.children) {
      this.checkCollisionBrick(brick);
    }
  }

  checkCollisionBorder(camera) {
    const minLeft = camera.left + this.radius;
    const maxRight = camera.right - this.radius;
    if (this.position.x <= minLeft) this.velocityX = Math.abs(this.velocityX);
    if (this.position.x >= maxRight) this.velocityX = -Math.abs(this.velocityX);
    // Se usa abs para evitar que se quede en bucle si entra en un borde

    const maxTop = camera.top - this.radius;
    const minBottom = camera.bottom - this.radius;
    if (this.position.y >= maxTop) this.velocityY = -Math.abs(this.velocityY);
    if (this.position.y <= minBottom) {
      this.scene.game.subtractLife();
    }
  }

  update() {
    this.checkCollisions();
    this.position.x += this.velocityX * TheScene.deltaTime;
    this.position.y += this.velocityY * TheScene.deltaTime;
  }
}

export { Ball };
