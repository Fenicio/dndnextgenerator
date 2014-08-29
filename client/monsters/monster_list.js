Template.monster_list.monsters = function() {
    return Creatures.find({},{sort: {"_id":-1}});
};
Template.monster_list.picture = function() {
    return this.pictures[0];
};