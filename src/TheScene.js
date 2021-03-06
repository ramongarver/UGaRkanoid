import * as THREE from "../lib/three.module.js";

// Clases de nuestro proyecto

import { Platform } from "./Platform.js";
import { Ball } from "./Ball.js";
import { BrickWall } from "./BrickWall.js";
import { Direction } from "./Direction.js";
import { Extra } from "./Extra.js";

// The Model Facade class. The root node of the graph.
class TheScene extends THREE.Scene {
  constructor(myCanvas, game) {
    super();

    // Scene attributes
    this.cameraWidth = 4;
    this.cameraHeight = 4;
    this.ambientLight = null;
    this._camera = null;
    this.clock = new THREE.Clock();

    // Game attributes
    this.game = game;

    this.platform = new Platform(this);
    this.add(this.platform);

    this.ball = new Ball(this);
    this.add(this.ball);

    this.brickWall = new BrickWall(
      this,
      this.game.level,
      (this.cameraHeight / 2) * 0.8
    );
    this.add(this.brickWall);

    this.extras = [];


    this.createCamera();
    this.createLights();
    this.createBackground();
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

  // It creates the background and adds it to the graph
  createBackground() {
    const loader = new THREE.TextureLoader();

    this.background = loader.load(
      "../assets/etsiit.png"
    );
  }

  mouseMoveHandler(event) {
    this.platform.mouseMoveHandler(event, this.cameraWidth);
  }

  keyDownHandler(event) {
    const x = event.which || event.keyCode;
    switch (x) {
      case 32:
        this.game.mouseUpHandler();
        break;
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
    // Este m??todo es llamado cada vez que el usuario modifica el tama??o de la ventana de la aplicaci??n

    // Hay que actualizar el tama??o del renderizador: cuadrado
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    this.game.renderer.setSize(minSize, minSize);
  }

  // It returns the camera
  get camera() {
    return this._camera;
  }

  restart() {
    this.restartExtras();
    this.restartBall();
    this.restartPlatform();
  }

  restartExtras() {
    for (const extra of this.extras) {
      this.remove(extra);
    }
    this.extras = [];
  }

  restartBall() {
    this.ball.restart();
  }

  restartPlatform() {
    this.platform.restart();
  }

  createExtra(type) {
    const newExtra = new Extra(this, Extra.types[type]);
    this.extras.push(newExtra);
    this.add(newExtra);
  }

  update() {
    // Este m??todo debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    this.game.renderer.render(this, this.camera);

    TheScene.deltaTime = this.clock.getDelta();

    // Le decimos al renderizador "visualiza la escena que te indico usando la c??mara que te estoy pasando"

    this.ball.update();

    this.platform.update();

    this.extras.forEach((extra) => extra.update());

  }
}

export { TheScene };
