import SpriteSheet from "../../Utils/SpriteSheet.js";
export default class Spear {
  constructor(game, x, y, lives) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 350;
    this.height = 10;
    this.speed = 50;
    this.markedForDeletion = false;

    this.spriteSheet = new SpriteSheet(
      document.getElementById("goldenharpoon"),
      220,
      220,
      49,
      0,
      30
    );
    this.lives = lives;
  }
  update(deltaTime) {
    this.x += this.speed > 1 ? this.speed : 1;

    this.speed -= this.speed * 0.03;

    this.y += -this.game.speed * (this.x * 0.001);
    if (this.y < 0) {
      this.markedForDeletion = true;
    }
    this.spriteSheet.update(deltaTime);
  }
  explode() {
    this.lives--;
    if (this.lives === 0) {
      this.markedForDeletion = true;
    }
  }
  draw(ctx) {
    if (window.location.origin.includes("localhost")) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width * 0.8, this.height * 0.8);
      ctx.stroke();
    }

    const degrees = 45;

    ctx.save();

    ctx.translate(this.x + 220 / 2, this.y + 220 / 2);
    ctx.rotate((45 * Math.PI) / 180);

    this.spriteSheet.draw(ctx, -220 / 2 - 30, -220 / 2 - 120);

    ctx.rotate((-this.angle * Math.PI) / 180);
    ctx.translate(-this.x - 220 / 2, -this.y - 220 / 2);
    ctx.restore();
  }
}
