export default class Boundary {
  static width = 47;
  static height = 47;
  constructor({ position }) {
    this.position = position;
    this.width = 20;
    this.height = 20;
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(255,0,0,0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
