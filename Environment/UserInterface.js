export default class UserInterface {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Titan One";
    this.color = "white";
  }
  draw(context) {
    context.save();
    context.textAlign = "center";
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetT = 2;
    context.shadowColor = "black";
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillText("Score:" + this.game.score, this.game.width * 0.75, 30);
    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText(
      "Depth: " + formattedTime + "M",
      this.game.width * 0.9,
      30
    );
    context.fillText("Ammo: " + this.game.ammo, this.game.width * 0.05, 30);
    context.fillText("Air: " + this.game.health, this.game.width * 0.15, 30);
    context.fillText(
      "Words left: " + this.game.words.length,
      this.game.width * 0.5,
      30
    );

    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1;
      let message2;
      if (this.game.score > this.game.winningScore) {
        message1 = "You win!";
        message2 = "Fishing with dynamite is only illegal if someone heard it.";
      } else {
        message1 = "You ran out of air!";
        message2 = "How much fish is in the water?";
      }
      context.font = " 70px " + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = "25px " + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
    }
    context.restore();
  }
}
