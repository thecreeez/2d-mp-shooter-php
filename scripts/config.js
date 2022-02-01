const CONFIG = {
  UPS: 60,
  FPS: 60,
  SUPS: 30,

  isDebug: false,
  debug: {
    drawHitboxes: false,
    drawMainData: false,
    drawCamEntity: false,
    drawHoverEntity: false,
    drawEvents: false,
    drawEntityPos: false,
    logKeyboardSetting: false
  },

  controls: {
    keyboard: {
      MOVE_UP: "W",
      MOVE_LEFT: "A",
      MOVE_DOWN: "S",
      MOVE_RIGHT: "D",
      SHOOT: "SPACE",
      CAMERA_FOLLOW_PLAYER: "ONE"
    },
    mouse: {
      wheelSensivity: 0.7,
    }
  },

  chat: {
    isEnable: true,
    showSessionHelloMessage: true,
    receiveMessagesFromPlayers: true,
  },
  GUI: {
    isEnable: true,
  },

  camera: {
    speedAmplification: 1,
    defaultFOV: 1.0,
    minFOV: 0.4,
    maxFOV: 4,
    isFollowPlayerByDefault: true,
    isLockedAnPlayer: true,
  },
  
  language: "RU"
}

function clearKeyboardControl(setting) {
  kd[CONFIG.controls.keyboard[setting]].down = () => {};
  kd[CONFIG.controls.keyboard[setting]].up = () => {};

  CONFIG.controls.keyboard[setting] = null;
}

function setKeyboardControl(setting, key) {
  if (CONFIG.debug.logKeyboardSetting)
    console.log(`[Game] Controls: Установка ${setting} на ${key}`)

  if (kd[CONFIG.controls.keyboard[setting]]) {
    kd[CONFIG.controls.keyboard[setting]].down = () => {};
    kd[CONFIG.controls.keyboard[setting]].up = () => {};
  }

  for (let settingCandidate in CONFIG.controls.keyboard) {
    if (CONFIG.controls.keyboard[settingCandidate] == key)
      clearKeyboardControl(settingCandidate);
  }

  CONFIG.controls.keyboard[setting] = key;

  kd[key].down = CONTROLS_FUNCTIONS[setting].down;
  kd[key].up = CONTROLS_FUNCTIONS[setting].up;
}

function bind(key, onDown, onUp) {
  kd[key].down = onDown;
  kd[key].up = onUp;
}

function preloadConfig() {
  const PRELOADED_CONFIG = JSON.parse(localStorage.getItem("CONFIG_SAVE"));

  if (!PRELOADED_CONFIG)
    return console.log(`Конфиг не обнаружен. Установлены настройки по умолчанию`);

  console.log(`Конфиг обнаружен. Установка...`)

  console.log(`----- Управление -----`)
  for (KEYBOARD_CONTROL_ELEMENT in PRELOADED_CONFIG.controls.keyboard) {
    console.log(`${KEYBOARD_CONTROL_ELEMENT} - ${PRELOADED_CONFIG.controls.keyboard[KEYBOARD_CONTROL_ELEMENT]}`)
    setKeyboardControl(KEYBOARD_CONTROL_ELEMENT, PRELOADED_CONFIG.controls.keyboard[KEYBOARD_CONTROL_ELEMENT]);
  }

  for (CONFIG_ELEMENT in PRELOADED_CONFIG) {
    CONFIG[CONFIG_ELEMENT] = PRELOADED_CONFIG[CONFIG_ELEMENT];
  }

  console.log(`Конфиг загружен.`)
}

function saveConfig() {
  localStorage.setItem("CONFIG_SAVE", JSON.stringify(CONFIG));
}

function clearConfig() {
  localStorage.setItem("CONFIG_SAVE", null);
}