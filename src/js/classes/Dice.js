function Dice() {
  this._element;
  this._amount = Math.floor(Math.random() * 6) + 1;
}

Dice.sides = {
  1: "dice-side-one",
  2: "dice-side-two",
  3: "dice-side-three",
  4: "dice-side-four",
  5: "dice-side-five",
  6: "dice-side-six",
}

Dice.prototype.getScore = function () {
  return this._amount;
}

Dice.prototype.generateDice = function () {
  var diceLi = document.createElement("li");
  diceLi.classList.add("dice");
  diceLi.classList.add(Dice.sides[this._amount]);
  this._element = diceLi;
  return diceLi;
}

Dice.prototype.delete = function () {
  this._element.remove();
}