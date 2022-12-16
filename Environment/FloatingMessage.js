export default class FloatingMessage {
  constructor(value, x, y, color) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.lifeSpan = 150;
    this.lived = 0;
    this.opacity = 1;
    this.markedForDeletion = false;
    this.size = 45;
    this.font = "Bangers";
    this.color = color;
  }
  update() {
    this.y -= 1;
    this.lived++;
    if (this.lived > this.lifeSpan) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.fillStyle = this.color;
    context.font = this.size + "px " + this.font;
    context.fillText(this.value, this.x, this.y);
  }
}
