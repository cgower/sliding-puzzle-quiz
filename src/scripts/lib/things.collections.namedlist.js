// ***********************************************************************************************************
// Name: Named List
// Type: Object
// Author: Cliff Gower
//************************************************************************************************************

var things = things || {};
things.Collections = things.Collections || {};




things.Collections.NamedList = function () {
  this.KeyValuePairs = new Object();
  this.KeyValuePairIterator = new Array();
};


things.Collections.NamedList.prototype.Add = function (key, value) {
  this.KeyValuePairs[key] = value;
  this.KeyValuePairIterator.push(key);
};


things.Collections.NamedList.prototype.Remove = function (key) {
  var index = this.FindItemIndex(key);
  this.RemoveItemAt(index);
};


things.Collections.NamedList.prototype.RemoveItemAt = function (index) {
  if (index > -1
  && index <= this.KeyValuePairIterator.length
  && this.KeyValuePairIterator[index] !== null
  && this.KeyValuePairIterator[index] !== undefined) {
    var key = this.KeyValuePairIterator[index];
    delete this.KeyValuePairs[key];
    this.KeyValuePairIterator.splice(index, 1);
  }
};


things.Collections.NamedList.prototype.Clear = function () {
  var listSize = this.KeyValuePairIterator.length;
  this.KeyValuePairs.splice(0, listSize);
  this.KeyValuePairIterator.splice(0, listSize);
};

things.Collections.NamedList.prototype.Item = function (key) {
  if (this.KeyValuePairs[key] !== null
  && this.KeyValuePairs[key] !== undefined) {
    return this.KeyValuePairs[key];
  }
};


things.Collections.NamedList.prototype.ItemAt = function (index) {
  if (index > -1
  && index <= this.KeyValuePairIterator.length
  && this.KeyValuePairIterator[index] !== null
  && this.KeyValuePairIterator[index] !== undefined) {
    var key = this.KeyValuePairIterator[index];
    return this.KeyValuePairs[key];
  }
};


things.Collections.NamedList.prototype.Count = function () {
  return this.KeyValuePairIterator.length;
};


things.Collections.NamedList.prototype.FindItemIndex = function (key) {
  for (var index = 0; index < this.KeyValuePairIterator.length; index++) {
    if (this.KeyValuePairIterator[index] === key) {
      return index;
    }
  }

  return -1;
};

