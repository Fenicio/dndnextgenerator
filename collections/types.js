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
        if(parseInt(type.stats.STR)===NaN) type.stats.STR=0;
        if(parseInt(type.stats.DEX)===NaN) type.stats.DEX=0;
        if(parseInt(type.stats.CON)===NaN) type.stats.CON=0;
        if(parseInt(type.stats.INT)===NaN) type.stats.INT=0;
        if(parseInt(type.stats.WIS)===NaN) type.stats.WIS=0;
        if(parseInt(type.stats.CHA)===NaN) type.stats.CHA=0;
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
        if(parseInt(type.stats.STR)===NaN) type.stats.STR=0;
        if(parseInt(type.stats.DEX)===NaN) type.stats.DEX=0;
        if(parseInt(type.stats.CON)===NaN) type.stats.CON=0;
        if(parseInt(type.stats.INT)===NaN) type.stats.INT=0;
        if(parseInt(type.stats.WIS)===NaN) type.stats.WIS=0;
        if(parseInt(type.stats.CHA)===NaN) type.stats.CHA=0;
        Types.update({_id: _id }, type);
        return _id;
    }
});