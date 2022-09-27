"use strict";

let state = `game`;

let visual = {
  l1Wall: undefined,
  l2Background: undefined,
  l3BasketClicked: undefined,
  l3BedClicked: undefined,
  l3ClosetClicked: undefined,
  l3ArmoireClicked: undefined,
  l3MirrorClicked: undefined,
  l3ShowerClicked: undefined,
  l4Mapping: undefined,
  l4CorpseBaby: undefined,
  l4CorpseMan: undefined,
  l4CorpseWoman: undefined,
  l4Food: undefined,
  l5Hand: undefined,
  l5HandClosed: undefined,
  cursorImg: undefined
}

let clickable = {
  foodItem: undefined,
  foodItem2: undefined,
  food: {
    x: 410,
    y: 360,
    radius: 70,
    appearance: [true, false]
  },
  basketItem: undefined,
  basket: {
    x: 0,
    y: 0,
    radius: 0
  },
  bedItem: undefined,
  bed: {
    x: 410,
    y: 360,
    radius: 70
  },
  closetItem: undefined,
  closet: {
    x: 720,
    y: 255,
    radius: 180
  }
};
// // The sausage dog
// let sausageDog = {
//   object: undefined,
//   image: undefined,
//   x: undefined,
//   y: undefined,
//   vx: 0,
// };
// const SAUSAGEDOG_PREFIX = `assets/images/sausage-dog.png`;

// let trap = {
//   x: 800,
//   y: 75,
//   size: 150,
//   easing: 0.05,
// }

// let otherDogs = {
//   images: [],
//   objects: [],
//   x: 50,
//   y: 100,
//   vy: 150,
//   vx: 0,
// };
// const OTHER_DOGS_NUM = 10;
// const OTHER_DOGS_PREFIX = `assets/images/animal`;

// let colour = 200;

function preload() {
  visual.l1Wall = loadImage(`assets/images/l1-wall.png`);
  visual.l2Background = loadImage(`assets/images/l2-backgroundwithblood.png`);
  visual.l3ArmoireClicked = loadImage(`assets/images/l3-kitchenarmoireclicked.png`); 
  visual.l3BasketClicked = loadImage(`assets/images/l3-basketclicked.png`);
  visual.l3BedClicked = loadImage(`assets/images/l3-bedclicked.png`);
  visual.l3ClosetClicked = loadImage(`assets/images/l3-closetclicked.png`);
  visual.l3MirrorClicked = loadImage(`assets/images/l3-mirrorclicked.png`);
  visual.l3ShowerClicked = loadImage(`assets/images/l3-showerclicked.png`);
  visual.l4CorpseBaby = loadImage(`assets/images/l4-corpsebaby.png`);
  visual.l4CorpseMan = loadImage(`assets/images/l4-corpseman.png`);
  visual.l4CorpseWoman = loadImage(`assets/images/L4-corpsewoman.png`);
  visual.l4Food = loadImage(`assets/images/l4-food.png`);
  visual.l4Mapping = loadImage(`assets/images/l4-buttonlocationsmapping.png`);
  visual.l5Hand = loadImage(`assets/images/l5-hand.png`);
  visual.l5HandClosed = loadImage(`assets/images/l5-handclosed.png`);
}

// Set up the canvas and the animal objects
function setup() {
  createCanvas(900, 480);

  visual.cursorImg = visual.l5Hand;
  clickable.foodItem = new Food(visual.l4Food, clickable.food.x, clickable.food.y, clickable.food.radius);
  clickable.foodItem2 = new Food(visual.l4Food, clickable.closet.x, clickable.closet.y, clickable.food.radius)
  clickable.bedItem = new Clickable(visual.l3BedClicked, clickable.bed.x, clickable.bed.y, clickable.bed.radius );
  clickable.closetItem = new Clickable(visual.l3ClosetClicked, clickable.closet.x, clickable.closet.y, clickable.closet.radius );

}

// Display and move the cars
function draw() {
  background(0);

  if (state === `game`) {
    game();
  }

  else if (state === `ending`) {
    ending();
  }
}

function checkOverlap() {
  // if (dist(mouseX, mouseY, this.x, this.y))
}

function game() {
  stroke(0);
  fill(255);
  image(visual.l1Wall,0,0);
  image(visual.l2Background,0,0);
  // image(visual.l4Mapping, 0, 0);
  
  // ellipse(410,360,70);
  // ellipse(320,300,70);
  // ellipse(720,255,180);
  clickable.bedItem.checkOverlap();
  clickable.closetItem.checkOverlap();
  clickable.foodItem.checkOverlap();
  clickable.foodItem2.checkOverlap();

  clickable.bedItem.display();
  clickable.closetItem.display();

  image(visual.l4CorpseBaby, 0, 0);
  
  console.log(clickable.foodItem.overlap);
  if (clickable.bedItem.isVisible === true) {
    clickable.foodItem.display();
    setTimeout(() => {
      clickable.bedItem.clicked = false;
    }, "4000");
  } else if (clickable.closetItem.isVisible === true) {
    clickable.foodItem2.display();
    setTimeout(() => {
      clickable.closetItem.clicked = false;
    }, "4000");
  }

  image(visual.cursorImg, mouseX, mouseY);
}

function ending() {
}

function mousePressed() {
  if (clickable.bedItem.overlap === true) {
    clickable.bedItem.clicked = true;
  } else if (clickable.closetItem.overlap === true) {
    clickable.closetItem.clicked = true;
    clickable.food.x = clickable.closet.x;
    clickable.food.y = clickable.closet.y;
  }

  if (clickable.foodItem.overlap === true && clickable.bedItem.clicked === true) {
    clickable.foodItem.clicked = true;
    clickable.foodItem2.clicked = true;
    console.log('HERE');
  }

  
  // else if (clickable.bedItem.overlap !== true) {
  //   clickable.bedItem.clicked = false;
  // }
  // sausageDog.object.mousePressed();
  // if (sausageDog.object.found) {
  //   state = `ending`;
  // }
  // else {
  //   colour -= 50;
  // }
}


