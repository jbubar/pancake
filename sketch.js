let pancake;
let floor;
let floorBuffer;
let launcher;
let floorHeight;
let chefs;
let gameOver;
let groundLevel;
let endScreen;
let score = 0;
let highScore  = score;
let displayScore;


function setup() {
	// createCanvas(windowWidth, windowHeight);
	gameOver = false;
	floor = [];
	chefs = [];
	let canvas = createCanvas(window.innerWidth, 450);
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

	let numChefs = Math.round(width/80);
	for (let i = 0; i < numChefs; i++) {
		chefs.push(new Chef(500, groundLevel - 40, 20, 40));
	}

	launcher = new Launcher(floorHeight);
	pancake = new Pancake(floorHeight);

	setInterval(() => {
		if(chefs.length > 1 && !gameOver){
			chefs.pop();
			score += 1000;
		}
	}, 3000);
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
	score = pancake.x
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
		if(!endScreen) {
			endScreenContainer = createElement('div')
			endScreenContainer.addClass("end-screen-container").id("end-screen-container")
			endScreenContainer.parent("sketch")
			endScreen = createElement("div");
			endScreen.addClass("end-screen").id("end-screen");
			endScreen.parent("end-screen-container");
			createElement("h1", "Game Over!").parent("end-screen");
			displayScore = createElement(
				"p",
				`Your score: ${Math.round(score)}`
			).parent("end-screen");
			displayScore.html(`Your score: ${Math.round(score)}`);
			let button = createElement("button", "Play again!").parent("end-screen");
			button.mousePressed(startGame);
		}else if(!gameOver){
			endScreenContainer.show();
			displayScore.html(`Your score: ${Math.round(score)}`);
		}
		gameOver = true;
	}
}
function startGame(){
	endScreenContainer.hide();
	setup();
}