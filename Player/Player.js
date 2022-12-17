export class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
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

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 180;
    this.height = 187;
    this.x = 0 - this.width * 0.4;
    this.y = 100;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 47;
    this.speedY = 0;
    this.maxSpeed = 3;
    this.projectiles = [];
    this.image = document.getElementById("player");

    this.fps = 25;
    this.timer = 0;
    this.interval = 1000 / this.fps;
  }
  update(deltaTime) {
    if (this.game.lose) {
      if (this.y > 0 - this.height) {
        this.shootTop();
        this.y -= 0.5;
      }
    } else if (this.game.win) {
      if (this.y > 0 - this.height * 4) {
        this.shootTop();
        this.y -= 2;
      }
    } else {
      if (this.game.keys.includes("ArrowUp")) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.includes("ArrowDown")) {
        this.speedY = this.maxSpeed;
      } else {
        this.speedY >= 0 ? (this.speedY -= 0.05) : (this.speedY += 0.05);
      }
      this.y += this.speedY;

      if (this.y > this.game.height - this.height * 0.5) {
        this.y = this.game.height - this.height * 0.5;
      } else if (this.y < -this.height * 0.5) {
        this.y = -this.height * 0.5;
      }
    }
    this.projectiles.forEach((projectile) => projectile.update());

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    if (this.frameX < this.maxFrame) {
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;
      } else {
        this.timer += deltaTime;
      }
    } else {
      this.frameX = 0;
    }
  }
  draw(context) {
    this.projectiles.forEach((projectile) => projectile.draw(context));
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width * 0.8,
          this.y + this.height * 0.5
        )
      );
      this.game.ammo--;
    }
  }
}
