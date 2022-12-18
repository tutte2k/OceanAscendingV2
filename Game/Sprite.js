export default class Sprite {
  constructor(image, width, height, spriteSheetColumns, spriteSheetRows, fps) {
    this.image = image;
    this.spriteSheetColumns = spriteSheetColumns;
    this.spriteSheetRows = spriteSheetRows;

    this.width = width;
    this.height = height;

    this.frameX = 0;
    this.frameY = 0;

    this.timer = 0;
    this.fps = fps;
    this.interval = 1000 / this.fps;
  }
  update(deltaTime) {
    if (this.frameX < this.spriteSheetColumns) {
      if (this.timer > this.interval) {
        this.frameX++;
        this.timer = 0;
      } else {
        this.timer += deltaTime;
      }
    } else {
      this.frameX = 0;
    }
  }
  draw(context, x, y) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    );
  }
}
