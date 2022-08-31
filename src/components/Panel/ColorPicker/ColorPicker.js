import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ dispatch, selected }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(selected.userData.color);
  }, [selected]);
  // console.log(selectedColor);
  return (
    <div>
      <SketchPicker
        disableAlpha
        color={color}
        onChange={(value) => {
          dispatch(value.hex);
          setColor(value.hex);
        }}
      />
    </div>
  );
};
