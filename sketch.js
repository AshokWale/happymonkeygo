
var monkey , monkey_running
var banana ,bananaImage, obstacle, stoneImage
var FoodGroup, obstacleGroup
var score=0;
var survivalTime=0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,300);

  monkey = createSprite(50,240,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.09;

  ground = createSprite(100,280,1000,10);
  ground.x = ground.width /2;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
}

function draw() {
 background("lightgreen");
     stroke("white");
     textSize(20);
     fill("white");
     text("score:"+score,400,30);
  
     stroke("black");
     textSize(18);
     fill("black");
     survivalTime=Math.ceil(frameCount/frameRate())
     text("survival Time:"+survivalTime,20,30);
  
  ground.velocityX = -4;
  if(ground.x<0){
     ground.x = ground.width/2;
  }
  if(keyDown("space") && monkey.y>180){
    monkey.velocityY = -10;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  
  if(monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach();
  }
  monkey.collide(ground);
  SpawnFood();
  Spawnobstacle();
 
  if(monkey.isTouching(obstacleGroup)){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function SpawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(500,120,40,10);
    banana.y = Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -(5 + 2* score/10);
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    FoodGroup.add(banana);
  }
}
function Spawnobstacle(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(500,255,30,50);
   obstacle.addImage(stoneImage);
   obstacle.scale = 0.16;
   obstacle.velocityX = -(5+score/6);
   obstacle.lifetime = 200;
   
   obstacleGroup.add(obstacle);
 }
}



 