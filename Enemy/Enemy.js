import SpriteSheet from "../Game/Sprite.js";
import Helper from "../Game/Helper.js";

class Enemy {
  constructor(game, word, sprite) {
    this.game = game;
    this.text = word;
    this.completedText = "";
    this.displayText = this.text;
    this.score = this.text.length;
    this.lives = this.text.length;
    this.focused = false;

    this.x = this.game.width;

    this.speedX = -this.game.speed;
    this.markedForDeletion = false;

    this.font = "Carter One";

    this.sprite = sprite;
    this.width = sprite.width;
    this.height = sprite.height;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
  }
  update(deltaTime) {
    if (this.speedY) {
      this.y += this.speedY - this.game.speed;
    } else {
      this.x += this.speedX - this.game.speed;
      this.y > this.game.player.y ? (this.y -= 0.4) : (this.y += 0.4);
      if (this.x + this.width * 0.7 < 0) {
        this.x -= this.width;
      }
    }
    if (this.x + this.width < 0 || this.y + this.height < 0) {
      this.markedForDeletion = true;
    }
    this.sprite.update(deltaTime);
  }
  consume(key) {
    var length = this.completedText.length + 1;
    let isNextChar =
      this.text.substring(0, length) === this.completedText + key;
    if (isNextChar) {
      this.completedText += key;
      this.x += 5;
    }
    this.markedForDeletion = !(this.completedText !== this.text);
    if (this.markedForDeletion) {
      this.game.score += this.score;
    }
    return isNextChar;
  }

  draw(context) {
    context.save();
    this.sprite.draw(context, this.x, this.y);
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    this.displayText = this.text.replace(this.completedText, "");
    context.fillStyle = this.focused ? "silver" : "white";
    context.font = "40px " + this.font;
    context.fillText(
      this.displayText,
      this.x + this.width * 0.5,
      this.y + this.height * 0.5
    );
    context.restore();
  }
}
export class Jellyfish extends Enemy {
  constructor(game, word) {
    super(
      game,
      word,
      new SpriteSheet(
        document.getElementById(`jellyfish${Helper.randInt(1, 5)}`),
        120,
        258,
        59,
        0,
        30
      )
    );
    this.x = Helper.randInt(
      this.game.width * 0.1,
      this.game.width - this.game.width * 0.1
    );
    this.y = this.game.height + 100;
    this.speedX = 0;
    this.speedY = -1;
  }
}
export class Seahorse extends Enemy {
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
export class Angler1 extends Enemy {
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
export class Angler2 extends Enemy {
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
export class LuckyFish extends Enemy {
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
  }
}
export class HiveWhale extends Enemy {
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
    this.type = "hive";
  }
}
export class Turtle extends Enemy {
  constructor(game, word) {
    const width = 225;
    const height = 221;
    const image = document.getElementById(`turtle${Helper.randInt(1, 5)}`);
    super(game, word, new SpriteSheet(image, width, height, 59, 0, 30));
    this.speedX = -0.1;
  }
}
export class Chtullie extends Enemy {
  constructor(game, word) {
    const width = 500;
    const height = 500;
    const image = document.getElementById(`chtullie`);
    super(game, word, new SpriteSheet(image, width, height, 4, 9, 25, true));
    this.speedX = -1.2;
  }
}

export class Lionfish extends Enemy {
  constructor(game, word) {
    const width = 251;
    const height = 187;
    const image = document.getElementById("lionfish1");
    super(game, word, new SpriteSheet(image, width, height, 60, 0, 30));
    this.speedX = -0.5;
  }
}

export class Drone extends Enemy {
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
