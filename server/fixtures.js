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
    size_armor: -2,
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
    size_armor: -1,
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
    adjetives: ["Man-sized"],
    prefix: ["aa", "ee", "ii", "oo", "uu"],
    suffix: ["aa", "ee", "ii", "oo", "uu"],
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
    prefix: ["ogr", "trol", "gi", "kilo"],
    suffix: ["gre", "oll", "ant"],
    stats: {
      "STR": +4,
      "CON": +4
    },
    size_armor: +1,
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
    prefix: ["tit", "coloss", "mega"],
    suffix: ["tan", "tanic", "ssal"],
    stats: {
      "STR": +6,
      "CON": +6
    },
    size_armor: +2,
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
    prefix: ["tarr", "giga", "tera", "exa"],
    suffix: ["asque"],
    stats: {
      "STR": +8,
      "CON": +8
    },
    size_armor: +3,
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
    adjetives: ["Homo"],
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
    name: "Canis",
    type: "main",
    adjetives: ["Running", "Canis"],
    prefix: ["chak", "wo", "assi", "lat", "cani", "coy", "coyo"],
    suffix: ["lf", "rg", "al", "sniffer", "ffer", "te", "yote"],
    stats: {},
    skills: {
        "Nature": 4
    },
    natural_armor: 2,
    actions: [{
      name: "Bite",
      action: "Standard Action",
      hit_bonus: 0,
      hit_stat: "str",
      text: "This attack deals {{avg-damage}}+{{str}}"
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
      hit_bonus: 0,
      hit_stat: "str",
      text: "This attack deals {{avg-damage}}+{{str}} and poisons the target doing {{min-damage}}+{{con}} damage, the creature is poisoned until it succeds a CON save against {{con-save}}"
    },
    {
      name: "Web",
      action: "Standard Action",
      hit_bonus: 2,
      hit_stat: "dex",
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
      hit_bonus: 0,
      hit_stat: "con",
      text: "This creature makes a grapple attack, if both creatures are in the same position the attack automatically hits"
    }],
    traits: []
});

Types.insert({
    name: "Bird",
    type: "main",
    adjetives: ["Flying", "Ave", "Avialae"],
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
      hit_bonus: 2,
      hit_stat: "dex",
      text: "Recharge [5-6] This creature plunges from the skies making a single attack with advantage and dealing {{hard-damage}}+{{dex}} extra"
    }],
    traits: [
      {
        name: "Fly",
        text: "This creature can soar the skies at its normal speed"
      }]
});

//Insert some subtypes
Types.insert({
    name: "Waterbound",
    type: "sub",
    adjetives: [ "Slippery", "Blue"],
    prefix: [ "Aqu", "Sli", "Hydro" ],
    suffix: [ "tic", "ish", "fin", "ark"],
    stats: {
      "DEX": 2,
      "CON": -2
    },
    skills: {
      "Athletics": 6
    },
    actions: [
    {
      name: "Bubble Cannon",
      action: "Standard Action",
      hit_bonus: 2,
      hit_stat: "dex",
      text: "Recharge [5-6], This attack hits for {{hard-damage}}+{{dex}} if the target is an object or an earth based creature, this attack is a critical hit"
    },
    {
      name: "Aquaport",
      action: "Move Action",
      text: "Once per round this creature can teleport to a body of water within {{see-distance}}"
    }
    ],
    traits: [
    {
      name: "Slippery",
      text: "Any grapple attack receives disadvantage against this creature"
    }
    ]
});

Types.insert({
    name: "Shapeshifter",
    type: "sub",
    adjetives: [ "Treacherous", "Mirroring"],
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
      text: "This creature can polymorph into a creature or inanimate object of its size it has seen, It's equipment it's not transformed"
    }
    ],
    traits: [
    {
      name: "Ambusher",
      text: "This creature has advantage on attack rolls against any creature it has surprised"
    },
    {
      name: "Read thoughts",
      text: "This creature can read superficial thoughts of creatures within {{see-distance}}"
    }
    ]
});
      

Types.insert({
    name: "Proboscis",
    type: "sub",
    adjetives: ["Tickling", "Tentacled", "Long-Nosed"],
    prefix: ["Lon", "lagui", "Tenta", "Ele"],
    suffix: ["pus", "ncer", "whip", "phant"],
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
      hit_bonus: 2,
      hit_stat: "dex",
      text: "Allows a grab attack at {{lance-distance}}"
    }
    ],
    traits: [
    {
      name: "Streched Defense",
      text: "Whenever a moves into this creature range of attack, this creature gets a free attack, this reaction can only be used once per round"
    }
    ]
});

Types.insert({
    name: "Skulking",
    type: "sub",
    adjetives: ["Invading", "Green", "Cavern", "Skulking"],
    prefix: ["hob", "gob", "hobgob", "bug", "ko"],
    suffix: ["lin", "blin", "bear", "noid", "bold"],
    stats: {
      "DEX": 2,
      "CON": 2
    },
    skills: { 
      "Stealth": 6
    },
    actions: [
      {
        name: "Surprise attack",
        action: "Standard",
        text: "If this creatures surprises another creature and hits it deals {{hard-damage}} extra damage"
      }
    ],
    traits: [
      {
        name: "Darkvision",
        text: "This creature can see in complete dark up to {{see-distance}}"
      }
    ]
});
  
}