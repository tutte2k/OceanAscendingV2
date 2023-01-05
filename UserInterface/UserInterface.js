import FloatingMessage from "./FloatingMessage.js";
import Particle from "../Environment/Particle.js";

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
  static Info = document.getElementById("info");
  static Score = document.getElementById("score");

  constructor(game) {
    this.game = game;
  }
  draw(context) {
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);

    UserInterface.Depth.innerHTML = formattedTime;
    UserInterface.Air.innerHTML = this.game.player.air;
    UserInterface.Mine.innerHTML = this.game.player.ammo;
    UserInterface.Level.innerHTML = this.game.level.name;
    UserInterface.WordsLeft.innerHTML = this.game.words.length;
    UserInterface.Crosshair.innerHTML =
      this.game.focus && this.game.focus.text.length != 1
        ? this.game.focus.displayText
        : "";
    UserInterface.Score.innerHTML = this.game.score;

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
      UserInterface.Message.innerHTML = message1 + "<br>" + message2;
    }
  }
  displayPlayerDamage() {
    for (let i = 0; i < 5; i++) {
      this.game.particles.push(
        new Particle(
          this,
          this.game.player.x + this.game.player.width * 0.8,
          this.game.player.y + this.game.player.height * 0.2
        )
      );
    }
    this.game.floatingMessages.push(
      new FloatingMessage(
        "-" + 1,
        this.game.player.x + this.game.player.width * 0.8,
        this.game.player.y + this.game.player.height * 0.2,
        "red",
        45
      )
    );
  }
  displayEarnedCash(earnedCash) {
    this.game.floatingMessages.push(
      new FloatingMessage(
        `$${earnedCash}`,
        this.game.width * 0.9,
        this.game.height * 0.5,
        "green",
        100
      )
    );
  }
  displayMissedKey(key) {
    this.game.floatingMessages.push(
      new FloatingMessage(
        key,
        this.game.player.x + this.game.player.width * 0.8,
        this.game.player.y + this.game.player.height * 0.2,
        "white ",
        45
      )
    );
  }
  displayScoreMessage(enemy) {
    this.game.floatingMessages.push(
      new FloatingMessage(
        "+" + enemy.score,
        enemy.x + enemy.width * 0.5,
        enemy.y + enemy.height * 0.5,
        "yellow",
        45
      )
    );
  }
}
