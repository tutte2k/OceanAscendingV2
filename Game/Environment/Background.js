import Layer from "./Layer.js";
export default class Background {
  constructor(game) {
    this.game = game;
    this.layer2 = new Layer(this.game, document.getElementById("layer2"), 1);
    this.layer3 = new Layer(this.game, document.getElementById("layer3"), 1.5);
    this.layer4 = new Layer(this.game, document.getElementById("layer4"), 1);
    this.layers = [this.layer3, this.layer2];
  }
  update() {
    this.layers.forEach((layer) => layer.update());
  }
  draw(context) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
