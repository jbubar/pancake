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
let started = false;


function setup() {
	let canvas = createCanvas(800, 450);
  	canvas.parent("sketch");
	instructions()

}
function instructions(){
	startScreenContainer = createElement("div");
	startScreenContainer
		.addClass("start-screen-container")
		.id("start-screen-container");
	startScreenContainer.parent("sketch");
	startScreen = createElement("div");
	startScreen.addClass("start-screen").id("start-screen");
	startScreen.parent("start-screen-container");
	createElement("h1", "Instructions").parent("start-screen");
	instruction = createElement(
    "p",
    `Welcome to the pancake game!<br/> <br/>
			Click to launch the pancake, and guide it's flight with your mouse<br/><br/>
			Try not to touch to ground`
  ).parent("start-screen");
	// displayScore.html(`Your score: ${Math.round(score)}`);
	if(!started){
		let button = createElement("button", "Play!").parent("start-screen");
		button.mousePressed(startGame);
	}
	else {
		let button = createElement("button", "Continue").parent("start-screen");
    	button.mousePressed(()=>{gameOver = false;});
	}
}

function play(){
  gameOver = false;
  floor = [];
  chefs = [];
  

  // creating floor
  let tileWidth = 100;
  floorHeight = 30;
  let numTiles = width / tileWidth + 1;
  groundLevel = height - floorHeight;
  for (let i = 0; i <= numTiles; i++) {
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

  let numChefs = Math.round(width / 80);
  for (let i = 0; i < numChefs; i++) {
    chefs.push(new Chef(500, groundLevel - 40, 20, 40));
  }

  launcher = new Launcher(floorHeight);
  pancake = new Pancake(floorHeight);

  setInterval(() => {
    if (chefs.length > 1 && !gameOver) {
      chefs.pop();
      score += 1000;
    }
  }, 3000);
}

function draw() {
	if(started){
		runGame();
	} 
}
function runGame(){
	background(0, 255, 255);
    pancake.show();
    if (!gameOver) pancake.move();
    push();
    translate(-pancake.x, 0);
    launcher.display(pancake);
    floor.forEach((tile) => {
      tile.shiftAroundWindow(pancake);
      tile.show();
    });
    score = pancake.x;
    accelerate();
    fill(200, 200, 10);
    chefs.forEach((chef) => {
      chef.show();
      if (!gameOver) chef.move();
      chef.shiftAroundWindow(pancake);
      chef.collide(pancake);
    });
    pop();
    endGame();
}
function mouseClicked() {
	if(started && !launcher.fired){
		launcher.fire(pancake);
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW && pancake.onFloor()) {
		pancake.jump();
	}
	if(keyCode === 32){
		if(gameOver){
			gameOver = false;
			// button.show()
			startScreenContainer.hide()
		} else {
			gameOver = true;
			startScreenContainer.show()
			// button.hide()
		}
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
		started = false;
		launcher.fired = false;
		gameOver = true;
	}
}
function startGame(){
	if(!gameOver){
		startScreenContainer.hide();
	} else {
		endScreenContainer.hide();
	}
	play();
	setTimeout(() => {
    started = true;
  }, 10);
}