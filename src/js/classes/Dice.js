/**
 * Creates a new instance of the Dice class.
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
   * The dice dom element.
   * 
   * @private
   * @type {Element}
   */
  this.m_element;

  /**
   * The dice score.
   * 
   * @private
   * @type {number}
   */
  this.m_amount;

}

//--------------------------------------------------------------------------
// Public methods
//--------------------------------------------------------------------------

/**
 * Returns the score of the dice.
 * 
 * @returns {number}
 */
Dice.prototype.getScore = function () {
  return this.m_amount;
}

/**
 * Creates a li element representing a dice.
 * 
 * @public
 * @returns {Element}
 */
Dice.prototype.generateDice = function () {
  this.m_element = document.createElement("li");
  this.roll();
  return this.m_element;
}

/**
 * Rolls dice.
 * 
 * @public
 * @returns {undefined}
 */
Dice.prototype.roll = function () {
  var sides = [
    "dice-side-one",
    "dice-side-two",
    "dice-side-three",
    "dice-side-four",
    "dice-side-five",
    "dice-side-six",
  ]
  this.m_amount = Math.floor(Math.random() * 6) + 1;
  this.m_element.className = "dice " + sides[this.m_amount - 1];
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