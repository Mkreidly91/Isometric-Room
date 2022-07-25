import React from "react";
import { createPortal } from "react-dom";
import { TexturePicker } from "./TexturePicker/TexturePicker";

import { ScaleSlider } from "./ScaleSlider/ScaleSlider";
import { ColorPicker } from "./ColorPicker/ColorPicker";
const WallPanel = (props) => {
  const { texture, setTexture, scale, setScale } = props;
  return (
    <div>
      <TexturePicker
        value={JSON.stringify(texture)}
        onChange={(event) => {
          const value = JSON.parse(event.target.value);
          setTexture({ type: "change-texture", payload: value });
        }}
      />
      <ScaleSlider
        min={1}
        max={5}
        value={scale}
        onChange={(event) => {
          const value = event.target.value;
          setScale({ type: "change-scale", payload: value });
        }}
      />
    </div>
  );
};

const RandomPanel = (props) => {
  const { scale, color, dispatch } = props;
  return (
    <div>
      <ScaleSlider
        min={1}
        max={5}
        step={0.1}
        value={scale}
        onChange={(event) => {
          const value = event.target.value;
          dispatch({ type: "change-scale", payload: value });
        }}
      />
      <ColorPicker
        onChange={(event) => {
          const value = event.target.value;
          dispatch({ type: "change-color", payload: value });
        }}
      />
      ,
    </div>
  );
};

export const Panel = (props) => {
  // const portal = useContext(PortalContext);
  const { type, portal, name, dispatch } = props;

  if (type === "Wall") {
    return createPortal(<WallPanel {...props} />, portal);
  } else if (type === "random object") {
    return createPortal(<RandomPanel {...props} />, portal);
  } else {
    return createPortal(
      <ColorPicker
        onChange={(event) => {
          const value = event.target.value;
          props.dispatch({ type: `${name}Color`, payload: value });
        }}
      />,
      portal
    );
  }
};
