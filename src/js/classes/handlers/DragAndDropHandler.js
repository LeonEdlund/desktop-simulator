//--------------------------------------------------------------------------
// Constructor scope 
//--------------------------------------------------------------------------

/**
 * @class
 * @classdesc - Represents a DragAndDropHandler.
 * @constructor - Creates a Drag and Drop handler.
 * 
 * @param {Element} element - 
 * @param {Element} grabHandle - 
 */
function DragAndDropHandler(element, grabHandle) {
  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * The moving element.
   * 
   * @type {Element}
   * @private
   */
  this.m_element = element;

  /**
   * The draggable handle.
   * 
   * @type {Element}
   * @private
   */
  this.m_grabHandle = grabHandle;

  /**
  * Flag to check if window is currently dragging.
  * 
  * @type {boolean}
  * @private
  */
  this.m_isDragging = false;

  //--------------------------------------------------------------------------
  // Constructor call
  //--------------------------------------------------------------------------

  /**
   * Invokes secondary constructor call
   */
  this.m_construct();
}

//--------------------------------------------------------------------------
// Static variabels
//--------------------------------------------------------------------------

/**
 * zIndex for the draggable element  
 * @static
 * @private
 * @type {number}
 */
DragAndDropHandler.zIndex = 1;

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * The class constructor.
 * @private
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_construct = function () {
  this.m_mouseMove = this.m_mouseMove.bind(this);
  this.m_mouseUp = this.m_mouseUp.bind(this);

  this.m_grabHandle.addEventListener("mousedown", this.m_dragStart.bind(this));
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_dragStart = function (event) {
  var self = this;
  var transparentValue = 0.5;
  this.m_isDragging = true;
  DragAndDropHandler.zIndex++;

  var offsetX = event.clientX - this.m_element.offsetLeft;
  var offsetY = event.clientY - this.m_element.offsetTop;

  this.m_element.style.opacity = transparentValue;
  this.m_element.style.zIndex = DragAndDropHandler.zIndex;

  document.addEventListener("mousemove", function (event) {
    self.m_mouseMove(event, offsetX, offsetY);
  });
  document.addEventListener("mouseup", this.m_mouseUp);
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @param {number} offsetX - ...
 * @param {number} offsetY - ...
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_mouseMove = function (event, offsetX, offsetY) {
  if (!this.m_isDragging) return;

  var left = event.clientX - offsetX;
  var top = event.clientY - offsetY;

  if (left < 0) left = 0;
  if (top < 22) top = 22;

  this.m_element.style.left = left + 'px';
  this.m_element.style.top = top + 'px';
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_mouseUp = function (event) {
  if (this.m_isDragging) this.m_isDragging = false;

  var nonTransparentValue = 1;
  this.m_element.style.opacity = nonTransparentValue;

  // fix later

  // document.removeEventListener("mousemove", this.m_mouseMove);
  // document.removeEventListener("mouseup", this.m_mouseUp);
}

