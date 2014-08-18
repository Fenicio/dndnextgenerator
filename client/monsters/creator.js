generateRandomMonster = function() {
    var subtypes = [];
    var monster = {};
    subtypes = getRandomFromCollection(Types, {type: "sub"}, [1,1,1,2,2,3].random());
    monster.type = getRandomFromCollection(Types,{type: "main"},1).pop();
    subtypes.push(monster.type);
    monster.size = getRandomFromCollection(Types,{type: "size"},1).pop();
    subtypes.push(monster.size);
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
    console.log("before subtypes", monster);
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