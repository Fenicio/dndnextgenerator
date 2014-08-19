generateRandomMonster = function() {
    var subtypes = [];
    var monster = {};
    
    subtypes = getRandomFromCollection(Types, {type: "sub"}, [1,1,1,2,2,3].random());
    monster.size = getRandomFromCollection(Types,{type: "size"},1).pop();
    subtypes.push(monster.size);
    monster.type = getRandomFromCollection(Types,{type: "main"},1).pop();
    subtypes.push(monster.type);
    
    monster.actions = [{
      name: "Standard Attack",
      action: "Standard Action",
      text: "Does {{avg-damage}} damage"
    }];
    monster.traits = [];
    monster.stats = {
      "STR":10,
      "DEX":10,
      "CON":10,
      "INT":10,
      "WIS":10,
      "CHA":10
    };
    monster.skills = {};

    monster.name=generateMonsterName(subtypes)
    subtypes.map(function(e, i) {
      if(e.actions && e.actions.length>0) {
        monster.actions.push(e.actions.randomPop());
      }
      if(e.traits && e.traits.length>0) {
        monster.traits.push(e.traits.randomPop());
      }
      Object.keys(e.stats).map(function(el, i) {
        monster.stats[el]+=e.stats[el];
      });
      
      Object.keys(e.skills).map(function(el, i) {
        if(monster.skills[el]) {
          monster.skills[el]+=e.skills[el];
        } else {
          monster.skills[el]=e.skills[el];
        }
      });
      
    });
    monster.subtypes=subtypes;
    return monster;
};

generateMonsterName = function(subtypes) {
    var returnable="";
    var a = subtypes.random();
    var b = subtypes.random();
    var c = subtypes.random();
    if(a.adjetives) {
        returnable += a.adjetives.random()+" ";
    }
    if(b.prefix) {
        returnable += b.prefix.random();
    }
    if(c.suffix) {
        returnable += c.suffix.random();
    }
    return returnable.trim();
};