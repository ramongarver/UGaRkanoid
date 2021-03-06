import * as THREE from "../lib/three.module.js";
import { Levels } from "./Levels.js";
import { TheScene } from "./TheScene.js";
import { Extra } from "./Extra.js";
import { touchHandler } from "./touch.handler.js";

class Game {
  constructor(myCanvas) {
    this.startTime = THREE.Clock.start;
    this.canvas = myCanvas;
    this.lifesDiv = document.getElementById("lifes");
    this.pointsDiv = document.getElementById("points");

    this.initAttributes();

    this.renderer = this.createRenderer(myCanvas);

    this.createLifes();
    this.createPoints();
    this.createStartMenu();
    this.displayLevel();

    this.ellapsedTime = { BULLET: 0, LIFE: 0 };
  }

  initAttributes() {
    this.state = Game.MENU;
    this.level = 9;
    this.lifes = 3;
    this.points = 0;
    this.scene = new TheScene(this.canvas, this);
  }

  createLifeImg() {
    const lifeImg = document.createElement("img");
    lifeImg.src = "./assets/BreakoutTileSetFree/PNG/60-Breakout-Tiles.png";
    return lifeImg;
  }

  createLifes() {
    this.lifesDiv.innerText = "";
    for (let i = 0; i < this.lifes; i++) {
      this.lifesDiv.appendChild(this.createLifeImg());
    }
  }

  addLife() {
    this.lifes++;
    this.lifesDiv.appendChild(this.createLifeImg());
  }

  subtractLife() {
    this.lifes--;
    this.lifesDiv.removeChild(this.lifesDiv.lastChild);
    if (this.lifes === 0) {
      this.gameOver();
      return;
    }
    this.startAgain();
  }

  createPoints() {
    this.pointsDiv.innerText = this.points.toString();
  }

  addPoints(points) {
    this.points += points;
    this.pointsDiv.innerHTML = this.points;
  }

  selectLevel(selectedLevelButton) {
    this.level = +selectedLevelButton.id.slice("level-button-".length);
    this.scene = new TheScene(this.canvas, this);
    selectedLevelButton.classList.add("level-button-selected");
    const levelsDiv = document.getElementById("levels");
    for (const levelButton of levelsDiv.children) {
      if (levelButton.id !== `level-button-${this.level}`)
        levelButton.classList.remove("level-button-selected");
      else levelButton.classList.add("level-button-selected");
    }
    this.displayLevel();
  }

  createStartMenu() {
    const levelsDiv = document.getElementById("levels");
    levelsDiv.innerText = "";
    for (let i = 0; i < Levels.length; i++) {
      const levelButton = document.createElement("button");
      levelButton.innerHTML = i;
      levelButton.className =
        i == this.level ? "level-button level-button-selected" : "level-button";
      levelButton.id = `level-button-${i}`;
      levelButton.onclick = () => this.selectLevel(levelButton);
      levelsDiv.appendChild(levelButton);
    }

    const levelButton = document.createElement("button");
    levelButton.innerHTML = "Aleatorio";
    levelButton.className = "long-button";
    levelButton.id = `level-button-99`;
    levelButton.onclick = () => this.selectLevel(levelButton);
    levelsDiv.appendChild(levelButton);

    const startButton = document.getElementById("start-button");
    startButton.onclick = () => this.startButtonClickHandler();
    const startMenu = document.getElementById("modal-start");
    startMenu.classList.remove("hidden");
  }

  startButtonClickHandler() {
    const modalStart = document.getElementById("modal-start");
    modalStart.classList.toggle("hidden");
    this.state = Game.INIT;
  }

  startAgain() {
    this.state = Game.STOPPED;
    this.scene.restart();
  }

  checkVictory() {
    if (this.scene.brickWall.getBricksLeft() === 0) {
      this.scene.remove(this.scene.ball);
      this.startNextLevel();
    }
  }

  startNextLevel() {
    if (this.level + 1 === Levels.length) {
      this.finishGameVictory();
      return;
    }
    this.level++;
    this.scene = new TheScene(this.canvas, this);
    this.state = Game.INIT;
    this.ellapsedTime = { BULLET: 0, LIFE: 0 };
    this.displayLevel();
  }

  finishGameVictory() {
    this.state = Game.GAME_OVER;
    document.getElementById("modal-game-victory").classList.remove("hidden");
    document.getElementById("total-points-game-victory").innerHTML =
      this.points;
  }

  gameOver() {
    this.state = Game.GAME_OVER;
    document.getElementById("modal-game-over").classList.toggle("hidden");
    document.getElementById("total-points-game-over").innerHTML = this.points;
  }

  checkAddExtra() {
    if (this.state == Game.PLAYING) {
      if (this.ellapsedTime["BULLET"] > 1) {
        this.scene.createExtra("BULLET");
        this.ellapsedTime["BULLET"] = 0;
      }
      if (this.ellapsedTime["LIFE"] > 8) {
        this.scene.createExtra("LIFE");
        this.ellapsedTime["LIFE"] = 0;
      }
    }
  }

  update() {
    // Literalmente le decimos al navegador: "La pr??xima vez que haya que refrescar la pantalla, llama al m??todo que te indico".
    // Si no existiera esta l??nea,  update()  se ejecutar??a solo la primera vez.
    requestAnimationFrame(() => this.update());

    this.checkAddExtra();
    this.scene.update();
    for (const key in this.ellapsedTime)
      this.ellapsedTime[key] += TheScene.deltaTime;
  }

  createRenderer(myCanvas) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    renderer.setSize(minSize, minSize);
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
      default:
    }
  }

  displayLevel() {
    const level = this.level == 99 ? "????" : this.level.toString();
    document.getElementById("level-display").innerText = `Nivel ${level}`;
  }

  restart() {
    this.initAttributes();

    this.createStartMenu();
    this.createLifes();
    this.createPoints();
    this.displayLevel();

    const startMenu = document.getElementById("modal-start");
    startMenu.classList.remove("hidden");
  }

  addExtraLife() {
    this.lifes++;
    this.createLifes();
  }

  removeExtraLife() {
    this.lifes--;
    this.lifesDiv.removeChild(this.lifesDiv.lastChild);
    if (this.lifes === 0) {
      this.gameOver();
      return;
    }
  }

  manageExtraCollision(extraType) {
    switch (extraType) {
      case Extra.types["LIFE"]:
        this.addExtraLife();
        break;
      case Extra.types["BULLET"]:
        this.removeExtraLife();
        break;
    }
  }
}

Game.MENU = "MENU";
Game.INIT = "INIT";
Game.PLAYING = "PLAYING";
Game.STOPPED = "STOPPED";
Game.GAME_OVER = "GAME_OVER";

// Main function
$(function () {
  const paintArea = document.querySelector("#WebGL-output");
  let game = new Game(paintArea);
  const output = document.querySelector("canvas");
  // Se a??aden los listener de la aplicaci??n. En este caso, el que va a comprobar cu??ndo se modifica el tama??o de la ventana de la aplicaci??n.
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

  const restartButtons = document.querySelectorAll(".restart-button");
  restartButtons.forEach((button) => {
    button.onclick = () => {
      game.restart();
      button.parentNode.parentNode.classList.add("hidden");
    };
  });
  document.getElementById("restart-button").onclick = () => game.restart();

  // Que no se nos olvide, la primera visualizaci??n.
  game.update();
});

export { Game };
