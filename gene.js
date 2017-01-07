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
    this.color_gene = new ColorGene();
}

Genome.prototype.mutate = function(parent){
    this.color_gene = new ColorGene(parent.color_gene);
}

// ## Data Methods ##

Genome.prototype.color = function(){
    var cg = this.color_gene;
    return color(cg.r, cg.g, cg.b, 200);
}

// ### Genes ###

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
