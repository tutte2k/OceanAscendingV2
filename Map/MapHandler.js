import Collision from "../Utils/Collision.js";
import Game from "../Game/Game.js";
import Shop from "./Shop.js";

export default class MapHandler {
  constructor(map) {
    this.map = map;
    this.keys = [];
  }
  keyDown(e) {
    if (this.keys.indexOf(e.key) === -1) {
      this.keys.push(e.key);
    }
  }
  keyUp(e) {
    if (this.keys.indexOf(e.key) > -1) {
      this.keys.splice(this.keys.indexOf(e.key), 1);
    }
  }
  move(direction, collisionX, collisionY) {
    this.map.player.lastDirection = direction;
    this.map.userInterface.elements.info.innerHTML = "";

    this.map.player.moving = true;
    this.map.player.sprite = this.map.player.state[direction];

    this.map.player.swimming = Collision.checkAll(
      this.map.landTiles,
      this.map.player,
      collisionX,
      collisionY
    );
    this.map.moving = Collision.checkAll(
      this.map.boundaries,
      this.map.player,
      collisionX,
      collisionY
    );
    const map = {
      up: "y",
      down: "y",
      left: "x",
      right: "x",
    };

    const Calculate = {
      up: (firstInput, secondInput) => (firstInput += secondInput),
      down: (firstInput, secondInput) => (firstInput -= secondInput),
      left: (firstInput, secondInput) => (firstInput += secondInput),
      right: (firstInput, secondInput) => (firstInput -= secondInput),
    };

    if (this.map.moving) {
      this.map.movables.forEach(
        (movable) =>
          (movable.position[map[direction]] = Calculate[direction](
            movable.position[map[direction]],
            this.map.player.speed
          ))
      );
    } else if (!this.map.player.swimming) {
      this.map.player.sprite = this.map.player.sprites.idle[direction];
      this.map.player.moving = false;
    } else if (this.map.player.swimming) {
      this.map.player.sprite = this.map.player.sprites.idle.swim;
      this.map.player.moving = false;
    }
  }

  handle() {
    this.checkForLevelCollision();
    if (this.keys.includes("Enter")) {
      const game = this.enterLevel();
      if (game) return game;
    }
    if (this.keys.includes("q") && this.map.player.swimming === false) {
      Shop.Element.hidden = false;
    } else {
      Shop.Element.hidden = true;
    }
    if (this.keys.includes("w") || this.keys.includes("W")) {
      this.move("up", 0, this.map.player.speed);
    } else if (this.keys.includes("s") || this.keys.includes("R")) {
      this.move("down", 0, -this.map.player.speed);
    } else if (this.keys.includes("a") || this.keys.includes("A")) {
      this.move("left", this.map.player.speed, 0);
    } else if (this.keys.includes("d") || this.keys.includes("S")) {
      this.move("right", -this.map.player.speed, 0);
    }
  }
  checkForLevelCollision() {
    for (let i = 0; i < this.map.levelsArray.length; i++) {
      const level = this.map.levelsArray[i];
      let completedlevel;
      if (Collision.check(this.map.player, level, 0, 0)) {
        completedlevel =
          this.map.dataSource.getStore().completedLevels.mode[level.mode.id][
            level.name
          ];
        this.map.userInterface.displayLevelInfo(completedlevel, level);
      }
    }
  }
  enterLevel() {
    this.keys.length = 0;
    this.map.userInterface.elements.info.innerHTML = "";
    for (let i = 0; i < this.map.levelsArray.length; i++) {
      const level = this.map.levelsArray[i];
      if (!level.locked && Collision.check(this.map.player, level, 0, 0)) {
        const nextLevel = this.map.levelsArray[i + 1];
        this.map.canvas.classList.add("underwater");
        return new Game(level, nextLevel, this.map.dataSource, this.map.canvas);
      }
    }
  }
}
