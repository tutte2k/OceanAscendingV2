import Shop from "./Shop.js";
export default class MapInterface {
  constructor(dataSource) {
    this.shop = new Shop(dataSource);
    this.elements = {
      info: document.getElementById("info"),
    };
  }
  displayLevelInfo(completedlevel, level) {
    if (completedlevel) {
      this.elements.info.innerHTML =
        completedlevel.mode +
        "<br>Level: " +
        completedlevel.level +
        "<br>Score: " +
        completedlevel.score +
        "/" +
        level.maxScore;
    } else if (!level.locked) {
      this.elements.info.innerHTML =
        level.mode.name + "<br>Level: " + level.name;
    }
  }
}
