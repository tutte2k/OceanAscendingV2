import FloatingMessage from "./Environment/FloatingMessage.js";
export default class GameInterface {
  constructor(game) {
    this.elements = {
      wordContainer: document.getElementById("words"),
      hud: document.getElementById("ui"),
      mine: document.getElementById("mines"),
      air: document.getElementById("air"),
      wordsLeft: document.getElementById("wordsLeft"),
      level: document.getElementById("level"),
      depth: document.getElementById("depth"),
      crosshair: document.getElementById("crosshair"),
      message: document.getElementById("message"),
      score: document.getElementById("score"),
    };
    this.elements.hud.classList.remove("invisible");
    this.game = game;
  }
  draw() {
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    this.elements.depth.innerHTML = formattedTime;
    this.elements.air.innerHTML = this.game.player.air;
    this.elements.mine.innerHTML = this.game.player.ammo;
    this.elements.level.innerHTML = this.game.level.name;
    this.elements.wordsLeft.innerHTML = this.game.words.length;
    if (Math.floor(this.game.level.mode.id) !== 4) {
      this.elements.crosshair.innerHTML =
        this.game.focus && this.game.focus.text.length != 1
          ? this.game.focus.displayText
          : "";
    }
    this.elements.score.innerHTML = this.game.score;
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
      this.elements.message.innerHTML = message1 + "<br>" + message2;
    }
  }
  displayPlayerDamage() {
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
  clear() {
    this.elements.wordContainer.innerHTML = "";
    this.elements.message.innerHTML = "";
    this.elements.hud.classList.add("invisible");
  }
}
