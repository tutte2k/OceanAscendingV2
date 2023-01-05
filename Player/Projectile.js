import { FireExplosion } from "../Environment/Explosion.js";
export default class Projectile {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 45;
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
  explode(){
    this.game.explosions.push(
      new FireExplosion(
        this.game,
        this.x + this.width * 0.5,
        this.y + this.height * 0.5
      )
    );
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}
