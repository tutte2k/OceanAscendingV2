export default class LandTile {
    static width = 47;
    static height = 47;
    constructor({position}) {
      this.position = position;
      this.width = 5;
      this.height = 5;
    }
    draw(ctx) {
        ctx.fillStyle = "rgba(0,255,0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  