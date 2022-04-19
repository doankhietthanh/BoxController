const mainElement = document.querySelector(".main");
const mainWrapper = document.querySelector(".main-wrapper");
const totalScreens = document.querySelector(".main-wrapper").children.length;
const mainContainer = document.querySelector(".main");
const itemTitle = document.querySelector(".item-scenes .item-title");
const sceneIcon = document.querySelector(".item-scenes .material-icons");

const CONTEXT_WIDTH = mainContainer.offsetWidth; // 270

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
  {
    name: "scenes",
    title: "Scenes",
    device: "",
    triggerElement: [".item-scenes .item-button .item-button-right"],
    order: 2,
  },
  {
    name: "settings",
    title: "Settings",
    device: "",
    triggerElement: [".item-settings"],
    order: 3,
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

// Auto brightness
let isAutoBright = false;
const itemAuto = document.querySelector(".item-auto");
itemAuto.addEventListener("click", (e) => {
  if (isAutoBright) {
    console.log("Auto brightness off");
    itemAuto.classList.remove("active");
    isAutoBright = false;
  } else {
    console.log("Auto brightness on");
    itemAuto.classList.add("active");
    isAutoBright = true;
  }
});

// Power
let isPower = false;
const itemPower = document.querySelector(".item-power");
itemPower.addEventListener("click", (e) => {
  if (isPower) {
    console.log("Power off");
    itemPower.classList.remove("active");
    document
      .querySelector(".item-power .item-description .item-status-left")
      .classList.remove("active");
    document
      .querySelector(".item-power .item-description .item-status-right")
      .classList.add("active");
    isPower = false;
  } else {
    console.log("Power on");
    itemPower.classList.add("active");
    document
      .querySelector(".item-power .item-description .item-status-left")
      .classList.add("active");
    document
      .querySelector(".item-power .item-description .item-status-right")
      .classList.remove("active");
    isPower = true;
  }
});

// Scenes
let isScenes = false;
const itemScenes = document.querySelector(".item-scenes");
const itemStatus = document.querySelector(
  ".item-scenes .item-description .item-status"
);
document
  .querySelector(".item-scenes .item-button span:nth-child(1)")
  .addEventListener("click", (e) => {
    if (isScenes) {
      console.log("Scenes off");
      itemScenes.classList.remove("active");
      itemStatus.classList.remove("active");
      itemStatus.textContent = "Off";
      isScenes = false;

      listScenes.forEach((scene) => {
        scene.status = false;
      });

      updateUIScenes();
    } else {
      console.log("Scenes on");
      itemScenes.classList.add("active");
      itemStatus.classList.add("active");
      itemStatus.textContent = "On";
      isScenes = true;

      updateUIScenes();
    }
  });

// Snooze
let isSnooze = false;
document.querySelector(
  ".item-snooze .item-description .item-status-left"
).textContent = "30mins";
const itemSnooze = document.querySelector(".item-snooze");
itemSnooze.addEventListener("click", (e) => {
  const itemStatus = document.querySelector(
    ".item-snooze .item-description .item-status-right"
  );
  if (isSnooze) {
    // console.log("Snooze off");
    itemSnooze.classList.remove("active");
    itemStatus.classList.remove("active");
    itemStatus.textContent = "Off";
    isSnooze = false;
  } else {
    // console.log("Snooze on");
    itemSnooze.classList.add("active");
    itemStatus.classList.add("active");
    itemStatus.textContent = "On";
    isSnooze = true;
  }
});

const allScenes = document.querySelectorAll(".scenes-item");
allScenes.forEach((scene, index) => {
  scene.addEventListener("click", (e) => {
    const sceneName = scene.id;
    const sceneData = listScenes.find((scene) => scene.name === sceneName);

    listScenes.forEach((scene) => {
      if (!(scene.name === sceneName && scene.status)) scene.status = false;
    });

    sceneData.status = !sceneData.status;
    updateUIScenes();
  });
});

const updateUIScenes = () => {
  if (listScenes.every((scene) => !scene.status)) {
    itemScenes.classList.remove("active");
    itemStatus.classList.remove("active");
    itemStatus.textContent = "Off";
    isScenes = false;

    itemTitle.textContent = "Scenes";
    sceneIcon.textContent = "nights_stay";
  }
  if (listScenes.some((scene) => scene.status)) {
    itemScenes.classList.add("active");
    itemStatus.classList.add("active");
    itemStatus.textContent = "On";
    isScenes = true;
  }

  allScenes.forEach((scene, index) => {
    scene.classList.remove("active");
    if (
      listScenes.find((_scene) => {
        return _scene.name === scene.id;
      }).status
    ) {
      scene.classList.add("active");
    }
    scene.querySelector(".scenes-item-title p").textContent = listScenes[index]
      .status
      ? "On"
      : "Off";
  });
  const current_scene = listScenes.find((item) => item.status);
  if (current_scene) {
    itemTitle.textContent = current_scene.title;
    sceneIcon.textContent = current_scene.icon;
  }
};
