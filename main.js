import DataSource from "./Storage/DataSource.js";
import Global from "./Utils/Global.js";
import Map from "./Map/Map.js";
import Audioplayer from "./Audioplayer/Audioplayer.js";

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 2500;
canvas.height = 1768;

const dataSource = new DataSource();
const map = new Map(dataSource, canvas);
const audioPlayer = new Audioplayer();

window.addEventListener("load", function () {
  Global.GameContainer.hidden = false;
  Global.Spinner.hidden = true;
  let game;

  this.addEventListener("keydown", (e) => {
    if (game) {
      game.inputHandler.keyDown(e);
    } else {
      map.inputHandler.keyDown(e);
    }
  });

  this.addEventListener("keyup", (e) => {
    if (game) {
      game.inputHandler.keyUp(e);
    } else {
      map.inputHandler.keyUp(e);
    }
  });

  let lastTime = 0;
  let state;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (game && game.level) {
      if (audioPlayer.playing !== "match") audioPlayer.playing = "match";
      if (audioPlayer.isPlaying) audioPlayer.play();
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
      if (audioPlayer.playing !== "map") audioPlayer.playing = "map";
      if (audioPlayer.isPlaying) audioPlayer.play();
      map.draw(ctx, deltaTime);
      map.moving = true;
      map.player.moving = false;
      game = map.inputHandler.handle(deltaTime, ctx);
      if (Global.GameContainer.hidden) {
        Global.GameContainer.hidden = false;
        Global.Spinner.hidden = true;
      }
    }

    window.requestAnimationFrame(animate);
  }
  animate(0);
});
