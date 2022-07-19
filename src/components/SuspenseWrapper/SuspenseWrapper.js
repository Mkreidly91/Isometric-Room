import { Select } from "@react-three/drei";
import React, { useState, useMemo, Suspense } from "react";
import { wallsList, createWalls } from "../../wallCreator";

export const SuspenseWrapper = (props) => {
  /* STATES */

  /* stores the selected item's index */
  const [selectedItem, setSelectedItem] = useState(null);
  const selected = (value) => {
    setSelectedItem(value);
  };

  /* create walls */
  const walls = useMemo(() => {
    return createWalls({
      focus: selected,
      focusedItem: selectedItem,
      portal: props.portal,
    });
  }, [wallsList, selectedItem]);
  return (
    <Suspense fallback={null}>
      <Select box>{walls}</Select>
    </Suspense>
  );
};
