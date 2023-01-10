import Collision from "../Utils/Collision.js";
import UserInterface from "../UserInterface/UserInterface.js";
import Game from "../Game/Game.js";
export default class MapInputHandler {
  constructor(map) {
    this.map = map;
    this.speed = 3;
    this.keys = {
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false },
      enter: { pressed: false },
      q: { pressed: false },
    };
    this.lastKey = "";
    this.addEventListeners();
  }
  addEventListeners() {
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
          this.map.dataSource.getStore().completedLevels.mode[level.mode][level.name];
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
      this.map.player.image = this.map.player.swimming
        ? this.map.player.sprites.swimUp
        : this.map.player.sprites.up;

      for (let i = 0; i < this.map.landTiles.length; i++) {
        const landtile = this.map.landTiles[i];
        if (Collision.check(this.map.player, landtile, 0, this.speed)) {
          this.map.player.swimming = false;
          break;
        } else {
          this.map.player.swimming = true;
        }
      }
      for (let i = 0; i < this.map.boundaries.length; i++) {
        const boundary = this.map.boundaries[i];
        if (Collision.check(this.map.player, boundary, 0, this.speed)) {
          this.map.moving = false;
          break;
        }
      }
      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.y += this.speed)
        );
      }
    } else if (this.keys.s.pressed && this.lastKey === "s") {
      UserInterface.Info.innerHTML = "";
      this.map.player.moving = true;
      this.map.player.image = this.map.player.swimming
        ? this.map.player.sprites.swimDown
        : this.map.player.sprites.down;
      for (let i = 0; i < this.map.landTiles.length; i++) {
        const landtile = this.map.landTiles[i];
        if (Collision.check(this.map.player, landtile, 0, -this.speed)) {
          this.map.player.swimming = false;
          break;
        } else {
          this.map.player.swimming = true;
        }
      }
      for (let i = 0; i < this.map.boundaries.length; i++) {
        const boundary = this.map.boundaries[i];
        if (Collision.check(this.map.player, boundary, 0, -this.speed)) {
          this.map.moving = false;
          break;
        }
      }
      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.y -= this.speed)
        );
      }
    } else if (this.keys.a.pressed && this.lastKey === "a") {
      UserInterface.Info.innerHTML = "";
      this.map.player.moving = true;
      this.map.player.image = this.map.player.swimming
        ? this.map.player.sprites.swimLeft
        : this.map.player.sprites.left;
      for (let i = 0; i < this.map.boundaries.length; i++) {
        const boundary = this.map.boundaries[i];
        if (Collision.check(this.map.player, boundary, this.speed, 0)) {
          this.map.moving = false;
          break;
        }
      }
      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.x += this.speed)
        );
      }
    } else if (this.keys.d.pressed && this.lastKey === "d") {
      UserInterface.Info.innerHTML = "";
      this.map.player.moving = true;
      this.map.player.image = this.map.player.swimming
        ? this.map.player.sprites.swimRight
        : this.map.player.sprites.right;
      for (let i = 0; i < this.map.boundaries.length; i++) {
        const boundary = this.map.boundaries[i];
        if (Collision.check(this.map.player, boundary, -this.speed, 0)) {
          this.map.moving = false;
          break;
        }
      }
      if (this.map.moving) {
        this.map.movables.forEach(
          (movable) => (movable.position.x -= this.speed)
        );
      }
    }
  }
}
