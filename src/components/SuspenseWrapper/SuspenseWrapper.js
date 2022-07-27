import { PerspectiveCamera, Select } from "@react-three/drei";
import React, {
  useState,
  useMemo,
  Suspense,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { createWalls } from "../../wallCreator";
import { TransformControls, OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";

import Table from "../Table/Table";
import IsometericRoom from "../IsometricRoom/IsometricRoom";
import { useTransformControls } from "../../util";

export const SuspenseWrapper = (props) => {
  /* STATES */
  /* stores the selected item's index */
  const [selectedItem, setSelectedItem] = useState(null);
  const selected = (value) => {
    setSelectedItem(value);
  };

  const [s, setS] = useState([]);
  s[0] && console.log(s[0].name);

  const [TransformControlsRef, mode, enabled] = useTransformControls();

  return (
    <Suspense fallback={null}>
      <PerspectiveCamera
        fov={60}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[-30, 50, -30]}
      />
      <OrbitControls
        makeDefault
        target={s[0] ? s[0].position : new Vector3(0, 0, 0)}
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
