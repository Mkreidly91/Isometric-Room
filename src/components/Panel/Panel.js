import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { TexturePicker } from "./TexturePicker/TexturePicker";
import { PortalContext } from "../../App";
import { ScaleSlider } from "./ScaleSlider/ScaleSlider";

const WallPanel = (props) => {
  const { textureState, setTextureState } = props;
  return (
    <div>
      <TexturePicker
        value={JSON.stringify(textureState)}
        onChange={(event) => {
          const value = event.target.value;
          setTextureState(value);
        }}
      />
      <ScaleSlider min={1} max={5} />
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
