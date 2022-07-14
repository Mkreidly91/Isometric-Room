import React, { useMemo } from "react";
import { textures } from "../../textures";
import "./TexturePicker.css";

export const TexturePicker = (props) => {
  const { textureMaps, textureList } = textures;
  const textureNames = Object.values(textureList);

  const listItems = Object.keys(textureList).map((element) => {
    const name = textureList[element];
    const value = textureMaps[element];
    return (
      <option key={name} value={JSON.stringify(value)}>
        {name}
      </option>
    );
  });

  return (
    <div className="selectorContainer">
      <label for="TextureSelect">Choose a texture:</label>
      <select name="Textures" id="TextureSelect" onChange={props.onClick}>
        <option value={""}>Select a Texture</option>
        {listItems}
      </select>
    </div>
  );
};
