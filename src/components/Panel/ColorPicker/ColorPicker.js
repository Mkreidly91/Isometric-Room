import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ dispatch, selectedColor }) => {
  const [color, setColor] = useState();
  useEffect(() => {
    setColor(selectedColor);
  }, [selectedColor]);
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
