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
    return Collision.hasCollided({
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
  static hasCollided({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
  }
  static checkCollision(rect1, rect2, precision = 1) {
    let r1w = rect1.width * precision;
    let r1h = rect1.height * precision;
    let r2w = rect2.width * precision;
    let r2h = rect2.height * precision;

    return (
      rect1.x < rect2.x + r2w &&
      rect1.x + r1w > rect2.x &&
      rect1.y < rect2.y + r2h &&
      r1h + rect1.y > rect2.y
    );
  }
}
