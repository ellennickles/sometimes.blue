// sometimes.blue
// A timepiece
// Ellen Nickles
// ellennickles.site

// References:
// Processing Community Day 2019: https://processing.nyc/2019/
// Arielle Hein: https://www.youtube.com/watch?v=SzSVIJERQQg

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

  let hue = random(0,360);
  firstColor.h = map(hue, 0, 360, 0, 60);
  secondColor.h = firstColor.h + difference;
}

function draw() {
  firstColorString = `hsl(${firstColor.h},${firstColor.s}%,${firstColor.b}%)`;
  secondColorString = `hsl(${secondColor.h},${secondColor.s}%,${secondColor.b}%)`;

  let styleString = `linear-gradient(${gradientDir}deg, ${firstColorString} 0%, ${secondColorString})`;
  
  if (millis() - timer > 60000) {
    if (firstColor.h === 60) {
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