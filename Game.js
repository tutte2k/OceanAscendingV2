import FloatingMessage from "./Environment/FloatingMessage.js";
import InputHandler from "./Game/InputHandler.js";
import { Player } from "./Player/Player.js";
import Particle from "./Enemy/Particle.js";
import { Background } from "./Environment/Background.js";
import UserInterface from "./Environment/UserInterface.js";
import {
  FireExplosion,
  RainbowExplosion,
  SmokeExplosion,
} from "./Environment/Explosion.js";
import { Wordstring } from "./Game/Words.js";
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
} from "./Enemy/Enemy.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 2500;
  canvas.height = window.innerHeight;

  var levelsCompleted = JSON.parse(
    this.localStorage.getItem("levelsCompleted")
  );
  if (levelsCompleted === null) {
    levelsCompleted = {};
  }

  class Game {
    static levels = [];
    constructor(width, height, words, specifiedLevel) {
      this.width = width;
      this.height = height;
      this.background = new Background(this);
      this.player = new Player(this);
      this.inputHandler = new InputHandler(this);
      this.userInterface = new UserInterface(this);
      this.keys = [];
      this.enemies = [];
      this.particles = [];
      this.explosions = [];
      this.floatingMessages = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.ammo = 1;
      this.maxAmmo = 1;
      this.ammoTimer = 0;
      this.ammoInterval = 5000;
      this.lose = false;
      this.win = false;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 9999999;
      this.gameTime = 0;
      this.timeLimit = 15000;
      this.speed = 1;
      this.debug = false;
      this.focus = null;
      this.words = words;
      this.health = 3;
      this.specifiedLevel = specifiedLevel;
    }
    update(deltaTime) {
      if (this.health < 1) {
        this.lose = true;
      } else if (
        this.score > this.winningScore ||
        (this.words.length === 0 && !this.gameOver)
      ) {
        this.win = true;
        levelsCompleted[this.specifiedLevel] = this.score;
        localStorage.setItem(
          "levelsCompleted",
          JSON.stringify(levelsCompleted)
        );
        game.specifiedLevel++;
        updateLevelButtons();
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
            this.floatingMessages.push(
              new FloatingMessage(
                "-" + 1,
                this.player.x + this.player.width * 0.8,
                this.player.y + this.player.height * 0.2,
                "red"
              )
            );
          }
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            this.score += enemy.score;
            if (enemy.focused && this.focus === enemy) {
              this.focus = null;
            }
            this.floatingMessages.push(
              new FloatingMessage(
                "+" + enemy.score,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5,
                "yellow"
              )
            );
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
              for (let i = 0; i < 5; i++) {
                const indexOfLastWord = this.words.length - 1;
                const word = this.getNextWord(indexOfLastWord);
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5,
                    word
                  )
                );
              }
            }
          }
        });
        if (enemy.markedForDeletion === true) {
          this.floatingMessages.push(
            new FloatingMessage(
              "+" + enemy.score,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5,
              "yellow"
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
            for (let i = 0; i < 5; i++) {
              const indexOfLastWord = this.words.length - 1;
              const word = this.getNextWord(indexOfLastWord);
              this.enemies.push(
                new Drone(
                  this,
                  enemy.x + Math.random() * enemy.width,
                  enemy.y + Math.random() * enemy.height * 0.5,
                  word
                )
              );
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

      context.beginPath();
      var gradient = ctx.createLinearGradient(
        0,
        0,
        0,
        this.player.y + this.player.height * 0.5
      );
      let red = true;
      for (let i = 0; i < 10; i++) {
        let color = red ? "red" : "orange";
        gradient.addColorStop(`0.${i}`, color);
        red = !red;
      }
      context.strokeStyle = gradient;
      context.moveTo(
        this.player.x + this.player.width * 0.65,
        this.player.y + this.player.height * 0.5
      );
      context.lineTo(50, 0);
      context.lineWidth = 3;

      context.stroke();
      this.player.draw(context);

      if (this.focus) {
        context.beginPath();
        context.strokeStyle = "white";
        context.moveTo(this.player.x, this.player.y);
        context.lineTo(
          this.focus.x + this.focus.width * 0.5,
          this.focus.y + this.focus.height * 0.5
        );
        context.stroke();
      }
      this.enemies.forEach((enemy) => enemy.draw(context));
      this.explosions.forEach((explosion) => explosion.draw(context));
      this.particles.forEach((particle) => particle.draw(context));
      this.background.layer4.draw(context);
      this.floatingMessages.forEach((floatingMessage) =>
        floatingMessage.draw(context)
      );
    }
    addEnemy() {
      const randomize = Math.random();
      const indexOfLastWord = this.words.length - 1;
      const word = this.getNextWord(indexOfLastWord);
      const creature = this.chooseEnemy(word);
      if (randomize < 1) {
        this.enemies.push(creature);
      } else if (this.enemies.length === 0) {
        this.enemies.push(creature);
      }
    }
    chooseEnemy(value) {
      const enemies = [
        new Turtle(this, value),
        new Lionfish(this, value),

        new Jellyfish(this, value),
        new HiveWhale(this, value),
        new LuckyFish(this, value),
        new Seahorse(this, value),
        new Angler1(this, value),
        new Angler2(this, value),
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
        if (enemy.x < this.width - this.enemy.width * 0.5)
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
        const controls = ["ArrowDown", "ArrowUp", "ArrowRight"];
        if (!controls.includes(key))
          this.floatingMessages.push(
            new FloatingMessage(
              key,
              this.player.x + this.player.width * 0.8,
              this.player.y + this.player.height * 0.2,
              "white "
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
      if (fallback) return fallback;
      else return "x";
    }
  }

  const sortedWords = Wordstring.split(" ").sort((a, b) => b.length - a.length);

  var levels = [];
  for (let i = 0; i < 100; i++) {
    const level = sortedWords.slice(-100);
    sortedWords.splice(-100);
    levels.push(level);
  }

  let currentLevel =
    +Object.keys(levelsCompleted)[Object.keys(levelsCompleted).length - 1] + 1;

  let game = new Game(
    canvas.width,
    canvas.height,
    levels[currentLevel || 0].slice(),
    currentLevel || 0
  );
  canvas.addEventListener("click", function (e) {
    game.player.shootTop();
  });

  updateLevelButtons();
  function updateLevelButtons() {
    const bad = "👎";
    const ok = "🆗";
    const good = "👍";
    const perfect = "💯";
    const hook = "🪝";
    const levelContainer = window.document.getElementById("levelContainer");
    while (levelContainer.lastChild) {
      levelContainer.removeChild(levelContainer.lastChild);
    }
    for (const level in levelsCompleted) {
      if (Object.hasOwnProperty.call(levelsCompleted, level)) {
        let availableScore = 0;
        levels[level].forEach((x) => (availableScore += x.length));
        if (availableScore === 0) {
          levels[level + 1].forEach((x) => (availableScore += x.length));
        }
        let score = levelsCompleted[level] || game.score;
        let button = window.document.createElement("button");
        button.classList.add("btn", "btn-dark", "btn-sm");
        console.log(score, availableScore);
        let percent = score / availableScore;
        let emoji;

        if (percent >= 0.75) emoji = perfect;
        else if (percent >= 0.5) emoji = good;
        else if (percent >= 0.25) emoji = ok;
        else if (percent < 0.25) emoji = bad;
        else emoji = hook;
        button.innerHTML = `${level} ${emoji} ${(percent * 100).toFixed(0)}%`;
        button.value = level;
        button.addEventListener("click", function (e) {
          startGame(e.target.value);
        });
        levelContainer.appendChild(button);
      }
    }
    if (levelContainer.children.length === 0) {
      let button = window.document.createElement("button");
      button.classList.add("btn", "btn-success", "btn-sm");
      button.innerHTML = `0 ${hook}`;
      button.value = 0;
      button.addEventListener("click", function (e) {
        startGame(e.target.value);
      });
      levelContainer.appendChild(button);
    } else {
      let button = window.document.createElement("button");
      button.classList.add("btn", "btn-success", "btn-sm");
      button.innerHTML = `${+game.specifiedLevel} ${hook}`;
      button.value = +game.specifiedLevel;
      button.addEventListener("click", function (e) {
        startGame(e.target.value);
      });
      levelContainer.appendChild(button);
    }
  }
  function startGame(level) {
    game = new Game(canvas.width, canvas.height, levels[level].slice(), level);
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
