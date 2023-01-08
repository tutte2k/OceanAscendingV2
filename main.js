import { Words10K } from "./Data/Words.js";
import { TibiaWords } from "./Data/Tibia.js";
import { SpecialMode } from "./Data/Special.js";
import { SvenskaMode } from "./Data/Svenska.js";
import Game from "./Game/Game.js";
import DataSource from "./Data/DataSource.js";
import { collisionsMap } from "./Data/collisions.js";
import { levelsMap } from "./Data/levels.js";
import Helper from "./Utils/Helper.js";
import UserInterface from "./UserInterface/UserInterface.js";
import Level from "./Game/Level.js";
import Boundary from "./Game/Boundary.js";
import Sprite from "./Utils/Sprite.js";
import LandTile from "./Game/LandTile.js";

const dataSource = new DataSource();
const store = dataSource.getStore();

setUi(store);
function setUi(store) {
  UserInterface.Cash.innerHTML = store.cash;
  UserInterface.ShopContent.airSlot.current.innerHTML = store.shop.airSlot;
  UserInterface.ShopContent.airReg.current.innerHTML =
    30 - store.shop.airReg * 2 + " seconds";
  UserInterface.ShopContent.mineReg.current.innerHTML =
    30 - store.shop.mineReg * 2 + " seconds";
  UserInterface.ShopContent.mineSlot.current.innerHTML = store.shop.mineSlot;
}

UserInterface.ShopContent.airSlot.priceElement.innerHTML =
  UserInterface.ShopContent.airSlot.price;
UserInterface.ShopContent.airReg.priceElement.innerHTML =
  UserInterface.ShopContent.airReg.price;
UserInterface.ShopContent.mineReg.priceElement.innerHTML =
  UserInterface.ShopContent.mineReg.price;
UserInterface.ShopContent.mineSlot.priceElement.innerHTML =
  UserInterface.ShopContent.mineSlot.price;

UserInterface.Shop.addEventListener("click", (e) => {
  let cash = dataSource.getStore()["cash"];
  let btn = UserInterface.ShopContent[e.target.id];
  btn &&
    UserInterface.ShopContent[e.target.id].price <= cash &&
    buy(e.target.id, cash);
});

