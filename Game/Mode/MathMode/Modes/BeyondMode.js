import Calculator from "../../../../Utils/Calculator.js";
import Enemy from "../../../Enemy/Enemy.js";
import MathMode from "../MathMode.js";
export default class BeyondMode extends MathMode {
    static Name = "Math and beyond";
    static Id = 4;
    static Content = {};
    constructor() {
      super(BeyondMode.Id, BeyondMode.Content, BeyondMode.Name);
    }
    addEnemy(game) {
      const num1 = Random.int(0, 99);
      const operator =
        Calculator.Operators[Random.int(0, Calculator.Operators.length - 1)];
      const num2 = Random.int(0, 99);
      const displayText = `${num1}${operator}${num2}`;
      const result = performCalc[operator](num1, num2);
      if (result === Infinity || result === NaN) return;
      const answer = Number.isInteger(result) ? result : result.toFixed(2);
      const creature = Enemy.NextMath(game, displayText);
      creature.text = answer.toString();
      game.enemies.push(creature);
    }
  }
  