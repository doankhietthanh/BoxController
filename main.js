const mainElement = document.querySelector(".main");
const mainWrapper = document.querySelector(".main-wrapper");
const totalScreens = document.querySelector(".main-wrapper").children.length;
const CONTEXT_WIDTH = 270;

const contextData = [
  {
    name: "home",
    title: "Home",
    device: "PHILIP Hue",
    triggerElement: ["#back"],
    order: 0,
  },
  {
    name: "color",
    title: "Color Picker",
    device: "",
    triggerElement: [".item-color"],
    order: 1,
  },
];

mainWrapper.style.width = totalScreens * 100 + "%";

for (let i = 0; i < mainWrapper.children.length; i++) {
  mainWrapper.children[i].style.width = 100 / totalScreens + "%";
}

const changeContext = (contextName) => {
  const context = contextData.find((context) => context.name === contextName);
  document.querySelector(".header-name h4").textContent = context.title;
  document.querySelector(".header-name p").textContent = context.device;
  mainWrapper.style.transform =
    "translateX(" + -context.order * CONTEXT_WIDTH + "px)";
};

contextData.forEach((context) => {
  context.triggerElement.forEach((triggerElement) => {
    const triggerElementDOM = document.querySelector(triggerElement);
    triggerElementDOM.addEventListener("click", () => {
      changeContext(context.name);
    });
  });
});

changeContext("home");
