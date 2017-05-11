//-- global method to start an eight tile puzzle game
function startEightTilePuzzle() {
  return puzzle.startNewGame({
    typeConfig: puzzle.puzzleTypeConfig.EIGHT_TILE,
    animate: puzzle.animateTileSlides.YES,
    dragEnabled: puzzle.allowDragDrop.YES
  });
}



//-- global method to start a fifteen tile puzzle game
function startFifteenTilePuzzle() {
  return puzzle.startNewGame({
    typeConfig: puzzle.puzzleTypeConfig.FIFTEEN_TILE,
    animate: puzzle.animateTileSlides.YES,
    dragEnabled: puzzle.allowDragDrop.YES
  });
}


