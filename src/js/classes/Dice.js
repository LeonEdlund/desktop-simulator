function Dice() {
  this.element;
  this.amount = Math.floor(Math.random() * 6) + 1;
}

Dice.prototype.generateDice = function () {
  var diceLi = document.createElement("li");
  diceLi.classList.add("dice");

  var sides = {
    1: "dice-side-one",
    2: "dice-side-two",
    3: "dice-side-three",
    4: "dice-side-four",
    5: "dice-side-five",
    6: "dice-side-six",
  }

  diceLi.classList.add(sides[this.amount]);
  // diceLi.addEventListener("click", this.roll.bind(this));

  this.element = diceLi;
  return diceLi;
}


Dice.prototype.delete = function () {
  this.element.remove();
}

// Dice.prototype.appendTo = function (parent) {
//   parent.appendChild(this.element);
// }

// Dice.prototype.roll = function () {
//   console.log("roll");
//   this.amount = Math.floor(Math.random() * 6) + 1;
//   this.generateDice();
// }