import { PerspectiveCamera, Select, Html } from "@react-three/drei";
import React, {
  useState,
  Suspense,
  useRef,
  useContext,
  useEffect,
  useReducer,
  createContext,
} from "react";

import { TransformControls, OrbitControls, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";

import IsometericRoom from "../IsometricRoom/IsometricRoom";
import { useTransformControls } from "../../util";
import { ObjectPanel } from "../Panel/Panel";
import { RoomPanel } from "../Panel/Panel";
import { PortalContext } from "../../App";

import {
  lowerFloorReducer,
  initialLowerFloorItems,
} from "../Items/itemReducers";

export const SuspenseWrapper = (props) => {
  const [s, setS] = useState([]);
  const resetSelected = () => {
    setS([]);
  };
  const selectedItem = s[0];

  const [TransformControlsRef, mode, enabled] =
    useTransformControls(selectedItem);
  const TransformContext = createContext();

  const light = useRef();
  const light2 = useRef();
  const lightHelper = useHelper(light, PointLightHelper, 3, "red");
  const lightHelper2 = useHelper(light2, PointLightHelper, 3, "red");

  const portal = useContext(PortalContext);

  const [lowerFloorState, lowerFloorDispatch] = useReducer(
    lowerFloorReducer,
    initialLowerFloorItems
  );

  return (
    <Suspense fallback={null}>
      <pointLight
        ref={light}
        intensity={4}
        penumbra={0}
        position={[-10, 30, 20]}
        castShadow
      />
      <pointLight
        ref={light2}
        intensity={1}
        penumbra={0}
        position={[20, 30, -10]}
        castShadow
        visible={true}
      />
      <OrbitControls
        makeDefault
        // target={new Vector3(0, 0, 0)}
        // target={s[0] ? s[0].position : new Vector3(0, 0, 0)}
      />
      {enabled && selectedItem && (
        <TransformControls
          ref={TransformControlsRef}
          mode={mode}
          object={selectedItem}
          enabled={true}
        />
      )}
      <Html>
        {selectedItem && selectedItem.type === "randomObject" && (
          <ObjectPanel
            selected={selectedItem}
            resetSelected={resetSelected}
            portal={portal.current}
            lowerFloorDispatch={lowerFloorDispatch}
          />
        )}
        {selectedItem && selectedItem.type !== "randomObject" && (
          <RoomPanel
            selected={selectedItem}
            portal={portal.current}
            lowerFloorDispatch={lowerFloorDispatch}
          />
        )}
      </Html>
      {/* <TransformContext.Provider value={enabled}> */}
      <Select
        box
        onChange={(value) => {
          !enabled && setS(value);
        }}
      >
        <IsometericRoom
          scale={5}
          transformEnabled={enabled}
          children={lowerFloorState}
        />
      </Select>
      {/* </TransformContext.Provider> */}
    </Suspense>
  );
};
