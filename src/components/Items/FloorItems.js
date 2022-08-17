import React, { useState } from "react";
import Table from "../Table/Table";
import { Bed } from "./Bed";
import { Carpet } from "./Carpet";
import { Chair } from "./Chair";
import { Couch } from "./Couch";
import { Planter } from "./Planter";

const lowerFloorItems = {
  table: <Table />,
};

export const FloorItems = (props) => {
  const table = <Table />;
  const Carpet = <Carpet />;
  const Chair = <Chair />;

  const [items, setItems] = useState([table, carpet, chair]);
  const addItem = (item) => {};
  const deleteItem = (item) => {};
};
