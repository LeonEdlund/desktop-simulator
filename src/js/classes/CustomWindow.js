//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * @class
 * @abstract
 * @classdesc
 * @constructor - Creates a Window
 */
function CustomWindow() {
  if (this.constructor === CustomWindow) {
    throw ("Window is an abstract class.");
  }

  //--------------------------------------------------------------------------
  // Protected properties
  //--------------------------------------------------------------------------

  /**
   * The window object
   * 
   * @protected
   * @type {Element}
   */
  this.m_element;

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * The drag and drop handler
   * 
   * @private
   * @type {DragAndDropHandler}
   */
  this.m_dragHandler;
}

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * Appends window.
 * 
 * @public
 * 
 * @param {Element} parent - The element the window should be added too.
 * @returns {undefined}
 */
CustomWindow.prototype.appendTo = function (parent) {
  parent.appendChild(this.m_element);
}

/**
 * Removes window from DOM.
 * 
 * @public
 * @returns {undefined}
 */
CustomWindow.prototype.closeWindow = function () {
  this.m_element.remove();
}

//--------------------------------------------------------------------------
// Protected prototype methods
//--------------------------------------------------------------------------

/**
 * creates the structure of the dice window.
 * 
 * @protected
 * @param {string} windowClass - The type of window that should be created, clock or dice. 
 * @param {string} menuClass - The type of window that should be created, clock or dice. 
 * @returns {undefined}
 */
CustomWindow.prototype.m_createWindow = function (windowClass, menuClass) {
  var windowWrapper = document.createElement("div");
  var menuWrapper = document.createElement("div");
  var close = document.createElement("div");

  windowWrapper.classList.add(windowClass);
  menuWrapper.classList.add(menuClass);
  close.classList.add("close");

  menuWrapper.appendChild(close);
  windowWrapper.appendChild(menuWrapper);

  this.m_element = windowWrapper;
  this.addListeners(close, menuWrapper);
}

/**
 * Adds HTML elements to window.
 * 
 * @protected
 * @param {Element} element - The element that should be added.
 * @returns {undefined}
 */
CustomWindow.prototype.m_addElement = function (element) {
  this.m_element.appendChild(element);
}

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * Adds eventlistener to close button and drag and drop.
 * 
 * @private
 * @param {Element} closeBtn - The type of window that should be created, clock or dice. 
 * @param {Element} menubar - The type of window that should be created, clock or dice. 
 * @returns {undefined}
 */
CustomWindow.prototype.addListeners = function (closeBtn, menubar) {
  closeBtn.addEventListener("click", this.closeWindow.bind(this));
  this.m_dragHandler = new DragAndDropHandler(this.m_element, menubar)
}