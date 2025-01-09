/**
 * Creates a new instance of a dice application.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc - ...
 * 
 * @constructor
 * @param {TimeManager} timeManager - global time.
 * @param {Function} closeCallback - Optional callback function to be called when the window is closed.
 */
function ClockApplication(timeManager, closeCallback) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Extends UiWindow.
   */
  CustomWindow.call(this, closeCallback);

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * ...
   * @private
   * @type {TimeManager}
   */
  this.m_timeManager = timeManager;

  /**
   * ...
   * @private
   * @type {Element}
   */
  this.m_clockContainer = document.createElement("div");

  /**
   * ...
   * @private
   * @type {Object}
   */
  this.m_digits = {
    hour: this._createDigits("hour"),
    minutes: this._createDigits("minute"),
    seconds: this._createDigits("second"),
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
 * ...
 * 
 * @public
 * @returns {undefined}
 */
ClockApplication.prototype.renderClock = function () {
  var time = this.m_timeManager.timeAsStrings;
  var hour = time.hour;
  var minutes = time.minutes;
  var seconds = time.seconds;

  this._updateDigits(this.m_digits.hour, hour[0], hour[1]);
  this._updateDigits(this.m_digits.minutes, minutes[0], minutes[1]);
  this._updateDigits(this.m_digits.seconds, seconds[0], seconds[1]);
}

/**
 * Dispose resources
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

  this.m_clockContainer.className = "clock-content-wrapper";

  this.m_clockContainer.appendChild(this.m_digits.hour);
  this.m_clockContainer.appendChild(this.m_digits.minutes);
  this.m_clockContainer.appendChild(this.m_digits.seconds);

  // parent call
  this.m_addElement(this.m_clockContainer);

  this.boundCallback = this.renderClock.bind(this);
  this.m_timeManager.subscribe(this.boundCallback);
}

/**
 * ...
 * 
 * @private
 * 
 * @param {string} unitClass - ...
 * @returns {Element}
 */
ClockApplication.prototype._createDigits = function (unitClass) {
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
 * ...
 * 
 * @private
 * 
 * @param {HTMLElement} element - ...
 * @param {number} digitOne - ...
 * @param {number} digitTwo - ...
 * 
 * @returns {undefined}
 */
ClockApplication.prototype._updateDigits = function (element, digitOne, digitTwo) {
  var digits = element.querySelectorAll("li");
  digits[0].className = this._getNumberClass(parseInt(digitOne, 10));
  digits[1].className = this._getNumberClass(parseInt(digitTwo, 10));
}

/**
 * ...
 * 
 * @private
 * 
 * @param {number} number - ...
 * 
 * @returns {string}
 */
ClockApplication.prototype._getNumberClass = function (number) {
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
  return classNames[number];
}