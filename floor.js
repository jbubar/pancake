class FloorTile extends WorldObject {
  constructor(numTiles, ...args) {
    super(...args);
    this.numTiles = numTiles;
  }
  shiftAroundWindow(pancake) {
    if (pancake.x > this.x + this.width) {
      this.x += this.numTiles * this.width;
    }
    if (pancake.x + width < this.x) {
      this.x -= this.numTiles * this.width;
    }
  }
}