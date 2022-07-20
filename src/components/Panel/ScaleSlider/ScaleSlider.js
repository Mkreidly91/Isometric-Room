import React, { useEffect, useState, useRef } from "react";

export const ScaleSlider = ({ min, max, value, onChange }) => {
  const input = useRef();
  const [state, setState] = useState(null);
  console.log(state);

  return (
    <div className="slidecontainer">
      <input
        ref={input}
        className="slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          //   onChange(event);
          const value = event.target.value;
          setState(event.target.value);
        }}
        step={0.1}
      />
    </div>
  );
};
