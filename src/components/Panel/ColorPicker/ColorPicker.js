import React from "react";
import { useState, useRef } from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ onChange, color }) => {
  return (
    <div>
      <SketchPicker
        disableAlpha
        color={color}
        onChange={(value) => {
          onChange(value.hex);
        }}
      />
    </div>
  );
};
