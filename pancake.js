class Pancake{
    constructor(floorHeight){
        // this.pos = createVector(50, height);
        // this.vel = createVector(0, 0);
        // this.acc = createVector(0, 0);
        this.x = 0;
        this.y = height - 300;
        this.width = 20
        this.height = 10;
        this.floorHeight = floorHeight
        this.vx = 0;
        this.vy = 0;
        this.gravity = 0.2;
        this.angle;
        this.followSpeed = .1;
        this.fired = false;
        this.vxMax = 20; 
        this.vxMin = -10;
        this.vyMax = 5; 
        this.vyMin = -15;
    }
    show(){
        rect(290, this.y, this.width, this.height)
    }
    move(){
        console.log(this.x)
        this.x += this.vx
        this.y += this.vy
        this.vy += this.gravity
        this.y = constrain(this.y, 0, height - this.floorHeight - this.height)
        if(this.fired) this.followMouse()
        if(this.vx > this.vxMax) this.vx = this.vxMax;
        if(this.vx < this.vxMin) this.vx = this.vxMin;
        if(this.vy > this.vyMax) this.vy = this.vyMax;
        if(this.vy < this.vyMin) this.vy = this.vyMin;
        // console.log(this.vy);
    }
    onFloor(){
        if(this.y >= height - (this.height + this.floorHeight)) return true;
        return false;
    }
    followMouse(){
        this.angle = atan2(mouseY - this.y, mouseX - 200);
        // this.vx += cos(this.angle) * .4;
        this.vy += sin(this.angle) * this.followSpeed;
        this.vx += (mouseX - 290) / 300
    }
    jump(){
        this.vy = -5
    }
    mvRight(){
        this.vx = 5;
    }
    mvLeft(){
        this.vx = -5;
    }
    rest(){
        this.vx = 0;
    }
}