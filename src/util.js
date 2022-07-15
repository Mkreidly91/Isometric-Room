import {
  RepeatWrapping,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
} from "three";

//Control the wrapping style on texures,mainly used for tiling textures on surfaces.
export const wrappingStyle = (args) => {
  const { texture, mode, ratio } = args;
  let wrappingMode;
  const [repeatX, repeatY] = ratio;
  if (!mode || mode === "clampToEdge") {
    wrappingMode = ClampToEdgeWrapping;
  }
  if (mode === "repeat") {
    wrappingMode = RepeatWrapping;
  } else if (mode === "mirroredRepeat") {
    wrappingMode = MirroredRepeatWrapping;
  }
  Object.keys(texture).forEach((element) => {
    const map = texture[element];
    map.wrapS = wrappingMode;
    map.wrapT = wrappingMode;
    map.repeat.set(repeatX, repeatY);
  });
};
