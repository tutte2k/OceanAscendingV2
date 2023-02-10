import SpriteSheet from "../../Utils/SpriteSheet.js";
import Random from "../../Utils/Random.js";
import Particle from "../Environment/Particle.js";
import { LetterMode } from "../Mode/Modes.js";
import {
  SmokeExplosion,
  FireExplosion,
  InkExplosion,
} from "../Environment/Explosion.js";

export default class Enemy {
  constructor(game, word, sprite) {
    this.game = game;
    this.text = word;
    this.completedText = "";
    this.displayText = this.text;

    this.score =
      Math.floor(this.game.level.mode.id) === 4 ? 1 : this.text.length;

    this.focused = false;
    this.x = this.game.width;

    this.speedX = -this.game.speed;
    this.markedForDeletion = false;

    this.sprite = sprite;
    this.width = sprite.width;
    this.height = sprite.height;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    this.element = document.createElement("div");
    this.element.classList.add("word");
    this.element.innerHTML = word;
    this.element.style.position = "absolute";
    this.game.wordContainer.appendChild(this.element);
  }
  update(deltaTime) {
    if (this.speedY) {
      this.y += this.speedY - this.game.speed;
    }
    this.x += this.speedX - this.game.speed;
    this.y > this.game.player.y && this.y > 10
      ? (this.y -= 0.4)
      : (this.y += 0.4);
    if (this.x + this.width * 0.7 < 0) {
      this.x -= this.width;
    }
    if (this.x + this.width < 0 || this.y + this.height < -30) {
      this.markedForDeletion = true;
      this.remove();
    }
    this.sprite.update(deltaTime);
  }
  consume(key) {
    const length = this.completedText.length + 1;
    const isNextChar =
      this.text.substring(0, length) === this.completedText + key;
    if (isNextChar) {
      this.completedText += key;
      this.x += 5;
    }
    this.markedForDeletion = !(this.completedText !== this.text);
    return isNextChar;
  }
  die() {
    this.game.score += this.score;
    if (this.game.score > this.game.level.maxScore) {
      this.game.score = this.game.level.maxScore;
    }
    for (let i = 0; i < this.score; i++) {
      this.game.particles.push(
        new Particle(
          this.game,
          this.x + this.width * 0.5,
          this.y + this.height * 0.5
        )
      );
    }
    this.markedForDeletion = true;
    this.remove();
  }
  remove() {
    this.element.hidden = true;
    this.element.remove();
  }
  draw(context) {
    if (window.location.origin.includes("localhost")) {
      context.beginPath();
      context.rect(this.x, this.y, this.width * 0.8, this.height * 0.8);
      context.stroke();
    }

    this.sprite.draw(context, this.x, this.y);
    this.element.style.top =
      this.y * this.game.heightPercentage +
      (this.height * this.game.heightPercentage) / 2 +
      "px";

    this.element.style.left =
      (this.width * this.game.widthPercentage) / 2 +
      (this.x - this.width * 0.5) * this.game.widthPercentage +
      "px";

    this.element.style.color = this.focused ? "lime" : "whitesmoke";
    if (Math.floor(this.game.level.mode.id) === 4) {
    } else {
      this.element.innerHTML = this.text.replace(this.completedText, "");
      this.displayText = this.text.replace(this.completedText, "");
    }
  }
  static NextMath(game, value) {
    const enemies = [Whale];
    return new enemies[Random.index(enemies)](game, value);
  }
  static NextBoss(bossId) {
    const bosses = {
      0: Angela,
      1: Chtullie,
    };
    return bosses[bossId];
  }
  static Next(game, value) {
    const tier1 = [Goldfish, LuckyFish, Jellyfish, Inker, Urchie, Inky, Jinxy];
    const tier2 = [Seahorse, Turtle];
    const tier3 = [Angler1, Angler2, HiveWhale];
    const tier4 = [Lionfish, Shark, Whale];

    const enemies = {
      1: [...tier1],
      2: [...tier1, ...tier2],
      3: [...tier1, ...tier2, ...tier3],
      4: [...tier1, ...tier2, ...tier3, ...tier4],
    };
    if (!enemies[value.length]) {
      return new enemies[4][Random.index(enemies[4])](game, value);
    }
    const randomIndex = Random.index(enemies[value.length]);
    let enemy = new enemies[value.length][randomIndex](game, value);
    return enemy;
  }
}
class Fish extends Enemy {
  constructor(game, word, spritesheet) {
    super(game, word, spritesheet);
  }
  die() {
    super.die();
    this.game.explosions.push(
      new SmokeExplosion(
        this.game,
        this.x + this.width * 0.5,
        this.y + this.height * 0.5
      )
    );
  }
}
class Jellyfish extends Fish {
  constructor(game, word) {
    super(
      game,
      word,
      new SpriteSheet(
        document.getElementById(`jellyfish${Random.int(1, 5)}`),
        120,
        258,
        59,
        0,
        30
      )
    );
    this.x = Random.int(
      this.game.width * 0.2,
      this.game.width - this.game.width * 0.1
    );
    this.y = this.game.height + 100;
    this.speedX = 1;
    this.speedY = -1;
  }
}
class Goldfish extends Fish {
  constructor(game, word) {
    const width = 228;
    const height = 118;
    const image = document.getElementById("goldfish");
    super(game, word, new SpriteSheet(image, width, height, 9, 0, 8));
    this.speedX = -0.1;
  }
}
class Turtle extends Fish {
  constructor(game, word) {
    const width = 225;
    const height = 221;
    const image = document.getElementById(`turtle${Random.int(1, 5)}`);
    super(game, word, new SpriteSheet(image, width, height, 59, 0, 30));
    this.speedX = -0.2;
  }
}
class Lionfish extends Fish {
  constructor(game, word) {
    const width = 251;
    const height = 187;
    const image = document.getElementById("lionfish1");
    super(game, word, new SpriteSheet(image, width, height, 60, 0, 30));
    this.speedX = -0.3;
  }
}
class Angela extends Fish {
  constructor(game) {
    const width = 483;
    const height = 300;
    const image = document.getElementById(`angela${Random.int(1, 2)}`);

    super(game, "word", new SpriteSheet(image, width, height, 29, 0, 20));

    this.speedX = -0.5;
    this.chaseSpeed = 0.1;

    this.livesLeft = 8;

    this.data = {
      0: Random.indexes([
        ...LetterMode.Alphabet.slice(),
        ...LetterMode.Numbers.slice(),
        ...LetterMode.ALPHABET.slice(),
      ]),

      1: Random.indexes([
        ...LetterMode.Alphabet.slice(),
        ...LetterMode.ALPHABET.slice(),
      ]),

      2: Random.indexes(LetterMode.Numbers.slice()),
      3: Random.indexes(LetterMode.Alphabet.slice()),
      4: Random.indexes(LetterMode.ALPHABET.slice()),

      5: LetterMode.Alphabet.slice().reverse(),
      6: LetterMode.Alphabet.slice(),

      7: LetterMode.Numbers.slice().reverse(),
      8: LetterMode.Numbers.slice(),
    };

    this.completedText = "";
    this.displayText = this.text;

    this.text = this.data[this.livesLeft].pop();
    this.randomPosition();
  }
  update(deltaTime) {
    if (this.speedY) {
      this.y += this.speedY - this.game.speed;
    }

    this.x += this.speedX - this.game.speed;

    this.y > this.game.player.y && this.y > 10
      ? (this.y -= this.chaseSpeed)
      : (this.y += this.chaseSpeed);

    if (this.x + this.width * 0.7 < 0) {
      this.speedX += -0.5;
      this.chaseSpeed += 0.1;

      this.randomPosition();
    }
    this.sprite.update(deltaTime);
  }
  die() {
    super.die();
    this.game.win = true;
  }

