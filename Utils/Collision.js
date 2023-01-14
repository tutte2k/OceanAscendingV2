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
  static checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
}
