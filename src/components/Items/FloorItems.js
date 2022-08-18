import React, { useState, useReducer, useMemo, useEffect } from "react";
import Table from "../Table/Table";
import { Bed } from "./Bed";
import { Carpet } from "./Carpet";
import { Chair } from "./Chair";
import { Couch } from "./Couch";
import { Planter } from "./Planter";
import { useSelect } from "@react-three/drei";
const initialState = {
  table: [],
  carpet: [],
  chair: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "addTable":
      return { ...state, table: [...state.table, <Table />] };

    case "addChair":
      return { ...state, chair: [...state.chair, <Chair />] };

    case "addCarpet":
      return { ...state, carpet: [...state.carpet, <Carpet />] };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
export const FloorItems = (props) => {
  const selected = useSelect()[0];
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.table);

  if (props.buttons) {
    return (
      <button
        onClick={() => {
          dispatch({ type: "addTable" });
        }}
      >
        add table
      </button>
    );
  }
  return state.table;
};
