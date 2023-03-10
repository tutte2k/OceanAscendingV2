import Global from "../../Utils/Global.js";
import SpriteSheet from "../../Utils/SpriteSheet.js";
import Projectile from "./Projectile.js";
import Spear from "./Spear.js";
export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 180;
    this.height = 187;
    this.x = 0 - this.width * 0.4;
    this.y = 100;
    this.speedY = 0;

    this.impact = this.game.store.shop.impact;
    this.maxSpeed = this.game.store.shop.diveSpeed;
    this.air = this.game.store.shop.airSlot;
    this.maxAir = this.game.store.shop.airSlot;

    this.maxEnergy = this.game.store.shop.maxEnergy;
    this.energy = this.maxEnergy;
    this.missCombo = 0;
    this.totalMisses = 0;

    this.airTimer = 0;
    this.airInterval = 32000 - this.game.store.shop.airReg * 2000;

    this.ammo = this.game.store.shop.mineSlot;
    this.maxAmmo = this.game.store.shop.mineSlot;

    this.spears = this.game.store.shop.spear;
    this.spearLives = this.game.store.shop.durability;
    this.spearCombo = 0;
    this.spearComboCap = 3;

    this.hitCombo = 0;
    this.hitComboCap = 21 - this.game.store.shop.combo;

    this.totalHitCombo = 0;

    this.ammoTimer = 0;
    this.ammoInterval = 32000 - this.game.store.shop.mineReg * 2000;
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
  penalize() {
    Global.Shaker.startShake(50, "miss");
    Global.Flasher.preFlash(20, "red");
    Global.Audioplayer.sounds.find((x) => x.name === "miss").play();
    this.totalMisses++;
    this.hitCombo = 0;
    this.spearCombo = 0;
    this.totalHitCombo = 0;
    if (!this.game.boss) this.game.score--;
    if (this.energy > 0) {
      this.missCombo++;
      this.energy =
        this.energy - this.missCombo < 0 ? 0 : this.energy - this.missCombo;
      this.game.energyTimer = 0;
    } else {
      this.air--;
    }
  }
  reward() {
    const addOrReturnCap = (num1, num2, max) => {
      return num1 + num2 <= max ? num1 + num2 : max;
    };
    this.energy = addOrReturnCap(this.energy, 0.1, this.maxEnergy);
    this.hitCombo = addOrReturnCap(this.hitCombo, 1, this.hitComboCap);

    if (this.hitCombo === this.hitComboCap) {
      if (this.ammo > 0) {
        this.dropMine();
        this.hitCombo = 0;
        this.spearCombo++;
      }
      if (this.spearCombo === this.spearComboCap && this.spears > 0) {
        this.throwSpear();
        this.spearCombo = 0;
      }
    }
    this.missCombo = 0;
    this.totalHitCombo++;
  }
  update(deltaTime) {
    if (this.game.gameOver) {
      if (this.y > 0 - this.height) {
        this.y -= 1.5;
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
    this.projectiles.forEach((projectile) => projectile.update(deltaTime));

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
    this.sprite.update(deltaTime);
  }
  draw(context) {
    if (window.location.origin.includes("localhost")) {
      context.beginPath();
      context.rect(this.x, this.y, this.width * 0.8, this.height * 0.8);
      context.stroke();
    }
    context.beginPath();
    const gradient = context.createLinearGradient(
      0,
      0,
      0,
      this.y + this.height * 0.5
    );
    let red = true;
    for (let i = 0; i < 10; i++) {
      const color = red ? "red" : "orange";
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
      context.lineWidth = 0.5;
      context.stroke();
    }
  }

  dropMine() {
    this.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width * 0.8,
        this.y + this.height * 0.5
      )
    );
    this.ammo--;
  }
  throwSpear() {
    this.projectiles.push(
      new Spear(
        this.game,
        this.x + this.width * 0.8,
        this.y + this.height * 0.8,
        this.spearLives
      )
    );
    this.spears--;
  }
}
