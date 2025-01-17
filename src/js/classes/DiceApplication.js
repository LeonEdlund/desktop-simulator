/**
 * Creates a new instance of the DiceApplication class.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc - Represents a clock application.
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
// Protected prototype methods
//--------------------------------------------------------------------------

/**
 * Secondary constructor method.
 * 
 * @override
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

  this.m_createWindow();
}

/**
 * Creates the toolbar for the dice application.
 * 
 * @protected
 * @returns {undefined}
 */
DiceApplication.prototype.m_createWindow = function () {
  CustomWindow.prototype.m_createWindow.call(this, "dice-window-wrapper", "dice-menubar-wrapper");

  // Create elements
  var toolbar = document.createElement("div");
  var toolbarUl = document.createElement("ul");
  this.m_toolbarBtns.add = document.createElement("li");
  this.m_toolbarBtns.remove = document.createElement("li");
  this.m_toolbarBtns.roll = document.createElement("li");
  var counterWrapper = document.createElement("li");
  var diceContainer = document.createElement("div");
  var diceUl = document.createElement("ul");

  // add classes
  toolbar.classList.add("dice-toolbar-wrapper");
  this.m_toolbarBtns.add.classList.add("add");
  this.m_toolbarBtns.remove.classList.add("remove");
  this.m_toolbarBtns.roll.classList.add("roll");
  diceContainer.classList.add("dice-content-wrapper");

  // append
  toolbar.appendChild(toolbarUl);
  toolbarUl.append(this.m_toolbarBtns.add, this.m_toolbarBtns.remove, this.m_toolbarBtns.roll, counterWrapper);
  counterWrapper.appendChild(this.m_scoreCounter.getCounter());
  diceContainer.appendChild(diceUl);
  this.m_diceContainer = diceUl;

  // add elements to window
  this.m_element.append(toolbar, diceContainer);
  this.m_addListeners();
}

/**
 * Adds eventlistener. 
 * 
 * @override
 * @protected
 * @returns {undefined}
 */
DiceApplication.prototype.m_addListeners = function () {
  CustomWindow.prototype.m_addListeners.call(this);
  this.m_toolbarBtns.add.addEventListener("click", this.m_insertDice);
  this.m_toolbarBtns.remove.addEventListener("click", this.m_removeLastDice);
  this.m_toolbarBtns.roll.addEventListener("click", this.m_rollAllDice);
  this.m_diceContainer.parentElement.addEventListener("click", this.m_reRollSingleDice);
}

/**
 * Disposes of resources.
 * 
 * @protected
 * @return {undefined}
 */
DiceApplication.prototype.m_dispose = function () {
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