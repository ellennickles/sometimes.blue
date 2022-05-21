/*
sometimes.blue v1
A timepiece 2019
Ellen Nickles
ellen.town

References:
Processing Community Day NYC 2019: https://processing.nyc/2019/
Arielle Hein: https://www.youtube.com/watch?v=SzSVIJERQQg
*/

let body;
let timer = 0;

let firstColor = {
  h: 0,
  s: 85,
  b: 45
};
let secondColor = {
  h: 0,
  s: 85,
  b: 60
};

let difference = 15;
let gradientDir = 0;
let firstColorString;
let secondColorString;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.style('display', 'block');
  body = select('body');

  firstColor.h = random(0, 360);
  secondColor.h = firstColor.h + difference;
}

function draw() {
  firstColorString = `hsl(${firstColor.h},${firstColor.s}%,${firstColor.b}%)`;
  secondColorString = `hsl(${secondColor.h},${secondColor.s}%,${secondColor.b}%)`;

  let styleString = `linear-gradient(${gradientDir}deg, ${firstColorString} 0%, ${secondColorString})`;
  
  if (millis() - timer > 10000) {
    if (firstColor.h === 361) {
      firstColor.h = 0
      secondColor.h = firstColor.h + difference;
    } else {
      firstColor.h++;
      secondColor.h++;
    }
    timer = millis();
  }

  body.style('background', styleString);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}