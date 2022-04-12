const container = document.querySelector(".container");
const sliderCover = document.querySelector(".slider-cover");
const sliderVertical = document.querySelector(".slider-vertical");
const sliderHandle = document.querySelector(".slider-handle");
const brightnessValue = document.querySelector(".brightness-value");

let isClicked = false;

const getBrightness = (e) => {
  console.log("e.pageY:", e.pageY);
  console.log("sliderCover.offsetHeight:", sliderCover.offsetHeight);
  const value =
    ((e.pageY - (container.offsetTop + 130)) / sliderCover.offsetHeight) * 100;
  console.log(value);
  brightnessValue.innerHTML = `${Math.floor(100 - value)}%`;
  // console.log("Brightness: " + Math.floor(100 - value) + "%");
  return (sliderVertical.style.top = value + "%");
};

sliderCover.addEventListener("mousedown", (e) => {
  isClicked = true;
  getBrightness(e);
});

sliderCover.addEventListener("mouseup", () => {
  isClicked = false;
});

sliderCover.addEventListener("mousemove", (e) => {
  if (isClicked) {
    getBrightness(e);
  }
});

sliderCover.addEventListener("mouseleave", () => {
  isClicked = false;
});
