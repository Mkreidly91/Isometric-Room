import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Couch(props) {
  const { nodes, materials } = useGLTF("misc/Couch.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Couch.geometry}
        material={nodes.Couch.material}
        position={[-0.45, 0.4, -1.54]}
      />
    </group>
  );
}

useGLTF.preload("misc/Couch.glb");
