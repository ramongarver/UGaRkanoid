import * as THREE from "../lib/three.module.js";

const loader = new THREE.TextureLoader();

const BrickColors = {
  'blue': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/01-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/01-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/01-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/01-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'green': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/02-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/02-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/02-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/02-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'purple': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/03-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/03-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/03-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/03-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'red': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/04-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/04-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/04-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/04-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'orange': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/05-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/05-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/05-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/05-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'skyblue': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/06-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/06-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/06-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/06-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'yellow': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/07-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/07-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/07-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/07-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'darkgreen': {
    points: 10,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/08-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/08-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/08-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/08-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'gray': {
    points: 0,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/09-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/09-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/09-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/09-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },

  'brown': {
    points: 0,
    material: [
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/10-Breakout-Tiles_0.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/10-Breakout-Tiles_1.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/10-Breakout-Tiles_2.png"
        ),
      }),
      new THREE.MeshLambertMaterial({
        map: loader.load(
          "../assets/BreakoutTileSetFree/PNG/10-Breakout-Tiles_3.png"
        ),
      }),
    ]
  },
};

Object.freeze(BrickColors);

const BrickTypes = {
  'b1': {color: BrickColors['blue'], hardness: 1},
  'b2': {color: BrickColors['blue'], hardness: 2},
  'b3': {color: BrickColors['blue'], hardness: 3},
  'b4': {color: BrickColors['blue'], hardness: 4},

  'g1': {color: BrickColors['green'], hardness: 1},
  'g2': {color: BrickColors['green'], hardness: 2},
  'g3': {color: BrickColors['green'], hardness: 3},
  'g4': {color: BrickColors['green'], hardness: 4},

  'p1': {color: BrickColors['purple'], hardness: 1},
  'p2': {color: BrickColors['purple'], hardness: 2},
  'p3': {color: BrickColors['purple'], hardness: 3},
  'p4': {color: BrickColors['purple'], hardness: 4},

  'r1': {color: BrickColors['red'], hardness: 1},
  'r2': {color: BrickColors['red'], hardness: 2},
  'r3': {color: BrickColors['red'], hardness: 3},
  'r4': {color: BrickColors['red'], hardness: 4},

  'o1': {color: BrickColors['orange'], hardness: 1},
  'o2': {color: BrickColors['orange'], hardness: 2},
  'o3': {color: BrickColors['orange'], hardness: 3},
  'o4': {color: BrickColors['orange'], hardness: 4},

  's1': {color: BrickColors['skyblue'], hardness: 1},
  's2': {color: BrickColors['skyblue'], hardness: 2},
  's3': {color: BrickColors['skyblue'], hardness: 3},
  's4': {color: BrickColors['skyblue'], hardness: 4},

  'y1': {color: BrickColors['yellow'], hardness: 1},
  'y2': {color: BrickColors['yellow'], hardness: 2},
  'y3': {color: BrickColors['yellow'], hardness: 3},
  'y4': {color: BrickColors['yellow'], hardness: 4},

  'd1': {color: BrickColors['darkgreen'], hardness: 1},
  'd2': {color: BrickColors['darkgreen'], hardness: 2},
  'd3': {color: BrickColors['darkgreen'], hardness: 3},
  'd4': {color: BrickColors['darkgreen'], hardness: 4},

  'l1': {color: BrickColors['brown'], hardness: 1},
  'l2': {color: BrickColors['brown'], hardness: 2},
  'l3': {color: BrickColors['brown'], hardness: 3},
  'l4': {color: BrickColors['brown'], hardness: 4},

  'gf': {color: BrickColors['gray'], hardness: -1},
};

Object.freeze(BrickTypes);

export { BrickTypes, BrickColors };
