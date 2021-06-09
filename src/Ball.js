import * as THREE from "../lib/three.module.js";
import { Game } from "./Game.js";
import { TheScene } from "./TheScene.js";

class Ball extends THREE.Object3D {
  constructor(scene) {
    super();

    this.startPositionY = -1.69;

    this.scene = scene;
    this.radius = 0.05;
    this.velocityX = 0.0;
    this.velocityY = 3;

    let geometryBall = new THREE.SphereBufferGeometry(this.radius, 50, 50);
    this.position.x = 0.0;
    this.position.y = this.startPositionY;
    let materialBall = this.loadTextureMaterial();
    this.ball = new THREE.Mesh(geometryBall, materialBall);

    this.add(this.ball);
  }

  restart() {
    this.position.x = 0;
    this.position.y = this.startPositionY;
    this.velocityY = 3;
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
    const lose = this.checkCollisionBorder(this.scene.camera);
    if (!lose) {
      this.checkCollisionPlatform(this.scene.platform);
      this.checkCollisionBrickWall(this.scene.brickWall);
    }
    return lose;
  }

  checkCollisionBox(box) {
    const leftBoxX = box.position.x - box.width / 2;
    const rightBoxX = box.position.x + box.width / 2;
    const collisionLeftX = this.position.x + this.radius >= leftBoxX;
    const collisionRightX = this.position.x - this.radius <= rightBoxX;
    const collisionX = collisionLeftX && collisionRightX;
    const distanceY = Math.abs(this.position.y - box.position.y);
    const collisionY = distanceY <= this.radius + box.height / 2;

    return {
      thereIsCollision: collisionX && collisionY,
      collisionSideBorder: distanceY < box.height / 2,
    };
  }

  checkCollisionPlatform(platform) {
    const { thereIsCollision, collisionSideBorder } =
      this.checkCollisionBox(platform);

    if (thereIsCollision) {
      if (!collisionSideBorder)
        this.velocityY =
          this.position.y > platform.position.y
            ? Math.abs(this.velocityY)
            : -Math.abs(this.velocityY);
      this.velocityX = (this.position.x - platform.position.x) * 2.5;
    }
  }

  checkCollisionBrick(brick) {
    const { thereIsCollision, collisionSideBorder } =
      this.checkCollisionBox(brick);

    if (thereIsCollision) {
      if (!collisionSideBorder)
        this.velocityY =
          this.position.y > brick.position.y // ha chocado por arriba?
            ? Math.abs(this.velocityY)
            : -Math.abs(this.velocityY);
      else
        this.velocityX =
          this.position.x > brick.position.x // ha chocado por la derecha?
            ? Math.abs(this.velocityX)
            : -Math.abs(this.velocityX);

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
    else if (this.position.x >= maxRight)
      this.velocityX = -Math.abs(this.velocityX);
    // Se usa abs para evitar que se quede en bucle si entra en un borde

    const maxTop = camera.top - this.radius;
    const minBottom = camera.bottom - this.radius;
    if (this.position.y >= maxTop) this.velocityY = -Math.abs(this.velocityY);
    else if (this.position.y <= minBottom) {
      this.scene.game.subtractLife();
      return true;
    }
    return false;
  }

  update() {
    if (this.scene.game.state === Game.PLAYING) {
      const lose = this.checkCollisions();
      if (!lose) {
        this.position.x += this.velocityX * TheScene.deltaTime;
        this.position.y += this.velocityY * TheScene.deltaTime;
      }
    }
  }
}

export { Ball };
