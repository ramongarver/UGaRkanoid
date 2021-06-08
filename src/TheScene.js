import * as THREE from "../lib/three.module.js";
import { GUI } from "../lib/dat.gui.module.js";
import { TrackballControls } from "../lib/TrackballControls.js";

// Clases de nuestro proyecto

import { Platform } from "./Platform.js";
import { Ball } from "./Ball.js";
import { BrickWall } from "./BrickWall.js";
import { Direction } from "./Direction.js";

import { touchHandler } from "./touch.handler.js";

// The Model Facade class. The root node of the graph.
class TheScene extends THREE.Scene {
  constructor(myCanvas) {
    super();
    this.cameraWidth = 4;
    this.cameraHeight = 4;

    this.platform = new Platform(this);
    this.add(this.platform);

    this.ball = new Ball(this);
    this.add(this.ball);

    this.brickWall = new BrickWall(this, 16, 4, (this.cameraHeight / 2) * 0.8);
    this.add(this.brickWall);

    // Attributes
    this.renderer = this.createRenderer(myCanvas);
    this.mouseDown = false;

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
    //this.ambientLight = new THREE.AmbientLight(0x000000, 0.35);
    //this.add(this.ambientLight);
    // add spotlight for the shadows
    //this.spotLight = new THREE.SpotLight( 0xffffff, 1);
    //this.spotLight.position.set( 60, 60, 40 );
    //this.spotLight.castShadow = true;
    // the shadow resolution
    //this.spotLight.shadow.mapSize.width=2048
    //this.spotLight.shadow.mapSize.height=2048;
    //this.add (this.spotLight);
  }

  createRenderer(myCanvas) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    renderer.setSize(minSize, minSize);
    //renderer.shadowMap.enabled = true;
    $(myCanvas).append(renderer.domElement);
    return renderer;
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
        this.platformMovement = Direction.None;
        break; // left arrow
      case 39:
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
    this.renderer.setSize(minSize, minSize);
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

    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update());

    TheScene.deltaTime = this.clock.getDelta();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render(this, this.camera);

    this.ball.update();

    this.platform.update();
  }
}

// Main function
$(function () {
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  const scene = new TheScene("#WebGL-output");
  const output = document.querySelector("canvas");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener("resize", () => scene.windowResizeHandler());
  output.addEventListener("mousemove", (event) =>
    scene.mouseMoveHandler(event)
  );
  output.addEventListener("touchstart", touchHandler, true);
  output.addEventListener("touchmove", touchHandler, true);
  output.addEventListener("touchend", touchHandler, true);
  output.addEventListener("touchcancel", touchHandler, true);
  window.addEventListener(
    "keydown",
    (event) => scene.keyDownHandler(event),
    true
  );
  window.addEventListener("keyup", (event) => scene.keyUpHandler(event), true);

  // Que no se nos olvide, la primera visualización.
  scene.update();
});

export { TheScene };
