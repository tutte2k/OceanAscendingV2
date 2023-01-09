import DataSource from "./Data/DataSource.js";
import UserInterface from "./UserInterface/UserInterface.js";
import Map from "./Game/Map.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 2500;
canvas.height = 1768;
const dataSource = new DataSource();
const map = new Map(dataSource, canvas);
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
      if(state.win){
        state.nextLevel.locked = false;
        const cash = dataSource.saveState(state);
        UserInterface.setCash(cash);
      }
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
});