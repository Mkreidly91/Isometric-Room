import React, { useMemo, useState } from "react";
import { wallTextures, groundTextures } from "../../../textures";

import "./TexturePicker.css";

export const TexturePicker = (props) => {
  const { textureList, textureMaps } =
    props.type == "Wall" ? wallTextures : groundTextures;
  const [state, setState] = useState("beigeWall");

  const NewListItems = Object.keys(textureList).map((element, i) => {
    const name = textureList[element];
    const value = JSON.stringify(textureMaps[element]);
    return (
      <option key={name} value={value} id={name}>
        {name}
      </option>
    );
  });

  return (
    <div className="selectorContainer">
      <label htmlFor="TextureSelect">Choose a texture:</label>
      <select
        value={props.value}
        name="Textures"
        id="TextureSelect"
        onChange={(event) => {
          const value =
            event.target.value !== "" ? JSON.parse(event.target.value) : "";
          props.setTexture(value);
        }}
      >
        <option value={""}>None</option>
        {NewListItems}
      </select>
    </div>
  );
};
