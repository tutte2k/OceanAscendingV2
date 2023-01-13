import Collision from "../Utils/Collision.js";
import UserInterface from "../UserInterface/UserInterface.js";
import Game from "../Game/Game.js";
export default class MapInputHandler {
  constructor(map) {
    this.map = map;
    this.keys = {
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false },
      enter: { pressed: false },
      q: { pressed: false },
    };
    this.lastKey = "";

    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.key) {
        case "w":
          this.keys.w.pressed = true;
          this.lastKey = "w";
          break;
        case "a":
          this.keys.a.pressed = true;
          this.lastKey = "a";
          break;
        case "s":
          this.keys.s.pressed = true;
          this.lastKey = "s";
          break;
        case "d":
          this.keys.d.pressed = true;
          this.lastKey = "d";
          break;
        case "Enter":
          this.keys.enter.pressed = true;
          break;
        case "q":
          this.keys.q.pressed = true;
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          this.keys.w.pressed = false;
          break;
        case "a":
          this.keys.a.pressed = false;
          break;
        case "s":
          this.keys.s.pressed = false;
          break;
        case "d":
          this.keys.d.pressed = false;
          break;
        case "Enter":
          this.keys.enter.pressed = false;
          break;
        case "q":
          this.keys.q.pressed = false;
          break;
      }
    });
  }

  handle() {
    for (let i = 0; i < this.map.levelsArray.length; i++) {
      const level = this.map.levelsArray[i];
      let completedlevel;
      if (Collision.check(this.map.player, level, 0, 0)) {
        completedlevel =
          this.map.dataSource.getStore().completedLevels.mode[level.mode.id][
            level.name
          ];
        UserInterface.displayLevelInfo(completedlevel, level);
      }
    }
    if (this.keys.q.pressed) {
      UserInterface.Shop.hidden = false;
    } else {
      UserInterface.Shop.hidden = true;
    }

    if (this.keys.enter.pressed) {
      UserInterface.Info.innerHTML = "";
      for (let i = 0; i < this.map.levelsArray.length; i++) {
        const level = this.map.levelsArray[i];
        if (!level.locked && Collision.check(this.map.player, level, 0, 0)) {
          const nextLevel = this.map.levelsArray[i + 1];
          this.map.canvas.classList.add("underwater");
          return new Game(
            this.map.canvas.width,
            this.map.canvas.height,
            level,
            nextLevel,
            this.map.dataSource
          );
        }
      }
    }

    if (this.keys.w.pressed && this.lastKey === "w") {
      UserInterface.Info.innerHTML = "";

      this.map.player.moving = true;
      this.map.player.sprite = this.map.player.state.up;

      this.map.player.swimming = Collision.checkAll(
        this.map.landTiles,
        this.map.player,
        0,
        this.map.player.speed
      );
      this.map.moving = Collision.checkAll(
        this.map.boundaries,
        this.map.player,
        0,
        this.map.player.speed
      );

      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.y += this.map.player.speed)
        );
      }
    } else if (this.keys.s.pressed && this.lastKey === "s") {
      UserInterface.Info.innerHTML = "";
      this.map.player.moving = true;
      this.map.player.sprite = this.map.player.state.down;

      this.map.player.swimming = Collision.checkAll(
        this.map.landTiles,
        this.map.player,
        0,
        -this.map.player.speed
      );
      this.map.moving = Collision.checkAll(
        this.map.boundaries,
        this.map.player,
        0,
        -this.map.player.speed
      );

      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.y -= this.map.player.speed)
        );
      }
    } else if (this.keys.a.pressed && this.lastKey === "a") {
      UserInterface.Info.innerHTML = "";
      this.map.player.moving = true;

      this.map.player.sprite = this.map.player.state.left;

      this.map.moving = Collision.checkAll(
        this.map.boundaries,
        this.map.player,
        this.map.player.speed,
        0
      );

      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.x += this.map.player.speed)
        );
      }
    } else if (this.keys.d.pressed && this.lastKey === "d") {
      UserInterface.Info.innerHTML = "";
      this.map.player.moving = true;
      this.map.player.sprite = this.map.player.state.right;

      this.map.moving = Collision.checkAll(
        this.map.boundaries,
        this.map.player,
        -this.map.player.speed,
        0
      );

      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.x -= this.map.player.speed)
        );
      }
    }
  }
}
