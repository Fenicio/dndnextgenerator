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
    'click [name="save"]': function(e) {
        e.preventDefault();
        var type = {
            name: $('[name="name"]').val(),
            type: $('[name="type"]').val(),
            traits: [],
            actions: [],
            skills: [],
            stats: {
                STR: $('[name="STR"]').val(),
                DEX: $('[name="DEX"]').val(),
                CON: $('[name="CON"]').val(),
                INT: $('[name="INT"]').val(),
                WIS: $('[name="WIS"]').val(),
                CHA: $('[name="CHA"]').val()
            },
            natural_armor: $('[name="natural_armor"]').val(),
            adjetives: $('[name="adjetives"]').val(),
            prefix: $('[name="prefix"]').val(),
            suffix: $('[name="suffix"]').val()
        };
        console.log(type);
        $('[name="actions"]').children().each(function(el, i) {
            var action = {
                name: el.find('[name="action_name"]').val(),
                action: el.find('[name="action_action"]').val(),
                hitBonus: el.find('[name="action_hitbonus"]').val(),
                text: el.find('[name="action_text"]').val()
            };
            type.actions.push(action);
        });
        $('[name="skills"]').children().each(function(el, i) {
            var skill = {
                name: el.find('[name="skill_name"]').val(),
                value: el.find('[name="skill_value"]').val() 
            };
            types.skills.push(skill);
        });
        $('[name="traits"]').children().each(function(el, i) {
            var trait = {
                name: el.find('[name="trait_name"]').val(),
                text: el.find('[name="trait_text"]').val()
            };
            type.traits.push(trait);
        });
        Meteor.call('type', type, function(error, typeId) {
            console.log(error, typeId);
        });
    }
});