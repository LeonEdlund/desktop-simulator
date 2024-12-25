//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * @class
 * @classdesc - Represents a score counter.
 * @constructor - Creates a score counter.
 */
function ScoreCounter() {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------

  /**
   * Outer counter Dom elements.
   * 
   * @public
   * @type {Element}
   */
  this.element = document.createElement("ul");

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * inner counter Dom elements.
   * 
   * @private
   * @type {Element}
   */
  this.m_counterLi = document.createElement("li");

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
// Static properties
//--------------------------------------------------------------------------

/**
 * Array with CSS classnames for individual numbers
 * 
 * @static
 * @private
 * @type {Array}
 */
ScoreCounter.m_classNames = [
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
 * Returns the Counter DOM element.
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
    self.m_numbers[i].className = ScoreCounter.m_classNames[parseInt(scoreAsStr[i], 10)];
  }
}

/**
 * Places the counter in the DOM.
 * 
 * @public
 * @param {HTMLElement} parent - The dom element that the counter should be appended too.  
 * @returns {undefined}
 */
ScoreCounter.prototype.appendTo = function (parent) {
  parent.appendChild(this.element);
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

  this.m_counterLi.className = "dice-toolbar-counter-wrapper";

  this.m_numbers.forEach(function (number) {
    self.m_counterLi.appendChild(number);
  });

  this.element.appendChild(this.m_counterLi);
}