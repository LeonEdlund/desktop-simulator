function Window() {
  if (this.constructor === Window) {
    throw ("Button is an abstract class.");
  }

  this.element;
  this._closeBtn;
  this._menuBar;
  this.isDragging = false;
  this._offsetX;
  this._offsetY;
  this._styleConfig = {
    transparent: 0.5,
    nonTransparent: 1,
    zIndex: 1,
  }
}

// creates the structure of the dice window
Window.prototype.createWindow = function (windowClass, menuClass) {
  var windowWrapper = document.createElement("div");
  windowWrapper.classList.add(windowClass);

  var menuWrapper = document.createElement("div");
  menuWrapper.classList.add(menuClass);
  this._menuBar = menuWrapper;

  var close = document.createElement("div");
  close.classList.add("close");
  this._closeBtn = close;

  menuWrapper.appendChild(close);
  windowWrapper.appendChild(menuWrapper);

  this._addListeners();
  this.element = windowWrapper;
}

// adds the window to the structure
Window.prototype.appendTo = function (parent) {
  parent.appendChild(this.element);
}

// closes the window
Window.prototype.closeWindow = function () {
  this.element.remove();
}

//add eventlistener
Window.prototype._addListeners = function () {
  this._closeBtn.addEventListener("click", this.closeWindow.bind(this));
  this._menuBar.addEventListener("mousedown", this._dragStart.bind(this));
}

Window.prototype._dragStart = function (event) {
  this.isDragging = true;
  this._styleConfig.zIndex++;

  this.offsetX = event.clientX - this.element.offsetLeft;
  this.offsetY = event.clientY - this.element.offsetTop;

  this.element.style.opacity = this._styleConfig.transparent;
  this.element.style.zIndex = this._styleConfig.zIndex;

  document.addEventListener("mousemove", this._mouseMove.bind(this));
  document.addEventListener("mouseup", this._mouseUp.bind(this));
}

Window.prototype._mouseMove = function (event) {
  if (!this.isDragging) return;

  var left = event.clientX - this.offsetX;
  var top = event.clientY - this.offsetY;

  if (left < 0) left = 0;
  if (top < 22) top = 22;

  this.element.style.left = left + 'px';
  this.element.style.top = top + 'px';
}

Window.prototype._mouseUp = function (event) {
  if (this.isDragging) this.isDragging = false;

  this.element.style.opacity = this._styleConfig.nonTransparent;
  this.element.style.zIndex = this._styleConfig.defaultZIndex;

  document.removeEventListener("mousemove", this._mouseMove.bind(this));
  document.removeEventListener("mouseup", this._mouseUp.bind(this));
}














