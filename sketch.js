var population;
var resources = [];

var WIDTH = 900;
var HEIGHT = 900;

var ID = -1;

function getNextId(){
    ID += 1;
    return ID;
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    population = new Population(200);
    for (var i = 0; i < 60; i++){
        resources.push(new Resource());
    }
    frameRate(60);
}



function draw() {
    clear();
    background(200);
    population.sort();
    population.track(resources);
    resources.map(function (r){r.deplete();});
    population.show();
    resources.map(function (r){r.show();});
}
