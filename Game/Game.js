import Background from "./Environment/Background.js";
import Player from "./Player/Player.js";
import Collision from "../Utils/Collision.js";
import GameInterface from "./GameInterface.js";
import Global from "../Utils/Global.js";

export default class Game {
  constructor(level, nextLevel, dataSource) {
    this.store = dataSource.getStore();
    this.userInterface = new GameInterface(this);
    this.wordContainer = this.userInterface.elements.wordContainer;
    this.level = level;

    this.nextLevel = nextLevel;
    this.words = level.getContent();

    this.gameOver = false;
    this.lose = false;
    this.win = false;
    this.score = 0;

    this.width = Global.Canvas.width;
    this.height = Global.Canvas.height;

    this.widthPercentage =
      Global.Canvas.getBoundingClientRect().width / this.width;
    this.heightPercentage =
      Global.Canvas.getBoundingClientRect().height / this.height;

    this.gameTime = 0;
    this.background = new Background(this);
    this.inputHandler = new this.level.mode.inputHandler(this);

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

    this.energyTimer = 0;
    this.energyInterval = 1000;
  }
  onResize() {
    this.widthPercentage =
      Global.Canvas.getBoundingClientRect().width / this.width;
    this.heightPercentage =
      Global.Canvas.getBoundingClientRect().height / this.height;
  }

  update(deltaTime) {
    if (this.energyTimer > this.energyInterval && this.player.energy === 0) {
      this.player.air--;
      this.energyTimer = 0;
    } else {
      this.energyTimer += deltaTime;
    }
    if (this.player.y > 0 - this.player.height * 2 && this.gameOver) {
      this.speed = 0.01;
      this.player.y -= 1;

      if (this.player.y <= 0 - this.player.height) {
        Global.GameContainer.hidden = true;
        Global.Spinner.hidden = false;
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
      Global.Flasher.preFlash(20000, "black");
      if (!this.lose) Global.Wasted.play();
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
      if (Collision.checkCollision(this.player, enemy)) {
        if (enemy.focused && this.focus === enemy) {
          this.focus = null;
        }
        enemy.die();
        if (this.player.air > 0) {
          this.player.air -= enemy.score;
          if (!this.gameOver) {
            this.userInterface.displayPlayerDamage(enemy.score);
          }
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (Collision.checkCollision(projectile, enemy)) {
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

    const holdingTheDoor =
      Math.floor(this.level.mode.id) === 4
        ? this.enemies.length < 2
        : this.enemies.length < 3;
    holdingTheDoor ? (this.enemyInterval -= 15) : (this.enemyInterval += 5);

    const noEnemies = this.enemies.length === 0;
    const spawnTimerElapsed = this.enemyTimer > this.enemyInterval;
    if ((noEnemies || spawnTimerElapsed) && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
  draw(context) {
    this.background.draw(context);
    this.userInterface.draw();
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
}
