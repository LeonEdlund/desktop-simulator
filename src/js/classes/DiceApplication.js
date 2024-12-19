function DiceApplication(maxDice, counter) {
  Window.call(this);

  this._diceContainer;
  this._allDice = [];
  this._maxDice = maxDice;
  this._counter = counter;

  this.createWindow("dice-window-wrapper", "dice-menubar-wrapper");
  this._addToolbar();
}

// Extends Window
DiceApplication.prototype = Object.create(Window.prototype);
DiceApplication.prototype.constructor = DiceApplication;

// Static variables
DiceApplication.audio = new Audio("/src/wav/add.wav");

DiceApplication.prototype._addToolbar = function () {
  var toolbar = document.createElement("div");
  var toolbarUl = document.createElement("ul");
  var add = document.createElement("li");
  var remove = document.createElement("li");
  var roll = document.createElement("li");
  var counterWrapper = document.createElement("li");
  var diceContainer = document.createElement("div");
  var diceUl = document.createElement("ul");

  toolbar.classList.add("dice-toolbar-wrapper");
  add.classList.add("add");
  remove.classList.add("remove");
  roll.classList.add("roll");
  diceContainer.classList.add("dice-content-wrapper");

  toolbar.appendChild(toolbarUl);
  toolbarUl.appendChild(add);
  toolbarUl.appendChild(remove);
  toolbarUl.appendChild(roll);
  toolbarUl.appendChild(counterWrapper);
  counterWrapper.appendChild(this._counter.getCounter());
  diceContainer.appendChild(diceUl);
  this.element.appendChild(toolbar);
  this.element.appendChild(diceContainer);

  this._diceContainer = diceContainer;

  this._addToolbarListeners(add, remove, roll);
}

DiceApplication.prototype._addToolbarListeners = function (addBtn, removeBtn, rollBtn) {
  addBtn.addEventListener("click", this._insertDice.bind(this));
  removeBtn.addEventListener("click", this._removeDice.bind(this));
  rollBtn.addEventListener("click", this._rollAllDice.bind(this));
}

DiceApplication.prototype._insertDice = function () {
  if (this._allDice.length >= this._maxDice) return;
  var dice = new Dice();
  this._allDice.push(dice);

  this._diceContainer.appendChild(dice.generateDice());
  this._countScore();
  DiceApplication.audio.play();
}

DiceApplication.prototype._removeDice = function () {
  if (this._allDice.length <= 0) return;
  var removedDice = this._allDice.pop();
  removedDice.delete();
  this._countScore();
  DiceApplication.audio.play();
}

DiceApplication.prototype._rollAllDice = function () {
  if (this._allDice.length <= 0) return;

  var self = this;
  var nrOfDice = this._allDice.length;
  this._allDice = [];

  DiceApplication.audio.play();

  self._diceContainer.innerHTML = "";
  for (var i = 0; i < nrOfDice; i++) {
    self._insertDice();
  }
}

DiceApplication.prototype._countScore = function () {
  var score = 0;
  this._allDice.forEach(function (dice) {
    score += dice.getScore();
  });
  this._counter.updateCounter(score);
}