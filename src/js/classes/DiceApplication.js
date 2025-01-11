/**
 * Creates a new instance of a dice application.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc
 * 
 * @constructor
 * @param {number} maxDice - The max number of dice for the application.
 */
function DiceApplication(maxDice) {
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
 * Individual counter li elements.
 * 
 * @private
 * @type {Array}
 */
  this.m_counterNumbers = this.m_numbers = [
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
  ];

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
 * @static
 * @private
 * @type {Audio}
 */
DiceApplication.prototype.m_audio = new Audio("/src/wav/add.wav");


//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

DiceApplication.prototype.dispose = function () {
  this.m_toolbarBtns.add.removeEventListener("click", this.m_insertDice);
  this.m_toolbarBtns.remove.removeEventListener("click", this.m_removeLastDice);
  this.m_toolbarBtns.roll.removeEventListener("click", this.m_rollAllDice);

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
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_construct = function () {
  // bind eventlistener functions to this
  this.m_insertDice = this.m_insertDice.bind(this);
  this.m_removeLastDice = this.m_removeLastDice.bind(this);
  this.m_rollAllDice = this.m_rollAllDice.bind(this);

  CustomWindow.prototype.m_createWindow.call(this, "dice-window-wrapper", "dice-menubar-wrapper");
  CustomWindow.prototype.m_addElement.call(this, this.m_createToolbar());
  CustomWindow.prototype.m_addElement.call(this, this.m_createDiceContainer());
}

/**
 * Creates the toolbar for the dice application.
 * 
 * @private
 * @returns {Element}
 */
DiceApplication.prototype.m_createToolbar = function () {
  var self = this;
  // Create elements
  var toolbar = document.createElement("div");
  var toolbarUl = document.createElement("ul");
  this.m_toolbarBtns.add = document.createElement("li");
  this.m_toolbarBtns.remove = document.createElement("li");
  this.m_toolbarBtns.roll = document.createElement("li");
  var counterWrapper = document.createElement("li");
  var counterLiWrapper = document.createElement("ul");


  // add classes
  toolbar.classList.add("dice-toolbar-wrapper");
  this.m_toolbarBtns.add.classList.add("add");
  this.m_toolbarBtns.remove.classList.add("remove");
  this.m_toolbarBtns.roll.classList.add("roll");
  counterLiWrapper.className = "dice-toolbar-counter-wrapper";


  // append
  toolbar.appendChild(toolbarUl);
  toolbarUl.appendChild(this.m_toolbarBtns.add);
  toolbarUl.appendChild(this.m_toolbarBtns.remove);
  toolbarUl.appendChild(this.m_toolbarBtns.roll);
  toolbarUl.appendChild(counterWrapper);
  counterWrapper.appendChild(counterLiWrapper);
  this.m_numbers.forEach(function (number) {
    counterLiWrapper.appendChild(number);
  });

  // Add eventlistener
  this.m_addToolbarListeners();

  return toolbar;
}

/**
 * Adds eventlistener to toolbar buttons. 
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_addToolbarListeners = function () {
  this.m_toolbarBtns.add.addEventListener("click", this.m_insertDice);
  this.m_toolbarBtns.remove.addEventListener("click", this.m_removeLastDice);
  this.m_toolbarBtns.roll.addEventListener("click", this.m_rollAllDice);
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
 * Adds a new dice to the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_insertDice = function () {
  if (this.m_allDice.length >= this.m_maxDice) return;

  var dice = new Dice();
  var domDice = dice.generateDice();

  domDice.addEventListener("click", function () {
    dice.roll();
    this.m_countScore();
  }.bind(this));

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

  this.m_countScore();
  this.m_playSound();
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

  this.m_countScore();
  this.m_playSound();
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

  this.m_updateCounter(score);
}

/**
 * Updates the CSS classname for each counter digit.
 * 
 * @public
 * @param {number} score - The score.  
 * @returns {undefined}
 */
DiceApplication.prototype.m_updateCounter = function (score) {
  var self = this;
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
  var scoreAsStr = score.toString().padStart(5, "0");

  for (var i = 0; i < scoreAsStr.length; i++) {
    self.m_counterNumbers[i].className = classNames[parseInt(scoreAsStr[i], 10)];
  }
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