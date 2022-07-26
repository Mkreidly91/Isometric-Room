import React from "react";
import { useState, useRef } from "react";

export const ColorPicker = ({ onChange, color }) => {
  const [state, setState] = useState();
  console.log();
  const input = useRef();
  return (
    <div>
      <input
        ref={input}
        type="color"
        id="ColorPicker"
        onInput={(value) => {
          onChange(value);
          setState(color);
        }}
      ></input>
    </div>
  );
};
