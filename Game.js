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
} from "./Enemy/Enemy.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1768;
  canvas.height = window.outerHeight;

  class Game {
    constructor(width, height, words) {
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
      this.ammoInterval = 2000;
      this.lose = false;
      this.win = false;
      this.gameOver = false;
      this.score = 0;
      this.winningScore = 10;
      this.gameTime = 0;
      this.timeLimit = 15000;
      this.speed = 1;
      this.debug = false;
      this.focus = null;
      this.words = words;
      this.health = 3;
    }
    update(deltaTime) {
      if (this.health < 1) {
        this.lose = true;
      } else if (this.score > this.winningScore) {
        this.win = true;
      }
      this.gameOver = this.lose == true || this.win === true;

      if (!this.lose && !this.win) {
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
        enemy.update();

        if (enemy.markedForDeletion === true) {
          this.score += enemy.score;
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
              this.enemies.push(
                new Drone(
                  this,
                  enemy.x + Math.random() * enemy.width,
                  enemy.y + Math.random() * enemy.height * 0.5,
                  this.words.pop()
                )
              );
            }
          }
          this.focus = null;
        }
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
            if (enemy.focused && this.focus === enemy) {
              this.focus = null;
            }
            this.score += enemy.score;
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
            this.score += enemy.score;
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
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5,
                    this.words.pop()
                  )
                );
              }
            }
          }
        });
      });

      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.lose && !this.win) {
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
      let black = true;
      for (let i = 0; i < 10; i++) {
        let color = black ? "red" : "orange";
        gradient.addColorStop(`0.${i}`, color);
        black = !black;
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

      if (randomize < 0.5) {
        this.enemies.push(this.chooseEnemy(this.words.pop()));
      } else if (this.enemies.length === 0) {
        this.enemies.push(this.chooseEnemy(this.words.pop()));
      }
    }
    chooseEnemy(value) {
      const enemies = [
        new Turtle(this, value),
        new Lionfish(this, value),
        new LuckyFish(this, value),
        new Angler1(this, value),
        new Angler2(this, value),
        new HiveWhale(this, value),
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
        return null;
      }
    }
  }
  const sortedWords = Wordstring.split(" ").sort((a, b) => b.length - a.length);

  const game = new Game(canvas.width, canvas.height, sortedWords);
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
