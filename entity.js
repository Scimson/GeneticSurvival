function Entity(id){
    this.generation = -1;
    this.respawn();
}

Entity.prototype.respawn = function(){
    this.id = getNextId();
    this.pos = createVector(random(WIDTH), random(HEIGHT));
    this.generation += 1;
    this.genome = new Genome(this.genome);
    this.speed = random(0.5, 2);
    this.energy = 100;
    this.age = 0;
}

Entity.prototype.show = function(){
    fill(this.genome.color());
    ellipse(this.pos.x, this.pos.y, 2*this.getRadius());
}

Entity.prototype.reduce = function(){
    this.age += 1;
    this.radius *= 0.9;
}

Entity.prototype.getRadius = function(){
    return sqrt(this.energy)/2;
}

function findNearest(pos, resources){
    var resource = resources[0];
    var distance = pos.dist(resource.pos);
    for (var i = 0; i < resources.length; i++){
        var r = resources[i];
        var rdistance = pos.dist(r.pos);
        if (rdistance < distance){
            distance = rdistance;
            resource = r;
        }
    }
    return resource;
}

Entity.prototype.track = function(resources){
    var resource = findNearest(this.pos, resources);
    if (this.pos.dist(resource.pos) < this.getRadius() + resource.radius){
        var food = resource.consume();
        this.energy += 10*food;
    } else{
        if(this.energy <= 0){
            this.respawn();
        } else {
            var cost = this.energy < 100 ? 0.1 : this.energy * 0.001;
            this.energy -= cost;
            dir = resource.pos.copy();
            dir.sub(this.pos).normalize();
            dir.mult(this.speed);
            this.pos.add(dir);
        }
    }
}
