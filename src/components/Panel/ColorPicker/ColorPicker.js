import React from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ setColor, color }) => {
  return (
    <div>
      <SketchPicker
        disableAlpha
        color={color}
        onChange={(value) => {
          setColor(value.hex);
        }}
      />
    </div>
  );
};
