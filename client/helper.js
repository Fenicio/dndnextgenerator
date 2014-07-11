Math.rand = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};
Array.prototype.random = function() {
    return this[Math.rand(0, this.length-1)];
};
Array.prototype.randomPop = function() {
    return this.splice(Math.rand(0, this.length-1),1)[0];
};

var generateMonsterName = function(subtypes) {
    return subtypes.random().adjetives.random()+" "+subtypes.random().prefix.random()+subtypes.random().suffix.random();
};

var generateRandomMonster = function() {
    var subtypes = [];
    var monster = {};
    if(Math.rand(1,4)==4) {
        subtypes.push(MonsterSubTypes.randomPop());
    }
    subtypes.push(MonsterSubTypes.randomPop());
    monster.type = MonsterTypes.random();
    monster.size = MonsterSizeSubtypes.random();
    monster.actions = [{
      name: "Default Attack",
      type: "P",
      action: "Standard Action",
      text: "Does X damage"
    }];

    monster.name=generateMonsterName(subtypes);
    subtypes.map(function(e, i) {
      monster.actions.push(e.actions.random());
    });
    return monster;
};