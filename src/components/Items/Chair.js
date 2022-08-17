import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Chair(props) {
  const { nodes, materials } = useGLTF("misc/Chair.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair.geometry}
        material={nodes.Chair.material}
        position={[0.1, 0.45, 1.8]}
        rotation={[Math.PI, 0, Math.PI]}
      />
    </group>
  );
}

useGLTF.preload("misc/Chair.glb");
