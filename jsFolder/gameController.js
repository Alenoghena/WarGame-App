import Model from "./gameModel.js";
import View from "./gameView.js";

//Declaring the state
let playing = true;

const controller = {

  processGuess(guess) {
    //parseGuess is called here
    console.log(guess);
    let location = this.parseGuess(guess);
    if (location) {
      Model.guesses++;
      //hit below returns true or false from fire function in
      //Model object=> fire returns true or false
      let hit = Model.fire(location);
      //playing becomes false once conditions below are met
      if (this.guesses === Model.trials) {
        View.displayMessage("You loose, try again!");
        playing = false;
      } else if (
        hit &&
        Model.ship1Sunk + Model.ship2Sunk + Model.ship3Sunk === Model.slots
      ) {
        View.displayMessage(
          "You sank all my battleships, in " + this.guesses + " guesses"
        );
        playing = false;
      }
    }
  },

  parseGuess(guess) {
    if (playing === false) return alert("Game has ended.");
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
      alert("Oops, please enter a letter and a number on the board.");
    } else {
      let firstChar = guess.charAt(0).toUpperCase();
      let row = alphabet.indexOf(firstChar);

      let column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board.");
      } else if (
        row < 0 ||
        row >= Model.boardSize ||
        column < 0 ||
        column >= Model.boardSize
      ) {
        alert("Oops, that's off the board!");
      } else {
        return row + column;
      }
    }
    return null;
  },

  handleFireButton() {
    const guessInput = document.getElementById("guessInput");
    //Input is from here
    let guess = guessInput.value;
    console.log(guess);
    controller.processGuess(guess);

    // reset input
    guessInput.value = "";
  },

  handleKeyPress(e) {
    const btn = document.getElementById("fireButton");
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter");
      btn.click();
    }
  },

  init() {
    const btn = document.getElementById("fireButton");
    const guessInput = document.getElementById("guessInput");
    btn.addEventListener("click", this.handleFireButton);

    guessInput.addEventListener("keypress", this.handleKeyPress);
  },

  newGame() {
    const shufflebtn = document.querySelector("#shuffle");
    shufflebtn.addEventListener("click", function () {
      for (let i = 0; i < controller.guesses; i++) {
        let cell = document.getElementById(Model.guessNum[i]);
        View.displayMessage("");
        cell.classList.remove("miss");
        cell.classList.remove("hit");
      }
      Model.generateShipLocations();
    });
  },
};

controller.init();
controller.newGame();
