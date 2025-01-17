/**
 * Creates a new instance of the ClockApplication class.
 * 
 * @class
 * @classdesc - Represents a clock application.
 * @extends CustomWindow
 * 
 * @constructor
 * @param {TimeManager} timeManager - A singleton object handling the global time and rendering of clocks.
 */
function ClockApplication(timeManager) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Extends UiWindow.
   */
  CustomWindow.call(this);

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * A singleton object handling the global time and rendering of clocks.
   * 
   * @private
   * @type {TimeManager}
   */
  this.m_timeManager = timeManager;

  /**
   * Nobelist of all digits.
   * 
   * @private
   * @type {Array}
   */
  this.m_digits;

  //--------------------------------------------------------------------------
  // Constructor call
  //--------------------------------------------------------------------------

  /**
   * Invoke secondary constructor
   */
  this.m_construct();
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

ClockApplication.prototype = Object.create(CustomWindow.prototype);
ClockApplication.prototype.constructor = ClockApplication;

//--------------------------------------------------------------------------
// Protected prototype methods
//--------------------------------------------------------------------------

/**
 * Secondary constructor method.
 * 
 * @override
 * @protected
 * @returns {undefined}
 */
ClockApplication.prototype.m_construct = function () {
  CustomWindow.prototype.m_construct.call(this);
  this.m_createWindow();
  this.m_digits = Array.from(this.m_element.querySelectorAll("li"));

  this.boundCallback = this.m_updateDigits.bind(this);
  this.m_timeManager.subscribe(this.boundCallback);
}

/**
 * Create clock.
 * 
 * @override
 * @protected
 * @returns {undefined}
 */
ClockApplication.prototype.m_createWindow = function () {
  CustomWindow.prototype.m_createWindow.call(this, "clock-window-wrapper", "clock-menubar-wrapper");

  var clockContainer = document.createElement("div");
  var hours = this.m_createDigits("hour");
  var minutes = this.m_createDigits("minute");
  var seconds = this.m_createDigits("second");
  clockContainer.className = "clock-content-wrapper";


  if (hours && minutes && seconds) {
    clockContainer.append(hours, minutes, seconds);
  };

  this.m_element.appendChild(clockContainer);
  CustomWindow.prototype.m_addListeners.call(this);
}

/**
 * Dispose resources by unsubscribing from TimeManager.
 * 
 * @protected
 * @returns {undefined}
 */
ClockApplication.prototype.m_dispose = function () {
  this.m_timeManager.unSubscribe(this.boundCallback);
}

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * Creates a ul Element with two digits as li elements.
 * 
 * @private
 * @param {string} unitClass - The css class for the different units of time.
 * @returns {Element}
 */
ClockApplication.prototype.m_createDigits = function (unitClass) {
  var ul = document.createElement("ul");
  var digitOne = document.createElement("li");
  var digitTwo = document.createElement("li");

  ul.classList.add("clock-digit-wrapper", unitClass);
  digitOne.className = "clock-digit-zero";
  digitTwo.className = "clock-digit-zero";

  ul.append(digitOne, digitTwo);

  return ul;
}

/**
 * Updates the individual digits.
 * 
 * @private
 * @param {string} time - The time.
 * @returns {undefined}
 */
ClockApplication.prototype.m_updateDigits = function (time) {
  var classNames = [
    "clock-digit-zero",
    "clock-digit-one",
    "clock-digit-two",
    "clock-digit-three",
    "clock-digit-four",
    "clock-digit-five",
    "clock-digit-six",
    "clock-digit-seven",
    "clock-digit-eight",
    "clock-digit-nine"
  ];

  for (var i = 0; i < time.length; i++) {
    this.m_digits[i].className = classNames[parseInt(time[i], 10)];
  }
}