import React, {
  useRef,
  useContext,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { Html, useGLTF, useSelect } from "@react-three/drei";
import { Panel } from "../Panel/Panel";
import { PortalContext } from "../../App";
import { Edges, useTexture } from "@react-three/drei";
import { wrappingStyle } from "../../util";
import * as THREE from "three";

const initialColorState = {
  lowerFloorColor: "#808080",
  sideWallColor: "#808080",
  lowerWallColor: "#808080",
  bedWallColor: "#808080",
  windowFramesColor: "#808080",
  upperFloorColor: "#808080",
  stairsColor: "#808080",
  handRailColor: "#808080",
};
const colorReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorColor":
      return { ...state, lowerFloorColor: action.payload };
    case "sideWallColor":
      return { ...state, sideWallColor: action.payload };
    case "lowerWallColor":
      return { ...state, lowerWallColor: action.payload };
    case "bedWallColor":
      return { ...state, bedWallColor: action.payload };
    case "windowFramesColor":
      return { ...state, windowFramesColor: action.payload };
    case "upperFloorColor":
      return { ...state, upperFloorColor: action.payload };
    case "stairsColor":
      return { ...state, stairsColor: action.payload };
    case "handRailColor":
      return { ...state, handRailColor: action.payload };
    case "reset":
      return initialColorState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const initialHoverState = {
  lowerFloorHover: false,
  sideWallHover: false,
  lowerWallHover: false,
  bedWallHover: false,
  windowFramesHover: false,
  upperFloorHover: false,
  stairsHover: false,
  handRailHover: false,
};

const hoverReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorHover":
      return { ...state, lowerFloorHover: !state.lowerFloorHover };
    case "sideWallHover":
      return { ...state, sideWallHover: !state.sideWallHover };
    case "lowerWallHover":
      return { ...state, lowerWallHover: !state.lowerWallHover };
    case "bedWallHover":
      return { ...state, bedWallHover: !state.bedWallHover };
    case "windowFramesHover":
      return { ...state, windowFramesHover: !state.windowFramesHover };
    case "upperFloorHover":
      return { ...state, upperFloorHover: !state.upperFloorHover };
    case "stairsHover":
      return { ...state, stairsHover: !state.stairsHover };
    case "handRailHover":
      return { ...state, handRailHover: !state.handRailHover };
    case "reset":
      return initialHoverState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
const initialClickState = {
  lowerFloorClick: false,
  sideWallClick: false,
  lowerWallClick: false,
  bedWallClick: false,
  windowFramesClick: false,
  upperFloorClick: false,
  stairsClick: false,
  handRailClick: false,
};

const clickReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorClick":
      return { ...state, lowerFloorClick: !state.lowerFloorClick };
    case "sideWallClick":
      return { ...state, sideWallClick: !state.sideWallClick };
    case "lowerWallClick":
      return { ...state, lowerWallClick: !state.lowerWallClick };
    case "bedWallClick":
      return { ...state, bedWallClick: !state.bedWallClick };
    case "windowFramesClick":
      return { ...state, windowFramesClick: !state.windowFramesClick };
    case "upperFloorClick":
      return { ...state, upperFloorClick: !state.upperFloorClick };
    case "stairsClick":
      return { ...state, stairsClick: !state.stairsClick };
    case "handRailClick":
      return { ...state, handRailClick: !state.handRailClick };
    case "reset":
      return initialClickState;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const defaultMap = {
  map: "./Textures/wall-textures/beige-wall/beige_wall_001_diff_2k.jpg",
};

const initialTextureState = {
  lowerFloorTexture: "",
  sideWallTexture: "",
  lowerWallTexture: "",
  bedWallTexture: "",
  windowFramesTexture: "",
  upperFloorTexture: "",
  stairsTexture: "",
  handRailTexture: "",
};

const textureReducer = (state, action) => {
  switch (action.type) {
    case "lowerFloorTexture":
      return { ...state, lowerFloorTexture: action.payload };
    case "sideWallTexture":
      return { ...state, sideWallTexture: action.payload };
    case "lowerWallTexture":
      return { ...state, lowerWallTexture: action.payload };
    case "bedWallTexture":
      return { ...state, bedWallTexture: action.payload };
    case "windowFramesTexture":
      return { ...state, windowFramesTexture: action.payload };
    case "upperFloorTexture":
      return { ...state, upperFloorTexture: action.payload };
    case "stairsTexture":
      return { ...state, stairsTexture: action.payload };
    case "handRailTexture":
      return { ...state, handRailTexture: action.payload };
  }
};
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
  console.log(nodes);
  const portal = useContext(PortalContext);
  const selected = useSelect()[0];
  const isSelected = selected && names.includes(selected.name);

  useEffect(() => {
    if (!isSelected) clickDispatch({ type: "reset" });
    else if (isSelected) {
      clickDispatch({ type: "reset" });
      clickDispatch({ type: `${selected.name}Click` });
    }
  }, [selected]);

  const [colorState, colorDispatch] = useReducer(
    colorReducer,
    initialColorState
  );
  const [hoverState, hoverDispatch] = useReducer(
    hoverReducer,
    initialHoverState
  );
  const [clickState, clickDispatch] = useReducer(
    clickReducer,
    initialClickState
  );
  const [textureState, textureDispatch] = useReducer(
    textureReducer,
    initialTextureState
  );

  const {
    lowerFloorColor,
    sideWallColor,
    windowFramesColor,
    stairsColor,
    bedWallColor,
    handRailColor,
    lowerWallColor,
    upperFloorColor,
  } = colorState;

  const {
    lowerFloorHover,
    sideWallHover,
    windowFramesHover,
    stairsHover,
    bedWallHover,
    handRailHover,
    lowerWallHover,
    upperFloorHover,
  } = hoverState;

  const {
    lowerFloorClick,
    sideWallClick,
    windowFramesClick,
    stairsClick,
    bedWallClick,
    handRailClick,
    lowerWallClick,
    upperFloorClick,
  } = clickState;

  const {
    lowerFloorTexture,
    sideWallTexture,
    windowFramesTexture,
    stairsTexture,
    bedWallTexture,
    handRailTexture,
    lowerWallTexture,
    upperFloorTexture,
  } = textureState;

  const wrap = (texture) => {
    wrappingStyle({ texture: texture, mode: "repeat", ratio: [2, 2] });
  };
  const lf_tex = useTexture(
    lowerFloorTexture ? lowerFloorTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );

  const sw_tex = useTexture(
    sideWallTexture ? sideWallTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const wf_tex = useTexture(
    windowFramesTexture ? windowFramesTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const st_tex = useTexture(
    stairsTexture ? stairsTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const bw_tex = useTexture(
    bedWallTexture ? bedWallTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const lwm_tex = useTexture(
    lowerWallTexture ? lowerWallTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );
  const uf_tex = useTexture(
    upperFloorTexture ? upperFloorTexture : defaultMap,
    (texture) => {
      wrap(texture);
    }
  );

  const panelProps = selected && {
    type: selected.objectType,
    name: selected.name,
    color: colorState[`${selected.name}Color`],
    colorDispatch: colorDispatch,
    texture: textureState[`${selected.name}Texture`],
    textureDispatch: textureDispatch,
    portal: portal.current,
  };

  const hoverProps = {
    onPointerEnter: (event) => {
      event.stopPropagation();
      const name = event.eventObject.name;
      hoverDispatch({ type: `${name}Hover` });
    },
    onPointerLeave: (event) => {
      event.stopPropagation();
      const name = event.eventObject.name;
      hoverDispatch({ type: `${name}Hover` });
    },
  };

  return (
    <group {...props} dispose={null} castShadow receiveShadow>
      <Html>{isSelected && <Panel {...panelProps} />}</Html>
      <mesh
        objectType="Floor"
        name={names[0]}
        // castShadow
        receiveShadow
        geometry={nodes.Lower_Floor.geometry}
        position={[0, -0.1, 0]}
        {...hoverProps}
      >
        {!lowerFloorTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={lowerFloorHover ? 0.75 : 1}
            color={lowerFloorColor}
          />
        )}
        {lowerFloorTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={lowerFloorHover ? 0.75 : 1}
            color={lowerFloorColor}
            {...lf_tex}
          />
        )}
        <Edges
          visible={lowerFloorClick ? true : false}
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
          opacity={sideWallHover ? 0.75 : 1}
          color={sideWallColor}
        />

        {sideWallTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={sideWallHover ? 0.75 : 1}
            color={sideWallColor}
            {...sw_tex}
          />
        )}
        <Edges
          visible={sideWallClick ? true : false}
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
          opacity={stairsHover ? 0.75 : 1}
          color={stairsColor}
        />
        {stairsTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={stairsHover ? 0.75 : 1}
            color={stairsColor}
            {...st_tex}
          />
        )}
        <Edges
          visible={stairsClick ? true : false}
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
          opacity={handRailHover ? 0.75 : 1}
          color={handRailColor}
          metalness={0.5}
        />

        <Edges
          visible={handRailClick ? true : false}
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
          opacity={lowerWallHover ? 0.75 : 1}
          color={lowerWallColor}
        />
        {lowerWallTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={lowerWallHover ? 0.75 : 1}
            color={lowerWallColor}
            {...lwm_tex}
          />
        )}
        <Edges
          visible={lowerWallClick ? true : false}
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
          opacity={bedWallHover ? 0.75 : 1}
          color={bedWallColor}
        />
        {bedWallTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={bedWallHover ? 0.75 : 1}
            color={bedWallColor}
            {...bw_tex}
          />
        )}
        <Edges
          visible={bedWallClick ? true : false}
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
          opacity={upperFloorHover ? 0.75 : 1}
          color={upperFloorColor}
        />
        {upperFloorTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={upperFloorHover ? 0.75 : 1}
            color={upperFloorColor}
            {...uf_tex}
          />
        )}
        <Edges
          visible={upperFloorClick ? true : false}
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
          opacity={windowFramesHover ? 0.75 : 1}
          color={windowFramesColor}
        />
        {windowFramesTexture && (
          <meshStandardMaterial
            attach="material"
            transparent={true}
            opacity={windowFramesHover ? 0.75 : 1}
            color={windowFramesColor}
            {...wf_tex}
          />
        )}
        <Edges
          visible={windowFramesClick ? true : false}
          scale={[1, 1, 1]}
          color={"red"}
          renderOrder={1000}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/Isometeric-room/IsometricRoom.glb");
