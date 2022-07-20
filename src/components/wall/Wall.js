import React, { useContext, useRef, useState } from "react";
import { Html, useGLTF, useSelect, useTexture, Edges } from "@react-three/drei";
import { useHover } from "@use-gesture/react";
import { Color } from "three";
import { wrappingStyle } from "../../util";
import { textures } from "../../textures";
import { TexturePicker } from "../TexturePicker/TexturePicker";
import { createPortal } from "react-dom";
import { useControls } from "leva";
import { PortalContext } from "../../App";
export default function Wall(props) {
  // leva controls
  const { index, focus, focusedItem, scale, rotation, position } = props;
  const item = useSelect();

  // const [store, materialProps] = useControls(item, {
  //   scale: { value: scale },
  //   rotation: { value: rotation },
  //   position: { value: position },
  // });

  const { textureMaps } = textures;
  /*STATES*/
  // HOVER STATE
  const [mouseOver, setMouseOver] = useState(false);
  const bind = useHover(() => {
    hoverState();
  });

  const hoverState = () => {
    setMouseOver((prev) => !prev);
  };
  const hoverObjRef = useRef();
  const hoverColor = new Color("hsl(135, 96%, 48%)");

  // TEXTURE STATE
  const [selectedTexture, setSelectedTexture] = useState(
    textureMaps["beigeWall"]
  );
  const selectTexture = (value) => {
    setSelectedTexture(JSON.parse(value));
  };
  const texture = useTexture(selectedTexture);
  //wrapping mode of texture
  wrappingStyle({ texture: texture, mode: "repeat", ratio: [3, 1] });
  const portal = useContext(PortalContext);

  const RenderToPortal = () => {
    return createPortal(
      <TexturePicker
        value={JSON.stringify(selectedTexture)}
        onChange={(event) => {
          const value = event.target.value;
          selectTexture(value);
        }}
      />,
      portal.current
    );
  };

  //checks if model was clicked
  const isClicked = index === focusedItem;

  console.log(`${index} rendered`);
  // console.log(isClicked, index, focusedItem, index === focusedItem);
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
        // userData={{ store }}
      >
        <boxGeometry attach="geometry" args={[15, 0.5, 5]} />
        <meshStandardMaterial
          attach="material-2"
          {...texture}
          // color={mouseOver ? hoverColor : "white"}
          // wireframe={mouseOver ? true : false}
        />

        <meshBasicMaterial attach="material-0" color="white" />
        <meshBasicMaterial attach="material-1" color="white" />
        <meshBasicMaterial attach="material-3" color="white" />
        <meshBasicMaterial attach="material-4" color="white" />
        <meshBasicMaterial attach="material-5" color="white" />

        <Edges
          visible={mouseOver || isClicked ? true : false}
          scale={[1.1, 1.1, 1]}
          color={isClicked ? "red" : "black"}
          renderOrder={1000}
        >
          {/* <meshBasicMaterial
              transparent
              
              depthTest={false}
            /> */}
        </Edges>
      </mesh>
      <Html>{isClicked && <RenderToPortal />}</Html>
    </group>
  );
}

useGLTF.preload("wall/wall.glb");
