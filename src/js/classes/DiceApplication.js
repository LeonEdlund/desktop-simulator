/**
 * Creates a new instance of a dice application.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc
 * 
 * @constructor
 * @param {number} maxDice - The max number of dice for the application.
 * @param {ScoreCounter} scoreCounter - A score counter object to update and display the score. 
 */
function DiceApplication(maxDice, scoreCounter) {
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
   * Array of all dices.
   * 
   * @private
   * @type {Array}
   */
  this.m_allDice = [];

  /**
   * The DOM element that holds all dices.
   * 
   * @private
   * @type {Element}
   */
  this.m_diceContainer;

  /**
   * The max number of dices the window can handle.
   * 
   * @private
   * @type {number}
   */
  this.m_maxDice = maxDice;

  /**
   * All button elements in the toolbar.
   * 
   * @private
   * @type {Object}
   */
  this.m_toolbarBtns = {
    add: null,
    remove: null,
    roll: null
  };

  /**
 * A score counter.
 * 
 * @private
 * @type {ScoreCounter}
 */
  this.m_scoreCounter = scoreCounter;

  //--------------------------------------------------------------------------
  // Constructor call
  //--------------------------------------------------------------------------

  /**
   * Invokes secondary constructor
   */
  this.m_construct();
}

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------
DiceApplication.prototype = Object.create(CustomWindow.prototype);
DiceApplication.prototype.constructor = DiceApplication;

//--------------------------------------------------------------------------
// Private prototype properties
//--------------------------------------------------------------------------

/**
 * The sound to play when pressing buttons.
 * 
 * @private
 * @type {Audio}
 */
DiceApplication.prototype.m_audio = new Audio("src/wav/add.wav");


//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

/**
 * Disposes of resources.
 * 
 * @public
 * @return {undefined}
 */
DiceApplication.prototype.dispose = function () {
  this.m_toolbarBtns.add.removeEventListener("click", this.m_insertDice);
  this.m_toolbarBtns.remove.removeEventListener("click", this.m_removeLastDice);
  this.m_toolbarBtns.roll.removeEventListener("click", this.m_rollAllDice);
  this.m_diceContainer.parentElement.removeEventListener("click", this.m_reRollSingleDice);

  this.m_scoreCounter.dispose();

  this.m_allDice.forEach(function (dice) {
    dice.delete();
  });

  this.m_allDice = [];
}

//--------------------------------------------------------------------------
// Private prototype methods
//--------------------------------------------------------------------------

/**
 * Secondary constructor method.
 * 
 * @protected
 * @returns {undefined}
 */
DiceApplication.prototype.m_construct = function () {
  CustomWindow.prototype.m_construct.call(this);

  // bind eventlistener functions to this
  this.m_insertDice = this.m_insertDice.bind(this);
  this.m_removeLastDice = this.m_removeLastDice.bind(this);
  this.m_rollAllDice = this.m_rollAllDice.bind(this);
  this.m_reRollSingleDice = this.m_reRollSingleDice.bind(this);

  CustomWindow.prototype.m_createWindow.call(this, "dice-window-wrapper", "dice-menubar-wrapper");
  CustomWindow.prototype.m_addElement.call(this, this.m_createToolbar());
  CustomWindow.prototype.m_addElement.call(this, this.m_createDiceContainer());

  this.m_addEvents();
}

/**
 * Creates the toolbar for the dice application.
 * 
 * @private
 * @returns {Element}
 */
DiceApplication.prototype.m_createToolbar = function () {
  // Create elements
  var toolbar = document.createElement("div");
  var toolbarUl = document.createElement("ul");
  this.m_toolbarBtns.add = document.createElement("li");
  this.m_toolbarBtns.remove = document.createElement("li");
  this.m_toolbarBtns.roll = document.createElement("li");
  var counterWrapper = document.createElement("li");

  // add classes
  toolbar.classList.add("dice-toolbar-wrapper");
  this.m_toolbarBtns.add.classList.add("add");
  this.m_toolbarBtns.remove.classList.add("remove");
  this.m_toolbarBtns.roll.classList.add("roll");

  // append
  toolbar.appendChild(toolbarUl);
  toolbarUl.append(this.m_toolbarBtns.add, this.m_toolbarBtns.remove, this.m_toolbarBtns.roll, counterWrapper);
  counterWrapper.appendChild(this.m_scoreCounter.getCounter());

  return toolbar;
}

/**
 * Creates a div container for dices.
 * 
 * @private
 * @returns {Element}
 */
DiceApplication.prototype.m_createDiceContainer = function () {
  var diceContainer = document.createElement("div");
  var diceUl = document.createElement("ul");

  diceContainer.classList.add("dice-content-wrapper");
  diceContainer.appendChild(diceUl);

  this.m_diceContainer = diceUl;

  return diceContainer;
}

/**
 * Adds eventlistener. 
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_addEvents = function () {
  this.m_toolbarBtns.add.addEventListener("click", this.m_insertDice);
  this.m_toolbarBtns.remove.addEventListener("click", this.m_removeLastDice);
  this.m_toolbarBtns.roll.addEventListener("click", this.m_rollAllDice);
  this.m_diceContainer.parentElement.addEventListener("click", this.m_reRollSingleDice);
}

/**
 * Rolls a individual dice. 
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_reRollSingleDice = function (event) {
  var i = Array.from(this.m_diceContainer.children).indexOf(event.target);
  if (i !== -1) {
    this.m_allDice[i].roll();
    this.m_countScore();
    this.m_playSound();
  }
}

/**
 * Adds a new dice to the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_insertDice = function () {
  if (this.m_allDice.length >= this.m_maxDice) return;

  var dice = new Dice();
  var domDice = dice.generateDice();

  this.m_allDice.push(dice);
  this.m_diceContainer.appendChild(domDice);

  this.m_playSound();
  this.m_countScore();
}

/**
 * Removes a new dice to the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_removeLastDice = function () {
  if (this.m_allDice.length <= 0) return;

  var removedDice = this.m_allDice.pop();
  removedDice.delete();

  this.m_playSound();
  this.m_countScore();
}

/**
 * Rerolls all dices in the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_rollAllDice = function () {
  if (this.m_allDice.length <= 0) return;

  this.m_allDice.forEach(function (dice) {
    dice.roll();
  });

  this.m_playSound();
  this.m_countScore();
}

/**
 * Counts and updates the score.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_countScore = function () {
  var score = 0;

  this.m_allDice.forEach(function (dice) {
    score += dice.getScore();
  });

  this.m_scoreCounter.updateCounter(score);
}

/**
 * Plays sound.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_playSound = function () {
  this.m_audio.play();
}