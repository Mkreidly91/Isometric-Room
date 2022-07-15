import React, { useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import "./App.css";

import { TexturePicker } from "./components/TexturePicker/TexturePicker";

//import models and plane

import Tiles from "./components/Tiles/Tiles";
import { wallsList, createWalls } from "./wallCreator";

//import textures
import { textures } from "./textures";

const { blackWhiteTiles } = textures.textureMaps;

const App = () => {
  //Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-30, 50, -30);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  /*STATES*/
  /* maps item index to it's selected texture; */
  const [selectedTexture, setSelectedTexture] = useState({
    0: "beigeWall",
    1: "redBrick",
  });
  const selectTexture = (value, selected) => {
    setSelectedTexture((prev) => {
      return {
        ...prev,
        [selected]: value,
      };
    });
  };

  /*stores the selected item's index */
  const [selectedItem, setSelectedItem] = useState(null);
  const selected = (value) => {
    setSelectedItem(value);
  };

  /*create walls*/
  const walls = useMemo(() => {
    return createWalls(selectedTexture, {
      onClick: (event) => {
        const targetIndex = event.eventObject.__r3f.memoizedProps.index;
        selected(targetIndex);
      },
      selected: { selected },
    });
  }, [wallsList, selectedTexture]);

  return (
    <div className="main">
      <Canvas camera={camera} dpr={window.devicePixelRatio}>
        <ambientLight />
        <pointLight
          intensity={1}
          angle={1}
          penumbra={1}
          position={[-10, 15, -10]}
          castShadow
        />
        <OrbitControls />
        <Tiles texture={blackWhiteTiles} />
        <Suspense fallback={null}>{walls}</Suspense>
      </Canvas>
      <TexturePicker
        onClick={(event) => {
          const value = event.target.value;
          selectTexture(value, selectedItem);
        }}
      />
    </div>
  );
};
export default App;
