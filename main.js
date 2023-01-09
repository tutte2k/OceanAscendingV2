import DataSource from "./Data/DataSource.js";
import UserInterface from "./UserInterface/UserInterface.js";
import MapInputHandler from "./UserInput/MapInputHandler.js";
import Map from "./Game/Map.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 2500;
canvas.height = 1768;

const dataSource = new DataSource();
const store = dataSource.getStore();

const map = new Map(store, canvas);


UserInterface.setUi(store);
UserInterface.setUpShop(dataSource);

window.addEventListener("load", function () {
  let game;
  let lastTime = 0;
  let state;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (game && game.level) {
      game.draw(ctx);
      state = game.update(deltaTime);
    } else if (game && state) {
      canvas.classList.remove("underwater");
      state = null;
      game = null;
    } else {
      map.draw(ctx);
      map.moving = true;
      map.player.moving = false;
      game = map.inputHandler.handle(dataSource);

    }
    window.requestAnimationFrame(animate);
  }
  animate(0);

  //   const bad = "👎";
  //   const ok = "🆗";
  //   const good = "👍";
  //   const perfect = "💯";
  //   const hook = "🪝";

  // const audio = new Audio("./assets/level1.flac");
  // audio.loop = true;

  // let playbtn = this.document.getElementById("playMusic");
  // playbtn.addEventListener("click", () => playMusic());
  // let playing = false;
  // function playMusic() {
  //   playing = !playing;
  //   playing ? audio.play() : audio.pause();
  // }
});