  randomPosition() {
    const choice = Random.int(1, 4);
    if (choice === 1) {
      this.x = this.game.width;
      this.y = 0;
    } else if (choice === 2) {
      this.x = this.game.width;
      this.y = this.game.height * 0.8;
    } else if (choice === 3) {
      this.x = this.game.width;
      this.y = this.game.height * 0.5;
    } else {
      this.x = this.game.width;
      this.y = this.game.player.y;
    }
  }

  penalize() {
    if (this.data[this.livesLeft].length === 0) {
      this.livesLeft--;
      if (this.livesLeft < 0) {
        return (this.markedForDeletion = true);
      }
    }
    this.completedText = "";
    this.text = this.data[this.livesLeft].pop();
  }
  consume(key) {
    const length = this.completedText.length + 1;
    const isNextChar =
      this.text.substring(0, length) === this.completedText + key;
    if (isNextChar) {
      this.completedText += key;
      this.x += 15;
    }
    if (this.completedText === this.text) {
      this.penalize();
    }
    return isNextChar;
  }
}
class Shark extends Fish {
  constructor(game, word) {
    const width = 398;
    const height = 194;
    const image = document.getElementById("shark");
    super(game, word, new SpriteSheet(image, width, height, 7, 0, 20));
    this.speedX = -1.5;
  }
  consume(key) {
    this.speedX -= 1;
    return super.consume(key);
  }
}
class Whale extends Fish {
  constructor(game, word) {
    const width = 469;
    const height = 234;
    const image = document.getElementById("whale");
    const spriteSheetColumns = 4;
    const spriteSheetRows = 13;
    const indexOfLastImage = 0;
    const fps = 20;

    super(
      game,
      word,
      new SpriteSheet(
        image,
        width,
        height,
        spriteSheetColumns,
        spriteSheetRows,
        fps,
        true,
        indexOfLastImage
      )
    );

    this.speedX = -1;
  }
}
class Urchie extends Fish {
  constructor(game, word) {
    const width = 100;
    const height = 100;
    const image = document.getElementById("urchie");
    const spriteSheetColumns = 4;
    const spriteSheetRows = 7;
    const indexOfLastImage = 1;
    const fps = 20;
    super(
      game,
      word,
      new SpriteSheet(
        image,
        width,
        height,
        spriteSheetColumns,
        spriteSheetRows,
        fps,
        true,
        indexOfLastImage
      )
    );
    this.x = Random.int(
      this.game.width * 0.2,
      this.game.width - this.game.width * 0.1
    );
    this.y = -50;
    this.speedX = -1;
    this.speedY = 2;
  }
}
class Jinxy extends Fish {
  constructor(game, word) {
    const width = 166;
    const height = 162;
    const image = document.getElementById("jinxy");
    const spriteSheetColumns = 4;
    const spriteSheetRows = 7;
    const indexOfLastImage = 3;
    const fps = 60;
    super(
      game,
      word,
      new SpriteSheet(
        image,
        width,
        height,
        spriteSheetColumns,
        spriteSheetRows,
        fps,
        true,
        indexOfLastImage
      )
    );
    this.speedX = -2.5;
    this.jinxTimer = 7501;
    this.jinxInterval = 7500;
  }
  update(deltaTime) {
    if (this.jinxTimer > this.jinxInterval) {
      let alphabet = LetterMode.Alphabet.slice();
      this.text = alphabet[Random.int(0, LetterMode.Alphabet.length - 1)];
      this.jinxInterval -= this.jinxInterval * 0.5;
      this.jinxTimer = 0;
    } else {
      this.jinxTimer += deltaTime;
    }
    super.update(deltaTime);
  }
}
class Mech extends Enemy {
  constructor(game, word, spritesheet) {
    super(game, word, spritesheet);
  }
  die() {
    super.die();
    this.game.explosions.push(
      new FireExplosion(
        this.game,
        this.x + this.width * 0.5,
        this.y + this.height * 0.5
      )
    );
  }
}
class Seahorse extends Mech {
  constructor(game, word) {
    super(
      game,
      word,
      new SpriteSheet(
        document.getElementById("seahorse"),
        120,
        190,
        37,
        Math.floor(Math.random() * 2),
        30
      )
    );
  }
}
class Angler1 extends Mech {
  constructor(game, word) {
    super(
      game,
      word,
      new SpriteSheet(
        document.getElementById("angler1"),
        228,
        169,
        37,
        Math.floor(Math.random() * 3),
        30
      )
    );
  }
}
class Angler2 extends Mech {
  constructor(game, word) {
    const width = 213;
    const height = 165;
    const image = document.getElementById("angler2");
    const spriteSheetRows = Math.floor(Math.random() * 2);
    super(
      game,
      word,
      new SpriteSheet(image, width, height, 37, spriteSheetRows, 30)
    );
  }
}
class LuckyFish extends Mech {
  constructor(game, word) {
    const width = 99;
    const height = 95;
    const image = document.getElementById("lucky");
    const spriteSheetRows = Math.floor(Math.random() * 2);
    super(
      game,
      word,
      new SpriteSheet(image, width, height, 37, spriteSheetRows, 30)
    );
    this.angle = 0;
  }
  update(deltaTime) {
    var dd = -0.05;
    var cx = this.x;
    var cy = this.y;

    var radius = 3;
    this.angle += Math.acos(1 - Math.pow(dd / radius, 2) / 2);

    var newX = cx + radius * Math.cos(this.angle);
    var newY = cy + radius * Math.sin(this.angle);

    this.x = newX;
    this.y = newY;

    super.update(deltaTime);
  }
}
class HiveWhale extends Mech {
  constructor(game, word) {
    const width = 400;
    const height = 227;
    const image = document.getElementById("hivewhale");
    const spriteSheetRows = 0;
    super(
      game,
      word,
      new SpriteSheet(image, width, height, 37, spriteSheetRows, 30)
    );
    this.speedX = -0.2;
  }
  die() {
    super.die();
    for (let i = 0; i < 5; i++) {
      const x = this.x + (this.width * i) / 3;
      const y = this.y + Math.random() * (this.height * 2);
      this.game.explosions.push(new SmokeExplosion(this.game, x, y));
      const indexOfLastWord = this.game.words.length - 1;
      const word = LetterMode.Next(this.game, indexOfLastWord);
      if (!word) return;
      this.game.enemies.push(new Drone(this.game, x, y, word));
    }
  }
}
class Drone extends Mech {
  constructor(game, x, y, word) {
    const width = 115;
    const height = 95;
    const image = document.getElementById("drone");
    const spriteSheetRows = Math.floor(Math.random() * 2);
    super(
      game,
      word,
      new SpriteSheet(image, width, height, 37, spriteSheetRows)
    );
    this.x = x;
    this.y = y;
  }
}
class Octopus extends Enemy {
  constructor(game, word, spritesheet) {
    super(game, word, spritesheet);
  }
  die() {
    super.die();
    this.game.explosions.push(
      new InkExplosion(
        this.game,
        this.x + this.width * 0.5,
        this.y + this.height * 0.8
      )
    );
  }
}

