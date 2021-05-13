/* global */
var stamp; 
var stampOn = false;
var lines = [];
var brushes = [];
// var currentBrush;

var create = function(p){
  /* local global */
  p.pad;
  p.clearBut;
  p.saveBut;

  p.setup = () => {
    p.pad = p.select("#create")
    p.clearBut = p.select("#clear")
    p.saveBut = p.select("#save")
    p.cnvs = p.createCanvas(p.windowWidth / 2 , p.windowHeight / 2)
    p.cnvs.parent(p.pad)
  }

  p.windowResized = () => { 
    p.resizeCanvas(p.windowWidth / 2, p.windowHeight / 2)
  }

  p.draw = () =>{
    p.clearBut.mousePressed(() => {
      p.clear()
      lines = []
    })
    
    p.saveBut.mousePressed(() => {
      stamp = p.get();
      // currentBrush = stamp.canvas.toDataURL()
      var brushName = p.select("#bname").value()
      var newBrushButton = p.createButton(brushName).parent(p.select(".brushesMade")).class("brushBut")
      brushes.push({name: brushName, brush: stamp.canvas.toDataURL()})
    })     
    
    if (p.mouseIsPressed) {
      var line = new MyLine(p)
      lines.push(line)
    }
    
    for(var line of lines){
      line.show()
    }

  }
}

var createPad = new p5(create)


var test = function(p){
  /* local global */
  p.pad;
  p.clearBut;
  p.stampBut;
  p.saveBut;
  p.currentBrush;

  p.setup = () => {
    p.pad = p.select("#test")
    p.clearBut = p.select("#clear")
    p.stampBut = p.select("#stamp")
    p.saveBut = p.select("#save")
    p.cnvs = p.createCanvas(p.windowWidth / 2 , p.windowHeight / 2)
    p.cnvs.parent(p.pad)
    p.background(225)
  }

  p.windowResized = () => { 
    p.resizeCanvas(p.windowWidth / 2, p.windowHeight / 2)
    p.background(225)
  }

  p.draw = () => {
    for(var bb of p.selectAll(".brushBut")){
      bb.mousePressed(() => {
        var name = bb.html()
        for(var b of brushes){
          if(b.name == name){
            p.currentBrush =  p.loadImage(b.brush);
            console.log("switch")
            return;
          }
        }
      })
    }   

    p.clearBut.mousePressed(() => {
      p.background(225)
    })
        
    p.stampBut.mousePressed(() => {
      stampOn = true;
    })

    if(p.mouseIsPressed & stampOn){
      p.image(p.currentBrush, p.mouseX, p.mouseY, 50, 50)
    }
  }
}

var testPad = new p5(test)
