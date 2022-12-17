class Enemy {
  constructor(game, word) {
    this.game = game;
    this.text = word;
    this.completedText = "";
    this.x = this.game.width;
    this.speedX = -this.game.speed;
    this.markedForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.lives = this.text.length;
    this.maxFrame = 37;
    this.displayText = this.text;
    this.score = this.text.length;
    this.font = "Carter One";
    this.focused = false;
  }
  update() {
    this.x += this.speedX - this.game.speed;
    this.y > this.game.player.y ? (this.y -= 0.4) : (this.y += 0.4);
    if (this.x + this.width * 0.7 < 0) {
      this.x -= this.width;
    }
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
  consume(key) {
    var length = this.completedText.length + 1;
    let isNextChar =
      this.text.substring(0, length) === this.completedText + key;
    if (isNextChar) {
      this.completedText += key;
      this.x += 5;
      console.log(this.text, this.completedText);
    }
    this.markedForDeletion = !(this.completedText !== this.text);
    return isNextChar;
  }

  draw(context) {
    context.save();
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
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
export class Angler1 extends Enemy {
  constructor(game, word) {
    super(game, word);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("angler1");
    this.frameY = Math.floor(Math.random() * 3);
  }
}
export class Angler2 extends Enemy {
  constructor(game, word) {
    super(game, word);
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("angler2");
    this.frameY = Math.floor(Math.random() * 2);
  }
}
export class LuckyFish extends Enemy {
  constructor(game, word) {
    super(game, word);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("lucky");
    this.frameY = Math.floor(Math.random() * 2);
  }
}
export class HiveWhale extends Enemy {
  constructor(game, word) {
    super(game, word);
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("hivewhale");
    this.frameY = 0;
    this.type = "hive";
    this.speedX = -0.2;
  }
}
export class Turtle extends Enemy {
  constructor(game, word) {
    super(game, word);
    this.width = 225;
    this.height = 221;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById(
      `turtle${1 + Math.floor(Math.random() * 4)}`
    );
    this.frameY = 0;
    this.maxFrame = 59;
  }
}

export class Lionfish extends Enemy {
  constructor(game, word) {
    super(game, word);
    this.width = 251;
    this.height = 187;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image = document.getElementById("lionfish1");
    this.frameY = 0;
    this.maxFrame = 60;
  }
}

export class Drone extends Enemy {
  constructor(game, x, y, word) {
    super(game, word);
    this.width = 115;
    this.height = 95;
    this.x = x;
    this.y = y;
    this.image = document.getElementById("drone");
    this.frameY = Math.floor(Math.random() * 2);
    this.type = "drone";
  }
}
