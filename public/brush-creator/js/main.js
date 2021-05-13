/* global */
var stamp = null; 
var stampIMG = null;
var testing = false;
var lines = [];
var brushes = [];
var defaultBrushes = [
  {
    name: 'none',
    draw: function(p){
      for(var line of lines){
        line.show()
      }
    }
  },
  {
    name: 'ellipse',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        p.ellipse(p.mouseX, p.mouseY, radius, radius)
      }
    }
  }, 
  {  
    name: 'wordbrush',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        let words = ["Collaborative", "Art" , "Ware","2021" ];
        let word = p.random(words);
        p.text(word, p.mouseX, p.mouseY, radius, radius)
      }
    }
  },
  {
    name: 'rectangle',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        p.rect(p.mouseX, p.mouseY, radius, radius)
      }
    }
  },
  {  
    name: 'linework',
    draw: function (p) {
      if (p.mouseIsPressed) {
        const radius = p.sin(p.frameCount * 0.1) * 40
        p.line(p.mouseX, p.mouseY, radius, radius)
      }
    }
}
]
var currBrush = defaultBrushes[0];

function updateBrush(bindex){
  currBrush = defaultBrushes[bindex];
}

var create = function(p){
  /* local global */
  p.pad;
  p.clearBut;
  p.saveBut;
  p.testBut;

  p.setup = () => {
    p.pad = p.select("#create")
    p.clearBut = p.select("#clear")
    p.saveBut = p.select("#save")
    p.testBut = p.select("#test")
    p.cnvs = p.createCanvas(p.windowWidth / 2 , p.windowHeight / 2)
    p.cnvs.parent(p.pad)
  }

  p.windowResized = () => { 
    p.resizeCanvas(p.windowWidth / 2, p.windowHeight / 2)
  }

  p.draw = () => {
    p.clearBut.mousePressed(() => {
      testing = false;
      p.clear()
      lines = []
    })

    p.testBut.mousePressed(() => {
      stamp = p.get().canvas.toDataURL();
      testing = true;
    })
    
    p.saveBut.mousePressed(() => {
      var brushName = p.select("#bname").value()
      stamp =  p.get().canvas.toDataURL() //base64encoding
      var newBrushButton = p.createImg(stamp).parent(p.select(".brushesMade"))
      newBrushButton.addClass("brushImg").id(brushName)
      brushes.push({name: brushName, brush: stamp})
      newBrushButton.mousePressed(()=>{
        var name = newBrushButton.id()
        for(var b of brushes){
          if(b.name == name){
            stamp = b.brush;
            return;
          }
        }
      })
    })     
    
    if (p.mouseIsPressed) {
      var line = new MyLine(p)
      lines.push(line)
    }
    
    // change / adjust code here to take in pre-define or differing shape?
    if(p.mouseIsPressed){
      currBrush.draw(p)
    }
  }
}

var createPad = new p5(create)


var test = function(p){
  /* local global */
  p.pad;
  p.clearBut;
  // p.testBut;

  p.setup = () => {
    p.pad = p.select("#test")
    p.clearBut = p.select("#clear")
    // p.testBut = p.select("#test")
    p.cnvs = p.createCanvas(p.windowWidth / 2 , p.windowHeight / 2)
    p.cnvs.parent(p.pad)
    p.background(225)
  }

  p.windowResized = () => { 
    p.resizeCanvas(p.windowWidth / 2, p.windowHeight / 2)
    p.background(225)
  }
 
  p.draw = () => {

    p.clearBut.mousePressed(() => {
      p.background(225)
    })
        
    if (testing){
      p.loadImage(stamp, stampIMG => {
        if(p.mouseIsPressed){
          p.image(stampIMG, p.mouseX, p.mouseY, 50, 50)
        }
      })
    }

  }
}

var testPad = new p5(test)
