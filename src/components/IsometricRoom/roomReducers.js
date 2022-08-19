export const roomState = {
  lowerFloor: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  upperFloor: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  sideWall: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  lowerWall: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  bedWall: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  windowFrames: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  stairs: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
  handRail: {
    color: "#808080",
    texture: "",
    click: false,
    hover: false,
  },
};
const resetClick = (state) => {
  return {
    ...state,
    lowerFloor: { ...state.lowerFloor, click: false },
    upperFloor: { ...state.upperFloor, click: false },
    sideWall: { ...state.sideWall, click: false },
    lowerWall: { ...state.lowerWall, click: false },
    bedWall: { ...state.bedWall, click: false },
    windowFrames: { ...state.windowFrames, click: false },
    stairs: { ...state.stairs, click: false },
    handRail: { ...state.handRail, click: false },
  };
};

export const roomReducer = (state, action) => {
  const name = action.payload?.name;
  const value = action.payload?.value;

  switch (action.type) {
    case "color":
      return {
        ...state,
        [name]: { ...state[name], color: value },
      };
    case "texture":
      return {
        ...state,
        [name]: { ...state[name], texture: value },
      };
    case "click":
      return {
        ...state,
        [name]: { ...state[name], click: !state[name].click },
      };
    case "hover":
      return {
        ...state,
        [name]: { ...state[name], hover: !state[name].hover },
      };

    case "resetClick":
      return resetClick(state);
    case "reset":
      return roomState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const initialHoverState = {
  lowerFloorHover: false,
  sideWallHover: false,
  lowerWallHover: false,
  bedWallHover: false,
  windowFramesHover: false,
  upperFloorHover: false,
  stairsHover: false,
  handRailHover: false,
};

export const hoverReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorHover":
      return { ...state, lowerFloorHover: !state.lowerFloorHover };
    case "sideWallHover":
      return { ...state, sideWallHover: !state.sideWallHover };
    case "lowerWallHover":
      return { ...state, lowerWallHover: !state.lowerWallHover };
    case "bedWallHover":
      return { ...state, bedWallHover: !state.bedWallHover };
    case "windowFramesHover":
      return { ...state, windowFramesHover: !state.windowFramesHover };
    case "upperFloorHover":
      return { ...state, upperFloorHover: !state.upperFloorHover };
    case "stairsHover":
      return { ...state, stairsHover: !state.stairsHover };
    case "handRailHover":
      return { ...state, handRailHover: !state.handRailHover };
    case "reset":
      return initialHoverState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
export const initialClickState = {
  lowerFloorClick: false,
  sideWallClick: false,
  lowerWallClick: false,
  bedWallClick: false,
  windowFramesClick: false,
  upperFloorClick: false,
  stairsClick: false,
  handRailClick: false,
};

export const clickReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorClick":
      return { ...state, lowerFloorClick: !state.lowerFloorClick };
    case "sideWallClick":
      return { ...state, sideWallClick: !state.sideWallClick };
    case "lowerWallClick":
      return { ...state, lowerWallClick: !state.lowerWallClick };
    case "bedWallClick":
      return { ...state, bedWallClick: !state.bedWallClick };
    case "windowFramesClick":
      return { ...state, windowFramesClick: !state.windowFramesClick };
    case "upperFloorClick":
      return { ...state, upperFloorClick: !state.upperFloorClick };
    case "stairsClick":
      return { ...state, stairsClick: !state.stairsClick };
    case "handRailClick":
      return { ...state, handRailClick: !state.handRailClick };
    case "reset":
      return initialClickState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const defaultMap = {
  map: "./Textures/wall-textures/beige-wall/beige_wall_001_diff_2k.jpg",
};
