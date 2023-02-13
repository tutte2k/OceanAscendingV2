import DataSource from "./Storage/DataSource.js";
import Global from "./Utils/Global.js";
import Map from "./Map/Map.js";

const ctx = Global.Canvas.getContext("2d");
Global.Canvas.width = 2500;
Global.Canvas.height = 1768;

const dataSource = new DataSource();
const map = new Map(dataSource);

/*
TODO:

refactor Global class
refactor Game class
  Boss mode?
  this.boss = Boss object not bool

Boss
  add shake
  scoring?
  progress / health bar
    Octopus movement

Shop
  add impact
  add harpoon

Features
  add consumable items
  add boss loot
  add harpoon
    goes through enemies
    x++
  A STAR ALGORITHM for map walking



*/


/*

const trivia= `




Appendix

The Kings And Their Courts





THE KING ON THE IRON THRONE


JOFFREY BARATHEON, the First of His Name, a boy of thirteen years, the eldest son of King Robert I Baratheon and Queen Cersei of House Lannister, — his mother, QUEEN CERSEI, of House Lannister, Queen Regent and Protector of the Realm, — Cersei’s sworn swords: — SER OSFRYD KETTLEBLACK, younger brother to Ser Osmund Kettleblack of the Kingsguard,

— SER OSNEY KETTLEBLACK, youngest brother of Ser Osmund and Ser Osfryd,



— his sister, PRINCESS MYRCELLA, a girl of nine, a ward of Prince Doran Martell at Sunspear,

— his brother, PRINCE TOMMEN, a boy of eight, next heir to the Iron Throne,

— his grandfather, TYWIN LANNISTER, Lord of Casterly Rock, Warden of the West, and Hand of the King,

— his uncles and cousins, paternal, — his father’s brother, STANNIS BARATHEON, rebel Lord of Dragonstone, styling himself King Stannis the First, — Stannis’s daughter, SHIREEN, a girl of eleven,

— his father’s brother, (RENLY BARATHEON), rebel Lord of Storm’s End, murdered in the midst of his army,

— his grandmother’s brother, SER ELDON ESTERMONT, — Ser Eldon’s son, SER AEMON ESTERMONT, — Ser Aemon’s son, SER ALYN ESTERMONT,





— his uncles and cousins, maternal, —his mother’s brother, SER JAIME LANNISTER, called THE KINGSLAYER, a captive at Riverrun,

—his mother’s brother, TYRION LANNISTER, called THE IMP, a dwarf, wounded in the Battle of the Blackwater, — Tyrion’s squire, PODRICK PAYNE,

— Tyrion’s captain of guards, SER BRONN OF THE BLACKWATER, a former sellsword,

— Tyrion’s concubine, SHAE, a camp follower now serving as bedmaid to Lollys Stokeworth,

— his grandfather’s brother, SER KEVAN LANNISTER, — Ser Kevan’s son, SER LANCEL LANNISTER, formerly squire to King Robert, wounded in the Battle of the Blackwater, near death,

—his grandfather’s brother, {TYGETT LANNISTER), died of a pox, — Tygett’s son, TYREK LANNISTER, a squire, missing since the great riot, — Tyrek’s infant wife, LADY ERMESANDE HAYFORD,





—his baseborn siblings, King Robert’s bastards: —MYA STONE, a maid of nineteen, in the service of Lord Nestor Royce, of the Gates of the Moon,

—GENDRY, an apprentice smith, a fugitive in the riverlands; and ignorant of his heritage,

—EDRIC STORM, King Robert’s only acknowledged bastard son, a ward of his uncle Stannis on Dragonstone,





—his Kingsguard: —SER JAIME LANNISTER, Lord Commander,

—SER MERYN TRANT,

—SER BALON SWANN,

—SER OSMUND KETTLEBLACK,

—SER LORAS TYRELL, the Knight of Flowers,

—SER ARYS OAKHEART,



—his small council:

—LORD TYWIN LANNISTER, Hand of the King,

—SER KEVAN LANNISTER, master of laws,

—LORD PETYR BAELISH, called LITTLEFINGER, master of coin,

—VARYS, a eunuch, called THE SPIDER, master of whisperers,

—LORD MACE TYRELL, master of ships,

—GRAND MAESTER PYCELLE,





—his court and retainers: —SER ILYN PAYNE, the King’s Justice, a headsman,

—LORD HALLYNE THE PYROMANCER, a Wisdom of the Guild of Alchemists,

—MOON BOY, a jester and fool,

—ORMOND OF OLDTOWN, the royal harper and bard,

—DONTOS HOLLARD, a fool and a drunkard, formerly a knight called SER DONTOS THE RED,

—JALABHAR XHO, Prince of the Red Flower Vale, an exile from the Summer Isles,

—LADY TANDA STOKEWORTH, — her daughter, FALYSE, wed to Ser Balman Byrch,

— her daughter, LOLLYS, thirty-four, unwed, and soft of wits, with child after being raped,

— her healer and counselor, MAESTER FRENKEN,

—LORD GYLES ROSBY, a sickly old man,

—SER TALLAD, a promising young knight,

—LORD MORROS SLYNT, a squire, eldest son of the former Commander of the City Watch, — JOTHOS SLYNT, his younger brother, a squire,

— DANOS SLYNT, younger still, a page,

—SER BOROS BLOUNT, a former knight of the Kingsguard, dismissed for cowardice by Queen Cersei,

—OSMYN PECKLEDON, a squire, and a hero of the Battle of the Blackwater,

—SER PHILIP FOOTE, made Lord of the Marches for his valor during the Battle of the Blackwater,

—SER LOTHOR BRUNE, named LOTHOR APPLE-EATER for his deeds during the Battle of the Blackwater, a former freerider in service to Lord Baelish,

—other lords and knights at King’s Landing: —MATHIS ROWAN, Lord of Goldengrove,

—PAXTER REDWYNE, Lord of the Arbor, — Lord Paxter’s twin sons, SER HORAS and SER HOBBER, mocked as HORROR and SLOBBER,

— Lord Redwyne’s healer, MAESTER BALLABAR,

—ARDRIAN CELTIGAR, the Lord of Claw Isle,

—LORD ALESANDER STAEDMON, called PENNYLOVER,

—SER BONIFER HASTY, called THE GOOD, a famed knight,

—SER DONNEL SWANN, heir to Stonehelm,

—SER RONNET CONNINGTON, called RED RONNET, the Knight of Griffin’s Roost,

—AURANE WATERS, the Bastard of Driftmark,

—SER DERMOT OF THE RAINWOOD, a famed knight,

—SER TIMON SCRAPESWORD, a famed knight,





—the people of King’s Landing: — the City Watch (the “gold cloaks”), —{SER JACELYN BYWATER, called IRONHAND}, Commander of the City Watch, slain by his own men during the Battle of the Blackwater,

— SER ADDAM MARBRAND, Commander of the City Watch, Ser Jacelyn’s successor,



— CHATAYA, owner of an expensive brothel, — ALAYAYA, her daughter,

— DANCY, MAREI, JAYDE, Chataya’s girls,

— TOBHO MOTT, a master armorer,

— IRONBELLY, a blacksmith,

— HAMISH THE HARPER, a famed singer,

— COLLIO QUAYNIS, a Tyroshi singer,

— BETHANY FAIR-FINGERS, a woman singer,

— ALARIC OF EYSEN, a singer, far-traveled,

— GALYEON OF CUY, a singer notorious for the length of his songs,

— SYMON SILVER TONGUE, a singer.





King Joffrey’s banner shows the crowned stag of Baratheon, black on gold, and the lion of Lannister, gold on crimson, combatant.





THE KING IN THE NORTH

THE KING OF THE TRIDENT


ROBB STARK, Lord of Winterfell, King in the North, and King of the Trident, the eldest son of Eddark Stark, Lord of Winterfell, and Lady Catelyn. Of House Tully, —his direwolf, GREY WIND,

—his mother, LADY CATELYN, of House Tully, widow of Lord Eddard Stark,

—his siblings: —his sister, PRINCESS SANSA, a maid of twelve, a captive in King’s Landing, —Sansa’s direwolf, (LADY), killed at Castle Darry,

—his sister, PRINCESS ARYA, a girl of ten, missing and presumed dead, —Arya’s direwolf, NYMERIA, lost near the Trident,

—his brother, PRINCE BRANDON, called BRAN, heir to the north, a boy of nine, believed dead, —Bran’s direwolf, SUMMER,

—Bran’s companions and protectors: —MEERA REED, a maid of sixteen, daughter of Lord Howland Reed of Greywater Watch,

—JOJEN REED, her brother, thirteen,

—HODOR, a simpleminded stableboy, seven feet tall,



—his brother, PRINCE RICKON, a boy of four, believed dead, —Rickon’s direwolf, SHAGGYDOG,

—Rickon’s companion and protector: —OSHA, a wildling captive who served as a scullion at Winterfell,



—his half-brother, JON SNOW, a Sworn Brother of the Night’s Watch, —Jon’s direwolf, GHOST,





—his uncles and aunts, paternal: —his father’s elder brother, {BRANDON STARK}, slain at the command of King Aerys II Targaryen,

—his father’s sister, {LYANNA STARK}, died in the Mountains of Dome during Robert’s Rebellion,

—his father’s younger brother, BENJEN STARK, a man of the Night’s Watch, lost beyond the Wall,

—his uncles, aunts, and cousins, maternal: —his mother’s younger sister, LYSA ARRYN, Lady of the Eyrie and widow of Lord Jon Arryn, —their son, ROBERT ARRYN, Lord of the Eyrie,

—his mother’s younger brother, SER EDMURE TULLY, heir to Riverrun,

—his grandfather’s brother, SER BRYNDEN TULLY, called THE BLACKFISH,

—his sworn swords and companions: —his squire, OLYVAR FREY,

—SER WENDEL MANDERLY, second son to the Lord of White Harbor,

—PATREK MALLISTER, heir to Seagard,

—DACEY MORMONT, eldest daughter of Lady Maege Mormont and heir to Bear Island,

—JON UMBER, called THE SMALLJON, heir to Last Hearth,

—DONNEL LOCKE, OWEN NORREY, ROBIN FLINT, northmen,





—his lords bannermen, captains and commanders:

—(with Robb’s army in the Westerlands) —SER BRYNDEN TULLY, the BLACKFISH, commanding the scouts and outriders,

—JON UMBER, called THE GREATJON, commanding the van,

—RICKARD KARSTARK, Lord of Karhold,

—GALBART GLOVER, Master of Deepwood Motte,

—MAEGE MORMONT, Lady of Bear Island,

—{SER STEVRON FREY}, eldest son of Lord Walder Frey and heir to the Twins, died at Oxcross, —Ser Stevron’s eldest son, SER RYMAN FREY, —Ser Ryman’s son, BLACK WALDER FREY,



—MARTYN RIVERS, a bastard son of Lord Walder Frey,





—(with Roose Bolton’s host at Harrenhal), —ROOSE BOLTON, Lord of the Dreadfort,

—SER AENYS FREY, SER JARED FREY, SER HOSTEEN FREY, SER DANWELL FREY —their bastard half-brother, RONEL RIVERS,

—SER WYLIS MANDERLY, heir to White Harbor, —SER KYLE CONDON, a knight in his service,

—RONNEL STOUT,

—VARGO HOAT of the Free City of Qohor, captain of a sellsword company, the Brave Companions, —his lieutenant, URSWYCK called THE FAITHFUL,

—his lieutenant, SEPTON UTT,

—TIMEON OF DORNE, RORGE, IGGO, FAT ZOLLO, BITER, TOGG JOTH of Ibben, PYG, THREE TOES, his men,

—QYBURN, a chainless maester and sometime necromancer, his healer,





—(with the northern army attacking Duskendale) —ROBETT GLOVER, of Deepwood Motte,

—SER HEIMAN TALLHART, of Torrhen’s Square,

—HARRION KARSTARK, sole surviving son of Lord Rickard Karstark, and heir to Karhold,





—(traveling north with Lord Eddard’s bones) —HALLIS MOLLEN, captain of guards for Winterfell, —JACKS, QUENT, SHADD, guardsmen,





—his lord bannermen and castellans, in the north: —WYMAN MANDERLY, Lord of White Harbor,

—HOWLAND REED, Lord of Greywater Watch, a crannogman,

—MORS UMBER, called CROWFOOD, and HOTHER UMBER, called WHORESBANE, uncles to Greatjon Umber, joint castellans at the Last Hearth,

—LYESSA FLINT, Lady of Widow’s Watch,

—ONDREW LOCKE, Lord of Oldcastle, an old man,

—{CLEY CERWYN}, Lord of Cerwyn, a boy of fourteen, killed in battle at Winterfell, —his sister, JONELLE CERWYN, a maid of two-and-thirty, now the Lady of Cerwyn,

—{LEOBALD TALLHART}, younger brother to Ser Helman, castellan at Torrhen’s Square, killed in battle at Winterfell, —Leobald’s wife, BERENA of House Hornwood,

—Leobald’s son, BRANDON, a boy of fourteen,

—Leobald’s son, BEREN, a boy of ten,

—Ser Helman’s son, {BENFRED), killed by ironmen on the Stony Shore,

—Ser Helman’s daughter, EDDARA, a girl of nine, heir to Torrhen’s Square,

—LADY SYBELLE, wife to Robett Glover, a captive of Asha Greyjoy at Deepwood Motte, —Robett’s son, GAWEN, three, rightful heir to Deepwood Motte, a captive of Asha Greyjoy,

—Robett’s daughter, ERENA, a babe of one, a captive of Asha Greyjoy at Deepwood Motte,

—LARENCE SNOW, a bastard son of Lord Hornwood, and ward of Galbart Glover, thirteen, a captive of Asha Greyjoy at Deepwood Motte.





The banner of the King in the North remains as it has for thousands of years: the grey direwolf of the Starks of Winterfell, running across an ice-white field.





THE KING IN THE NARROW SEA


STANNIS BARATHEON, the First of His Name, second son of Lord Steffon Baratheon and Lady Cassana of House Estermont, formerly Lord of Dragonstone, —his wife, QUEEN SELYSE of House Florent, —PRINCESS SHIREEN, their daughter, a girl of eleven, —PATCHFACE, her lackwit fool,



—his baseborn nephew, EDRIC STORM, a boy of twelve, bastard son of King Robert by Delena Florent,

—his squires, DEVAN SEAWORTH and BRYEN FARRING,

—his court and retainers: —LORD ALESTER FLORENT, Lord of Brightwater Keep and Hand of the King, the queen’s uncle,

—SER AXELL FLORENT, castellan of Dragonstone and leader of the queen’s men, the queen’s uncle,

—LADY MELISANDRE OF ASSHAI, called THE RED WOMAN, priestess of R’hllor, the Lord of Light and God of Flame and Shadow,

—MAESTER PYLOS, healer, tutor, counselor,

—SER DAVOS SEAWORTH, called THE ONION KNIGHT and sometimes SHORTHAND, once a smuggler, —Davos’s wife, LADY MARYA, a carpenter’s daughter, —their seven sons: —{DALE}, lost on the Blackwater,

—{ALLARD}, lost on the Blackwater,

—{MATTHOS}, lost on the Blackwater,

—{MARIC}, lost on the Blackwater,

—DEVAN, squire to King Stannis,

—STANNIS, a boy of nine years,

—STEFFON, a boy of six years,





—SALLADHOR SAAN, of the Free City of Lys, styling himself Prince of the Narrow Sea and Lord of Blackwater Bay, master of the Valyrian and a fleet of sister galleys, —MEIZO MAHR, a eunuch in his hire,

—KHORANE SATHMANTES, captain of his galley Shayala’s Dance,

—“PORRIDGE” and “LAMPREY,” two gaolers,





—his lords bannermen, —MONTERYS VELARYON, Lord of the Tides and Master of Driftmark, a boy of six,

—DURAM BAR EMMON, Lord of Sharp Point, a boy of fifteen years,

—SER GILBERT FARRING, castellan of Storm’s End,

—LORD ELWOOD MEADOWS, Ser Gilbert’s second,

—MAESTER JURNE, Ser Gilbert’s counselor and healer,

—LORD LUCOS CHYTTERING, called LITTLE LUCOS, a youth of sixteen,

—LESTER MORRIGEN, Lord of Crows Nest,





—his knights and sworn swords, —SER LOMAS ESTERMONT, the king’s maternal uncle,

—his son, SER ANDREW ESTERMONT,

—SER ROLLAND STORM, called THE BASTARD OF NIGHTSONG, a baseborn son of the late Lord Bryen Caron,

—SER PARMEN CRANE, called PARMEN THE PURPLE, held captive at Highgarden,

—SER ERREN FLORENT, younger brother to Queen Selyse, held captive at Highgarden,

—SER GERALD GOWER,

—SER TRISTON OF TALLY HILL, formerly in service to Lord Guncer Sunglass,

—LEVVYS, called THE FISHWIFE,

—OMER BLACKBERRY.





King Stannis has taken for his banner the fiery heart of the Lord of Light: a red heart surrounded by orange flames upon a yellow field. Within the heart is the crowned stag of House Baratheon, in black.





THE QUEEN ACROSS THE WATER


DAENERYS TARGARYEN, the First of Her Name, Khaleesi of the Dothraki, called DAENERYS STORMBORN, the UNBURNT, MOTHER OF DRAGONS, sole surviving heir of Aerys II Targaryen, widow of Khal Drogo of the Dothraki, —her growing dragons, DROGON, VISERION, RHAEGAL,

—her Queensguard: —SER JORAH MORMONT, formerly Lord of Bear Island, exiled for slaving,

—JHOGO, ko and bloodrider, the whip,

—AGGO, ko and bloodrider, the bow,

—RAKHARO, ko and bloodrider, the arakh,

—STRONG BELWAS, a former eunuch slave from the fighting pits of Meereen, —his aged squire, ARSTAN called WHITEBEARD, a man of Westeros,



—her handmaids: —IRRI, a Dothraki girl, fifteen,

—JHIQUI, a Dothraki girl, fourteen,

—GROLEO, captain of the great cog Balerion, a Pentoshi seafarer in the hire of Illyrio Mopatis,



—her late kin: —{RHAEGAR}, her brother, Prince of Dragonstone and heir to the Iron Throne, slain by Robert Baratheon on the Trident, —{RHAENYS}, Rhaegar’s daughter by Elia of Dome, murdered during the Sack of King’s Landing,

—{AEGON}, Rhaegar’s son by Elia of Dome, murdered during the Sack of King’s Landing,

—{VISERYS}, her brother, styling himself King Viserys, the Third of His Name, called THE BEGGAR KING, slain in Vaes Dothrak by Khal Drogo,

—{DROGO}, her husband, a great khal of the Dothraki, never defeated in battle, died of a wound, —(RHAEGO), her stillborn son by Khal Drogo, slain in the womb by Mirri Maz Duur,





—her known enemies: —KHAL PONO, once ko to Drogo,

—KHAL JHAQO, once ko to Drogo, —MAGGO, his bloodrider,

—THE UNDYING OF QARTH, a band of warlocks, —PYAT PREE, a Qartheen warlock,

—THE SORROWFUL MEN, a guild of Qartheen assassins,





—her uncertain allies, past and present: —XARO XHOAN DAXOS, a merchant prince of Qarth,

—QUAITHE, a masked shadowbinder from Asshai,

—LLYRIO MOPATIS, a magister of the Free City of Pentos, who brokered her marriage to Khal Drogo,





—in Astapor: —KRAZNYS MO NAKLOZ, a wealthy slave trader, —his slave, MISSANDEI, a girl of ten, of the Peaceful People of Naath,

—GRAZDAN MO ULLHOR, an old slave trader, very rich, —his slave, CLEON, a butcher and cook,

—GREY WORM, an eunuch of the Unsullied,





—in Yunkai: —GRAZDAN MO ERAZ, envoy and nobleman,

—MERO OF BRAAVOS, called THE TITAN’S BASTARD, captain of the Second Sons, a free company, —BROWN BEN PLUMM, a sergeant in the Second Sons, a sellsword of dubious descent,

—PRENDAHL NA GHEZN, a Ghiscari sellsword, captain of the Stormcrows, a free company,

—SALLOR THE BALD, a Qartheen sellsword, captain of the Stormcrows,

—DAARIO NAHARIS, a flamboyant Tyroshi sellsword, captain of the Stormcrows,





—in Meereen: —OZNAK ZO PAHL, a hero of the city.





The banner of Daenerys Targaryen is the banner of Aegon the Conqueror and the dynasty he established: a three-headed dragon, red on black.





KING OF THE ISLES

AND THE NORTH


BALON GREYJOY, the Ninth of His Name Since the Grey King, styling himself King of the Iron Islands and the North, King of Salt and Rock, Son of the Sea Wind, and Lord Reaper of Pyke, —his wife, QUEEN ALANNYS, of House Harlaw,

—their children: —{RODRIK}, their eldest son, slain at Seagard during Greyjoy’s Rebellion,

—{MARON}, their second son, slain at Pyke during Greyjoy’s Rebellion,

—ASHA, their daughter, captain of the Black Wind and conqueror of Deepwood Motte,

—THEON, their youngest son, captain of the Sea Bitch and briefly Prince of Winterfell, —Theon’s squire, WEX PYKE, bastard son of Lord Botley’s half-brother, a mute lad of twelve,

—Theon’s crew, the men of the Sea Bitch: —URZEN, MARON BOTLEY called FISHWHISKERS, STYGG, GEVIN HARLAW, CADWYLE,





—his brothers: —EURON, called Crow’s Eye, captain of the Silence, a notorious outlaw, pirate, and raider,

—VICTARION, Lord Captain of the Iron Fleet, master of the Iron Victory,

—AERON, called DAMPHAIR, a priest of the Drowned God,





—his household on Pyke: —MAESTER WENDAMYR, healer and counselor,

—HELYA, keeper of the castle,

—his warriors and sworn swords: —DAGMER called CLEFTJAW, captain of Foamdrinker,

—BLUETOOTH, a longship captain,

—ULLER, SKYTE, oarsmen and warriors,

—ANDRIK THE UNSMILING, a giant of a man,

—QARL, called QARL THE MAID, beardless but deadly,





—people of Lordsport: —OTTER GIMPKNEE, innkeeper and whoremonger,

—SIGRIN, a shipwright,





—his lords bannermen: —SAWANE BOTLEY, Lord of Lordsport, on Pyke,

—LORD WYNCH, of Iron Holt, on Pyke,

—STONEHOUSE, DRUMM, and GOODBROTHER of Old Wyk,

—LORD GOODBROTHER, SPARR, LORD MERLYN, and LORD FARWYND of Great Wyk,

—LORD HARLAW, of Harlaw,

—VOLMARK, MYRE, STONETREE, and KENNING, of Harlaw,

—ORKWOOD and TAWNEY of Orkmont,

—LORD BLACKTYDE of Blacktyde,

—LORD SALTCLIFFE and LORD SUNDERLY of Saltcliffe.





Appendix

Other Houses Great And Small





HOUSE ARRYN


The Arryns are descended from the Kings of Mountain and Vale, one of the oldest and purest lines of Andal nobility. House Arryn has taken no part in the War of the Five Kings, holding back its strength to protect the Vale of Arryn. The Arryn sigil is the moon-and-falcon, white, upon a sky-blue field. The Arryn words are As High As Honor.





ROBERT ARRYN, Lord of the Eyrie, Defender of the Vale, Warden of the East, a sickly boy of eight years, —his mother, LADY LYSA, of House Tully, third wife and widow of Lord Jon Arryn, and sister to Catelyn Stark,

—their household: —MARILLION, a handsome young singer, much favored by Lady Lysa,

—MAESTER COLEMON, counselor, healer, and tutor,

—SER MARWYN BELMORE, captain of guards,

—MORD, a brutal gaoler,





—his lords bannermen, knights, and retainers: —LORD NESTOR ROYCE, High Steward of the Vale and castellan of the Gates of the Moon, of the junior branch of House Royce, —Lord Nestor’s son, SER ALBAR,

—Lord Nestor’s daughter, MYRANDA,

—MYA STONE, a bastard girl in his service, natural daughter of King Robert I Baratheon,

—LORD YOHN ROYCE, called BRONZE YOHN, Lord of Runestone, of the senior branch of House Royce, cousin to Lord Nestor, —Lord Yohn’s eldest son, SER ANDAR,

—Lord Yohn’s second son, {SER ROBAR}, a knight of Renly Baratheon’s Rainbow Guard, slain at Storm’s End by Ser Loras Tyrell,

—Lord Yohn’s youngest son, {SER WAYMAR}, a man of the Night’s Watch, lost beyond the Wall,

—SER LYN CORBRAY, a suitor to Lady Lysa, —MYCHEL REDFORT, his squire,

—LADY ANYA WAYNWOOD, —Lady Anya’s eldest son and heir, SER MORTON, a suitor to Lady Lysa,

—Lady Anya’s second son, SER DONNEL, the Knight of the Gate,

—EON HUNTER, Lord of Longbow Hall, an old man, and a suitor to Lady Lysa,

—HORTON REDFORT, Lord of Redfort.





HOUSE FLORENT


The Florents of Brightwater Keep are Tyrell bannermen, despite a superior claim to Highgarden by virtue of a blood tie to House Gardener, the old Kings of the Reach. At the outbreak of the War of the Five Kings, Lord Alester Florent followed the Tyrells in declaring for King Renly, but his brother Ser Axell chose King Stannis, whom he had served for years as castellan of Dragonstone. Their niece Selyse was and is King Stannis’s queen. When Renly died at Storm’s End, the Florents went over to Stannis with all their strength, the first of Renly’s bannermen to do so. The sigil of House Florent shows a fox head in a circle of flowers.





ALESTER FLORENT, Lord of Brightwater, —his wife, LADY MELARA, of House Crane,

—their children: —ALEKYNE, heir to Brightwater,

—MELESSA, wed to Lord Randyll Tarly,

—RHEA, wed to Lord Leyton Hightower,

—his siblings: —SER AXELL, castellan of Dragonstone,

—{SER RYAM}, died in a fall from a horse, —Ser Ryam’s daughter, QUEEN SELYSE, wed to King Stannis Baratheon,

—Ser Ryam’s son, {SER IMRY}, commanding Stannis Baratheon’s fleet on the Blackwater, lost with the Fury,

—Ser Ryam’s second son, SER ERREN, held captive at Highgarden,

—SER COLIN, —Ser Colin’s daughter, DELENA, wed to SER HOSMAN NORCROSS, —Delena’s son, EDRIC STORM, a bastard of King Robert I Baratheon, twelve years of age,

—Delena’s son, ALESTIR NORCROSS, eight,

—Delena’s son, RENLY NORCROSS, a boy of two,

—Ser Colin’s son, MAESTER OMER, in service at Old Oak,

—Ser Colin’s son, MERRELL, a squire on the Arbor,

—his sister, RYLENE, wed to Ser Rycherd Crane.





HOUSE FREY


Powerful, wealthy, and numerous, the Freys are bannermen to House Tully, but they have not always been diligent in their duty. When Robert Baratheon met Rhaegar Targaryen on the Trident, the Freys did not arrive until the battle was done, and thereafter Lord Hoster Tully always called Lord Walder “the Late Lord Frey.” It is also said of Walder Frey that he is the only lord in the Seven Kingdoms who could field an army out of his breeches.





At the onset of the War of the Five Kings, Robb Stark won Lord Walder’s allegiance by pledging to wed one of his daughters or granddaughters. Two of Lord Walder’s grandsons were sent to Winterfell to be fostered.





WALDER FREY, Lord of the Crossing, —by his first wife, {LADY PERRA, of House Royce}: —{SER STEVRON}, their eldest son, died after the Battle of Oxcross, —m. {Corenna Swann, died of a wasting illness},

—Stevron’s eldest son, SER RYMAN, heir to the Twins, —Ryman’s son, EDWYN, wed to Janyce Hunter, —Edwyn’s daughter, WALDA, a girl of eight,

—Ryman’s son, WALDER, called BLACK WALDER,

—Ryman’s son, PETYR, called PETYR PIMPLE, —m. Mylenda Caron,

—Petyr’s daughter, PERRA, a girl of five,



—m. {Jeyne Lydden, died in a fall from a horse},

—Stevron’s son, AEGON, a halfwit called JINGLEBELL,

—Stevron’s daughter, {MAEGELLE, died in childbed}, m. Ser Dafyn Vance, —Maegelle’s daughter, MARIANNE, a maiden,

—Maegelle’s son, WALDER VANCE, a squire,

—Maegelle’s son, PATREK VANCE,

—m. {Marsella Waynwood, died in childbed},

—Stevron’s son, WALTON, m. Deana Hardyng, —Walton’s son, STEFFON, called THE SWEET,

—Walton’s daughter, WALDA, called FAIR WALDA,

—Walton’s son, BRYAN, a squire,



—SER EMMON, m. Genna of House Lannister, —Emmon’s son, SER CLEOS, m. Jeyne Darry, —Cleos’s son, TYWIN, a squire of eleven,

—Cleos’s son, WILLEM, a page at Ashemark, nine,

—Emmon’s son, SER LYONEL, m. Melesa Crakehall,

—Emmon’s son, TION, a captive at Riverrun,

—Emmon’s son, WALDER, called RED WALDER, fourteen, a squire at Casterly Rock,

—SER AENYS, m. {Tyana Wylde, died in childbed}, —Aenys’s son, AEGON BLOODBORN, an outlaw,

—Aenys’s son, RHAEGAR, m. Jeyne Beesbury, —Rhaegar’s son, ROBERT, a boy of thirteen,

—Rhaegar’s daughter, WALDA, a girl of ten, called WHITE WALDA,

—Rhaegar’s son, JONOS, a boy of eight,



—PERRIANE, m. Ser Leslyn Haigh, —Perriane’s son, SER HARYS HAIGH, —Harys’s son, WALDER HAIGH, a boy of four,

—Perriane’s son, SER DONNEL HAIGH,

—Perriane’s son, ALYN HAIGH, a squire,





—by his second wife, {LADY CYRENNA, of House Swann}: —SER JARED, their eldest son, m. {Alys Frey}, —Jared’s son, SER TYTOS, m. Zhoe Blanetree, —Tytos’s daughter, ZIA, a maid of fourteen,

—Tytos’s son, ZACHERY, a boy of twelve, training at the Sept of Oldtown,

—Jared’s daughter, KYRA, m. Ser Garse Goodbrook, —Kyra’s son, WALDER GOODBROOK, a boy of nine,

—Kyra’s daughter, JEYNE GOODBROOK, six,



—SEPTON LUCEON, in service at the Great Sept of Baelor in King’s Landing,





—by his third wife, {LADY AMAREI of House Crakehall}: —SER HOSTEEN, their eldest son, m. Bellena Hawick, —Hosteen’s son, SER ARWOOD, m. Ryella Royce, —Arwood’s daughter, RYELLA, a girl of five,

—Arwood’s twin sons, ANDROW and ALYN, three,



—LADY LYTHENE, m. Lord Lucias Vypren, —Lythene’s daughter, ELYANA, m. Ser Jon Wylde, —Elyana’s son, RICKARD WYLDE, four,

—Lythene’s son, SER DAMON VYPREN,

—SYMOND, m. Betharios of Braavos, —Symond’s son, ALESANDER, a singer,

—Symond’s daughter, ALYX, a maid of seventeen,

—Symond’s son, BRADAMAR, a boy of ten, fostered on Braavos as a ward of Oro Tendyris, a merchant of that city,

—SER DANWELL, m. Wynafrei Whent, —{many stillbirths and miscarriages},

—MERRETT, m. Mariya Darry, —Merrett’s daughter, AMEREI, called AMI, a widow of sixteen, m. {Ser Pate of the Blue Fork},

—Merrett’s daughter, WALDA, called FAT WALDA, a wife of fifteen years, m. Lord Roose Bolton,

—Merrett’s daughter, MARISSA, a maid of thirteen,

—Merrett’s son, WALDER, called LITTLE WALDER, a boy of seven, taken captive at Winterfell while a ward of Lady Catelyn Stark,

—SER GEREMY, drowned, m. Carolei Waynwood, —Geremy’s son, SANDOR, a boy of twelve, a squire to Ser Donnel Waynwood,

—Geremy’s daughter, CYNTHEA, a girl of nine, a ward of Lady Anya Waynwood,

—SER RAYMUND, m. Beony Beesbury, —Raymund’s son, ROBERT, sixteen, in training at the Citadel in Oldtown,

—Raymund’s son, MALWYN, fifteen, apprenticed to an alchemist in Lys,

—Raymund’s twin daughters, SERRA and SARRA, maiden girls of fourteen,

—Raymund’s daughter, CERSEI, six, called LITTLE BEE,





—by his fourth wife, {LADY ALYSSA, of House Blackwood}: —LOTHAR, their eldest son, called LAME LOTHAR, m. Leonella Lefford, —Lothar’s daughter, TYSANE, a girl of seven,

—Lothar’s daughter, WALDA, a girl of four,

—Lothar’s daughter, EMBERLEI, a girl of two,

—SER JAMMOS, m. Sallei Paege, —Jammos’s son, WALDER, called BIG WALDER, a boy of eight, taken captive at Winterfell. While a ward of Lady Catelyn Stark,

—Jammos’s twin sons, DICKON and MATHIS, five,

—SER WHALEN, m. Sylwa Paege, —Whalen’s son, HOSTER, a boy of twelve, a squire to Ser Damon Paege,

—Whalen’s daughter, MERIANNE, called MERRY, a girl of eleven,

—LADY MORYA, m. Ser Flement Brax, —Morya’s son, ROBERT BRAX, nine, fostered at Casterly Rock as a page,

—Morya’s son, WALDER BRAX, a boy of six,

—Morya’s son, JON BRAX, a babe of three,

—TYTA, called TYTA THE MAID, a maid of twenty-nine,





—by his fifth wife, {LADY SARYA of House Whent}: —no progeny,





—by his sixth wife, {LADY BETHANY of House Rosby}: —SER PERWYN, their eldest son,

—SER BENFREY, m. Jyanna Frey, a cousin, —Benfrey’s daughter, DELLA, called DEAF DELLA, a girl of three,

—Benfrey’s son, OSMUND, a boy of two,

—MAESTER WILLAMEN, in service at Longbow Hall,

—OLYVAR, squire to Robb Stark,

—ROSLIN, a maid of sixteen,





—by his seventh wife, {LADY ANNARA of House Farring}: —ARWYN, a maid of fourteen,

—WENDEL, their eldest son, a boy of thirteen, fostered at Seagard as a page,

—COLMAR, promised to the Faith, eleven,

—WALTYR, called TYR, a boy of ten,

—ELMAR, formerly betrothed to Arya Stark, a boy of nine,

—SHIREI, a girl of six,





—by his eighth wife, LADY JOYEUSE of House Erenford, —no progeny as yet,





—Lord Walder’s natural children, by sundry mothers, —WALDER RIVERS, called BASTARD WALDER, —Bastard Walder’s son, SER AEMON RIVERS,

—Bastard Walder’s daughter, WALDA RIVERS,

—MAESTER MELWYS, in service at Rosby,

—JEYNERIVERS, MARTYNRIVERS, RYGERRIVERS, RONELRIVERS, MELLARARIVERS, others.





HOUSE LANNISTER


The Lannisters of Casterly Rock remain the principal support of King Joffrey’s claim to the Iron Throne. They boast of descent from Lann the Clever, the legendary trickster of the Age of Heroes. The gold of Casterly Rock and the Golden Tooth has made them the wealthiest of the Great Houses. The Lannister sigil is a golden lion upon a crimson field. Their words are Hear Me Roar!





TYWIN LANNISTER, Lord of Casterly Rock, Warden of the West, Shield of Lannisport, and Hand of the King, —his son, SER JAIME, called THE KINGSLAYER, a twin to Queen Cersei, Lord Commander of the Kingsguard, and Warden of the East, a captive at Riverrun, —his daughter, QUEEN CERSEI, twin to Jaime, widow of King Robert I Baratheon, Queen Regent for her son Joffrey, —her son, KING JOFFREY BARATHEON, a boy of thirteen,

—her daughter, PRINCESS MYRCELLA BARATHEON, a girl of nine, a ward of Prince Doran Martell in Dorne,

—her son, PRINCE TOMMEN BARATHEON, a boy of eight, heir to the Iron Throne,

—his dwarf son, TYRION, called THE IMP, called HALFMAN, wounded and scarred on the Blackwater,



—his siblings: —SER KEVAN, Lord Tywin’s eldest brother, —Ser Kevan’s wife, DORNA, of House Swyft,

—their son, SER LANCEL, formerly a squire to King Robert, wounded and near death,

—their son, WILLEM, twin to Martyn, a squire, captive at Riverrun,

—their son, MARTYN, twin to Willem, a squire, a captive with Robb Stark,

—their daughter, JANEI, a girl of two,

—GENNA, his sister, wed to Ser Emmon Frey, —their son, SER CLEOS FREY, a captive at Riverrun,

—their son, SER LYONEL,

—their son, TION FREY, a squire, captive at Riverrun,

—their son, WALDER, called RED WALDER, a squire at Casterly Rock,

—{SER TYGETT}, his second brother, died of a pox, —Tygett’s widow, DARLESSA, of House Marbrand,

—their son, TYREK, squire to the king, missing,

—{GERION}, his youngest brother, lost at sea, —Gerion’s bastard daughter, JOY, eleven,





—his cousin, {SER STAFFORD LANNISTER}, brother to the late Lady Joanna, slain at Oxcross, —Ser Stafford’s daughters, CERENNA and MYRIELLE,

—Ser Stafford’s son, SER DAVEN,

—his cousins: —SER DAMION LANNISTER, m. Lady Shiera Crakehall, —his son, SER LUCION,

—his daughter, LANNA, m. Lord Antario Jast,

—MARGOT, m. Lord Titus Peake,





—his household: —MAESTER CREYLEN, healer, tutor, and counselor,

—VYLARR, captain-of-guards, —LUM and RED LESTER, guardsmen,

—WHITESMILE WAT, a singer,

—SER BENEDICT BROOM, master-at-arms,





—his lords bannermen: —DAMON MARBRAND, Lord of Ashemark, —SER ADDAM MARBRAND, his son and heir,

—ROLAND CRAKEHALL, Lord of Crakehall, —his brother, {SER BURTON CRAKEHALL}, killed by Lord Beric Dondarrion and his outlaws,

—his son and heir, SER TYBOLT CRAKEHALL,

—his second son, SER LYLE CRAKEHALL, called STRONGBOAR, a captive at Pinkmaiden Castle,

—his youngest son, SER MERLON CRAKEHALL,

—ANDROS BRAXI, Lord of Hornvale, drowned during the Battle of the Camps, —his brother, {SER RUPERT BRAX}, slain at Oxcross,

—his eldest son, SER TYTOS BRAX, now Lord of Hornvale, a captive at the Twins,

—his second son, {SER ROBERT BRAX}, slain at the Battle of the Fords,

—his third son, SER FLEMENT BRAX, now heir,

—{LORD LEO LEFFORD}, drowned at the Stone Mill,

—REGENARD ESTREN, Lord of Wyndhall, a captive at the Twins,

—GAWEN WESTERLING, Lord of the Crag, a captive at Seagard, —his wife, LADY SYBELL, of House Spicer, —her brother, SER ROLPH SPICER,

—her cousin, SER SAMWELL SPICER,

—their children: —SER RAYNALD WESTERLING,

—JEYNE, a maid of sixteen years,

—ELEYNA, a girl of twelve,

—ROLLAM, a boy of nine,



—LEWYS LYDDEN, Lord of the Deep Den,

—LORD ANTARIO JAST, a captive at Pinkmaiden Castle,

—LORD PHILIP PLUMM, —his sons, SER DENNIS PLUMM, SER PETER PLUMM, and SER HARWYN PLUMM, called HARDSTONE,

—QUENTEN BANEFORT, Lord of Banefort, a captive of Lord Jonos Bracken,

—his knights and captains: —SER HARYS SWYFT, good-father to Ser Kevan Lannister, —Ser Harys’s son, SER STEFFON SWYFT, —Ser Steffon’s daughter, JOANNA,

—Ser Harys’s daughter, SHIERLE, m. Ser Melwyn Sarsfield,

—SER FORLEY PRESTER,

—SER GARTH GREENFIELD, a captive at Raventree Hall,

—SER LYMOND VIKARY, a captive at Wayfarer’s Rest,

—LORD SELMOND STACKSPEAR, —his son, SER STEFFON STACKSPEAR,

—his younger son, SER ALYN STACKSPEAR,

—TERRENCE KENNING, Lord of Kayce, —SER KENNOS OF KAYCE, a knight in his service,

—SER GREGOR CLEGANE, the Mountain That Rides, —POLLIVER, CHISWYCK, RAFF THE SWEETLING, DUNSEN, and THE TICKLER, soldiers in his service,

—{SER AMORY LORCH}, fed to a bear by Vargo Hoat after the fall of Harrenhal.





HOUSE MARTELL


Dorne was the last of the Seven Kingdoms to swear fealty to the Iron Throne. Blood, custom, and history all set the Dornishmen apart from the other kingdoms. At the outbreak of the War of the Five Kings, Dorne took no part. With the betrothal of Myrcella Baratheon to Prince Trystane, Sunspear declared its support for King Joffrey and called its banners. The Martell banner is a red sun pierced by a golden spear. Their words are Unbowed, Unbent, Unbroken.





DORAN NYMEROS MARTELL, Lord of Sunspear, Prince of Dorne, —his wife, MELLARIO, of the Free City of Norvos,

—their children: —PRINCESS ARIANNE, their eldest daughter, heir to Sunspear,

—PRINCE QUENTYN, their elder son,

—PRINCE TRYSTANE, their younger son, betrothed to Myrcella Baratheon,

—his siblings: —his sister, {PRINCESS ELIA}, wife of Prince Rhaegar Targaryen, slain during the Sack of King’s Landing,

—their children: —{PRINCESS RHAENYS}, a young girl, slain during the Sack of King’s Landing,

—{PRINCE AEGON}, a babe, slain during the Sack of King’s Landing,

—his brother, PRINCE OBERYN, called THE RED VIPER, —Prince Oberyn’s paramour, ELLARIA SAND,

—Prince Oberyn’s bastard daughters, OBARA, NYMERIA,TYENE, SARELLA, ELIA, OBELLA, DOREA, LOREZA, called THE SAND SNAKES,

—Prince Oberyn’s companions: —HARMEN ULLER, Lord of Hellholt, —Harmen’s brother, SER ULVVYCK ULLER,

—SER RYON ALLYRION, —Ser Ryon’s natural son, SER DAEMON SAND, the Bastard of Godsgrace,

—DAGOS MANWOODY, Lord of Kingsgrave, —Dagos’s sons, MORS and DICKON,

—Dagos’s brother, SER MYLES MANWOODY,

—SER ARRON QORGYLE,

—SER DEZIEL DALT, the Knight of Lemonwood,

—MYRIA JORDAYNE, heir to the Tor,

—LARRA BLACKMONT, Lady of Blackmont, —her daughter, JYNESSA BLACKMONT,

—her son, PERROS BLACKMONT, a squire,





—his household: —AREO HOTAH, a Norvoshi sellsword, captain of guards,

—MAESTER CALEOTTE, counselor, healer, and tutor,

his lords bannermen: —HARMEN ULLER, Lord of Hellholt,

—EDRIC DAYNE, Lord of Starfall,

—DELONNE ALLYRION, Lady of Godsgrace,

—DAGOS MANWOODY, Lord of Kingsgrave,

—LARRA BLACKMONT, Lady of Blackmont,

—TREMOND GARGALEN, Lord of Salt Shore,

—ANDERS YRONWOOD, Lord of Yronwood,

—NYMELLA TOLAND.





HOUSE TULLY


Lord Edmyn Tully of Riverrun was one of the first of the river lords to swear fealty to Aegon the Conqueror. The victorious Aegon rewarded him by raising House Tully to dominion over all the lands of the Trident. The Tully sigil is a leaping trout, silver, on a field of rippling blue and red. The Tully words are Family, Duty, Honor.





HOSTER TULLY, Lord of Riverrun, —his wife, (LADY MINISA, of House Whent), died in childbed,

—their children: —CATELYN, widow of Lord Eddard Stark of Winterfell, —her eldest son, ROBB STARK, Lord of Winterfell, King in the North, and King of the Trident,

—her daughter, SANSA STARK, a maid of twelve, captive at King’s Landing,

—her daughter, ARYA STARK, ten, missing for a year,

—her son, BRANDON STARK, eight, believed dead,

—her son, RICKON STARK, four, believed dead,

—LYSA, widow of Lord Jon Arryn of the Eyrie, —her son, ROBERT, Lord of the Eyrie and Defender of the Vale, a sickly boy of seven years,

—SER EDMURE, his only son, heir to Riverrun, —Ser Edmure’s friends and companions: —SER MARQ PIPER, heir to Pinkmaiden,

—LORD LYMOND GOODBROOK,

—SER RONALD VANCE, called THE BAD, and his brothers, SER HUGO, SER ELLERY, and KIRTH,

—PATREK MALLISTER, LUCAS BLACKWOOD, SER PERWYN FREY, TRISTAN RYGER,

—SER ROBERT PAEGE,





—his brother, SER BRYNDEN, called The Blackfish,

—his household: —MAESTER VYMAN, counselor, healer, and tutor,

—SER DESMOND GRELL, master-at-arms,

—SER ROBIN RYGER, captain of the guard, —LONG LEW, ELWOOD, DELP, guardsmen,

—UTHERYDES WAYN, steward of Riverrun,

—RYMUND THE RHYMER, a singer,

—his lords bannermen: —JONOS BRACKEN, Lord of the Stone Hedge,

—JASON MALLISTER, Lord of Seagard,

—WALDER FREY, Lord of the Crossing,

—CLEMENT PIPER, Lord of Pinkmaiden. Castle,

—KARYL VANCE, Lord of Wayfarer’s Rest,

—NORBERT VANCE, Lord of Atranta,

—THEOMAR SMALLWOOD, Lord of Acorn Hall, —his wife, LADY RAVELLA, of House Swann,

—their daughter, CARELLEN,

—WILLIAM MOOTON, Lord of Maidenpool,

—SHELLA WHENT, dispossessed Lady of Harrenhal,

—SER HALMON PAEGE.

—TYTOS BLACKWOOD, Lord of Raventree





HOUSE TYRELL


The Tyrells rose to power as stewards to the Kings of the Reach, whose domain included the fertile plains of the southwest from the Dornish marches and Blackwater Rush to the shores of the Sunset Sea. Through the female line, they claim descent from Garth Greenhand, gardener king of the First Men, who wore a crown of vines and flowers and made the land bloom. When Mern IX, last king of House Gardener, was slain on the Field of Fire, his steward Harlen Tyrell surrendered Highgarden to Aegon the Conqueror. Aegon granted him the castle and dominion over the Reach. The Tyrell sigil is a golden rose on a grass-green field. Their words are Growing Strong.





Lord Mace Tyrell declared his support for Renly Baratheon at the onset of the War of the Five Kings, and gave him the hand of his daughter Margaery. Upon Renly’s death, Highgarden made alliance with House Lannister, and Margaery was betrothed to King Joffrey.





MACE TYRELL, Lord of Highgarden, Warden of the South, Defender of the Marches, and High Marshall of the Reach, —his wife, LADY ALERIE, of House Hightower of Oldtown,

—their children: —WILLAS, their eldest son, heir to Highgarden,

—SER GARLAN, called THE GALLANT, their second son, —his wife, LADY LEONETTE of House Fossoway,

—SER LORAS, the Knight of Flowers, their youngest son, a Sworn Brother of the Kingsguard,

—MARGAERY, their daughter, a widow of fifteen years, betrothed to King Joffrey I Baratheon, —Margaery’s companions and ladies-in-waiting: —her cousins, MEGGA, ALLA, and ELINOR TYRELL, —Elinor’s betrothed, ALYN AMBROSE, squire,

—LADY ALYSANNE BULWER, a girl of eight,

—MEREDYTH CRANE, called MERRY,

—TAENA OF MYR, wife to LORD ORTON MERRYWEATHER,

—LADY ALYCE GRACEFORD,

—SEPTA NYSTERICA, a sister of the Faith,





—his widowed mother, LADY OLENNA of House Redwyne, called the Queen of Thorns, —Lady Olenna’s guardsmen, ARRYK and ERRYK, called LEFT and RIGHT,

—his sisters: —LADY MINA, wed to Paxter Redwyne, Lord of the Arbor,

—their children: —SER HORAS REDWYNE, twin to Hobber, mocked as HORROR,

—SER HOBBER REDWYNE, twin to Horas, mocked as SLOBBER,

—DESMERA REDWYNE, a maid of sixteen,

—LADY JANNA, wed to Ser Jon Fossoway,

—his uncles and cousins: —his father’s brother, GARTH, called THE GROSS, Lord Seneschal of Highgarden, —Garth’s bastard sons, GARSE and GARRETT FLOWERS,

—his father’s brother, SER MORYN, Lord Commander of the City Watch of oldtown, —Moryn’s son, {SER LUTHOR}, m. Lady Elyn Norridge, —Luthor’s son, SER THEODORE, m. Lady Lia. Serry, —Theodore’s daughter, ELINOR,

—Theodore’s son, LUTHOR, a squire,

—Luthor’s son, MAESTER MEDWICK,

—Luthor’s daughter, OLENE, m. Ser Leo Blackbar,

—Moryn’s son, LEO, called LEO THE LAZY,

—his father’s brother, MAESTER GORMON, a scholar of the Citadel,

—his cousin, {SER QUENTIN}, died at Ashford, —Quentin’s son, SER OLYMER, m. Lady Lysa Meadows, —Olymer’s sons, RAYMUND and RICKARD,

—Olymer’s daughter, MEGGA,



—his cousin, MAESTER NORMUND, in service at Blackcrown,

—his cousin, {SER VICTOR}, slain by the Smiling Knight of the Kingswood Brotherhood, —Victor’s daughter, VICTARIA, m. {Lord Jon Bulwer}, died of a summer fever, —their daughter, LADY ALYSANNE BULWER, eight,

—Victor’s son, SER LEO, m. Lady Alys Beesbury, —Leo’s daughters, ALLA and LEONA,

—Leo’s sons, LYONEL, LUCAS, and LORENT,





—his household at Highgarden: —MAESTER LOMYS, counselor, healer, and tutor,

—IGON VYRWEL, captain of the guard,

—SER VORTIMER CRANE, master-at-arms,

—BUTTERBUMPS, fool and jester, hugely fat,





—his lords bannermen: —RANDYLL TARLY, Lord of Horn Hill,

—PAXTER REDWYNE, Lord of the Arbor,

—ARWYN OAKHEART, Lady of Old Oak,

—MATHIS ROWAN, Lord of Goldengrove,

—ALESTER FLORENT, Lord of Brightwater Keep, a rebel in support of Stannis Baratheon,

—LEYTON HIGHTOWER, Voice of Oldtown, Lord of the Port,

—ORTON MERRYWEATHER, Lord of Longtable,

—LORD ARTHUR AMBROSE,

—his knights and sworm swords: —SER MARK MULLENDORE, crippled during the Battle of the Blackwater,

—SER JON FOSSOWAY, of the green-apple Fossoways,

—SER TANTON FOSSOWAY, of the red-apple Fossoways.





Appendix

Rebels, Rogues, And Sworn Brothers





THE SWORN BROTHERS OF

THE NIGHT’S WATCH


(ranging Beyond the Wall) JEOR MORMONT, called THE OLD BEAR, Lord Commander of the Night’s Watch, —JON SNOW, the Bastard of Winterfell, his steward and squire, lost while scouting the Skirling Pass, —GHOST, his direwolf, white and silent,

—EDDISON TOLLETT, called DOLOROUS EDD, his squire,

—THOREN SMALLWOOD, commanding the rangers, —DYWEN, DIRK, SOFTFOOT, GRENN, BEDWYCK called GIANT, OLLO LOPHAND, GRUBBS, BERNARR called BROWN BERNARR, another BERNARR called BLACK BERNARR, TIM STONE, ULMER OF KINGSWOOD, GARTH called GREYFEATHER, GARTH OF GREENAWAY, GARTH OF OLDTOWN, ALAN OF ROSBY, RONNEL HARCLAY, AETHAN, RYLES, MAWNEY, rangers,

—JARMEN BUCKWELL, commanding the scouts, —BANNEN, KEDGE WHITEYE, TUMBERJON, FORNIO, GOADY, rangers and scouts,

—SER OTTYN WYTHERS, commanding the rearguard,

—SER MALADOR LOCKE, commanding the baggage, —DONNEL HILL, called SWEET DONNEL, his squire and steward,

—HAKE, a steward and cook,

—CHETT, an ugly steward, keeper of hounds,

—SAMWELL TARLY, a fat steward, keeper of ravens, mocked as SER PIGGY,

—LARK called THE SISTERMAN, his cousin ROLLEY OF SISTERTON, CLUBFOOT KARL, MASLYN, SMALL PAUL, SAWWOOD, LEFT HAND LEW, ORPHAN OSS, MUTTERING BILL, stewards,

—{QHORIN HALFHAND}, commanding the rangers from the Shadow Tower, slain in the Skirling Pass, —{SQUIRE DALBRIDGE, EGGEN}, rangers, slain in the Skirling Pass,

—STONESNAKE, a ranger and mountaineer, lost afoot in Skirling Pass,

—BLANE, Qhorin Halfhand’s second, commanding the Shadow Tower men on the Fist of the First Men,

—SER BYAM FLINT,





(at Castle Black)

BOWEN MARSH, Lord Steward and castellan, —MAESTER AEMON (TARGARYEN), healer and counselor, a blind man, one hundred years old, —his steward, CLYDAS,

—BENJEN STARK, First Ranger, missing, feared dead, —SER WYNTON STOUT, eighty years a ranger,

—SER ALADALE WYNCH, PYPAR, DEAF DICK FOLLARD, HAIRY HAL, BLACK JACK BULWER, ELRON, MATTHAR, rangers,

—OTHELL YARWYCK, First Builder, —SPARE BOOT, YOUNG HENLY, HAIDER, ALBETT, KEGS, SPOTTED PATE OF MAIDENPOOL, builders,

—DONAL NOYE, armorer, smith, and steward, one-armed,

—THREE-FINGER HOBB, steward and chief cook, —TIM TANGLETONGUE, EASY, MULLY, OLD HENLY, CUGEN, RED ALYN OF THE ROSEWOOD, JEREN, stewards,

—SEPTON CELLADOR, a drunken devout,

—SER ENDREW TARTH, master-at-arms, —RAST, ARRON, EMRICK, SATIN, HOP-ROBIN, recruits in training,

—CONWY, GUEREN, recruiters and collectors,





(at Eastwatch-by-the-Sea)

COTTER PYKE, Commander Eastwatch, —MAESTER HARMUNE, healer and counselor,

—SER ALLISER THORNE, master-at-arms,

—JANOS SLYNT, former commander of the City Watch of King’s Landing, briefly Lord of Harrenhal,

—SER GLENDON HEWETT,

—DAREON, steward and singer,

—IRON EMMETT, a ranger famed for his strength,





(at Shadow Tower)

SER DENYS MALLISTER, Commander, Shadow Tower —his steward and squire, WALLACE MASSEY,

—MAESTER MULLIN, healer and counselor.





THE BROTHERHOOD WITHOUT

BANNERS

AN OUTLAW FELLOWSHIP


—BERIC DONDARRION, Lord of Blackhaven, called THE LIGHTNING LORD, oft reported dead, —his right hand, THOROS OF MYR, a red priest,

—his squire, EDRIC DAYNE, Lord of Starfall, twelve,

—his followers: —LEM, called LEM LEMONCLOAK, a one-time soldier,

—HARWIN, son of Hullen, formerly in service to Lord Eddard Stark at Winterfell,

—GREENBEARD, a Tyroshi sellsword,

—TOM OF SEVENSTREAMS, a singer of dubious report, called TOM SEVENSTRINGS and TOM 0’ SEVENS,

—ANGUY THE ARCHER, a bowman from the Dornish Marches,

—JACK-BE-LUCKY, a wanted man, short an eye,

—THE MAD HUNTSMAN, of Stoney Sept,

—KYLE, NOTCH, DENNETT, longbowmen,

—MERRIT O’MOONTOWN, WATTY THE MILLER, LIKELY LUKE, MUDGE, BEARDLESS DICK, outlaws in his band,





—at the Inn of the Kneeling Man: —SHARNA, the innkeep, a cook and midwife, —her husband, called HUSBAND,

—BOY, an orphan of the war,





—at the Peach, a brothel in Stoney Sept: —TANSY, the red-haired proprietor, —ALYCE, CASS, LANNA, JYZENE, HELLY, BELLA, some of her peaches,





—at Acorn Hall, the seat of House Smallwood: —LADY RAVELLA, formerly of House Swann, wife to Lord Theomar Smallwood,





—here and there and elsewhere: —LORD LYMOND LYCHESTER, an old man of wandering wit, who once held Ser Maynard at the bridge, —his young caretaker, MAESTER ROONE,

—the ghost of High Heart,

—the Lady of the Leaves,

—the septon at Sallydance.





The WILDLINGS, or

the FREE FOLK


MANCE RAYDER, King-beyond-the-Wall, —DALLA, his pregnant wife, —VAL, her younger sister,





—his chiefs and captains: —HARMA, called DOGSHEAD, commanding his van,

—THE LORD OF BONES, mocked as RATTLESHIRT, leader of a war band, —YGRITTE, a young spearwife, a member of his band,

—RYK, called LONGSPEAR, a member of his band,

—RAGWYLE, LENYL, members of his band,

—his captive, JON SNOW, the crow-come-over, —GHOST, Jon’s direwolf, white and silent,



—STYR, Magnar of Thenn,

—JARL, a young raider, Val’s lover, —GRIGG THE GOAT, ERROK, QUORT, BODGER, DEL, BIG BOIL, HEMPEN DAN, HENK THE HELM, LENN, TOEFINGER, STONE THUMBS, raiders,



—TORMUND, Mead-King of Ruddy Hall, called GIANTSBANE, TALL-TALKER, HORN-BLOWER, and BREAKER OF ICE, also THUNDERFIST, HUSBAND TO BEARS, SPEAKER TO GODS, and FATHER OF HOSTS, leader of a war band, —his sons, TOREGG THE TALL, TORWYRD THE TAME, DORMUND, and DRYN, his daughter MUNDA,

—{ORELL, called ORELL THE EAGLE}, a skinchanger slain by Jon Snow in the Skirling Pass,

—MAG MAR TUN DOH WEG, called MAG THE MIGHTY, of the giants,

—VARAMYR called SIXSKINS, a skinchanger, master of three wolves, a shadowcat, and a snow bear,

—THE WEEPER, a raider and leader of a war band,

—{ALFYN CROWKILLER}, a raider, slain by Qhorin Halfhand of the Night’s Watch,

CRASTER, of Craster’s Keep, who kneels to none, —GILLY, his daughter and wife, great with child,

—DYAH, FERNY, NELLA, three of his nineteen wives.
`

*/


