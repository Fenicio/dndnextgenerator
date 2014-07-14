Math.rand = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};
Array.prototype.random = function() {
    return this[Math.rand(0, this.length-1)];
};
Array.prototype.randomPop = function() {
    return this.splice(Math.rand(0, this.length-1),1)[0];
};

generateMonsterName = function(subtypes) {
    return subtypes.random().adjetives.random()+" "+subtypes.random().prefix.random()+subtypes.random().suffix.random();
};
/**
 * Returns an array of N items from the collection, queryied with options
*/
getRandomFromCollection = function(c, options, n) { //Not optimal, but kinda works
    var temp = c.find(options).fetch();
    var result = [];
    for(var i =0;i<n;i++) {
        result.push(temp.randomPop());   
    }
    return result;
};

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

    monster.name=generateMonsterName(subtypes);
    subtypes.map(function(e, i) {
      monster.actions.push(e.actions.random());
    });
    return monster;
};