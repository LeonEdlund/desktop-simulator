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
  var diceBtn = document.getElementById("icon-dice");
  var clockBtn = document.getElementById("icon-clock");

  diceBtn.addEventListener("click", this.m_openDiceWindow.bind(this));
  clockBtn.addEventListener("click", this.m_openClockWindow.bind(this));
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
App.prototype.m_openDiceWindow = function () {
  var diceWindow = this.windowFactory.createWindow("dice");
  diceWindow.appendTo(document.getElementById("page-content-wrapper"));
}

/**
 * Opens a clock application window.
 * 
 * @private
 * @returns {undefined} 
 */
App.prototype.m_openClockWindow = function () {
  var clockWindow = this.windowFactory.createWindow("clock");
  clockWindow.appendTo(document.getElementById("page-content-wrapper"));
}
