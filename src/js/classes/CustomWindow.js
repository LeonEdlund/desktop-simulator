/**
 * @class
 * @abstract
 * @classdesc Abstract class representing a custom window.
 * 
 * @constructor
 * @param {Function} closeCallback - Optional callback function to be called when the window is closed.
 */
function CustomWindow(closeCallback) {
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
   * Callback function for closing window.
   * 
   * @private
   * @type {Function}
   */
  this.m_onClose = closeCallback;

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
 * Removes window from DOM and disposes resources.
 * 
 * @public
 * @returns {undefined}
 */
CustomWindow.prototype.closeWindow = function () {
  this.m_closeBtn.removeEventListener("click", this.closeWindow);
  this.m_dragHandler.dispose();
  this.m_element.remove();

  // call close callback function.
  if (this.m_onClose) {
    this.m_onClose(this);
  }

  // Run dispose method in child classes if the exist.
  if (this.dispose) {
    this.dispose();
  }

  // set all properties to null.
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
 * creates the base structure of the dice window.
 * 
 * @protected
 * @param {string} windowClass - The CSS class of the window wrapper.
 * @param {string} menuClass - The CSS class of the menu wrapper.
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