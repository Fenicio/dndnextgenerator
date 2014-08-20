if(Types && Types.find().count()===0) {
//Insert size types

//=======================
Types.insert({
    name: "Tiny",
    type: "size",
    adjetives: ["Mite", "Minuscule"],
    prefix: ["micro", "zepto"],
    suffix: ["icro", "mite"],
    stats: {
        "STR": -6,
        "DEX": 4,
        "CON": -6
    },
    size_armor: +4,
    min_hitdice: 1,
    max_hitdice: 6,
    skills: {
        "Stealth": 6
    },
    hitDice: 4,
    actions: [],
    traits: []
});


Types.insert({
    name: "Small",
    type: "size",
    adjetives: ["Small", "Little"],
    prefix: ["half", "kend"],
    suffix: ["ling", "der"],
    stats: {
        "STR": -2,
        "DEX": 2,
        "CON": -2
    },
    size_armor: +2,
    min_hitdice: 1,
    max_hitdice: 8,
    skills: {
        "Stealth": 4
    },
    hitDice: 6,
    actions: [],
    traits: []
});

Types.insert({
    name: "Medium",
    type: "size",
    adjetives: [""],
    prefix: [""],
    suffix: [""],
    min_hitdice: 1,
    max_hitdice: 10,
    stats: {
    },
    skills: {
    },
    hitDice: 8,
    actions: [],
    traits: []
});

Types.insert({
    name: "Large",
    type: "size",
    adjetives: ["Hulking"],
    prefix: ["ogr", "trol", "gi"],
    suffix: ["gre", "oll", "ant"],
    stats: {
      "STR": +4,
      "DEX": -4,
      "CON": +4
    },
    size_armor: -2,
    min_hitdice: 6,
    max_hitdice: 16,
    skills: {
      "Stealth": -5
    },
    hitDice: 10,
    actions: [],
    traits: []
});

Types.insert({
    name: "Huge",
    type: "size",
    adjetives: ["Inmense", "Ancient"],
    prefix: ["tit", "coloss"],
    suffix: ["tan", "tanic", "ssal"],
    stats: {
      "STR": +6,
      "DEX": -6,
      "CON": +6
    },
    size_armor: -4,
    min_hitdice: 12,
    max_hitdice: 24,
    skills: {
      "Stealth": -10
    },
    hitDice: 12,
    actions: [],
    traits: []
});

Types.insert({
    name: "Gargantuan",
    type: "size",
    adjetives: ["Monstrous"],
    prefix: ["tarr"],
    suffix: ["asque"],
    stats: {
      "STR": +8,
      "DEX": -8,
      "CON": +8
    },
    size_armor: -6,
    min_hitdice: 22,
    max_hitdice: 32,
    skills: {
      "Stealth": -20
    },
    hitDice: 20,
    actions: [],
    traits: []
});

//insert default types
//================================================

Types.insert({
    name: "Humanoid",
    type: "main",
    canEquip: 1,
    adjetives: [""],
    prefix: ["hu", "el", "or", "assi", "lat"],
    suffix: ["man", "lf", "rc", "maar"],
    stats: {},
    skills: {
        "Diplomacy": 4 //I don't know if diplomacy is a skill in 5e
    },
    actions: [],
    traits: []
});

Types.insert({
    name: "Quadruped Animal",
    type: "main",
    adjetives: [""],
    prefix: ["pan", "wo", "ly", "assi", "lat", "cani", "lio", "tige", "equi", "hippo", "hors"],
    suffix: ["lf", "rg", "ther", "ynx", "sniffer", "ion", "iger", "orse"],
    stats: {},
    skills: {
        "Nature": 4
    },
    natural_armor: 2,
    actions: [{
      name: "Bite",
      action: "Standard Action",
      text: "..."
    }],
    traits: [
      {
      name: "Pack tactics",
      text: "..."
    },
    {
      name: "Keen hearing and smell",
      text: "..."
    }]
});

Types.insert({
    name: "Spider",
    type: "main",
    adjetives: ["Arachnid", "Crawling", "Black"],
    prefix: ["spi", "tara", "drid"],
    suffix: ["der", "ntula", "row", "dder"],
    stats: {
      "STR": +2,
      "DEX": +4,
      "CON": +2,
      "INT": -8,
      "CHA": -4
    },
    skills: {
        "Stealth": 4
    },
    natural_armor: 2,
    actions: [{
      name: "Bite",
      action: "Standard Action",
      text: "This attack deals {{avg-damage}} and poisons the target for {{min-damage}}"
    },
    {
      name: "Web",
      action: "Standard Action",
      text: "Recharge 5-6, on hit the target is restrained by webbing"
    }],
    traits: [
      {
      name: "Web walker",
      text: "..."
    },
    {
      name: "Web sense",
      text: "..."
    },
    {
      name: "Spider climb",
      text: "..."
    }]
});

Types.insert({
    name: "Ooze",
    type: "main",
    adjetives: ["Oozing"],
    prefix: ["sli", "mud", "gelat", "snot", "stick"],
    suffix: ["lime", "mud", "latinous", "nous"],
    natural_armor: -2,
    stats: {
      DEX: -4,
      CON: +4,
      INT: -6,
      CHA: -6
    },
    skills: {
    },
    actions: [
      {
      name: "Engulf",
      action: "Bonus Action",
      text: "This creature makes a grapple attack, if both creatures are in the same position the attack succeds"
    }],
    traits: []
});

Types.insert({
    name: "Bird",
    type: "main",
    adjetives: ["Flying"],
    prefix: ["eagl", "chripp", "hawk", "phoe", "gryp"],
    suffix: ["gle", "pping", "hawk", "enix", "yph"],
    natural_armor: 1,
    stats: {
      DEX: +6,
      CON: -4,
      INT: -6,
      CHA: -6
    },
    skills: {
    },
    actions: [
      {
      name: "Diving attack",
      action: "Standard Action",
      text: "Recharge [5-6] This creature plunges from the skies making a single attack with advantage and dealing {{min-damage}} extra"
    }],
    traits: [
      {
        name: "Fly",
        text: "This creature can soar the skies at its normal speed"
      }]
});

//Insert some subtypes
Types.insert({
    name: "Aquatic",
    type: "sub",
    adjetives: [ "Slippery", "Blue", ""],
    prefix: [ "Aqu", "Sli", "Hydro" ],
    suffix: [ "tic", "ish", "fin", "ark"],
    stats: {
      "DEX": 2,
      "CON": -2
    },
    skills: {
      "Athletics": 4
    },
    actions: [
    {
      name: "Bubble Cannon",
      action: "Standard Action",
      text: "This attack hits for {{max-damage}} on any rock item or creature"
    },
    {
      name: "Aquaport",
      action: "Move Action",
      text: "Once per round this creature can teleport to a nearby (30 feet) body of water"
    }
    ],
    traits: [
    {
      name: "Slippery",
      text: "Any grab attack receives a -5"
    }
    ]
});

Types.insert({
    name: "Shapeshifter",
    type: "sub",
    adjetives: [ "Treacherous", "Mirroring", ""],
    prefix: [ "doppel", "mirr", "reflec" ],
    suffix: [ "ganger", "rrorr", "tor", "tion"],
    stats: {
      "STR": -2,
      "DEX": 4,
      "CON": -2,
      "CHA": 2
    },
    skills: {
      "Deception": 6
    },
    actions: [
    {
      name: "Shapechanger",
      action: "Standard Action",
      text: "This creature can polymorph into a creature of its size it has seen, It's equipment it's not transformed"
    },
    {
      name: "Multiattack",
      action: "Standard Action",
      text: "This creature makes two melee attacks"
    }
    ],
    traits: [
    {
      name: "Ambusher",
      text: "This creature has advantage on attack rolls against any creature it has surprised"
    },
    {
      name: "Read thoughts",
      text: "As the doppelganger skill"
    }
    ]
});
      

Types.insert({
    name: "Long Appendage",
    type: "sub",
    adjetives: ["Tickling", "Tentacled", "Long-Arm"],
    prefix: ["Lon", "lagui", "Tenta"],
    suffix: ["pus", "ncer", "whip"],
    stats: {
      "DEX": 2,
      "STR": -2
    },
    skills: {
      "Athletics": 4
    },
    actions: [
    {
      name: "Grab",
      action: "Standard Action",
      text: "Allows a grab attack at 15 ft"
    },
    {
      name: "Streched Defense",
      action: "Reaction",
      text: "Whenever a enemy charges, this creature gets a free attack"
    }
    ],
    traits: [
    {
      name: "Great climber",
      text: "This creature can move through vertical walls at half its movement speed"
    }
    ]
});

Types.insert({
    name: "Goblinoid",
    type: "sub",
    adjetives: ["Thiefing", "Invading", "Green"],
    prefix: ["hob", "gob", "hobgob", "bug"],
    suffix: ["lin", "blin", "bear", "noid"],
    stats: {
      "DEX": 2,
      "CON": 2
    },
    skills: { 
      "Stealth": 4
    },
    actions: [
      {
        name: "Surprise attack",
        action: "Standard",
        text: "If this creatures surprises another creature and hits it deals {{min-damage}} extra damage"
      }
    ],
    traits: [
      {
        name: "Darkvision",
        text: "This creature can see in complete dark up to 60ft"
      }
    ]
});}