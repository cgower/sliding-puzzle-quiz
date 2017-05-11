// ***********************************************************************************************************
// Name: JavaScript Events
// Type: Library
// Author: Cliff Gower
//************************************************************************************************************


var things = things || {};
things.Events = things.Events || {};


things.Events.MouseEvents = {
  CLICK: "click",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  MOUSE_OVER: "mouseover",
  MOUSE_OUT: "mouseout",
  MOUSE_MOVE: "mousemove"
};

things.Events.TouchEvents = {
  TOUCH_START: "touchstart",
  TOUCH_MOVE: "touchmove",
  TOUCH_END: "touchend",
  TOUCH_CANCEL: "touchcancel"
};

things.Events.PointerEvents = {
  POINTER_DOWN: "MSPointerDown",
  POINTER_UP: "MSPointerUp",
  POINTER_MOVE: "MSPointerMove"
};

things.Events.DeviceSafeTouchEvents = {
  POINTER_DOWN: '',
  POINTER_UP: '',
  POINTER_MOVE: '',
  POINTER_CLICK: 'click'
};

things.Events.DragDropEvents = {
  DRAG_ENTER: "dragenter",
  DRAG_OVER: "dragover",
  DRAG_LEAVE: "dragleave",
  DROP: "drop"
};

things.Events.FileLoadEvents = {
  LOAD: "load",
  LOAD_START: "loadstart",
  LOAD_END: "loadend",
  PROGRESS: "progress",
  ERROR: "error",
  ABORT: "abort"
};

things.Events.FileInputElementEvents = {
  CHANGE: "change"
};

things.Events.FormElementEvents = {
  FOCUS: "focus",
  BLUR: "blur",
  SUBMIT: "submit"
};

things.Events.TableEvents = {
  ROW_ENTER: "rowenter",
  ROW_EXIT: "rowexit"
};

things.Events.WindowEvents = {
  AFTER_UPDATE: 'afterupdate',
  BEFORE_UNLOAD: 'beforeunload',
  BEFORE_UPDATE: 'beforeupdate',
  DRAG_DROP: 'dragdrop',
  ERROR: 'error',
  ERROR_UPDATE: 'errorupdate',
  LOAD: 'load',
  MOVE: 'move',
  READY_STATE_CHANGE: 'readystatechange',
  RESIZE: 'resize',
  SCROLL: 'scroll',
  SELECT_START: 'selectstart',
  UNLOAD: 'unload'
};


things.Events.WebkitTransitionEvents = {
  TRANSITION_END: 'webkitTransitionEnd'
};

things.Events.MozTransitionEvents = {
  TRANSITION_END: 'mozTransitionEnd'
};

things.Events.OperaTransitionEvents = {
  TRANSITION_END: 'oTransitionEnd'
};

things.Events.TransitionEvents = {
  TRANSITION_END: 'transitionend'
};

things.Events.BrowserSafeTransitionEvents = {
  TRANSITION_END: 'transitionend'
};

things.Events.KeyEvents = {
  KEY_UP: "keyup",
  KEY_DOWN: "keydown",
  KEY_PRESS: "keypress"
};

things.Events.KeyCodes = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE_BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  INSERT: 45,
  DELETE: 46,
  OPEN_BRACKET: 91,
  CLOSE_BRACKET: 93,
  OPEN_PARENTHESES: 40,
  CLOSE_PARENTHESES: 41,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  LEFT_WIN_KEY: 91,
  RIGHT_WIN_KEY: 92,
  SELECT: 93,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_ADD: 107,
  NUMPAD_SUBTRACT: 109,
  NUMPAD_DECIMAL_POINT: 110,
  NUMPAD_DIVIDE: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  SEMI_COLON: 186,
  EQUAL_SIGN: 187,
  COMMA: 188,
  DASH: 189,
  PERIOD: 190,
  FORWARD_SLASH: 191,
  GRAVE_ACCENT: 192,
  OPEN_BRACKET: 219,
  BACK_SLASH: 220,
  CLOSE_BRACKET: 221,
  SINGLE_QUOTE: 222
};





things.Events.CreateDeviceSafeTouchEvents = function () {
  if (window.navigator.msPointerEnabled) {
    things.Events.DeviceSafeTouchEvents.POINTER_DOWN = things.Events.PointerEvents.POINTER_DOWN;
    things.Events.DeviceSafeTouchEvents.POINTER_UP = things.Events.PointerEvents.POINTER_UP;
    things.Events.DeviceSafeTouchEvents.POINTER_MOVE = things.Events.PointerEvents.POINTER_MOVE;
  }
  else {
    if ('ontouchmove' in window) {
      things.Events.DeviceSafeTouchEvents.POINTER_DOWN = things.Events.TouchEvents.TOUCH_START;
      things.Events.DeviceSafeTouchEvents.POINTER_UP = things.Events.TouchEvents.TOUCH_END;
      things.Events.DeviceSafeTouchEvents.POINTER_MOVE = things.Events.TouchEvents.TOUCH_MOVE;
    }
    else if ('onmousemove' in window) {
      things.Events.DeviceSafeTouchEvents.POINTER_DOWN = things.Events.MouseEvents.MOUSE_DOWN;
      things.Events.DeviceSafeTouchEvents.POINTER_UP = things.Events.MouseEvents.MOUSE_UP;
      things.Events.DeviceSafeTouchEvents.POINTER_MOVE = things.Events.MouseEvents.MOUSE_MOVE;
    }
  }
};

things.Events.CreateDeviceSafeTouchEvents();


things.Events.CreateBrowserSafeTransitionEvents = function () {
  if ('transition' in document.body.style) {
    things.Events.BrowserSafeTransitionEvents.TRANSITION_END = things.Events.TransitionEvents.TRANSITION_END;
  }
  else if ('WebkitTransition' in document.body.style) {
    things.Events.BrowserSafeTransitionEvents.TRANSITION_END = things.Events.WebkitTransitionEvents.TRANSITION_END;
  }
  else if ('MOZTransition' in document.body.style) {
    things.Events.BrowserSafeTransitionEvents.TRANSITION_END = things.Events.MozTransitionEvents.TRANSITION_END;
  }
  else if ('OTransition' in document.body.style) {
    things.Events.BrowserSafeTransitionEvents.TRANSITION_END = things.Events.OperaTransitionEvents.TRANSITION_END;
  }
};

//things.Events.CreateBrowserSafeTransitionEvents();
