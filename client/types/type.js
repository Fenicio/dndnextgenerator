Template.type.stats = function() {
    console.log(this);
    return objectToArray(this.stats);
}
Template.type.skills = function() {
    return objectToArray(this.skills);
}
Template.type.isNotSize = function() {
    return this.type!=="size";
}