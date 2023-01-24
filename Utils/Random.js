export default class Random {
  static int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static index(arr) {
    return Math.floor(Math.random() * arr.length);
  }
  static indexes(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    arr.sort(function (a, b) {
      return b.length - a.length;
    });
    return arr;
  }
}
