class Shaker {
  constructor() {
    this.shakeStartTime = null;
    this.shakeDuration = null;
  }
  startShake(shakeDuration) {
    this.shakeStartTime = Date.now();
    this.shakeDuration = shakeDuration;
  }
  preShake(ctx) {
    if (this.shakeStartTime == -1) return;
    var dt = Date.now() - this.shakeStartTime;
    if (dt > this.shakeDuration) {
      this.shakeStartTime = -1;
      return;
    }
    var easingCoef = dt / this.shakeDuration;
    var easing = Math.pow(easingCoef - 1, 3) + 1;
    ctx.save();
    var dx = easing * (Math.cos(dt * 0.1) + Math.cos(dt * 0.3115)) * 15;
    var dy = easing * (Math.sin(dt * 0.05) + Math.sin(dt * 0.057113)) * 15;
    ctx.translate(dx, dy);
  }
  postShake(ctx) {
    if (this.shakeStartTime == -1) return;
    ctx.restore();
  }
}

export default class Global {
  static Canvas = document.getElementById("canvas1");
  static GameContainer = document.getElementById("container1");
  static Spinner = document.getElementById("spinner");
  static Shaker = new Shaker();
}
