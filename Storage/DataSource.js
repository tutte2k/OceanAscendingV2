export default class DataSource {
  constructor() {
    this.item = "a9";
  }
  getStore() {
    let storage = JSON.parse(localStorage.getItem(this.item));
    if (storage) {
      if (!storage.completedLevels.mode[8]) {
        storage.completedLevels.mode[8] = [];
      }
      if (!storage.shop.combo) {
        storage.shop.combo = 1;
        storage.shop.spear = 1;
        storage.shop.impact = 1;
      }
      if (!storage.shop.durability) {
        storage.shop.durability = 1;
      }
      return storage;
    }
    return {
      cash: 0,
      completedLevels: {
        mode: {
          0: [],
          2: [],
          3: [],
          4: [],
          4.1: [],
          4.2: [],
          4.3: [],
          4.4: [],
          6: [],
          7: [],
          8: [],
        },
      },
      shop: {
        airSlot: 1,
        airReg: 1,
        mineSlot: 1,
        mineReg: 1,
        diveSpeed: 1,
        mapSpeed: 3,
        maxEnergy: 5,
        combo: 1,
        spear: 1,
        impact: 1,
        durability: 1,
      },
    };
  }
  setStore(store) {
    localStorage.setItem(this.item, JSON.stringify(store));
  }
  sobStory(state) {
    const store = this.getStore();
    let earnedCash = Math.round(state.score * 0.01);
    store["cash"] = store["cash"] + earnedCash;
    this.setStore(store);
    return store["cash"];
  }
  saveStateAndReturnCash(state) {
    const store = this.getStore();
    let earnedCash;
    let levelObject = store.completedLevels.mode[state.level.mode.id].find(
      (obj) => obj.level === state.level.name
    );
    if (!levelObject) {
      levelObject = {
        level: state.level.name,
        mode: state.level.mode.name,
        score: state.score,
      };
      store.completedLevels.mode[state.level.mode.id].push(levelObject);
      const availableScore = state.level.maxScore;
      earnedCash =
        state.level.name + Math.round((state.score / availableScore) * 10);
      store["cash"] = store["cash"] + earnedCash;
      this.setStore(store);
    } else if (levelObject.score < state.score) {
      const previousScore = levelObject.score;
      const currentScore = state.score;
      const earnableScore = currentScore - previousScore;

      store.completedLevels.mode[state.level.mode.id][state.level.name].score =
        state.score;

      earnedCash = Math.round((earnableScore / state.level.maxScore) * 10);

      store["cash"] = store["cash"] + earnedCash;

      this.setStore(store);
    }
    return store["cash"];
  }
}
