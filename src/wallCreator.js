import React from "react";
import Wall from "./components/wall/Wall";
import { textures } from "./textures";

const textureMaps = textures.textureMaps;
export const wallsList = [
  {
    position: [0, 5, 0],
    rotation: [-Math.PI / 2, 0, 0],
    scale: 2,
  },
  {
    position: [14.45, 5, -15.6],
    rotation: [-Math.PI / 2, 0, Math.PI / 2],
    scale: 2,
  },
];

export const createWalls = (props) => {
  const createJsx = wallsList.map((element, i) => {
    // const t = textureMaps[texture[i]] || textureMaps[1];
    return <Wall key={i} index={`wall-${i}`} {...element} {...props} />;
  });

  return createJsx;
};

// export const modifyWall = (selected, texture);
