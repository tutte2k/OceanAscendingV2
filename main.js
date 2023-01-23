import DataSource from "./Storage/DataSource.js";
import Global from "./Utils/Global.js";
import Map from "./Map/Map.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 2500;
canvas.height = 1768;

const dataSource = new DataSource();
const map = new Map(dataSource, canvas);

// const audio = {
//   map: new Audio("./assets/map.mp3"),
//   match: new Audio("./assets/match.mp3"),
// };

// audio.map.loop = true;
// audio.match.loop = true;

// let playing = "map";

// audio.map.onplaying = () => (playing = "map");
// audio.match.onplaying = () => (playing = "match");
// audio.map.onplay = () => audio.match.pause();
// audio.match.onplay = () => audio.map.pause();

// window.addEventListener("focus", () => {
//   audio.map.play();
// });


window.addEventListener("load", function () {
  Global.GameContainer.hidden = false;
  let game;
  let lastTime = 0;
  let state;

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (game && game.level) {
      if (playing !== "match") audio.match.play();
      game.draw(ctx);
      state = game.update(deltaTime);
    } else if (game && state) {
      canvas.classList.remove("underwater");
      if (state.win) {
        const cash = dataSource.saveStateAndReturnCash(state);
        map.userInterface.shop.setCash(cash);
        if (state.nextLevel) {
          state.nextLevel.locked = false;
        }
      }
      if (playing !== "map") audio.map.play();
      state = null;
      game = null;
    } else {
      map.draw(ctx, deltaTime);
      map.moving = true;
      map.player.moving = false;
      game = map.inputHandler.handle(deltaTime, ctx);
      if (Global.GameContainer.hidden) Global.GameContainer.hidden = false;
    }
    window.requestAnimationFrame(animate);
  }
  animate(0);
});
