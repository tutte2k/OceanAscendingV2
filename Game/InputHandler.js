export default class InputHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (e) => {
      if (this.game.focus) {
        let hit = this.game.focus.consume(e.key);
      } else {
        this.game.focus = this.game.findFocus(e.key);
        if (this.game.focus) {
          let hit = this.game.focus.consume(e.key);
        }
      }

      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
      } else if (e.key === "ArrowRight") {
        this.game.player.shootTop();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(game.keys.indexOf(e.key), 1);
      }
    });
  }
}
