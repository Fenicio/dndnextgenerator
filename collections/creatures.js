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
        creature.submitted = new Date().getTime();
        creature.votes=1;
        creature.upvoters=[Meteor.user._id];
        creature.downvoters=[];
        return Creatures.insert(creature);
    }, updateCreature: function(creatAttr, _id) {
        //TODO validation
        return _id;
    }, upVote: function(creatureId) {
        if(!Meteor.user()) {
            throw new Meteor.Error(401, "You need to login to vote");
        }
        Creatures.update({
            _id: creatureId, 
            upvoters: {$ne: Meteor.user()._id}
        }, {
         $addToSet: {upvoters: user._id},
         $inc: {votes: 1}
        });
    }, downVote: function(creatureId) {
        if(!Meteor.user()) {
            throw new Meteor.Error(401, "You need to login to vote");
        }
        Creatures.update({
          _id: creatureId, 
          downvoters: {$ne: Meteor.user()._id}
        }, {
          $addToSet: {downvoters: user._id},
          $inc: {votes: -1}
        });
    }
});