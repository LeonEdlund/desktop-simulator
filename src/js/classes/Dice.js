//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * @class
 * @classdesc - Represents a dice
 * @constructor - Creates a dice
 */
function Dice() {
  //--------------------------------------------------------------------------
  // Private methods
  //--------------------------------------------------------------------------

  /**
   * The dice dom element.
   * 
   * @type {Element}
   * @private
   */
  this.m_element;

  /**
   * The dice score.
   * 
   * @type {number}
   * @private
   */
  this.m_amount = 1;

  this.m_className;

  this.roll();
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
Dice.m_sides = {
  1: "dice-side-one",
  2: "dice-side-two",
  3: "dice-side-three",
  4: "dice-side-four",
  5: "dice-side-five",
  6: "dice-side-six",
}

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
  var diceLi = document.createElement("li");
  diceLi.classList.add("dice");

  this.m_className = Dice.m_sides[this.m_amount]
  diceLi.classList.add(this.m_className);

  this.m_element = diceLi;

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
}

/**
 * removes dice from DOM.
 * 
 * @public
 * @returns {undefined}
 */
Dice.prototype.delete = function () {
  this.m_element.remove();
}