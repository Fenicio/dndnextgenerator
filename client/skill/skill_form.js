Template.skill_form.events({
    'click [name="removeSkill"]': function(e) {
        e.preventDefault();
        UI.remove(UI._templateInstance().__view__.domrange);
    }
})