export default class UserInterface {

  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Titan One";
    this.color = "white";
    this.cashElement  =  document.getElementById("cash");
    this.canvasRect = document.getElementById("canvas1").getBoundingClientRect();
  }
  draw(context) {
    // context.save();
    // context.textAlign = "center";
    // context.fillStyle = this.color;
    // context.shadowOffsetX = 2;
    // context.shadowOffsetT = 2;
    // context.shadowColor = "black";
    // context.font = this.fontSize + "px " + this.fontFamily;
    // const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    // context.fillText(
    //   "Depth: " + formattedTime + "M",
    //   this.game.width * 0.5,
    //   this.game.height - 30
    // );
    // context.fillText("Mine: " + this.game.ammo, this.game.width * 0.05, 30);
    // context.fillText("Air: " + this.game.health, this.game.width * 0.15, 30);

    // context.fillText(
    //   "Level " + this.game.level.name,
    //   this.game.width * 0.5,
    //   60
    // );

    // context.fillText(
    //   "Words left: " + this.game.words.length,
    //   this.game.width * 0.5,
    //   30
    // );

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
