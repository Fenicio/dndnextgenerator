Template.trait_form.events({
    'click [name="removeTrait"]': function(e) {
        e.preventDefault();
        UI.remove(UI._templateInstance().__view__.domrange);
    }
})