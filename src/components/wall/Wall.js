import React, { useContext, useReducer, useRef, useState } from "react";
import { Html, useGLTF, useSelect, useTexture, Edges } from "@react-three/drei";
import { useHover } from "@use-gesture/react";
import { Color } from "three";
import { wrappingStyle } from "../../util";
import { textures } from "../../textures";
import { TexturePicker } from "../Panel/TexturePicker/TexturePicker";
import { createPortal } from "react-dom";
import { useControls } from "leva";
import { Panel } from "../Panel/Panel";
import { PortalContext } from "../../App";

const { textureMaps } = textures;
/*Reducer things*/
const initialState = {
  clicked: false,
  hovered: false,
  texture: textureMaps["beigeWall"],
  scale: 2,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "hovered":
      return { ...state, hovered: !state.hovered };
    case "change-texture":
      return { ...state, texture: action.payload };
    case "change-scale":
      return { ...state, scale: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default function Wall(props) {
  // leva controls
  const { index, focus, focusedItem, scale, rotation, position } = props;
  const item = useSelect();

  // const [store, materialProps] = useControls(item, {
  //   scale: { value: scale },
  //   rotation: { value: rotation },
  //   position: { value: position },
  // });

  /*STATES*/
  const [state, dispatch] = useReducer(reducer, initialState);

  // HOVER STATE

  const bind = useHover(() => {
    dispatch({ type: "hovered" });
  });

  const hoverObjRef = useRef();
  const hoverColor = new Color("hsl(135, 96%, 48%)");

  const texture = useTexture(state.texture);

  //wrapping mode of texture
  wrappingStyle({ texture: texture, mode: "repeat", ratio: [3, 1] });
  const portal = useContext(PortalContext);

  //checks if model was clicked
  const isClicked = index === focusedItem;
  const mouseOver = state.hovered;

  const PanelProps = {
    type: "Wall",
    texture: state.texture,
    scale: state.scale,
    // setTextureState: selectTexture,
    setTexture: dispatch,
    setScale: dispatch,
    portal: portal.current,
  };
  return (
    <group>
      <mesh
        type={props.type}
        index={props.index}
        position={props.position}
        rotation={props.rotation}
        scale={state.scale}
        castShadow
        receiveShadow
        onClick={() => {
          focus(index);
        }}
        ref={hoverObjRef}
        {...bind()}
        // userData={{ store }}
      >
        <boxGeometry attach="geometry" args={[15, 0.5, 5]} />
        <meshStandardMaterial attach="material-2" {...texture} />

        <meshBasicMaterial attach="material-0" color="white" />
        <meshBasicMaterial attach="material-1" color="white" />
        <meshBasicMaterial attach="material-3" color="white" />
        <meshBasicMaterial attach="material-4" color="white" />
        <meshBasicMaterial attach="material-5" color="white" />

        <Edges
          visible={mouseOver || isClicked ? true : false}
          scale={[1.1, 1.1, 1]}
          color={isClicked ? "red" : "black"}
          renderOrder={1000}
        ></Edges>
      </mesh>
      {/* <Html>{isClicked && <RenderToPortal />}</Html> */}
      <Html>{isClicked && <Panel {...PanelProps} />}</Html>
    </group>
  );
}

useGLTF.preload("wall/wall.glb");
