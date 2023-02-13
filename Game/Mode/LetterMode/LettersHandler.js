import GameHandler from "../../GameHandler.js";
import LetterMode from "./LetterMode.js";
export default class LettersHandler extends GameHandler {
  constructor(game) {
    super(game);
  }
  keyDown(e) {
    super.keyDown(e);
    if (this.game.gameOver) return;
    if (this.game.focus) {
      const hit = this.game.focus.consume(e.key);
      if (hit) {
        this.game.player.reward();
      } else if (!LetterMode.Controls.includes(e.key)) {
        {
          this.game.player.penalize();
        }
      }
    } else {
      this.game.focus = this.game.level.mode.findFocus(e.key, this.game);
      if (this.game.focus) {
        const hit = this.game.focus.consume(e.key);
        if (hit) {
          this.game.player.reward();
        } else {
          this.game.player.penalize();
        }
      }
    }
    if (e.key === "Tab" && this.game.focus) {
      this.game.focus.focused = false;
      this.game.focus.completedText = "";
      this.game.focus.displayText = this.game.focus.text;
      this.game.focus = null;
    }
  }
}
