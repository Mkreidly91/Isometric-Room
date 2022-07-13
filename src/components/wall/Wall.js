import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  LinearEncoding,
  MeshStandardMaterial,
  RedFormat,
  TextureLoader,
  FrontSide,
} from "three";
import { useControls } from "leva";
import { useLoader } from "@react-three/fiber";

export default function Wall(props) {
  const group = useRef();
  const { scene, nodes } = useGLTF("wall/wall.glb");

  const texture = useTexture(props.texture);
  const material = new MeshStandardMaterial({ ...texture });

  //leva controls
  // const { setScale, setRotation } = useControls({
  //   scale: 0.2,
  //   rotation: [-Math.PI / 2, 0, 0],
  // });

  return (
    <mesh
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      castShadow
      receiveShadow
    >
      <boxGeometry attach="geometry" args={[10, 0.5, 5]} />
      <meshStandardMaterial attach="material-2" {...texture} />
      <meshBasicMaterial attach="material-0" color="black" />
      <meshBasicMaterial attach="material-1" color="black" />
      <meshBasicMaterial attach="material-3" color="black" />
      <meshBasicMaterial attach="material-4" color="black" />
      <meshBasicMaterial attach="material-5" color="black" />
    </mesh>
  );
}

useGLTF.preload("wall/wall.glb");
