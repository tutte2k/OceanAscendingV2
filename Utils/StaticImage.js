export default class StaticImage {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
    this.moving = false;
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y
    );
  }
}
