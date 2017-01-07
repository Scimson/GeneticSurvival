// #### Genome ####

function Genome(parent){
    if (parent){
        this.mutate(parent);
    }
    else{
        this.randomize();
    }
}

// ## Creation Methods ##

Genome.prototype.randomize = function(){
    this.colorGene = new ColorGene();
    this.abilityGene = new AbilityGene();
}

Genome.prototype.mutate = function(parent){
    this.colorGene = new ColorGene(parent.colorGene);
    this.abilityGene = new AbilityGene(parent.abilityGene);
}

// ## Data Methods ##

Genome.prototype.color = function(){
    var cg = this.colorGene;
    return color(cg.r, cg.g, cg.b, 200);
}

Genome.prototype.speed = function(){
    return this.abilityGene.speed;
}

// ### Genes ###

function AbilityGene(parent){
    if (parent){
        this.speed = parent.speed*random(0.95, 1.05);
    }
    else{
        this.speed = random(0.5, 2);
    }
}

function ColorGene(parent){
    if (parent){
        this.r = random(-1 ,2) + parent.r;
        this.r = this.r > 255 ? 255 : this.r;
        this.r = this.r < 0 ? 0 : this.r;
        this.r = floor(this.r);
        this.g = random(-1 ,2) + parent.g;
        this.g = this.g > 255 ? 255 : this.g;
        this.g = this.g < 0 ? 0 : this.g;
        this.g = floor(this.g);
        this.b = random(-1 ,2) + parent.b;
        this.b = this.b > 255 ? 255 : this.b;
        this.b = this.b < 0 ? 0 : this.b;
        this.b = floor(this.b);
    }
    else{
        this.r = floor(random(0,256));
        this.g = floor(random(0,256));
        this.b = floor(random(0,256));
    }
}
