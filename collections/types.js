/*
Attacks on types can have these descriptors/templates:
{{min-damage}}
{{avg-damage}}
{{max-damage}}

{ name: '',
   type: 'main',
   traits: [],
   actions: [],
   skills: [],
   stats: { STR: '', DEX: '', CON: '', INT: '', WIS: '', CHA: '' },
   natural_armor: '',
   adjetives: '',
   prefix: '',
   suffix: '' }
   
*/

Types = new Meteor.Collection('types');

Types.allow({
    insert: function() {
        return true; //Meteor.userId()!==null;
    }, update: function() {
        return Meteor.userId()!==null;
    }, remove: function() {
        return false; //not yet
    }
})

Meteor.methods({
    type: function(typeAttr) {
        check(typeAttr.name, String);
        if(typeAttr.name.trim()==="") throw new Meteor.Error("303", "A type must be named");
        
        type = {
            name: typeAttr.name,
            type: typeAttr.type,
            actions: typeAttr.actions,
            traits: typeAttr.traits,
            skills: typeAttr.skills,
            stats: typeAttr.stats,
            natural_armor: typeAttr.natural_armor,
            adjetives: typeAttr.adjetives.split(',').map(function(el) { return el.trim() }),
            prefix: typeAttr.prefix.split(',').map(function(el) { return el.trim() }),
            suffix: typeAttr.suffix.split(',').map(function(el) { return el.trim() })
        };
        return Types.insert(type);
    },
    updateType: function(typeAttr, _id) {
        check(_id, String);
        check(typeAttr.name, String);
        if(typeAttr.name.trim()==="") throw new Meteor.Error("303", "A type must be named");
        
        type={
            name: typeAttr.name,
            type: typeAttr.type,
            actions: typeAttr.actions,
            traits: typeAttr.traits,
            skills: typeAttr.skills,
            stats: typeAttr.stats,
            natural_armor: typeAttr.natural_armor,
            adjetives: typeAttr.adjetives.split(',').map(function(el) { return el.trim() }),
            prefix: typeAttr.prefix.split(',').map(function(el) { return el.trim() }),
            suffix: typeAttr.suffix.split(',').map(function(el) { return el.trim() })
        };
        Types.update({_id: _id }, type);
        return _id;
    }
});