import React, { useContext, useReducer, useRef } from "react";
import { Html, useGLTF, useSelect, useTexture, Edges } from "@react-three/drei";

import { Panel } from "../Panel/Panel";
import { PortalContext } from "../../App";

const initialState = {
  clicked: false,
  hovered: false,
  scale: 5,
  color: "#FFFFFF",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "clicked":
      return { ...state, clicked: true };
    case "hovered":
      return { ...state, hovered: !state.hovered };
    case "change-scale":
      return { ...state, scale: action.payload };
    case "tableColor":
      return { ...state, color: action.payload };
    case "reset":
      return initialState;
    case "default":
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
const name = "table";

export default function Table(props) {
  const selected = useSelect()[0];
  const isSelected = selected && selected.name === name;

  const [state, dispatch] = useReducer(reducer, initialState);

  const portal = useContext(PortalContext);

  const group = useRef();
  const { nodes, materials } = useGLTF("Table/Table.glb");

  const panelProps = isSelected && {
    name: name,
    color: state.color,
    dispatch: dispatch,
    portal: portal.current,
  };

  const hoverProps = {
    onPointerEnter: (event) => {
      event.stopPropagation();
      const name = event.eventObject.name;
      dispatch({ type: `${name}Hover` });
    },
    onPointerLeave: (event) => {
      event.stopPropagation();
      const name = event.eventObject.name;
      dispatch({ type: `${name}Hover` });
    },
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name={name}
        castShadow
        receiveShadow
        geometry={nodes.Dining_Table.geometry}
        position={[-0.19, 1.9, 1.32]}
        rotation={[Math.PI, 0, Math.PI]}
        {...hoverProps}
        scale={state.scale}
      >
        <meshStandardMaterial
          attach="material"
          color={state.color}
          reflectivity={1}
        />
        {isSelected && (
          <Edges
            visible={true}
            scale={[1, 1, 1]}
            color={"red"}
            renderOrder={1000}
          />
        )}
      </mesh>
      <Html>{isSelected && <Panel {...panelProps} />}</Html>
    </group>
  );
}

useGLTF.preload("Table/Table.glb");
