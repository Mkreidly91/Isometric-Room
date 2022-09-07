import React from "react";

export const TransformHelper = (props) => {
  return (
    <div className={props.className}>
      <span>
        After Selecting a component,press E to activate and deactivate transform
        controls, T to translate,R to rotate, and S to scale
      </span>
    </div>
  );
};
