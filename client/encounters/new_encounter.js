Template.new_encounter.rendered = function() {
  if(!Session.get("currentEncounter")) {
    Session.set("currentEncounter", generateRandomEncounter());
  }
};
Template.new_encounter.currentEncounter = function() {
  return Session.get("currentEncounter");
};

Template.new_encounter.events({
  'click input[name="generateEncounter"]': function (e) {
    e.preventDefault();
    Session.set("currentEncounter", generateRandomEncounter());
  },
  'click input[name="generateLeveledEncounter"]': function(e) {
    e.preventDefault();
    Session.set("currentEncounter", generateLeveledEncounter(parseInt($('[name="targetLevel"]').val())));
  }
});