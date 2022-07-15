import React, { useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useHover } from "@use-gesture/react";
import { Color } from "three";
import { wrappingStyle } from "../../util";
import { textures } from "../../textures";

export default function Wall(props) {
  const texture = useTexture(props.texture);

  wrappingStyle({ texture: texture, mode: "repeat", ratio: [3, 1] });
  // const [selectedTexture, setSelectedTexture] = useState(props.texture);
  //leva controls
  // const { setScale, setRotation } = useControls({
  //   scale: 0.2,
  //   rotation: [-Math.PI / 2, 0, 0],
  // });
  const [mouseOver, setMouseOver] = useState(false);
  const hoverState = () => {
    setMouseOver((prev) => !prev);
  };
  const hoverObjRef = useRef();

  const bind = useHover(() => {
    hoverState();
  });

  const color = new Color("hsl(135, 96%, 48%)");

  return (
    <mesh
      index={props.index}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      castShadow
      receiveShadow
      onClick={props.onClick}
      ref={hoverObjRef}
      {...bind()}
    >
      <boxGeometry attach="geometry" args={[15, 0.5, 5]} />
      <meshStandardMaterial
        attach="material-2"
        {...texture}
        color={mouseOver ? color : "white"}
        // wireframe={mouseOver ? true : false}
      />

      <meshBasicMaterial attach="material-0" color="black" />
      <meshBasicMaterial attach="material-1" color="black" />
      <meshBasicMaterial attach="material-3" color="black" />
      <meshBasicMaterial attach="material-4" color="black" />
      <meshBasicMaterial attach="material-5" color="black" />
    </mesh>
  );
}

useGLTF.preload("wall/wall.glb");
