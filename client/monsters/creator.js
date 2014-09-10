generateRandomMonster = function() {
    var subtypes = [];
    var monster = {};
    
    subtypes = getRandomFromCollection(Types, {type: "sub"}, Math.floor(6-Math.pow(Math.rand(1, 300), 0.25)));
    monster.size = getRandomFromCollection(Types,{type: "size"},1).pop();
    subtypes.push(monster.size);
    monster.type = getRandomFromCollection(Types,{type: "main"},1).pop();
    subtypes.push(monster.type);
    
    monster.actions = [{
      name: "Standard Attack",
      action: "Standard Action",
      hit_bonus: 0,
      hit_stat: "STR",
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
        monster.stats[el]+= isNaN(e.stats[el]) ? 0 : e.stats[el];
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
          monster.skills[el]+= isNaN(e.skills[el]) ? 0 : parseInt(e.skills[el]);
        } else {
          monster.skills[el]=isNaN(e.skills[el]) ? 0 :parseInt(e.skills[el]);
        }
      });
    });
    monster.dex_armor=Math.floor((monster.stats.DEX/2)-5);
    if(monster.canEquip && monster.canEquip===1) {
      if(monster.stats.DEX>=18) {
        monster.equipped_armor=Math.min(Math.floor(2*monster.size.hitDice)/6, 4);
      } else if(monster.stats.DEX >= 14) {
        monster.equipped_armor=Math.min(Math.floor(4*monster.size.hitDice)/6, 6);
        monster.dex_armor=Math.min(monster.dex_armor,2);
      } else {
        monster.equipped_armor=Math.min(Math.floor(6*monster.size.hitDice)/6, 11);
        monster.dex_armor=Math.min(monster.dex_armor,0);;
      }
    }
    monster.n_hitdice = Math.rand(monster.size.min_hitdice, monster.size.max_hitdice);
    monster.hitdice = monster.n_hitdice+"d"+monster.size.hitDice+" + "+(monster.n_hitdice*((monster.stats.CON/2)-5));
    monster.hitpoints = Math.rand(Math.max(monster.n_hitdice*(1+(monster.stats.CON/2)-5),1), Math.max(monster.n_hitdice*(monster.size.hitDice+(monster.stats.CON/2)-5),1));
    monster.standard_hitpoints = Math.max(monster.n_hitdice, Math.floor(monster.n_hitdice*((monster.size.hitDice/2+0.5)+(monster.stats.CON/2)-5)));
    monster.armor_class = Math.floor(10+monster.n_hitdice/5+monster.natural_armor+monster.dex_armor+monster.size_armor+monster.equipped_armor);
    monster.challenge_rating = generateChallengeRating(monster.armor_class, monster.hitpoints);
    monster.experience_points = Math.floor(-0.3553*Math.pow(monster.challenge_rating, 3) + 60.485*Math.pow(monster.challenge_rating,2) + 25.5534*monster.challenge_rating + 5.52);
    monster.hit_bonus = Math.floor(monster.challenge_rating/4)+2;
    monster.multiattack=1;
    if(monster.stats.DEX>14) {
      monster.multiattack=Math.ceil(monster.challenge_rating/6) + 1;
      monster.traits.push({
        name: "Multiattack",
        text: "This creature can do "+monster.multiattack+" attacks in a single round."
      });
    }
    
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
  var ac_cr = Math.max(0,(AC-12.5));
  var hp_cr = Math.max(0,HP/25);
  var cr = Math.max(0, (1.5*ac_cr+8.5*hp_cr)/10);
  return Math.round(cr*100)/100;
};

