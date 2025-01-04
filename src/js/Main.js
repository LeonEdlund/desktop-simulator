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
function Main() {
  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * ...
   * 
   * @private
   * @type {Element}
   */
  this.m_clockBtn = document.getElementById("icon-clock");

  /**
   * ...
   * 
   * @private
   * @type {Element}
  */
  this.m_diceBtn = document.getElementById("icon-dice");

  /**
   * ...
   * 
   * @private
   * @type {Element}
   */
  this.m_desktop = document.getElementById("page-content-wrapper");
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
Main.prototype.start = function () {
  this.m_diceBtn.addEventListener("click", this.m_openDiceWindow.bind(this));
  this.m_clockBtn.addEventListener("click", this.m_openClockWindow.bind(this));
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
Main.prototype.m_openDiceWindow = function () {
  var scoreCounter = new ScoreCounter();
  var diceWindow = new DiceApplication(40, scoreCounter);
  diceWindow.appendTo(this.m_desktop);
}

/**
 * Opens a clock application window.
 * 
 * @private
 * @returns {undefined} 
 */
Main.prototype.m_openClockWindow = function () {
  var timeManager = TimeManager.getInstance();
  var clockWindow = new ClockApplication(timeManager);
  clockWindow.appendTo(this.m_desktop);
}


/**
 * Starting point for application.
 * Eventlistener removed once app is loaded.
 */
window.addEventListener("load", function () {
  var app = new Main();
  app.start();
}, { once: true })