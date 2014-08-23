console.log(this);
console.log(Layout);
if (Meteor.isClient) {
  Template.hello.currentMonster = function() {
    return Session.get("currentMonster");
  }
  Template.hello.typesList = function() {
    return Types.find({});
  };
  Template.hello.events({
    'click input': function () {
      Session.set("currentMonster", generateRandomMonster());
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
