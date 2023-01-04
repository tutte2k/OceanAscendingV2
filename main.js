import { Words10K, TibiaWords } from "./Data/Words.js";
import Game from "./Game/Game.js";
import DataSource from "./Data/DataSource.js";
import { collisionsMap } from "./Data/collisions.js";
import { levelsMap } from "./Data/levels.js";
import Helper from "./Utils/Helper.js";
import UserInterface from "./UserInterface/UserInterface.js";
import Level from "./Game/Level.js";
import Boundary from "./Game/Boundary.js";
import Sprite from "./Utils/Sprite.js";

const dataSource = new DataSource();
UserInterface.Cash.innerHTML = dataSource.getStore()["cash"];

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 2500;
  canvas.height = 1768;

  const boundaries = []
  const offset = {
    x: -1520,
    y: -1050
  }
  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025) {
        boundaries.push(new Boundary({ position: { x: j * Boundary.width + 590, y: i * Boundary.height + -1060 } }))
      }
    })
  })
  const tibiaLevels = [];
  for (let i = 0; i < 10; i++) {
    const level = TibiaWords.slice(-50);
    TibiaWords.splice(-50);
    if (level.length !== 50) {
      break
    }
    tibiaLevels.push(level);
  }

  var wordsLevels = [];
  for (let i = 0; i < 100; i++) {
    const level = Words10K.slice(-100);
    Words10K.splice(-100);
    wordsLevels.push(level);
  }

  let levelsArray = maplevels()
  function maplevels() {
    const levelsArray = [];
    let levelNumW = 0;
    let levelNumT = 0;
    let levelData = dataSource.getStore()["completedLevels"];

    levelsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1) {
          let storedLevel = levelData["mode"][0][levelNumW];
          let nextLevel;
          if (levelData["mode"][0][levelNumW - 1]) {
            nextLevel = levelNumW;
          }
          let locked = !(storedLevel || nextLevel <= levelNumW || levelNumW === 0);
          levelsArray.push(new Level({ mode: 0, position: { x: j * Level.width + 590, y: i * Level.height + -1060 }, number: levelNumW, locked: locked, content: wordsLevels[levelNumW] }))
          levelNumW++;
        }
        if (symbol === 6) {
          let storedLevel = levelData["mode"][6][levelNumT];
          let nextLevel;
          if (levelData["mode"][6][levelNumT - 1]) {
            nextLevel = levelNumT;
          }
          let locked = !(storedLevel || nextLevel <= levelNumT || levelNumT === 0);
          levelsArray.push(new Level({ mode: 6, position: { x: j * Level.width + 590, y: i * Level.height + -1060 }, number: levelNumT, locked: locked, content: tibiaLevels[levelNumT] }))
          levelNumT++;
        }
      })
    })

    return levelsArray;
  }
  const image = new Image();
  image.src = "./assets/levelSelection/infinitemapzoom.png";

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

  const player = new Sprite({
    position: {
      x: canvas.width / 2 - (192 / 4) / 2,
      y: canvas.height / 2 - 68 / 4,
    }, image: playerDownImage, frames: { max: 4 },
    sprites: {
      up: playerUpImage,
      left: playerLeftImage,
      right: playerRightImage,
      down: playerDownImage,
    }
  })
  const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: image
  })
  const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: foregroundImage
  })

  const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    enter: { pressed: false },
  }
  let movables = [background, ...boundaries, foreground, ...levelsArray]

  let game;
  let lastTime = 0;
  let state;
  let nextLevel;
  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (game && game.level) {
      game.draw(ctx);
      state = game.update(deltaTime);
    }
    else if (game) {
      canvas.classList.remove("underwater");
      if (nextLevel && state.win === true) {
        nextLevel.locked = false;
      }
      state = null;
      game = null;
    }
    else {
      background.draw(ctx)
      boundaries.forEach(boundary => {
        boundary.draw(ctx)
      })
      levelsArray.forEach(level => {
        level.draw(ctx)
      })
      player.draw(ctx);
      foreground.draw(ctx)
      let moving = true;
      player.moving = false;
      for (let i = 0; i < levelsArray.length; i++) {
        const level = levelsArray[i]
        let completedlevel;
        if (Helper.hasCollided({ rectangle1: player, rectangle2: { ...level, position: { x: level.position.x, y: level.position.y + 3 } } })) {
          completedlevel = dataSource.getStore().completedLevels.mode[level.mode][level.name]
          if (completedlevel) {
            UserInterface.Info.innerHTML = "Mode: " + level.mode + "<br>Level: " + completedlevel.level + "<br>Score: " + completedlevel.score + "/" + level.maxScore
          }
          else if (level.locked) {
            UserInterface.Info.innerHTML = "Mode: " + level.mode + "<br>Level: " + level.name + "<br>LOCKED";
          }
          else {
            UserInterface.Info.innerHTML = "Mode: " + level.mode + "<br>Level: " + level.name + "<br>Score: " + 0 + "/" + level.maxScore;
          }
        }
      }
      if (keys.enter.pressed) {
        UserInterface.Info.innerHTML = "";
        for (let i = 0; i < levelsArray.length; i++) {
          const level = levelsArray[i]
          nextLevel = levelsArray[i + 1]
          if (!level.locked && Helper.hasCollided({ rectangle1: player, rectangle2: { ...level, position: { x: level.position.x, y: level.position.y + 3 } } })) {
            game = new Game(
              canvas.width,
              canvas.height,
              level,
              dataSource
            );
            canvas.classList.add("underwater");
            break;
          }
        }
      }
      
      if (keys.w.pressed && lastKey === 'w') {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Helper.hasCollided({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + 3 } } })) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => movable.position.y += 3)
        }
      }
      else if (keys.s.pressed && lastKey === 's') {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Helper.hasCollided({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - 3 } } })) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => movable.position.y -= 3)
        }
      }
      else if (keys.a.pressed && lastKey === 'a') {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Helper.hasCollided({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x + 3, y: boundary.position.y } } })) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => movable.position.x += 3)
        }
      }
      else if (keys.d.pressed && lastKey === 'd') {
        UserInterface.Info.innerHTML = "";
        player.moving = true;
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i];
          if (Helper.hasCollided({ rectangle1: player, rectangle2: { ...boundary, position: { x: boundary.position.x - 3, y: boundary.position.y } } })) {
            moving = false;
            break;
          }
        }
        if (moving) {
          movables.forEach((movable) => movable.position.x -= 3)
        }
      }
     
      
    }
    window.requestAnimationFrame(animate)
  }
  animate(0);
  let lastKey = ''
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = true;
        lastKey = 'w'
        break
      case 'a':
        keys.a.pressed = true;
        lastKey = 'a'
        break
      case 's':
        keys.s.pressed = true;
        lastKey = 's'
        break
      case 'd':
        keys.d.pressed = true;
        lastKey = 'd'
        break
      case 'Enter':
        keys.enter.pressed = true;
        break
    }
  })
  window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = false;
        break
      case 'a':
        keys.a.pressed = false;
        break
      case 's':
        keys.s.pressed = false;
        break
      case 'd':
        keys.d.pressed = false;
        break
      case 'Enter':
        keys.enter.pressed = false;
        break
    }
  })

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
