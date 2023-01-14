export default class Calculator {
  static Calculate = {
    "/": (firstInput, secondInput) => firstInput / secondInput,
    "*": (firstInput, secondInput) => firstInput * secondInput,
    "+": (firstInput, secondInput) => firstInput + secondInput,
    "-": (firstInput, secondInput) => firstInput - secondInput,
  };
  static Operators = ["/", "*", "+", "-"];
}
