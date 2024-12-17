// singleton (Can only have one instance and only exposes the instance and nothing else)
var App = (function () {
  function App() {
    this.windowFactory = new WindowFactory();
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

  return {
    getInstance: function () {
      if (App._instance === undefined) {
        App._instance = new App();
      }
      return App._instance;
    }
  }
})();

