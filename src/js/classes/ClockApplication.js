function ClockApplication() {
  Window.call(this);
  this.currentTime = {
    hour: "00",
    minutes: "00",
    seconds: "00",
  }

  this.createWindow("clock-window-wrapper", "clock-menubar-wrapper");
  this._clockContainer = document.createElement("div");
  this._clockContainer.className = "clock-content-wrapper";

  this._hourDigits = this._createDigits("hour");
  this._minutesDigits = this._createDigits("minute");
  this._secondsDigits = this._createDigits("second");

  this._clockContainer.appendChild(this._hourDigits);
  this._clockContainer.appendChild(this._minutesDigits);
  this._clockContainer.appendChild(this._secondsDigits);
  this.element.appendChild(this._clockContainer);

  this.updateClock();
  setInterval(this.updateClock.bind(this), 1000);
}

ClockApplication.prototype = Object.create(Window.prototype);
ClockApplication.prototype.constructor = ClockApplication;

ClockApplication.prototype.updateClock = function () {
  this.updateTime();
  this.renderClock();
}
ClockApplication.prototype.updateTime = function () {
  var now = new Date();
  this.currentTime = {
    hour: now.getHours().toString().padStart(2, "0"),
    minutes: now.getMinutes().toString().padStart(2, "0"),
    seconds: now.getSeconds().toString().padStart(2, "0"),
  }
}

ClockApplication.prototype.renderClock = function () {
  var hour = this.currentTime.hour;
  var minutes = this.currentTime.minutes;
  var seconds = this.currentTime.seconds;

  this._updateDigits(this._hourDigits, hour[0], hour[1]);
  this._updateDigits(this._minutesDigits, minutes[0], minutes[1]);
  this._updateDigits(this._secondsDigits, seconds.toString()[0], seconds[1]);
}

ClockApplication.prototype._createDigits = function (unitClass) {
  var ul = document.createElement("ul");
  var digitOne = document.createElement("li");
  var digitTwo = document.createElement("li");

  ul.classList.add("clock-digit-wrapper", unitClass);
  digitOne.className = "clock-digit-zero";
  digitTwo.className = "clock-digit-zero";

  ul.appendChild(digitOne);
  ul.appendChild(digitTwo);

  return ul;
}

ClockApplication.prototype._updateDigits = function (element, digitOne, digitTwo) {
  var digits = element.querySelectorAll("li");
  digits[0].classList = this._getNumberClass(digitOne);
  digits[1].classList = this._getNumberClass(digitTwo);
}

ClockApplication.prototype._getNumberClass = function (number) {
  var classNames = {
    0: "clock-digit-zero",
    1: "clock-digit-one",
    2: "clock-digit-two",
    3: "clock-digit-three",
    4: "clock-digit-four",
    5: "clock-digit-five",
    6: "clock-digit-six",
    7: "clock-digit-seven",
    8: "clock-digit-eight",
    9: "clock-digit-nine"
  };
  return classNames[number];
}