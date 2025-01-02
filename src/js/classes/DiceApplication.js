//--------------------------------------------------------------------------
// Constructor scope
//--------------------------------------------------------------------------

/**
 * Creates a new instance of a dice application.
 * 
 * @class
 * @extends {CustomWindow}
 * @classdesc
 * 
 * @constructor
 * @param {number} maxDice - The max number of dice for the application.
 * @param {ScoreCounter} counter - The score counter object.
 */
function DiceApplication(maxDice, counter) {
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
   * The score counter object.
   * 
   * @private
   * @type {ScoreCounter}
   */
  this.m_counter = counter;

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
// Static properties
//--------------------------------------------------------------------------

/**
 * The sound to play when pressing buttons.
 * 
 * @static
 * @private
 * @type {Audio}
 */
DiceApplication.m_audio = new Audio("/src/wav/add.wav");


//--------------------------------------------------------------------------
// Public prototype methods
//--------------------------------------------------------------------------

DiceApplication.prototype.dispose = function () {
  this.m_allDice.forEach(function (dice) {
    dice.delete();
  });
  this.m_counter = null;
  this.m_diceContainer = null;
  console.log("disposed");
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
  this.m_createWindow("dice-window-wrapper", "dice-menubar-wrapper");
  var toolbar = this.m_addToolbar();
  this.m_addElement(toolbar);
  this.m_addElement(this.m_createDiceContainer());
}

/**
 * Creates the toolbar for the dice application.
 * 
 * @private
 * @returns {Element}
 */
DiceApplication.prototype.m_addToolbar = function () {
  // Create elements
  var toolbar = document.createElement("div");
  var toolbarUl = document.createElement("ul");
  var add = document.createElement("li");
  var remove = document.createElement("li");
  var roll = document.createElement("li");
  var counterWrapper = document.createElement("li");


  // add classes
  toolbar.classList.add("dice-toolbar-wrapper");
  add.classList.add("add");
  remove.classList.add("remove");
  roll.classList.add("roll");


  // append
  toolbar.appendChild(toolbarUl);
  toolbarUl.appendChild(add);
  toolbarUl.appendChild(remove);
  toolbarUl.appendChild(roll);
  toolbarUl.appendChild(counterWrapper);
  counterWrapper.appendChild(this.m_counter.getCounter());

  // Add eventlistener
  this.m_addToolbarListeners(add, remove, roll);

  return toolbar;
}

/**
 * Creates a div container for dices.
 * 
 * @private
 * 
 * @param {Element} addBtn - Add dice button.
 * @param {Element} removeBtn - Remove dice button.
 * @param {Element} rollBtn - Roll dice button.
 * 
 * @returns {undefined}
 */
DiceApplication.prototype.m_addToolbarListeners = function (addBtn, removeBtn, rollBtn) {
  addBtn.addEventListener("click", this._insertDice.bind(this));
  removeBtn.addEventListener("click", this._removeDice.bind(this));
  rollBtn.addEventListener("click", this._rollAllDice.bind(this));
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

  this.m_diceContainer = diceUl
  return diceContainer;
}

/**
 * Adds a new dice to the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype._insertDice = function () {
  if (this.m_allDice.length >= this.m_maxDice) return;
  // Create dice and Dom element
  var dice = new Dice();
  var domDice = dice.generateDice();
  this.m_addDiceListener(dice, domDice);

  this.m_allDice.push(dice);
  this.m_diceContainer.appendChild(domDice);

  DiceApplication.m_audio.play();
  this._countScore();
}

/**
 * Adds eventListeners too the dice to reroll dice.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype.m_addDiceListener = function (dice, domDice) {
  var self = this;

  domDice.addEventListener("click", function () {
    dice.roll();
    var newDice = dice.generateDice();

    self.m_addDiceListener(dice, newDice);
    self.m_diceContainer.replaceChild(newDice, domDice);

    DiceApplication.m_audio.play();
    self._countScore();
  });
}

/**
 * Removes a new dice to the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype._removeDice = function () {
  if (this.m_allDice.length <= 0) return;
  var removedDice = this.m_allDice.pop();
  removedDice.delete();
  this._countScore();
  DiceApplication.m_audio.play();
}

/**
 * Rerolls all dices in the dice container.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype._rollAllDice = function () {
  if (this.m_allDice.length <= 0) return;

  var self = this;
  var nrOfDice = this.m_allDice.length;
  this.m_allDice = [];

  DiceApplication.m_audio.play();

  self.m_diceContainer.innerHTML = "";
  for (var i = 0; i < nrOfDice; i++) {
    self._insertDice();
  }
}

/**
 * Counts and updates the score.
 * 
 * @private
 * @returns {undefined}
 */
DiceApplication.prototype._countScore = function () {
  var score = 0;
  this.m_allDice.forEach(function (dice) {
    score += dice.getScore();
  });
  this.m_counter.updateCounter(score);
}