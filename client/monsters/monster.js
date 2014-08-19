Template.monster.stats = function(arg) {
    return this.stats[arg];
};
Template.monster.skills = function() {
    return this.skills;
};
Template.monster.str = function() {
    return this.stats.STR;
};
Template.monster.dex = function() {
    return this.stats.DEX;
};
Template.monster.con = function() {
    return this.stats.CON;
};
Template.monster.int = function() {
    return this.stats.INT;
};
Template.monster.wis = function() {
    return this.stats.WIS;
};
Template.monster.cha = function() {
    return this.stats.CHA;
};
Template.monster.skills = function() {
    var list = [];
    var skills = this.skills;
    Object.keys(this.skills).forEach(function(sk, ind) {
        list[ind]= {
            name: sk,
            value: skills[sk]
        };
    });
    return list;
};