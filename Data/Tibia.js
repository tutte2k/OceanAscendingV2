const TibiaSpells = `adana mort,exana pox,exori,exana ina,exeta res,adevo ina,exevo con,exevo con mort,adeta sio,utevo res ina ",adito tera,adito grav,exeta vis,exevo vis lux,adevo grav vis,exori vis,adevo mas grav vis,exevo mort hur,adevo mas vis,adevo res pox,adevo mas hur,exevo con flam,exiva ",adevo grav flam,adevo mas grav flam,exevo flam hur,adori flam,adevo mas flam,exori flam,exevo pan,exori mort,exevo gran vis lux,adori gran flam,utevo gran lux,utani hur,exura sio ",adori gran,exura gran,adura gran,exura gran,adura gran,utana vid,exani hur "up,exani hur "down,utevo lux,exura,adori,exani tera,utamo vita,adevo grav tera,exura gran mas res,adana ani,adevo grav pox,exevo gran mas pox,adevo mas grav pox,adevo mas pox,exevo con pox,exevo con vis,adevo res flam,utani gran hur,adori vita vis,exevo gran mas vis,exura vita,adura vita,utevo vis lux,exana mas mort,exevo grav vita,aleta sio,aleta grav`;

const TibiaPlaces = `darashia,fibula,edron,thais,venore,femor hills,jakundaf desert,mintwallin,ulderek rock,mount sternum,ankrahmun,port hope,kazordoon,drefia,lighthouse,maze of lost souls,shadowthorn,plains of havoc,draconia,carlin,northport,senja,vega,folda,demona,green claw swamp,dwarf bridge,fields of glory`;

const TibiaMonsters = `rat,snake,rabbit,bug,wolf,elf,hero,dragon,beholder,rotworm,demon,warlock,orshabaal,ferumbras,goblin,poison spider,troll,orc,orc spearman,vampire,valkyrie,amazon,dwarf soldier,orc berserker,spider,giant spider,dragon lord,dragon,demon skeleton,skeleton,mummy,minotaur,minotaur guard,minotaur archer,orc shaman,elf scout,elf arcanist,war wolf,larva,scarab,ashmunrah,omruc,dipthrah,green djinn,blue djinn,butterfly,hydra,dworc venomsniper,dworc voodoomaster,carniphilla,crocodile,elephant,lizard sentinel,lizard snakecharmer`;

const monsters = [
  "Behemoth",
  "Demon",
  "Dragon",
  "Dwarf Guard",
  "Elemental",
  "Elf",
  "Gargoyle",
  "Giant Spider",
  "Goblin",
  "Hero",
  "Hydra",
  "Lich",
  "Minotaur",
  "Orc",
  "Rat",
  "Skeleton",
  "Troll",
  "Witch",
  "Wolf",
  "Gorgo",
  "Hyaena",
  "Juggernaut",
  "Medusa",
  "Quara Constrictor",
  "Quara Hydromancer",
  "Quara Mantassin",
  "Quara Pincher",
  "Quara Predator",
  "Quara Scout",
  "Quara Constrictor Scout",
  "Thornback Tortoise",
  "Tiger",
  "Vampire",
  "Wyvern",
];
const food = [
  "Almond",
  "Apple",
  "Banana",
  "Bread",
  "Carrot",
  "Cheese",
  "Cherry",
  "Coconut",
  "Fish",
  "Grapes",
  "Honeycomb",
  "Leaf",
  "Melon",
  "Mushroom",
  "Peach",
  "Pear",
  "Plum",
  "Potato",
  "Pumpkin",
  "Strawberry",
  "Tomato",
  "Zucchini",
];

const swords = [
  "Short Sword",
  "Sword",
  "Long Sword",
  "Broad Sword",
  "Scimitar",
  "Sabre",
  "Katana",
  "Great Sword",
  "Knight Sword",
  "Mage Sword",
  "Rapier",
  "Viking Sword",
  "Wyrm Sword",
  "Dreaded Cleaver",
  "Magic Sword",
  "Mystic Blade",
  "Twin Edge",
  "Demonrage Sword",
  "Krimhorn Sword",
  "Rapier",
  "Frostbite",
  "Fiery Spike Sword",
];

