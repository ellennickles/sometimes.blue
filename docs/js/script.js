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

const GRADIENT_END = 45;
// The last panel has no neighbor to bleed into, so its solid color block
// reads narrower than the other digits. Shifting its gradient earlier widens
// that block. Tune this value: higher = wider last block (max ~GRADIENT_END).
const LAST_PANEL_SHIFT = 18;

function getGradient(prevColor, currColor, isLast) {
  const gradientColors = chroma
    .scale([prevColor, currColor])
    .mode('oklab')
    .gamma(4)
    .colors(6);
  const shift = isLast ? LAST_PANEL_SHIFT : 0;
  const stops = gradientColors.map((c, idx) => {
    if (idx === 0) return `${c} ${-shift}%`;
    if (idx === gradientColors.length - 1) return `${c} ${GRADIENT_END - shift}%`;
    return c;
  });
  return `linear-gradient(90deg, ${stops.join(',')})`;
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
      gradient = getGradient(prevColor, color, i === digits.length - 1);
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