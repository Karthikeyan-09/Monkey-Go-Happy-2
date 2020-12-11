
var monkey , monkey_running;
var jungle, jungleImage;
var bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup, monkey_stop;
var score = 0;
var life = 2;
var gameState = "PLAY";
function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png");
    monkey_stop = loadAnimation("Monkey_01.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 jungleImage = loadAnimation("jungle.jpg");

}



function setup() {
createCanvas(400,355);
jungle = createSprite (200,200,1,1);
jungle.addAnimation("background", jungleImage);
jungle.scale = 1;
jungle.velocityX = -4;

monkey = createSprite(80,315,20,20);
monkey.addAnimation("running", monkey_running);
monkey.addAnimation("stop" , monkey_stop);
monkey.scale = 0.08;


  
ground = createSprite(400,350,900,10);
ground.velocityX = -4;

  

  
FoodGroup = new Group();
ObstacleGroup = new Group();
}


function draw() {

  background("white");

  ground.visible = false;
  if (gameState === "PLAY" ) {
    
if (ground.x <0) {
  ground.x = ground.width/2;

  }
if (jungle.x <0) {
  jungle.x = jungle.width/2;

  }
  
  if (keyDown("space") &&  monkey.y >150) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  
  food();
  rock();
    if (FoodGroup.isTouching(monkey)) {
       
      score = score + 2;
      FoodGroup.destroyEach();
    }
         if (life === 1) {
       monkey.scale = 0.07;
     }
    if (life === 0) {
      monkey.changeAnimation("stop" , monkey_stop);
       gameState = "END"


    }

  if (ObstacleGroup.isTouching(monkey)) {
life = life-1;
    ObstacleGroup.destroyEach();
    
    }

    
  }



  if (gameState === "END") {
    FoodGroup.destroyEach();
    ground.velocityX = 0;
    jungle.velocityX = 0;
    obstacle.velocityX = 0;
    monkey.collide(ground);
    monkey.collide(obstacle);
    obstacle.lifetime = -1;
  }
  
  switch (score) {
    case 10 : monkey.scale = 0.1;
      break;
    case 20 : monkey.scale = 0.12;
      break; 
    case 30 : monkey.scale = 0.14;
      break;
    case 40 : monkey.scale = 0.16;
      break; 
  }
  drawSprites();
      stroke("white");
  fill ("white");
textSize(20);
  text("Score :   " + score, 300,50);
}



function food () {
  if (frameCount % 80 === 0) {
    
  var banana = createSprite(400,50,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.06;
  banana.velocityX = -2;  
  banana.y = Math.round(random(50,200));
  banana.lifetime = 150;
     FoodGroup.add(banana);
     
}
 
}
function rock () {
  if (frameCount % 300 === 0) {
  obstacle = createSprite (400,310,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -3;
  obstacle.lifetime = 130;
  ObstacleGroup.add(obstacle);
}
}
