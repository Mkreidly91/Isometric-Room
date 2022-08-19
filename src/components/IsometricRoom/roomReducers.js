export const roomState = {
  lowerFloor: {
    color: "#808080",
  },
  sideWall: {
    color: "#808080",
  },
  lowerWall: {
    color: "#808080",
  },
  bedWall: {
    color: "#808080",
  },
  windowFrames: {
    color: "#808080",
  },
  upperFloor: {
    color: "#808080",
  },
  stairs: {
    color: "#808080",
  },
  handRail: {
    color: "#808080",
  },
};

export const roomReducer = (state, action) => {
  const name = action.payload.name;
  const value = action.payload.value;
  switch (action.type) {
    case `color`:
      return {
        ...state,
        [`${name}Color`]: value,
      };
    case "reset":
      return initialColorState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const initialColorState = {
  lowerFloorColor: "#808080",
  sideWallColor: "#808080",
  lowerWallColor: "#808080",
  bedWallColor: "#808080",
  windowFramesColor: "#808080",
  upperFloorColor: "#808080",
  stairsColor: "#808080",
  handRailColor: "#808080",
};
export const colorReducer = (state, action) => {
  const name = action.payload.name;
  const value = action.payload.value;
  switch (action.type) {
    case `color`:
      return {
        ...state,
        [`${name}Color`]: value,
      };
    case "reset":
      return initialColorState;
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

export const initialTextureState = {
  lowerFloorTexture: "",
  sideWallTexture: "",
  lowerWallTexture: "",
  bedWallTexture: "",
  windowFramesTexture: "",
  upperFloorTexture: "",
  stairsTexture: "",
  handRailTexture: "",
};

export const textureReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorTexture":
      return { ...state, lowerFloorTexture: action.payload };
    case "sideWallTexture":
      return { ...state, sideWallTexture: action.payload };
    case "lowerWallTexture":
      return { ...state, lowerWallTexture: action.payload };
    case "bedWallTexture":
      return { ...state, bedWallTexture: action.payload };
    case "windowFramesTexture":
      return { ...state, windowFramesTexture: action.payload };
    case "upperFloorTexture":
      return { ...state, upperFloorTexture: action.payload };
    case "stairsTexture":
      return { ...state, stairsTexture: action.payload };
    case "handRailTexture":
      return { ...state, handRailTexture: action.payload };
  }
};
