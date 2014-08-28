Template.monster_list.monsters = function() {
    return Creatures.find();
};
Template.monster_list.picture = function() {
    return this.pictures[0];
};