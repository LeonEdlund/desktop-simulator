/**
 * Creates a new instance of a dice application.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc - Represents a clock application.
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
   * Holds the ul elements that has the individual digits.
   * 
   * @private
   * @type {Object}
   */
  this.m_digits = {
    hour: this.m_createDigits("hour"),
    minutes: this.m_createDigits("minute"),
    seconds: this.m_createDigits("second"),
  }

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
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * Get's the current time as strings from timeManager and updates the css classes for the digits.
 * 
 * @public
 * @returns {undefined}
 */
ClockApplication.prototype.renderClock = function () {
  var time = this.m_timeManager.timeAsStrings;

  this.m_updateDigits(this.m_digits.hour, time.hour);
  this.m_updateDigits(this.m_digits.minutes, time.minutes);
  this.m_updateDigits(this.m_digits.seconds, time.seconds);
}

/**
 * Dispose resources by unsubscribing from TimeManager.
 * 
 * @public
 * @returns {undefined}
 */
ClockApplication.prototype.dispose = function () {
  this.m_timeManager.unSubscribe(this.boundCallback);
}

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * Secondary constructor method.
 * 
 * @private
 * @returns {undefined}
 */
ClockApplication.prototype.m_construct = function () {
  this.m_createWindow("clock-window-wrapper", "clock-menubar-wrapper");

  var clockContainer = document.createElement("div");
  clockContainer.className = "clock-content-wrapper";

  clockContainer.appendChild(this.m_digits.hour);
  clockContainer.appendChild(this.m_digits.minutes);
  clockContainer.appendChild(this.m_digits.seconds);

  // parent call
  this.m_addElement(clockContainer);

  // Subscribe to timeManager
  this.boundCallback = this.renderClock.bind(this);
  this.m_timeManager.subscribe(this.boundCallback);
}

/**
 * Creates a ul Element with two digits as li elements.
 * 
 * @private
 * 
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

  ul.appendChild(digitOne);
  ul.appendChild(digitTwo);

  return ul;
}

/**
 * Updates the individual digits.
 * 
 * @private
 * 
 * @param {HTMLElement} element - The Ul element holding the li digits for a specific time unit. 
 * @param {string} time - The time based on the unit as a string.
 * 
 * @returns {undefined}
 */
ClockApplication.prototype.m_updateDigits = function (element, time) {
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

  var digits = element.querySelectorAll("li");
  digits[0].className = classNames[parseInt(time[0], 10)];
  digits[1].className = classNames[parseInt(time[1], 10)];
}