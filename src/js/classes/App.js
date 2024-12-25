//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * Creates a new instance of the application.
 * 
 * @class
 * @classdesc - Reppresents the application. 
 * @constructor - Creates a new application.
 */
function App() {
  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * WindowFactory object to create new UiWindow instances
   * 
   * @type {WindowFactory}
   */
  this.windowFactory = new WindowFactory();
}

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Starts the application by setting up eventListeners on buttons in application.
 * 
 * @public
 * @returns {undefined} 
 */
App.prototype.start = function () {
  var _diceBtn = document.getElementById("icon-dice");
  var _clockBtn = document.getElementById("icon-clock");

  _diceBtn.addEventListener("click", this.openDiceWindow.bind(this));
  _clockBtn.addEventListener("click", this.openClockWindow.bind(this));
}

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Opens a dice application window.
 * 
 * @private
 * @returns {undefined} 
 */
App.prototype.openDiceWindow = function () {
  var diceWindow = this.windowFactory.createWindow("dice");
  diceWindow.appendTo(document.getElementById("page-content-wrapper"));
}

/**
 * Opens a clock application window.
 * 
 * @private
 * @returns {undefined} 
 */
App.prototype.openClockWindow = function () {
  var clockWindow = this.windowFactory.createWindow("clock");
  clockWindow.appendTo(document.getElementById("page-content-wrapper"));
}
