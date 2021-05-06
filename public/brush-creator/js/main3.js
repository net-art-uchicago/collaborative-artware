/* global */
var canvas;
var drawing = [];
var currentPath = [];


function setup () {
  canvas = createCanvas(window.innerWidth / 2 , window.innerHeight / 2).parent(drawingPads)
  canvas.mousePressed(startPath);
  var saveButton = select("#save");
  saveButton.mousePressed(saveDrawing);
}

function windowResized () { 
  resizeCanvas(window.innerWidth / 2, window.innerHeight / 2)
}

function startPath(){
    currentPath = [];
    drawing.push(currentPath);
}

function draw () {
    if(mouseIsPressed){
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }
    stroke(255);
    for(var i = 0; i < drawing.length; i++){
        var path = drawing[i];
        beginShape();
        for(var j=0; j < path.length; j++){
            vertex(path[j].x, path[j].y)
        }
        endShape();
    }

}

function saveDrawing() {
    var brush = {
        name: "",
        drawing: drawing
    }
}