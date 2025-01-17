/**
 * Creates a new instance of the ScoreCounter class.
 * 
 * @class
 * @classdesc - Represents a score counter.
 * 
 * @constructor
 */
function ScoreCounter() {
  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * Outer counter ul element.
   * 
   * @private
   * @type {Element}
   */
  this.m_element = document.createElement("ul");

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
// Public getter methods
//--------------------------------------------------------------------------

/**
 * Returns the Counter HTML-element.
 * 
 * @public
 * @returns {Element}
 */
ScoreCounter.prototype.getCounter = function () {
  return this.m_element;
}

//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * Updates the CSS classname for each counter digit.
 * 
 * @public
 * @param {number} score - The score that the counter should update to. Max 5 digits long.
 * @returns {undefined}
 */
ScoreCounter.prototype.updateCounter = function (score) {
  if (score.toString().length > this.m_numbers.length) {
    throw ("The score is too big and can only be 5 digits long");
  }

  var scoreAsStr = score.toString().padStart(5, "0");
  var classNames = [
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

  for (var i = 0; i < scoreAsStr.length; i++) {
    this.m_numbers[i].className = classNames[parseInt(scoreAsStr[i], 10)];
  }
}

/**
 * Removes resources.
 * 
 * @public
 * @returns {undefined}
 */
ScoreCounter.prototype.dispose = function () {
  this.m_element = null;
  this.m_numbers = null;
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
  this.m_element.className = "dice-toolbar-counter-wrapper";

  this.m_numbers.forEach(function (number) {
    self.m_element.appendChild(number);
  });
}