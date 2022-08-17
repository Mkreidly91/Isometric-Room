import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Bed(props) {
  const { nodes, materials } = useGLTF("misc/Bed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bed.geometry}
        material={nodes.Bed.material}
        position={[-1.6, 2.87, 0.01]}
        scale={[0.9, 1, 0.9]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Pillow_&_Mattress"].geometry}
        material={nodes["Pillow_&_Mattress"].material}
        position={[-1.6, 2.87, 0.01]}
        scale={[0.9, 1, 0.9]}
      />
    </group>
  );
}

useGLTF.preload("misc/Bed.glb");
