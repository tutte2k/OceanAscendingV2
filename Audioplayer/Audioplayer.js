export default class Audioplayer {
  constructor() {
    this.toggleButton = document.getElementById("audioBtn");
    this.playing = "";

    this.isPlaying = false;

    this.audio = {
      map: new Audio("./assets/map.mp3"),
      match: new Audio("./assets/match.mp3"),
    };

    this.audio.map.loop = true;
    this.audio.match.loop = true;

    this.audio.map.onplaying = () => (this.playing = "map");
    this.audio.match.onplaying = () => (this.playing = "match");

    this.audio.map.onplay = () => this.audio.match.pause();
    this.audio.match.onplay = () => this.audio.map.pause();

    this.toggleButton.addEventListener("click", () => {
      this.toggleButton.innerHTML = this.isPlaying ? "🔇" : "🔊";
      this.isPlaying
        ? this.audio[this.playing].pause()
        : this.audio[this.playing].play();
      this.isPlaying = !this.isPlaying;
    });
  }
  play() {
    this.isPlaying
      ? this.audio[this.playing].play()
      : this.audio[this.playing].pause();
  }
}
