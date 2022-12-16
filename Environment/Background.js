export class Layer {
  constructor(game, image, speedModifier) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 1768;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.y <= -this.height) {
      this.y = 0;
    }

    this.y -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x, this.y + this.height);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.image2 = document.getElementById("layer2");
    this.image3 = document.getElementById("layer3");
    this.image4 = document.getElementById("layer4");
    //   this.image3 = document.getElementById("layer3");
    //   this.image4 = document.getElementById("layer4");
    this.layer2 = new Layer(this.game, this.image2, 1);
    this.layer3 = new Layer(this.game, this.image3, 1.5);
    this.layer4 = new Layer(this.game, this.image4, 1);
    //   this.layer3 = new Layer(this.game, this.image3, 1);
    //   this.layer4 = new Layer(this.game, this.image4, 1.5);
    //   , , this.layer3
    this.layers = [this.layer3, this.layer2];
  }
  update() {
    this.layers.forEach((layer) => layer.update());
  }
  draw(context) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
