export default class DataSource {
  constructor() {}
  getStore() {
    let storage = JSON.parse(localStorage.getItem("store"));
    if (storage) return storage;
    return {
      cash: 0,
      completedLevels: { mode: { 0: [], 6: [] } },
      shop: { airSlot: 1, airReg: 0, mineSlot: 0, mineReg: 0 },
    };
  }
  setStore(store) {
    localStorage.setItem("store", JSON.stringify(store));
  }
}
