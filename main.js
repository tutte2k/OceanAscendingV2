import Map from "./Map/Map.js";
import DataSource from "./Storage/DataSource.js";
import Global from "./Utils/Global.js";

const ctx = Global.Canvas.getContext("2d");
Global.Canvas.width = 2500;
Global.Canvas.height = 1768;

const dataSource = new DataSource();
const map = new Map(dataSource);

/*
TODO:

continue class diagram

add boss class

refactor projectile/spear
refactor Global class
refactor Game class
  Boss mode?
  this.boss = Boss object not bool

Boss
  scoring?
  progress / health bar
  add boss loot

  
Features
  add consumable items


A STAR ALGORITHM for map walking

Fish
  add personality

*/

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
      game.draw(ctx);
      state = game.update(deltaTime);
    } else if (game && state) {
      if (Global.Audioplayer.currentTrack.name !== "map") {
        Global.Audioplayer.currentTrack = Global.Audioplayer.tracks.find(
          (x) => x.name === "map"
        );
        Global.Audioplayer.currentTrack.play();
      }
      Global.Canvas.classList.remove("underwater");
      Global.InfoButton.classList.remove("invisible");
      Global.Flasher.stop();
      if (state.win) {
        const cash = dataSource.saveStateAndReturnCash(state);
        map.userInterface.shop.setCash(cash);
        if (state.nextLevel) {
          state.nextLevel.locked = false;
        }
      } else if (!state.win) {
        const cash = dataSource.sobStory(state);
        map.userInterface.shop.setCash(cash);
      }
      state = null;
      game = null;
    } else {
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
