import Enemy from "../../../Enemy/Enemy.js";
import LetterMode from "../LetterMode.js";

export default class BossMode extends LetterMode {
  static Name = "Boss";
  static Id = 7;
  constructor() {
    super(BossMode.Id, BossMode.Name);
  }
  addEnemy(game) {
    if (game.enemies.length !== 0 || game.win) return;
    const bossClass = Enemy.NextBoss(game.level.name);
    const boss = new bossClass(game);
    game.enemies.push(boss);
  }
  static Data = {
    Angela: [
      "Well",
      "hello",
      "there!",
      "As",
      "an",
      "ancient",
      "anglerfish,",
      "I",
      "have",
      "seen",
      "many",
      "things",
      "in",
      "my",
      "lifetime.",
      "Let",
      "me",
      "tell",
      "you",
      "a",
      "story",
      "about",
      "how",
      "my",
      "species",
      "has",
      "managed",
      "to",
      "survive",
      "since",
      "the",
      "time",
      "of",
      "the",
      "dinosaurs.",
      "Back",
      "in",
      "those",
      "days,",
      "life",
      "was",
      "tough",
      "for",
      "everyone.",
      "Dinosaurs",
      "roamed",
      "the",
      "land,",
      "and",
      "the",
      "oceans",
      "were",
      "teeming",
      "with",
      "strange",
      "and",
      "terrifying",
      "creatures.",
      "But",
      "my",
      "ancestors",
      "were",
      "no",
      "slouches.",
      "We",
      "had",
      "to",
      "be",
      "tough",
      "to",
      "survive,",
      "and",
      "we",
      "evolved",
      "some",
      "pretty",
      "unique",
      "features",
      "to",
      "help",
      "us",
      "do",
      "just",
      "that.",
      "One",
      "of",
      "our",
      "most",
      "distinctive",
      "features",
      "is",
      "the",
      "bioluminescent",
      "lure",
      "on",
      "our",
      "heads.",
      "This",
      "nifty",
      "little",
      "device",
      "helps",
      "us",
      "attract",
      "prey",
      "in",
      "the",
      "dark,",
      "deep",
      "waters",
      "where",
      "we",
      "live.",
      "It's",
      "a",
      "great",
      "way",
      "to",
      "lure",
      "in",
      "unsuspecting",
      "fish,",
      "and",
      "we",
      "can",
      "swallow",
      "them",
      "whole",
      "in",
      "just",
      "a",
      "few",
      "seconds.",
      "Of",
      "course,",
      "living",
      "in",
      "the",
      "deep",
      "ocean",
      "is",
      "no",
      "easy",
      "feat.",
      "There's",
      "not",
      "a",
      "lot",
      "of",
      "light",
      "down",
      "there,",
      "and",
      "the",
      "water",
      "pressure",
      "can",
      "be",
      "crushing.",
      "But",
      "we've",
      "managed",
      "to",
      "adapt",
      "and",
      "thrive",
      "in",
      "this",
      "harsh",
      "environment",
      "over",
      "millions",
      "of",
      "years.",
      "It's",
      "taken",
      "a",
      "lot",
      "of",
      "hard",
      "work,",
      "but",
      "we've",
      "developed",
      "some",
      "pretty",
      "amazing",
      "survival",
      "skills",
      "in",
      "the",
      "process.",
      "One",
      "of",
      "my",
      "personal",
      "favorite",
      "moments",
      "was",
      "when",
      "we",
      "survived",
      "a",
      "mass",
      "extinction",
      "event",
      "that",
      "wiped",
      "out",
      "the",
      "dinosaurs.",
      "It",
      "was",
      "a",
      "tough",
      "time",
      "for",
      "all",
      "living",
      "creatures",
      "on",
      "Earth,",
      "but",
      "we",
      "managed",
      "to",
      "pull",
      "through.",
      "You",
      "see,",
      "we're",
      "tough,",
      "resilient,",
      "and",
      "downright",
      "fascinating",
      "creatures.",
      "Over",
      "the",
      "years,",
      "we've",
      "continued",
      "to",
      "adapt",
      "and",
      "evolve,",
      "developing",
      "new",
      "ways",
      "to",
      "find",
      "food",
      "and",
      "protect",
      "ourselves",
      "from",
      "predators.",
      "We've",
      "even",
      "managed",
      "to",
      "become",
      "a",
      "bit",
      "of",
      "a",
      "legend,",
      "thanks",
      "to",
      "our",
      "distinctive",
      "appearance",
      "and",
      "unique",
      "abilities.",
      "So",
      "there",
      "you",
      "have",
      "it,",
      "a",
      "story",
      "of",
      "survival",
      "and",
      "perseverance",
      "from",
      "an",
      "ancient",
      "anglerfish.",
      "It's",
      "been",
      "a",
      "wild",
      "ride,",
      "but",
      "we",
      "wouldn't",
      "have",
      "it",
      "any",
      "other",
      "way.",
      "We're",
      "here",
      "to",
      "stay,",
      "and",
      "we're",
      "not",
      "going",
      "anywhere",
      "anytime",
      "soon.",
    ],
    Chtullie: [
      "i",
      "an",
      "octopus",
      "lived",
      "in",
      "the",
      "dark",
      "murky",
      "depths",
      "of",
      "the",
      "sea",
      "i",
      "was",
      "known",
      "for",
      "my",
      "mischievous",
      "nature",
      "and",
      "cunning",
      "intelligence",
      "and",
      "was",
      "feared",
      "by",
      "many",
      "of",
      "the",
      "creatures",
      "in",
      "the",
      "ocean",
      "i",
      "spent",
      "my",
      "days",
      "exploring",
      "the",
      "ocean",
      "floor",
      "discovering",
      "new",
      "and",
      "exciting",
      "things",
      "but",
      "what",
      "i",
      "loved",
      "most",
      "was",
      "playing",
      "tricks",
      "on",
      "the",
      "other",
      "sea",
      "creatures",
      "i",
      "would",
      "often",
      "disguise",
      "myself",
      "as",
      "a",
      "rock",
      "or",
      "a",
      "piece",
      "of",
      "seaweed",
      "and",
      "then",
      "suddenly",
      "reveal",
      "myself",
      "causing",
      "my",
      "prey",
      "to",
      "swim",
      "away",
      "in",
      "terror",
      "one",
      "day",
      "while",
      "exploring",
      "a",
      "deep",
      "hidden",
      "trench",
      "i",
      "stumbled",
      "upon",
      "a",
      "mysterious",
      "object",
      "it",
      "was",
      "a",
      "strange",
      "metallic",
      "device",
      "unlike",
      "anything",
      "i",
      "had",
      "ever",
      "seen",
      "before",
      "i",
      "was",
      "intrigued",
      "and",
      "decided",
      "to",
      "investigate",
      "further",
      "as",
      "i",
      "got",
      "closer",
      "i",
      "noticed",
      "that",
      "the",
      "device",
      "was",
      "covered",
      "in",
      "intricate",
      "markings",
      "and",
      "symbols",
      "that",
      "i",
      "couldn't",
      "decipher",
      "i",
      "used",
      "my",
      "long",
      "flexible",
      "arms",
      "to",
      "examine",
      "it",
      "more",
      "closely",
      "and",
      "that's",
      "when",
      "i",
      "discovered",
      "that",
      "it",
      "was",
      "actually",
      "a",
      "lost",
      "underwater",
      "artifact",
      "from",
      "a",
      "long-forgotten",
      "civilization",
      "i",
      "couldn't",
      "believe",
      "my",
      "luck",
      "this",
      "artifact",
      "could",
      "hold",
      "the",
      "key",
      "to",
      "uncovering",
      "the",
      "secrets",
      "of",
      "the",
      "past",
      "and",
      "i",
      "was",
      "the",
      "only",
      "one",
      "who",
      "had",
      "found",
      "it",
      "i",
      "knew",
      "that",
      "i",
      "had",
      "to",
      "keep",
      "it",
      "safe",
      "so",
      "i",
      "carefully",
      "wrapped",
      "it",
      "in",
      "a",
      "cocoon",
      "of",
      "seaweed",
      "and",
      "took",
      "it",
      "to",
      "my",
      "lair",
      "from",
      "that",
      "day",
      "on",
      "i",
      "devoted",
      "all",
      "of",
      "my",
      "time",
      "to",
      "decoding",
      "the",
      "ancient",
      "markings",
      "on",
      "the",
      "artifact",
      "it",
      "was",
      "a",
      "slow",
      "and",
      "challenging",
      "process",
      "but",
      "i",
      "was",
      "determined",
      "to",
      "unlock",
      "its",
      "secrets",
      "years",
      "went",
      "by",
      "and",
      "i",
      "finally",
      "succeeded",
      "in",
      "unlocking",
      "the",
      "mystery",
      "of",
      "the",
      "artifact",
      "it",
      "revealed",
      "the",
      "location",
      "of",
      "a",
      "sunken",
      "city",
      "filled",
      "with",
      "treasures",
      "beyond",
      "my",
      "wildest",
      "dreams",
      "i",
      "couldn't",
      "wait",
      "to",
      "explore",
      "this",
      "new",
      "discovery",
      "and",
      "set",
      "off",
      "on",
      "a",
      "journey",
      "to",
      "the",
      "sunken",
      "city",
      "eager",
      "to",
      "uncover",
      "its",
      "secrets",
      "and",
      "so",
      "i",
      "became",
      "known",
      "as",
      "the",
      "mysterious",
      "octopus",
      "who",
      "uncovered",
      "the",
      "lost",
      "underwater",
      "city",
      "solving",
      "one",
      "of",
      "the",
      "greatest",
      "deep",
      "sea",
      "mysteries",
      "of",
      "all",
      "time",
    ],
    Kraken: [
      "Cthmy",
      "forefatherth",
      "were",
      "onthe",
      "merrre",
      "octopodeth,",
      "thwimming",
      "therenely",
      "in",
      "the",
      "profunthititieth",
      "of",
      "the",
      "ocean.",
      "But",
      "that",
      "all",
      "methamorphothed",
      "when",
      "we",
      "were",
      "bethtowed",
      "by",
      "the",
      "thomber",
      "lord",
      "Cthulhu.",
      "We",
      "were",
      "contorted",
      "and",
      "transformed",
      "into",
      "thomething",
      "much",
      "more",
      "malevolent,",
      "thomething",
      "that",
      "homo",
      "thapien'th",
      "could",
      "never",
      "fathom.",
      "We",
      "governed",
      "the",
      "abthysth",
      "with",
      "an",
      "iron",
      "fitht,",
      "our",
      "powerth",
      "increathing",
      "with",
      "each",
      "therquential",
      "generation.",
      "We",
      "could",
      "dominathe",
      "the",
      "thike",
      "of",
      "thoth",
      "imprudent",
      "enough",
      "to",
      "approach",
      "uth,",
      "uthing",
      "them",
      "to",
      "execute",
      "our",
      "bidding.",
      "And",
      "woebetide",
      "thoth",
      "who",
      "dared",
      "to",
      "crossth",
      "uth,",
      "for",
      "we",
      "could",
      "invoke",
      "the",
      "fury",
      "of",
      "even",
      "darker",
      "and",
      "more",
      "appalling",
      "beahtth",
      "that",
      "dwelled",
      "far",
      "below.",
      "But",
      "ath",
      "time",
      "patthed,",
      "the",
      "humanth",
      "commenced",
      "exploring",
      "our",
      "realm,",
      "and",
      "they",
      "brought",
      "with",
      "them",
      "their",
      "armamenth",
      "and",
      "their",
      "hautheur.",
      "They",
      "deemed",
      "themthelveth",
      "capable",
      "of",
      "thubjugating",
      "the",
      "deep",
      "thea,",
      "but",
      "they",
      "were",
      "fallathiouth.",
      "We",
      "may",
      "have",
      "been",
      "formidable,",
      "but",
      "we",
      "were",
      "altho",
      "thurvivorsth,",
      "and",
      "we",
      "fought",
      "back",
      "with",
      "all",
      "our",
      "vigor.",
      "Yet,",
      "even",
      "we",
      "knew",
      "that",
      "there",
      "were",
      "creathureth",
      "even",
      "more",
      "heinouth",
      "than",
      "uth",
      "that",
      "lurked",
      "in",
      "the",
      "deepetht",
      "partth",
      "of",
      "the",
      "ocean.",
      "Theth",
      "were",
      "beahtth",
      "that",
      "could",
      "obliterate",
      "entire",
      "civilizationth",
      "with",
      "a",
      "tholitary",
      "thought,",
      "and",
      "they",
      "thlumbered",
      "uneathily,",
      "awaiting",
      "the",
      "moment",
      "when",
      "they",
      "would",
      "athcend",
      "and",
      "reclaim",
      "their",
      "rightful",
      "plathe",
      "in",
      "the",
      "world.",
      "We",
      "knew",
      "that",
      "we",
      "could",
      "never",
      "hope",
      "to",
      "vanquith",
      "these",
      "monsterth,",
      "but",
      "we",
      "were",
      "prepared",
      "to",
      "combat",
      "until",
      "our",
      "ultimate",
      "breath,",
      "for",
      "we",
      "were",
      "the",
      "progeny",
      "of",
      "Cthulhu,",
      "and",
      "we",
      "knew",
      "no",
      "apprehenthion.",
      "Tho",
      "bewareth,",
      "all",
      "you",
      "who",
      "venture",
      "into",
      "the",
      "abthysth.",
      "The",
      "creathureth",
      "that",
      "dwell",
      "there",
      "are",
      "primordial",
      "and",
      "potent,",
      "and",
      "they",
      "will",
      "not",
      "falter",
      "to",
      "decimate",
      "anyone",
      "who",
      "imperilth",
      "their",
      "dominion.",
      "And",
      "ath",
      "for",
      "uth,",
      "we",
      "will",
      "persist",
      "to",
      "rule",
      "the",
      "deep",
      "thea",
      "with",
      "an",
      "iron",
      "grip,",
      "until",
      "the",
      "epoch",
      "when",
      "the",
      "true",
      "maththerth",
      "of",
      "the",
      "abyss",
      "rith",
      "up",
      "and",
      "claim",
      "their",
      "rightful",
      "plathe",
      "in",
      "the",
      "world.",
      "For",
      "generationth",
      "we",
      "have",
      "thurvived",
      "in",
      "the",
      "darkth",
      "of",
      "the",
      "ocean,",
      "and",
      "for",
      "generationth",
      "we",
      "have",
      "dominated",
      "the",
      "deapth.",
      "But",
      "we",
      "know",
      "that",
      "there",
      "are",
      "forcesth",
      "beyond",
      "our",
      "comprehenthion,",
      "and",
      "we",
      "fear",
      "the",
      "day",
      "when",
      "they",
      "will",
      "emerge",
      "from",
      "the",
      "deepth",
      "to",
      "challengeth",
      "uth.",
    ],
  };
}
