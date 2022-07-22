import { Select } from "@react-three/drei";
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

import Table from "../Table/Table";
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
      <OrbitControls makeDefault />
      <TransformControls
        ref={TransformControlsRef}
        mode={mode}
        object={s[0]}
        enabled={s[0] ? true : false}
      />

      <Select box onChange={setS}>
        {walls}
        <Table focus={selected} index="table-0" focusedItem={selectedItem} />
      </Select>
    </Suspense>
  );
};
