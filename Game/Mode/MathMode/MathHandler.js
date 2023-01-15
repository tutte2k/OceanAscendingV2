import GameHandler from "../../GameHandler.js";

export default class MathHandler extends GameHandler {
  constructor(game) {
    super(game);
    this.answer = "";
    this.keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"];
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (game.gameOver) return;
      if (this.keys.includes(e.key)) {
        this.answer += e.key;
        game.userInterface.elements.crosshair.innerHTML = this.answer;
      }
      if (e.key === "Backspace") {
        this.answer = this.answer.substring(0, this.answer.length - 1);
        game.userInterface.elements.crosshair.innerHTML = this.answer;
      }
      if (e.key === "Enter") {
        const enemy = this.game.enemies.find(
          (enemy) => enemy.text === this.answer
        );
        if (enemy) {
          enemy.die();
          this.game.words.pop();
        }
        this.answer = "";
        game.userInterface.elements.crosshair.innerHTML = "";
      }
    });
  }
}
