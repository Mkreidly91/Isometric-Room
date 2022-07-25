import React, { useContext, useReducer, useRef, useState } from "react";
import { Html, useGLTF, useSelect, useTexture, Edges } from "@react-three/drei";
import { useHover } from "@use-gesture/react";

import { Panel } from "../Panel/Panel";
import { PortalContext } from "../../App";

const initialState = {
  clicked: false,
  hovered: false,
  scale: 1,
  color: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "clicked":
      return { ...state, clicked: true };
    case "hovered":
      return { ...state, hovered: !state.hovered };
    case "change-scale":
      return { ...state, scale: action.payload };
    case "change-color":
      return { ...state, color: action.payload };
    case "reset":
      return initialState;
    case "default":
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
export default function Table(props) {
  const selected = useSelect()[0];
  const { index, focus, focusedItem } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const portal = useContext(PortalContext);
  const panelProps = {
    type: "random object",
    scale: state.scale,
    dispatch: dispatch,
    portal: portal.current,
  };
  const group = useRef();
  const { nodes, materials } = useGLTF("/Table/Table.glb");
  const bind = useHover(() => {
    dispatch({ type: "hovered" });
  });
  const hoverObjRef = useRef();
  //checks if model was clicked
  const isClicked = index === focusedItem;
  const mouseOver = state.hovered;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dining_Table.geometry}
        // material={nodes.Dining_Table.material}
        position={[-0.19, 0.38, 1.32]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={state.scale}
        ref={hoverObjRef}
        onClick={() => {
          // focus(index);
        }}
        {...bind()}
      >
        <meshStandardMaterial
          attach="material"
          color={state.color}
          reflectivity={1}
        />
        {/* <Edges
          visible={mouseOver || isClicked ? true : false}
          scale={[1.1, 1.1, 1.1]}
          color={isClicked ? "red" : "black"}
          renderOrder={1000}
        /> */}
      </mesh>
      <Html>{isClicked && <Panel {...panelProps} />}</Html>
    </group>
  );
}

useGLTF.preload("/Table/Table.glb");
