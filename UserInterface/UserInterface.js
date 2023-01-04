export default class UserInterface {
  static UI = document.getElementById("ui");
  static Mine = document.getElementById("mines");
  static Air = document.getElementById("air");
  static WordsLeft = document.getElementById("wordsLeft");
  static Level = document.getElementById("level");
  static Depth = document.getElementById("depth");
  static Cash = document.getElementById("cash");
  static Crosshair = document.getElementById("crosshair");
  static Message = document.getElementById("message");

  constructor(game) {
    this.game = game;
  }
  draw(context) {
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    UserInterface.Depth.innerHTML = formattedTime;
    UserInterface.Air.innerHTML = this.game.health;
    UserInterface.Mine.innerHTML = this.game.player.ammo;
    UserInterface.Level.innerHTML = this.game.level.name;
    UserInterface.WordsLeft.innerHTML = this.game.words.length;
    UserInterface.Crosshair.innerHTML = (this.game.focus && this.game.focus.text.length != 1) ? this.game.focus.displayText : ''
    if (this.game.gameOver) {
      let message1;
      let message2;
      if (this.game.win) {
        message1 = "You made it!";
        message2 = "Fishing with dynamite is only illegal if someone hears it!";
      } else if (this.game.lose) {
        message1 = "You ran out of air!";
        message2 = "If you can't catch em, flee!";
      }
      UserInterface.Message.innerHTML = message1 + "<br>" + message2
    }
  }
}
