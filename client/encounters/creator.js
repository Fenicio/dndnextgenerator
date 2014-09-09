/**
 * 
Level Easy Medium Hard Deadly
1 25 50 75 100
2 50 100 150 200
3 75 150 225 400
4 125 250 375 500
5 250 500 750 1,100
6 300 600 900 1,400
7 350 750 1,100 1,700
8 450 900 1,400 2,100
9 550 1,100 1,600 2,400
10 600 1,200 1,900 2,800
11 800 1,600 2,400 3,600
12 1,000 2,000 3,000 4,500
13 1,100 2,200 3,400 5,100
14 1,250 2,500 3,800 5,700
15 1,400 2,800 4,300 6,400
16 1,600 3,200 4,800 7,200
17 2,000 3,900 5,900 8,800
18 2,100 4,200 6,300 9,500
19 2,400 4,900 7,300 10,900
20 2,800 5,700 8,500 12,700

 **/
//There's another way to do this, but I'm rolling with this for now
xpTable = {
  1: {
    easy: 25,
    medium: 50,
    hard: 75,
    solo: 100
  },
  2: {
    easy: 50,
    medium: 100,
    hard: 150,
    solo: 200
  },
  3: {
    easy: 75,
    medium: 150,
    hard: 250,
    solo: 375
  },
  4: {
    easy: 125,
    medium: 250,
    hard: 375,
    solo: 500
  },
  5: {
    easy: 250,
    medium: 500,
    hard: 750,
    solo: 1100
  },
  6: {
    easy: 300,
    medium: 600,
    hard: 900,
    solo: 1400
  },
  7: {
    easy: 350,
    medium: 750,
    hard: 1100,
    solo: 1700
  },
  8: {
    easy: 450,
    medium: 900,
    hard: 1400,
    solo: 2100
  },
  9: {
    easy: 550,
    medium: 1100,
    hard: 1600,
    solo: 2400
  },
  10: {
    easy: 600,
    medium: 1200,
    hard: 1900,
    solo: 2800
  },
  11: {
    easy: 800,
    medium: 1600,
    hard: 2400,
    solo: 3600
  },
  12: {
    easy: 1000,
    medium: 2000,
    hard: 3000,
    solo: 4500
  },
  13: {
    easy: 1100,
    medium: 2200,
    hard: 3400,
    solo: 5100
  },
  14: {
    easy: 1250,
    medium: 2500,
    hard: 3800,
    solo: 5700
  },
  15: {
    easy: 1400,
    medium: 2800,
    hard: 4300,
    solo: 6400
  },
  16: {
    easy: 1600,
    medium: 3200,
    hard: 4800,
    solo: 7200
  },
  17: {
    easy: 2000,
    medium: 3900,
    hard: 5900,
    solo: 8800
  },
  18: {
    easy: 2100,
    medium: 4200,
    hard: 6300,
    solo: 9500
  },
  19: {
    easy: 2400,
    medium: 4900,
    hard: 7300,
    solo: 10900
  },
  20: {
    easy: 2800,
    medium: 5700,
    hard: 8500,
    solo: 12700
  }
};

function xpBudgetCalc(CR, diff) {
  /*var xp = Math.pow(CR, 2)*125;
  if(diff==="easy") xp = xp * 0.5;
  if(diff==="hard") xp = xp * 2;
  if(diff==="solo") xp = xp * 3;
  return xp;*/
  return xpTable[CR][diff];
}

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
generateRandomEncounter = function() {
  var r = Math.rand(1,6);
  var cr = Math.rand(1,20);
  if(r==2) p = generateMerchant(cr, undefined);
  else if(r==3) p = generateSolo(cr, undefined);
  else p = generatePatrol(cr, undefined);
  console.log(p);
  return p;
};

generateLeveledEncounter = function(CR) {
  var r = Math.rand(1,6);
  var cr = Math.rand(1,20);
  if(!isNaN(CR) && CR > 0 && CR <21) {
    cr = parseInt(CR);
  }
  if(r==2) p = generateMerchant(cr, undefined);
  else if(r==3) p = generateSolo(cr, undefined);
  else p = generatePatrol(cr, undefined);
  console.log(p);
  return p;
};

generatePatrol= function(CR, tags) {
  return {
    name: "Patrol",
    monsters: generateMonsterGroup(CR/2, CR, xpBudgetCalc(CR,'medium'), tags),
    description: "These creatures form a patrol, if facing mortal danger they will flee"
  };
};

generateMerchant= function(CR, tags) {
  return {
    name: "Merchant",
    monsters: generateMonsterGroup(CR, CR*2, xpBudgetCalc(CR, 'hard'), ['humanoid'].concat(tags)),
    treasure: generateTreasure(CR),
    description: "This creature wishes to barter its treasure with the adventurers"
  };
};

generateSolo= function(CR, tags) {
  return {
    name: "Solo",
    monsters: generateMonsterGroup(CR*1.2, CR*2, xpBudgetCalc(CR, 'solo'), tags),
    treasure: generateTreasure(CR),
    description: "This creature lives in this lair and will fight to protect it"
  };
};

generateMonsterGroup = function(minCR, maxCR, xpBudget, tags) {
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
    if(c) {
      xp+=c.experience_points; 
      encounter.push(c);
    }
  }
  
  return {
    xp: xp,
    monsters: encounter
  };
};

//sample: generatePatrol(1, undefined);
//Another sample: generatePatrol(1, ['skulking']);