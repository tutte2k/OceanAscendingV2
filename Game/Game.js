import Background from "../Environment/Background.js";
import UserInterface from "../UserInterface/UserInterface.js";
import Player from "../Player/Player.js";

export default class Game {
  constructor(width, height, level, nextLevel, dataSource) {
    this.store = dataSource.getStore();
    this.wordContainer = UserInterface.WordContainer;
    this.level = level;

    this.nextLevel = nextLevel;
    this.words =
      Math.floor(this.level.mode.id) === 4
        ? Array.from(Array(25).keys())
        : level.getContent();

    this.gameOver = false;
    this.lose = false;
    this.win = false;
    this.score = 0;

    this.width = width;
    this.height = height;

    this.gameTime = 0;

    this.background = new Background(this);

    this.inputHandler = new this.level.mode.inputHandler(this);

    this.userInterface = new UserInterface(this);

    this.keys = [];

    this.player = new Player(this);

    this.focus = null;

    this.enemies = [];
    this.particles = [];
    this.explosions = [];

    this.floatingMessages = [];

    this.speed = 1;

    this.enemyTimer = 0;
    this.enemyInterval = this.level.mode.enemyInterval;
  }

  update(deltaTime) {
    if (
      this.player.y < this.height / 2 &&
      this.player.maxSpeed === 0 &&
      !this.gameOver
    ) {
      this.player.y += 3;
    }
    if (this.player.y > 0 - this.player.height * 2 && this.gameOver) {
      this.player.y -= 3;
      if (this.player.y <= 0 - this.player.height) {
        UserInterface.GameContainer.hidden = true;
        const state = {
          level: this.level,
          nextLevel: this.nextLevel,
          score: this.score,
          win: this.win,
        };
        this.level = null;
        this.userInterface.clear();
        return state;
      }
    }
    if (this.player.air < 1) {
      this.lose = true;
    } else if (this.words.length === 0 && !this.gameOver) {
      this.win = true;
      this.enemies.forEach((enemy) => {
        enemy.die();
      });
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
        if (this.player.air > 0) {
          this.player.air--;
          if (!this.gameOver) {
            this.userInterface.displayPlayerDamage();
          }
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.focused && this.focus === enemy) {
            this.focus = null;
          }
          projectile.explode();
          enemy.die();
          this.userInterface.displayScoreMessage(enemy);
        }
      });
      if (enemy.markedForDeletion === true) {
        if (!this.lose) {
          if (Math.floor(this.level.mode.id) !== 4) enemy.die();
          this.userInterface.displayScoreMessage(enemy);
        }
        this.focus = null;
      }
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    const boardClear =
      Math.floor(this.level.mode.id) === 4
        ? this.enemies.length === 0
        : this.enemies.length < 3;
        
    const spawnTimerElapsed = this.enemyTimer > this.enemyInterval;

    if ((boardClear || spawnTimerElapsed) && !this.gameOver) {
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
    this.level.mode.addEnemy(this);
  }

  findFocus(key) {
    const enemy = this.enemies.find((enemy) => {
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
