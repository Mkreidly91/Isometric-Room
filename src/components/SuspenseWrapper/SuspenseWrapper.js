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

  /* create walls */
  const walls = useMemo(() => {
    return createWalls({
      focus: selected,
      focusedItem: selectedItem,
    });
  }, [selectedItem, props.portal]);

  const [TransformControlsRef, mode] = useTransformControls();
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
      <TransformControls
        ref={TransformControlsRef}
        mode={mode}
        object={s[0]}
        // enabled={s[0] ? true : false}
      />
      <Select box onChange={setS}>
        <IsometericRoom scale={5} />
        <Table />
        {/* {walls}
        <Table focus={selected} index="table-0" focusedItem={selectedItem} /> */}
      </Select>
    </Suspense>
  );
};
