const listControllerItems = [
  {
    name: "Color",
    itemName: "item-color",
    iconLeft: "",
    hasIconRight: true,
    hasStatusList: null,
  },
  {
    name: "Snooze",
    itemName: "item-snooze",
    iconLeft: "snooze",
    hasIconRight: false,
    hasStatusList: true,
  },
  {
    name: "Scenes",
    itemName: "item-scenes",
    iconLeft: "nights_stay",
    hasIconRight: true,
    hasStatusList: false,
  },
  {
    name: "Auto",
    itemName: "item-auto",
    iconLeft: "brightness_auto",
    hasIconRight: false,
    hasStatusList: null,
  },
  {
    name: "Power",
    itemName: "item-power",
    iconLeft: "power_settings_new",
    hasIconRight: false,
    hasStatusList: true,
  },
  {
    name: "Settings",
    itemName: "item-settings",
    iconLeft: "settings",
    hasIconRight: false,
    hasStatusList: false,
  },
];

const createControllerItem = (
  parent,
  name,
  itemName,
  iconLeft,
  hasIconRight,
  hasStatusList
) => {
  const box = document.querySelector(parent);
  const divBox = document.createElement("div");
  box.appendChild(divBox);
  divBox.className = "controller-item";
  divBox.classList.add(itemName);

  const divItemButton = document.createElement("div");
  divItemButton.className = "item-button";
  divBox.appendChild(divItemButton);

  const spanIconLeft = document.createElement("span");
  spanIconLeft.className = "material-icons";
  divItemButton.appendChild(spanIconLeft);
  spanIconLeft.textContent = iconLeft;

  if (hasIconRight) {
    const spanIconRight = document.createElement("span");
    spanIconRight.className = "material-icons";
    divItemButton.appendChild(spanIconRight);
    spanIconRight.classList.add("item-button-right");
    spanIconRight.textContent = "chevron_right";
  }

  const divItemTile = document.createElement("div");
  divItemTile.className = "item-title";
  divBox.appendChild(divItemTile);
  divItemTile.textContent = name;

  const divItemDescription = document.createElement("div");
  divItemDescription.className = "item-description";
  divBox.appendChild(divItemDescription);

  if (hasStatusList === true) {
    const divItemStatusLeft = document.createElement("div");
    const divItemStatusRight = document.createElement("div");
    const spanDot = document.createElement("span");
    divItemStatusLeft.className = "item-status-left";
    divItemStatusRight.className = "item-status-right";
    divItemStatusLeft.textContent = "On";
    spanDot.textContent = "-";
    divItemStatusRight.textContent = "Off";
    divItemDescription.appendChild(divItemStatusLeft);
    divItemDescription.appendChild(spanDot);
    divItemDescription.appendChild(divItemStatusRight);
  } else if (hasStatusList === false) {
    const divItemStatus = document.createElement("div");
    divItemStatus.className = "item-status";
    divItemDescription.appendChild(divItemStatus);
    divItemStatus.textContent = "Off";
  } else if (hasStatusList === null) {
    divItemDescription.textContent = "";
  }

  console.log(divBox);
};

listControllerItems.forEach((item) => {
  createControllerItem(
    ".controllers",
    item.name,
    item.itemName,
    item.iconLeft,
    item.hasIconRight,
    item.hasStatusList
  );
});

const listScenes = [
  {
    name: "do_not_disturb",
    title: "Don't disturb",
    icon: "dark_mode",
    status: false,
  },
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
  {
    name: "love",
    title: "Love",
    icon: "favorite",
    status: false,
  },
  {
    name: "walk",
    title: "Walk",
    icon: "directions_walk",
    status: false,
  },
];

const createSceneItem = (parent, name, icon, title, status) => {
  const divSceneItem = document.createElement("div");
  document.querySelector(parent).appendChild(divSceneItem);
  divSceneItem.className = "scenes-item";
  divSceneItem.id = name;

  const divSceneItemIconLeft = document.createElement("div");
  divSceneItem.appendChild(divSceneItemIconLeft);
  divSceneItemIconLeft.className = "scenes-item-icon-left";
  const spanIcon = document.createElement("span");
  divSceneItemIconLeft.appendChild(spanIcon);
  spanIcon.className = "material-icons";
  spanIcon.textContent = icon;

  const divSceneItemTitle = document.createElement("div");
  divSceneItem.appendChild(divSceneItemTitle);
  divSceneItemTitle.className = "scenes-item-title";
  const h4Title = document.createElement("h4");
  divSceneItemTitle.appendChild(h4Title);
  h4Title.textContent = title;
  const pStatus = document.createElement("p");
  divSceneItemTitle.appendChild(pStatus);
  pStatus.textContent = status ? "On" : "Off";

  const divSceneItemIconRight = document.createElement("div");
  divSceneItem.appendChild(divSceneItemIconRight);
  divSceneItemIconRight.className = "scenes-item-icon-right";
  const spanIconRight = document.createElement("span");
  divSceneItemIconRight.appendChild(spanIconRight);
  spanIconRight.className = "material-icons";
  spanIconRight.textContent = "more_horiz";
};

listScenes.forEach((scene) => {
  createSceneItem(
    ".screen-scenes",
    scene.name,
    scene.icon,
    scene.title,
    scene.status
  );
});
