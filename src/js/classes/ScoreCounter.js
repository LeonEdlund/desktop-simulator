/**
 * 
 * 
 * @class
 * @classdesc - Represents a score counter.
 * 
 * @constructor
 */
function ScoreCounter() {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------

  /**
   * Outer counter ul element.
   * 
   * @public
   * @type {Element}
   */
  this.element = document.createElement("ul");

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * Array with Dom elements for individual numbers.
   * 
   * @private
   * @type {Array}
   */
  this.m_numbers = [
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
  ]

  //--------------------------------------------------------------------------
  // Constructor call
  //--------------------------------------------------------------------------
  /**
   * Invokes second constructor call
   */
  this.m_construct();
}

//--------------------------------------------------------------------------
// Private prototype properties
//--------------------------------------------------------------------------

/**
 * Array with CSS classnames for individual numbers
 * 
 * @private
 * @type {Array}
 */
ScoreCounter.prototype.m_classNames = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];


//--------------------------------------------------------------------------
// Public getter and setter methods
//--------------------------------------------------------------------------

/**
 * Returns the Counter HTML-element.
 * 
 * @public
 * @returns {Element}
 */
ScoreCounter.prototype.getCounter = function () {
  return this.element;
}

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * Updates the CSS classname for each counter digit.
 * 
 * @public
 * @param {number} score - The score.  
 * @returns {undefined}
 */
ScoreCounter.prototype.updateCounter = function (score) {
  var self = this;
  var scoreAsStr = score.toString().padStart(5, "0");

  for (var i = 0; i < scoreAsStr.length; i++) {
    self.m_numbers[i].className = this.m_classNames[parseInt(scoreAsStr[i], 10)];
  }
}

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * Second constructor call
 * 
 * @private
 * @return {undefined}
 */
ScoreCounter.prototype.m_construct = function () {
  var self = this;
  this.element.className = "dice-toolbar-counter-wrapper";

  // append numbers to counter ul-element.
  this.m_numbers.forEach(function (number) {
    self.element.appendChild(number);
  });
}