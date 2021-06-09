import * as THREE from "../lib/three.module.js";
import { Levels } from "./Levels.js";
import { TheScene } from "./TheScene.js";
import { touchHandler } from "./touch.handler.js";

class Game {
  constructor(myCanvas) {
    this.level = 3;
    this.lifes = 3;
    this.points = 0;
    this.startTime = THREE.Clock.start;
    this.canvas = myCanvas;

    this.scene = new TheScene(this.canvas, this);

    this.renderer = this.createRenderer(myCanvas);
  }

  subtractLife() {
    this.lifes--;
    if (this.lifes === 0) {
      this.gameOver();
    }
  }

  checkVictory() {
    if (this.scene.brickWall.getBricksLeft() === 0) {
      this.scene.remove(this.scene.ball);
      window.setTimeout(() => this.startNextLevel(), 2000);
    }
  }

  startNextLevel() {
    if (this.level + 1 === Levels.length) {
      this.finishGameVictory();
      return;
    }
    this.level++;
    this.scene = new TheScene(this.canvas, this);
  }

  finishGameVictory() {
      
  }

  gameOver() {

  }

  update() {
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update());

    this.scene.update();
  }

  createRenderer(myCanvas) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    renderer.setSize(minSize, minSize);
    //renderer.shadowMap.enabled = true;
    myCanvas.append(renderer.domElement);
    return renderer;
  }
}

// Main function
$(function () {
  const paintArea = document.querySelector("#WebGL-output");
  const game = new Game(paintArea);
  const output = document.querySelector("canvas");
  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener("resize", () => game.scene.windowResizeHandler());
  output.addEventListener("mousemove", (event) =>
    game.scene.mouseMoveHandler(event)
  );
  output.addEventListener("touchstart", touchHandler, true);
  output.addEventListener("touchmove", touchHandler, true);
  output.addEventListener("touchend", touchHandler, true);
  output.addEventListener("touchcancel", touchHandler, true);
  window.addEventListener(
    "keydown",
    (event) => game.scene.keyDownHandler(event),
    true
  );
  window.addEventListener(
    "keyup",
    (event) => game.scene.keyUpHandler(event),
    true
  );

  // Que no se nos olvide, la primera visualización.
  game.update();
});

export { Game };
