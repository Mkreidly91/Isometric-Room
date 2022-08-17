import React from "react";
import { createPortal } from "react-dom";
import { TexturePicker } from "./TexturePicker/TexturePicker";
import { ScaleSlider } from "./ScaleSlider/ScaleSlider";
import { ColorPicker } from "./ColorPicker/ColorPicker";

const WallPanel = (props) => {
  const { texture, color, colorDispatch, textureDispatch, name, type } = props;
  return (
    <div>
      <TexturePicker
        type={type}
        value={JSON.stringify(texture)}
        setTexture={(value) => {
          textureDispatch({ type: `${name}Texture`, payload: value });
        }}
      />
      <ColorPicker
        color={color}
        setColor={(value) => {
          colorDispatch({ type: `${name}Color`, payload: value });
        }}
      />
    </div>
  );
};

export const Panel = (props) => {
  const { type, portal, name, colorDispatch, color } = props;
  if (type === "Wall" || type === "Floor") {
    return createPortal(<WallPanel {...props} />, portal);
  } else {
    return createPortal(
      <ColorPicker
        color={color}
        setColor={(value) => {
          colorDispatch({ type: `${name}Color`, payload: value });
        }}
      />,
      portal
    );
  }
};
