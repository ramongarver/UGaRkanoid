import * as THREE from "../lib/three.module.js";
import { Levels } from "./Levels.js";
import { TheScene } from "./TheScene.js";
import { touchHandler } from "./touch.handler.js";

class Game {
  constructor(myCanvas) {
    this.state = Game.INIT;
    this.level = 2;
    this.lifes = 3;
    this.points = 0;
    this.startTime = THREE.Clock.start;
    this.canvas = myCanvas;
    this.lifesDiv = document.getElementById("lifes");
    this.pointsDiv = document.getElementById("points");

    this.scene = new TheScene(this.canvas, this);

    this.renderer = this.createRenderer(myCanvas);

    this.createLifes();
    this.createPoints();
  }

  createLifeImg() {
    const lifeImg = document.createElement("img");
    lifeImg.src = "./assets/BreakoutTileSetFree/PNG/60-Breakout-Tiles.png";
    return lifeImg;
  }

  createLifes() {
    for (let i = 0; i < this.lifes; i++) {
      this.lifesDiv.appendChild(this.createLifeImg());
    }
  }

  addLife() {
    this.lifes++;
    this.lifesDiv.appendChild(this.createLifeImg());
  }

  async subtractLife() {
    this.lifes--;
    this.lifesDiv.removeChild(this.lifesDiv.lastChild);
    if (this.lifes === 0) {
      this.gameOver();
      return;
    }
    this.startAgain();
  }

  createPoints() {
    const pointsText = document.createTextNode(this.points);
    this.pointsDiv.appendChild(pointsText);
  }

  addPoints(points) {
    this.points += points;
    this.pointsDiv.innerHTML = this.points;
  }

  async startAgain() {
    this.state = Game.STOPPED;
    this.scene.restart();
  }

  async checkVictory() {
    if (this.scene.brickWall.getBricksLeft() === 0) {
      this.scene.remove(this.scene.ball);
      await new Promise((r) => setTimeout(() => this.startNextLevel(), 2000));
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

  finishGameVictory() {}

  async gameOver() {
    await new Promise((r) => setTimeout(() => this.startNextLevel(), 2000));
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

  mouseUpHandler() {
    switch (this.state) {
      case Game.INIT:
        this.state = Game.PLAYING;
        break;
      case Game.STOPPED:
        this.scene.restart();
        this.state = Game.PLAYING;
        break;
    }
  }
}

Game.PLAYING = "PLAYING";
Game.STOPPED = "STOPPED";
Game.INIT = "INIT";

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
  output.addEventListener("mouseup", () => game.mouseUpHandler());
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
