export default class UserInterface {
  static UI = document.getElementById("ui");
  static Mine = document.getElementById("mines");
  static Air = document.getElementById("air");
  static WordsLeft = document.getElementById("wordsLeft");
  static Level = document.getElementById("level");
  static Depth = document.getElementById("depth");
  static Cash = document.getElementById("cash");
  static Crosshair = document.getElementById("crosshair");

  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Titan One";
    this.color = "white";
    this.cashElement = document.getElementById("cash");
    this.canvasRect = document.getElementById("canvas1").getBoundingClientRect();
  }
  draw(context) {
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    
    UserInterface.Depth.innerHTML = formattedTime;
    UserInterface.Air.innerHTML = this.game.health;
    UserInterface.Mine.innerHTML = this.game.ammo;
    UserInterface.Level.innerHTML = this.game.level.name;
    UserInterface.WordsLeft.innerHTML = this.game.words.length;

    if (this.game.focus) {
      if (this.game.focus.text.length != 1) {
        UserInterface.Crosshair.innerHTML = this.game.focus.displayText;
      }

    } else {
      UserInterface.Crosshair.innerHTML = ''
    }


    // if (this.game.gameOver) {
    //   context.textAlign = "center";
    //   let message1;
    //   let message2;
    //   if (this.game.win) {
    //     message1 = "You made it!";
    //     message2 = "Fishing with dynamite is only illegal if someone hears it!";
    //   } else if (this.game.lose) {
    //     message1 = "You ran out of air!";
    //     message2 = "If you can't catch em, flee!";
    //   }
    //   context.font = " 70px " + this.fontFamily;
    //   context.fillText(
    //     message1,
    //     this.game.width * 0.5,
    //     this.game.height * 0.5 - 20
    //   );
    //   context.font = "25px " + this.fontFamily;
    //   context.fillText(
    //     message2,
    //     this.game.width * 0.5,
    //     this.game.height * 0.5 + 20
    //   );
    // }
    // if (this.game.focus) {
    //   if (this.game.focus.text.length != 1) {
    //     context.font = "100" + "px " + this.fontFamily;
    //     context.fillStyle = "lime";
    //     context.fillText(
    //       this.game.focus.displayText,
    //       this.game.width / 2,
    //       this.game.height - 100
    //     );
    //     context.fillStyle = this.color;
    //     context.font = this.fontSize + "px " + this.fontFamily;
    //   }
    // }
    // context.restore();
  }
}
