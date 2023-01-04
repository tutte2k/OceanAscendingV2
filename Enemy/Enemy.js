import SpriteSheet from "../Utils/SpriteSheet.js";
import Helper from "../Utils/Helper.js";

class Enemy {
  constructor(game, word, sprite) {
    this.game = game;
    this.text = word;
    this.completedText = "";
    this.displayText = this.text;
    this.score = this.text.length;
    this.focused = false;
    this.x = this.game.width;

    this.speedX = -this.game.speed;
    this.markedForDeletion = false;

    this.sprite = sprite;
    this.width = sprite.width;
    this.height = sprite.height;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    this.element = document.createElement("div")
    this.element.classList.add("word")
    this.element.innerHTML = word
    this.element.style.position = "absolute"
    this.game.wordContainer.appendChild(this.element)
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
      this.element.hidden = true;
      this.element.remove();
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
      this.element.hidden = true;
      this.element.remove();
      this.game.score += this.score;
    }
    return isNextChar;
  }
  remove(){
    this.element.hidden = true;
    this.element.remove();
  }
  draw(context) {
    let widthPercentage = (context.canvas.getBoundingClientRect().width / 2500)
    let heightPercentage = (context.canvas.getBoundingClientRect().height / 1768)
    this.sprite.draw(context, this.x, this.y)
    this.element.style.top =  (this.y * (heightPercentage)) + "px";
    this.element.style.left = (this.width * (widthPercentage)) / 2 + (this.x * (widthPercentage)) + "px";
    this.element.innerHTML = this.text.replace(this.completedText, "")
    this.element.style.color = this.focused ? "lime" : "whitesmoke";
    this.displayText = this.text.replace(this.completedText, "");
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
export class Goldfish extends Enemy {
  constructor(game, word) {
    const width = 228;
    const height = 118;
    const image = document.getElementById("goldfish");
    super(game, word, new SpriteSheet(image, width, height, 9, 0, 8));
    this.speedX = -0.1;
  }
}
export class Turtle extends Enemy {
  constructor(game, word) {
    const width = 225;
    const height = 221;
    const image = document.getElementById(`turtle${Helper.randInt(1, 5)}`);
    super(game, word, new SpriteSheet(image, width, height, 59, 0, 30));
    this.speedX = -0.2;
  }
}
export class Lionfish extends Enemy {
  constructor(game, word) {
    const width = 251;
    const height = 187;
    const image = document.getElementById("lionfish1");
    super(game, word, new SpriteSheet(image, width, height, 60, 0, 30));
    this.speedX = -0.3;
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
    this.type = "mech";
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
    this.type = "mech";
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
    this.type = "mech";
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
    this.type = "mech";
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

export class Chtullie extends Enemy {
  constructor(game, word) {
    const width = 500;
    const height = 500;
    const image = document.getElementById(`chtullie`);
    super(game, word, new SpriteSheet(image, width, height, 4, 9, 25, true));
    this.speedX = -0.6;
    this.type = "chtullie";
  }
}
export class Angela extends Enemy {
  constructor(game, word) {
    const width = 483;
    const height = 500;
    const image = document.getElementById(`angela${Helper.randInt(1, 2)}`);
    super(game, word, new SpriteSheet(image, width, height, 29, 0, 20));
    this.speedX = -1;
    this.type = "angela";
  }
}

export class Shark extends Enemy {
  constructor(game, word) {
    const width = 398;
    const height = 194;
    const image = document.getElementById("shark");
    super(game, word, new SpriteSheet(image, width, height, 7, 0, 20));
    this.speedX = -1.5;
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
    this.type = "mech";
  }
}