class Inker extends Octopus {
  constructor(game, word) {
    const width = 105;
    const height = 88;
    const image = document.getElementById(`inker`);

    const spriteSheetColumns = 4;
    const spriteSheetRows = 18;
    const indexOfLastImage = 0;
    const fps = 50;

    super(
      game,
      word,
      new SpriteSheet(
        image,
        width,
        height,
        spriteSheetColumns,
        spriteSheetRows,
        fps,
        true,
        indexOfLastImage
      )
    );
    this.speedX = -0.001;
  }
  update(deltaTime) {
    if (this.x < this.game.width / 2) {
      this.speedX = -20;
    }
    super.update(deltaTime);
  }
}
class Inky extends Octopus {
  constructor(game, word) {
    const width = 118;
    const height = 137;
    const image = document.getElementById("inky");

    const spriteSheetColumns = 4;
    const spriteSheetRows = 18;
    const indexOfLastImage = 0;
    const fps = 20;

    super(
      game,
      word,
      new SpriteSheet(
        image,
        width,
        height,
        spriteSheetColumns,
        spriteSheetRows,
        fps,
        true,
        indexOfLastImage
      )
    );
    this.x = Random.int(
      this.game.width * 0.2,
      this.game.width - this.game.width * 0.1
    );
    this.y = this.game.height + 100;
    this.speedX = 1;
    this.speedY = -2;
  }
}

