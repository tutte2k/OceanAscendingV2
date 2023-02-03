import DataSource from "./Storage/DataSource.js";
import Global from "./Utils/Global.js";
import Map from "./Map/Map.js";
import Audioplayer from "./Audioplayer/Audioplayer.js";

/*
score / level progress on ui
*/

const ctx = Global.Canvas.getContext("2d");
Global.Canvas.width = 2500;
Global.Canvas.height = 1768;

const dataSource = new DataSource();
const map = new Map(dataSource);
const audioPlayer = new Audioplayer();

window.addEventListener("load", function () {
  Global.GameContainer.hidden = false;
  Global.Spinner.hidden = true;
  let game;

  this.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (game) {
      game.inputHandler.keyDown(e);
    } else {
      map.inputHandler.keyDown(e);
    }
  });
  this.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (game) {
      game.inputHandler.keyUp(e);
    } else {
      map.inputHandler.keyUp(e);
    }
  });
  this.addEventListener("resize", () => {
    if (game) {
      game.onResize();
    }
  });

  let lastTime = 0;
  let state;

  function animate(timeStamp) {
    Global.Shaker.preShake(ctx);
    Global.Flasher.flash();
    ctx.clearRect(0, 0, Global.Canvas.width, Global.Canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (game && game.level) {
      if (audioPlayer.playing !== "match") audioPlayer.playing = "match";
      if (audioPlayer.isPlaying) audioPlayer.play();
      game.draw(ctx);
      state = game.update(deltaTime);
    } else if (game && state) {
      Global.Canvas.classList.remove("underwater");
      Global.InfoContainer.classList.remove("invisible");
      Global.Flasher.stop();
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
    Global.Shaker.postShake(ctx);
    window.requestAnimationFrame(animate);
  }
  animate(0);
});
