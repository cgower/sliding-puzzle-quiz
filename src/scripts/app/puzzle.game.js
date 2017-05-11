var puzzle = puzzle || {};





/*
 * puzzle.game.settings = {
 *  typeConfig: puzzle.puzzleTypeConfig,
 *  animate: puzzle.animateTileSlides,
 *  dragEnabled: puzzle.allowDragDrop
 * }
 */


puzzle.game = function (settings) {
  this.settings = settings;
  this.isReady = puzzle.gameReady.NO;
  this.isComplete = puzzle.gameComplete.NO;
  this.gameboardElement = document.getElementsByClassName('sliding-puzzle')[0];
  this.tiles = null;
  this.blank = null;
  this.selectedTile = null;

  this.gameboardClickDelegate = things.createDelegate(this, this.gameboardClickHandler);
};



puzzle.game.prototype.Start = function () {
  this.GenerateTiles();
  this.ShuffleTiles();

  things.addHandler(
    this.gameboardElement,
    things.Events.DeviceSafeTouchEvents.POINTER_CLICK,
    this.gameboardClickDelegate);
};



/*
 * method to instantiate the collection of tiles
 * tiles are created using the default sequence
 */
puzzle.game.prototype.GenerateTiles = function () {
  var spaces = this.settings.typeConfig.spaces;
  this.tiles = [];

  this.tiles[spaces] = null;

  this.blank = {
    positionLinear: spaces,
    position2d: this.GetTilePlace2d(spaces)
  };

  for (var index = 1; index < spaces; index++) {
    this.tiles[index] = new puzzle.tile( );
    this.tiles[index].initTile({
        element: index,
        placeLinear: index
      });

    // provide method delegation for tile where operations are dependent on game settings/configuration
    this.tiles[index].GetPlace2dFromGame = things.createDelegate(this, this.GetTilePlace2d);
    this.tiles[index].GetPlaceLinearFromGame = things.createDelegate(this, this.GetTilePlaceLinear);
    this.tiles[index].GetPositionFromGame = things.createDelegate(this, this.GetTilePosition);
    this.tiles[index].GetInteractionStateFromGame = things.createDelegate(this, this.GetTileInteractionState);

    this.tiles[index].RegisterEventHandler(
      new things.CustomEventHandler(
        'tile' + this.tiles[index].element + 'PosChangeHandler',
        puzzle.tileEvent.POSITION_CHANGED,
        things.createDelegate(this, this.tilePosChangeHandler)
      ));

    this.tiles[index].RegisterEventHandler(
      new things.CustomEventHandler(
        'tile' + this.tiles[index].element + 'ClickHandler',
        puzzle.tileEvent.TILE_CLICK,
        things.createDelegate(this, this.tileClickHandler)
      ));

    this.tiles[index].Get2dPlace();
  }
};






/* method to shuffle to randomly shuffle the tiles
 * by iterating through the collection and swapping the current tile
 * with one whose index/position is randomly chosen
 */
puzzle.game.prototype.ShuffleTiles = function () {
  for (var index = 1; index <= this.settings.typeConfig.spaces; index++) {
    var swapNum = Math.floor((Math.random()
      * this.settings.typeConfig.tiles) + 1);

    this.SwapTiles(index, swapNum);
  }

  this.ResetTileInteractionStates();

  this.isReady = puzzle.gameReady.YES;
};



/*
 * method to swap tiles in the collection at the two specified indexes
 */
puzzle.game.prototype.SwapTiles = function (tileIndex1, tileIndex2) {
  if (tileIndex2 !== tileIndex1) {
    var tmp = this.tiles[tileIndex1];

    this.UpdateTileSequencePosition(this.tiles[tileIndex2], tileIndex1);
    this.UpdateTileSequencePosition(tmp, tileIndex2);
  }
};



/*
 * method to move a tile to a specified new position in the collection
 */
puzzle.game.prototype.UpdateTileSequencePosition = function (tile, newSequencePosition) {
  this.tiles[newSequencePosition] = tile;

  if (things.typeValidation.isNotNullOrUndefined(this.tiles[newSequencePosition])) {
    this.tiles[newSequencePosition].ChangeLinearPlace(newSequencePosition);
  }
  else {
    this.blank.positionLinear = newSequencePosition;
    this.blank.position2d = this.GetTilePlace2d(newSequencePosition);
  }
};



/* method evaluates whether or not puzzle has been solved
 * by comparing tile place/position in collection/sequence to tile element value for each tile.
 * puzzle is solved when tile place and tile element are equal for all tiles */
puzzle.game.prototype.GameIsComplete = function () {
  for (var index = 0; index < this.settings.typeConfig.spaces; index++) {
    var tile = this.tiles[index];
    if (things.typeValidation.isNotNullOrUndefined(tile)) {
      if (!tile.IsInCorrectPlace()) { return puzzle.gameComplete.NO; }
    }
  }

  return puzzle.gameComplete.YES;
};



/* method provides tile row and column position in grid specific to the game type
 * based on position in the collection/sequence*/
puzzle.game.prototype.GetTilePlace2d = function (placeLinear) {
  var cols = this.settings.typeConfig.columns;
  var row = Math.floor(placeLinear / 3.5) + 1;

  var place2d = {
    row: row,
    column: cols - (row * cols - placeLinear)
  };

  return place2d;
};



