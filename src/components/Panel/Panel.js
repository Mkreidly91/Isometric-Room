import React from "react";
import { createPortal } from "react-dom";
import { TexturePicker } from "./TexturePicker/TexturePicker";
import { ScaleSlider } from "./ScaleSlider/ScaleSlider";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { FloorItems } from "../Items/FloorItems";

const WallPanel = (props) => {
  const {
    texture,
    color,
    colorDispatch,
    textureDispatch,
    lowerFloorDispatch,
    name,
    type,
  } = props;
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
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({ type: "addTable" });
        }}
      >
        add table
      </button>
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({ type: "addChair" });
        }}
      >
        add Chair
      </button>
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({ type: "addCarpet" });
        }}
      >
        add Carpet
      </button>
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
