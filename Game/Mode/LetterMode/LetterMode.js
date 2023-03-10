import Enemy from "../../Enemy/Enemy.js";
import Mode from "../Mode.js";
import LettersHandler from "./LettersHandler.js";

export default class LetterMode extends Mode {
  static Alphabet = "a b c d e f g h i j k l m n o p q r s t u v x y z".split(
    " "
  );
  static ALPHABET = "a b c d e f g h i j k l m n o p q r s t u v x y z"
    .toUpperCase()
    .split(" ");

  static Numbers = "1 2 3 4 5 6 7 8 9 0".split(" ");
  static Controls = [
    "ArrowLeft",
    "ArrowDown",
    "ArrowUp",
    "ArrowRight",
    "Shift",
    "Tab",
    " ",
    "Alt",
    "Control",
    "AltGraph",
    "Meta",
    "Dead",
  ];
  static EnemyInterval = 5000;
  constructor(id, name) {
    super(id, LettersHandler, LetterMode.EnemyInterval, name);
  }
  addEnemy(game) {
    const indexOfLastWord = game.words.length - 1;
    const word = LetterMode.Next(game, indexOfLastWord);
    if (!word) return;
    const creature = Enemy.Next(game, word);
    game.enemies.push(creature);
  }
  static Next(game, startIndex) {
    const notAvailableChars = [];
    for (let i = 0; i < game.enemies.length; i++) {
      if (game.enemies[i]) {
        if (!notAvailableChars.includes(game.enemies[i].text.charAt(0))) {
          notAvailableChars.push(game.enemies[i].text.charAt(0));
        }
      }
    }
    for (let i = startIndex; i >= 0; i--) {
      const wordSuggestion = game.words[i];
      if (wordSuggestion) {
        const firstLetterInWord = wordSuggestion.charAt(0);
        if (!notAvailableChars.includes(firstLetterInWord)) {
          return game.words.splice(i, 1)[0];
        } else {
          continue;
        }
      }
    }
    const fallback = game.words.pop();
    if (fallback) return;
    else return "x";
  }
  findFocus(key, game) {
    const enemy = game.enemies.find((enemy) => {
      return enemy.text.startsWith(key);
    });
    if (enemy && !this.lose) {
      enemy.focused = true;
      return enemy;
    } else {
      if (!LetterMode.Controls.includes(key)) {
        game.userInterface.displayMissedKey(key);
        game.player.penalize();
      }
      return null;
    }
  }
}
