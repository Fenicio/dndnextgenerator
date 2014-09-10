generateRandomTrap= function(CR) {
    return generateUnfunTrap(CR);
};

generateUnfunTrap = function(CR) {
    return fillTrap({
        name: "Generic unfun trap",
        description: "This is a hidden pit",
        trigger: "Someone steps on it",
        hit: "Every creature stepping on this pit falls taking {{solo-damage}} damage",
        text: "The pit can be avoided by flying and not stepping on it"
    }, CR);
};

fillTrap = function(trap, CR) {
    var min_damage = number_to_dice(CR*3);
    var avg_damage = number_to_dice(CR*5);
    var hard_damage = number_to_dice(CR*8);
    var solo_damage = number_to_dice(CR*12);
    trap.hit=trap.hit.replace(/{{min-damage}}/g, min_damage);
    trap.hit=trap.hit.replace(/{{avg-damage}}/g, avg_damage);
    trap.hit=trap.hit.replace(/{{hard-damage}}/g, hard_damage);
    trap.hit=trap.hit.replace(/{{solo-damage}}/g, solo_damage);
    trap.text=trap.text.replace(/{{min-damage}}/g, min_damage);
    trap.text=trap.text.replace(/{{avg-damage}}/g, avg_damage);
    trap.text=trap.text.replace(/{{hard-damage}}/g, hard_damage);
    trap.text=trap.text.replace(/{{solo-damage}}/g, solo_damage);
    return trap;
};