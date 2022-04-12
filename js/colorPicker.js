// setup
const currentHSL = document.getElementById("hsl-selected-color");
const sliders = [];
const hsla = [200, 100, 50, 1];
const letters = ["h", "s", "l", "a"];

//		get Colors
// --------------------
function getCol(value) {
  let gradient = [];
  if (value === "h")
    for (let h = 0; h <= 360; h += 20) {
      gradient.push(
        "hsla(" + h + "," + hsla[1] + "%," + hsla[2] + "%," + hsla[3] + ")"
      );
    }
  else if (value === "s")
    for (let s = 0; s <= 100; s += 50) {
      gradient.push(
        "hsla(" + hsla[0] + "," + s + "%," + hsla[2] + "%," + hsla[3] + ")"
      );
    }
  else if (value === "l")
    for (let l = 0; l <= 100; l += 10) {
      gradient.push(
        "hsla(" + hsla[0] + "," + hsla[1] + "%," + l + "%," + hsla[3] + ")"
      );
    }
  else if (value === "a")
    for (let a = 0; a < 2; a++) {
      gradient.push(
        "hsla(" + hsla[0] + "," + hsla[1] + "%," + hsla[2] + "%," + a + ")"
      );
    }
  return gradient;
}

//		Update
// --------------------
function update() {
  // update sliders
  for (let i = 0; i < 4; i++) {
    hsla[i] = sliders[i].value;
    let fill = "-webkit-linear-gradient(left, " + getCol(letters[i]) + ")";
    sliders[i].style.background = fill;
  }
  // set box color
  let color =
    "hsla(" + hsla[0] + "," + hsla[1] + "%," + hsla[2] + "%," + hsla[3] + ")";
  currentHSL.style.background = color;

  document.querySelector(".pick-color").style.background = color;
}

//		Setup Events
// --------------------
for (let i = 0; i < 4; i++) {
  // get slider + number input
  let slider = document.getElementById("slider-" + letters[i]);
  let number = document.getElementById("number-" + letters[i]);

  // slider events
  slider.addEventListener(
    "input",
    function () {
      window.requestAnimationFrame(update);
      number.value = slider.value;
    },
    false
  );

  // number events
  number.addEventListener(
    "input",
    function () {
      window.requestAnimationFrame(update);
      slider.value = number.value;
    },
    false
  );

  // set value
  number.value = hsla[i];
  slider.value = hsla[i];

  // push objects
  sliders.push(slider);
}

update();
