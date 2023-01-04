export default class Level {
    static width = 66;
    static height = 66;
    constructor({ number, position, locked, content }) {
      this.position = position;
      this.width = 30;
      this.height = 30;
      this.locked = locked;
      this.content = content;
      this.name = number;
      this.mode = 0;
      this.words = this.getContent()

      this.maxScore = 0;
      this.words.forEach(
        (word) => (this.maxScore += word.length)
      );
    }
    draw(ctx) {
      ctx.fillStyle = this.locked === false ? "rgba(0,255,0)" : "rgba(255,0,0)"
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    getContent(){
      return this.content.slice();
    }
  }