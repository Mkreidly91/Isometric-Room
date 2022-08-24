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
  } else if (type === "chair") {
    const chair = <Chair me={`chair${chairCounter}`} />;
    chairCounter++;
    return chair;
  } else if (type === "carpet") {
    const carpet = <Carpet me={`carpet${carpetCounter}`} />;
    carpetCounter++;
    return carpet;
  }
};
const removeItem = (state, payload) => {
  const type = payload.type;
  const newArr = state[type].filter(
    (element) => element.props.me !== payload.me
  );
  // console.log(
  //   newArr.map((element) => {
  //     return element.props.me;
  //   })
  // );
  return { ...state, [type]: newArr };
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
      return { ...state, chair: [...state.chair, createItem("chair")] };

    case "addCarpet":
      return { ...state, carpet: [...state.carpet, createItem("carpet")] };

    case "delete":
      return removeItem(state, payload);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
