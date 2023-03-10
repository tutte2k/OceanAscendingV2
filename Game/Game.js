import Collision from "../Utils/Collision.js";
import Global from "../Utils/Global.js";
import Background from "./Environment/Background.js";
import GameInterface from "./GameInterface.js";
import Player from "./Player/Player.js";

export default class Game {
  constructor(level, nextLevel, dataSource) {
    this.store = dataSource.getStore();
    this.userInterface = new GameInterface(this);
    this.wordContainer = this.userInterface.elements.wordContainer;
    this.level = level;
    this.boss = this.level.mode.name === "Boss";
    this.totalScore = 0;
    if (!this.boss)
      Global.Audioplayer.tracks.find((x) => x.name === "game").play();

    this.nextLevel = nextLevel;
    this.words = level.getContent();
    this.totalWords = this.words.length;

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
    this.playerTouched = false;
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
    if (
      !this.playerTouched &&
      !this.gameOver &&
      this.player.height + this.player.y < this.height / 2
    ) {
      this.player.y += 5;
    }
    if (this.player.y > 0 - this.player.height * 5 && this.gameOver) {
      this.speed = 0.5;
      if (this.player.y <= 0 - this.player.height) {
        Global.GameContainer.hidden = true;
        Global.Spinner.hidden = false;
        const state = {
          level: this.level,
          nextLevel: this.nextLevel,
          score: this.score,
          win: this.win,
          bonus: this.boss ? 1000 : 0,
        };
        this.level = null;
        this.userInterface.clear();
        return state;
      }
    }
    if (this.player.air < 1) {
      Global.Flasher.preFlash(20000, "lightgray");
      if (Global.Audioplayer.currentTrack.playPromise) {
        Global.Audioplayer.currentTrack.pause();
      }
      if (!this.lose) {
        this.lose = true;
        const sound = Global.Audioplayer.sounds.find((x) => x.name === "lose");
        sound.play();
      }
    } else if (this.words.length === 0 && !this.gameOver) {
      Global.Flasher.preFlash(20000, "goldenrod");
      if (Global.Audioplayer.currentTrack.playPromise) {
        Global.Audioplayer.currentTrack.pause();
      }
      if (!this.win) {
        const sound = Global.Audioplayer.sounds.find((x) => x.name === "win");
        sound.play();
        this.win = true;
        this.enemies.forEach((enemy) => {
          enemy.die();
        });
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
      if (Collision.checkCollision(this.player, enemy, 0.8)) {
        if (enemy.focused && this.focus === enemy) {
          this.focus = null;
        }
        if (!this.boss) {
          enemy.die();
        }
        if (this.player.air > 0) {
          this.player.air -= enemy.score;
          if (!this.gameOver) {
            this.userInterface.displayPlayerDamage(enemy.score);
          }
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (Collision.checkCollision(projectile, enemy)) {
          if (this.boss) {
            projectile.explode();
            this.enemies[0].penalize();
          } else {
            if (enemy.focused && this.focus === enemy) {
              this.focus = null;
            }
            projectile.explode();
            enemy.die();
            if (!this.boss) this.userInterface.displayScoreMessage(enemy);
          }
        }
      });
      if (enemy.markedForDeletion === true) {
        if (!this.lose) {
          if (Math.floor(this.level.mode.id) !== 4) enemy.die();
          if (!this.boss) this.userInterface.displayScoreMessage(enemy);
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
