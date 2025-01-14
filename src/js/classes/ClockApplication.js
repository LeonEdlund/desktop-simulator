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
 * @override
 * @protected
 * @returns {undefined}
 */
ClockApplication.prototype.m_construct = function () {
  CustomWindow.prototype.m_construct.call(this);
  CustomWindow.prototype.m_createWindow.call(this, "clock-window-wrapper", "clock-menubar-wrapper");
  CustomWindow.prototype.m_addElement.call(this, this.m_createClock());

  // Subscribe to timeManager
  this.boundCallback = this.m_updateDigits.bind(this);
  this.m_timeManager.subscribe(this.boundCallback);
}

/**
 * Create clock.
 * 
 * @private
 * @returns {Element}
 */
ClockApplication.prototype.m_createClock = function () {
  var clockContainer = document.createElement("div");
  clockContainer.className = "clock-content-wrapper";
  clockContainer.append(this.m_createDigits("hour"), this.m_createDigits("minute"), this.m_createDigits("second"));
  return clockContainer;
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

  ul.append(digitOne, digitTwo);

  return ul;
}

/**
 * Updates the individual digits.
 * 
 * @private
 * @param {string} time - The time based on the unit as a string.
 * @returns {undefined}
 */
ClockApplication.prototype.m_updateDigits = function (time) {
  var digits = this.m_element.querySelectorAll("li");
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
    digits[i].className = classNames[parseInt(time[i], 10)];
  }
}