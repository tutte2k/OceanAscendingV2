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
class Track {
  constructor(path, name, audioplayer) {
    this.name = name;
    this.track = new Audio(path);
    this.track.loop = true;
    this.track.muted = true;
    this.track.volume = Audioplayer.Volume;
    this.track.onplaying = () => (audioplayer.playing = name);
    this.playPromise = undefined;
    this.track.onplay = () => {
      audioplayer.currentTrack = this;
      audioplayer.tracks.forEach((x) => {
        if (x.name !== this.name) {
          if (x.playPromise) {
            x.track.pause();
          }
        }
      });
    };
  }
  play() {
    this.playPromise = this.track.play();
  }
  pause() {
    this.track.pause();
  }
}
class Sound {
  constructor(path, name) {
    this.name = name;
    this.sound = new Audio(path);
    this.sound.muted = true;
    this.sound.volume = Audioplayer.Volume;
  }
  play() {
    this.sound.play();
  }
}
class Audioplayer {
  static Volume = 50 / 100;

  constructor() {
    this.toggleButton = document.getElementById("audioBtn");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.toggleButton.innerHTML = "Unmute 🔊";
    this.muted = true;

    this.tracks = [
      new Track("./assets/map.mp3", "map", this),
      new Track("./assets/match.mp3", "game", this),
      new Track("./assets/berlin-techno.mp3", "berlin", this),
      new Track("./assets/evasion.mp3", "evasion", this),
      new Track("./assets/the-lost-expedition.mp3", "expedition", this),
    ];
    this.sounds = [new Sound("./assets/wasted.mp3", "lose")];
    this.currentTrack = this.tracks[0];

    this.toggleButton.addEventListener("click", () => {
      this.currentTrack.play();
      this.toggleMute();
    });
    
    this.volumeSlider.addEventListener("change", (e) => {
      if (this.muted) this.toggleMute();
      let volume = e.currentTarget.value / 100;
      this.tracks.forEach((x) => (x.track.volume = volume));
      this.sounds.forEach((x) => (x.sound.volume = volume));
    });
  }
  toggleMute() {
    this.muted = !this.muted;
    this.toggleButton.innerHTML = this.muted ? "Unmute 🔊" : "Mute 🔇";
    this.tracks.forEach((x) => (x.track.muted = !this.muted ? false : true));
    this.sounds.forEach((x) => (x.sound.muted = !this.muted ? false : true));
  }
}

export default class Global {
  static Canvas = document.getElementById("canvas1");
  static Effects = document.getElementById("effects");
  static GameContainer = document.getElementById("container1");
  static InfoButton = document.getElementById("infoButton");
  static Spinner = document.getElementById("spinner");

  static Shaker = new Shaker();
  static Flasher = new Flasher();
  static Audioplayer = new Audioplayer();
}
