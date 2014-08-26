Creatures = new Meteor.Collection('creatures');

Creatures.allow({
    insert: function() {
        return true;
    }, update: function() {
        return false;
    }, remove: function() {
        return false;
    }
});

Meteor.methods({
    creature: function(creatAttr) {
        
        creature = {};
        return Creatures.insert(creature);
    }, updateCreature: function(creatAttr, _id) {
        
    }
})