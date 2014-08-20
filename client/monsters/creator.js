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
    monster.natural_armor=0;
    monster.size_armor=0;
    monster.equipped_armor=0;
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
        if(monster.stats[el]<=0) monster.stats[el]=1;
      });
      if(e.size_armor) {
        monster.size_armor+=e.size_armor;
      }
      if(e.natural_armor) {
        monster.natural_armor+=e.natural_armor;
      }
      if(e.canEquip && e.canEquip===1) {
        monster.canEquip=1;
      }
      Object.keys(e.skills).map(function(el, i) {
        if(monster.skills[el]) {
          monster.skills[el]+=e.skills[el];
        } else {
          monster.skills[el]=e.skills[el];
        }
      });
    });
    monster.dex_armor=Math.floor((monster.stats.DEX/2)-5);
    if(monster.canEquip && monster.canEquip===1) {
      if(monster.stats.DEX>=18) {
        monster.equipped_armor=2;
      } else if(monster.stats.DEX >= 14) {
        monster.equipped_armor=4;
        monster.dex_armor=Math.min(monster.dex_armor,2);
      } else {
        monster.equipped_armor=6;
        monster.dex_armor=Math.min(monster.dex_armor,0);;
      }
    }
    monster.n_hitdice = Math.rand(monster.size.min_hitdice, monster.size.max_hitdice);
    monster.hitdice = monster.n_hitdice+"d"+monster.size.hitDice+" + "+(monster.n_hitdice*((monster.stats.CON/2)-5));
    monster.hitpoints = Math.rand(Math.max(monster.n_hitdice*(1+(monster.stats.CON/2)-5),1), Math.max(monster.n_hitdice*(monster.size.hitDice+(monster.stats.CON/2)-5),1));
    monster.armor_class = 10 + monster.natural_armor+monster.dex_armor+monster.size_armor+monster.equipped_armor;
    //TODO calculate average CR and XP values
    //TODO substitute {{damage}} tags for actual dice
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