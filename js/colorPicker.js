const divPickColor = document.createElement("div");
divPickColor.className = "pick-color";
document
  .querySelector(".item-color .item-button span:nth-child(1)")
  .appendChild(divPickColor);

const createColorPicker = (parent, name) => {
  const box = document.querySelector(parent);
  const divBox = document.createElement("div");
  box.appendChild(divBox);
  divBox.className = "color-picker";
  divBox.classList.add(name);

  const divCircle = document.createElement("div");
  divCircle.className = "circle";
  divBox.appendChild(divCircle);

  const divDot = document.createElement("div");
  divDot.className = "dot";
  divCircle.appendChild(divDot);

  const divDebug = document.createElement("div");
  divDebug.className = "debug";
  divBox.appendChild(divDebug);

  const divHexColor = document.createElement("div");
  divHexColor.className = "hexColor";
  divBox.appendChild(divHexColor);

  const hsla = [200, 100, 50, 1];
  const letters = ["h", "s", "l", "a"];

  let color = [];
  const setGradient = (gradient) => {
    let css = "linear-gradient(to bottom";
    for (let i = 0; i < gradient.length; i++) {
      css += ", " + gradient[i];
    }
    color.push(gradient[gradient.length - 1]);
    css += ")";
    document.querySelector(`.${name} .circle`).style.background = css;
  };

  const getCol = (value) => {
    let gradient = [];
    if (value === "h")
      for (let h = 0; h <= 360; h += 20) {
        gradient.push(
          "hsla(" + h + "," + hsla[1] + "%," + hsla[2] + "%," + hsla[3] + ")"
        );

        setGradient(gradient);
      }
  };

  for (let i = 0; i < 3; i++) {
    getCol(letters[i]);
  }

  let is_dragging = false;
  document
    .querySelector(`.${name} .circle`)
    .addEventListener("mousedown", (e) => {
      is_dragging = true;
    });

  document
    .querySelector(`.${name} .circle`)
    .addEventListener("touchstart", (e) => {
      is_dragging = true;
    });

  document.addEventListener("mouseup", (e) => {
    is_dragging = false;
  });

  document.addEventListener("touchend", (e) => {
    is_dragging = false;
  });

  window.addEventListener("mousemove", (e) => {
    circleRange(e);
  });

  window.addEventListener("touchmove", (e) => {
    circleRange(e);
  });

  const circleRange = (e) => {
    if (is_dragging) {
      const circle = document.querySelector(`.${name} .circle`);
      const x = circle.offsetLeft + circle.offsetWidth / 2;
      const y = circle.offsetTop + circle.offsetHeight / 2;
      const pos_x = e.pageX;
      const pos_y = e.pageY;

      const delta_x = x - pos_x;
      const delta_y = y - pos_y;
      let angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI);
      angle = Math.round(angle < 0 ? angle + 360 : angle);
      console.log(angle);

      for (let i = 0; i < 20; i++) {
        if (angle <= 180 && angle >= i * 9 && angle < (i + 1) * 9) {
          document.querySelector(".debug").style.color = color[i];
          document.querySelector(".pick-color").style.background = color[i];
          document.querySelector(`.${name} .hexColor`).textContent = color[i];
          sliderVertical.style.background = color[i];
        } else if (
          angle > 180 &&
          angle <= 360 &&
          angle / 2 >= i * 9 &&
          angle / 2 < (i + 1) * 9
        ) {
          document.querySelector(".debug").style.color = color[(20 - i) * 2];
          document.querySelector(".pick-color").style.background =
            color[(20 - i) * 2];
          document.querySelector(`.${name} .hexColor`).textContent =
            color[(20 - i) * 2];
          sliderVertical.style.background = color[(20 - i) * 2];
        }
      }

      document.querySelector(
        `.${name} .dot`
      ).style = `transform: rotate(${angle}deg)`;
    }
  };
};

createColorPicker(".screen-settings", "screens");
createColorPicker(".color-picker-container", "circle1");
