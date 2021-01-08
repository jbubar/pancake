class Chef extends WorldObject {
  constructor(...args) {
    super(...args);
    this.dir = Math.random() < 0.5 ? -1 : 1;
    this.vx = (Math.random() * 4 + 1) * this.dir
    this.collidedBefore = false;
  }
  shiftAroundWindow(pancake) {
    if (pancake.x > this.x + this.width) {
      this.x = pancake.x + width;
    }
    if (pancake.x + width < this.x) {
      this.x = pancake.x - this.width;
    }
  }
  move(){
      this.x += this.vx;
  }
  collide(pancake){
      if ( //290 is the original pancake's x value
        this.y <= pancake.y + pancake.height && 
        this.x - 290 <= pancake.x + pancake.width && (this.x + this.width - 290) >= pancake.x
      ){
        console.log("in the cheff!! we made it")
        pancake.y = this.y - pancake.height;
          pancake.vy = - Math.abs(2 * pancake.vy - 1);
          this.collidedBefore = true;
      }else{
        this.collidedBefore = false;
      }
  }
}
