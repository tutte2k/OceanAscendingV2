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
      energyMax: document.getElementById("energyMax"),
      energy: document.getElementById("energy"),
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
    this.elements.energyMax.innerHTML = this.game.player.maxEnergy;
    this.elements.energy.innerHTML = this.game.player.energy.toFixed(1);
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
      let message3;
      if (this.game.win) {
        message1 = "You made it!";
        message2 = "Fishing with dynamite is only illegal if someone hears it!";
        message3 = `<span style="color:green">$${(
          (this.game.score / this.game.level.maxScore) *
          100
        ).toFixed(0)}%</span>`;
      } else if (this.game.lose) {
        message1 = `<span style="color:maroon;font-size:200px;">w a s t e d</span>`;
        message2 = "";
        message3 = "";
      }
      this.elements.message.innerHTML =
        message1 + "<br>" + message2 + "<br>" + message3;
    } else if (this.game.player.energy === 0) {
      this.elements.message.innerHTML = `<span style="color:red;">NO OXYGEN FLOW!</span>`;
    } else if (this.elements.message.innerHTML !== "") {
      this.elements.message.innerHTML = "";
    }
  }
  displayPlayerDamage(damage) {
    this.game.floatingMessages.push(
      new FloatingMessage(
        "-" + damage,
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
    this.elements.crosshair.innerHTML = "";
    this.elements.hud.classList.add("invisible");
  }
}
