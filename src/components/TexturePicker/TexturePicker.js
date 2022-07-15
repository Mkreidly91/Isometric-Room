import React, { useMemo } from "react";
import { textures } from "../../textures";
import "./TexturePicker.css";

export const TexturePicker = (props) => {
  const { textureList } = textures;

  const NewListItems = Object.keys(textureList).map((element, i) => {
    const name = textureList[element];
    return (
      <option key={name} value={element}>
        {name}
      </option>
    );
  });

  return (
    <div className="selectorContainer">
      <label htmlFor="TextureSelect">Choose a texture:</label>
      <select name="Textures" id="TextureSelect" onChange={props.onClick}>
        <option value={""}>Select a Texture</option>
        {NewListItems}
      </select>
    </div>
  );
};
