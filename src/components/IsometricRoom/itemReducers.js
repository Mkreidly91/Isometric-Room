import Table from "../Table/Table";
import { Bed } from "../Items/Bed";
import { Carpet } from "../Items/Carpet";
import { Chair } from "../Items/Chair";

export const initialLowerFloorItems = {
  table: [],
  carpet: [],
  chair: [],
};
export const lowerFloorReducer = (state, action) => {
  switch (action.type) {
    case "addTable":
      return {
        ...state,
        table: [...state.table, <Table position={[0, 0.19, 0]} />],
      };

    case "addChair":
      return { ...state, chair: [...state.chair, <Chair />] };

    case "addCarpet":
      return { ...state, carpet: [...state.carpet, <Carpet />] };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
