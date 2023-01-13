import SpriteSheet from "../Utils/SpriteSheet.js";
export default class WorldPlayer {
  constructor(canvas, dataSource) {
    const Walk = [80, 80, 13, 0, 20];
    const Swim = [80, 80, 11, 0, 25];
    this.sprites = {
      walk: {
        idle: new SpriteSheet(document.getElementById("playerDown"), ...Walk),
        up: new SpriteSheet(document.getElementById("playerUp"), ...Walk),
        down: new SpriteSheet(document.getElementById("playerDown"), ...Walk),
        left: new SpriteSheet(document.getElementById("playerLeft"), ...Walk),
        right: new SpriteSheet(document.getElementById("playerRight"), ...Walk),
      },
      swim: {
        idle: new SpriteSheet(document.getElementById("swimIdle"), ...Swim),
        up: new SpriteSheet(document.getElementById("swimUp"), ...Swim),
        down: new SpriteSheet(document.getElementById("swimDown"), ...Swim),
        left: new SpriteSheet(document.getElementById("swimLeft"), ...Swim),
        right: new SpriteSheet(document.getElementById("swimRight"), ...Swim),
      },
    };
    this.state = this.sprites.walk;
    this.sprite = this.state.idle;
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.position = {
      x: canvas.width / 2 - (this.sprite.width * 4) / 4 / 2,
      y: canvas.height / 2 - this.sprite.height / 4,
    };
    this.moving = false;
    this.swimming = false;
    this.speed = !window.location.href.includes("5500")
      ? 15
      : dataSource.getStore().shop.mapSpeed;
  }
  update(deltaTime) {
    this.sprite.update(deltaTime);
  }
  draw(ctx, deltaTime) {
    if (this.moving || this.swimming) {
      this.update(deltaTime);
    }
    if (this.swimming === true && this.state !== this.sprites.swim) {
      this.state = this.sprites.swim;
      this.sprite = this.state.idle;
    } else if (this.swimming === false && this.state !== this.sprites.walk) {
      this.state = this.sprites.walk;
      this.sprite = this.state.idle;
    }
    if (!this.moving && this.swimming) {
      this.sprite = this.state.idle;
    }
    this.sprite.draw(ctx, this.position.x, this.position.y);
  }
}
