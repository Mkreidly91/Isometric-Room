import React, { useState, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Stars, softShadows } from "@react-three/drei";
import "./App.css";

import { TexturePicker } from "./components/TexturePicker/TexturePicker";

//import models and plane
import Room from "./components/Room/Room";
import Wall from "./components/wall/Wall";
import Tiles from "./components/Tiles/Tiles";

//import textures
import { textures } from "./textures";
const { beigeWall, concreteBrick, redBrick, blackWhiteTiles } =
  textures.textureMaps;

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

  const selectedItem = useRef();
  const [selectedTexture, setSelectedTexture] = useState({ ...beigeWall });
  const selectTexture = (value) => {
    setSelectedTexture(JSON.parse(value));
  };
  return (
    <div className="main">
      <Canvas camera={camera} dpr={window.devicePixelRatio}>
        <ambientLight />
        <spotLight
          intensity={1.5}
          angle={1}
          penumbra={1}
          position={[-10, 15, -10]}
          castShadow
        />
        <OrbitControls />
        <Tiles texture={blackWhiteTiles} />
        <Suspense fallback={null}>
          <Wall
            position={[0, 5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={2}
            texture={selectedTexture}
          />

          <Wall
            position={[10, 5, -10]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={2}
            ref={selectedItem}
            texture={selectedTexture}
          />
        </Suspense>
      </Canvas>
      <TexturePicker
        onClick={(event) => {
          console.log(JSON.parse(event.target.value));
          selectTexture(event.target.value);
          // console.log(selectTexture);
        }}
      />
    </div>
  );
};
export default App;
