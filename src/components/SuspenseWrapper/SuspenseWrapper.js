import { PerspectiveCamera, Select } from "@react-three/drei";
import React, {
  useState,
  useMemo,
  Suspense,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { TransformControls, OrbitControls, useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";

import Table from "../Table/Table";
import IsometericRoom from "../IsometricRoom/IsometricRoom";
import { useTransformControls } from "../../util";
import { FloorItems } from "../Items/FloorItems";

export const SuspenseWrapper = (props) => {
  const [s, setS] = useState([]);
  const selectedItem = s[0];

  const [TransformControlsRef, mode, enabled] =
    useTransformControls(selectedItem);
  const light = useRef();
  const light2 = useRef();

  const lightHelper = useHelper(light, PointLightHelper, 3, "red");
  const lightHelper2 = useHelper(light2, PointLightHelper, 3, "red");

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
      {enabled && s && (
        <TransformControls
          ref={TransformControlsRef}
          mode={mode}
          object={s[0]}
          enabled={true}
        />
      )}

      <Select
        box
        onChange={(value) => {
          !enabled && setS(value);
        }}
      >
        <IsometericRoom scale={5} />
        {/* <Table /> */}
      </Select>
    </Suspense>
  );
};
