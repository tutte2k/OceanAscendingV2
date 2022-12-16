export default class Particle {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = document.getElementById("gears");
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 50;
    this.sizeModifier = (Math.random() * 0.3 + 0.3).toFixed(1);
    this.size = this.spriteSize * this.sizeModifier;
    this.speedX = Math.random() * -1;
    this.speedY = -2;
    this.gravity = 1;
    this.markedForDeletion = false;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }
  update() {
    this.speedY -= this.gravity / 10000;
    this.x -= this.speedX;
    this.y += this.speedY;
    if (this.y < 0) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}
