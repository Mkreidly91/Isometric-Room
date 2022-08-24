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

export function Chair(props) {
  const { nodes, materials } = useGLTF("misc/Chair.glb");
  const selected = useSelect()[0];
  const chairRef = useRef();
  const isSelected =
    selected && chairRef.current && selected.uuid === chairRef.current.uuid;
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
        type="randomObject"
        name="chair"
        me={props.me}
        ref={chairRef}
        castShadow
        receiveShadow
        geometry={nodes.Chair.geometry}
        position={[0.1, 0.45, 1.8]}
        rotation={[Math.PI, 0, Math.PI]}
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
          <Edges
            visible={true}
            scale={[1, 1, 1]}
            color={"red"}
            renderOrder={1000}
          />
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload("misc/Chair.glb");
