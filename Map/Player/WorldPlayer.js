import SpriteSheet from "../../Utils/SpriteSheet.js";
export default class WorldPlayer {
  constructor(canvas, dataSource) {
    const Walk = [80, 80, 13, 0, 25];
    const Swim = [80, 80, 11, 0, 25];
    const Idle = [80, 80, 1, 0, 1];
    this.sprites = {
      idle: {
        up: new SpriteSheet(document.getElementById("idleUp"), ...Idle),
        down: new SpriteSheet(document.getElementById("idleDown"), ...Idle),
        left: new SpriteSheet(document.getElementById("idleLeft"), ...Idle),
        right: new SpriteSheet(document.getElementById("idleRight"), ...Idle),
        swim: new SpriteSheet(document.getElementById("swimIdle"), ...Swim),
      },
      walk: {
        up: new SpriteSheet(document.getElementById("playerUp"), ...Walk),
        down: new SpriteSheet(document.getElementById("playerDown"), ...Walk),
        left: new SpriteSheet(document.getElementById("playerLeft"), ...Walk),
        right: new SpriteSheet(document.getElementById("playerRight"), ...Walk),
      },
      swim: {
        up: new SpriteSheet(document.getElementById("swimUp"), ...Swim),
        down: new SpriteSheet(document.getElementById("swimDown"), ...Swim),
        left: new SpriteSheet(document.getElementById("swimLeft"), ...Swim),
        right: new SpriteSheet(document.getElementById("swimRight"), ...Swim),
      },
    };
    this.state = this.sprites.idle;
    this.lastDirection = "down";
    this.sprite = this.state[this.lastDirection];
    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.position = {
      x: canvas.width / 2 - (this.sprite.width * 4) / 4 / 2,
      y: canvas.height / 2 - this.sprite.height / 4,
    };
    this.moving = false;
    this.swimming = false;
    this.speed = dataSource.getStore().shop.mapSpeed;
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
    } else if (this.swimming === false && this.state !== this.sprites.walk) {
      this.state = this.sprites.walk;
      this.sprite = this.state.down;
    }
    if (!this.moving && !this.state.idle) {
      this.state = this.sprites.idle;
      if (this.swimming) {
        this.sprite = this.state.swim;
      } else {
        this.sprite = this.state[this.lastDirection];
      }
    }
    this.sprite.draw(ctx, this.position.x, this.position.y);
  }
}
