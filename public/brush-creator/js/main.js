/* global */
var stamp = null; 
var stampIMG = null;
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
        p.line(p.mouseX, p.mouseY, p.mouseX + radius, p.mouseY + radius)
      }
    }
}
]
var currBrush = defaultBrushes[0];

function updateBrush(bindex){
  currBrush = defaultBrushes[bindex];
  stamp = null;
}

var create = function(p){
  /* local global */
  p.pad;
  p.clearBut;
  p.saveBut;

  p.setup = () => {
    p.pad = p.select("#create")
    p.clearBut = p.select("#clear")
    p.saveBut = p.select("#save")
    p.cnvs = p.createCanvas(p.windowHeight / 2 , p.windowHeight / 2)
    p.cnvs.parent(p.pad)
  }

  p.windowResized = () => { 
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
  }

  p.draw = () => {
    p.clearBut.mousePressed(() => {
      p.clear()
      lines = []
    })
    
    p.saveBut.mousePressed(() => {
      var brushName = p.select("#bname").value()
      var brushStamp = p.get().canvas.toDataURL() // base64 encoding
      var newBrushButton = p.createImg(brushStamp).addClass("brushImg").id(brushName).parent(p.select(".brushesContainer"))
      defaultBrushes.push({
        name: brushName,
        draw: function(p) {
          p.loadImage(brushStamp, brushImg => {
            if(p.mouseIsPressed){
              p.image(brushImg, p.mouseX, p.mouseY, 50, 50)
            }
          })
        }
      })

      newBrushButton.mousePressed(()=>{
        var name = newBrushButton.id()
        for(var b of defaultBrushes){
          if(b.name == name){
            currBrush = b;
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
      stamp = p.get().canvas.toDataURL();
    }
  }
}

var createPad = new p5(create)


var test = function(p){
  /* local global */
  p.pad;
  p.clearBut;

  p.setup = () => {
    p.pad = p.select("#test")
    p.clearBut = p.select("#clear")
    p.cnvs = p.createCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.cnvs.parent(p.pad)
    p.background(225)
  }

  p.windowResized = () => { 
    p.resizeCanvas(p.windowHeight / 2, p.windowHeight / 2)
    p.background(225)
  }
 
  p.draw = () => {

    p.clearBut.mousePressed(() => {
      p.background(225)
    })
    
    if(stamp){
      p.loadImage(stamp, stampIMG => {
        if(p.mouseIsPressed){
          p.image(stampIMG, p.mouseX, p.mouseY, 50, 50)
        }
      })
    }
  }
}

var testPad = new p5(test)
