export default class Layer {
  constructor(game, image, speedModifier) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 1768;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.y <= -this.height) {
      this.y = 0;
    }
    this.y -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x, this.y + this.height);
  }
}
