import React, { useState, useMemo, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { SuspenseWrapper } from "./components/SuspenseWrapper/SuspenseWrapper";

//import models and plane
import Tiles from "./components/Tiles/Tiles";

//import textures
import { textures } from "./textures";

const { blackWhiteTiles } = textures.textureMaps;

const App = () => {
  //Camera
  const dom = useRef();
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-30, 50, -30);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

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
        <SuspenseWrapper portal={dom} />
      </Canvas>
      <div className="portal" ref={dom}></div>
    </div>
  );
};
export default App;
