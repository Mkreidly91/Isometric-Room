import React, { useRef, useContext, useReducer } from "react";
import { Edges, useGLTF, useSelect } from "@react-three/drei";

const initialState = {
  click: false,
  hover: false,
  color: "#FFFFFF",
  visible: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "click":
      return { ...state, click: true };
    case "hover":
      return { ...state, hover: !state.hover };
    case "color":
      return { ...state, color: action.payload };
    case "reset":
      return initialState;
    case "delete":
      return { ...state, visible: !state.visible };
    case "default":
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export function Carpet(props) {
  const { nodes, materials } = useGLTF("misc/Carpet.glb");
  const selected = useSelect()[0];
  const carpetRef = useRef();
  const isSelected =
    selected && carpetRef.current && selected.uuid === carpetRef.current.uuid;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { click, hover, color, visible } = state;

  const hoverProps = {
    onPointerEnter: (event) => {
      event.stopPropagation();
      dispatch({ type: "hover" });
    },
    onPointerLeave: (event) => {
      event.stopPropagation();
      dispatch({ type: "hover" });
    },
  };
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={carpetRef}
        name="carpet"
        type="randomObject"
        me={props.me}
        castShadow
        receiveShadow
        geometry={nodes.Carpet.geometry}
        position={[-0.19, 0, 1.32]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1.32, 1, 2.27]}
        userData={{ dispatch: dispatch, color: color }}
        visible={visible}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          color={color}
          reflectivity={1}
          transparent={true}
          opacity={hover ? 0.75 : 1}
        />
        {isSelected && (
          <Edges visible={true} scale={1} color={"red"} renderOrder={1000} />
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("misc/Carpet.glb");
