function Document() {
  var _diceBtn = document.getElementById("icon-dice");
  var _clockBtn = document.getElementById("icon-clock");

  _diceBtn.addEventListener("click", this.openDiceWindow);
  _clockBtn.addEventListener("click", this.openClockWindow);
}

Document.prototype.openDiceWindow = function () {
  var diceWindow = new DiceApplication(40);
  diceWindow.appendTo(document.getElementById("page-content-wrapper"));
}

Document.prototype.openClockWindow = function () {
  var clockWindow = new ClockApplication();
  clockWindow.appendTo(document.getElementById("page-content-wrapper"));
}