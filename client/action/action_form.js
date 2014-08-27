Template.action_form.selected = function(cad) {
    return cad===this.hit_stat ? "selected" : "";
}

Template.action_form.events({
    'click [name="removeAction"]': function(e) {
        e.preventDefault();
        UI.remove(UI._templateInstance().__view__.domrange);
    }
});