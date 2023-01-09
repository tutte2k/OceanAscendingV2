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
    this.words = this.getContent();
    this.maxScore = 0;
    this.words.forEach((word) => (this.maxScore += word.length));
  }
  draw(ctx) {
    if(!this.locked){
      ctx.font = "24px serif";
      ctx.fillStyle = "white";
      const icon = this.locked === false ? "⭐": "🔒";
      ctx.fillText(icon, this.position.x, this.position.y + 30);
    }
  }
  getContent() {
    return this.content.slice();
  }
  static setContent(contentArr, levelSize, numberOfLevels = 1000) {
    const levelContents = [];
    for (let i = 0; i < numberOfLevels; i++) {
      const levelContent = contentArr.slice(-levelSize);
      contentArr.splice(-levelSize);
      if (levelContent.length !== levelSize) {
        break;
      }
      levelContents.push(levelContent);
    }
    return levelContents;
  }
}
