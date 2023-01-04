export default class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.position = { x: this.x, y: this.y }
    this.width = 10;
    this.height = 3;
    this.speed = 3;
    this.markedForDeletion = false;
    this.image = document.getElementById("projectile");
  }
  update() {
    this.x += this.game.speed / (this.x * 0.005);
    this.y += -this.game.speed * (this.x * 0.001);

    if (this.y < 0) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}
