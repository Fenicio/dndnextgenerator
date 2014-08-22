Math.rand = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};
Array.prototype.random = function() {
    return this[Math.rand(0, this.length-1)];
};
Array.prototype.randomPop = function() {
    return this.splice(Math.rand(0, this.length-1),1)[0];
};

/**
 * Returns an array of N items from the collection c, queryied with options
*/
getRandomFromCollection = function(c, options, n) { //Not optimal, but kinda works
    var temp = c.find(options).fetch();
    var result = [];
    for(var i =0;i<n;i++) {
        result.push(temp.randomPop());   
    }
    return result;
};

objectToArray = function(obj) {
    var list = [];
    Object.keys(obj).forEach(function(sk, ind) {
        list[ind]= {
            name: sk,
            value: obj[sk]
        };
    });
    return list;
};

number_to_dice = function(number) {
    if(number%12<4) {
        return Math.max(1,Math.floor(number/12))+"d12";
    } else if(number%10<3) {
        return Math.max(1,Math.floor(number/10))+"d10";
    } else if(number%8<2) {
        return Math.max(1,Math.floor(number/8))+"d8";
    } else {
        return Math.max(1,Math.floor(number/6))+"d6";
    }
};