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
    medium: 50,
    hard: 100,
    solo: 150
  },
  3: {
    easy: 20,
    medium: 50,
    hard: 100,
    solo: 150
  },
  4: {
    easy: 20,
    medium: 50,
    hard: 100,
    solo: 150
  },
  5: {
    easy: 20,
    medium: 50,
    hard: 100,
    solo: 150
  },
  6: {
    easy: 20,
    medium: 50,
    hard: 100,
    solo: 150
  }
};
 
function generatePatrol(CR, tags) {
  return generateMonsterGroup(CR-2, CR, xpTable[CR]['easy'], tags);
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