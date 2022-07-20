import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { TexturePicker } from "./TexturePicker/TexturePicker";
import { PortalContext } from "../../App";
import { ScaleSlider } from "./ScaleSlider/ScaleSlider";

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

export const Panel = (props) => {
  // const portal = useContext(PortalContext);
  const { type, portal } = props;
  if (type === "Wall") {
    return createPortal(<WallPanel {...props} />, portal);
  }
};
