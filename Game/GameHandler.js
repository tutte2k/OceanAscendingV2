export default class GameHandler {
  constructor(game) {
    this.game = game;
  }
  keyDown(e) {
    const isKeyUpOrDown = e.key === "ArrowUp" || e.key === "ArrowDown";
    if (isKeyUpOrDown && this.game.keys.indexOf(e.key) === -1) {
      this.game.keys.push(e.key);
    }
  }
  keyUp(e) {
    if (this.game.keys.indexOf(e.key) > -1) {
      this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
    }
  }
}
