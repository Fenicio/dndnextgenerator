Template.type_edit.types = function() {
    return [
        "main", "size", "sub"
        ];
};

Template.type_edit.events({
    'click [name="xtra_action"]': function(e) {
        UI.insert(UI.render(Template.action_form), $('[name="actions"]')[0]);
    },
    'click [name="xtra_skill"]': function(e) {
        UI.insert(UI.render(Template.skill_form), $('[name="skills"]')[0]);
    },
    'click [name="xtra_trait"]': function(e) {
        UI.insert(UI.render(Template.trait_form), $('[name="traits"]')[0]);
    },
    'submit': function(e) {
        e.preventDefault();
        console.log(e);
    }
});