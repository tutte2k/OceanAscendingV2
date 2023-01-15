import DataSource from "./Storage/DataSource.js";
import Global from "./Utils/Global.js";
import Map from "./Map/Map.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 2500;
canvas.height = 1768;

const dataSource = new DataSource();
const map = new Map(dataSource, canvas);

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
