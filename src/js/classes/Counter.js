function Counter() {
  this.element = document.createElement("ul");
  this.counterLi = document.createElement("li");
  this._numbers = [
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
    document.createElement("li"),
  ]

  this.counterLi.className = "dice-toolbar-counter-wrapper";

  Object.values(this._numbers).forEach(number => {
    this.counterLi.appendChild(number);
  });
  this.element.appendChild(this.counterLi);
}

Counter.prototype.getCounter = function () {
  return this.element;
}

Counter.prototype.updateCounter = function (score) {
  var self = this;
  score = score.toString().padStart(5, "0");

  for (let i = 0; i < score.length; i++) {
    self._numbers[i].className = self._getNumberClass(score[i]);
  }
}

Counter.prototype._getNumberClass = function (number) {
  if (number > 9) {
    throw ("number needs to be between 0 - 9");
  }

  var classNames = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine"
  }

  return classNames[number];
}

Counter.prototype.appendTo = function (parent) {
  parent.appendChild(this.element);
}
