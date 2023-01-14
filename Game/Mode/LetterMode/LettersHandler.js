import GameHandler from "../../GameHandler.js";
export default class LettersHandler extends GameHandler {
  constructor(game) {
    super(game);
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
    });
  }
}
