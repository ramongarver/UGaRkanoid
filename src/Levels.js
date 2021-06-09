const Levels = {
  0: {
    maximumHardness: 1,
    bricksTypes: [["d1"]],
    // bricksHardness: [
    //   ['d1', 'd1', 'd1', 'd1', 'd1', 'd1'],
    //   ['d1', 'd1', 'd1', 'd1',],
    //   ['d1', 'd1', 'd1', 'd1', 'd1', 'd1']
    // ]
    // bricksHardness: [
    //   ['d1', 'd1', 'd1', 'd1', 'd1', 'd1'],
    //   ['d1', 'd1', 'd1', 'd1',],
    //   ['d1', 'd1', 'd1', 'd1', 'd1', 'd1']
    // ]
  },

  1: {
    maximumHardness: 1,
    bricksTypes: [
      ["d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "d1", "d1", "d1", "d1", "d1"],
    ],
  },

  2: {
    maximumHardness: 2,
    bricksTypes: [
      ["d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "r2", "d1", "d1", "r2", "d1"],
      ["r2", "d1", "r2", "r2", "d1", "r2"],
    ],
  },

  3: {
    maximumHardness: 2,
    bricksTypes: [
      ["r2", "r2", "r2", "r2", "r2", "r2"],
      ["r2", "r2", "gf", "gf", "r2", "r2"],
      ["r2", "r2", "r2", "r2", "r2", "r2"],
    ],
  },

  4: {
    maximumHardness: 3,
    bricksTypes: [
      ["r2", "no", "d1", "d1", "no", "r2"],
      ["d1", "r2", "s3", "s3", "r2", "d1"],
      ["s3", "r2", "d1", "d1", "r2", "s3"],
    ],
  },

  5: {
    maximumHardness: 3,
    bricksTypes: [
      ["no", "no", "s3", "no", "no", "no", "no", "no", "s3", "no", "no"],
      ["no", "no", "s3", "no", "no", "no", "no", "no", "s3", "no", "no"],
      ["no", "no", "no", "s3", "no", "no", "no", "s3", "no", "no", "no"],
      ["no", "no", "no", "s3", "no", "no", "no", "s3", "no", "no", "no"],
      ["no", "no", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "no", "no"],
      ["no", "no", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "no", "no"],
      ["no", "d1", "d1", "r2", "d1", "d1", "d1", "r2", "d1", "d1", "no"],
      ["no", "d1", "d1", "r2", "d1", "d1", "d1", "r2", "d1", "d1", "no"],
      ["d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "d1"],
      ["d1", "no", "d1", "d1", "d1", "d1", "d1", "d1", "d1", "no", "d1"],
      ["d1", "no", "d1", "no", "no", "no", "no", "no", "d1", "no", "d1"],
      ["d1", "no", "d1", "no", "no", "no", "no", "no", "d1", "no", "d1"],
      ["no", "no", "no", "d1", "d1", "no", "d1", "d1", "no", "no", "no"],
      ["no", "no", "no", "d1", "d1", "no", "d1", "d1", "no", "no", "no"],
    ],
  },
};

Object.freeze(Levels);

export { Levels };
