import MathHandler from "./MathHandler.js";
import Mode from "../Mode.js";

export default class MathMode extends Mode {
  static EnemyInterval = 10000;
  constructor(id, content, name) {
    super(id, MathHandler, MathMode.EnemyInterval, name);
    this.content = content;
  }
  addEnemy(game) {
    let difficulty = Math.floor(game.level.name / 4);
    const num1 = this.content[difficulty].num1();
    const operator = this.content.operator;
    const num2 = this.content[difficulty].num2();
    const displayText = `${num1}${operator}${num2}`;
    const result = Calculator.Calculate[operator](num1, num2);
    if (result === Infinity || result === NaN) return;
    const answer = Number.isInteger(result) ? result : result.toFixed(2);
    const creature = Enemy.NextMath(game, displayText);
    creature.text = answer.toString();
    game.enemies.push(creature);
  }
}

