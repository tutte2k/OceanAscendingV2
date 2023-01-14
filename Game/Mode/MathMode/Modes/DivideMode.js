import Enemy from "../../../Enemy/Enemy.js";
import MathMode from "../MathMode.js";
export default class DivideMode extends MathMode {
    static Name = "Divide";
    static Id = 4.4;
    static Content = {};
    constructor() {
      super(DivideMode.Id, DivideMode.Content, DivideMode.Name);
    }
    addEnemy(game) {
      const level = game.level.name < 3 ? 2 : game.level.name;
      const difficulty = Math.floor(level / 2) * 10;
  
      let numerator = Math.floor(Math.random() * difficulty) + 1;
      let denominator = Math.floor(Math.random() * difficulty) + 1;
  
      while (numerator % denominator !== 0) {
        numerator = Math.floor(Math.random() * difficulty) + 1;
        denominator = Math.floor(Math.random() * difficulty) + 1;
      }
      const operator = "/";
      const displayText = `${numerator}${operator}${denominator}`;
      const result = Calculator.Calculate[operator](numerator, denominator);
      if (result === Infinity || result === NaN) return;
      const answer = Number.isInteger(result) ? result : result.toFixed(2);
      const creature = Enemy.NextMath(game, displayText);
      creature.text = answer.toString();
      game.enemies.push(creature);
    }
  }