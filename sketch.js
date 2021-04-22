var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";



function preload()
{
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  doorsGroup=new Group();
  climberImg = loadImage("climber.png");
  climbersGroup = new Group();
   ghostImg = loadImage("ghost-standing.png");
    invisibleBlockGroup = new Group();
    spookySound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
    //spookySound.loop();
}
function draw()
{
  
  background(0);
    if (gameState === "play")
        {
  
  if(tower.y>500)
    {
      tower.y=400;
    }
  
  if(keyDown("left_arrow"))
    {
      ghost.x=ghost.x-3;
    }
  if(keyDown("right_arrow")){
  ghost.x = ghost.x + 3;
}
  
    if(keyDown("space")){
      ghost.velocityY = - 3;
    }
  
ghost.velocityY = ghost.velocityY + 0.1
    spawnDoors();

    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
  

  drawSprites();
}
    if (gameState === "end"){
      
       stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over", 230,250)
    }
  
}

function spawnDoors(){
  //write a code to spawn the doors in the tower
  if(frameCount%240===0)
    {
     var door= createSprite(200,-50);
      door.addImage(doorImg);
      door.x=Math.round(random(120,400));
      door.velocityY=1;
      
      var climber = createSprite(200,10);
      climber.addImage(climberImg);
      
      climber.x = door.x;
      climber.velocityY = 1;
      
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
     invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
      
      ghost.depth = door.depth;
      ghost.depth +=1;
      
      //assign lifetime to variable
      door.lifetime=800;
      climber.lifetime = 800;
      invisibleBlock.lifetime = 800;
      
      //add each door to the group
      doorsGroup.add(door);
      climbersGroup.add(climber);
       invisibleBlock.debug = true;
      invisibleBlockGroup.add(invisibleBlock);
     }
  
}