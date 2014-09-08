/**
 * 
 Mike Mearl's average Exp per level
Lvl, Easy, Medium, Hard
1 20 50 100 150
2 20 70 140 210
3 40 110 220 330
4 50 150 300 450
5 70 200 400 600
6 80 250 500 750
7 100 300 600 900
8  120  350  700  1,050  
9  130  400  800  1,200  
10 150  500  1,000  1,500
11  150  500  1,000  1,500  
12 200  600  1,200  1,800
13  200  600  1,200  1,800  
14  250  700  1,400  2,100  
15  250  800  1,600  2,400
16  250  800  1,600  2,400  
17  300  900  1,800  2,700  
18  350  1,000  2,000  3,000  
19  350  1,100  2,200  3,300
20  350  1,100  2,200  3,300
 **/
//There's another way to do this, but I'm rolling with this for now
xpTable = {
  1: {
    easy: 20,
    medium: 50,
    hard: 100,
    solo: 150
  },
  2: {
    easy: 20,
    medium: 70,
    hard: 140,
    solo: 210
  },
  3: {
    easy: 40,
    medium: 110,
    hard: 220,
    solo: 330
  },
  4: {
    easy: 50,
    medium: 150,
    hard: 300,
    solo: 450
  },
  5: {
    easy: 70,
    medium: 200,
    hard: 400,
    solo: 600
  },
  6: {
    easy: 80,
    medium: 250,
    hard: 500,
    solo: 750
  },
  7: {
    easy: 100,
    medium: 300,
    hard: 600,
    solo: 900
  },
  8: {
    easy: 120,
    medium: 350,
    hard: 700,
    solo: 1050
  },
  9: {
    easy: 130,
    medium: 400,
    hard: 800,
    solo: 1200
  },
  10: {
    easy: 150,
    medium: 500,
    hard: 1000,
    solo: 1500
  },
  11: {
    easy: 150,
    medium: 500,
    hard: 1000,
    solo: 1500
  },
  12: {
    easy: 200,
    medium: 600,
    hard: 1200,
    solo: 1800
  },
  13: {
    easy: 200,
    medium: 600,
    hard: 1200,
    solo: 1800
  },
  14: {
    easy: 250,
    medium: 700,
    hard: 1400,
    solo: 2100
  },
  15: {
    easy: 250,
    medium: 800,
    hard: 1400,
    solo: 2100
  },
  16: {
    easy: 250,
    medium: 800,
    hard: 1600,
    solo: 2400
  },
  17: {
    easy: 300,
    medium: 900,
    hard: 1800,
    solo: 2700
  },
  18: {
    easy: 350,
    medium: 1000,
    hard: 2000,
    solo: 3000
  },
  19: {
    easy: 350,
    medium: 900,
    hard: 1800,
    solo: 3300
  },
  20: {
    easy: 350,
    medium: 1100,
    hard: 2200,
    solo: 3300
  }
};

/**
 * Let's assume these kinds of encounters:
 * Patrol 
 * Merchant (Monster wishes to barter)
 * Keepers (Monster + trap)
 * Explorers (Monster vs trap)
 * Duel (Monsters vs Monsters)
 * Column (Golem monster holds the roof, killing or tripping him buries this room)
 * Solo (Big boss fight)
 * Traps (Just traps)
**/
function generateRandomEncounter() {
  return generatePatrol(Math.random(1,30), undefined);
}

function generatePatrol(CR, tags) {
  return {
    name: "Patrol",
    monsters: generateMonsterGroup(CR-2, CR*1.6, xpTable[CR]['medium'], tags),
    description: "These creatures form a patrol, if facing mortal danger they will flee"
  };
};

function generateMerchant(CR, tags) {
  return {
    name: "Merchant",
    patrol: generateMonsterGroup(CR, CR*1.6, xpTable[CR]['medium'], ['humanoid'].concat(tags)),
    treasure: generateTreasure(CR),
    description: "This creature wishes to barter its treasure with the adventurers"
  };
};

function generateSolo(CR, tags) {
  return {
    name: "Solo",
    patrol: generateMonsterGroup(CR*1.2, CR*2, xpTable[CR]['solo'], tags),
    treasure: generateTreasure(CR),
    description: "This creature lives in this lair and will fight to protect it"
  };
};

function generateMonsterGroup(minCR, maxCR, xpBudget, tags) {
  var subset;
  var xp = 0; 
  var encounter = [];

  if(tags) {
    subset = getRandomFromCollection(Creatures, 
      { $and: [{challenge_rating: {$gte: minCR}}, 
        {challenge_rating: {$lte: maxCR}}, 
        {subtypes: { $elemMatch: {name: {$in: tags}}}}]}, 3);
  } else {
    subset = getRandomFromCollection(Creatures, 
      { $and: [{challenge_rating: {$gte: minCR}}, 
        {challenge_rating: {$lte: maxCR}}]}, 3);
  }

  while(xp<xpBudget) { 
    var c = subset.random(); 
    xp+=c.experience_points; 
    encounter.push(c); 
  }
  
  return {
    xp: xp,
    monsters: encounter
  };
};

//sample: generatePatrol(1, undefined);
//Another sample: generatePatrol(1, ['skulking']);