export default class LandTile {
    static width = 66;
    static height = 66;
    constructor({position}) {
      this.position = position;
      this.width = 20;
      this.height = 20;
    }
    draw(ctx) {
        ctx.fillStyle = "rgba(0,255,0,0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  