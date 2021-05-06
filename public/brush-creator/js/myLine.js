class MyLine {
    constructor(p){
        this.p = p;
        this.x = p.pwinMouseX;
        this.y = p.pwinMouseY;
        this.x2 = p.winMouseX;
        this.y2 = p.winMouseY;
    }
    

    show () {
        this.p.stroke(0)
        this.p.line(this.x, this.y, this.x2, this.y2)
    }
}