window.addEventListener("load", function () {
  Global.GameContainer.hidden = false;
  Global.Spinner.hidden = true;
  let game;

  this.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (game) {
      game.inputHandler.keyDown(e);
    } else {
      map.inputHandler.keyDown(e);
    }
  });
  this.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (game) {
      game.inputHandler.keyUp(e);
    } else {
      map.inputHandler.keyUp(e);
    }
  });
  this.addEventListener("resize", () => {
    if (game) {
      game.onResize();
    }
  });

  let lastTime = 0;
  let state;


  function animate(timeStamp) {
    Global.Shaker.preShake(ctx);
    Global.Flasher.flash();
    ctx.clearRect(0, 0, Global.Canvas.width, Global.Canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (game && game.level) {
      game.draw(ctx);
      state = game.update(deltaTime);
    } else if (game && state) {
      if (Global.Audioplayer.currentTrack.name !== "map") {
        Global.Audioplayer.currentTrack = Global.Audioplayer.tracks.find(
          (x) => x.name === "map"
        );
        Global.Audioplayer.currentTrack.play();
      }
      Global.Canvas.classList.remove("underwater");
      Global.InfoButton.classList.remove("invisible");
      Global.Flasher.stop();
      if (state.win) {
        const cash = dataSource.saveStateAndReturnCash(state);
        map.userInterface.shop.setCash(cash);
        if (state.nextLevel) {
          state.nextLevel.locked = false;
        }
      }
      state = null;
      game = null;
    } else {
      map.draw(ctx, deltaTime);
      map.moving = true;
      map.player.moving = false;
      game = map.inputHandler.handle(deltaTime, ctx);
      if (Global.GameContainer.hidden) {
        Global.GameContainer.hidden = false;
        Global.Spinner.hidden = true;
      }
    }
    Global.Shaker.postShake(ctx);
    window.requestAnimationFrame(animate);
  }
  animate(0);
});
