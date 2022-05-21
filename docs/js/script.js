/*
sometimes.blue v3
Synaesthetic clock 2022
Ellen Nickles
ellen.town
*/

const myColors = [
  "hsla(208, 100%, 97%, 0.95)", // 0 aliceblue
  "hsla(60, 100%, 94%, 0.95)", // 1 light yellow
  "hsla(240, 100%, 50%, 0.95)", // 2 blue
  "hsla(39, 100%, 50%, 0.95)", // 3 orange
  "hsla(0, 100%, 50%, 0.92)", // 4 red
  "hsla(271, 76%, 53%, 0.95)", // 5 blueviolet
  "hsla(300, 100%, 48%, 0.95)", // 6 magenta variation
  "hsla(130, 100%, 28%, 0.95)", // 7 green variation
  "hsla(27, 100%, 50%, 0.95)", // 8 darker orange
  "hsla(348, 83%, 42%, 0.95)", // 9 crimson
];

function getCurrentTime() {
  const day = new Date();
  const time = day.toLocaleTimeString('en-US');
  let digits = time.match(/\d+/g);
  digits = digits.join("");

  if (digits.length > 5) return digits.substring(0, 4);
  else return digits.substring(0, 3);
}

function getColors() {
  const numbers = getCurrentTime();
  let colors = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let c = 0; c < myColors.length; c++) {
      if (numbers[i] == c) colors[i] = myColors[c];
    }
  }
  return colors;
}

function updateDisplay() {
  const colors = getColors();

  let parent = document.querySelector('.grid-container');
  while (parent.firstChild) parent.removeChild(parent.firstChild);

  for (let i = 0; i < colors.length; i++) {
    const panel = document.createElement('div');

    if (i === 0) {
      panel.style.background = `${colors[i]}`;

    } else {
      const startColor = colors[i - 1];
      const endColor = colors[i];

      const gradientColors = chroma.scale([`${startColor}`, `${endColor}`])
        .mode('oklab')
        .gamma(4)
        .colors(6);

      let gradientStr = '';
      for (let j = 0; j < gradientColors.length; j++) {
        gradientStr += `${gradientColors[j]},`
      }

      let colorStopsStr = gradientStr.slice(0, -1);
      panel.style.backgroundImage = `linear-gradient(90deg, ${colorStopsStr} 45%)`;
    }

    parent.appendChild(panel);
  }
}

window.onload = () => {
  const container = document.createElement('div');
  container.setAttribute('class', 'grid-container');
  document.body.appendChild(container);
  updateDisplay();
  setInterval(updateDisplay, 500);
};