class Launcher {
  constructor() {
    this.x = 300;
    this.y = 350;
    this.width = 25;
    this.length = 75;
    this.angle = 0;
    this.fired = false
    this.speed = 20;
  }
  // followMouse(){
  //   rotat
  // }
  display(pancake) {
    push();
    translate(this.x, this.y);
    this.angle = atan2(mouseY - this.y, mouseX - this.x + pancake.x);
    rotate(this.angle);
    rect(0, -this.width/2, this.length, this.width, 8);
    // rect(this.length, -this.width/2, this.width, this.width)
    ellipse(0, 0, this.width, this.width);
    if(!this.fired){
      // pancake.x = this.x/2 + this.width + pancake.width/2 + 5
      pancake.y = this.y - pancake.height/2
    }
    pop();
  }

  fire(pancake){
    pancake.vx = cos(this.angle) * this.speed;
    pancake.vy = sin(this.angle) * this.speed;
    this.fired = true;
    pancake.fired = true;
  }

}
