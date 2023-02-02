import {
  TibiaMode,
  EnglishMode,
  ExpertMode,
  SwedishMode,
  MultiplyMode,
  SubtractMode,
  AddMode,
  DivideMode,
  BeyondMode,
} from "../Game/Mode/Modes.js";
import Boundary from "./Environment/Boundary.js";
import LandTile from "./Environment/LandTile.js";
import Level from "./Environment/Level.js";
import MapHandler from "./MapHandler.js";
import MapPlayer from "./Player/MapPlayer.js";
import StaticImage from "../Utils/StaticImage.js";
import { Matrix } from "./Environment/Matrix.js";
import MapInterface from "./MapInterface.js";

export default class Map {
  constructor(dataSource) {
    this.dataSource = dataSource;
    this.levelData = dataSource.getStore()["completedLevels"];
    this.offset = {
      x: -1140,
      y: -1725,
    };
    this.background = new StaticImage({
      position: { x: this.offset.x, y: this.offset.y },
      image: document.getElementById("map"),
    });

    this.foreground = new StaticImage({
      position: { x: this.offset.x, y: this.offset.y },
      image: document.getElementById("foreground"),
    });

    this.player = new MapPlayer(dataSource);
    this.userInterface = new MapInterface(dataSource);

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
    } else {
      this.mathLevelsArray[0].locked = true;
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
    this.inputHandler = new MapHandler(this);
  }
  init() {
    function splitLevelData(contentArr, levelSize, numberOfLevels = 1000) {
      const levelContents = [];
      for (let i = 0; i < numberOfLevels; i++) {
        const levelContent = contentArr.slice(-levelSize);
        contentArr.splice(-levelSize);
        if (levelContent.length !== levelSize) {
          break;
        }
        levelContents.push(levelContent);
      }
      return levelContents;
    }

    const tibiaContent = splitLevelData(TibiaMode.Data, 50);
    const wordsContent = splitLevelData(EnglishMode.Data, 80);
    const specialContent = splitLevelData(ExpertMode.Data, 50);
    const svenskaContent = splitLevelData(SwedishMode.Data, 275);
    const MathContent = Array.from(Array(448), () => new Array(25).fill(1));
    Matrix.forEach((row, i) => {
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
          this.constructLevel(
            new EnglishMode(),
            wordsContent,
            this.wordsLevelsArray,
            this.wordsCounter,
            j,
            i
          );
          this.wordsCounter++;
        }
        if (symbol === 6) {
          this.constructLevel(
            new TibiaMode(),
            tibiaContent,
            this.tibiaLevelsArray,
            this.tibiaCounter,
            j,
            i
          );
          this.tibiaCounter++;
        }
        if (symbol === 2) {
          this.constructLevel(
            new ExpertMode(),
            specialContent,
            this.specialLevelsArray,
            this.specialCounter,
            j,
            i
          );
          this.specialCounter++;
        }
        if (symbol === 3) {
          this.constructLevel(
            new SwedishMode(),
            svenskaContent,
            this.svenskaLevelsArray,
            this.svenskaCounter,
            j,
            i
          );
          this.svenskaCounter++;
        }
        if (symbol === 4) {
          this.constructLevel(
            new BeyondMode(),
            MathContent,
            this.mathLevelsArray,
            this.mathCounter,
            j,
            i
          );
          this.mathCounter++;
        }

        if (symbol === 4.1) {
          this.constructLevel(
            new AddMode(),
            MathContent,
            this.addLevelsArray,
            this.addCounter,
            j,
            i
          );
          this.addCounter++;
        }
        if (symbol === 4.2) {
          this.constructLevel(
            new SubtractMode(),
            MathContent,
            this.subLevelsArray,
            this.subCounter,
            j,
            i
          );
          this.subCounter++;
        }
        if (symbol === 4.3) {
          this.constructLevel(
            new MultiplyMode(),
            MathContent,
            this.mulLevelsArray,
            this.mulCounter,
            j,
            i
          );
          this.mulCounter++;
        }
        if (symbol === 4.4) {
          this.constructLevel(
            new DivideMode(),
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
  constructLevel(mode, contentArr, levelArr, counter, j, i) {
    const storedLevel = this.levelData["mode"][mode.id][counter];
    let initNextLevel;
    if (this.levelData["mode"][mode.id][counter - 1]) {
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
      locked: window.location.origin.includes("localhost") ? false : locked,
      content: contentArr[counter],
    });
  }
  update() {}

  draw(ctx, deltaTime) {
    this.background.draw(ctx);

    this.levelsArray.forEach((level) => {
      level.draw(ctx);
    });

    this.player.draw(ctx, deltaTime);

    this.foreground.draw(ctx);

    this.boundaries.forEach((boundary) => {
      boundary.draw(ctx);
    });

    this.landTiles.forEach((landtile) => {
      landtile.draw(ctx);
    });
  }
}
