import React, { useMemo, useState } from "react";
import { textures } from "../../../textures";
import "./TexturePicker.css";

export const TexturePicker = (props) => {
  const { textureList, textureMaps, onChange } = textures;
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
          onChange(event);
          setState(event.target.value);
        }}
      >
        {/* <option value={""}>Select a Texture</option> */}
        {NewListItems}
      </select>
    </div>
  );
};
