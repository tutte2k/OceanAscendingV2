import { mapData } from "../Data/mapData.js";
import { Words10K } from "../Data/Words.js";
import { TibiaWords } from "../Data/Tibia.js";
import { SpecialMode } from "../Data/Special.js";
import { SvenskaMode } from "../Data/Svenska.js";
import Boundary from "./Boundary.js";
import LandTile from "./LandTile.js";
import Level from "./Level.js";
import Sprite from "../Utils/Sprite.js";
import MapInputHandler from "../UserInput/MapInputHandler.js";
import UserInterface from "../UserInterface/UserInterface.js";

export default class Map {
  constructor(dataSource, canvas) {
    UserInterface.setUpShop(dataSource);
    this.dataSource = dataSource;
    this.canvas = canvas;
    this.levelData = dataSource.getStore()["completedLevels"];
    this.offset = {
      x: -1140,
      y: -1725,
    };

    this.background = new Sprite({
      position: { x: this.offset.x, y: this.offset.y },
      image: document.getElementById("map"),
    });

    this.foreground = new Sprite({
      position: { x: this.offset.x, y: this.offset.y },
      image: document.getElementById("foreground"),
    });

    this.player = new Sprite({
      position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 4,
      },
      image: document.getElementById("playerDown"),
      frames: { max: 4 },
      sprites: {
        up: document.getElementById("playerUp"),
        down: document.getElementById("playerDown"),
        left: document.getElementById("playerLeft"),
        right: document.getElementById("playerRight"),
        swimUp: document.getElementById("playerSwimUp"),
        swimDown: document.getElementById("playerSwimDown"),
        swimLeft: document.getElementById("playerSwimLeft"),
        swimRight: document.getElementById("playerSwimRight"),
      },
      swimming: false,
    });

    this.landTiles = [];
    this.boundaries = [];

    this.specialLevelsArray = [];
    this.svenskaLevelsArray = [];
    this.tibiaLevelsArray = [];
    this.wordsLevelsArray = [];
    this.mathLevelsArray = [];
    this.addLevelsArray = [];
    this.subLevelsArray = [];
    this.divLevelsArray = [];
    this.mulLevelsArray = [];

    this.wordsCounter = 0;
    this.tibiaCounter = 0;
    this.specialCounter = 0;
    this.svenskaCounter = 0;

    this.addCounter = 0;
    this.subCounter = 0;
    this.divCounter = 0;
    this.mulCounter = 0;
    this.mathCounter = 0;

    this.init();

    if (
      this.addLevelsArray[this.addLevelsArray.length - 1].locked === false ||
      this.subLevelsArray[this.subLevelsArray.length - 1].locked === false ||
      this.mulLevelsArray[this.mulLevelsArray.length - 1].locked === false ||
      this.divLevelsArray[this.divLevelsArray.length - 1].locked === false
    ) {
      this.mathLevelsArray[0].locked = false;
    }

    this.levelsArray = [
      ...this.wordsLevelsArray,
      ...this.tibiaLevelsArray,
      ...this.specialLevelsArray,
      ...this.svenskaLevelsArray,
      ...this.addLevelsArray,
      ...this.subLevelsArray,
      ...this.mulLevelsArray,
      ...this.divLevelsArray,
      ...this.mathLevelsArray,
    ];

    this.movables = [
      this.background,
      ...this.boundaries,
      this.foreground,
      ...this.levelsArray,
      ...this.landTiles,
    ];
    this.moving = true;
    this.inputHandler = new MapInputHandler(this);
  }
  init() {
    const tibiaContent = Level.setContent(TibiaWords, 50);
    const wordsContent = Level.setContent(Words10K, 100);
    const specialContent = Level.setContent(SpecialMode, 50);
    const svenskaContent = Level.setContent(SvenskaMode, 275);
    const MathContent = Array.from(Array(100).keys());

    mapData.forEach((row, i) => {
      row.forEach((symbol, j) => {
        if (symbol === 1025) {
          this.boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width + 800,
                y: i * Boundary.height + -500,
              },
            })
          );
        }
        if (symbol === 99) {
          this.landTiles.push(
            new LandTile({
              position: {
                x: j * LandTile.width + 800,
                y: i * LandTile.height + -500,
              },
            })
          );
        }
        if (symbol === 1) {
          this.mapLevel(
            0,
            wordsContent,
            this.wordsLevelsArray,
            this.wordsCounter,
            j,
            i
          );
          this.wordsCounter++;
        }
        if (symbol === 6) {
          this.mapLevel(
            6,
            tibiaContent,
            this.tibiaLevelsArray,
            this.tibiaCounter,
            j,
            i
          );
          this.tibiaCounter++;
        }
        if (symbol === 2) {
          this.mapLevel(
            2,
            specialContent,
            this.specialLevelsArray,
            this.specialCounter,
            j,
            i
          );
          this.specialCounter++;
        }
        if (symbol === 3) {
          this.mapLevel(
            3,
            svenskaContent,
            this.svenskaLevelsArray,
            this.svenskaCounter,
            j,
            i
          );
          this.svenskaCounter++;
        }
        if (symbol === 4) {
          this.mapLevel(
            4,
            MathContent,
            this.mathLevelsArray,
            this.mathCounter,
            j,
            i
          );
          this.mathCounter++;
        }

        if (symbol === 4.1) {
          this.mapLevel(
            4.1,
            MathContent,
            this.addLevelsArray,
            this.addCounter,
            j,
            i
          );
          this.addCounter++;
        }
        if (symbol === 4.2) {
          this.mapLevel(
            4.2,
            MathContent,
            this.subLevelsArray,
            this.subCounter,
            j,
            i
          );
          this.subCounter++;
        }
        if (symbol === 4.3) {
          this.mapLevel(
            4.3,
            MathContent,
            this.mulLevelsArray,
            this.mulCounter,
            j,
            i
          );
          this.mulCounter++;
        }
        if (symbol === 4.4) {
          this.mapLevel(
            4.4,
            MathContent,
            this.divLevelsArray,
            this.divCounter,
            j,
            i
          );
          this.divCounter++;
        }
      });
    });
  }
  mapLevel(mode, contentArr, levelArr, counter, j, i) {
    const storedLevel = this.levelData["mode"][mode][counter];
    let initNextLevel;
    if (this.levelData["mode"][mode][counter - 1]) {
      initNextLevel = counter;
    }
    let locked = !(storedLevel || initNextLevel <= counter || counter === 0);
    levelArr[counter] = new Level({
      mode: mode,
      position: {
        x: j * Level.width + 800,
        y: i * Level.height + -500,
      },
      number: counter,
      locked: locked,
      content: contentArr[counter],
    });
  }
  draw(ctx) {
    this.background.draw(ctx);
    this.levelsArray.forEach((level) => {
      level.draw(ctx);
    });
    this.player.draw(ctx);
    this.foreground.draw(ctx);
    this.boundaries.forEach((boundary) => {
      boundary.draw(ctx);
    });
    this.landTiles.forEach((landtile) => {
      landtile.draw(ctx);
    });
  }
}
