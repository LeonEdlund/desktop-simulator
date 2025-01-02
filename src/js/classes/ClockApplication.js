//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * Creates a new instance of a dice application.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc - ...
 * 
 * @constructor
 * @param {TimeManager} timeManager - global time.
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
  this._clockContainer = document.createElement("div");

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
  var time = this.m_timeManager.m_timeAsStrings;
  var hour = time.hour;
  var minutes = time.minutes;
  var seconds = time.seconds;

  this._updateDigits(this.m_digits.hour, hour[0], hour[1]);
  this._updateDigits(this.m_digits.minutes, minutes[0], minutes[1]);
  this._updateDigits(this.m_digits.seconds, seconds[0], seconds[1]);
}

// /**
//  * Dispose resources
//  * 
//  * @public
//  * @returns {undefined}
//  */
// ClockApplication.prototype.dispose = function () {
//   console.log(this.m_timeManager);
//   this.m_timeManager.unSubscribe(this.renderClock);
//   this.m_timeManager = null;
//   this._clockContainer = null;
//   this.m_digits = null;
// }

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

  this._clockContainer.className = "clock-content-wrapper";

  this._clockContainer.appendChild(this.m_digits.hour);
  this._clockContainer.appendChild(this.m_digits.minutes);
  this._clockContainer.appendChild(this.m_digits.seconds);

  // parent call
  this.m_addElement(this._clockContainer);

  this.m_timeManager.subscribe(this.renderClock.bind(this));
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