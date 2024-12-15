function WindowFactory() { }

WindowFactory.prototype.createWindow = function (type) {
  var window;

  if (type === "clock") {
    window = new ClockApplication();
  } else if (type === "dice") {
    window = new DiceApplication(40, new Counter());
  }

  return window;
}

