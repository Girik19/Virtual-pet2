//Create variables here
var doge, happyDog
var database, foodS, foodStock
var fedTime, lastFed
var foodObj
var feed,addfood

function preload()
{
 
  doge=loadImage("images/dog1.png")
  happyDog=loadImage("images/Dog2.png")
  //load images here
}

function setup() {
  createCanvas(1000, 400);

  database=firebase.database()
  foodObj=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addfood=createButton("Add Food")
  addfood.position(800,95)
  addfood.mousePressed(addFoodS)

  dog=createSprite(800,200,150,150)
  dog.addImage(doge)
  dog.scale=0.15;
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
}

function draw() {  
  background(46,139,87)
foodObj.display();

fedTime=database.ref('FeedTime')
fedTime.on("value",function (data){
lastFed=data.val()
})
  //add styles here

  textSize(18)
  fill("yellow")
  stroke(4)

  text("No of bottles:"+foodS,170,200)

if(lastFed>=12){
  text("Last Feed:"+lastFed%12 + "PM", 350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30)
}else{
  text("Last Feed :"+lastFed+ "AM", 350,30)
}
drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
}

/*function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

    database.ref('/').update({
    Food : x
  })
}*/

function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



