import React, { useMemo, useState, useEffect } from "react";
import { wallTextures, groundTextures } from "../../../textures";

import "./TexturePicker.css";

export const TexturePicker = ({ selectedTexture, setTexture, type }) => {
  const { textureList, textureMaps } =
    type == "Wall" ? wallTextures : groundTextures;
  const [state, setState] = useState("");

  const NewListItems = Object.keys(textureList).map((element, i) => {
    const name = textureList[element];
    const value = JSON.stringify(textureMaps[element]);
    return (
      <option key={name} value={value} id={name}>
        {name}
      </option>
    );
  });
  useEffect(() => {
    setState(selectedTexture);
  }, [selectedTexture]);
  return (
    <div className="selectorContainer">
      <label htmlFor="TextureSelect">Choose a texture:</label>
      <select
        value={state}
        name="Textures"
        id="TextureSelect"
        onChange={(event) => {
          const value =
            event.target.value !== "" ? JSON.parse(event.target.value) : "";
          setTexture(value);
          setState(event.target.value);
        }}
      >
        <option value={""}>None</option>
        {NewListItems}
      </select>
    </div>
  );
};
