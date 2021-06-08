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
    let materialBall = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    this.ball = new THREE.Mesh(geometryBall, materialBall);

    this.add(this.ball);
  }

  checkCollisions() {
    this.checkCollisionPlatform(this.scene.platform);
    this.checkCollisionBorder(this.scene.camera);
  }

  checkCollisionPlatform(platform) {
    const leftPlatformX = platform.position.x - platform.width / 2;
    const rightPlatformX = platform.position.x + platform.width / 2;
    const collisionX =
      this.position.x >= leftPlatformX && this.position.x <= rightPlatformX;
    const distanceY = Math.abs(this.position.y - platform.position.y);
    const collisionY = distanceY <= this.radius + platform.height / 2;
    
    if (collisionX && collisionY) {
      this.velocityY = -this.velocityY;
      this.velocityX += this.position.x - platform.position.x;
    }
  }

  checkCollisionBorder(camera) {
    const distanceLeft = this.position.x - camera.left;
    const distanceRight = camera.right - this.position.x;
    if (distanceLeft < this.radius || distanceRight <= this.radius)
      this.velocityX = -this.velocityX;
    
    const distanceTop = camera.top - this.position.y;
    const distanceBottom = this.position.y - camera.bottom;
    if (distanceTop < this.radius || distanceBottom <= this.radius)
      this.velocityY = -this.velocityY;
  }

  update() {
    this.checkCollisions();
    this.position.x += this.velocityX * TheScene.deltaTime;
    this.position.y += this.velocityY * TheScene.deltaTime;
  }
}

export { Ball };
