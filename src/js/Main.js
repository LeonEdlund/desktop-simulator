/**
 * Creates a new instance of the Main class.
 * 
 * @class
 * @classdesc - Represents the base of the application.
 * 
 * @constructor
 */
function Main() {

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * Ui Button used to open a clock application. 
   * 
   * @private
   * @type {Element}
   */
  this.m_clockBtn = document.getElementById("icon-clock");

  /**
   * Ui Button used to open a dice application. 
   * 
   * @private
   * @type {Element}
  */
  this.m_diceBtn = document.getElementById("icon-dice");

  /**
   * HTMLElement holding all windows.
   * 
   * @private
   * @type {Element}
   */
  this.m_desktop = document.getElementById("page-content-wrapper");
}

//--------------------------------------------------------------------------
// Static properties
//--------------------------------------------------------------------------

/**
 * Static array of all open windows.
 * 
 * @static
 * @public
 * @type {Array}
 */
Main.allWindows = [];


//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Starts the application by setting up eventListeners on buttons.
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
 * Instantiates a dice application and appends the html window to the desktop.
 * 
 * @private
 * @returns {undefined} 
 */
Main.prototype.m_openDiceWindow = function () {
  var diceWindow = new DiceApplication(40, new ScoreCounter());
  Main.allWindows.push(diceWindow);
  diceWindow.appendTo(this.m_desktop);
}

/**
 * Instantiates a clock application and appends the html window to the desktop.
 * 
 * @private
 * @returns {undefined} 
 */
Main.prototype.m_openClockWindow = function () {
  var clockWindow = new ClockApplication(TimeManager.getInstance());
  Main.allWindows.push(clockWindow);
  clockWindow.appendTo(this.m_desktop);
}

//--------------------------------------------------------------------------
// Bootstrap
//--------------------------------------------------------------------------
window.addEventListener("load", function () {
  var app = new Main();
  app.start();
}, { once: true })