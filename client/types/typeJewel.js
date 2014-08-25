Template.typeJewel.typeClass = function() {
    if(this.type==="main") return "danger";
    if(this.type==="size") return "success";
    if(this.type==="sub") return "info";
    return "primary";
}