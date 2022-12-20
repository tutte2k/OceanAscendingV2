import FloatingMessage from "./Environment/FloatingMessage.js";
import InputHandler from "./Game/InputHandler.js";
import { Player } from "./Player/Player.js";
import Particle from "./Environment/Particle.js";
import { Background } from "./Environment/Background.js";
import UserInterface from "./Environment/UserInterface.js";
import {
  FireExplosion,
  InkExplosion,
  SmokeExplosion,
} from "./Environment/Explosion.js";
import { TibiaWords, Words10K } from "./Game/Words.js";
import {
  Angler1,
  Angler2,
  LuckyFish,
  HiveWhale,
  Drone,
  Turtle,
  Lionfish,
  Seahorse,
  Jellyfish,
  Chtullie,
  Angela,
  Goldfish,
  Shark,
} from "./Enemy/Enemy.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 2500;
  canvas.height = 1768;

  var selectedMode = 0;
  var store = JSON.parse(this.localStorage.getItem("store"));
  var cashElement = this.document.getElementById("cash");

  if (store === null) {
    store = {
      cash: 0,
      completedLevels: { mode: { 0: [], 6: [] } },
      stats: { air: 0, mine: 0, speed: 0 },
      drops: {
        zapper: 0,
        shield: 0,
        timewarp: 0,
      },
      regen: { air: 0, mine: 0 },
    };
    cashElement.innerHTML = 0;
  } else {
    cashElement.innerHTML = store["cash"];
  }

  class Game {
    constructor(mode, width, height, words, specifiedLevel) {
      this.mode = mode;

      this.specifiedLevel = specifiedLevel;
      this.words = words;

      this.lose = false;
      this.win = false;
      this.score = 0;

      this.gameOver = false;

      this.width = width;
      this.height = height;

      this.gameTime = 0;

      this.background = new Background(this);
      this.inputHandler = new InputHandler(this);
      this.userInterface = new UserInterface(this);

      this.keys = [];

      this.player = new Player(this);

      this.health = 3;
      this.focus = null;

      this.ammo = 1;
      this.maxAmmo = 1;
      this.ammoTimer = 0;
      this.ammoInterval = 30000;

      this.enemies = [];
      this.particles = [];
      this.explosions = [];

      this.floatingMessages = [];

      this.speed = 1;

      this.enemyTimer = 0;
      this.enemyInterval = 1000;
    }
    update(deltaTime) {
      if (this.health < 1) {
        this.lose = true;
      } else if (this.words.length === 0 && !this.gameOver) {
        this.win = true;
        this.enemies.forEach((enemy) => {
          this.score += enemy.score;
          enemy.markedForDeletion = true;
        });

        let earnedCash;

        let levelObject = store.completedLevels.mode[this.mode].find(
          (obj) => obj.level === this.specifiedLevel
        );

        if (!levelObject) {
          levelObject = { level: this.specifiedLevel, score: this.score };
          store.completedLevels.mode[this.mode].push(levelObject);

          let availableScore = getAvailableScore(this.specifiedLevel);

          earnedCash =
            this.specifiedLevel +
            Math.round((this.score / availableScore) * 10);

          storeStore(earnedCash);
        } else if (levelObject.score < this.score) {
          let previousScore = levelObject.score;
          let currentScore = this.score;
          let earnableScore = currentScore - previousScore;

          store.completedLevels.mode[this.mode][this.specifiedLevel].score =
            this.score;

          earnedCash = Math.round(
            (earnableScore / getAvailableScore(this.specifiedLevel)) * 10
          );
          storeStore(earnedCash);
        }
        updateLevelButtons();
        game.specifiedLevel++;
      }
      this.gameOver = this.lose == true || this.win === true;
      if (!this.gameOver) {
        this.gameTime += deltaTime;
        this.background.update();
        this.background.layer4.update();
        if (this.ammoTimer > this.ammoInterval) {
          if (this.ammo < this.maxAmmo) {
            this.ammo++;
          }
          this.ammoTimer = 0;
        } else {
          this.ammoTimer += deltaTime;
        }
      }
      this.player.update(deltaTime);
      this.particles.forEach((particle) => particle.update());
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.explosions.forEach((explosion) => explosion.update(deltaTime));
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markedForDeletion
      );
      this.floatingMessages.forEach((floatingMessage) =>
        floatingMessage.update(deltaTime)
      );
      this.floatingMessages = this.floatingMessages.filter(
        (floatingMessage) => !floatingMessage.markedForDeletion
      );
      this.enemies.forEach((enemy) => {
        if (enemy.focused === true) {
          this.focus = enemy;
        }
        enemy.update(deltaTime);
        if (this.checkCollision(this.player, enemy)) {
          if (enemy.focused && this.focus === enemy) {
            this.focus = null;
          }
          enemy.markedForDeletion = true;
          this.addExplosion(enemy);
          if (this.health > 0) {
            this.health--;
            for (let i = 0; i < 5; i++) {
              this.particles.push(
                new Particle(
                  this,
                  this.player.x + this.player.width * 0.8,
                  this.player.y + this.player.height * 0.2
                )
              );
            }
            if (!this.gameOver) {
              this.floatingMessages.push(
                new FloatingMessage(
                  "-" + 1,
                  this.player.x + this.player.width * 0.8,
                  this.player.y + this.player.height * 0.2,
                  "red",
                  45
                )
              );
            }
          }
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            this.score += enemy.score;
            if (enemy.focused && this.focus === enemy) {
              this.focus = null;
            }
            this.enemyScoreMessage(enemy);
            projectile.markedForDeletion = true;
            enemy.markedForDeletion = true;

            this.explosions.push(
              new FireExplosion(
                this,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5
              )
            );
            for (let i = 0; i < enemy.score; i++) {
              this.particles.push(
                new Particle(
                  this,
                  enemy.x + enemy.width * 0.5,
                  enemy.y + enemy.height * 0.5
                )
              );
            }
            if (enemy.type === "hive") {
              this.hiveExplosion(enemy);
            }
            if (enemy.type === "chtullie") {
              this.chtullieExplosion(enemy);
            }
            if (enemy.type === "mech") {
              this.mechExplosion(enemy);
            }
          }
        });
        if (enemy.markedForDeletion === true) {
          if (!this.lose) {
            this.enemyScoreMessage(enemy);
            for (let i = 0; i < enemy.score; i++) {
              this.particles.push(
                new Particle(
                  this,
                  enemy.x + enemy.width * 0.5,
                  enemy.y + enemy.height * 0.5
                )
              );
            }
            if (enemy.type === "hive") {
              this.hiveExplosion(enemy);
            }
            if (enemy.type === "chtullie") {
              this.chtullieExplosion(enemy);
            }
            if (enemy.type === "mech") {
              this.mechExplosion(enemy);
            }
          }

          this.focus = null;
        }
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(context) {
      this.background.draw(context);
      this.userInterface.draw(context);

      this.player.draw(context);

      this.enemies.forEach((enemy) => enemy.draw(context));
      this.explosions.forEach((explosion) => explosion.draw(context));
      this.particles.forEach((particle) => particle.draw(context));
      this.background.layer4.draw(context);
      this.floatingMessages.forEach((floatingMessage) =>
        floatingMessage.draw(context)
      );
    }
    enemyScoreMessage(enemy) {
      this.floatingMessages.push(
        new FloatingMessage(
          "+" + enemy.score,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5,
          "yellow",
          45
        )
      );
    }
    mechExplosion(enemy) {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
    chtullieExplosion(enemy) {
      for (let i = 0; i < 5; i++) {
        this.explosions.push(
          new InkExplosion(
            this,
            enemy.x + enemy.width * 0.5 * Math.random(),
            enemy.y +
              enemy.height * 0.8 +
              enemy.height * 0.1 * i * Math.random()
          )
        );
      }
    }
    hiveExplosion(enemy) {
      for (let i = 0; i < 5; i++) {
        this.explosions.push(
          new SmokeExplosion(
            this,
            enemy.x + Math.random() * enemy.width,
            enemy.y + Math.random() * enemy.height
          )
        );
        const indexOfLastWord = this.words.length - 1;
        const word = this.getNextWord(indexOfLastWord);
        if (!word) return;
        this.enemies.push(
          new Drone(
            this,
            enemy.x + Math.random() * enemy.width,
            enemy.y + Math.random() * enemy.height * 2,
            word
          )
        );
      }
    }

    addEnemy() {
      const randomize = Math.random();
      const indexOfLastWord = this.words.length - 1;
      const word = this.getNextWord(indexOfLastWord);
      if (!word) return;
      const creature = this.chooseEnemy(word);
      if (randomize < 1) {
        this.enemies.push(creature);
      } else if (this.enemies.length === 0) {
        this.enemies.push(creature);
      }
    }
    chooseEnemy(value) {
      const enemies = [
        new Shark(this, value),
        new Goldfish(this, value),
        new Angela(this, value),
        new Chtullie(this, value),
        new Jellyfish(this, value),
        new Seahorse(this, value),
        new Turtle(this, value),
        new Lionfish(this, value),
        new HiveWhale(this, value),
        new LuckyFish(this, value),
        new Angler2(this, value),
        new Angler1(this, value),
      ];
      return enemies[Math.floor(Math.random() * enemies.length)];
    }
    addExplosion(enemy) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
    checkCollision(rect1, rect2) {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      );
    }
    findFocus(key) {
      let enemy = this.enemies.find((enemy) => {
        return enemy.text.startsWith(key);
      });

      if (enemy && !game.lose) {
        this.particles.push(
          new Particle(
            this,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );

        enemy.focused = true;
        return enemy;
      } else {
        const controls = ["ArrowDown", "ArrowUp", "ArrowRight", "Shift"];
        if (!controls.includes(key))
          this.floatingMessages.push(
            new FloatingMessage(
              key,
              this.player.x + this.player.width * 0.8,
              this.player.y + this.player.height * 0.2,
              "white ",
              45
            )
          );
        return null;
      }
    }
    getNextWord(startIndex) {
      let notAvailableChars = [];
      for (let i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i]) {
          if (!notAvailableChars.includes(this.enemies[i].text.charAt(0))) {
            notAvailableChars.push(this.enemies[i].text.charAt(0));
          }
        }
      }
      for (let i = startIndex; i >= 0; i--) {
        const wordSuggestion = this.words[i];
        if (wordSuggestion) {
          const firstLetterInWord = wordSuggestion.charAt(0);
          if (!notAvailableChars.includes(firstLetterInWord)) {
            return this.words.splice(i, 1)[0];
          } else {
            continue;
          }
        }
      }
      let fallback = this.words.pop();
      if (fallback) return;
      else return "x";
    }
  }
  function storeStore(earnedCash) {
    game.floatingMessages.push(
      new FloatingMessage(
        `$${earnedCash}`,
        game.width * 0.9,
        game.height * 0.5,
        "green",
        100
      )
    );
    store["cash"] = store["cash"] + earnedCash;
    cashElement.innerHTML = store["cash"];

    localStorage.setItem("store", JSON.stringify(store));
  }

  function getAvailableScore(level) {
    let availableScore = 0;
    modes[selectedMode].words[level].forEach(
      (word) => (availableScore += word.length)
    );
    return availableScore;
  }

  var tibiaLevels = [];
  for (let i = 0; i < 4; i++) {
    const level = TibiaWords.slice(-50);
    TibiaWords.splice(-50);
    tibiaLevels.push(level);
  }

  var wordsLevels = [];
  for (let i = 0; i < 100; i++) {
    const level = Words10K.slice(-100);
    Words10K.splice(-100);
    wordsLevels.push(level);
  }
  var modes = {
    0: { words: wordsLevels, levels: 100, groups: 10 },
    6: { words: tibiaLevels, levels: 4, groups: 1 },
  };

  var currentLevel = store.completedLevels.mode[selectedMode].length || 0;

  let modeSelectElement = this.document.getElementById("mode-select");
  modeSelectElement.addEventListener("change", function (e) {
    let arr = [...e.path[0].children];
    let selected = arr.find((option) => option.selected === true);
    selectedMode = selected.value;
    currentLevel = store.completedLevels.mode[selectedMode].length;
    updateLevelButtons();
    startGame(currentLevel);
    document.activeElement.blur();
  });
  let game;
  try {
    game = new Game(
      selectedMode,
      canvas.width,
      canvas.height,
      modes[selectedMode].words[currentLevel].slice(),
      currentLevel
    );
  } catch (error) {
    game = new Game(
      selectedMode,
      canvas.width,
      canvas.height,
      modes[selectedMode].words[0].slice(),
      0
    );
  }

  updateLevelButtons();
  function updateLevelButtons() {
    const bad = "👎";
    const ok = "🆗";
    const good = "👍";
    const perfect = "💯";
    const hook = "🪝";
    let levelContainer = window.document.getElementById("levelContainer");

    let maxLevel = 0;

    let total = [];
    let totalSum = 0;
    let number = 0;

    let emoji;

    while (levelContainer.lastChild) {
      levelContainer.removeChild(levelContainer.lastChild);
    }
    for (let i = 0; i < modes[selectedMode].groups; i++) {
      levelContainer.appendChild(createBtnGrp(i));
    }
    store.completedLevels.mode[selectedMode].forEach((levelObject) => {
      let level = levelObject.level;
      let score = levelObject.score;
      let btnGrp = window.document.getElementById(`btnGrp${number}`);

      if ((maxLevel + 1) % 10 == 0) {
        for (let i = 0; i < total.length; i++) {
          totalSum += total[i];
        }
        let avgScore = totalSum / total.length;
        if (avgScore >= 75) emoji = perfect;
        else if (avgScore >= 50) emoji = good;
        else if (avgScore >= 25) emoji = ok;
        else if (avgScore < 25) emoji = bad;
        btnGrp.children[0].innerHTML += `${emoji}${avgScore.toFixed(0)}%`;
        btnGrp.children[0].classList.add("p-0");
        number++;
        totalSum = 0;
        total.length = 0;
      }

      let availableScore = 0;

      modes[selectedMode].words[level].forEach((word) => {
        availableScore += word.length;
      });

      if (availableScore === 0) {
        modes[selectedMode].words[level + 1].forEach((word) => {
          availableScore += word.length;
        });
      }
      let button = window.document.createElement("button");
      button.classList.add("btn", "btn-outline-secondary", "p-0", "m-0");
      let percent = score / availableScore;
      total.push(percent * 100);
      if (percent >= 0.75) emoji = perfect;
      else if (percent >= 0.5) emoji = good;
      else if (percent >= 0.25) emoji = ok;
      else if (percent < 0.25) emoji = bad;
      else emoji = hook;
      button.innerHTML = `${level} ${emoji} ${(percent * 100).toFixed(0)}%`;
      button.value = level;
      button.addEventListener("click", function (e) {
        startGame(+e.target.value);
        document.activeElement.blur();
      });
      btnGrp.children[1].appendChild(button);

      maxLevel++;
    });
    let button = window.document.createElement("button");
    button.id = "progressBtn";
    button.classList.add("btn", "btn-success", "mt-2");
    button.innerHTML = `Go Fish ${hook} Level ${
      maxLevel || +game.specifiedLevel
    } `;
    button.value = maxLevel || +game.specifiedLevel;
    button.addEventListener("click", function (e) {
      startGame(+e.target.value);
      document.activeElement.blur();
    });
    levelContainer.appendChild(button);
  }
  function createBtnGrp(id) {
    const btnGrp = window.document.createElement("div");
    btnGrp.id = `btnGrp${id}`;
    btnGrp.classList.add("btn-group");
    btnGrp.role = "group";
    const displayButton = window.document.createElement("button");
    displayButton.classList.add("btn", "btn-outline-secondary");
    displayButton.setAttribute("aria-expanded", "false");
    displayButton.setAttribute("data-bs-toggle", "dropdown");
    displayButton.innerHTML =
      id == 0 ? 0 + "-" + "9" : id + "0" + "-" + (id + "9");
    btnGrp.appendChild(displayButton);
    const dropdown = window.document.createElement("div");
    dropdown.id = `dropdown${id}`;
    dropdown.classList.add("dropdown-menu", "row-cols-1", "p-0");
    btnGrp.appendChild(dropdown);
    return btnGrp;
  }

  function startGame(levelSelect) {
    if (levelSelect < modes[selectedMode].levels) {
      game = new Game(
        selectedMode,
        canvas.width,
        canvas.height,
        modes[selectedMode].words[levelSelect].slice(),
        levelSelect
      );
    } else {
      game = new Game(
        selectedMode,
        canvas.width,
        canvas.height,
        modes[selectedMode].words[0].slice(),
        0
      );
    }
    document.activeElement.blur();
  }
  var audio = new Audio("./assets/level1.flac");
  audio.loop = true;

  let playbtn = this.document.getElementById("playMusic");
  playbtn.addEventListener("click", () => playMusic());
  let playing = false;
  function playMusic() {
    playing = !playing;
    playing ? audio.play() : audio.pause();
  }

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
