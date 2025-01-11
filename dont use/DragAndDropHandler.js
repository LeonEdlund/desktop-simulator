/**
 * @class
 * @classdesc - Represents a DragAndDropHandler.
 * @constructor
 * 
 * @param {Element} element - 
 * @param {Element} grabHandle - 
 */
function DragAndDropHandler(element, grabHandle, options) {
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

  /**
  * Horizontal offset between cursor and left corner of element 
  * 
  * @type {number}
  * @private
  */
  this.m_offsetX = 0;

  /**
  * Vertical offset between cursor and left corner of element 
  * 
  * @type {number}
  * @private
  */
  this.m_offsetY = 0;

  /**
  * Configurable boundary options.
  * 
  * @type {Object}
  * @private
  */
  this.m_options = {
    boundaryLeft: (options && options.boundaryLeft) || 0,
    boundaryTop: (options && options.boundaryTop) || 0
  };

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
 * zIndex for the draggable element.  
 * @static
 * @private
 * @type {number}
 */
DragAndDropHandler.zIndex = 1;

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * Removes eventListeners and free up memory.
 * 
 * @returns {undefined}
 */
DragAndDropHandler.prototype.dispose = function () {
  this.m_grabHandle.removeEventListener("mousedown", this.m_dragStart);
  // set all properties to null.
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      this[prop] = null;
    }
  }
}

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * The class constructor.
 * @private
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_construct = function () {
  this.m_dragStart = this.m_dragStart.bind(this);
  this.m_mouseMove = this.m_mouseMove.bind(this);
  this.m_mouseUp = this.m_mouseUp.bind(this);

  this.m_grabHandle.addEventListener("mousedown", this.m_dragStart);
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_dragStart = function (event) {
  var transparentValue = 0.5;

  this.m_isDragging = true;
  DragAndDropHandler.zIndex++;

  this.m_offsetX = event.clientX - this.m_element.offsetLeft;
  this.m_offsetY = event.clientY - this.m_element.offsetTop;

  this.m_element.style.opacity = transparentValue;
  this.m_element.style.zIndex = DragAndDropHandler.zIndex;

  document.addEventListener("mousemove", this.m_mouseMove);
  document.addEventListener("mouseup", this.m_mouseUp);
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
DragAndDropHandler.prototype.m_mouseMove = function (event) {
  if (!this.m_isDragging) return;

  var left = Math.max((event.clientX - this.m_offsetX), this.m_options.boundaryLeft);
  var top = Math.max((event.clientY - this.m_offsetY), this.m_options.boundaryTop);

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

  document.removeEventListener("mousemove", this.m_mouseMove);
  document.removeEventListener("mouseup", this.m_mouseUp);
}

