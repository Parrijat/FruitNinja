//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//score
var score = 0;

//sword variable
var sword, swordImage;

//fruit and its images' variables
var fruit;
var fruit1Image, fruit2Image, fruit3Image, fruit4Image;

//enemy and its images' variables
var enemy;
var enemy1Image, enemy2Image;

//gameOver image and sound
var gameOver, gO, GOsound;

//creating the groups
var fruitGroup, enemyGroup;

//fruit cutting sound
var fruitSound;

function preload(){
  //loading sword's image
  swordImage = loadImage("sword.png");
 //loading fruits' images
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  //loading enemy's images
  enemy1Image = loadImage("alien1.png");
  enemy2Image = loadImage("alien2.png");
  //loading gameover image
  gameOver = loadImage("gameover.png");
  
  //loading gameover sound
GOsound = loadSound("gameover.mp3");
  //loading the fruitcutting sound
  fruitSound = loadSound("knifeSwooshSound.mp3");

}
function setup(){
    
  //creating the sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7
  
  
  //making the groups
  fruitGroup = new Group();
  enemyGroup = new Group();
}


function draw(){
  if (gameState === PLAY) {
  //Adding the background
  background("skyblue");
    //adding scores
  text("Score: "+score, 50, 50);
  

  if(enemyGroup.isTouching(sword)){
  gameState = END;
    GOsound.play();
}
    if(fruitGroup.isTouching(sword)){
      fruitSound.play();
    }
  
  if (fruitGroup.isTouching(sword)){
    score = score + 1;
    fruitGroup.destroyEach();
  }

    fruits();
    enemies();
  
  //Making the sword move with the mouse
  sword.y = mouseY
  sword.x = mouseX
  
//What happens if the game ends
if (gameState === END){
  text ("Score: " + score , 50, 50);
  score = 0;
  enemyGroup.destroyEach();
  fruitGroup.destroyEach();
  sword.visible = false;
  gO = createSprite (200, 200);
  gO.addImage(gameOver);
}

  drawSprites();
}
}
//creating the function for fruits
function fruits(){
  if (World.frameCount%80 === 0){
    var dir = Math.round(random(1,2));
    //1=right & 2=left
    if(dir === 1){
      fruit = createSprite(400, 200, 220, 20);
      fruit.velocityX = -7;
      fruit.lifetime = 50;
    }else if(dir === 2){
      fruit = createSprite(0, 200, 220, 20);
      fruit.velocityX = 7;
      fruit.lifetime = 50;
    }
    
    fruit.scale = 0.2
    
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Image);
    }else if (r == 2){
      fruit.addImage(fruit2Image);
    }else if (r == 3){
      fruit.addImage(fruit3Image);
    }else{
      fruit.addImage(fruit4Image);
    }
    fruit.y = Math.round(random(50, 340));
    fruit.velocityX += score/4
    fruitGroup.add(fruit);
  }
  
}

//Creating the function for enemies 
function enemies(){
  if (World.frameCount%200 === 0){
    var d = Math.round(random(1,2))
    //1:L 2:R
    if(d === 1){
    enemy = createSprite(400, 200, 20, 20);
    enemy.velocityX = -8
    } else if (d === 2){
    enemy = createSprite(0, 200, 20, 20);
    enemy.velocityX = 8
    }

    r = Math.round(random(1,2));
     if (r == 1){
      enemy.addImage(enemy2Image);
    }else if (r == 2){
      enemy.addImage(enemy2Image);
    }
     enemy.y = Math.round(random(50, 340));
    enemy.velocityX += score/4
    enemyGroup.add(enemy);
  }
  
}
