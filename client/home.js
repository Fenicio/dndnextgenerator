Template.hello.creatures = function() {
    return Creatures.find({},{sort: {"_id":-1}, limit: 6});
};
Template.hello.picture = function() {
    return this.pictures[0];
};