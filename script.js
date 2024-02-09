//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject, backgroundImg;
let score = 0;
let catcherImg, fallingObjectImg;

/* PRELOAD LOADS FILES */
function preload(){
  fallingObjectImg = loadImage("576AAF6D-CE0E-48FF-A107-B017A1484F75-removebg-preview.png");
  catcherImg = loadImage("IMG_8626.PNG");
  backgroundImg = loadImage("pixel77-free-vector-background-1202-400.jpeg"); 
  
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  //Resize images
  fallingObjectImg.resize(35, 0);
  catcherImg.resize(80, 0);
  backgroundImg.resize(400,0)
  
  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 360, "k");
  catcher.color = color(95, 158, 160);
  
  //Create falling object
  fallingObject = new Sprite(fallingObjectImg,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2; 
  fallingObject.rotationLock = true; 
}

/* DRAW LOOP REPEATS */
function draw() {
    background(224,224,224);

  //Draw background image
  image(backgroundImg, 1, 1);
  
  // Draw directions to screen
  fill("white");
  textSize(12);
  text("Move me with \nthe left and right \narrow keys to \ncatch my falling \ndog!", width-100, 20);

  // Add Title
  fill("red")
  textSize(15)
   text("Yuliana's Adventure", 130, 30);
   text("Game", 180, 46)
   

 // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
  fallingObject.vel.y = random(1, 5);

//Mild
    score = score - 1;  
  }
    
  // Move catcher
   if (kb.pressing("left")) {
     catcher.vel.x = -3;  
   } else if (kb.pressing ("right")) {
     catcher.vel.x = 3;  
   } else {
     catcher.vel.x = 0;
   }
  
  // Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }
    
  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = "down";
    score = score + 1;
  }

  // Draw the score to screen
  fill("white");
  textSize(20);
  text("Score = " + score, 10, 30);

  //Spicy - Check to see if player won
  if (score == 15) {
    youWin();

    // Restart the game if player clicks the mouse
    if (mouseIsPressed) {
      restart();
    }
  }
}

/* FUNCTIONS */

//Spicy
function youWin() {
  background(backgroundImg,224,224);
  
  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  //Draw end of game text
  textSize(20);
  fill("black");
  text("You win!", width/2 - 50, height/2 - 30); 
  textSize(12);
  text("Phew, that was a a close one! Thank you \nfor helping me get my dog back! Click the \nmouse anywhere to play again.", width/2 - 120, height/2);
}

//Spicy 
function restart() {
  //Reset score
  score = 0;

  //Reset sprites
  catcher.pos = { x: 200, y: 360 };
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.velocity.y = random(1,5);
  fallingObject.direction = "down";
}
