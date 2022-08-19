import React, { useContext, useReducer, useEffect, useRef } from "react";
import { Html, useGLTF, useSelect } from "@react-three/drei";
import { Panel } from "../Panel/Panel";
import { PortalContext } from "../../App";
import { Edges, useTexture } from "@react-three/drei";
import { wrappingStyle } from "../../util";
import * as THREE from "three";

import { roomState, roomReducer, defaultMap } from "./roomReducers";

import { initialLowerFloorItems, lowerFloorReducer } from "./itemReducers";

const names = [
  "lowerFloor",
  "sideWall",
  "stairs",
  "handRail",
  "lowerWall",
  "bedWall",
  "upperFloor",
  "windowFrames",
];

export default function IsometericRoom(props) {
  const { nodes, materials } = useGLTF("/Isometric-room/IsometricRoom.glb");

  const portal = useContext(PortalContext);
  const selected = useSelect()[0];
  const isSelected = selected && names.includes(selected.name);

  useEffect(() => {
    if (!isSelected) roomDispatch({ type: "resetClick" });
    else if (isSelected) {
      roomDispatch({ type: "resetClick" });
      roomDispatch({ type: "click", payload: { name: selected.name } });
    }
  }, [selected]);
  const [state, roomDispatch] = useReducer(roomReducer, roomState);

  const [lowerFloorState, lowerFloorDispatch] = useReducer(
    lowerFloorReducer,
    initialLowerFloorItems
  );

  const {
    lowerFloor,
    sideWall,
    windowFrames,
    stairs,
    bedWall,
    handRail,
    lowerWall,
    upperFloor,
  } = state;

  const wrap = (texture) => {
    wrappingStyle({ texture: texture, mode: "repeat", ratio: [2, 2] });
  };
  const lf_tex = useTexture(
    lowerFloor.texture ? lowerFloor.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );

  const sw_tex = useTexture(
    sideWall.texture ? sideWall.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const wf_tex = useTexture(
    windowFrames.texture ? windowFrames.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const st_tex = useTexture(
    stairs.texture ? stairs.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const bw_tex = useTexture(
    bedWall.texture ? bedWall.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const lwm_tex = useTexture(
    lowerWall.texture ? lowerWall.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const uf_tex = useTexture(
    upperFloor.texture ? upperFloor.texture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  console.log(selected);

  const panelProps = selected && {
    selected: selected,
    type: selected.objectType,
    name: selected.name,
    color: state[selected.name]?.color || selected.material.color,
    texture: state[selected.name]?.texture,
    lowerFloorDispatch: lowerFloorDispatch,
    roomDispatch: roomDispatch,
    portal: portal.current,
  };

  const hoverProps = {
    onPointerEnter: (event) => {
      event.stopPropagation();
      const name = event.eventObject.name;
      roomDispatch({ type: "hover", payload: { name: name } });
    },
    onPointerLeave: (event) => {
      event.stopPropagation();
      const name = event.eventObject.name;
      roomDispatch({ type: "hover", payload: { name: name } });
    },
  };
  const lowerFloorItems = () => {
    const { table, chair, carpet } = lowerFloorState;
    return [table, chair, carpet];
  };

  return (
    <group {...props} dispose={null} castShadow receiveShadow>
      <Html>{selected && <Panel {...panelProps} />}</Html>
      <mesh
        objectType="Floor"
        name={names[0]}
        castShadow
        receiveShadow
        geometry={nodes.Lower_Floor.geometry}
        position={[0, -0.1, 0]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={lowerFloor.hover ? 0.75 : 1}
          color={lowerFloor.color}
        />
        {lowerFloor.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={lowerFloor.hover ? 0.75 : 1}
            color={lowerFloor.color}
            {...lf_tex}
          />
        )}
        )
        <Edges
          visible={lowerFloor.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        objectType="Wall"
        name={names[1]}
        castShadow
        receiveShadow
        geometry={nodes.Side_wall_Total.geometry}
        position={[-0.05, 2.5, -2.55]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={sideWall.hover ? 0.75 : 1}
          color={sideWall.color}
        />

        {sideWall.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={sideWall.hover ? 0.75 : 1}
            color={sideWall.color}
            {...sw_tex}
          />
        )}
        <Edges
          visible={sideWall.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        objectType="Wall"
        name={names[2]}
        castShadow
        receiveShadow
        geometry={nodes.Stairs.geometry}
        position={[1.25, 1.1, -1.1]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={stairs.hover ? 0.75 : 1}
          color={stairs.color}
        />
        {stairs.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={stairs.hover ? 0.75 : 1}
            color={stairs.color}
            {...st_tex}
          />
        )}
        <Edges
          visible={stairs.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        name={names[3]}
        castShadow
        receiveShadow
        geometry={nodes.Handrail.geometry}
        position={[-0.47, 1.41, -0.18]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={handRail.hover ? 0.75 : 1}
          color={handRail.color}
          metalness={0.5}
        />

        <Edges
          visible={handRail.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        objectType="Wall"
        name={names[4]}
        geometry={nodes.Lower_Wall_Main.geometry}
        position={[-2.55, 2.5, 0]}
        castShadow
        receiveShadow
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={lowerWall.hover ? 0.75 : 1}
          color={lowerWall.color}
        />
        {lowerWall.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={lowerWall.hover ? 0.75 : 1}
            color={lowerWall.color}
            {...lwm_tex}
          />
        )}
        <Edges
          visible={lowerWall.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        objectType="Wall"
        name={names[5]}
        castShadow
        receiveShadow
        geometry={nodes.Bedwall_Section.geometry}
        position={[-2.55, 3.8, -0.63]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={bedWall.hover ? 0.75 : 1}
          color={bedWall.color}
        />
        {bedWall.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={bedWall.hover ? 0.75 : 1}
            color={bedWall.color}
            {...bw_tex}
          />
        )}
        <Edges
          visible={bedWall.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        objectType="Floor"
        name={names[6]}
        castShadow
        receiveShadow
        geometry={nodes.Upper_Floor.geometry}
        position={[-1.25, 2.3, -0.63]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={upperFloor.hover ? 0.75 : 1}
          color={upperFloor.color}
        />
        {upperFloor.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={upperFloor.hover ? 0.75 : 1}
            color={upperFloor.color}
            {...uf_tex}
          />
        )}
        <Edges
          visible={upperFloor.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      <mesh
        objectType="Wall"
        name={names[7]}
        castShadow
        receiveShadow
        geometry={nodes.Window_Frames.geometry}
        position={[-0.12, 2.95, -0.07]}
        {...hoverProps}
      >
        <meshStandardMaterial
          attach="material"
          transparent={true}
          opacity={windowFrames.hover ? 0.75 : 1}
          color={windowFrames.color}
        />
        {windowFrames.texture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={windowFrames.hover ? 0.75 : 1}
            color={windowFrames.color}
            {...wf_tex}
          />
        )}
        <Edges
          visible={windowFrames.click}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
      {lowerFloorItems()}
    </group>
  );
}

useGLTF.preload("/Isometeric-room/IsometricRoom.glb");
