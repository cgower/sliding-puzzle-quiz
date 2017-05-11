// ---------------------------------------------------------------------------------------------------
// ---------------------------------------- Type Validation ------------------------------------------
// ---------------------------------------------------------------------------------------------------

var things = things || {};
things.typeValidation = things.typeValidation || {};

things.typeValidation.isNotNullOrUndefined = function (value) {
  if (value !== null && value !== undefined) { return true; }
  else { return false; }
};

things.typeValidation.elementExists = function (elementName) {
  try {
    var element = document.getElementById(elementName);

    if (this.isNotNullOrUndefined(element)) { return true; }
    else { return false; }

  } catch (ex) {
    return false;
  }
};