/* method provides new linear position in the collection/sequence
 * based on column and row position in grid specific to the game type*/
puzzle.game.prototype.GetTilePlaceLinear = function (place2d) {
  var placeLinear
    = place2d.row * place2d.column - (this.settings.typeConfig.columns - place2d.column);

  return placeLinear;
};



/* method provides physical position (x,y) or (left, top) in game type specific grid
 * based on column and row position*/
puzzle.game.prototype.GetTilePosition = function (place2d) {
  var tilePosition = {
    top: this.settings.typeConfig.rowPositions[place2d.row] + 'px',
    left: this.settings.typeConfig.columnPositions[place2d.column] + 'px'
  };

  return tilePosition;
};



/* method provides physical position (x,y) or (left, top) in game type specific grid
 * based on column and row position*/
puzzle.game.prototype.ResetTileInteractionStates = function () {
  for (var index = 1; index <= this.settings.typeConfig.spaces; index++) {
    var tile = this.tiles[index];
    if (things.typeValidation.isNotNullOrUndefined(tile)) {
      tile.GetInteractionState();
    }
  }
};



/* method provides interaction state properties for tile based on proximity to blank*/
puzzle.game.prototype.GetTileInteractionState = function (place2d) {
  var interactionState = {
    slideState: this.GetTileSlideState(place2d),
    className: puzzle.classNames.inactiveTile
  };

  interactionState.className = interactionState.slideState.canSlide
    ? puzzle.classNames.interactiveTile : puzzle.classNames.inactiveTile;

  return interactionState;
};



/* method determines if tile can slide based on proximity to blank*/
puzzle.game.prototype.GetTileSlideState = function (place2d) {
  var slideState = {
    axis:  this.GetTileSlideAxis(place2d),
    direction: this.GetTileSlideDirection(place2d),
    canSlide: puzzle.tileCanSlide.NO
  };

  slideState.canSlide = (slideState.axis !== puzzle.tileSlideAxis.NONE && slideState.direction !== puzzle.tileVerticalSlideDirection.NONE)
      ? puzzle.tileCanSlide.YES : puzzle.tileCanSlide.NO;

  return slideState;
};



/* method determines on what axis a tile can slide based on proximity to blank*/
puzzle.game.prototype.GetTileSlideAxis = function (place2d) {
  //if (place2d.column === this.blank.position2d.column && place2d.row === this.blank.position2d.row) { return puzzle.tileSlideAxis.NONE }

  if (place2d.column === this.blank.position2d.column) { return puzzle.tileSlideAxis.VERTICAL; }
  else if (place2d.row === this.blank.position2d.row) { return puzzle.tileSlideAxis.HORIZONTAL; }
  else { return puzzle.tileSlideAxis.NONE; }
};



/* method determines the direction a tile can slide based on proximity to blank*/
puzzle.game.prototype.GetTileSlideDirection = function (place2d) {
  if (place2d.column === this.blank.position2d.column) {
    var rowOffset = this.blank.position2d.row - place2d.row;

    if (rowOffset === puzzle.tileVerticalSlideDirection.UP) { return puzzle.tileVerticalSlideDirection.UP; }
    else if (rowOffset === puzzle.tileVerticalSlideDirection.DOWN) { return puzzle.tileVerticalSlideDirection.DOWN; }
    else { return puzzle.tileVerticalSlideDirection.NONE; }
  }
  else if (place2d.row === this.blank.position2d.row) {
    var colOffset = this.blank.position2d.column - place2d.column;

    if (colOffset === puzzle.tileHorizontalSlideDirection.LEFT) { return puzzle.tileHorizontalSlideDirection.LEFT; }
    else if (colOffset === puzzle.tileHorizontalSlideDirection.RIGHT) { return puzzle.tileHorizontalSlideDirection.RIGHT; }
    else { return puzzle.tileVerticalSlideDirection.NONE; }
  }
};



/*
* event handler method for tile position change events
*/
puzzle.game.prototype.tilePosChangeHandler = function () {
  this.ResetTileInteractionStates();

  if (this.isReady) {
    if (this.GameIsComplete()) {
      alert('Congratulations!');
    }
    else {
      console.log('puzzle not solved');
    }
  }
};


/*
* event handler method for tile position change events
*/
puzzle.game.prototype.tileClickHandler = function (selectedTileIndex) {
  this.selectedTile = selectedTileIndex;

  for (var index = 1; index <= this.settings.typeConfig.spaces; index++) {
    var tile = this.tiles[index];
    if (things.typeValidation.isNotNullOrUndefined(tile)) {
      tile.ToggleSelectionState(selectedTileIndex);
    }
  }
};



/*
* event handler method for game board click events
*/
puzzle.game.prototype.gameboardClickHandler = function () {
  if (things.typeValidation.isNotNullOrUndefined(this.selectedTile)) {
    var tile = this.tiles[this.selectedTile];
    if (tile.selectionState === puzzle.tileSelectionState.SELECTED) {
      this.SwapTiles(this.selectedTile, this.blank.positionLinear);
    }
  }
};