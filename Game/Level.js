export default class Level {
  static width = 66;
  static height = 66;
  constructor({ mode, number, position, locked, content }) {
    this.position = position;
    this.width = 30;
    this.height = 30;
    this.locked = locked;
    this.content = content;
    this.name = number;
    this.mode = mode;
    this.words = this.getContent();

    this.maxScore = 0;
    this.words.forEach((word) => (this.maxScore += word.length));
  }
  draw(ctx) {
    ctx.font = "50px serif";
    ctx.fillStyle = "white";
    let icon = this.locked === false ? "💫" : "⛔";
    ctx.fillText(icon, this.position.x, this.position.y + 30);
  }
  getContent() {
    return this.content.slice();
  }
}
