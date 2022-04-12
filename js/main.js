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
      .querySelector(".item-power .item-description .item-status-on")
      .classList.remove("active");
    document
      .querySelector(".item-power .item-description .item-status-off")
      .classList.add("active");
    isPower = false;
  } else {
    console.log("Power on");
    itemPower.classList.add("active");
    document
      .querySelector(".item-power .item-description .item-status-on")
      .classList.add("active");
    document
      .querySelector(".item-power .item-description .item-status-off")
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
const itemSnooze = document.querySelector(".item-snooze");
itemSnooze.addEventListener("click", (e) => {
  const itemStatus = document.querySelector(
    ".item-snooze .item-description .item-status"
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

const listScenes = [
  {
    name: "sleep",
    title: "Sleep",
    icon: "bed",
    status: false,
  },
  {
    name: "work",
    title: "Work",
    icon: "work_history",
    status: false,
  },
];

listScenes.forEach((scene) => {
  document.querySelector(".screen-scenes").innerHTML += `
  <div class="scenes-item" id=${scene.name}>
                        <div class="scenes-item-icon-left">
                            <span class="material-icons">
                                ${scene.icon}
                            </span>
                        </div>
                        <div class="scenes-item-title">
                            <h4>${scene.title}</h4>
                            <p>${scene.status ? "ON" : "OFF"}</p>
                        </div>
                        <div class="scenes-item-icon-right">
                            <span class="material-icons">
                                more_horiz
                            </span>
                        </div>
                    </div>  
  `;
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

  // scene.addEventListener("click", (e) => {
  //   const findSelectedScene = listScenes.find((item) => item.name === scene.id);
  //   allScenes.forEach((scene1, index1) => {
  //     scene1.classList.remove("active");
  //     listScenes[index1].status = false;
  //     isScenesItem = findSelectedScene.status;
  //     scene1.querySelector(".scenes-item-title p").textContent = "OFF";
  //   });
  //   if (!isScenesItem) {
  //     scene.classList.add("active");
  //     listScenes[index].status = true;
  //     isScenesItem = findSelectedScene.status;
  //     scene.querySelector(".scenes-item-title p").textContent = "ON";
  //     itemScenes.querySelector(".item-button span:nth-child(1)").textContent =
  //       findSelectedScene.icon;
  //     itemScenes.querySelector(".item-title").textContent =
  //       findSelectedScene.title;
  //     itemScenes.querySelector(".item-status").textContent = "On";
  //     itemScenes.classList.add("active");
  //     itemStatus.classList.add("active");
  //   } else {
  //     scene.classList.remove("active");
  //     listScenes[index].status = false;
  //     isScenesItem = findSelectedScene.status;
  //     scene.querySelector(".scenes-item-title p").textContent = isScenesItem
  //       ? "ON"
  //       : "OFF";
  //   }
  // });
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
      ? "ON"
      : "OFF";
  });
  const current_scene = listScenes.find((item) => item.status);
  itemTitle.textContent = current_scene.title;
  sceneIcon.textContent = current_scene.icon;
};
