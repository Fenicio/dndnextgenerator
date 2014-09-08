Template.new_encounter.rendered = function() {
  if(!Session.get("currentEncounter")) {
    Session.set("currentEncounter", generateRandomEncounter());
  }
};

Template.new_encounter.events({
  'click input[name="generateEncounter"]': function () {
    Session.set("currentEncounter", generateRandomEncounter());
  }
});