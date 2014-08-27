Template.new_monster.events({
  'click input[name="generateMonster"]': function () {
    Session.set("currentMonster", generateRandomMonster());
  },
  'click [name="saveMonster"]': function(e) {
    e.preventDefault();
    var monster = Session.get("currentMonster");
    if(!Array.isArray(monster.pictures)) monster.pictures=[];
    console.log("picture", $('canvas')[0].toDataURL());
    monster.pictures.push($('canvas')[0].toDataURL());
    Meteor.call('creature', monster, function(err, monsterId) {
      console.log(err, monsterId);
      if(err) throw err;
      Router.go("monster", {_id: monsterId});
    });
  }
});

Template.new_monster.currentMonster = function() {
  return Session.get("currentMonster");
}
