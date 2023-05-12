var canvasWidth = 640;
var canvasHeight = 480;

var pro = true;
var player = 0;
var playerX = 300;
var playerY = 100;
var sprWidth = 64;
var sprHeight = 64;
var speed = 10;
var maxEnemies = 12;
var health = 100;
var score = 0
var randNum = Math.floor(Math.random() * 10 + 1)

function preload(){
  
  
  playerImage =loadSpriteSheet("images/Sheriff.png", 64, 64, 2)
  playerAnimation = loadAnimation(playerImage);
  
  projectileImage = loadSpriteSheet("images/Blood Lava(1).png", 64, 64, 2);
  projectileAnimation = loadAnimation(projectileImage);
  
  enemyImage = loadSpriteSheet("images/Bandit.png", 64, 64, 3)
  enemyAnimation = loadAnimation(enemyImage)
  
  bg = loadImage("images/New Piskel (1).png");
  createCanvas(640, 480);
  
}



 function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = createSprite(playerX, playerY, sprWidth, sprHeight);
  player.addAnimation("normal", playerAnimation);
  
  //player.setCollider("rectangle", 0, 0 , 64, 64)
  //player.debug = true;
  
  projectiles = new Group();
  enemies = new Group();
  

} 




function spawnEnemies(){
  while(enemies.size () < maxEnemies){
    let x = Math.random() * (canvasWidth)
    let y = Math.random() * (canvasHeight)
  
    let enemy = createSprite(x,y,sprWidth,sprHeight);
    enemy.addAnimation("normal", enemyAnimation);
    enemy.maxSpeed = 1;
  
   // enemy.setCollider("rectangle", 0,0,64,64);
    //enemy.debug = true;
  
    enemies.add(enemy);
  }
}

  

  
  spawnEnemies();
function playerControls(){
  if(keyIsDown(68)){
    //right
    player.position.x += speed;
    
  }
  
  if(keyIsDown(65)){
    //left
    player.position.x -= speed;
  }
  
  if(keyIsDown(87)){
    //up
    player.position.y -= speed;
  }
  
  if(keyIsDown(83)){
    //down
    player.position.y += speed;
  }
}

function boundaries(){
  //left
  if(player.position.x - sprWidth/2 < 0){
    player.position.x = sprWidth/2;
  }
  
  //right
  if(player.position.x + sprWidth/2 > canvasWidth){
    player.position.x = canvasWidth - sprWidth/2;
  }
  //top
  if(player.position.y - sprHeight/2 < 0){
    player.position.y = sprHeight/2;
  }
  
  //bottom
  if(player.position.y + sprHeight/2 > canvasHeight){
    player.position.y = canvasHeight - sprHeight/2;
  }
  
  projectiles.forEach(spr => {
    let outX = spr.position.x < 0 || spr.position.x > canvasWidth ;
    let outY = spr.position.y < 0 || spr.position.y > canvasHeight;
    if(outX || outY){
      projectiles.remove(spr);
    }
  });

  
}



function mousePressed(){
  if(pro == true){
    let projectile = createSprite(player.position.x,   player.position.y);
    projectile.addAnimation("normal", projectileAnimation);
      projectile.attractionPoint(10+speed, mouseX, mouseY);



    projectiles.add(projectile);
 }
}




function enemyMovements(){
  enemies.forEach(spr => {
      spr.attractionPoint(0.2, player.position.x, player.position.y);
  });
}


function destroyOther(destroyed, projectile){
  enemies.remove(destroyed);
  destroyed.remove();
  projectiles.remove(projectile);
  score++;
}

function removeHealth(){
  health -= 0.5
  if(health <= 0){
    player.remove();
    maxEnemies = 0;
    fill("#990000")
    textSize(50);
    textFont('Courier New');
    text("super_WestBattler", canvasWidth/4.8, canvasHeight/4.8)
    text('Game Over', canvasWidth/2, canvasHeight/2)
    pro = false
   }
}

function collisions(){
  enemies.collide(projectiles, destroyOther)
  projectiles.collide(enemies)
  enemies.collide(player, removeHealth)
  player.collide(enemies)
}

function healthBar(){
  fill("green");
  rect(0,0,health*randNum, 25);
}




function draw() {
  background(bg);
    stroke(226, 204, 0);
  

  healthBar();
  playerControls();
  spawnEnemies();
  boundaries();
  enemyMovements();
  collisions();
  drawSprites();
  text("Score: "+ score ,canvasWidth/8, canvasHeight/8)
} 