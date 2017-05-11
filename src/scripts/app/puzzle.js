// puzzle name space
var puzzle = puzzle || {};




//-- puzzle static types
puzzle.allowDragDrop = {
  NO: false,
  YES: true
};



puzzle.animateTileSlides = {
  NO: false,
  YES: true
};



puzzle.tileCanSlide = {
  NO: false,
  YES: true
};



puzzle.tileSlideAxis = {
  NONE: 0,
  HORIZONTAL: 1,
  VERTICAL: 2
};



puzzle.tileHorizontalSlideDirection = {
  LEFT: -1,
  RIGHT: 1,
  NONE: 0
};



puzzle.tileVerticalSlideDirection = {
    UP: -1,
    DOWN: 1,
    NONE: 0
};



puzzle.gameComplete = {
  NO: false,
  YES: true
};



puzzle.gameReady = {
  NO: false,
  YES: true
};



puzzle.classNames = {
  tile: "tile",
  inactiveTile: "inactive",
  interactiveTile: "interactive",
  selectedTile: "selected",
  gameBoard: "sliding-puzzle"
};


puzzle.tileEvent = {
  POSITION_CHANGED: 0,
  TILE_CLICK: 1
};

puzzle.tileSelectionState = {
  UNSELECTED: 0,
  SELECTED: 1
};



puzzle.puzzleTypeConfig = {
  EIGHT_TILE: {
    tiles: 8,
    spaces: 9,
    columns: 3,
    rows: 3,
    sequence: [1, 2, 3, 4, 5, 6, 7, 8],
    gameboardSizingClass: "eight-tile",
    columnPositions: {
      "1": 10,
      "2": 79,
      "3": 148
    },
    rowPositions: {
      "1": 10,
      "2": 79,
      "3": 148
    }
  },
  FIFTEEN_TILE: {
    tiles: 15,
    spaces: 16,
    columns: 4,
    rows: 4,
    sequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    gameboardSizingClass: "fifteen-tile",
    columnPositions: {
      "1": 10,
      "2": 79,
      "3": 148,
      "4": 217
    },
    rowPositions: {
      "1": 10,
      "2": 79,
      "3": 148,
      "4": 217
    }
  }
};






//-- name spaced method to start a new puzzle game
puzzle.startNewGame = function (settings) {
  var game = new puzzle.game(settings);
  game.Start();

  return game;
};