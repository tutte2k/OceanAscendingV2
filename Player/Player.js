import SpriteSheet from "../Utils/SpriteSheet.js";
import Projectile from "./Projectile.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 180;
    this.height = 187;
    this.x = 0 - this.width * 0.4;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 3;
    console.log(this.game.store.shop)

    this.air = this.game.store.shop.airSlot;
    this.maxAir = this.game.store.shop.airSlot;
  
    this.airTimer = 0;
    this.airInterval = 30000 - this.game.store.shop.airReg * 2000;

    this.ammo = this.game.store.shop.mineSlot;
    this.maxAmmo = this.game.store.shop.mineSlot;

    this.ammoTimer = 0;
    this.ammoInterval = 30000 - this.game.store.shop.mineReg * 2000;

    this.projectiles = [];

    this.sprite = new SpriteSheet(
      document.getElementById("player"),
      180,
      187,
      47,
      0,
      25
    );
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

      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) {
          this.ammo++;
        }
        this.ammoTimer = 0;
      } else {
        this.ammoTimer += deltaTime;
      }
      if (this.airTimer > this.airInterval) {
        if (this.air < this.maxAir) {
          this.air++;
        }
        this.airTimer = 0;
      } else {
        this.airTimer += deltaTime;
      }
    }
    this.projectiles.forEach((projectile) => projectile.update());

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    this.sprite.update(deltaTime);
  }
  draw(context) {
    context.beginPath();
    var gradient = context.createLinearGradient(
      0,
      0,
      0,
      this.y + this.height * 0.5
    );
    let red = true;
    for (let i = 0; i < 10; i++) {
      let color = red ? "red" : "orange";
      gradient.addColorStop(`0.${i}`, color);
      red = !red;
    }
    context.strokeStyle = gradient;
    context.moveTo(this.x + this.width * 0.65, this.y + this.height * 0.5);
    context.lineTo(50, 0);
    context.lineWidth = 3;
    context.stroke();
    this.projectiles.forEach((projectile) => projectile.draw(context));
    this.sprite.draw(context, this.x, this.y);

    if (this.game.focus) {
      context.beginPath();
      context.strokeStyle = "white";
      context.moveTo(this.x, this.y);
      context.lineTo(
        this.game.focus.x + this.game.focus.width * 0.5,
        this.game.focus.y + this.game.focus.height * 0.5
      );
      context.stroke();
    }
  }

  shootTop() {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width * 0.8,
          this.y + this.height * 0.5
        )
      );
      this.ammo--;
    }
  }
}
