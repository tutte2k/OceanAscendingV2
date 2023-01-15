export default class Shop {
  static Element = document.getElementById("shop");
  static Cash = document.getElementById("cash");
  static Content = {
    airSlot: {
      price: (val) => val * 10,
      current: document.getElementById("currentAirSlot"),
      priceElement: document.getElementById("airSlotPrice"),
    },
    airReg: {
      price: (val) => val * 20,
      current: document.getElementById("currentAirReg"),
      priceElement: document.getElementById("airRegPrice"),
    },
    mineSlot: {
      price: (val) => val * 5,
      current: document.getElementById("currentMineSlot"),
      priceElement: document.getElementById("mineSlotPrice"),
    },
    mineReg: {
      price: (val) => val * 15,
      current: document.getElementById("currentMineReg"),
      priceElement: document.getElementById("mineRegPrice"),
    },
    diveSpeed: {
      price: (val) => val * 50,
      current: document.getElementById("currentDiveSpeed"),
      priceElement: document.getElementById("diveSpeedPrice"),
    },
    mapSpeed: {
      price: (val) => val * 100,
      current: document.getElementById("currentMapSpeed"),
      priceElement: document.getElementById("mapSpeedPrice"),
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
      30 - this.store.shop.airReg * 2 + " seconds";
    Shop.Content.airReg.priceElement.innerHTML = Shop.Content.airReg.price(
      this.store.shop.airReg
    );

    Shop.Content.mineReg.current.innerHTML =
      30 - this.store.shop.mineReg * 2 + " seconds";
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
  }

  buy(id, cash, dataSource, current) {
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
