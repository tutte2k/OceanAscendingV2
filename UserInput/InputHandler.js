import UserInterface from "../UserInterface/UserInterface.js";

export default class InputHandler {
  constructor(game) {
    this.game = game;
    if (this.game.level.mode === 4) {
      this.answer = "";
      this.keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-"];
      window.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (this.keys.includes(e.key)) {
          this.answer += e.key;
          UserInterface.Crosshair.innerHTML = this.answer;
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
          UserInterface.Crosshair.innerHTML = "";
        }
        if (game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(game.keys.indexOf(e.key), 1);
        }
      });

      window.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (
          (e.key === "ArrowUp" || e.key === "ArrowDown") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        }
        return false;
      });
      window.addEventListener("keyup", (e) => {});
    } else {
      window.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (this.game.focus) {
          const hit = this.game.focus.consume(e.key);
          if (hit) this.game.player.shootTop();
        } else {
          this.game.focus = this.game.findFocus(e.key);
          if (this.game.focus) {
            const hit = this.game.focus.consume(e.key);
            if (hit) this.game.player.shootTop();
          }
        }
        if (
          (e.key === "ArrowUp" || e.key === "ArrowDown") &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        }
        return false;
      });
      window.addEventListener("keyup", (e) => {
        if (game.keys.indexOf(e.key) > -1) {
          this.game.keys.splice(game.keys.indexOf(e.key), 1);
        }
      });
    }
  }
}
