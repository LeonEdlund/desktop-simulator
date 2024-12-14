function DragAndDropHandler(element, grabHandle, transparency) {
  this.element = element;
  this.grabHandle = grabHandle;
  this.isDragging = false;
  this._offsetX;
  this._offsetY;

  this.styleConfig = {
    transparent: transparency || 0.5,
    nonTransparent: 1,
  }

  //binds this to the method
  this._mouseMove = this._mouseMove.bind(this);
  this._mouseUp = this._mouseUp.bind(this);

  this.grabHandle.addEventListener("mousedown", this._dragStart.bind(this));
}

DragAndDropHandler.zIndex = 1;

DragAndDropHandler.prototype._dragStart = function (event) {
  this.isDragging = true;
  DragAndDropHandler.zIndex++;

  this.offsetX = event.clientX - this.element.offsetLeft;
  this.offsetY = event.clientY - this.element.offsetTop;

  this.element.style.opacity = this.styleConfig.transparent;
  this.element.style.zIndex = DragAndDropHandler.zIndex;

  document.addEventListener("mousemove", this._mouseMove);
  document.addEventListener("mouseup", this._mouseUp);
}

DragAndDropHandler.prototype._mouseMove = function (event) {
  if (!this.isDragging) return;

  var left = event.clientX - this.offsetX;
  var top = event.clientY - this.offsetY;

  if (left < 0) left = 0;
  if (top < 22) top = 22;

  this.element.style.left = left + 'px';
  this.element.style.top = top + 'px';
}

DragAndDropHandler.prototype._mouseUp = function (event) {
  if (this.isDragging) this.isDragging = false;

  this.element.style.opacity = this.styleConfig.nonTransparent;
  this.element.style.zIndex = this.styleConfig.defaultZIndex;

  document.removeEventListener("mousemove", this._mouseMove.bind(this));
  document.removeEventListener("mouseup", this._mouseUp.bind(this));
}