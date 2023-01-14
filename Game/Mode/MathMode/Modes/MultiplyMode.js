import Random from "../../../../Utils/Random.js";
import MathMode from "../MathMode.js";
export default class MultiplyMode extends MathMode {
  static Name = "Multiply";
  static Id = 4.3;
  static Content = {
    operator: "*",
    0: {
      num1: () => Random.int(1, 2),
      num2: () => Random.int(0, 9),
    },
    1: {
      num1: () => Random.int(3, 4),
      num2: () => Random.int(0, 9),
    },
    2: {
      num1: () => Random.int(5, 6),
      num2: () => Random.int(0, 9),
    },
    3: {
      num1: () => Random.int(7, 8),
      num2: () => Random.int(0, 9),
    },
    4: {
      num1: () => Random.int(9, 10),
      num2: () => Random.int(0, 9),
    },
    5: {
      num1: () => Random.int(0, 12),
      num2: () => Random.int(0, 12),
    },
  };
  constructor() {
    super(MultiplyMode.Id, MultiplyMode.Content, MultiplyMode.Name);
  }
}
