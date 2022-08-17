import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Planter(props) {
  const { nodes, materials } = useGLTF("misc/Planter.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Planter.geometry}
        material={nodes.Planter.material}
        position={[0.29, 0.26, -1.1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plant.geometry}
        material={nodes.Plant.material}
        position={[0.29, 0.26, -1.1]}
      />
    </group>
  );
}

useGLTF.preload("misc/Planter.glb");
