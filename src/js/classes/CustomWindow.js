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
   * The window Dom-Element
   * 
   * @protected
   * @type {Element}
   */
  this.m_element;

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * Window close button.
   * 
   * @private
   * @type {Element}
   */
  this.m_closeBtn;

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

  if (this.dispose) {
    this.dispose();
  }

  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      this[prop] = null;
    }
  }
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
  this.m_closeBtn = close;
  this.m_addListeners(menuWrapper);
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
 * Adds eventlistener to close button and drag and drop handler.
 * 
 * @private
 * @param {Element} menubar - The type of window that should be created, clock or dice. 
 * @returns {undefined}
 */
CustomWindow.prototype.m_addListeners = function (menubar) {
  this.closeWindow = this.closeWindow.bind(this);

  this.m_closeBtn.addEventListener("click", this.closeWindow);
  this.m_dragHandler = new DragAndDropHandler(this.m_element, menubar, { boundaryTop: 22 });
}