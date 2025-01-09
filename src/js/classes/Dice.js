/**
 * Creates a new instance of a dice.
 * 
 * @class
 * @classdesc - Represents a dice.
 * 
 * @constructor
 */
function Dice() {
  //--------------------------------------------------------------------------
  // Public properties
  //--------------------------------------------------------------------------

  /**
   * The dice score.
   * 
   * @type {number}
   * @public
   */
  this.amount = Math.floor(Math.random() * 6) + 1;

  //--------------------------------------------------------------------------
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * The dice dom element.
   * 
   * @type {Element}
   * @private
   */
  this.m_element = null;

  /**
   * Second constructor call.
   */
  this.m_construct();
}

//--------------------------------------------------------------------------
// Private static properties
//--------------------------------------------------------------------------

/**
 * The css class names for the sides of the dice.
 * 
 * @type {Object}
 * @private
 */
Dice.prototype.m_sides = [
  "dice-side-one",
  "dice-side-two",
  "dice-side-three",
  "dice-side-four",
  "dice-side-five",
  "dice-side-six",
]

//--------------------------------------------------------------------------
// Public getter and setter methods
//--------------------------------------------------------------------------

/**
 * 
 * @returns {number}
 */
Dice.prototype.getScore = function () {
  return this.amount;
}

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Creates a li element representing a dice.
 * 
 * @public
 * @returns {Element}
 */
Dice.prototype.generateDice = function () {
  this.m_element = document.createElement("li");
  this.m_element.className = "dice " + this.m_sides[this.amount];
  return this.m_element;
}

/**
 * Rolls dice.
 * 
 * @public
 * @returns {undefined}
 */
Dice.prototype.roll = function () {
  this.amount = Math.floor(Math.random() * 6) + 1;
  this.m_element.className = "dice " + this.m_sides[this.amount];
}

/**
 * removes dice from DOM.
 * 
 * @public
 * @returns {undefined}
 */
Dice.prototype.delete = function () {
  if (this.m_element) {
    this.m_element.remove();
    this.m_element = null;
  }
}

/**
 * Second constructor.
 * 
 * @private
 * @returns {undefined}
 */
Dice.prototype.m_construct = function () {
  this.roll = this.roll.bind(this);
}