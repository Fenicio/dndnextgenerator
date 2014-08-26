Template.type_edit.types = function() {
    return [
        {id: "main"}, {id: "sub"} //"size",
        ];
};

Template.type_edit.selected = function(cad) {
    console.log(this.id, cad);
    return cad===this.id ? "selected" : "";
};

Template.type_edit.STR = function() { console.log(this); return this.stats.STR; };
Template.type_edit.DEX = function() { return this.stats.DEX; };
Template.type_edit.CON = function() { return this.stats.CON; };
Template.type_edit.INT = function() { return this.stats.INT; };
Template.type_edit.WIS = function() { return this.stats.WIS; };
Template.type_edit.CHA = function() { return this.stats.CHA; };

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
                STR: parseInt($('[name="STR"]').val()),
                DEX: parseInt($('[name="DEX"]').val()),
                CON: parseInt($('[name="CON"]').val()),
                INT: parseInt($('[name="INT"]').val()),
                WIS: parseInt($('[name="WIS"]').val()),
                CHA: parseInt($('[name="CHA"]').val())
            },
            natural_armor: $('[name="natural_armor"]').val(),
            adjetives: $('[name="adjetives"]').val(),
            prefix: $('[name="prefix"]').val(),
            suffix: $('[name="suffix"]').val()
        };
        console.log(type);
        $('[name="actions"]').children().each(function(i, el) {
            el = $(el);
            var action = {
                name: el.find('[name="action_name"]').val(),
                action: el.find('[name="action_action"]').val(),
                hit_bonus: el.find('[name="action_hit_bonus"]').val(),
                hit_stat: el.find('[name="action_hit_stat"]').val(),
                text: el.find('[name="action_text"]').val()
            };
            type.actions.push(action);
        });
        $('[name="skills"]').children().each(function(i, el) {
            el = $(el);
            var skill = {
                name: el.find('[name="skill_name"]').val(),
                value: el.find('[name="skill_value"]').val() 
            };
            type.skills.push(skill);
        });
        $('[name="traits"]').children().each(function(i, el) {
            el = $(el);
            var trait = {
                name: el.find('[name="trait_name"]').val(),
                text: el.find('[name="trait_text"]').val()
            };
            type.traits.push(trait);
        });
        console.log(Router.current(),Router.routes['new_type']);
        if(Router.current() && Router.current().route.name===Router.routes['new_type'].name) {
            Meteor.call('type', type, function(error, typeId) {
                if(error) throw new Meteor.Error(error);
                console.log(error, typeId);
                Router.go('type', {_id: typeId});
            });
        } else {
            Meteor.call('updateType', type, this._id, function(error, typeId) {
               if(error) throw new Meteor.Error(error);
               console.log(error, typeId); 
               Router.go('type', {_id: typeId});
            });
        }
    }
});