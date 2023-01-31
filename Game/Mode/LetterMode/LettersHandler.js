import Global from "../../../Utils/Global.js";
import GameHandler from "../../GameHandler.js";
export default class LettersHandler extends GameHandler {
  constructor(game) {
    super(game);
  }
  keyDown(e) {
    super.keyDown(e);
    if (this.game.gameOver) return;
    if (this.game.focus) {
      const hit = this.game.focus.consume(e.key);
      hit ? this.game.player.shootTop() : Global.Shaker.startShake(20);
    } else {
      this.game.focus = this.game.level.mode.findFocus(e.key, this.game);
      if (this.game.focus) {
        const hit = this.game.focus.consume(e.key);
        hit ? this.game.player.shootTop() : Global.Shaker.startShake(20);
      }
    }
  }
}