function buy(id, cash) {
  let store = dataSource.getStore();
  store.shop[id]++;
  store.cash = cash - UserInterface.ShopContent[id].price;
  setUi(store);
  dataSource.setStore(store);
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 2500;
  canvas.height = 1768;

  const offset = {
    x: -1520,
    y: -1050,
  };

  const landTiles = [];
  const boundaries = [];

  collisionsMap.forEach((row, i) => {
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
    });
  });

  const tibiaLevels = getLevelsWithContent(TibiaWords, 50);
  const wordsLevels = getLevelsWithContent(Words10K, 100);
  const specialLevels = getLevelsWithContent(SpecialMode, 50);
  const svenskaLevels = getLevelsWithContent(SvenskaMode, 275);

  function getLevelsWithContent(contentArr, levelSize, numberOfLevels = 1000) {
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

  let svenskaLevelsArray = [];
  let tibiaLevelsArray = [];
  let specialLevelsArray = [];
  let wordsLevelsArray = [];

  let levelNumW = 0;
  let levelNumT = 0;
  let levelNumS = 0;
  let levelNumSv = 0;

  let levelData = store["completedLevels"];

  function addLevel(mode, contentArr, levelArr, counter, j, i) {
    let storedLevel = levelData["mode"][mode][counter];
    let initNextLevel;
    if (levelData["mode"][mode][counter - 1]) {
      initNextLevel = counter;
    }
    let locked = !(storedLevel || initNextLevel <= counter || counter === 0);
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

  levelsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
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
        addLevel(0, wordsLevels, wordsLevelsArray, levelNumW, j, i);
        levelNumW++;
        // let storedLevel = levelData["mode"][0][levelNumW];
        // let initNextLevel;
        // if (levelData["mode"][0][levelNumW - 1]) {
        //   initNextLevel = levelNumW;
        // }
        // let locked = !(
        //   storedLevel ||
        //   initNextLevel <= levelNumW ||
        //   levelNumW === 0
        // );
        // wordsLevelsArray.push(
        //   new Level({
        //     mode: 0,
        //     position: {
        //       x: j * Level.width + 590,
        //       y: i * Level.height + -1060,
        //     },
        //     number: levelNumW,
        //     locked: locked,
        //     content: wordsLevels[levelNumW],
        //   })
        // );
        // levelNumW++;
      }
      if (symbol === 6) {
        addLevel(6, tibiaLevels, tibiaLevelsArray, levelNumT, j, i);
        levelNumT++;
        // let storedLevel = levelData["mode"][6][levelNumT];
        // let initNextLevel;
        // if (levelData["mode"][6][levelNumT - 1]) {
        //   initNextLevel = levelNumT;
        // }
        // let locked = !(
        //   storedLevel ||
        //   initNextLevel <= levelNumT ||
        //   levelNumT === 0
        // );
        // tibiaLevelsArray.push(
        //   new Level({
        //     mode: 6,
        //     position: {
        //       x: j * Level.width + 590,
        //       y: i * Level.height + -1060,
        //     },
        //     number: levelNumT,
        //     locked: locked,
        //     content: tibiaLevels[levelNumT],
        //   })
        // );
        // levelNumT++;
      }

      if (symbol === 2) {
        addLevel(2, specialLevels, specialLevelsArray, levelNumS, j, i);
        levelNumS++;
        // let storedLevel = levelData["mode"][2][levelNumS];
        // let initNextLevel;
        // if (levelData["mode"][2][levelNumS - 1]) {
        //   initNextLevel = levelNumS;
        // }
        // let locked = !(
        //   storedLevel ||
        //   initNextLevel <= levelNumS ||
        //   levelNumS === 0
        // );
        // specialLevelsArray.push(
        //   new Level({
        //     mode: 2,
        //     position: {
        //       x: j * Level.width + 590,
        //       y: i * Level.height + -1060,
        //     },
        //     number: levelNumS,
        //     locked: locked,
        //     content: specialLevels[levelNumS],
        //   })
        // );
        // levelNumS++;
      }
      if (symbol === 3) {
        addLevel(3, svenskaLevels, svenskaLevelsArray, levelNumSv, j, i);
        levelNumSv++;
        // let storedLevel = levelData["mode"][3][levelNumSv];
        // let initNextLevel;
        // if (levelData["mode"][3][levelNumSv - 1]) {
        //   initNextLevel = levelNumSv;
        // }
        // let locked = !(
        //   storedLevel ||
        //   initNextLevel <= levelNumSv ||
        //   levelNumSv === 0
        // );
        // svenskaLevelsArray.push(
        //   new Level({
        //     mode: 3,
        //     position: {
        //       x: j * Level.width + 590,
        //       y: i * Level.height + -1060,
        //     },
        //     number: levelNumSv,
        //     locked: locked,
        //     content: svenskaLevels[levelNumSv],
        //   })
        // );
        // levelNumSv++;
      }
    });
  });

  const image = new Image();
  image.src = "./assets/levelSelection/infinitemapzoom.webp";

  const foregroundImage = new Image();
  foregroundImage.src = "./assets/levelSelection/foreground.webp";

  const playerImage = new Image();
  playerImage.src = "./assets/levelSelection/playerDown.png";

  const playerUpImage = new Image();
  playerUpImage.src = "./assets/levelSelection/playerUp.png";

  const playerLeftImage = new Image();
  playerLeftImage.src = "./assets/levelSelection/playerLeft.png";

  const playerRightImage = new Image();
  playerRightImage.src = "./assets/levelSelection/playerRight.png";

  const playerDownImage = new Image();
  playerDownImage.src = "./assets/levelSelection/playerDown.png";

  const playerSwimDown = new Image();
  playerSwimDown.src = "./assets/levelSelection/playerSwimDown.png";

  const playerSwimUp = new Image();
  playerSwimUp.src = "./assets/levelSelection/playerSwimUp.png";

  const playerSwimLeft = new Image();
  playerSwimLeft.src = "./assets/levelSelection/playerSwimLeft.png";

  const playerSwimRight = new Image();
  playerSwimRight.src = "./assets/levelSelection/playerSwimRight.png";

  const player = new Sprite({
    position: {
      x: canvas.width / 2 - 192 / 4 / 2,
      y: canvas.height / 2 - 68 / 4,
    },
    image: playerDownImage,
    frames: { max: 4 },
    sprites: {
      up: playerUpImage,
      left: playerLeftImage,
      right: playerRightImage,
      down: playerDownImage,
      swimDown: playerSwimDown,
      swimUp: playerSwimUp,
      swimLeft: playerSwimLeft,
      swimRight: playerSwimRight,
    },
    swimming: false,
  });

  const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: image,
  });

  const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: foregroundImage,
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
        if (
          Helper.hasCollided({
            rectangle1: player,
            rectangle2: {
              ...level,
              position: { x: level.position.x, y: level.position.y + 3 },
            },
          })
        ) {
          completedlevel =
            dataSource.getStore().completedLevels.mode[level.mode][level.name];
          UserInterface.displayLevelInfo(completedlevel, level);
        }
      }
      if (keys.q.pressed) {
        UserInterface.Shop.hidden = false;
      } else {
        UserInterface.Shop.hidden = true;
      }
      if (keys.enter.pressed) {
        UserInterface.Info.innerHTML = "";
        for (let i = 0; i < levelsArray.length; i++) {
          const level = levelsArray[i];
          if (
            !level.locked &&
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...level,
                position: { x: level.position.x, y: level.position.y + 3 },
              },
            })
          ) {
            let nextLevel = levelsArray[i + 1];
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

      if (keys.w.pressed && lastKey === "w") {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimUp
          : player.sprites.up;

        for (let i = 0; i < landTiles.length; i++) {
          const landtile = landTiles[i];
          if (
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...landtile,
                position: {
                  x: landtile.position.x,
                  y: landtile.position.y + 3,
                },
              },
            })
          ) {
            player.swimming = false;
            break;
          } else {
            player.swimming = true;
          }
        }

        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y + 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.y += 3));
        }
      } else if (keys.s.pressed && lastKey === "s") {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimDown
          : player.sprites.down;

        for (let i = 0; i < landTiles.length; i++) {
          const landtile = landTiles[i];
          if (
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...landtile,
                position: {
                  x: landtile.position.x,
                  y: landtile.position.y - 3,
                },
              },
            })
          ) {
            player.swimming = false;
            break;
          } else {
            player.swimming = true;
          }
        }
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x,
                  y: boundary.position.y - 3,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.y -= 3));
        }
      } else if (keys.a.pressed && lastKey === "a") {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimLeft
          : player.sprites.left;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x + 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.x += 3));
        }
      } else if (keys.d.pressed && lastKey === "d") {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.swimming
          ? player.sprites.swimRight
          : player.sprites.right;
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (
            Helper.hasCollided({
              rectangle1: player,
              rectangle2: {
                ...boundary,
                position: {
                  x: boundary.position.x - 3,
                  y: boundary.position.y,
                },
              },
            })
          ) {
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
  let lastKey = "";
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.key) {
      case "w":
        keys.w.pressed = true;
        lastKey = "w";
        break;
      case "a":
        keys.a.pressed = true;
        lastKey = "a";
        break;
      case "s":
        keys.s.pressed = true;
        lastKey = "s";
        break;
      case "d":
        keys.d.pressed = true;
        lastKey = "d";
        break;
      case "Enter":
        keys.enter.pressed = true;
        break;
      case "q":
        keys.q.pressed = true;
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "s":
        keys.s.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
      case "Enter":
        keys.enter.pressed = false;
        break;
      case "q":
        keys.q.pressed = false;
        break;
    }
  });

  //   const bad = "👎";
  //   const ok = "🆗";
  //   const good = "👍";
  //   const perfect = "💯";
  //   const hook = "🪝";

  // var audio = new Audio("./assets/level1.flac");
  // audio.loop = true;

  // let playbtn = this.document.getElementById("playMusic");
  // playbtn.addEventListener("click", () => playMusic());
  // let playing = false;
  // function playMusic() {
  //   playing = !playing;
  //   playing ? audio.play() : audio.pause();
  // }
});
