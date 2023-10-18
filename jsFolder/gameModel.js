import View from "./gameView.js";

class Model {
  trials = 48;
  guesses = 0;
  guessNum = [];
  boardSize = 7;
  slots = 9;
  numShips = 3;
  shipLength = 3;
  ship1Sunk = 0;
  ship2Sunk = 0;
  ship3Sunk = 0;
  ship1 = { locations: [], hits: [] };
  ship2 = { locations: [], hits: [] };
  ship3 = { locations: [], hits: [] };

  fire(guess) {
    this.guessNum.push(guess);
    let ship01 = this.ship1.locations;
    let ship02 = this.ship2.locations;
    let ship03 = this.ship3.locations;
    let locations = [...ship01, ...ship02, ...ship03];
    console.log(ship01);
    console.log(ship02);
    console.log(ship03);
    for (let i = 0; i < this.slots; i++) {
      let index = locations.indexOf(guess);
      console.log(index);
      if (index >= 0 && index <= 2) {
        View.displayHit(guess);
        this.ship1.hits.push("hit");
        this.ship1Sunk++;
        if (this.ship1Sunk > 2) {
          View.displayMessage("You sank ship1 battleship!");
        }
        return true;
      } else if (index > 2 && index <= 5) {
        View.displayHit(guess);
        this.ship2.hits.push("hit");
        this.ship2Sunk++;

        if (this.ship2Sunk > 2) {
          View.displayMessage("You sank ship2 battleship!");
        }
        return true;
      } else if (index > 5 && index <= 8) {
        View.displayHit(guess);
        this.ship3.hits.push("hit");
        this.ship3Sunk++;

        if (this.ship3Sunk > 2) {
          View.displayMessage("You sank ship3 battleship!");
        }
        return true;
      } else {
        View.displayMiss(guess);
        return false;
      }
    }
  }

  generateShipLocations() {
    let coord;
    for (let i = 0; i < this.numShips; i++) {
      do {
        coord = this.generateShip();
        console.log(coord);
      } while (this.collision(coord));
      if (i === 1) {
        //Using spread operator
        this.ship1.locations.push(...coord);
      } else if (i === 2) {
        this.ship2.locations.push(...coord);
      } else {
        this.ship3.locations.push(...coord);
      }
    }
    console.log("Ships array: ");
    console.log(
      this.ship1.locations,
      this.ship2.locations,
      this.ship3.locations
    );
  }

  generateShip() {
    let direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      // horizontal
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      // vertical
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        //horizontal
        newShipLocations.push(row + "" + (col + i));
      } else {
        //vertical
        newShipLocations.push(row + i + "" + col);
      }
    }
    return newShipLocations;
  }

  collision(locations) {
    for (let i = 0; i < this.numShips; i++) {
      let ship1 = this.ship1;
      let ship2 = this.ship2;
      let ship3 = this.ship3;
      for (let j = 0; j < locations.length; j++) {
        if (
          ship1.locations.indexOf(locations[j]) >= 0 ||
          ship2.locations.indexOf(locations[j]) >= 0 ||
          ship3.locations.indexOf(locations[j]) >= 0
        ) {
          return true;
        }
      }
    }
    return false;
  }
}

export default new Model();
