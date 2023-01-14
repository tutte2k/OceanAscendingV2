export default class Random {
  static int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static index(arr) {
    return Math.floor(Math.random() * arr.length);
  }
}
