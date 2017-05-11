var things = things || {};

things.getElement = function (identifier) {
    var element = null;

    if (document.getElementById(identifier) !== null) { element = document.getElementById(identifier); }
    else { element = document.getElementsByName(identifier); }

    return things.attachMethods(element);
};

things.getElementsByTag = function (tag) {
    var elements = document.getElementsByTagName(tag);

    for (var index = 0; index < elements.length; index++) {
        elements[index] = things.attachMethods(elements[index]);
    }

    return elements;
};

things.getElementsByClass = function (className) {
    var pageElements = document.getElementsByTagName('*');

    var elements = new Array();
    for (var index = 0; index < pageElements.length; index++) {
        var pageElement = pageElements[index];
        if (things.elementInheritsCssClass(pageElement, className)) {
            elements.push(things.attachMethods(pageElement));
        }
    }

    return elements;
};

things.createElement = function (type) {
    var element = document.createElement(type);
    return things.attachMethods(element);
};

things.elementInheritsCssClass = function (element, className) {
    var classNames = element.className.split(" ");

    for (var index = 0; index < classNames.length; index++) {
        if (classNames[index] === className) {
            return true;
        }
    }

    return false;
};

things.attachMethods = function (element) {
  element.getChildElement = function (identifier) { return things.getChildElement(element, identifier); };
  element.getChildElementAt = function (index) { return things.getChildElementAt(element, index); };
  element.getParentElement = function () { return things.getParentElement(element); };
  element.addElement = function (child) { return things.addElement(element, child); };
  element.addElementAt = function (child, index) { return things.addElement(element, child, index); };
  element.getElement = function (identifier) { return things.getElement(identifier); };
  element.removeElement = function (child) { things.removeElement(child); };
  element.removeSelf = function () { things.removeElement(element); };
  element.replaceElement = function (oldElement, newElement) { return things.replaceElement(element, oldElement, newElement); };
  element.replaceSelf = function (newElement) { return things.replaceElement(element.parentNode, element, newElement); };
  element.changeClassName = function (className) { return things.changeClassName(element, className); };
  element.changeClassNamePart = function (oldClassName, newClassName) { return things.changeClassName(element, oldClassName, newClassName); };
  element.appendClassNamePart = function (className) { return things.appendClassNamePart(element, className); };

  return element;
};

things.getChildElement = function (parentElement, childElementIdentifier) {
  var element = null;

  if (parentElement.getElementById(childElementIdentifier) !== null) { element = parentElement.getElementById(childElementIdentifier); }
  else { element = parentElement.getElementsByName(childElementIdentifier); }

  return things.attachMethods(element);
};

things.getChildElementAt = function (parentElement, index) {
  var childElement = parentElement.childNodes.item[index];
  return things.attachMethods(childElement);
};

things.getParentElement = function (element) {
  var parentElement = element.parentNode;
  return things.attachMethods(parentElement);
};;

things.addElement = function (parentElement, childElement) {
  parentElement.appendChild(childElement);
  return things.attachMethods(childElement);
};;

things.addElementAt = function (parentElement, childElement, index) {
  if (index < parentElement.childNodes.length) {
    var siblingElement = parentElement.childNodes.item(index + 1);
    parentElement.insertBefore(childElement, siblingElement);
  }
  else {
    parentElement.appendChild(childElement);
  }

  return things.attachMethods(childElement);
};

things.removeElement = function (element) {
    element.parentNode.removeChild(element);
};

things.replaceElement = function (parent, oldElement, newElement) {
    parent.replaceChild(newElement, oldElement);
    return things.attachMethods(newElement);
};

things.changeClassName = function (element, className) {
  element.className = className;
  return things.attachMethods(element);
};

things.changeClassNamePart = function (element, oldClassName, newClassName) {
  var classNames = element.className.split(" ");

  for (var index = 0; index < classNames.length; index++) {
    if (classNames[index] === oldClassName) {
      classNames[index] = newClassName;
    }
  }

  var className = classNames.join(" ");
  element.className = className;

  return things.attachMethods(element);
};

things.appendClassNamePart = function (element, className) {
  var classNames = element.className.split(" ");
  classNames.push(className);

  var newClassName = classNames.join(" ");
  element.className = newClassName;

  return things.attachMethods(element);
};