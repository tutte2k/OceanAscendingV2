export default class Level {
  static width = 47;
  static height = 47;
  constructor({ mode, number, position, locked, content }) {
    this.position = position;
    this.width = 20;
    this.height = 20;
    this.locked = locked;
    this.content = content;
    this.name = number;
    this.mode = mode;
    this.maxScore = 0;
    this.content.forEach(
      (obj) => (this.maxScore += Number.isInteger(obj) ? obj : obj.length)
    );
  }
  draw(ctx) {
    if (!this.locked) {
      ctx.font = "26px serif";
      ctx.fillStyle = "white";
      const icon = this.locked === false ? "⭐" : "🚫";
      ctx.fillText(icon, this.position.x, this.position.y + 30);
    }
  }
  getContent() {
    return this.content.slice();
  }
}
