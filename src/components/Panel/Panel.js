import React, { useReducer } from "react";
import { createPortal } from "react-dom";
import { TexturePicker } from "./TexturePicker/TexturePicker";
import { ScaleSlider } from "./ScaleSlider/ScaleSlider";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import { FloorItems } from "../Items/FloorItems";
import { LowerFloorButtons } from "./itemPicker/itemPicker";
import {
  initialLowerFloorItems,
  lowerFloorReducer,
} from "../IsometricRoom/itemReducers";

const WallPanel = (props) => {
  const {
    texture,
    color,
    colorDispatch,
    textureDispatch,
    lowerFloorDispatch,
    roomDispatch,
    name,
    type,
    selected,
  } = props;
  return (
    <div>
      <TexturePicker
        type={type}
        value={JSON.stringify(texture)}
        setTexture={(value) => {
          roomDispatch({
            type: "texture",
            payload: { value: value, name: name },
          });
        }}
      />
      <ColorPicker
        color={color}
        setColor={(value) => {
          roomDispatch({
            type: `color`,
            payload: { value: value, name: name },
          });
        }}
      />
      <LowerFloorButtons lowerFloorDispatch={lowerFloorDispatch} />
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({
            type: "delete",
            payload: { type: "table", me: selected.me },
          });
        }}
      >
        delete me
      </button>
    </div>
  );
};
const ObjectPanel = (props) => {
  const { type, name, colorDispatch, color, selected } = props;
  // const [lowerFloorState, lowerFloorDispatch] = useReducer(
  //   lowerFloorReducer,
  //   initialLowerFloorItems
  // );
  return (
    <div>
      <ColorPicker
        color={color}
        setColor={(value) => {
          colorDispatch({ type: `${name}Color`, payload: value });
        }}
      />
      {/* <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({
            type: "delete",
            payload: { type: "table", me: selected },
          });
        }}
      >
        delete me
      </button> */}
    </div>
  );
};

export const Panel = (props) => {
  const { type, portal, name, colorDispatch, color, selected } = props;
  //   if (type === "Wall" || type === "Floor") {
  //     return createPortal(<WallPanel {...props} />, portal);
  //   } else {
  //     return createPortal(<ObjectPanel {...props} />, portal);
  //   }
  return createPortal(<WallPanel {...props} />, portal);
};
