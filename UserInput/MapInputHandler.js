export default class MapInputHandler {
  constructor() {
    this.keys = {
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false },
      enter: { pressed: false },
      q: { pressed: false },
    };
    this.lastKey = "";
    this.addEventListeners();
  }
  addEventListeners() {
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.key) {
        case "w":
          this.keys.w.pressed = true;
          this.lastKey = "w";
          break;
        case "a":
          this.keys.a.pressed = true;
          this.lastKey = "a";
          break;
        case "s":
          this.keys.s.pressed = true;
          this.lastKey = "s";
          break;
        case "d":
          this.keys.d.pressed = true;
          this.lastKey = "d";
          break;
        case "Enter":
          this.keys.enter.pressed = true;
          break;
        case "q":
          this.keys.q.pressed = true;
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          this.keys.w.pressed = false;
          break;
        case "a":
          this.keys.a.pressed = false;
          break;
        case "s":
          this.keys.s.pressed = false;
          break;
        case "d":
          this.keys.d.pressed = false;
          break;
        case "Enter":
          this.keys.enter.pressed = false;
          break;
        case "q":
          this.keys.q.pressed = false;
          break;
      }
    });
  }
}
