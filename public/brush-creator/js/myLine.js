class MyLine {
    constructor(mX, mY){
        this.x = pwinMouseX;
        this.y = pwinMouseY;
        this.x2 = winMouseX;
        this.y2 = winMouseY;
    }
    

    show () {
        stroke(0)
        line(this.x, this.y, this.x2, this.y2)
    }
}