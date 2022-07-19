import React, { useRef, useState } from "react";
import { Html, useGLTF, useSelect, useTexture } from "@react-three/drei";
import { useHover } from "@use-gesture/react";
import { Color } from "three";
import { wrappingStyle } from "../../util";
import { textures } from "../../textures";
import { TexturePicker } from "../TexturePicker/TexturePicker";
import { createPortal } from "react-dom";
import { useControls } from "leva";

export default function Wall(props) {
  //leva controls
  // const { setScale, setRotation, setPosition } = useControls({
  //   setScale: 1,
  //   setRotation: [-Math.PI / 2, 0, 0],
  //   setPosition: props.position,
  // });
  const select = useSelect();
  const { textureMaps } = textures;
  const [mouseOver, setMouseOver] = useState(false);
  const hoverState = () => {
    setMouseOver((prev) => !prev);
  };
  const hoverObjRef = useRef();

  const bind = useHover(() => {
    hoverState();
  });

  const color = new Color("hsl(135, 96%, 48%)");
  const [isSelected, setIsSelected] = useState(false);
  /* maps item index to it's selected texture */
  const [selectedTexture, setSelectedTexture] = useState(
    textureMaps["beigeWall"]
  );
  const selectTexture = (value) => {
    setSelectedTexture(JSON.parse(value));
  };
  const texture = useTexture(selectedTexture);
  const { index, focus, focusedItem } = props;

  // checkIfSelected();
  wrappingStyle({ texture: texture, mode: "repeat", ratio: [3, 1] });
  console.log(props.portal);
  const RenderToPortal = () => {
    return createPortal(
      <TexturePicker
        value={JSON.stringify(selectedTexture)}
        onChange={(event) => {
          const value = event.target.value;
          selectTexture(value);
        }}
      />,
      props.portal.current
    );
  };

  return (
    <group>
      <mesh
        type={props.type}
        index={props.index}
        position={props.position}
        rotation={props.rotation}
        scale={props.scale}
        castShadow
        receiveShadow
        onClick={() => {
          focus(index);
        }}
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
      <Html>{index === focusedItem && <RenderToPortal />}</Html>
    </group>
  );
}

useGLTF.preload("wall/wall.glb");