class Chtullie extends Octopus {
  constructor(game) {
    const width = 500;
    const height = 500;
    const image = document.getElementById(`chtullie`);
    const spriteSheetColumns = 4;
    const spriteSheetRows = 9;
    const indexOfLastImage = 2;
    const fps = 25;
    super(
      game,
      "word",
      new SpriteSheet(
        image,
        width,
        height,
        spriteSheetColumns,
        spriteSheetRows,
        fps,
        true,
        indexOfLastImage
      )
    );

    this.livesLeft = 8;
    this.inkyTime = false;

    this.inkyCount = 1;

    this.data = {
      0: [...Array.from(new Array(5).fill("i"))],
      1: [...Array.from(new Array(5).fill("h"))],
      2: [...Array.from(new Array(5).fill("g"))],
      3: [...Array.from(new Array(5).fill("f"))],
      4: [...Array.from(new Array(5).fill("e"))],
      5: [...Array.from(new Array(5).fill("d"))],
      6: [...Array.from(new Array(5).fill("c"))],
      7: [...Array.from(new Array(5).fill("b"))],
      8: [...Array.from(new Array(5).fill("a"))],
    };

    this.completedText = "";
    this.displayText = this.text;

    this.text = this.data[this.livesLeft].pop();
    this.x = this.game.width * 0.8;
  }
  update(deltaTime) {
    this.inkyTime = this.game.enemies.length < 3;
    console.log(this.inkyTime);
    if (this.inkyTime) {
      const inky = new Inky(this.game, "!");
      inky.x = this.game.player.x + 120;
      this.game.enemies.push(inky);

      for (let i = 0; i < this.inkyCount; i++) {
        const inker = new Inker(this.game, i.toString());
        inker.x = this.game.width * 0.6;
        inker.y = this.game.height / i;
        this.game.enemies.push(inker);
      }
      this.inkyCount++;
    }
    this.y = this.game.player.y;
    if (this.x + this.width * 0.7 < 0) {
      this.randomPosition();
    }
    this.sprite.update(deltaTime);
  }
  die() {
    super.die();
    this.game.win = true;
  }

  penalize() {
    if (this.data[this.livesLeft].length === 0) {
      this.livesLeft--;
      if (this.livesLeft < 0) {
        return (this.markedForDeletion = true);
      }
    }
    this.completedText = "";
    this.text = this.data[this.livesLeft].pop();
  }
  consume(key) {
    const length = this.completedText.length + 1;
    const isNextChar =
      this.text.substring(0, length) === this.completedText + key;
    if (isNextChar) {
      this.completedText += key;
      this.game.focus = null;
      this.focused = false;
    }
    if (this.completedText === this.text) {
      this.penalize();
    }
    return isNextChar;
  }
}
