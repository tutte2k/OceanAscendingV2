import InputHandler from "../UserInput/InputHandler.js";
import { Background } from "../Environment/Background.js";
import UserInterface from "../UserInterface/UserInterface.js";
import { Player } from "../Player/Player.js";
import { Enemy } from "../Enemy/Enemy.js";
import Word from "../Utils/Word.js";

export default class Game {
  constructor(width, height, level, dataSource) {
    this.dataSource = dataSource;
    this.store = dataSource.getStore();
    this.wordContainer = document.getElementById("words");
    this.mode = level.mode;
    this.level = level;
    this.words = level.getContent();

    this.gameOver = false;
    this.lose = false;
    this.win = false;
    this.score = 0;

    this.width = width;
    this.height = height;

    this.gameTime = 0;

    this.background = new Background(this);
    this.inputHandler = new InputHandler(this);
    this.userInterface = new UserInterface(this);
    UserInterface.UI.classList.remove("invisible");

    this.keys = [];

    this.player = new Player(this);

    this.focus = null;

    this.enemies = [];
    this.particles = [];
    this.explosions = [];

    this.floatingMessages = [];

    this.speed = 1;

    this.enemyTimer = 0;
    this.enemyInterval = 2000;
  }

  update(deltaTime) {
    if (this.player.y > 0 - this.player.height * 2 && this.gameOver) {
      this.player.y -= 3;
      if (this.player.y <= 0 - this.player.height) {
        let state = { score: this.score, level: this.level, win: this.win };
        this.level = null;
        this.wordContainer.innerHTML = "";
        UserInterface.Message.innerHTML = "";
        UserInterface.UI.classList.add("invisible");
        return state;
      }
    }
    if (this.player.air < 1) {
      this.lose = true;
    } else if (this.words.length === 0 && !this.gameOver) {
      this.win = true;
      this.enemies.forEach((enemy) => {
        enemy.die();
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

        this.store["cash"] = this.store["cash"] + earnedCash;
        UserInterface.Cash.innerHTML = this.store["cash"];

        this.userInterface.displayEarnedCash(earnedCash);
        this.dataSource.setStore(this.store);
      } else if (levelObject.score < this.score) {
        let previousScore = levelObject.score;
        let currentScore = this.score;
        let earnableScore = currentScore - previousScore;

        this.store.completedLevels.mode[this.mode][this.level.name].score =
          this.score;

        earnedCash = Math.round((earnableScore / this.level.maxScore) * 10);
        this.store["cash"] = this.store["cash"] + earnedCash;

        UserInterface.Cash.innerHTML = this.store["cash"];
        this.userInterface.displayEarnedCash(earnedCash);
        this.dataSource.setStore(this.store);
      }
    }
    this.gameOver = this.lose == true || this.win === true;
    if (!this.gameOver) {
      this.gameTime += deltaTime;
      this.background.update();
      this.background.layer4.update();
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
        enemy.die();
        enemy.markedForDeletion = true;
        if (this.player.air > 0) {
          this.player.air--;
          if (!this.gameOver) {
            this.userInterface.displayPlayerDamage();
          }
        }
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          this.score += enemy.score;
          if (enemy.focused && this.focus === enemy) {
            this.focus = null;
          }
          projectile.explode();
          enemy.die();
          this.userInterface.displayScoreMessage(enemy);
          projectile.markedForDeletion = true;
          enemy.markedForDeletion = true;
        }
      });
      if (enemy.markedForDeletion === true) {
        if (!this.lose) {
          enemy.die();
          this.userInterface.displayScoreMessage(enemy);
        }
        this.focus = null;
      }
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (
      (this.enemyTimer > this.enemyInterval && !this.gameOver) ||
      this.enemies.length === 0
    ) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
  draw(context) {
    this.background.draw(context);
    this.userInterface.draw(context);
    this.player.draw(context);
    this.particles.forEach((particle) => particle.draw(context));
    this.explosions.forEach((explosion) => explosion.draw(context));
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.background.layer4.draw(context);
    this.floatingMessages.forEach((floatingMessage) =>
      floatingMessage.draw(context)
    );
  }

  addEnemy() {
    const indexOfLastWord = this.words.length - 1;
    const word = Word.Next(this, indexOfLastWord);
    if (!word) return;
    const creature = Enemy.Next(this, word);
    this.enemies.push(creature);
  }

  findFocus(key) {
    let enemy = this.enemies.find((enemy) => {
      return enemy.text.startsWith(key);
    });
    if (enemy && !this.lose) {
      enemy.focused = true;
      return enemy;
    } else {
      const controls = [
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "ArrowRight",
        "Shift",
      ];
      if (!controls.includes(key)) this.userInterface.displayMissedKey(key);
      return null;
    }
  }
}
