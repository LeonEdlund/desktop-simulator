/**
 * @class
 * @abstract
 * @classdesc Abstract class representing a custom window.
 * 
 * @constructor
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
   * The menubar used for drag and drop.
   * 
   * @private
   * @type {Element}
   */
  this.m_menubar;

  /**
   * Object storing values for drag and drop.
   * 
   * @private
   * @type {Object}
   */
  this.m_dragDropValues = {
    nonTransparentValue: 1,
    transparentValue: 0.5,
    offsetX: 0,
    offsetY: 0
  }

  this.m_init();
}

//--------------------------------------------------------------------------
// Static properties
//--------------------------------------------------------------------------

CustomWindow.zIndex = 1;

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
  this.m_menubar.removeEventListener("mousedown", this.m_dragStart);
  this.m_element.remove();

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
  this.m_menubar = menuWrapper;
  this.m_closeBtn = close;
  this.m_addListeners();
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

CustomWindow.prototype.m_init = function () {
  this.m_dragStart = this.m_dragStart.bind(this);
  this.closeWindow = this.closeWindow.bind(this);
  this.m_mouseMove = this.m_mouseMove.bind(this);
  this.m_mouseUp = this.m_mouseUp.bind(this);
}

/**
 * Adds eventlistener to close button and drag and drop handler.
 * 
 * @private
 * @returns {undefined}
 */
CustomWindow.prototype.m_addListeners = function () {
  this.m_closeBtn.addEventListener("click", this.closeWindow);
  this.m_menubar.addEventListener("mousedown", this.m_dragStart);
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
CustomWindow.prototype.m_dragStart = function (event) {
  if (event.target.className === "close") return;

  CustomWindow.zIndex++;

  this.m_dragDropValues.offsetX = event.offsetX;
  this.m_dragDropValues.offsetY = event.offsetY;

  this.m_element.style.opacity = this.m_dragDropValues.transparentValue;
  this.m_element.style.zIndex = CustomWindow.zIndex;

  document.addEventListener("mousemove", this.m_mouseMove);
  document.addEventListener("mouseup", this.m_mouseUp);
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
CustomWindow.prototype.m_mouseMove = function (event) {
  var left = Math.max((event.clientX - this.m_dragDropValues.offsetX), 0);
  var top = Math.max((event.clientY - this.m_dragDropValues.offsetY), 22);

  this.m_element.style.left = left + 'px';
  this.m_element.style.top = top + 'px';
}

/**
 * ...
 * @private
 * @param {Event} event - ...
 * @returns {undefined}
 */
CustomWindow.prototype.m_mouseUp = function (event) {
  this.m_element.style.opacity = this.m_dragDropValues.nonTransparentValue;

  document.removeEventListener("mousemove", this.m_mouseMove);
  document.removeEventListener("mouseup", this.m_mouseUp);
}