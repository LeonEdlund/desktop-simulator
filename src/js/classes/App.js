function App() {
  this.name = "Webbteknik 5 - assignment";
  this.windowFactory = new WindowFactory();
}

App.prototype.start = function () {
  var _diceBtn = document.getElementById("icon-dice");
  var _clockBtn = document.getElementById("icon-clock");

  _diceBtn.addEventListener("click", this.openDiceWindow.bind(this));
  _clockBtn.addEventListener("click", this.openClockWindow.bind(this));
}

App.prototype.openDiceWindow = function () {
  var diceWindow = this.windowFactory.createWindow("dice");
  diceWindow.appendTo(document.getElementById("page-content-wrapper"));
}

App.prototype.openClockWindow = function () {
  var clockWindow = this.windowFactory.createWindow("clock");
  clockWindow.appendTo(document.getElementById("page-content-wrapper"));
}

