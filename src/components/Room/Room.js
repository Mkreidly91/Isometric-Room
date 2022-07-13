import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshBasicMaterial } from "three";

export default function Room({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("room/white-room.glb");
  //   materials.Custom.color = "rgb(255,0,0)";
  //   materials.diffuse_0_0_0_255.color = "rgb(255,0,0)";
  //   materials.diffuse_0_0_0_255.emissiveIntensity = 0;
  console.log(materials);
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Custom}
          material-color="Red"
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.diffuse_0_0_0_255}
          material-color="Red"
        />
      </group>
    </group>
  );
}

useGLTF.preload("/white-room.glb");
