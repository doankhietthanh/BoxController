const sliderCover = document.querySelector(".slider-cover");
const sliderVertical = document.querySelector(".slider-vertical");
const sliderHandle = document.querySelector(".slider-handle");
const brightnessValue = document.querySelector(".brightness-value");

let isClicked = false;

const getBrightness = (e) => {
  const value =
    ((e.pageY - (sliderCover.offsetTop + 155)) / sliderCover.offsetHeight) *
    100;
  brightnessValue.innerHTML = `${Math.floor(100 - value)}%`;
  console.log("Brightness: " + Math.floor(100 - value) + "%");
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
