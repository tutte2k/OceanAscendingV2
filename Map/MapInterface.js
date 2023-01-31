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
      this.elements.info.innerHTML = `
        ${completedlevel.mode} 
        <br>Level: 
        ${completedlevel.level} 
        <br>Completed:  
        ${((completedlevel.score / level.maxScore) * 100).toFixed(0)} 
        %`;
    } else if (!level.locked) {
      this.elements.info.innerHTML =
        level.mode.name + "<br>Level: " + level.name;
    }
  }
}
