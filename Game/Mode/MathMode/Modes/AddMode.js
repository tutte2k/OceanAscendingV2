import Random from "../../../../Utils/Random.js";
import MathMode from "../MathMode.js";

export default class AddMode extends MathMode {
  static Name = "Add";
  static Id = 4.1;
  static Content = {
    operator: "+",
    0: {
      num1: () => Random.int(0, 9),
      num2: () => Random.int(0, 9),
    },
    1: {
      num1: () => () => Random.int(0, 50),
      num2: () => () => Random.int(0, 50),
    },
    2: {
      num1: () => Random.int(-9, 9),
      num2: () => Random.int(-9, 9),
    },
    3: {
      num1: () => Random.int(0, 100),
      num2: () => Random.int(0, 100),
    },
    4: {
      num1: () => Random.int(0, 1000),
      num2: () => Random.int(0, 1000),
    },
    5: {
      num1: () => Random.int(-100, 100),
      num2: () => Random.int(-100, 100),
    },
  };
  constructor() {
    super(AddMode.Id, AddMode.Content, AddMode.Name);
  }
}
