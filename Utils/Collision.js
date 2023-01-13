import Helper from "./Helper.js";
export default class Collision {
  static checkAll(arr, object, distanceX, distanceY) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (Collision.check(object, item, distanceX, distanceY)) {
        return false;
      } 
    }
    return true;
  }
  static check(item1, item2, distanceX, distanceY) {
    return Helper.hasCollided({
      rectangle1: item1,
      rectangle2: {
        ...item2,
        position: {
          x: item2.position.x + distanceX,
          y: item2.position.y + distanceY,
        },
      },
    });
  }
}
