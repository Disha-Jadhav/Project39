var airplane, airplaneImg;

var cloud, cloudImg, cloudsGroup;
var fuel, fuelImg, fuelsGroup;

var ground, groundImg;

var start, startImg;
var over, overImg;

var gameState = "START";

var score = 0

function preload()
{
    airplaneImg = loadImage("images/airplane.png");

    cloudImg = loadImage("images/cloud.png");

    fuelImg = loadImage("images/fuel.png");

    groundImg = loadImage("images/ground.png");

    startImg = loadImage("images/start.png");

    overImg = loadImage("images/over.png");
}
function setup()
{
    createCanvas(1535, 720);

    airplane = createSprite(200, 150, 20, 20);
    airplane.addImage(airplaneImg);
    airplane.scale = 0.65;
    airplane.visible = false;
    airplane.setCollider("rectangle", 0, 0, 450, 150);

    ground = createSprite(767.5, 700, 1535, 50);
    ground.addImage(groundImg)
    ground.velocityX = -3;
    ground.visible = false;

    start = createSprite(767.5, 360, 50, 50);
    start.addImage(startImg);

    over = createSprite(767.5, 360, 50, 50);
    over.addImage(overImg);
    over.visible = false;

    cloudsGroup = new Group();
    fuelsGroup = new Group();
}
function draw()
{
    background(135, 206, 235);

    if(gameState === "START")
    {
      score = 0;
      start.visible = true;
      if(mousePressedOver(start))
      {
        gameState = "PLAY";
      }
    }

    if(gameState === "PLAY")
    {
      start.visible = false;
      over.visible = false;

      airplane.visible = true;
      if(keyDown("UP_ARROW"))
      {
          airplane.position.y = airplane.position.y - 5;
      }
      if(keyDown("DOWN_ARROW"))
      {
          airplane.position.y = airplane.position.y + 5;
      }

      ground.visible = true;
      if (ground.x < 0)
      {
        ground.x = ground.width/2;
      }

      spawnClouds();
      spawnFuels(); 

      if(cloudsGroup.isTouching(airplane))
      {
        gameState = "END";
      }
      if(ground.isTouching(airplane))
      {
        gameState = "END";
      }

      if(fuelsGroup.isTouching(airplane))
      {
        fuelsGroup.destroyEach();
        score = score + 1;
      }
    }

    if(gameState === "END")
    {
      airplane.position.y = 150;
      over.visible = true;
      airplane.visible = false;

      cloudsGroup.destroyEach();
      fuelsGroup.destroyEach();
      ground.visible = false;

      cloudsGroup.setVelocityXEach(0);
      fuelsGroup.setVelocityXEach(0);

      if(mousePressedOver(over))
      {
        gameState = "START";
      }
    }

    drawSprites();
    fill("white");
    stroke("white");
    textSize(30);
    text("Score: " + score, 50, 50);
}

function spawnFuels() 
{
  if (frameCount % 200 === 0) 
  {
    var fuel = createSprite(1535, 150);
    fuel.y = Math.round(random(50, 650));
    fuel.addImage(fuelImg);
    fuel.scale = 0.05;
    fuel.velocityX = -6;
    fuelsGroup.add(fuel);
  }
}
function spawnClouds() 
{
  if (frameCount % 180 === 0) 
  {
    var cloud = createSprite(1535, 50);
    cloud.y = Math.round(random(50, 500));
    cloud.addImage(cloudImg);
    cloud.scale = 0.3;
    cloud.velocityX = -5;
    cloudsGroup.add(cloud);
  }
}