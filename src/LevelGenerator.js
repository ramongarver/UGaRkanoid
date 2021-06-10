import { BrickTypes } from "./BrickTypes.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareRandom(a, b) {
  return 0.5 - Math.random();
}

class LevelGenerator {
  constructor(
    rowsNumber,
    columnsNumber,
    fixedBricksNumber,
    noBricksNumber,
    maximumHardness
  ) {
    if (fixedBricksNumber > -1) {
      this.fixedBricksNumber = fixedBricksNumber;
    } else {
      this.fixedBricksNumber = randomInt(0, rowsNumber / 2 + 1);
    }

    if (noBricksNumber > -1) {
      this.noBricksNumber = noBricksNumber;
    } else {
      this.noBricksNumber = randomInt(0, (rowsNumber * columnsNumber) / 6 + 1);
    }

    this.rowsNumber = rowsNumber;
    this.columnsNumber = columnsNumber;
    this.maximumHardness = maximumHardness;
  }

  generateLevel() {
    const possibleKeys = this.generatePossibleKeys();
    const normalBricksNumber =
      this.rowsNumber * this.columnsNumber -
      this.fixedBricksNumber -
      this.noBricksNumber;

    this.level = { bricksTypes: [] };
    const brickArray = [];
    for (let i = 0; i < normalBricksNumber; i++) {
      brickArray.push(possibleKeys[randomInt(0, possibleKeys.length)]);
    }
    for (let i = 0; i < this.fixedBricksNumber; i++) {
      brickArray.push("gf");
    }
    for (let i = 0; i < this.noBricksNumber; i++) {
      brickArray.push("no");
    }

    brickArray.sort(compareRandom);

    let arrayIndex = 0;
    for (let i = 0; i < this.rowsNumber; i++) {
      const row = [];
      for (let j = 0; j < this.columnsNumber; j++) {
        row.push(brickArray[arrayIndex]);
        arrayIndex++;
      }
      this.level.bricksTypes.push(row);
    }

    return this.level;
  }

  generatePossibleKeys() {
    const possibleKeys = [];
    for (const key in BrickTypes) {
      if (BrickTypes[key].hardness <= this.maximumHardness)
        possibleKeys.push(key);
    }
    possibleKeys.splice(possibleKeys.indexOf("gf"), 1);

    return possibleKeys;
  }
}

export { LevelGenerator };
