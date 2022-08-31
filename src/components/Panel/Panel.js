import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
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
import { useSelect } from "@react-three/drei";

const WallPanel = (props) => {
  const {
    texture,
    color,
    lowerFloorDispatch,
    roomDispatch,
    name,
    type,
    selected,
  } = props;

  return (
    <div>
      {selected.type !== "randomObject" && (
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
      )}
      {selected.type !== "randomObject" && (
        <ColorPicker
          selectedColor={color}
          dispatch={(value) => {
            roomDispatch({
              type: `color`,
              payload: { value: value, name: name },
            });
          }}
        />
      )}
      {selected.type !== "randomObject" && (
        <LowerFloorButtons lowerFloorDispatch={lowerFloorDispatch} />
      )}
      {selected.type === "randomObject" && (
        <button
          type="button"
          onClick={() => {
            lowerFloorDispatch({
              type: "delete",
              payload: { type: selected.name, me: selected.me },
            });
          }}
        >
          delete me
        </button>
      )}
    </div>
  );
};
export const ObjectPanel = (props) => {
  const { selected, resetSelected, portal } = props;
  const color = selected.userData.color;
  const dispatch = selected.userData.dispatch;
  const lowerFloorDispatch = props.lowerFloorDispatch;
  return createPortal(
    <div>
      <ColorPicker
        selected={selected}
        dispatch={(value) => {
          dispatch({ type: "color", payload: value });
        }}
      />
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({
            type: "delete",
            payload: { type: selected.name, me: selected.me },
          });
          resetSelected();
        }}
      >
        delete me
      </button>
    </div>,
    portal
  );
};
export const RoomPanel = (props) => {
  const { selected, portal } = props;

  const color = selected.userData.color;
  const texture = selected.userData.texture;
  const dispatch = selected.userData.dispatch;
  const lowerFloorDispatch = props.lowerFloorDispatch;
  const type = selected.objectType;
  const name = selected.name;

  return createPortal(
    <div>
      <TexturePicker
        type={type}
        selected={selected}
        dispatch={(value) => {
          dispatch({
            type: "texture",
            payload: { value: value, name: name },
          });
        }}
      />

      <ColorPicker
        selected={selected}
        dispatch={(value) => {
          dispatch({
            type: `color`,
            payload: { value: value, name: name },
          });
        }}
      />

      <LowerFloorButtons lowerFloorDispatch={lowerFloorDispatch} />
    </div>,
    portal
  );
};

export const Panel = (props) => {
  const { type, portal, name, colorDispatch, color, selected } = props;
  if (type === "Wall" || type === "Floor") {
    return createPortal(<WallPanel {...props} />, portal);
  }
  // return createPortal(<WallPanel {...props} />, portal);
};
