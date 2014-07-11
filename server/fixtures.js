Types.insert({
        name: "Aquatic",
        type: "sub",
        adjetives: [ "Slippery", "Blue", ""],
        prefix: [ "Aqu", "Sli", "Hydro" ],
        suffix: [ "tic", "ish", "fin", ""],
        stats: {
          "DEX": 2,
          "CON" -2
        },
        skills: {
          "Athletics": 4
        },
        actions: [
        {
          name: "Bubble Cannon",
          action: "Standard Action",
          text: "It kills any rock pokemon"
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
        name: "Long Appendage",
        type: "sub",
        adjetives: ["Tickling", "Tentacled", "Long-Arm"],
        prefix: ["Lon", "lagui", "Tenta"],
        suffix: ["pus", "ncer", "whip"],
        stats: {
          "DEX": 2
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
        adjetives: ["Thief", "Invading", "Green"],
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
            text: "If this creatures surprises another creature and hits it deals {{challenge}}d6 extra damage"
          }
        ],
        traits: [
          {
            name: "Darkvision",
            text: "This creature can see in complete dark up to 60ft"
          }
        ]
      });
      
Types.insert({
    name: "Small",
    type: "size",
    adjetives: ["Small", "Little"],
    prefix: ["half", "kend"],
    suffix: ["ling", "der"],
    stats: {
        "STR": -1,
        "DEX": 2,
        "CON": -1
    },
    skills: {
        "Stealth": 4
    },
    actions: [],
    traits: []
});