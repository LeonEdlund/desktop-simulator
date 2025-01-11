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
  // Private properties
  //--------------------------------------------------------------------------

  /**
   * The dice score.
   * 
   * @private
   * @type {number}
   */
  this.m_amount = Math.floor(Math.random() * 6) + 1;

  /**
   * The dice dom element.
   * 
   * @private
   * @type {Element}
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
 * @private
 * @type {Object}
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
  return this.m_amount;
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
  this.m_element.className = "dice " + this.m_sides[this.m_amount - 1];
  return this.m_element;
}

/**
 * Rolls dice.
 * 
 * @public
 * @returns {undefined}
 */
Dice.prototype.roll = function () {
  this.m_amount = Math.floor(Math.random() * 6) + 1;
  this.m_element.className = "dice " + this.m_sides[this.m_amount - 1];
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

//--------------------------------------------------------------------------
// Private methods
//--------------------------------------------------------------------------

/**
 * Second constructor.
 * 
 * @private
 * @returns {undefined}
 */
Dice.prototype.m_construct = function () {
  this.roll = this.roll.bind(this);
}