generateDamage = function(monster) {
  //TODO multiattack divides damage dice between attacks, (not solo damage, that thing is reserved for full turn actions like fire breathing or exploding or...)
  var min_damage = number_to_dice(monster.challenge_rating*3/monster.multiattack);
  var avg_damage = number_to_dice(monster.challenge_rating*5/monster.multiattack);
  var hard_damage = number_to_dice(monster.challenge_rating*8/monster.multiattack);
  var solo_damage = number_to_dice(monster.challenge_rating*12);
  var melee_distance = "5 feet";
  var lance_distance = "10 feet";
  var see_distance = "30 feet";
  var throw_distance = "90 feet";
  var long_distance = "180 feet";
  if(monster.size.name==="Large") {
    melee_distance = "10 feet";
    lance_distance = "20 feet";
    see_distance = "60 feet";
    throw_distance = "180 feet";
    long_distance = "360 feet";
  } else if(monster.size.name==="Huge") {
    melee_distance = "15 feet";
    lance_distance = "30 feet";
    see_distance = "90 feet";
    throw_distance = "270 feet";
    long_distance = "540 feet";
  } else if(monster.size.name==="Gargantuan") {
    melee_distance = "20 feet";
    lance_distance = "40 feet";
    see_distance = "120 feet";
    throw_distance = "360 feet";
    long_distance = "720 feet";
  }
  var replacer = function(e, i) {
    e.text=e.text.replace(/{{min-damage}}/g, min_damage);
    e.text=e.text.replace(/{{avg-damage}}/g, avg_damage);
    e.text=e.text.replace(/{{hard-damage}}/g, hard_damage);
    e.text=e.text.replace(/{{solo-damage}}/g, solo_damage);
    e.text=e.text.replace(/{{str}}/g, Math.floor((monster.stats.STR-5)/2));
    e.text=e.text.replace(/{{dex}}/g, Math.floor((monster.stats.DEX-5)/2));
    e.text=e.text.replace(/{{con}}/g, Math.floor((monster.stats.CON-5)/2));
    e.text=e.text.replace(/{{int}}/g, Math.floor((monster.stats.INT-5)/2));
    e.text=e.text.replace(/{{wis}}/g, Math.floor((monster.stats.WIS-5)/2));
    e.text=e.text.replace(/{{cha}}/g, Math.floor((monster.stats.CHA-5)/2));
    e.text=e.text.replace(/{{str-save}}/g, 10+monster.hit_bonus+Math.floor((monster.stats.STR-5)/2));
    e.text=e.text.replace(/{{dex-save}}/g, 10+monster.hit_bonus+Math.floor((monster.stats.DEX-5)/2));
    e.text=e.text.replace(/{{con-save}}/g, 10+monster.hit_bonus+Math.floor((monster.stats.CON-5)/2));
    e.text=e.text.replace(/{{int-save}}/g, 10+monster.hit_bonus+Math.floor((monster.stats.INT-5)/2));
    e.text=e.text.replace(/{{wis-save}}/g, 10+monster.hit_bonus+Math.floor((monster.stats.WIS-5)/2));
    e.text=e.text.replace(/{{cha-save}}/g, 10+monster.hit_bonus+Math.floor((monster.stats.CHA-5)/2));
    e.text=e.text.replace(/{{melee-distance}}/g, melee_distance);
    e.text=e.text.replace(/{{lance-distance}}/g, lance_distance);
    e.text=e.text.replace(/{{see-distance}}/g, see_distance);
    e.text=e.text.replace(/{{throw-distance}}/g, throw_distance);
    e.text=e.text.replace(/{{long-distance}}/g, long_distance);
    if(e.hit_stat) {
      var bonus = parseInt(monster.hit_bonus);
      if(e.hit_bonus) bonus += parseInt(e.hit_bonus);
      if(e.hit_stat) {
        if(e.hit_stat=="STR") bonus+=parseInt(Math.floor((monster.stats.STR-5)/2));
        if(e.hit_stat=="DEX") bonus+=parseInt(Math.floor((monster.stats.DEX-5)/2));
        if(e.hit_stat=="CON") bonus+=parseInt(Math.floor((monster.stats.CON-5)/2));
        if(e.hit_stat=="INT") bonus+=parseInt(Math.floor((monster.stats.INT-5)/2));
        if(e.hit_stat=="WIS") bonus+=parseInt(Math.floor((monster.stats.WIS-5)/2));
        if(e.hit_stat=="CHA") bonus+=parseInt(Math.floor((monster.stats.CHA-5)/2));
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