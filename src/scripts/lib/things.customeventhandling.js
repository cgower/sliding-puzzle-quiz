// ***********************************************************************************************************
// Name: Custom Event Handling Base Class
// Type: Base Class
// Author: Cliff Gower
//************************************************************************************************************

//dependencies
//things.Collections.NamedList.js

var things = things || {};

things.CustomEventHandlingBase = function () {
  this.Events = null;
};

things.CustomEventHandlingBase.prototype.InitCustomEventHandlingBase = function () {
  this.Events = new things.Collections.NamedList();
};

things.CustomEventHandlingBase.prototype.AddEvent = function (event) {
  var eventHandlerList = new things.Collections.NamedList();
  this.Events.Add(event, eventHandlerList);
};

things.CustomEventHandlingBase.prototype.RemoveEvent = function (event) {
  this.Events.Remove(event);
};

things.CustomEventHandlingBase.prototype.RegisterEventHandler = function (eventHandler) {
  if (this.Events.Item(eventHandler.Event) === null || this.Events.Item(eventHandler.Event) === undefined) {
    this.AddEvent(eventHandler.Event);
  }

  this.Events.Item(eventHandler.Event).Add(eventHandler.Name, eventHandler);
};

things.CustomEventHandlingBase.prototype.UnregisterEventHandler = function (eventHandlerName, event) {
  this.Events.Item(event).Remove(eventHandlerName);
};

things.CustomEventHandlingBase.prototype.FireEvent = function (event, eventArgs) {
  var eventToFire = this.Events.Item(event);
  for (var index = 0; index < eventToFire.Count() ; index++) {
    eventToFire.ItemAt(index).Delegate(eventArgs);
  }
};


things.CustomEventHandler = function (name, event, delegate) {
  this.Name = null;
  this.Event = null;
  this.Delegate = null;

  if (name !== null && name !== undefined) {
    this.Name = name;
  }

  if (event !== null && event !== undefined) {
    this.Event = event;
  }

  if (delegate !== null && delegate !== undefined) {
    this.Delegate = delegate;
  }
};


