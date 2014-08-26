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

Meteor.methods({
    type: function(typeAttr) {
        console.log(typeAttr);
    
        return typeAttr;
    }
});