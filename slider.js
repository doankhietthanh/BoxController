const sliderCover = document.querySelector(".slider-cover");
const sliderVertical = document.querySelector(".slider-vertical");
const sliderHandle = document.querySelector(".slider-handle");

let isClicked = false;

sliderCover.addEventListener("mousedown", (e) => {
  isClicked = true;

  sliderVertical.style.top =
    ((e.pageY - (sliderCover.offsetTop + 140)) / sliderCover.offsetHeight) *
      100 +
    "%";
});

sliderCover.addEventListener("mouseup", () => {
  isClicked = false;
});

sliderCover.addEventListener("mousemove", (e) => {
  if (isClicked) {
    sliderVertical.style.top =
      ((e.pageY - (sliderCover.offsetTop + 140)) / sliderCover.offsetHeight) *
        100 +
      "%";
  }
});

sliderCover.addEventListener("mouseleave", () => {
  isClicked = false;
});

sliderCover.addEventListener("mouseup", () => {
  isClicked = false;
});
