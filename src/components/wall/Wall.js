import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Wall(props) {
  const { scene, nodes } = useGLTF("wall/wall.glb");

  const texture = useTexture(props.texture);

  //leva controls
  // const { setScale, setRotation } = useControls({
  //   scale: 0.2,
  //   rotation: [-Math.PI / 2, 0, 0],
  // });

  return (
    <mesh
      index={props.index}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      castShadow
      receiveShadow
      onClick={props.onClick}
    >
      <boxGeometry attach="geometry" args={[10, 0.5, 5]} />
      <meshStandardMaterial attach="material-2" {...texture} color="" />
      <meshBasicMaterial attach="material-0" color="black" />
      <meshBasicMaterial attach="material-1" color="black" />
      <meshBasicMaterial attach="material-3" color="black" />
      <meshBasicMaterial attach="material-4" color="black" />
      <meshBasicMaterial attach="material-5" color="black" />
    </mesh>
  );
}

useGLTF.preload("wall/wall.glb");
