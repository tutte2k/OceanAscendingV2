import { Words10K,TibiaWords } from "./Data/Words.js";
import Game from "./Game/Game.js";
import DataSource from "./Data/DataSource.js";
import { collisionsMap } from "./Data/collisions.js";
import { levelsMap } from "./Data/levels.js";
import Helper from "./Utils/Helper.js";

const dataSource = new DataSource();

var cashElement = document.getElementById("cash");
cashElement.innerHTML = dataSource.getStore()["cash"];


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
  class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
      this.position = position
      this.image = image
      this.frames = { ...frames, val: 0, elapsed: 0 }
      this.image.onload = () => {
        this.width = this.image.width / this.frames.max
        this.height = this.image.height
      }
      this.moving = false;
      this.sprites = sprites;
    }
    draw() {

      ctx.drawImage(
        this.image,
        this.frames.val * this.width,
        0,
        this.image.width / this.frames.max,
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,
        this.image.height,
      )
      if (!this.moving) return;
      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }
      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++;
        else this.frames.val = 0;
      }

    }

  }
  class Boundary {
    static width = 66;
    static height = 66;
    constructor({ position }) {
      this.position = position;
      this.width = 66
      this.height = 66
    }
    draw() {
      ctx.fillStyle = "rgba(255,0,0,0)"
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  }
  class Level {
    static width = 66;
    static height = 66;
    constructor({ number, position, locked, content }) {
      this.position = position;
      this.width = 30;
      this.height = 30;
      this.locked = locked;
      this.content = content;
      this.name = number;
      this.mode = 0;
      this.words = content;

      this.maxScore = 0;
      this.words.forEach(
        (word) => (this.maxScore += word.length)
      );
    }
    draw() {
      ctx.fillStyle = this.locked === false ? "rgba(0,255,0)" : "rgba(255,0,0)"
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
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
          levelsArray.push(new Level({ position: { x: j * Level.width + 590, y: i * Level.height + -1060 }, number: levelNumW, locked: locked, content: wordsLevels[levelNumW] }))
          levelNumW++;
        }
        if (symbol === 6) {
          let storedLevel = levelData["mode"][6][levelNumT];
          let nextLevel;
          if (levelData["mode"][6][levelNumT - 1]) {
            nextLevel = levelNumT;
          }
          let locked = !(storedLevel || nextLevel <= levelNumT || levelNumT === 0);
          levelsArray.push(new Level({ position: { x: j * Level.width + 590, y: i * Level.height + -1060 }, number: levelNumT, locked: locked, content: tibiaLevels[levelNumT] }))
          levelNumT++;
        }
      })
    })
    return levelsArray;

  }



  const image = new Image();
  image.src = "./assets/levelSelection/infinitemapzoom.png";

  const foregroundImage = new Image();
  foregroundImage.src = "./assets/levelSelection/foreground.png";

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

  function animate(timeStamp) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (game && game.level) {
      game.draw(ctx);
      game.update(deltaTime);

    }
    else if (game) {
      canvas.classList.remove("underwater");
      game = null;
    }

    else {
      background.draw()
      boundaries.forEach(boundary => {
        boundary.draw()
      })
      levelsArray.forEach(level => {
        level.draw()
      })
      player.draw();
      foreground.draw()
      let moving = true;
      player.moving = false;
      if (keys.enter.pressed) {
        for (let i = 0; i < levelsArray.length; i++) {
          const level = levelsArray[i];
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


  // document.addEventListener("keydown", (event) => {
  //   if (!enteredLevel) {
  //     console.log("asd")
  //     enteredLevel = levelSelectionGame.handleKeyDown(event);
  //     if (enteredLevel) {
  //       toggleBubbles();
  //       
  //       game = new Game(
  //         canvas.width,
  //         canvas.height,
  //         enteredLevel,
  //         dataSource
  //       );
  //     } else {
  //       canvas.classList.remove("underwater");
  //     }
  //   }
  // });


  // const mapMatrix = [];
  // for (let i = 0; i < canvas.height / 64; i++) {
  //   let row = [];
  //   for (let j = 0; j < canvas.width / 64; j++) {
  //     row.push(0);
  //   }
  //   mapMatrix.push(row);
  // }

  // const tibiaLevels = [];
  // for (let i = 0; i < 10; i++) {
  //   const level = TibiaWords.slice(-50);
  //   TibiaWords.splice(-50);
  //   if (level.length !== 50) {
  //     break
  //   }
  //   tibiaLevels.push(level);
  // }

  // var wordsLevels = [];
  // for (let i = 0; i < 100; i++) {
  //   const level = Words10K.slice(-100);
  //   Words10K.splice(-100);
  //   wordsLevels.push(level);
  // }

  // let mapLevels = drawLevels();

  // function drawLevels() {
  //   let mapLevels = [];
  //   let levelData = dataSource.getStore()["completedLevels"];
  //   for (let i = 0; i < tibiaLevels.length; i++) {
  //     let storedLevel = levelData["mode"][6][i];
  //     let nextLevel;
  //     if (levelData["mode"][6][i - 1]) {
  //       nextLevel = i;
  //     }
  //     let locked = !(storedLevel || nextLevel <= i || i === 0);
  //     mapLevels.push(
  //       new LevelSelectionLevel(
  //         i,
  //         6,
  //         tibiaLevels[i].slice(),
  //         i,
  //         2,
  //         locked
  //       )
  //     );
  //   }
  //   let row = 2;
  //   let col = 25;
  //   for (let i = 0; i < wordsLevels.length; i++) {
  //     let storedLevel = levelData["mode"][0][i];
  //     let nextLevel;
  //     if (levelData["mode"][0][i - 1]) {
  //       nextLevel = i;
  //     }
  //     let locked = !(storedLevel || nextLevel <= i || i === 0);

  //     if (i % 10 === 0) {
  //       col++
  //       row = 2
  //     }
  //     mapLevels.push(
  //       new LevelSelectionLevel(
  //         i,
  //         0,
  //         wordsLevels[i].slice(),
  //         col,
  //         row,
  //         locked
  //       )
  //     );
  //     row++
  //   }
  //   return mapLevels;
  // }

  // let map = new LevelSelectionMap(
  //   mapMatrix,
  //   mapLevels,
  //   canvas.width,
  //   canvas.height
  // );

  // let levelSelectionGame = new LevelSelectionGame(map);

  // var game;
  // let enteredLevel;

  // document.addEventListener("keydown", (event) => {
  //   if (!enteredLevel) {
  //     enteredLevel = levelSelectionGame.handleKeyDown(event);
  //     if (enteredLevel) {
  //       toggleBubbles();
  //       canvas.classList.add("underwater");
  //       game = new Game(
  //         canvas.width,
  //         canvas.height,
  //         enteredLevel,
  //         dataSource
  //       );
  //     } else {
  //       canvas.classList.remove("underwater");
  //     }
  //   }
  // });




  // let lastTime = 0;
  // function animate(timeStamp) {
  //   const deltaTime = timeStamp - lastTime;
  //   lastTime = timeStamp;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   if (game && game.level) {
  //     game.draw(ctx);
  //     game.update(deltaTime);
  //   } else {
  //     if (enteredLevel) {
  //       levelSelectionGame.map.levels = drawLevels();
  //       toggleBubbles();
  //     }

  //     enteredLevel = null;
  //     levelSelectionGame.draw(ctx);
  //     levelSelectionGame.map.update(deltaTime);
  //   }
  //   requestAnimationFrame(animate);
  // }
  // animate(0);



  // canvas.width = 2500;
  // canvas.height = 1768;

  // var selectedMode = 0;
  // var store = JSON.parse(this.localStorage.getItem("store"));
  // var cashElement = this.document.getElementById("cash");

  // if (store === null) {
  //   store = {
  //     cash: 0,
  //     completedLevels: { mode: { 0: [], 6: [] } },
  //     stats: { air: 0, mine: 0, speed: 0 },
  //     drops: {
  //       zapper: 0,
  //       shield: 0,
  //       timewarp: 0,
  //     },
  //     regen: { air: 0, mine: 0 },
  //   };
  //   cashElement.innerHTML = 0;
  // } else {
  //   cashElement.innerHTML = store["cash"];
  // }

  // var tibiaLevels = [];
  // for (let i = 0; i < 4; i++) {
  //   const level = TibiaWords.slice(-50);
  //   TibiaWords.splice(-50);
  //   tibiaLevels.push(level);
  // }

  // var wordsLevels = [];
  // for (let i = 0; i < 100; i++) {
  //   const level = Words10K.slice(-100);
  //   Words10K.splice(-100);
  //   wordsLevels.push(level);
  // }

  // var currentLevel = store.completedLevels.mode[selectedMode].length || 0;

  // let modeSelectElement = this.document.getElementById("mode-select");
  // modeSelectElement.addEventListener("change", function (e) {
  //   let arr = [...e.path[0].children];
  //   let selected = arr.find((option) => option.selected === true);
  //   selectedMode = selected.value;
  //   currentLevel = store.completedLevels.mode[selectedMode].length;
  //   updateLevelButtons();
  //   startGame(currentLevel);
  //   document.activeElement.blur();
  // });
  // let game;

  // try {
  //   game = new Game(
  //     selectedMode,
  //     canvas.width,
  //     canvas.height,
  //     modes[selectedMode].words[currentLevel].slice(),
  //     currentLevel
  //   );
  // } catch (error) {
  //   game = new Game(
  //     selectedMode,
  //     canvas.width,
  //     canvas.height,
  //     modes[selectedMode].words[0].slice(),
  //     0
  //   );
  // }

  // updateLevelButtons();
  // function updateLevelButtons() {
  //   const bad = "👎";
  //   const ok = "🆗";
  //   const good = "👍";
  //   const perfect = "💯";
  //   const hook = "🪝";
  //   let levelContainer = window.document.getElementById("levelContainer");
  //   let maxLevel = 0;
  //   let total = [];
  //   let totalSum = 0;
  //   let number = 0;

  //   let emoji;

  //   while (levelContainer.lastChild) {
  //     levelContainer.removeChild(levelContainer.lastChild);
  //   }
  //   for (let i = 0; i < modes[selectedMode].groups; i++) {
  //     levelContainer.appendChild(createBtnGrp(i));
  //   }

  //   store.completedLevels.mode[selectedMode].forEach((levelObject) => {
  //     let level = levelObject.level;
  //     let score = levelObject.score;
  //     let btnGrp = window.document.getElementById(`btnGrp${number}`);

  //     if ((maxLevel + 1) % 10 == 0) {
  //       for (let i = 0; i < total.length; i++) {
  //         totalSum += total[i];
  //       }
  //       let avgScore = totalSum / total.length;
  //       if (avgScore >= 75) emoji = perfect;
  //       else if (avgScore >= 50) emoji = good;
  //       else if (avgScore >= 25) emoji = ok;
  //       else if (avgScore < 25) emoji = bad;
  //       btnGrp.children[0].innerHTML += `${emoji}${avgScore.toFixed(0)}%`;
  //       btnGrp.children[0].classList.add("p-0");
  //       number++;
  //       totalSum = 0;
  //       total.length = 0;
  //     }

  //     let availableScore = 0;

  //     modes[selectedMode].words[level].forEach((word) => {
  //       availableScore += word.length;
  //     });

  //     if (availableScore === 0) {
  //       modes[selectedMode].words[level + 1].forEach((word) => {
  //         availableScore += word.length;
  //       });
  //     }
  //     let button = window.document.createElement("button");
  //     button.classList.add("btn", "btn-outline-secondary", "p-0", "m-0");
  //     let percent = score / availableScore;
  //     total.push(percent * 100);
  //     if (percent >= 0.75) emoji = perfect;
  //     else if (percent >= 0.5) emoji = good;
  //     else if (percent >= 0.25) emoji = ok;
  //     else if (percent < 0.25) emoji = bad;
  //     else emoji = hook;
  //     button.innerHTML = `${level} ${emoji} ${(percent * 100).toFixed(0)}%`;
  //     button.value = level;
  //     button.addEventListener("click", function (e) {
  //       startGame(+e.target.value);
  //       document.activeElement.blur();
  //     });
  //     btnGrp.children[1].appendChild(button);

  //     maxLevel++;
  //   });
  //   let button = window.document.createElement("button");
  //   button.id = "progressBtn";
  //   button.classList.add("btn", "btn-success", "mt-2");
  //   button.innerHTML = `Go Fish ${hook} Level ${
  //     maxLevel || +game.level.name
  //   } `;
  //   button.value = maxLevel || +game.level.name;
  //   button.addEventListener("click", function (e) {
  //     startGame(+e.target.value);
  //     document.activeElement.blur();
  //   });
  //   levelContainer.appendChild(button);
  // }

  // function createBtnGrp(id) {
  //   const btnGrp = window.document.createElement("div");
  //   btnGrp.id = `btnGrp${id}`;
  //   btnGrp.classList.add("btn-group");
  //   btnGrp.role = "group";
  //   const displayButton = window.document.createElement("button");
  //   displayButton.classList.add("btn", "btn-outline-secondary");
  //   displayButton.setAttribute("aria-expanded", "false");
  //   displayButton.setAttribute("data-bs-toggle", "dropdown");
  //   displayButton.innerHTML =
  //     id == 0 ? 0 + "-" + "9" : id + "0" + "-" + (id + "9");
  //   btnGrp.appendChild(displayButton);
  //   const dropdown = window.document.createElement("div");
  //   dropdown.id = `dropdown${id}`;
  //   dropdown.classList.add("dropdown-menu", "row-cols-1", "p-0");
  //   btnGrp.appendChild(dropdown);
  //   return btnGrp;
  // }

  // function startGame(levelSelect) {
  //   if (levelSelect < modes[selectedMode].levels) {
  //     game = new Game(
  //       selectedMode,
  //       canvas.width,
  //       canvas.height,
  //       modes[selectedMode].words[levelSelect].slice(),
  //       levelSelect
  //     );
  //   } else {
  //     game = new Game(
  //       selectedMode,
  //       canvas.width,
  //       canvas.height,
  //       modes[selectedMode].words[0].slice(),
  //       0
  //     );
  //   }
  //   document.activeElement.blur();
  // }
  // var audio = new Audio("./assets/level1.flac");
  // audio.loop = true;

  // let playbtn = this.document.getElementById("playMusic");
  // playbtn.addEventListener("click", () => playMusic());
  // let playing = false;
  // function playMusic() {
  //   playing = !playing;
  //   playing ? audio.play() : audio.pause();
  // }

  // let lastTime = 0;
  // function animate(timeStamp) {
  //   const deltaTime = timeStamp - lastTime;
  //   lastTime = timeStamp;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   game.draw(ctx);
  //   game.update(deltaTime);
  //   requestAnimationFrame(animate);
  // }

  // animate(0);
});
