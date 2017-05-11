var things = things || {};



//*********************** Event Handler Creation ***************************
things.addHandler = function (object, eventName, handler) {
  if (object.addEventListener) { object.addEventListener(eventName, handler, false); }
  else { object.attachEvent("on" + eventName, handler); }
};



things.removeHandler = function (object, eventName, handler) {
  if (object.removeEventListener) { object.removeEventListener(eventName, handler, false); }
  else { object.detachEvent("on" + eventName, handler); }
};



things.addWheelHandler = function (handler) {
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', handler, false);
    document.addEventListener('mousewheel', handler, false);
  }
  else {
    document.attachEvent("onmousewheel", handler);
  }
};



things.removeWheelHandler = function (handler) {
  if (document.removeEventListener) {
    document.removeEventListener('DOMMouseScroll', handler, false);
    document.removeEventListener('mousewheel', handler, false);
  }
  else {
    document.detachEvent("onmousewheel", handler);
  }
};



//*********************** Event Delegate Creation ***************************
things.createDelegate = function (object, method) {
  return (function () { return method.apply(object, arguments); });
};

