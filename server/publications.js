Meteor.publish("creatures", function() {
    return Creatures.find({});
});
Meteor.publish("creature", function(id) {
    return Creatures.find({_id: id});
});
Meteor.publish("types", function() {
    return Types.find({});
});
Meteor.publish("type", function(id) {
    return Types.find({_id: id});
});