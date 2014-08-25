Template.new_monster.events({
  'click input': function () {
    Session.set("currentMonster", generateRandomMonster());
  }
});

Template.new_monster.currentMonster = function() {
  return Session.get("currentMonster");
}