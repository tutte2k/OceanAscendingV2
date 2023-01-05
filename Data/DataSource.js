export default class DataSource {
  constructor() {}

  getStore() {
    let storage = JSON.parse(localStorage.getItem("store"));
    if (storage) return storage;
    return {
      cash: 0,
      completedLevels: { mode: { 0: [], 6: [] } },
      stats: { air: 0, mine: 0, speed: 0 },
      drops: {
        zapper: 0,
        shield: 0,
        timewarp: 0,
      },
      regen: { air: 0, mine: 0 },
    };
  }

  setStore(store) {
    localStorage.setItem("store", JSON.stringify(store));
  }
}
