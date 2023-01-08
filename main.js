import { Words10K } from "./Data/Words.js";
import { TibiaWords } from "./Data/Tibia.js";
import { SpecialMode } from "./Data/Special.js";
import { SvenskaMode } from "./Data/Svenska.js";
import Game from "./Game/Game.js";
import DataSource from "./Data/DataSource.js";
import { mapData } from "./Data/mapData.js";
import Helper from "./Utils/Helper.js";
import UserInterface from "./UserInterface/UserInterface.js";
import Level from "./Game/Level.js";
import Boundary from "./Game/Boundary.js";
import Sprite from "./Utils/Sprite.js";
import LandTile from "./Game/LandTile.js";
import MapInputHandler from "./UserInput/MapInputHandler.js";
import Collision from "./Utils/Collision.js";

const dataSource = new DataSource();
const store = dataSource.getStore();
const mapInputHandler = new MapInputHandler();

UserInterface.setUi(store);
UserInterface.setUpShop(dataSource);

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 2500;
  canvas.height = 1768;
  const offset = {
    x: -1520,
    y: -1050,
  };

  const tibiaContent = getLevelContent(TibiaWords, 50);
  const wordsContent = getLevelContent(Words10K, 100);
  const specialContent = getLevelContent(SpecialMode, 50);
  const svenskaContent = getLevelContent(SvenskaMode, 275);
  function getLevelContent(contentArr, levelSize, numberOfLevels = 1000) {
    const levelContents = [];
    for (let i = 0; i < numberOfLevels; i++) {
      const levelContent = contentArr.slice(-levelSize);
      contentArr.splice(-levelSize);
      if (levelContent.length !== levelSize) {
        break;
      }
      levelContents.push(levelContent);
    }
    return levelContents;
  }

  const landTiles = [];
  const boundaries = [];

  let svenskaLevelsArray = [];
  let tibiaLevelsArray = [];
  let specialLevelsArray = [];
  let wordsLevelsArray = [];

  let levelNumW = 0;
  let levelNumT = 0;
  let levelNumS = 0;
  let levelNumSv = 0;

  const levelData = store["completedLevels"];

  mapData.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + 590,
              y: i * Boundary.height + -1060,
            },
          })
        );
      }
      if (symbol === 99) {
        landTiles.push(
          new LandTile({
            position: {
              x: j * LandTile.width + 590,
              y: i * LandTile.height + -1060,
            },
          })
        );
      }
      if (symbol === 1) {
        addLevel(0, wordsContent, wordsLevelsArray, levelNumW, j, i);
        levelNumW++;
      }
      if (symbol === 6) {
        addLevel(6, tibiaContent, tibiaLevelsArray, levelNumT, j, i);
        levelNumT++;
      }
      if (symbol === 2) {
        addLevel(2, specialContent, specialLevelsArray, levelNumS, j, i);
        levelNumS++;
      }
      if (symbol === 3) {
        addLevel(3, svenskaContent, svenskaLevelsArray, levelNumSv, j, i);
        levelNumSv++;
      }
    });
  });

  function addLevel(mode, contentArr, levelArr, counter, j, i) {
    const storedLevel = levelData["mode"][mode][counter];
    let initNextLevel;
    if (levelData["mode"][mode][counter - 1]) {
      initNextLevel = counter;
    }
    const locked = !(storedLevel || initNextLevel <= counter || counter === 0);
    levelArr.push(
      new Level({
        mode: mode,
        position: {
          x: j * Level.width + 590,
          y: i * Level.height + -1060,
        },
        number: counter,
        locked: locked,
        content: contentArr[counter],
      })
    );
  }

  const image = new Image();
  image.src = "./assets/levelSelection/infinitemapzoom.webp";

  const foregroundImage = new Image();
  foregroundImage.src = "./assets/levelSelection/foreground.webp";

  const playerSprites = {
    up: this.document.getElementById("playerUp"),
    down: this.document.getElementById("playerDown"),
    left: this.document.getElementById("playerLeft"),
    right: this.document.getElementById("playerRight"),

    swimUp: this.document.getElementById("playerSwimUp"),
    swimDown: this.document.getElementById("playerSwimDown"),
    swimLeft: this.document.getElementById("playerSwimLeft"),
    swimRight: this.document.getElementById("playerSwimRight"),
  };

  const player = new Sprite({
    position: {
      x: canvas.width / 2 - 192 / 4 / 2,
      y: canvas.height / 2 - 68 / 4,
    },
    image: playerSprites.down,
    frames: { max: 4 },
    sprites: {
      up: playerSprites.up,
      down: playerSprites.down,
      left: playerSprites.left,
      right: playerSprites.right,
      swimDown: playerSprites.swimDown,
      swimUp: playerSprites.swimUp,
      swimLeft: playerSprites.swimLeft,
      swimRight: playerSprites.swimRight,
    },
    swimming: false,
  });

  const mapSprites = {
    map: this.document.getElementById("map"),
    foreground: this.document.getElementById("foreground"),
  };

  const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: mapSprites.map,
  });

  const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: mapSprites.foreground,
  });

  const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    enter: { pressed: false },
    q: { pressed: false },
  };

  let levelsArray = [
    ...wordsLevelsArray,
    ...tibiaLevelsArray,
    ...specialLevelsArray,
    ...svenskaLevelsArray,
  ];

  let movables = [
    background,
    ...boundaries,
    foreground,
    ...levelsArray,
    ...landTiles,
  ];

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
      background.draw(ctx);
      boundaries.forEach((boundary) => {
        boundary.draw(ctx);
      });
      landTiles.forEach((landtile) => {
        landtile.draw(ctx);
      });

      levelsArray.forEach((level) => {
        level.draw(ctx);
      });

      player.draw(ctx);

      foreground.draw(ctx);

      let moving = true;
      player.moving = false;
      for (let i = 0; i < levelsArray.length; i++) {
        const level = levelsArray[i];
        let completedlevel;
        if (Collision.check(player, level, 0, 0)) {
          completedlevel =
            dataSource.getStore().completedLevels.mode[level.mode][level.name];
          UserInterface.displayLevelInfo(completedlevel, level);
        }
      }
      if (mapInputHandler.keys.q.pressed) {
        UserInterface.Shop.hidden = false;
      } else {
        UserInterface.Shop.hidden = true;
      }
      if (mapInputHandler.keys.enter.pressed) {
        UserInterface.Info.innerHTML = "";
        for (let i = 0; i < levelsArray.length; i++) {
          const level = levelsArray[i];
          if (!level.locked && Collision.check(player, level, 0, 0)) {
            const nextLevel = levelsArray[i + 1];
            game = new Game(
              canvas.width,
              canvas.height,
              level,
              nextLevel,
              dataSource
            );
            canvas.classList.add("underwater");
            break;
          }
        }
      }

      if (mapInputHandler.keys.w.pressed && mapInputHandler.lastKey === "w") {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimUp
          : player.sprites.up;

        for (let i = 0; i < landTiles.length; i++) {
          const landtile = landTiles[i];
          if (Collision.check(player, landtile, 0, 3)) {
            player.swimming = false;
            break;
          } else {
            player.swimming = true;
          }
        }
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Collision.check(player, boundary, 0, 3)) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.y += 3));
        }
      } else if (
        mapInputHandler.keys.s.pressed &&
        mapInputHandler.lastKey === "s"
      ) {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimDown
          : player.sprites.down;
        for (let i = 0; i < landTiles.length; i++) {
          const landtile = landTiles[i];
          if (Collision.check(player, landtile, 0, -3)) {
            player.swimming = false;
            break;
          } else {
            player.swimming = true;
          }
        }
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Collision.check(player, boundary, 0, -3)) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.y -= 3));
        }
      } else if (
        mapInputHandler.keys.a.pressed &&
        mapInputHandler.lastKey === "a"
      ) {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimLeft
          : player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Collision.check(player, boundary, 3, 0)) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.x += 3));
        }
      } else if (
        mapInputHandler.keys.d.pressed &&
        mapInputHandler.lastKey === "d"
      ) {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimRight
          : player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Collision.check(player, boundary, -3, 0)) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.x -= 3));
        }
      }
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
