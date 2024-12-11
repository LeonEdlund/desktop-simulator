function WindowFactory() { }

WindowFactory.prototype.createWindow = function (type) {
  if (type === "clock") {
    return new ClockApplication();
  } else if (type === "dice") {
    return new DiceApplication(40);
  }
}

