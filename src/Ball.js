import * as THREE from "../lib/three.module.js";
import { TheScene } from "./TheScene.js";

class Ball extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;

    let geometryBall = new THREE.SphereBufferGeometry(0.05, 50, 50);
    geometryBall.translate(0, 1.7, 0);
    let materialBall = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.ball = new THREE.Mesh(geometryBall, materialBall);

    this.add(this.ball);
  }
}

export { Ball };
