export default class GameHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      const isKeyUpOrDown = e.key === "ArrowUp" || e.key === "ArrowDown";
      e.preventDefault();
      if (isKeyUpOrDown && this.game.keys.indexOf(e.key) === -1) {
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
