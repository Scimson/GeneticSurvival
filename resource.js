function Resource(){
    this.respawn();
}

Resource.prototype.respawn = function(){
    this.pos = createVector(random(WIDTH), random(HEIGHT));
    this.radius = random(5, 20);
    this.depleted = false;
}

Resource.prototype.consume = function(){
    if (this.depleted){
        return 0;
    }
    if (this.radius <= 0){
        this.depleted = true;
        return 0;
    }
    var amount = 0.1;
    this.radius -= amount;
    return amount;
}

Resource.prototype.deplete = function(){
    this.radius -= 0.01;
    if (this.depleted || this.radius <= 0){
        this.respawn();
    }
}

Resource.prototype.show = function(){
    fill(200,220,132);
    ellipse(this.pos.x, this.pos.y, 2*this.radius);
}
