import Table from "../Table/Table";
import { Bed } from "../Items/Bed";
import { Carpet } from "../Items/Carpet";
import { Chair } from "../Items/Chair";

export const initialLowerFloorItems = {
  table: [],
  carpet: [],
  chair: [],
};

let tableCounter = 0;
let chairCounter = 0;
let carpetCounter = 0;

const createItem = (type) => {
  if (type === "table") {
    const table = <Table me={`table${tableCounter}`} position={[0, 0.19, 0]} />;
    tableCounter++;
    return table;
  } else if (type === "carpet") {
    return <Chair me={`chair${chairCounter}`} />;
  } else if (type === "carpet") {
    return <Carpet me={`carpet${carpetCounter}`} />;
  }
};
const removeItem = (state, payload) => {
  const newArr = state[payload.type].filter(
    (element) => element.props.me !== payload.me
  );

  if (payload.type === "table") return { ...state, table: newArr };
};

export const lowerFloorReducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "addTable":
      return {
        ...state,
        table: [...state.table, createItem("table")],
      };
    case "addChair":
      return { ...state, chair: [...state.chair, <Chair />] };

    case "addCarpet":
      return { ...state, carpet: [...state.carpet, <Carpet />] };

    case "delete":
      return removeItem(state, payload);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
