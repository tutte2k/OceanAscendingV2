import Global from "../Utils/Global.js";
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
      energyBar: document.getElementById("ebar"),
      airBar: document.getElementById("abar"),
      mineComboBar: document.getElementById("mcbar"),
      progressBar: document.getElementById("pbar"),
      progress: document.getElementById("progress"),
      comboTimer: document.getElementById("comboTimer"),
    };
    this.elements.hud.classList.remove("invisible");
    Global.InfoButton.classList.add("invisible");
    this.game = game;
  }
  draw() {
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);

    this.elements.mineComboBar.style.width =
      (this.game.player.hitCombo /
        this.game.player.hitComboCap) *
        100 +
      "%";

    this.elements.airBar.style.width =
      (this.game.player.air / this.game.player.maxAir) * 100 + "%";

    this.elements.energyBar.style.width =
      (this.game.player.energy / this.game.player.maxEnergy) * 100 + "%";

    let percentageCompleted =
      100 -
      ((this.game.words.length / this.game.totalWords) * 100).toFixed(0) +
      "%";

    this.elements.progressBar.style.width = percentageCompleted;
    this.elements.progress.innerHTML = percentageCompleted;

    this.elements.comboTimer.innerHTML = this.game.player.ammo === 0 ? `New mine in ${(
      (this.game.player.ammoInterval - this.game.player.ammoTimer) /
      1000
    ).toFixed(0)} seconds!` : "";

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
        message3 = ``;
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
