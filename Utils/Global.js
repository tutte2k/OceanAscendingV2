class Flasher {
  constructor() {
    this.flashStartTime = null;
    this.flashDuration = null;
    this.flashStop = null;
    this.color = null;
  }
  preFlash(flashDuration, color) {
    this.flashStartTime = Date.now();
    this.flashDuration = flashDuration;
    this.color = color;
  }
  flash() {
    if (this.flashStartTime == -1) return;
    this.flashStop = Date.now() - this.flashStartTime;
    if (this.flashStop > this.flashDuration) {
      this.flashStartTime = -1;
      Global.Effects.classList.add("invisible");
      return;
    } else if (this.flashStop < this.flashDuration) {
      Global.Effects.style.backgroundColor = this.color;
      Global.Effects.classList.remove("invisible");
    }
  }
  stop() {
    this.flashStartTime = -1;
    Global.Effects.classList.add("invisible");
  }
}
class Shaker {
  constructor() {
    this.shakeStartTime = null;
    this.shakeDuration = null;
    this.shakeStop = null;
    this.type = null;
  }
  startShake(shakeDuration, type) {
    this.shakeStartTime = Date.now();
    this.shakeDuration = shakeDuration;
    this.type = type;
  }
  preShake(ctx) {
    if (this.shakeStartTime == -1) return;
    this.shakeStop = Date.now() - this.shakeStartTime;
    if (this.shakeStop > this.shakeDuration) {
      this.shakeStartTime = -1;
      return;
    }
    if (this.type === "miss") {
      var dx = Math.random() * 10;
      var dy = Math.random() * 10;
    } else if (this.type === "boss") {
      var easingCoef = this.shakeStop / this.shakeDuration;
      var easing = Math.pow(easingCoef - 1, 3) + 1;
      var dx =
        easing *
        (Math.cos(this.shakeStop * 0.1) + Math.cos(this.shakeStop * 0.3115)) *
        15;
      var dy =
        easing *
        (Math.sin(this.shakeStop * 0.05) +
          Math.sin(this.shakeStop * 0.057113)) *
        15;
    }
    ctx.save();
    ctx.translate(dx, dy);
  }
  postShake(ctx) {
    if (this.shakeStartTime == -1) {
      return;
    }
    ctx.restore();
  }
}

export default class Global {
  static Canvas = document.getElementById("canvas1");
  static GameContainer = document.getElementById("container1");
  static InfoContainer = document.getElementById("infoContainer");
  static Spinner = document.getElementById("spinner");
  static Shaker = new Shaker();
  static Flasher = new Flasher();
  static Effects = document.getElementById("effects");
  static Wasted = new Audio("./assets/wasted.mp3")
}
