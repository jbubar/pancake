let pancake;
let floor = [];
let floorBuffer;
let launcher;
let floorHeight;
let chefs = [];
let gameOver = false;
let groundLevel;
let endScreen;

function setup() {
	// createCanvas(windowWidth, windowHeight);
	let canvas = createCanvas(800, 450);
	canvas.parent("sketch")

	// creating floor
	let tileWidth = 100;
	floorHeight = 30;
	let numTiles = (width / tileWidth) + 1;
	groundLevel = height - floorHeight;
	for(let i = 0; i <= numTiles; i++) {
		floor.push(
      new FloorTile(
		numTiles,
		i * tileWidth,
        groundLevel,
        tileWidth,
		floorHeight
      )
    );
	}

	let numChefs = 10;
	for (let i = 0; i < numChefs; i++) {
		chefs.push(new Chef(500, groundLevel - 40, 20, 40));
	}

	launcher = new Launcher(floorHeight);
	pancake = new Pancake(floorHeight);
}

function draw() {
	background(0,255,255)
	pancake.show()
	if(!gameOver) pancake.move()
	push()
	translate(-pancake.x, 0)
	launcher.display(pancake)
	floor.forEach(tile => {
		tile.shiftAroundWindow(pancake);
		tile.show();
	})
	accelerate()
	fill(200, 200,10)
	chefs.forEach(chef => {
		chef.show()
		if(!gameOver) chef.move()
		chef.shiftAroundWindow(pancake)
		chef.collide(pancake)
	})
	pop()
	endGame();
}
function mouseClicked() {
	if(!launcher.fired){
		launcher.fire(pancake);
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW && pancake.onFloor()) {
		pancake.jump();
	}
	if(keyCode === 32){
		gameOver = gameOver ?  false : true
	}
} 

function accelerate() {
  if (keyIsDown(UP_ARROW)) {
    pancake.jump();
  } 
//   } else {
// 	  pancake.rest()
//   }
}
function endGame(){
	if(pancake.onFloor()){
		gameOver = true;
		if(!endScreen) {
			endScreen = createElement('div')
			endScreen.addClass("end-screen").id("end-screen")
			endScreen.parent("sketch")
			createElement("h1", "Game Over!").parent("end-screen");
			createElement("p", `Your score: ${Math.round(pancake.x)}`).parent("end-screen");
			createElement("button", "Play again!").parent("end-screen");
		}
	}
}