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
      hit_bonus: 0,
      hit_stat: "str",
      text: "Does {{avg-damage}}+{{str}} damage"
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
        if(monster.stats[el]>30) monster.stats[el]=30;
      });
      if(e.size_armor) {
        monster.size_armor+=e.size_armor;
      }
      if(e.natural_armor) {
        monster.natural_armor+=Math.floor(e.natural_armor*monster.size.hitDice)/6;
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
        monster.equipped_armor=Math.floor(2*monster.size.hitDice)/6;
      } else if(monster.stats.DEX >= 14) {
        monster.equipped_armor=Math.floor(4*monster.size.hitDice)/6;
        monster.dex_armor=Math.min(monster.dex_armor,2);
      } else {
        monster.equipped_armor=Math.floor(6*monster.size.hitDice)/6;
        monster.dex_armor=Math.min(monster.dex_armor,0);;
      }
    }
    monster.n_hitdice = Math.rand(monster.size.min_hitdice, monster.size.max_hitdice);
    monster.hitdice = monster.n_hitdice+"d"+monster.size.hitDice+" + "+(monster.n_hitdice*((monster.stats.CON/2)-5));
    monster.hitpoints = Math.rand(Math.max(monster.n_hitdice*(1+(monster.stats.CON/2)-5),1), Math.max(monster.n_hitdice*(monster.size.hitDice+(monster.stats.CON/2)-5),1));
    monster.standard_hitpoints = Math.max(1, Math.floor(monster.n_hitdice*((monster.size.hitDice/2+0.5)+(monster.stats.CON/2)-5)));
    monster.armor_class = Math.floor(10 + monster.natural_armor+monster.dex_armor+monster.size_armor+monster.equipped_armor);
    monster.challenge_rating = generateChallengeRating(monster.armor_class, monster.hitpoints);
    monster.experience_points = Math.floor(-0.3553*Math.pow(monster.challenge_rating, 3) + 60.485*Math.pow(monster.challenge_rating,2) + 25.5534*monster.challenge_rating + 5.52);
    monster.hit_bonus = Math.floor(monster.challenge_rating/3)+2;
    generateDamage(monster);
    monster.subtypes=subtypes;
    return monster;
};

generateMonsterName = function(subtypes) {
    var returnable="";
    var a = subtypes.random();
    var b = subtypes.random();
    var c = subtypes.random();
    if(a && a.adjetives) {
        returnable += a.adjetives.random()+" ";
    }
    if(b && b.prefix) {
        returnable += b.prefix.random();
    }
    if(c && c.suffix) {
        returnable += c.suffix.random();
    }
    return returnable.trim();
};

generateChallengeRating = function(AC, HP) {
  var ac_cr = (AC-12.5)/0.32;
  var hp_cr = Math.pow(HP/22.5, (1/0.8));
  var cr = Math.max(0, (2*ac_cr+8*hp_cr)/10)
  var stimated_hp = (4.55 * Math.pow(cr,0.72)) * (0.31 * Math.log(cr) + 3.7)
  console.log(cr, ac_cr, hp_cr, stimated_hp);
  return cr;
};

generateDamage = function(monster) {
  var min_damage = number_to_dice(monster.challenge_rating*3);
  var avg_damage = number_to_dice(monster.challenge_rating*4);
  var hard_damage = number_to_dice(monster.challenge_rating*5);
  var solo_damage = number_to_dice(monster.challenge_rating*8);
  var melee_distance = "5 feet"; //TODO
  var lance_distance = "10 feet";
  var see_distance = "60 feet";
  var throw_distance = "90 feet";
  var long_distance = "160 feet";
  var replacer = function(e, i) {
    e.text=e.text.replace("{{min-damage}}", min_damage);
    e.text=e.text.replace("{{avg-damage}}", avg_damage);
    e.text=e.text.replace("{{hard-damage}}", hard_damage);
    e.text=e.text.replace("{{solo-damage}}", solo_damage);
    e.text=e.text.replace("{{str}}", Math.floor((monster.stats.STR-5)/2));
    e.text=e.text.replace("{{dex}}", Math.floor((monster.stats.DEX-5)/2));
    e.text=e.text.replace("{{con}}", Math.floor((monster.stats.CON-5)/2));
    e.text=e.text.replace("{{int}}", Math.floor((monster.stats.INT-5)/2));
    e.text=e.text.replace("{{wis}}", Math.floor((monster.stats.WIS-5)/2));
    e.text=e.text.replace("{{cha}}", Math.floor((monster.stats.CHA-5)/2));
    e.text=e.text.replace("{{str-save}}", 10+Math.floor((monster.stats.STR-5)/2));
    e.text=e.text.replace("{{dex-save}}", 10+Math.floor((monster.stats.DEX-5)/2));
    e.text=e.text.replace("{{con-save}}", 10+Math.floor((monster.stats.CON-5)/2));
    e.text=e.text.replace("{{int-save}}", 10+Math.floor((monster.stats.INT-5)/2));
    e.text=e.text.replace("{{wis-save}}", 10+Math.floor((monster.stats.WIS-5)/2));
    e.text=e.text.replace("{{cha-save}}", 10+Math.floor((monster.stats.CHA-5)/2));
    e.text=e.text.replace("{{melee-distance}}", melee_distance);
    e.text=e.text.replace("{{lance-distance}}", lance_distance);
    e.text=e.text.replace("{{see-distance}}", see_distance);
    e.text=e.text.replace("{{throw-distance}}", throw_distance);
    e.text=e.text.replace("{{long-distance}}", long_distance);
    if(e.hit_stat) {
      var bonus = monster.hit_bonus;
      if(e.hit_bonus) bonus += e.hit_bonus;
      if(e.hit_stat) {
        if(e.hit_stat=="str") bonus+=Math.floor((monster.stats.STR-5)/2);
        if(e.hit_stat=="dex") bonus+=Math.floor((monster.stats.DEX-5)/2);
        if(e.hit_stat=="con") bonus+=Math.floor((monster.stats.CON-5)/2);
        if(e.hit_stat=="int") bonus+=Math.floor((monster.stats.INT-5)/2);
        if(e.hit_stat=="wis") bonus+=Math.floor((monster.stats.WIS-5)/2);
        if(e.hit_stat=="cha") bonus+=Math.floor((monster.stats.CHA-5)/2);
      }
      if(bonus>=0) {
        e.text = "+ "+bonus+": "+e.text;
      } else {
        e.text = bonus+": "+e.text;
      }
    }
  };
  monster.actions.map(replacer);
  monster.traits.map(replacer);
};