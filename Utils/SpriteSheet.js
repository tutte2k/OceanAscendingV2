export default class SpriteSheet {
  constructor(
    image,
    width,
    height,
    spriteSheetColumns,
    spriteSheetRows,
    fps,
    multirow = false,
    indexOfLastImage = -1
  ) {
    this.image = image;

    this.spriteSheetColumns = spriteSheetColumns;
    this.spriteSheetRows = spriteSheetRows;

    this.width = width;
    this.height = height;

    this.frameX = 0;
    this.frameY = 0;
    this.multirow = multirow;
    this.indexOfLastImage = indexOfLastImage;

    this.timer = 0;
    this.fps = fps;
    this.interval = 1000 / this.fps;
  }
  update(deltaTime) {
    const resetCol = () => (this.frameX = 0);
    const resetRow = () => (this.frameY = 0);
    const stepRight = () => this.frameX++;
    const stepDown = () => this.frameY++;

    const isTimerElapsed = this.timer > this.interval;
    const isMultiRow = this.multirow;
    const isAtColEnd = this.frameX === this.spriteSheetColumns;
    const isAtRowEnd = this.frameY === this.spriteSheetRows;
    const isAtLastFrameCol =
      this.frameX === this.indexOfLastImage && isAtRowEnd;

    if (isTimerElapsed) {
      if (!isMultiRow) {
        isAtColEnd ? resetCol() : stepRight();
      } else if (isMultiRow) {
        if (isAtLastFrameCol) {
          resetCol();
          resetRow();
        } else if (isAtColEnd) {
          stepDown();
          resetCol();
        } else if (isAtRowEnd) {
          resetRow();
        } else {
          stepRight();
        }
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
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
