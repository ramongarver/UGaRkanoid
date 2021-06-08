import * as THREE from "../lib/three.module.js";
import { TheScene } from "./TheScene.js";

class Platform extends THREE.Object3D {
  constructor(scene) {
    super();

    this.scene = scene;

    this.width = 0.8;
    this.height = 0.1;
    let geometryPlatform = new THREE.BoxBufferGeometry(this.width, this.height, 0);
    //geometryPlatform.translate(0, -1.8, 0);
    let materialPlatform = new THREE.MeshBasicMaterial({ color: 0xf0f201 });
    this.platform = new THREE.Mesh(geometryPlatform, materialPlatform);

    this.add(this.platform);
    this.position.y = -1.8;
  }

  moveLeft() {
    // TODO: implementar bien
    if (this.position.x >= -1) this.position.x -= 0.5;
  }

  moveRight() {
    // TODO: implementar bien
    if (this.position.x <= 1) this.position.x += 0.5;
  }

  mouseMoveHandler(event, cameraWidth) {
    const divOffsetLeft = event.target.offsetLeft;
    const divWidth = event.target.clientWidth;
    const relativeX = event.pageX - divOffsetLeft;

    // document.querySelector(
    //   "#info"
    // ).innerHTML = `x: ${relativeX}<br/>width: ${divWidth}`;

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

  setPositionX(x) {
    this.position.x = x;
  }
}

export { Platform };
