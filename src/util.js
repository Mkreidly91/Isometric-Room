import {
  RepeatWrapping,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
} from "three";
import { useState, useRef, useEffect } from "react";

//Control the wrapping style on texures,mainly used for tiling textures on surfaces.
export const wrappingStyle = (args) => {
  const { texture, mode, ratio } = args;
  let wrappingMode;
  const [repeatX, repeatY] = ratio;
  if (!mode || mode === "clampToEdge") {
    wrappingMode = ClampToEdgeWrapping;
  } else if (mode === "repeat") {
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

//controls for the transform controls
export const useTransformControls = (selected) => {
  const TransformControlsRef = useRef();
  let [mode, setMode] = useState("translate");
  let [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!selected) {
      setEnabled(false);
      return;
    }
    if (enabled) {
      const controls = TransformControlsRef.current;
      if (mode === "translate") {
        controls.showY = false;
        controls.showX = controls.showZ = true;
      } else if (mode === "rotate") {
        controls.showY = true;
        controls.showX = controls.showZ = false;
      } else {
        controls.showY = controls.showX = controls.showZ = true;
      }
    }
    const handleKeyUp = (event) => {
      switch (event.key) {
        case "r":
          setMode("rotate");
          break;
        case "t":
          setMode("translate");
          break;
        case "s":
          setMode("scale");
          break;
        case "e":
          setEnabled((prev) => !prev);
          break;
        case "Escape":
          TransformControlsRef.current.reset();
          break;
      }
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [selected, enabled, mode]);
  return [TransformControlsRef, mode, enabled];
};
