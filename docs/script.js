/*
sometimes.blue v2
Synaesthetic clock 2021
Ellen Nickles
ellen.town
*/

const myColors = [
    {
      num: "0",
      color: "hsla(240, 100%, 99%, 0.95)", // ghostwhite
    },
    {
      num: "1",
      color: "hsla(60, 100%, 97%, 0.95)", // ivory
    },
    {
      num: "2",
      color: "hsla(240, 100%, 50%, 0.95)", // blue
    },
    {
      num: "3",
      color: "hsla(39, 100%, 50%, 0.95)", // orange
    },
    {
      num: "4",
      color: "hsla(0, 100%, 50%, 0.95)", // red
    },
    {
      num: "5",
      color: "hsla(271, 76%, 53%, 0.95)", // blueviolet
    },
    {
      num: "6",
      color: "hsla(300, 100%, 50%, 0.95)", // magenta
    },
    {
      num: "7",
      color: "hsla(120, 100%, 27%, 0.95)", // green4
    },
    {
      num: "8",
      color: "hsla(33, 100%, 50%, 0.95)", // darkorange
    },
    {
      num: "9",
      color: "hsla(348, 83%, 47%, 0.95)", // crimson
    },
  ];


function getCurrentTime() {
    const day = new Date();
    const time = day.toLocaleTimeString('en-US');
    let digits = time.match(/\d+/g);
    digits = digits.join("");
 
    if (digits.length > 5) {
        return digits.substring(0, 4);
    } else {
        return digits.substring(0, 3); 
    }
}


function getColors() {
  const numbers = getCurrentTime();
  let colors = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let c = 0; c < myColors.length; c++) {
      if (numbers[i] === myColors[c].num) {
        colors[i] = myColors[c].color;
      }
    }
  }
  return colors;
}


function createDisplay() {
    const colors = getColors();

    let parent = document.querySelector('.grid-container');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let i = 0; i < colors.length; i++) {
      const panel = document.createElement('div');

      if (i === 0) {
        panel.style.backgroundImage = `linear-gradient(90deg, ${colors[i]}, ${colors[i]})`;
      } else {
        panel.style.backgroundImage = `linear-gradient(90deg, ${colors[i-1]}, ${colors[i]} 50%)`;
      }
      parent.appendChild(panel);
    }
}


window.onload = () => {
    const container = document.createElement('div');
    container.setAttribute('class', 'grid-container');
    document.body.appendChild(container);
    createDisplay();
    setInterval(createDisplay, 500);
};

