const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this._vPosition = 0;
    this._hPosition = 0;
  }

  get field() {
    return this._field;
  }

  getIndex(char) {
    for (let i = 0; i < this.field.length; i++) {
      let index = this.field[i].lastIndexOf(char);
      if (index > -1) {
        return [i, index];
      }
    }
  }

  print() {
    this.field.forEach((elem) => console.log(...elem));
  }

  isWinner() {
    if (this.field[this._vPosition][this._hPosition] === hat) {
      return true;
    }
    return false;
  }

  isHole() {
    if (this.field[this._vPosition][this._hPosition] === hole) {
      return true;
    }
    return false;
  }

  startGame() {
    let out = false;
    while (!out) {
      let input = prompt("Which way would you like to move?");
      //let input = "u";
      switch (input) {
        case "u":
          this._vPosition -= 1;
          if (this._vPosition < 0) {
            console.log("You step out of boundaries");
            out = true;
            break;
          } else if (this.isWinner()) {
            console.log("You win!");
            out = true;
            break;
          } else if (this.isHole()) {
            console.log("You fell down a hole :(");
            out = true;
            break;
          }
          this.field[this._vPosition][this._hPosition] = pathCharacter;
          this.print();
          break;
        case "d":
          this._vPosition += 1;
          if (this._vPosition >= this.field.length) {
            console.log("You step out of boundaries");
            out = true;
            break;
          } else if (this.isWinner()) {
            console.log("You win!");
            out = true;
            break;
          } else if (this.isHole()) {
            console.log("You fell down a hole :(");
            out = true;
            break;
          }
          this.field[this._vPosition][this._hPosition] = pathCharacter;
          this.print();
          break;
        case "r":
          this._hPosition += 1;
          if (this._hPosition >= this._field[0].length) {
            console.log("You step out of boundaries");
            out = true;
            break;
          } else if (this.isWinner()) {
            console.log("You win!");
            out = true;
            break;
          } else if (this.isHole()) {
            console.log("You fell down a hole :(");
            out = true;
            break;
          }
          this.field[this._vPosition][this._hPosition] = pathCharacter;
          this.print();
          break;
        case "l":
          this._hPosition -= 1;
          if (this._hPosition < 0) {
            console.log("You step out of boundaries");
            out = true;
            break;
          } else if (this.isWinner()) {
            console.log("You win!");
            out = true;
            break;
          } else if (this.isHole()) {
            console.log("You fell down a hole :(");
            out = true;
            break;
          }
          this.field[this._vPosition][this._hPosition] = pathCharacter;
          this.print();
          break;
      }
    }
  }

  static generatePosition(h, w) {
    return [
      Math.ceil(Math.random() * (h - 1)),
      Math.ceil(Math.random() * (w - 1)),
    ];
  }

  static generateField(hField, wField, pctField) {
    let newField = [];
    let maxHoles = Math.round(((hField * wField - 2) * pctField) / 100);
    let newHatPosition = this.generatePosition(hField, wField);
    let newHolePosition = this.generatePosition(hField, wField);

    if (maxHoles === 0) {
      maxHoles = 1;
    }

    for (let j = 0; j < hField; j++) {
      newField.push([fieldCharacter]);
      for (let i = 0; i < wField - 1; i++) {
        newField[j].push(fieldCharacter);
      }
    }
    newField[0][0] = pathCharacter;
    newField[newHatPosition[0]][newHatPosition[1]] = hat;

    for (let holes = 0; holes <= maxHoles; holes++) {
      if (
        newField[newHolePosition[0]][newHolePosition[1]] !== pathCharacter &&
        newField[newHolePosition[0]][newHolePosition[1]] !== hat
      ) {
        newField[newHolePosition[0]][newHolePosition[1]] = hole;
      }
      newHolePosition = this.generatePosition(hField, wField);
    }
    return newField;
  }
}

let field = Field.generateField(
  Math.ceil(Math.random() * 10),
  Math.ceil(Math.random() * 10),
  Math.ceil(Math.random() * 50)
);
const myField = new Field(field);

myField.print();
console.log("You can move up(u), down(d), right(r) or left(l)");
myField.startGame();