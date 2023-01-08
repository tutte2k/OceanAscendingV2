import Helper from "./Helper.js"
export default class Collision{
    static check(item1,item2,distanceX,distanceY){
        return Helper.hasCollided({
            rectangle1: item1,
            rectangle2: {
              ...item2,
              position: {
                x: item2.position.x + distanceX,
                y: item2.position.y + distanceY,
              },
            },
          })
    }
}