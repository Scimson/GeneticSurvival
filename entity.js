function Entity(population){
    this.population = population;
    this.spawn();
}

Entity.prototype.spawn = function(parent){
    if (parent){
        this.genome = new Genome(parent.genome);
        this.generation = parent.generation + 1;
    }
    else {
        this.genome = new Genome();
        this.generation = 0;
    }
    this.id = this.population.getNextId();
    this.pos = createVector(random(WIDTH), random(HEIGHT));
    this.energy = 100;
    this.age = 0;
}

Entity.prototype.respawn = function(parent){
    this.spawn(this.population.getParent());
}

Entity.prototype.show = function(){
    this.age++;
    fill(this.genome.color());
    ellipse(this.pos.x, this.pos.y, 2*this.getRadius());
}

Entity.prototype.glow = function(){
    stroke(255,0,0);
    fill(color(255, 255, 102, 127));
    ellipse(this.pos.x, this.pos.y, 2*(this.getRadius() + 5));
    stroke(0);
    this.show();
}

Entity.prototype.reduce = function(){
    this.radius *= 0.9;
}

Entity.prototype.getRadius = function(){
    return sqrt(this.energy)/2;
}

Entity.prototype.findNearest = function(resources){
    var resource = resources[0];
    var distance = this.pos.dist(resource.pos);
    for (var i = 0; i < resources.length; i++){
        var r = resources[i];
        var rdistance = this.pos.dist(r.pos);
        if (rdistance < distance){
            distance = rdistance;
            resource = r;
        }
    }
    return resource;
}

Entity.prototype.track = function(resources){
    var resource = this.findNearest(resources);
    if (this.pos.dist(resource.pos) < this.getRadius() + resource.radius){
        var food = resource.consume();
        this.energy += 10*food;
    } else{
        if(this.energy <= 0){
            this.respawn();
        } else {
            var cost = pow(this.genome.speed(), 1.5) * (this.energy < 100 ? 0.05 : this.energy * 0.0005);
            this.energy -= cost;
            dir = resource.pos.copy();
            dir.sub(this.pos).normalize();
            dir.mult(this.genome.speed());
            this.pos.add(dir);
        }
    }
}