const axes = [
  "Axe",
  "Double Axe",
  "Battle Axe",
  "Hand Axe",
  "Throwing Axe",
  "Assassin Dagger",
  "Tomahawk",
  "Skull Axe",
  "Obsidian Lance",
  "Dracoyle Mace",
  "Noxious Scythe",
  "Dwarven Axe",
  "Executioner Axe",
  "Great Axe",
  "Headchopper",
  "Halberd",
  "Iron Hammer",
  "Vile Axe",
  "Wedding Axe",
  "Berserker",
  "Demonwing Axe",
  "Dragon Slayer",
  "Might Axe",
  "Mourning Star",
  "The Justice Seeker",
  "The Avenger",
  "Obsidian Lance",
];

const helmets = [
  "Crusader Helmet",
  "Demon Helmet",
  "Devil Helmet",
  "Dragon Scale Mail",
  "Dwarven Helmet",
  "Elven Amulet",
  "Ferumbras' Hat",
  "Golden Helmet",
  "Guardian Halberd",
  "Hellforged Axe",
  "Knight Armor",
  "Legion Helmet",
  "Mage Hat",
  "Mystic Turban",
  "Necromancer Shield",
  "Orcish Helmet",
  "Paladin Armor",
  "Platinum Amulet",
  "Raptor Helmet",
  "Royal Helmet",
  "Soft Boots",
  "Steel Helmet",
  "Stout Shield",
  "Terracotta Helmet",
  "Viking Helmet",
];
const locations = [
  "Ab'Dendriel",
  "Ankrahmun",
  "Carlin",
  "Darashia",
  "Edron",
  "Farmine",
  "Gray Beach",
  "Kazordoon",
  "Liberty Bay",
  "Mintwallin",
  "Port Hope",
  "Rathleton",
  "Rookgaard",
  "Svargrond",
  "Thais",
  "Venore",
  "Yalahar",
  "Zao",
  "Zzrat",
];

const chatgpt = [
  ...monsters,
  ...food,
  ...swords,
  ...axes,
  ...helmets,
  ...locations,
];

const TibiaNpcs = `al dee,obi,seymour,cipfried,norma,captain bluebear,aruda,king tibianus`;

const TibiaSlang =
  `GFB,SD,UH,HMM,LMM,POH,POI,MOLS,MPA,MLS,E-PLATE,PZ,PK,PL?,BR?,SWE?,PG,AOL`.toLowerCase();

const TibiaShorts = `dls,drags,wls,cycs,fs,gs,rh,mpa,sov,sca`;

const TibiaLanguage = `w8,hi,buy,sell,job,runes,trade,hunting,hunted,lol,omg,omfg,rofl,lmao,lmfao,xaxaxa,jajaja,haha,haha,-.-,leave,botter,botting,carpet,boat,exp,level,mana shield,clear,help,quest`;

const TibiaItems = `rope,shovel,vial,great fireball rune, magic plate armor,leather legs,mace,sword,amulet of loss,amulet of life,golden armor,golden legs,royal helmet`;

const TibiaMisc =
  `fag key,469,Bubble,Xiblitz,Lord Paulistinha,Setzer Gambler,Nova,Antica,Secura,Elysia,Eternia,Harmonia,Test Server,Excalibug,Mordorion,FejkeN,checka din viplist ambellyn loggar in,viplist,protected,main`.toLowerCase();

export const TibiaWords = [
  ...TibiaSpells.split(","),
  ...TibiaPlaces.split(","),
  ...TibiaMonsters.split(","),
  ...TibiaNpcs.split(","),
  ...TibiaSlang.split(","),
  ...TibiaLanguage.split(","),
  ...TibiaItems.split(","),
  ...TibiaMisc.split(","),
  ...TibiaShorts.split(","),
  ...chatgpt,
].sort((a, b) => b.length - a.length);

