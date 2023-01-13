import LettersHandler from "../UserInput/LettersHandler.js";
import MathHandler from "../UserInput/MathHandler.js";
import Helper from "../Utils/Helper.js";
import Enemy from "../Enemy/Enemy.js";
import Word from "../Utils/Word.js";

export default class Mode {
  constructor(id, inputhandler, enemyInterval, name) {
    this.id = id;
    this.inputHandler = inputhandler;
    this.enemyInterval = enemyInterval;
    this.name = name;
  }
}
export class MathMode extends Mode {
  static EnemyInterval = 10000;
  static Calculate = {
    "/": (firstInput, secondInput) => firstInput / secondInput,
    "*": (firstInput, secondInput) => firstInput * secondInput,
    "+": (firstInput, secondInput) => firstInput + secondInput,
    "-": (firstInput, secondInput) => firstInput - secondInput,
  };
  static Operators = ["/", "*", "+", "-"];
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
    const result = MathMode.Calculate[operator](num1, num2);
    if (result === Infinity || result === NaN) return;
    const answer = Number.isInteger(result) ? result : result.toFixed(2);
    const creature = Enemy.NextMath(game, displayText);
    creature.text = answer.toString();
    game.enemies.push(creature);
  }
}
export class AddMode extends MathMode {
  static Name = "Add";
  static Id = 4.1;
  static Content = {
    operator: "+",
    0: {
      num1: () => Helper.randInt(0, 9),
      num2: () => Helper.randInt(0, 9),
    },
    1: {
      num1: () => () => Helper.randInt(0, 50),
      num2: () => () => Helper.randInt(0, 50),
    },
    2: {
      num1: () => Helper.randInt(-9, 9),
      num2: () => Helper.randInt(-9, 9),
    },
    3: {
      num1: () => Helper.randInt(0, 100),
      num2: () => Helper.randInt(0, 100),
    },
    4: {
      num1: () => Helper.randInt(0, 1000),
      num2: () => Helper.randInt(0, 1000),
    },
    5: {
      num1: () => Helper.randInt(-100, 100),
      num2: () => Helper.randInt(-100, 100),
    },
  };
  constructor() {
    super(AddMode.Id, AddMode.Content, AddMode.Name);
  }
}
export class SubtractMode extends MathMode {
  static Name = "Subtract";
  static Id = 4.2;
  static Content = {
    operator: "-",
    0: {
      num1: () => Helper.randInt(0, 9),
      num2: () => Helper.randInt(0, 9),
    },
    1: {
      num1: () => Helper.randInt(0, 50),
      num2: () => Helper.randInt(0, 50),
    },
    2: {
      num1: () => Helper.randInt(-9, 9),
      num2: () => Helper.randInt(-9, 9),
    },
    3: {
      num1: () => Helper.randInt(0, 100),
      num2: () => Helper.randInt(0, 100),
    },
    4: {
      num1: () => Helper.randInt(0, 1000),
      num2: () => Helper.randInt(0, 1000),
    },
    5: {
      num1: () => Helper.randInt(-100, 100),
      num2: () => Helper.randInt(-100, 100),
    },
  };
  constructor() {
    super(SubtractMode.Id, SubtractMode.Content, SubtractMode.Name);
  }
}
export class MultiplyMode extends MathMode {
  static Name = "Multiply";
  static Id = 4.3;
  static Content = {
    operator: "*",
    0: {
      num1: () => Helper.randInt(1, 2),
      num2: () => Helper.randInt(0, 9),
    },
    1: {
      num1: () => Helper.randInt(3, 4),
      num2: () => Helper.randInt(0, 9),
    },
    2: {
      num1: () => Helper.randInt(5, 6),
      num2: () => Helper.randInt(0, 9),
    },
    3: {
      num1: () => Helper.randInt(7, 8),
      num2: () => Helper.randInt(0, 9),
    },
    4: {
      num1: () => Helper.randInt(9, 10),
      num2: () => Helper.randInt(0, 9),
    },
    5: {
      num1: () => Helper.randInt(0, 12),
      num2: () => Helper.randInt(0, 12),
    },
  };
  constructor() {
    super(MultiplyMode.Id, MultiplyMode.Content, MultiplyMode.Name);
  }
}
export class DivideMode extends MathMode {
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
    const result = MathMode.Calculate[operator](numerator, denominator);
    if (result === Infinity || result === NaN) return;
    const answer = Number.isInteger(result) ? result : result.toFixed(2);
    const creature = Enemy.NextMath(game, displayText);
    creature.text = answer.toString();
    game.enemies.push(creature);
  }
}
export class BeyondMode extends MathMode {
  static Name = "Math and beyond";
  static Id = 4;
  static Content = {};
  constructor() {
    super(BeyondMode.Id, BeyondMode.Content, BeyondMode.Name);
  }
  addEnemy(game) {
    const num1 = Helper.randInt(0, 99);
    const operator =
      MathMode.Operators[Helper.randInt(0, MathMode.Operators.length - 1)];
    const num2 = Helper.randInt(0, 99);

    const displayText = `${num1}${operator}${num2}`;
    const result = performCalc[operator](num1, num2);
    if (result === Infinity || result === NaN) return;
    const answer = Number.isInteger(result) ? result : result.toFixed(2);
    const creature = Enemy.NextMath(game, displayText);
    creature.text = answer.toString();
    game.enemies.push(creature);
  }
}
export class LetterMode extends Mode {
  static EnemyInterval = 2000;
  constructor(id, name) {
    super(id, LettersHandler, LetterMode.EnemyInterval, name);
  }
  addEnemy(game) {
    const indexOfLastWord = game.words.length - 1;
    const word = Word.Next(game, indexOfLastWord);
    if (!word) return;
    const creature = Enemy.Next(game, word);
    game.enemies.push(creature);
  }
}
export class EnglishMode extends LetterMode {
  static Name = "English 10k";
  static Id = 0;
  constructor() {
    super(EnglishMode.Id, EnglishMode.Name);
  }
}
export class TibiaMode extends LetterMode {
  static Name = "Tibia";
  static Id = 6;
  constructor() {
    super(TibiaMode.Id, TibiaMode.Name);
  }
}
export class ExpertMode extends LetterMode {
  static Name = "Expert";
  static Id = 2;
  constructor() {
    super(ExpertMode.Id, ExpertMode.Name);
  }
}
export class SwedishMode extends LetterMode {
  static Name = "Swedish 120k";
  static Id = 3;
  constructor() {
    super(SwedishMode.Id, SwedishMode.Name);
  }
}
