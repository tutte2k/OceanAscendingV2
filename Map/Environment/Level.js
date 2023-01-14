

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

    if (Math.floor(this.mode.id) === 4) {
      this.maxScore=25;
    } else {
      this.words = this.getContent();
      this.maxScore = 0;
      this.words.forEach((word) => (this.maxScore += word.length));
    }
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
