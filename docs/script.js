/*
sometimes.blue v2
Synaesthetic clock 2021
Ellen Nickles
ellen.town
*/

const myColors = [
    {
      num: "0",
      color: "ghostwhite",
    },
    {
      num: "1",
      color: "ivory",
    },
    {
      num: "2",
      color: "blue",
    },
    {
      num: "3",
      color: "orange",
    },
    {
      num: "4",
      color: "red",
    },
    {
      num: "5",
      color: "blueviolet",
    },
    {
      num: "6",
      color: "magenta",
    },
    {
      num: "7",
      color: "forestgreen",
    },
    {
      num: "8",
      color: "darkorange",
    },
    {
      num: "9",
      color: "crimson",
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

