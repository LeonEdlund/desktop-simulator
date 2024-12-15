function Window() {
  if (this.constructor === Window) {
    throw ("Window is an abstract class.");
  }

  this.element;
  this.dragHandler;
}

// creates the structure of the dice window
Window.prototype.createWindow = function (windowClass, menuClass) {
  var windowWrapper = document.createElement("div");
  var menuWrapper = document.createElement("div");
  var close = document.createElement("div");

  windowWrapper.classList.add(windowClass);
  menuWrapper.classList.add(menuClass);
  close.classList.add("close");

  menuWrapper.appendChild(close);
  windowWrapper.appendChild(menuWrapper);

  this.element = windowWrapper;
  this._addListeners(close, menuWrapper);
}

//add eventlistener
Window.prototype._addListeners = function (closeBtn, menubar) {
  closeBtn.addEventListener("click", this.closeWindow.bind(this));
  this.dragHandler = new DragAndDropHandler(this.element, menubar);
}

// adds the window to the structure
Window.prototype.appendTo = function (parent) {
  parent.appendChild(this.element);
}

// closes the window
Window.prototype.closeWindow = function () {
  this.element.remove();
}

