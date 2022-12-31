import FloatingMessage from "../UserInterface/FloatingMessage.js";
import InputHandler from "../UserInput/InputHandler.js";
import Particle from "../Environment/Particle.js";
import { Background } from "../Environment/Background.js";
import UserInterface from "../UserInterface/UserInterface.js";
import {
  FireExplosion,
  InkExplosion,
  SmokeExplosion,
} from "../Environment/Explosion.js";
import { Player } from "../Player/Player.js";
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
} from "../Enemy/Enemy.js";

export default class Game {
  constructor(width, height, level, dataSource) {

    this.mode = level.mode;

    this.level = level;
    this.words = level.words;

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

    this.dataSource = dataSource;
    this.store = dataSource.getStore();
  }

  update(deltaTime) {
    if (this.player.y > 0 - this.player.height * 2 && this.gameOver) {
      this.player.y -= 3;
      if (this.player.y <= 0 - this.player.height) {
        let state = { score: this.score, level: this.level, win: this.win }
        this.level = null;
        return state
      }
    }
    if (this.health < 1) {
      this.lose = true;
    } else if (this.words.length === 0 && !this.gameOver) {
      this.win = true;
      this.enemies.forEach((enemy) => {
        this.score += enemy.score;
        enemy.markedForDeletion = true;
      });

      let earnedCash;

      let levelObject = this.store.completedLevels.mode[this.mode].find(
        (obj) => obj.level === this.level.name
      );

      if (!levelObject) {
        levelObject = { level: this.level.name, score: this.score };
        this.store.completedLevels.mode[this.mode].push(levelObject);

        let availableScore = this.level.maxScore;

        earnedCash =
          this.level.name + Math.round((this.score / availableScore) * 10);

        this.floatingMessages.push(
          new FloatingMessage(
            `$${earnedCash}`,
            this.width * 0.9,
            this.height * 0.5,
            "green",
            100
          )
        );
        this.store["cash"] = this.store["cash"] + earnedCash;
        this.userInterface.cashElement.innerHTML = this.store["cash"];
        this.dataSource.setStore(this.store);
      } else if (levelObject.score < this.score) {
        let previousScore = levelObject.score;
        let currentScore = this.score;
        let earnableScore = currentScore - previousScore;

        this.store.completedLevels.mode[this.mode][this.level.name].score =
          this.score;

        earnedCash = Math.round((earnableScore / this.level.maxScore) * 10);

        this.floatingMessages.push(
          new FloatingMessage(
            `$${earnedCash}`,
            this.width * 0.9,
            this.height * 0.5,
            "green",
            100
          )
        );
        this.store["cash"] = this.store["cash"] + earnedCash;
        this.userInterface.cashElement.innerHTML = this.store["cash"];
        this.dataSource.setStore(this.store);
      }
      this.level.name++;
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
          enemy.y + enemy.height * 0.8 + enemy.height * 0.1 * i * Math.random()
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
    const tier1 = [HiveWhale, Goldfish, LuckyFish, Jellyfish]
    const tier2 = [Seahorse, Turtle]
    const tier3 = [Angler1, Angler2]
    const tier4 = [Lionfish, Shark]

    const bosstier = [Angela, Chtullie]

    const enemies = {
      1: [...tier1],
      2: [...tier1, ...tier2],
      3: [...tier1, ...tier2, ...tier3],
      4: [...tier1, ...tier2, ...tier3, ...tier4],
    }

    let randomIndex = Math.floor(Math.random() * enemies[value.length].length);
    let enemy = new enemies[value.length][randomIndex](this, value)

    if (!enemy) {
      return new enemies[4](this, value)
    }

    return enemy
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
    if (enemy && !this.lose) {
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
      const controls = ["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight", "Shift"];
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
