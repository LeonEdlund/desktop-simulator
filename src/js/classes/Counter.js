function Counter() {
  var self = this;
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

  this._numbers.forEach(function (number) {
    self.counterLi.appendChild(number);
  });

  this.element.appendChild(this.counterLi);
}

Counter.classNames = {
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

Counter.prototype.getCounter = function () {
  return this.element;
}

Counter.prototype.updateCounter = function (score) {
  var self = this;
  score = score.toString().padStart(5, "0");

  for (var i = 0; i < score.length; i++) {
    self._numbers[i].className = Counter.classNames[score[i]];
  }
}

Counter.prototype.appendTo = function (parent) {
  parent.appendChild(this.element);
}
