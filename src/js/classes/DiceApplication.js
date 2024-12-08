function DiceApplication(maxDice) {
  Window.call(this);

  this._addBtn;
  this._removeBtn;
  this._rollBtn;
  this._diceContainer;
  this._allDice = [];
  this._maxDice = maxDice;
  this._counter = new Counter();

  this.createWindow("dice-window-wrapper", "dice-menubar-wrapper");
  this._addToolbar();
}

DiceApplication.prototype = Object.create(Window.prototype);
DiceApplication.prototype.constructor = DiceApplication;

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

  this._addBtn = add;
  this._removeBtn = remove;
  this._rollBtn = roll;
  this._diceContainer = diceContainer;
  this._addToolbarListeners();

  this.element.appendChild(toolbar);
  this.element.appendChild(diceContainer);
}

DiceApplication.prototype._addToolbarListeners = function () {
  this._addBtn.addEventListener("click", this._insertDice.bind(this));
  this._removeBtn.addEventListener("click", this._removeDice.bind(this));
  this._rollBtn.addEventListener("click", this._rollAllDice.bind(this));
}

DiceApplication.prototype._insertDice = function () {
  if (this._allDice.length >= this._maxDice) return;

  var dice = new Dice();
  this._allDice.push(dice);

  this._diceContainer.appendChild(dice.generateDice());
  this._countScore();
}

DiceApplication.prototype._removeDice = function () {
  if (this._allDice.length <= 0) return;

  var removedDice = this._allDice.pop();
  removedDice.delete();
  this._countScore();
}

DiceApplication.prototype._rollAllDice = function () {
  if (this._allDice.length <= 0) return;

  var self = this;
  var nrOfDice = this._allDice.length;
  this._allDice = [];
  self._diceContainer.innerHTML = "";

  for (let i = 0; i < nrOfDice; i++) {
    self._insertDice();
  }
}

DiceApplication.prototype._countScore = function () {
  this._count = 0;
  this._allDice.forEach(dice => {
    this._count += dice.amount;
  });
  this._counter.updateCounter(this._count);
}