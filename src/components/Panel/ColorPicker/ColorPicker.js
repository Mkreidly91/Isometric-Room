import React from "react";
import { useState, useRef } from "react";

export const ColorPicker = ({ value, onChange }) => {
  const [state, setState] = useState();
  const input = useRef();
  return (
    <div>
      <input
        ref={input}
        type="color"
        id="ColorPicker"
        onChange={onChange}
      ></input>
    </div>
  );
};
