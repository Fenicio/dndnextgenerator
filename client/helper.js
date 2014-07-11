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
        subtypes.push(Types.find({type: "sub"}).randomPop());
    }
    subtypes.push(Types.find({type: "sub"}).randomPop());
    monster.type = Types.find({type: "main"}).random();
    monster.size = Types.find({type: "size"}).random();
    monster.actions = [{
      name: "Standard Attack",
      action: "Standard Action",
      text: "Does {{avg-damage}} damage"
    }];

    monster.name=generateMonsterName(subtypes);
    subtypes.map(function(e, i) {
      monster.actions.push(e.actions.random());
    });
    return monster;
};