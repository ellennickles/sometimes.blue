/*
sometimes.blue v4
Synaesthetic clock 2025
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

function getCurrentTimeDigits() {
  const time = new Date().toLocaleTimeString('en-US');
  const digits = time.match(/\d+/g).join('');
  if (digits.length > 5) return digits.substring(0, 4);
  else return digits.substring(0, 3);
}

function createPanel(color, gradient) {
  const panel = document.createElement('div');
  if (gradient) {
    panel.style.backgroundImage = gradient;
  } else {
    panel.style.background = color;
  }
  return panel;
}

function getGradient(prevColor, currColor) {
  const gradientColors = chroma
    .scale([prevColor, currColor])
    .mode('oklab')
    .gamma(4)
    .colors(6);
  return `linear-gradient(90deg, ${gradientColors.join(',')} 45%)`;
}

function renderPanels() {
  const container = document.querySelector('.grid-container');
  container.innerHTML = '';
  const digits = getCurrentTimeDigits();
  for (let i = 0; i < digits.length; i++) {
    const color = myColors[parseInt(digits[i])];
    let gradient = null;
    if (i > 0) {
      const prevColor = myColors[parseInt(digits[i - 1])];
      gradient = getGradient(prevColor, color);
    }
    const panel = createPanel(color, gradient);
    container.appendChild(panel);
  }
}

window.onload = () => {
  const container = document.createElement('div');
  container.className = 'grid-container';
  document.body.appendChild(container);
  renderPanels();
  setInterval(renderPanels, 500);
};