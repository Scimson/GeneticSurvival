function Population(size){
    this.size = size;
    this.ids = -1;
    this.entities = [];
    this.spawn();
}

Population.prototype.getNextId = function(){
    return ++this.ids;
}

Population.prototype.spawn = function(){
    for (var i = 0; i < this.size; i++){
        this.entities.push(new Entity(this));
    }
}

Population.prototype.show = function(){
    if(this.entities.length > 0){
        for (var i = 1; i < this.entities.length; i++){
            this.entities[i].show();
        }
        this.entities[0].glow();
    }
}

Population.prototype.track = function(resources){
    this.entities.map(function (e){e.track(resources);});
}

Population.prototype.sort = function() {
    this.entities.sort(entityCompare);
}

Population.prototype.getParent = function(){
    if(this.entities.length > 0){
        var max = Math.cbrt(this.size);
        var pindex = floor(pow(random(0, max), 3));
        var parent = this.entities[pindex];
        console.log("Parent: Rank: " + pindex + " ID: " + parent.id + " Gen: " + parent.generation + " Age: " + parent.age);
        return parent;
    }
    return null;
}

// ## Helper Methods ##
function entityCompare(e1, e2){
    if((e1.age > e2.age) || (e1.age == e2.age && e1.energy > e2.energy)){
        return -1;
    }
    else if(e1.age == e2.age && e1.energy == e2.energy){
        return 0;
    }
    else{
        return 1;
    }
}
