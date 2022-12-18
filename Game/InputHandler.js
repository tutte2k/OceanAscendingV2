export default class InputHandler {
  constructor(game) {
    this.game = game;

    window.addEventListener("keydown", (e) => {
      if (this.game.focus) {
        let hit = this.game.focus.consume(e.key);
        if (hit) this.game.player.shootTop();
      } else {
        this.game.focus = this.game.findFocus(e.key);
        if (this.game.focus) {
          let hit = this.game.focus.consume(e.key);
          if (hit) this.game.player.shootTop();
        }
      }
      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(game.keys.indexOf(e.key), 1);
      }
    });
  }
}
