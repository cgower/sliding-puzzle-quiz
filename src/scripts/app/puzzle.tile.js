var puzzle = puzzle || {};


/*
 * puzzle.tile.properties = {
 *   element: int,
 *   placeLinear: int ,
 *   className: string
 * }
 */


puzzle.tile = function () {
  this.properties = null;
  this.htmlElement = null;
  this.interactionState = null;
  this.selectionState = null;

  this.GetPlace2dFromGame = null;
  this.GetPlaceLinearFromGame = null;
  this.GetPositionFromGame = null;
  this.GetInteractionStateFromGame = null;

  this.TileClickDelegate = things.createDelegate(this, this.tileClickHandler)
};


puzzle.tile.prototype = new things.CustomEventHandlingBase();



puzzle.tile.prototype.initTile = function (properties) {
  this.properties = properties;
  this.selectionState = puzzle.tileSelectionState.UNSELECTED;
  this.htmlElement = document.getElementsByClassName(puzzle.classNames.tile)[this.properties.element - 1];


  this.InitCustomEventHandlingBase();
  this.AddEvent(puzzle.tileEvent.POSITION_CHANGED);
  this.AddEvent(puzzle.tileEvent.TILE_CLICK);

  things.addHandler(
    this.htmlElement,
    things.Events.DeviceSafeTouchEvents.POINTER_CLICK,
    this.TileClickDelegate);
};



puzzle.tile.prototype.positionTile = function () {
  if (this.properties.place2d !== null & this.properties.place2d !== undefined) {
    if (things.typeValidation.isNotNullOrUndefined(this.GetPositionFromGame)) {
      var position = this.GetPositionFromGame(this.properties.place2d);

      this.htmlElement.style.top = position.top;
      this.htmlElement.style.left = position.left;
    }
  }
};



puzzle.tile.prototype.styleTile = function () {
  if (things.typeValidation.isNotNullOrUndefined(this.interactionState)) {
    things.changeClassName(this.htmlElement, puzzle.classNames.tile + " " + this.interactionState.className);
  }
};



puzzle.tile.prototype.ChangeLinearPlace = function (placeLinear) {
  this.properties.placeLinear = placeLinear;
  this.Get2dPlace();
};



puzzle.tile.prototype.GetLinearPlace = function () {
  if (things.typeValidation.isNotNullOrUndefined(this.GetPlaceLinearFromGame)) {
    this.properties.placeLinear = this.GetPlaceLinearFromGame(this.properties.place2d);
  }
};



puzzle.tile.prototype.Change2dPlace = function (place2d) {
  this.properties.place2d = place2d;
  this.GetLinearPlace();
  this.GetInteractionState();
  this.positionTile();
};



puzzle.tile.prototype.Get2dPlace = function () {
  if (things.typeValidation.isNotNullOrUndefined(this.GetPlace2dFromGame)) {
    this.properties.place2d = this.GetPlace2dFromGame(this.properties.placeLinear);
    this.GetInteractionState();
    this.positionTile();

    this.FireEvent(puzzle.tileEvent.POSITION_CHANGED);
  }
};



puzzle.tile.prototype.GetInteractionState = function () {
  if (things.typeValidation.isNotNullOrUndefined(this.GetInteractionStateFromGame)) {
    this.interactionState = this.GetInteractionStateFromGame(this.properties.place2d);
    this.styleTile();
  }
};



puzzle.tile.prototype.IsInCorrectPlace = function () {
  return this.properties.element === this.properties.placeLinear;
};



puzzle.tile.prototype.ToggleSelectionState = function (selectedTileIndex) {
  if (this.selectionState) {
    this.selectionState = puzzle.tileSelectionState.UNSELECTED;
    things.changeClassName(this.htmlElement, puzzle.classNames.tile + " " + this.interactionState.className);
  }
  else {
    if (this.interactionState.slideState.canSlide === puzzle.tileCanSlide.YES  && this.properties.placeLinear === selectedTileIndex) {
      this.selectionState = puzzle.tileSelectionState.SELECTED;
      things.changeClassName(this.htmlElement, puzzle.classNames.tile + " " + puzzle.classNames.selectedTile);
    }
  }
};

puzzle.tile.prototype.tileClickHandler = function (e) {
  e = e || window.event;
  e.cancelBubble = true;

  if (e.stopPropagation) {
    e.stopPropagation();
  }

  this.FireEvent(puzzle.tileEvent.TILE_CLICK, this.properties.placeLinear);
};


