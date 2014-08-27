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
        //TODO validation
        var creature = creatAttr;
        return Creatures.insert(creature);
    }, updateCreature: function(creatAttr, _id) {
        //TODO validation
        return _id;
    }
});