export default class Shop {
  static Element = document.getElementById("shop");
  static Cash = document.getElementById("cash");
  static Content = {
    impact: {
      price: (val) => val * ( val * 10),
      current: document.getElementById("currentImpact"),
      priceElement: document.getElementById("impactPrice"),
      max: 15,
    },
    mineSlot: {
      price: (val) => val * ( val * 20),
      current: document.getElementById("currentMineSlot"),
      priceElement: document.getElementById("mineSlotPrice"),
      max: 100,
    },
    mineReg: {
      price: (val) => val * ( val * 30),
      current: document.getElementById("currentMineReg"),
      priceElement: document.getElementById("mineRegPrice"),
      max: 10,
    },
    combo: {
      price: (val) => val * ( val * 80),
      current: document.getElementById("currentCombo"),
      priceElement: document.getElementById("comboPrice"),
      max: 10,
    },
    maxEnergy: {
      price: (val) => val * ( val * 50),
      current: document.getElementById("currentMaxEnergy"),
      priceElement: document.getElementById("maxEnergyPrice"),
      max: 100,
    },
    airSlot: {
      price: (val) => val * ( val * 30),
      current: document.getElementById("currentAirSlot"),
      priceElement: document.getElementById("airSlotPrice"),
      max: 100,
    },
    airReg: {
      price: (val) => val * ( val * 40),
      current: document.getElementById("currentAirReg"),
      priceElement: document.getElementById("airRegPrice"),
      max: 10,
    },
    diveSpeed: {
      price: (val) => val * ( val * 90),
      current: document.getElementById("currentDiveSpeed"),
      priceElement: document.getElementById("diveSpeedPrice"),
      max: 10,
    },
    mapSpeed: {
      price: (val) => val * ( val * 100),
      current: document.getElementById("currentMapSpeed"),
      priceElement: document.getElementById("mapSpeedPrice"),
      max: 10,
    },
    spear: {
      price: (val) => val * ( val * 5000),
      current: document.getElementById("currentSpear"),
      priceElement: document.getElementById("spearPrice"),
      max: 5,
    },
  };
  constructor(dataSource) {
    this.store = dataSource.getStore();
    this.update();
    Shop.Element.addEventListener("click", (e) => {
      const store = dataSource.getStore();
      const cash = store["cash"];
      const btn = Shop.Content[e.target.id];
      const current = store.shop[e.target.id];
      btn &&
        Shop.Content[e.target.id].price(current) <= cash &&
        this.buy(e.target.id, cash, dataSource, current);
    });
  }
  update() {
    this.setCash(this.store["cash"]);

    Shop.Content.airSlot.current.innerHTML = this.store.shop.airSlot;
    Shop.Content.airSlot.priceElement.innerHTML = Shop.Content.airSlot.price(
      this.store.shop.airSlot
    );

    Shop.Content.airReg.current.innerHTML =
      32 - this.store.shop.airReg * 2 + " seconds";
    Shop.Content.airReg.priceElement.innerHTML = Shop.Content.airReg.price(
      this.store.shop.airReg
    );

    Shop.Content.mineReg.current.innerHTML =
      32 - this.store.shop.mineReg * 2 + " seconds";
    Shop.Content.mineReg.priceElement.innerHTML = Shop.Content.mineReg.price(
      this.store.shop.mineReg
    );

    Shop.Content.mineSlot.current.innerHTML = this.store.shop.mineSlot;
    Shop.Content.mineSlot.priceElement.innerHTML = Shop.Content.mineSlot.price(
      this.store.shop.mineSlot
    );

    Shop.Content.diveSpeed.current.innerHTML = this.store.shop.diveSpeed;
    Shop.Content.diveSpeed.priceElement.innerHTML =
      Shop.Content.diveSpeed.price(this.store.shop.diveSpeed);

    Shop.Content.mapSpeed.current.innerHTML = this.store.shop.mapSpeed;
    Shop.Content.mapSpeed.priceElement.innerHTML = Shop.Content.mapSpeed.price(
      this.store.shop.mapSpeed
    );

    Shop.Content.maxEnergy.current.innerHTML = this.store.shop.maxEnergy;
    Shop.Content.maxEnergy.priceElement.innerHTML =
      Shop.Content.maxEnergy.price(this.store.shop.maxEnergy);

    Shop.Content.combo.current.innerHTML = 21 - this.store.shop.combo;
    Shop.Content.combo.priceElement.innerHTML = Shop.Content.combo.price(
      this.store.shop.combo
    );

    Shop.Content.impact.current.innerHTML = this.store.shop.impact;
    Shop.Content.impact.priceElement.innerHTML = Shop.Content.impact.price(
      this.store.shop.impact
    );

    Shop.Content.spear.current.innerHTML = this.store.shop.spear;
    Shop.Content.spear.priceElement.innerHTML = Shop.Content.spear.price(
      this.store.shop.spear
    );
  }
  buy(id, cash, dataSource, current) {
    if (current >= Shop.Content[id].max) return;
    this.store = dataSource.getStore();
    this.store.shop[id]++;
    this.store.cash = cash - Shop.Content[id].price(current);
    dataSource.setStore(this.store);
    this.update();
  }
  setCash(cash) {
    Shop.Cash.innerHTML = cash;
  }
}
