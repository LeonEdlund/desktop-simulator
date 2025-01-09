/**
 * Creates a new instance of the application.
 * 
 * @class
 * @classdesc - Reppresents the whole application. 
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

  /**
   * Array with all open windows
   * 
   * @private
   * @type {Array}
   */
  this.m_openWindows = [];
}

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
  var diceWindow = new DiceApplication(40, new ScoreCounter(), this.m_onClosedWindow.bind(this));

  diceWindow.appendTo(this.m_desktop);
  this.m_openWindows.push(diceWindow);
}

/**
 * Instantiates a clock application and appends the html window to the desktop.
 * 
 * @private
 * @returns {undefined} 
 */
Main.prototype.m_openClockWindow = function () {
  var clockWindow = new ClockApplication(TimeManager.getInstance(), this.m_onClosedWindow.bind(this));

  clockWindow.appendTo(this.m_desktop);
  this.m_openWindows.push(clockWindow);
}

/**
 * Removes a closed window from array with all windows.
 * 
 * @private
 * @returns {undefined} 
 */
Main.prototype.m_onClosedWindow = function (window) {
  var index = this.m_openWindows.indexOf(window);
  if (index !== -1) {
    this.m_openWindows.splice(index, 1);
  }
}

/** 
 * Bootstrap
 */
window.addEventListener("load", function () {
  var app = new Main();
  app.start();
}, { once: true })