import Model from "./gameModel.js";

class View {
  displayMessage(msg) {
    const message2 = document.querySelector(".message2");
    const message1 = document.querySelector(".message1");
    if (
      Model.guesses === Model.trials ||
      Model.ship1Sunk + Model.ship2Sunk + Model.ship3Sunk === Model.slots
    ) {
      message2.classList.remove("hidden");
      message1.classList.add("hidden");
      message2.textContent = msg;
    } else {
      message1.classList.remove("hidden");
      message2.classList.add("hidden");
      message1.textContent = msg;
    }
    // return displayMessage;
  }

  displayHit(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
    this.displayMessage("You Hit");
  }

  displayMiss(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
    this.displayMessage("You missed");
    console.log(cell);
  }
}

export default new View();
