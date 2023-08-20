//declaring variables

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

//function to load images and sound
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  //creating tower sprite
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //creating ghost sprite
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  //creating rectangle sprite for "play again" button
  r= createSprite(300,300,100,50);
  r.shapeColor = color("red");
  r.visible = false;
  //creating groups
  invisibleBlockGroup = new Group(); 
  doorsGroup = new Group();
  climbersGroup = new Group(); 

}

function draw() {
  background(towerImg);
  

  if(gameState == 'play'){
    //making tower to go down limitlessly
    if(tower.y > 400){
        tower.y = 300
      }
    

    //adding key commands
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }


    //touching conditions
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }

    ghost.velocityY = ghost.velocityY + 0.8;
    spookySound.loop();


    spawnDoors();
    drawSprites();
  }

  if(gameState == "end"){
    textSize(50);
    fill("red");
    text("GAME OVER",150,250);

    if(mousePressedOver(r)){
      reset();
    }
  }

}

function reset(){
  gameState = "play";
}

function spawnDoors(){
  if( frameCount%240 === 0 ){
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);

    climber.addImage(climberImg);
    door.addImage(doorImg);

    door.x = Math.round(random(80,400));
    door.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    door.lifetime = 800;

    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;

    climbersGroup.add(climber);
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

