var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleground;
var cloudImage;
var cloud;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var obstacle;
var score;
var obstaclegroup,cloudsgroup;
var play=1;
var end=0;
var gamestate =play;
var trex_standing;
var gameOver,restart,gameOverImg,restartImg;
var checkpoint,die,jump;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");

  trex_standing=loadAnimation("trex1.png");

  groundImage = loadImage("ground2.png");

  cloudImage=loadImage("cloud.png");

obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");

gameOverImg=loadImage("gameOver.png");

restartImg=loadImage("restart.png");

checkpoint=loadSound("checkpoint.mp3");

die=loadSound("die.mp3");

jump=loadSound("jump.mp3");

}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("standing",trex_standing);
  trex.debug=false;
  trex.setCollider("rectangle",0,0,400,trex.height);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  ground=createSprite(130,180,400,10);
  ground.addAnimation("ground", groundImage);
  

  invisibleground=createSprite(200,190,400,5);
  invisibleground.visible=false;

  gameOver=createSprite(300,120,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

  restart=createSprite(300,150,40,40)
restart.addImage(restartImg);
  restart.scale=0.4
  restart.visible=false;

  score=0;

  cloudsgroup=new Group();
  obstaclegroup=new Group();
}


function draw(){
 
 
  //set background color 
  background("white");
  text("score"+score,500,50);
  
  
  //logging the y position of the trex
  console.log(trex.y)

  //stop trex from falling down
  trex.collide(invisibleground);
  drawSprites();

  if(gamestate===play){
    score=score+Math.round(getFrameRate()/60);

    ground.velocityX=-(3+score/300);

    //jump when space key is pressed
  if(keyDown("space")&&trex.y>150){
    trex.velocityY = -10;
    jump.play();
  }

if(score>0&&score%200==0){
checkpoint.play();
}

  trex.velocityY = trex.velocityY + 0.5;

  if(ground.x<0){
ground.x=ground.width/2
  }

  spawnobstacles(); 

  spawncloud();

  if(obstaclegroup.isTouching(trex)){
//gamestate=end;
die.play();
trex.velocityY=-12;

  }
  }

  if(gamestate===end){

 gameOver.visible=true;

restart.visible=true;

    ground.velocityX=0;

cloudsgroup.setLifetimeEach(-1);

obstaclegroup.setLifetimeEach(-1);

trex.changeAnimation("standing",trex_standing);

cloudsgroup.setVelocityXEach(0);

obstaclegroup.setVelocityXEach(0);
  }
  if(mousePressedOver(restart)){
    restartgame();
    }
}

function spawncloud(){
  if(frameCount%120==0){
    cloud=createSprite(600,100,20,20);
    cloud.velocityX=-2;
    cloud.addImage("cloud",cloudImage);
    cloud.scale=0.7;
    cloud.lifetime=300;
    cloud.y=Math.round(random(50,100));
    cloud.depth=trex.depth
    trex.depth=trex.depth+1

    cloudsgroup.add(cloud);
  }
}
function spawnobstacles(){
  if(frameCount%120==0){
obstacle=createSprite(600,165,20,20);
obstacle.velocityX=-(3+score/300);
var number=Math.round(random(1,6));
switch (number){
case 1:obstacle.addImage(obstacle1);break;
case 2:
obstacle.addImage(obstacle2);
break
case 3:
  obstacle.addImage(obstacle3);
  break
  case 4:
obstacle.addImage(obstacle4);
break
case 5:
obstacle.addImage(obstacle5);
break
case 6:
obstacle.addImage(obstacle6);
break
default:break
}
obstacle.scale=0.5;
obstacle.lifetime=200;

obstaclegroup.add(obstacle);
  }
}

function restartgame(){
score=0;
trex.changeAnimation("running",trex_running);
gamestate=play;
gameOver.visible=false;
restart.visible=false;
obstaclegroup.destroyEach();
cloudsgroup.destroyEach();
}