const container = document.querySelector(".container");
const sliderCover = document.querySelector(".slider-cover");
const sliderVertical = document.querySelector(".slider-vertical");
const sliderHandle = document.querySelector(".slider-handle");
const brightnessValue = document.querySelector(".brightness-value");

let isClicked = false;

const changeBrightness = (e) => {
  const value =
    (e.pageY - (container.offsetTop + 130)) / sliderCover.offsetHeight;
  brightnessValue.innerHTML = `${Math.floor(100 - value * 100)}%`;
  sliderVertical.style.top = value * 100 + "%";
  sliderVertical.style.opacity = 1 - value;
};

sliderCover.addEventListener("mousedown", (e) => {
  isClicked = true;
  changeBrightness(e);
});

sliderCover.addEventListener("mouseup", () => {
  isClicked = false;
});

sliderCover.addEventListener("mousemove", (e) => {
  if (isClicked) {
    changeBrightness(e);
  }
});

sliderCover.addEventListener("mouseleave", () => {
  isClicked = false;
});
