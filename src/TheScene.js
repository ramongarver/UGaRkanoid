import * as THREE from "../lib/three.module.js";

// Clases de nuestro proyecto

import { Platform } from "./Platform.js";
import { Ball } from "./Ball.js";
import { BrickWall } from "./BrickWall.js";
import { Direction } from "./Direction.js";


// The Model Facade class. The root node of the graph.
class TheScene extends THREE.Scene {
  constructor(myCanvas, game) {
    super();
    this.cameraWidth = 4;
    this.cameraHeight = 4;

    this.game = game;

    this.platform = new Platform(this);
    this.add(this.platform);

    this.ball = new Ball(this);
    this.add(this.ball);

    this.brickWall = new BrickWall(this, this.game.level, (this.cameraHeight / 2) * 0.8);
    this.add(this.brickWall);

    // Attributes

    this.ambientLight = null;
    this.spotLight = null;
    this._camera = null;
    this.trackballControls = null;
    this.crane = null;
    this.ground = null;
    this.clock = new THREE.Clock();

    this.createCamera();
    this.createLights();
    this.axis = new THREE.AxesHelper(25);
    this.add(this.axis);
  }

  // It creates the camera and adds it to the graph
  createCamera() {
    this._camera = new THREE.OrthographicCamera(
      -this.cameraWidth / 2,
      this.cameraWidth / 2,
      this.cameraHeight / 2,
      -this.cameraHeight / 2,
      -2.0,
      2.0
    );

    this.add(this._camera);
  }

  // It creates lights and adds them to the graph
  createLights() {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.add(this.ambientLight);
  }



  mouseMoveHandler(event) {
    this.platform.mouseMoveHandler(event, this.cameraWidth);
  }

  keyDownHandler(event) {
    const x = event.which || event.keyCode;
    switch (x) {
      case 37:
        this.platformMovement = Direction.Left;
        break; // left arrow
      case 39:
        this.platformMovement = Direction.Right;
        break; // right arrow
    }
  }

  keyUpHandler(event) {
    const x = event.which || event.keyCode;
    switch (x) {
      case 37:
        if (this.platformMovement == Direction.Left)
          this.platformMovement = Direction.None;
        break; // left arrow
      case 39:
        if (this.platformMovement == Direction.Right)
          this.platformMovement = Direction.None;
        break; // right arrow
    }
  }

  windowResizeHandler() {
    // Este método es llamado cada vez que el usuario modifica el tamaño de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    //this.setCameraAspect (window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    this.game.renderer.setSize(minSize, minSize);
  }

  setMessage(str) {
    document.getElementById("Messages").innerHTML = "<h2>" + str + "</h2>";
  }

  // It returns the camera
  get camera() {
    return this._camera;
  }

  // It updates the aspect ratio of the camera
  setCameraAspect(anAspectRatio) {
    this._camera.aspect = anAspectRatio;
    this._camera.updateProjectionMatrix();
  }

  update() {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.

    TheScene.deltaTime = this.clock.getDelta();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"

    this.ball.update();

    this.platform.update();

    this.game.renderer.render(this, this.camera);
  }
}


export { TheScene };
