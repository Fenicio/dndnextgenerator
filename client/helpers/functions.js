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

