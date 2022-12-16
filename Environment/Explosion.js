class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.frameX = 0;
    this.spriteHeight = 200;
    this.spriteWidth = 200;
    this.fps = 30;
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
    this.maxFrame = 8;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = x - this.width * 0.5;
    this.y = y - this.width * 0.5;
  }
  update(deltaTime) {
    this.x -= this.game.speed;
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }

    if (this.frameX > this.maxFrame) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
export class SmokeExplosion extends Explosion {
  constructor(game, x, y) {
    super(game, x, y);
    this.image = document.getElementById("smokeExplosion");
  }
}
export class FireExplosion extends Explosion {
  constructor(game, x, y) {
    super(game, x, y);
    this.image = document.getElementById("fireExplosion");
  }
}
export class RainbowExplosion extends Explosion {
  constructor(game, x, y) {
    super(game, x, y);
    this.image = document.getElementById("rainbowExplosion");
  }
}
