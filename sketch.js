var fundoImg, fundo;
var fogueteImg, foguete;
var meteoro, meteoroImg;
var coin, coinImg;
var explosao, explosaoImg;

var coinGroup;
var meteoroGroup;

var gameState = "play";
var score = 0;
var life = 3;


function preload() {

   fundoImg = loadImage("fundo2.gif");
   fogueteImg = loadAnimation("foguete.png");
   meteoroImg = loadImage("obstaculo1.png");
   explosaoImg = loadAnimation("explosao.png");
   coinImg = loadImage("Coin.png");



}


function setup() {
  canvas = createCanvas(1200, 1200);

  //fundo = createSprite(1200, 1200);
  //fundo.addImage(fundoImg);
  //fundo.scale = 1.8;

  foguete = createSprite(680, 1000);
  foguete.addAnimation("foguete", fogueteImg);
  foguete.addAnimation("explosao", explosaoImg);

  foguete.scale = 0.15;

  //meteoro = createSprite(300, 300);
  //meteoro.addImage(meteoroImg);
  //meteoro.scale = 0.4;


  coinGroup = new Group();
  explosaoGroup = new Group();
  meteoroGroup =new Group();

  
}

function draw() {
  background(fundoImg); 
  
  

  

  //foguete.x = mouseX;
  //foguete.y = mouseY;

  if (gameState == "play") {
    //fundo.velocityY = 4;

   /* if (fundo.y > 800) {
      fundo.y = 400;
   }*/

   if (keyDown("LEFT_ARROW")) {
    foguete.x = foguete.x -5;
   }

   if (keyDown("RIGHT_ARROW")) {
    foguete.x = foguete.x +5;
   }
   spawnMete();

   spawnCoins();
 
   removeCoins();
 
   removeLife();

   if (life === 0 ){
    gameState = "end"
   }

   
  }
  
  if (gameState == "end"){
    //remover os grupos
    meteoroGroup.destroyEach();
    coinGroup.destroyEach();
    //mudar animação do foguete
    foguete.velocityX = 0;
    foguete.changeAnimation("explosao",explosaoImg);

  }



  //edges = createEdgeSprites();

  //foguete.collide(edges[3]);
  

  drawSprites();

}

function spawnMete(){
  if (frameCount % 60 == 0){
    meteoro = createSprite(random(30,800), random(10,900));
    meteoro.addImage(meteoroImg);
    meteoro.velocityY = 3;
    meteoro.scale = 0.3;
    meteoro.lifeTime = 1200;
    meteoroGroup.add(meteoro);


  }
}
function spawnCoins(){
  if (frameCount % 60 == 0){
    coin = createSprite(random(30,800), random(10,900));
    coin.addImage(coinImg);
    coin.velocityY = 3;
    coin.scale = 0.1;
    coin.lifeTime = 1200;
    coinGroup.add(coin);


  }
}
function removeCoins(){
  foguete.overlap(coinGroup, function(collector,collected){
    score += 1;
    collected.remove();
  });
}
function removeLife(){
  foguete.overlap(meteoroGroup, function(collector, collected){
    life -= 1;
    collected.remove();
  })
}



















































