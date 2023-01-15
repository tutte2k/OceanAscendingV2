export default class Boundary {
  static width = 48;
  static height = 47;
  constructor({ position }) {
    this.position = position;
    this.width = 10;
    this.height = 1;
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(255,0,0,0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
