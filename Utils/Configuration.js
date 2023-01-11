import Helper from "./Helper.js";
export default class Configuration {
  static ModeToName = {
    0: "English 10k",
    2: "Special",
    3: "Swedish 120k",
    4: "Math and beyond",
    4.1: "Add",
    4.2: "Subtract",
    4.3: "Multiply",
    4.4: "Divide",
    6: "Tibia",
  };
  static MathModes = {
    4.1: {
      0: {
        operators: ["+"],
        num1: () => Helper.randInt(0, 9),
        num2: () => Helper.randInt(0, 9),
      },
      1: {
        operators: ["+"],
        num1: () => () => Helper.randInt(0, 50),
        num2: () => () => Helper.randInt(0, 50),
      },
      2: {
        operators: ["+"],
        num1: () => Helper.randInt(-9, 9),
        num2: () => Helper.randInt(-9, 9),
      },
      3: {
        operators: ["+"],
        num1: () => Helper.randInt(0, 100),
        num2: () => Helper.randInt(0, 100),
      },
      4: {
        operators: ["+"],
        num1: () => Helper.randInt(0, 1000),
        num2: () => Helper.randInt(0, 1000),
      },
      5: {
        operators: ["+"],
        num1: () => Helper.randInt(-100, 100),
        num2: () => Helper.randInt(-100, 100),
      },
    },
    4.2: {
      0: {
        operators: ["-"],
        num1: () => Helper.randInt(0, 9),
        num2: () => Helper.randInt(0, 9),
      },
      1: {
        operators: ["-"],
        num1: () => Helper.randInt(0, 50),
        num2: () => Helper.randInt(0, 50),
      },
      2: {
        operators: ["-"],
        num1: () => Helper.randInt(-9, 9),
        num2: () => Helper.randInt(-9, 9),
      },
      3: {
        operators: ["-"],
        num1: () => Helper.randInt(0, 100),
        num2: () => Helper.randInt(0, 100),
      },
      4: {
        operators: ["-"],
        num1: () => Helper.randInt(0, 1000),
        num2: () => Helper.randInt(0, 1000),
      },
      5: {
        operators: ["-"],
        num1: () => Helper.randInt(-100, 100),
        num2: () => Helper.randInt(-100, 100),
      },
    },
    4.3: {
      0: {
        operators: ["*"],
        num1: () => Helper.randInt(1, 2),
        num2: () => Helper.randInt(0, 9),
      },
      1: {
        operators: ["*"],
        num1: () => Helper.randInt(3, 4),
        num2: () => Helper.randInt(0, 9),
      },
      2: {
        operators: ["*"],
        num1: () => Helper.randInt(5, 6),
        num2: () => Helper.randInt(0, 9),
      },
      3: {
        operators: ["*"],
        num1: () => Helper.randInt(7, 8),
        num2: () => Helper.randInt(0, 9),
      },
      4: {
        operators: ["*"],
        num1: () => Helper.randInt(9, 10),
        num2: () => Helper.randInt(0, 9),
      },
      5: {
        operators: ["*"],
        num1: () => Helper.randInt(0, 12),
        num2: () => Helper.randInt(0, 12),
      },
    },
  };
}
