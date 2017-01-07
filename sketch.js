var e;
var entities = [];
var resources = [];
var r;

var WIDTH = 1000;
var HEIGHT = 1000;

var ID = -1;

function getNextId(){
    ID += 1;
    return ID;
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    for (var i = 0; i < 15; i++){
        resources.push(new Resource());
    }
    for (var i = 0; i < 50; i++){
        entities.push(new Entity());
    }
    frameRate(60);
}



function draw() {
    clear();
    background(200);
    entities.map(function (e){e.track(resources);});
    resources.map(function (r){r.deplete();});
    entities.map(function (e){e.show();});
    resources.map(function (r){r.show();});
}
