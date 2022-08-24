import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Carpet(props) {
  const { nodes, materials } = useGLTF("misc/Carpet.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="carpet"
        type="randomObject"
        me={props.me}
        castShadow
        receiveShadow
        geometry={nodes.Carpet.geometry}
        material={nodes.Carpet.material}
        position={[-0.19, 0, 1.32]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1.32, 1, 2.27]}
      />
    </group>
  );
}

useGLTF.preload("misc/Carpet.glb");
