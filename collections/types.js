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

//TODO skills arent getting right
Meteor.methods({
    type: function(typeAttr) {
        check(typeAttr.name, String);
        if(typeAttr.name.trim()==="") throw new Meteor.Error("303", "A type must be named");
        
        var skills = {};
        typeAttr.skills.forEach(function(el,i) { 
            skills[el.name]=el.value; 
        });
        var type = {
            name: typeAttr.name,
            type: typeAttr.type,
            actions: typeAttr.actions,
            traits: typeAttr.traits,
            skills: skills,
            stats: typeAttr.stats,
            natural_armor: typeAttr.natural_armor,
            adjetives: typeAttr.adjetives.split(',').map(function(el) { return el.trim() }),
            prefix: typeAttr.prefix.split(',').map(function(el) { return el.trim() }),
            suffix: typeAttr.suffix.split(',').map(function(el) { return el.trim() })
        };
        if(isNaN(parseInt(type.stats.STR))) type.stats.STR=0;
        if(isNaN(parseInt(type.stats.DEX))) type.stats.DEX=0;
        if(isNaN(parseInt(type.stats.CON))) type.stats.CON=0;
        if(isNaN(parseInt(type.stats.INT))) type.stats.INT=0;
        if(isNaN(parseInt(type.stats.WIS))) type.stats.WIS=0;
        if(isNaN(parseInt(type.stats.CHA))) type.stats.CHA=0;
        return Types.insert(type);
    },
    updateType: function(typeAttr, _id) {
        check(_id, String);
        check(typeAttr.name, String);
        if(typeAttr.name.trim()==="") throw new Meteor.Error("303", "A type must be named");
        
        var skills = {};
        typeAttr.skills.forEach(function(el,i) { 
            skills[el.name]=el.value; 
        });
        
        var type={
            name: typeAttr.name,
            type: typeAttr.type,
            actions: typeAttr.actions,
            traits: typeAttr.traits,
            skills: skills,
            stats: typeAttr.stats,
            natural_armor: typeAttr.natural_armor,
            adjetives: typeAttr.adjetives.split(',').map(function(el) { return el.trim() }),
            prefix: typeAttr.prefix.split(',').map(function(el) { return el.trim() }),
            suffix: typeAttr.suffix.split(',').map(function(el) { return el.trim() })
        };
        if(isNaN(parseInt(type.stats.STR))) type.stats.STR=0;
        if(isNaN(parseInt(type.stats.DEX))) type.stats.DEX=0;
        if(isNaN(parseInt(type.stats.CON))) type.stats.CON=0;
        if(isNaN(parseInt(type.stats.INT))) type.stats.INT=0;
        if(isNaN(parseInt(type.stats.WIS))) type.stats.WIS=0;
        if(isNaN(parseInt(type.stats.CHA))) type.stats.CHA=0;
        Types.update({_id: _id }, type);
        return _id;
    }
});