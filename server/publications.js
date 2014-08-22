Meteor.publish("creatures", function() {
    return Creatures.find({});
});
Meteor.publish("types", function() {
    return Types.find({});
});