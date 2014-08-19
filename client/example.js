if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to example.";
  };

  Template.hello.currentMonster = function() {
    //return JSON.stringify(Session.get("currentMonster"));
    return Session.get("currentMonster");
  }
  Template.hello.events({
    'click input': function () {
      Session.set("currentMonster", generateRandomMonster());
    },
    'click button': function(e) {
      e.preventDefault();
      Session.set("currentType", getRandomFromCollection(Types, {}, 1));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
