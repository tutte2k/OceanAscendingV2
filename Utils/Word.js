export default class Word {
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
}
