import React, { useState } from "react";

export const LowerFloorButtons = (props) => {
  const { lowerFloorDispatch } = props;
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({ type: "addTable" });
        }}
      >
        add table
      </button>
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({ type: "addChair" });
        }}
      >
        add Chair
      </button>
      <button
        type="button"
        onClick={() => {
          lowerFloorDispatch({ type: "addCarpet" });
        }}
      >
        add Carpet
      </button>
    </div>
  );
};

export const DeleteButton = (props) => {
  const { dispatch } = props;
  return <button type="button">delete item</button>;
};
