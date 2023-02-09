import Enemy from "../../../Enemy/Enemy.js";
import LetterMode from "../LetterMode.js";

export default class BossMode extends LetterMode {
  static Name = "Boss";
  static Id = 7;
  constructor() {
    super(BossMode.Id, BossMode.Name);
  }
  addEnemy(game) {
    if (!game.boss) {
      game.boss = true;
      const bossClass = Enemy.NextBoss(game.level.name);
      const boss = new bossClass(game);
      game.enemies.push(boss);
    }
    if (game.enemies.length === 0) {
      game.win = true;
    }
  }
  static Data = LetterMode.Alphabet.slice();
}
